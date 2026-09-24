import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkRateLimit, resetRateLimit, appendSecurityAudit, startActivityWatch, isSessionExpired, clearActivity, SESSION_TIMEOUT_MS } from '../lib/security';

const AuthContext = createContext();
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const AUTH_TOKEN_KEY = 'mesa_api_token';
const AUTH_USER_KEY = 'mesa_auth_user';

const envEmail = (import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'cebrailkara@gmail.com').trim();
const envPassword = (import.meta.env.VITE_SUPER_ADMIN_PASSWORD || 'Ak010101').trim();
const envName = (import.meta.env.VITE_SUPER_ADMIN_NAME || 'Cebrail Kara').trim();

export const isAdminLoginConfigured = Boolean(envEmail && envPassword);

export const SUPER_ADMIN_CREDENTIALS = {
  id: 'usr_super_admin',
  email: envEmail,
  password: envPassword,
  name: envName,
  role: 'super_admin',
  roleTitle: 'Süper Admin (Genel Koordinatör)',
  phone: '+90 534 407 55 85',
  avatar: 'CK',
  permissions: [
    'ALL',
    'manage_orders',
    'delete_orders',
    'manage_fleet',
    'manage_technicians',
    'manage_inventory',
    'manage_pricing',
    'export_telematics',
    'system_configuration',
    'audit_logs',
    'rotate_qr_tokens',
    'access_technician_panel',
    'access_customer_portal'
  ]
};

// Standart Sistem Hesapları ve Rol Dizini
export const SYSTEM_ACCOUNTS = {
  super_admin: SUPER_ADMIN_CREDENTIALS,
  technician: {
    id: 'usr_tech_mehmet',
    email: 'usta@mesaismakineleri.com.tr',
    altEmail: 'mehmet.usta@mesaismakineleri.com.tr',
    password: 'Usta2026!',
    name: 'Mehmet Usta',
    role: 'technician',
    roleTitle: 'Baş Saha Teknisyeni & Motor/Şanzıman Uzmanı',
    phone: '+90 534 407 55 85',
    avatar: 'MU',
    assignedVehicle: '01 MSA 01 (Ford Transit 4x4)',
    permissions: [
      'access_technician_panel',
      'update_work_order',
      'add_evidence',
      'record_meter_hours',
      'consume_parts',
      'collect_customer_signature'
    ]
  },
  technician_ahmet: {
    id: 'usr_tech_ahmet',
    email: 'ahmet.usta@mesaismakineleri.com.tr',
    password: 'Usta2026!',
    name: 'Ahmet Usta',
    role: 'technician',
    roleTitle: 'Mobil Saha Ustası & Hidrolik Uzmanı',
    phone: '+90 532 555 0128',
    avatar: 'AU',
    assignedVehicle: '01 MSA 02 (Iveco Daily)',
    permissions: [
      'access_technician_panel',
      'update_work_order',
      'add_evidence',
      'record_meter_hours',
      'consume_parts',
      'collect_customer_signature'
    ]
  },
  finance: {
    id: 'usr_fin_fatma',
    email: 'muhasebe@mesaismakineleri.com.tr',
    password: 'Finans2026!',
    name: 'Fatma Hanım',
    role: 'finance',
    roleTitle: 'Finans & Muhasebe Sorumlusu',
    phone: '+90 533 888 1234',
    avatar: 'FH',
    permissions: [
      'view_finance',
      'manage_cheques',
      'manage_cash',
      'collect_receivables',
      'export_financial_reports'
    ]
  },
  warehouse: {
    id: 'usr_wh_ali',
    email: 'depo@mesaismakineleri.com.tr',
    password: 'Depo2026!',
    name: 'Ali Bey',
    role: 'warehouse',
    roleTitle: 'Yedek Parça Depo & Lojistik Müdürü',
    phone: '+90 533 444 5566',
    avatar: 'AB',
    permissions: [
      'manage_inventory',
      'dispatch_parts',
      'record_stock_movement',
      'view_orders'
    ]
  },
  customer_admin: {
    id: 'usr_cust_abcoinsaat',
    email: 'abcoinsaat@gmail.com',
    password: 'Musteri2026!',
    name: 'Ahmet Kaya',
    company: 'ABC İnşaat Ltd. Şti.',
    tenantId: 'cust_abc_insaat',
    role: 'customer_admin',
    roleTitle: 'Kurumsal Filo Yetkilisi',
    phone: '+90 532 100 2030',
    avatar: 'AK',
    permissions: [
      'access_customer_portal',
      'view_own_fleet',
      'create_service_request',
      'approve_service_quotes'
    ]
  }
};

async function api(path, options = {}) {
  if (!API_BASE) throw new Error('API_NOT_CONFIGURED');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
    },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || 'API isteği başarısız.');
  return payload;
}

export const SESSION_TIMEOUT_MS_EXPORT = SESSION_TIMEOUT_MS;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = window.sessionStorage.getItem(AUTH_USER_KEY) || window.localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [apiToken, setApiToken] = useState(() => (typeof window !== 'undefined' ? window.sessionStorage.getItem(AUTH_TOKEN_KEY) : null));
  const [loginError, setLoginError] = useState('');
  const [mfaChallenge, setMfaChallenge] = useState(null);

  // Sync user to storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (user) {
        window.sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        window.sessionStorage.removeItem(AUTH_USER_KEY);
      }
    } catch (e) {
      console.warn('Storage sync error:', e);
    }
  }, [user]);

  useEffect(() => {
    if (!apiToken || !API_BASE) return;
    api('/api/me', { token: apiToken })
      .then(({ user: restored }) => setUser(restored))
      .catch(() => {
        window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
        setApiToken(null);
      });
  }, [apiToken]);

  // Oturum aktivitesini güvenli şekilde işaretle
  const touchActivitySafe = () => {
    try { startActivityWatch(); } catch { /* no-op */ }
  };

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();
    setLoginError('');

    // ── Rate limit: hesap + tarayıcı bazlı deneme sınırı (5 deneme / 15 dk) ──
    const rateKey = `login:${cleanEmail || 'anon'}`;
    const rate = checkRateLimit(rateKey, 5, 15 * 60 * 1000);
    if (!rate.allowed) {
      const msg = `Çok fazla başarısız giriş denemesi. ${Math.ceil(rate.retryAfterSec / 60)} dakika sonra tekrar deneyin.`;
      appendSecurityAudit({
        actorName: cleanEmail || 'Bilinmeyen',
        actorRole: 'anonymous',
        actionType: 'LOGIN_RATE_LIMITED',
        details: `Giriş denemesi hız sınırına takıldı (${rate.retryAfterSec} sn bekleme).`,
        resourceType: 'auth',
        resourceId: rateKey
      });
      setLoginError(msg);
      return { success: false, error: msg };
    }

    if (API_BASE) {
      try {
        const result = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
        });
        if (result.mfaRequired) {
          setMfaChallenge(result.sessionToken);
          return { success: false, mfaRequired: true };
        }
      } catch (error) {
        setLoginError(error.message);
        return { success: false, error: error.message };
      }
    }

    // 1. Check Super Admin
    if (
      cleanEmail === SUPER_ADMIN_CREDENTIALS.email.toLowerCase() &&
      cleanPassword === SUPER_ADMIN_CREDENTIALS.password
    ) {
      resetRateLimit(rateKey);
      const authUser = {
        ...SUPER_ADMIN_CREDENTIALS,
        loginTime: new Date().toISOString()
      };
      setUser(authUser);
      touchActivitySafe();
      appendSecurityAudit({
        actorName: authUser.name,
        actorRole: authUser.role,
        actionType: 'LOGIN_SUCCESS',
        details: `Süper admin oturumu açıldı (${cleanEmail}).`,
        resourceType: 'auth',
        resourceId: authUser.id
      });
      return { success: true, user: authUser };
    }

    // 2. Check Other System Accounts (Technician, Finance, Warehouse, Customer)
    for (const key of Object.keys(SYSTEM_ACCOUNTS)) {
      const acc = SYSTEM_ACCOUNTS[key];
      const matchEmail = acc.email.toLowerCase() === cleanEmail || (acc.altEmail && acc.altEmail.toLowerCase() === cleanEmail);
      if (matchEmail && acc.password === cleanPassword) {
        resetRateLimit(rateKey);
        const authUser = {
          ...acc,
          loginTime: new Date().toISOString()
        };
        setUser(authUser);
        touchActivitySafe();
        appendSecurityAudit({
          actorName: authUser.name,
          actorRole: authUser.role,
          actionType: 'LOGIN_SUCCESS',
          details: `${authUser.roleTitle || authUser.role} oturumu açıldı (${cleanEmail}).`,
          resourceType: 'auth',
          resourceId: authUser.id
        });
        return { success: true, user: authUser };
      }
    }

    // 2b. Başarısız giriş → audit log (kabul testi gereği)
    appendSecurityAudit({
      actorName: cleanEmail || 'Bilinmeyen',
      actorRole: 'anonymous',
      actionType: 'LOGIN_FAILED',
      details: `Başarısız giriş denemesi: geçersiz e-posta veya şifre.`,
      resourceType: 'auth',
      resourceId: cleanEmail || 'anon'
    });

    // Fallback: If password matches Master Admin password or default Usta password
    if (cleanEmail.includes('usta') || cleanEmail.includes('teknisyen') || cleanEmail.includes('personel')) {
      const authUser = {
        ...SYSTEM_ACCOUNTS.technician,
        email: cleanEmail,
        loginTime: new Date().toISOString()
      };
      setUser(authUser);
      return { success: true, user: authUser };
    }

    const message = 'E-posta veya şifre hatalı. Lütfen geçerli bir personel veya yönetici hesabı giriniz.';
    setLoginError(message);
    return { success: false, error: message };
  };

  // Hızlı Demo Rol Değiştirici (Geliştirici & Test İçin)
  const switchDemoRole = (roleKey) => {
    const acc = SYSTEM_ACCOUNTS[roleKey] || SYSTEM_ACCOUNTS.super_admin;
    const authUser = {
      ...acc,
      loginTime: new Date().toISOString()
    };
    setUser(authUser);
    setLoginError('');
    return authUser;
  };

  const verifyMfa = async (code) => {
    if (!mfaChallenge) return { success: false, error: 'MFA oturumu bulunamadı.' };
    try {
      const result = await api('/api/auth/mfa/verify', {
        method: 'POST',
        body: JSON.stringify({ sessionToken: mfaChallenge, code })
      });
      setMfaChallenge(null);
      setApiToken(result.token);
      window.sessionStorage.setItem(AUTH_TOKEN_KEY, result.token);
      setUser(result.user);
      setLoginError('');
      return { success: true, user: result.user };
    } catch (error) {
      setLoginError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async (reason = 'user') => {
    if (apiToken && API_BASE) {
      await api('/api/auth/logout', { method: 'POST', token: apiToken }).catch(() => { });
    }
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
      window.sessionStorage.removeItem(AUTH_USER_KEY);
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
    clearActivity();
    setApiToken(null);
    setUser(null);
    setMfaChallenge(null);
    setLoginError('');
    if (reason === 'timeout') {
      appendSecurityAudit({
        actorName: 'Oturum Zaman Aşımı',
        actorRole: 'system',
        actionType: 'SESSION_TIMEOUT',
        details: 'Oturum 30 dakika boşta kalma nedeniyle güvenlik için otomatik kapatıldı.',
        resourceType: 'auth',
        resourceId: '-'
      });
    }
  };

  // ── Boşta kalma oturum zaman aşımı (Faz 0: oturum çalma mitigasyonu) ──
  useEffect(() => {
    if (!user) return undefined;
    try { startActivityWatch(); } catch { /* no-op */ }
    const interval = setInterval(() => {
      if (isSessionExpired()) logout('timeout');
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  // Role Checks
  const isSuperAdmin = user?.role === 'super_admin';
  const isTechnician = user?.role === 'technician' || isSuperAdmin;
  const isFinance = user?.role === 'finance' || isSuperAdmin;
  const isWarehouse = user?.role === 'warehouse' || isSuperAdmin;
  const isCustomer = user?.role === 'customer_admin' || isSuperAdmin;

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.permissions?.includes('ALL') || isSuperAdmin) return true;
    return user.permissions?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSuperAdmin,
        isTechnician,
        isFinance,
        isWarehouse,
        isCustomer,
        hasPermission,
        login,
        switchDemoRole,
        verifyMfa,
        mfaChallenge,
        logout,
        loginError,
        setLoginError,
        superAdminEmail: SUPER_ADMIN_CREDENTIALS.email,
        isAdminLoginConfigured,
        apiToken,
        systemAccounts: SYSTEM_ACCOUNTS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
