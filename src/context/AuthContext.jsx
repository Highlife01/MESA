import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { checkRateLimit, resetRateLimit, appendSecurityAudit, startActivityWatch, isSessionExpired, clearActivity, touchActivity, SESSION_TIMEOUT_MS } from '../lib/security';

/**
 * MESA kimlik doğrulama katmanı
 * ─────────────────────────────────────────────
 * Parola veya hesap listesi İSTEMCİ KODUNDA TUTULMAZ. İki sağlayıcı desteklenir:
 *
 *  1. Node API (VITE_API_BASE tanımlıysa): parola + MFA sunucuda doğrulanır.
 *  2. Firebase Authentication (varsayılan): e-posta/şifre girişi; rol bilgisi
 *     yalnızca sunucu tarafında atanan custom claim'den (`mesaRole`) okunur.
 *     Rol atamak için: `npm run staff:role -- <email> <rol>` (scripts/set-staff-role.mjs).
 *
 * Tarayıcı depolamasındaki hiçbir veri yetki kaynağı olarak kullanılmaz.
 */

const AuthContext = createContext(null);
const API_BASE = (import.meta.env.VITE_API_BASE || '').replace(/\/$/, '');
const AUTH_TOKEN_KEY = 'mesa_api_token';
// Yalnızca "bu tarayıcıda daha önce personel girişi yapıldı" ipucu; yetki taşımaz.
// Ziyaretçilerin Firebase SDK'sını gereksiz yere indirmemesi için kullanılır.
const STAFF_HINT_KEY = 'mesa_staff_session_hint';

export const AUTH_PROVIDER = API_BASE ? 'api' : 'firebase';

// Custom claim değeri → uygulama rolü
const CLAIM_TO_ROLE = {
  admin: 'super_admin',
  super_admin: 'super_admin',
  technician: 'technician',
  finance: 'finance',
  warehouse: 'warehouse',
  customer_admin: 'customer_admin',
  dispatcher: 'technician',
  manager: 'super_admin'
};

export const ROLE_PROFILES = {
  super_admin: {
    title: 'Süper Admin (Genel Koordinatör)',
    permissions: ['ALL']
  },
  technician: {
    title: 'Saha Teknisyeni',
    permissions: ['access_technician_panel', 'update_work_order', 'add_evidence', 'record_meter_hours', 'consume_parts', 'collect_customer_signature']
  },
  finance: {
    title: 'Finans & Muhasebe Sorumlusu',
    permissions: ['view_finance', 'manage_cheques', 'manage_cash', 'collect_receivables', 'export_financial_reports']
  },
  warehouse: {
    title: 'Yedek Parça Depo & Lojistik',
    permissions: ['manage_inventory', 'dispatch_parts', 'record_stock_movement', 'view_orders']
  },
  customer_admin: {
    title: 'Kurumsal Filo Yetkilisi',
    permissions: ['access_customer_portal', 'view_own_fleet', 'create_service_request', 'approve_service_quotes']
  }
};

const initials = (name = '') => name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toLocaleUpperCase('tr-TR')).join('') || 'M';

function profileFor({ id, email, name, role, tenantId = null, company = null, phone = '' }) {
  const profile = ROLE_PROFILES[role];
  if (!profile) return null;
  const displayName = name || (email ? email.split('@')[0] : 'Personel');
  return {
    id,
    email,
    name: displayName,
    role,
    roleTitle: profile.title,
    permissions: profile.permissions,
    avatar: initials(displayName),
    tenantId,
    company,
    phone,
    loginTime: new Date().toISOString()
  };
}

function userFromFirebase(firebaseUser, claims) {
  if (!firebaseUser || firebaseUser.isAnonymous) return null;
  const role = CLAIM_TO_ROLE[claims?.mesaRole];
  if (!role) return null;
  return profileFor({
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || claims?.name || '',
    role,
    tenantId: claims?.tenantId || null,
    company: claims?.company || null,
    phone: firebaseUser.phoneNumber || ''
  });
}

function userFromApi(apiUser) {
  if (!apiUser) return null;
  const role = CLAIM_TO_ROLE[apiUser.role] || apiUser.role;
  return profileFor({ id: apiUser.id, email: apiUser.email, name: apiUser.name, role, tenantId: apiUser.tenantId || null });
}

function firebaseErrorMessage(error) {
  switch (error?.code) {
    case 'auth/invalid-credential':
    case 'auth/invalid-email':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'E-posta veya şifre hatalı.';
    case 'auth/user-disabled':
      return 'Bu hesap devre dışı bırakılmış.';
    case 'auth/too-many-requests':
      return 'Çok fazla başarısız deneme. Lütfen birkaç dakika sonra tekrar deneyin.';
    case 'auth/operation-not-allowed':
      return 'E-posta/şifre ile giriş Firebase konsolunda etkinleştirilmemiş.';
    case 'auth/network-request-failed':
      return 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edin.';
    default:
      return 'Giriş yapılamadı. Lütfen tekrar deneyin.';
  }
}

async function api(path, options = {}) {
  if (!API_BASE) throw new Error('API_NOT_CONFIGURED');
  const { token, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || 'API isteği başarısız.');
  return payload;
}

const readStorage = (storage, key) => {
  try { return typeof window !== 'undefined' ? window[storage].getItem(key) : null; } catch { return null; }
};
const writeStorage = (storage, key, value) => {
  try {
    if (typeof window === 'undefined') return;
    if (value === null) window[storage].removeItem(key);
    else window[storage].setItem(key, value);
  } catch { /* depolama kapalı — sessizce devam */ }
};

export const SESSION_TIMEOUT_MS_EXPORT = SESSION_TIMEOUT_MS;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authStatus, setAuthStatus] = useState('idle'); // idle | loading | ready
  const [loginError, setLoginError] = useState('');
  const [mfaChallenge, setMfaChallenge] = useState(null);
  const [apiToken, setApiToken] = useState(() => readStorage('sessionStorage', AUTH_TOKEN_KEY));

  const firebaseRef = useRef(null);
  const initRef = useRef(null);
  const unsubscribeRef = useRef(null);

  const loadFirebase = useCallback(async () => {
    if (!firebaseRef.current) firebaseRef.current = await import('../lib/firebase');
    return firebaseRef.current;
  }, []);

  /** Kimlik katmanını (gerekirse) başlatır. Korumalı sayfalar ve giriş ekranı çağırır. */
  const ensureAuth = useCallback(() => {
    if (initRef.current) return initRef.current;
    setAuthStatus('loading');

    initRef.current = (async () => {
      if (AUTH_PROVIDER === 'api') {
        const token = readStorage('sessionStorage', AUTH_TOKEN_KEY);
        if (token) {
          try {
            const { user: restored } = await api('/api/me', { token });
            setUser(userFromApi(restored));
          } catch {
            writeStorage('sessionStorage', AUTH_TOKEN_KEY, null);
            setApiToken(null);
          }
        }
        setAuthStatus('ready');
        return;
      }

      try {
        const fb = await loadFirebase();
        if (!fb.isFirebaseConfigured || !fb.auth) {
          setAuthStatus('ready');
          return;
        }
        await new Promise(resolve => {
          let first = true;
          unsubscribeRef.current = fb.onIdTokenChanged(fb.auth, async (firebaseUser) => {
            let next = null;
            if (firebaseUser && !firebaseUser.isAnonymous) {
              try {
                const token = await firebaseUser.getIdTokenResult();
                next = userFromFirebase(firebaseUser, token.claims);
              } catch {
                next = null;
              }
            }
            setUser(next);
            if (!next) writeStorage('localStorage', STAFF_HINT_KEY, null);
            if (first) { first = false; setAuthStatus('ready'); resolve(); }
          });
        });
      } catch (error) {
        console.warn('[MESA Auth] Kimlik katmanı başlatılamadı:', error);
        setAuthStatus('ready');
      }
    })();

    return initRef.current;
  }, [loadFirebase]);

  // Daha önce personel girişi yapılmış tarayıcılarda oturumu otomatik geri yükle.
  useEffect(() => {
    const hasHint = readStorage('localStorage', STAFF_HINT_KEY) || readStorage('sessionStorage', AUTH_TOKEN_KEY);
    if (hasHint) ensureAuth();
    return () => { if (unsubscribeRef.current) unsubscribeRef.current(); };
  }, [ensureAuth]);

  const auditSuccess = (authUser, email) => {
    appendSecurityAudit({
      actorName: authUser.name,
      actorRole: authUser.role,
      actionType: 'LOGIN_SUCCESS',
      details: `${authUser.roleTitle} oturumu açıldı (${email}).`,
      resourceType: 'auth',
      resourceId: authUser.id
    });
  };

  const auditFailure = (email, reason) => {
    appendSecurityAudit({
      actorName: email || 'Bilinmeyen',
      actorRole: 'anonymous',
      actionType: 'LOGIN_FAILED',
      details: `Başarısız giriş denemesi: ${reason}`,
      resourceType: 'auth',
      resourceId: email || 'anon'
    });
  };

  const fail = (message, email, reason = message) => {
    auditFailure(email, reason);
    setLoginError(message);
    return { success: false, error: message };
  };

  const login = async (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = password || '';
    setLoginError('');

    if (!cleanEmail || !cleanPassword) {
      return fail('E-posta ve şifre zorunludur.', cleanEmail);
    }

    // Tarayıcı tarafı deneme sınırı yalnızca kullanıcı deneyimi içindir;
    // asıl sınırlama Firebase Auth / API sunucusunda uygulanır.
    const rateKey = `login:${cleanEmail}`;
    const rate = checkRateLimit(rateKey, 5, 15 * 60 * 1000);
    if (!rate.allowed) {
      const msg = `Çok fazla başarısız giriş denemesi. ${Math.ceil(rate.retryAfterSec / 60)} dakika sonra tekrar deneyin.`;
      appendSecurityAudit({
        actorName: cleanEmail,
        actorRole: 'anonymous',
        actionType: 'LOGIN_RATE_LIMITED',
        details: `Giriş denemesi hız sınırına takıldı (${rate.retryAfterSec} sn bekleme).`,
        resourceType: 'auth',
        resourceId: rateKey
      });
      setLoginError(msg);
      return { success: false, error: msg };
    }

    await ensureAuth();

    if (AUTH_PROVIDER === 'api') {
      try {
        const result = await api('/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email: cleanEmail, password: cleanPassword })
        });
        if (result.mfaRequired) {
          setMfaChallenge(result.sessionToken);
          return { success: false, mfaRequired: true };
        }
        return fail('Sunucu beklenmeyen bir yanıt verdi.', cleanEmail);
      } catch (error) {
        return fail(error.message, cleanEmail);
      }
    }

    const fb = await loadFirebase();
    if (!fb.isFirebaseConfigured || !fb.auth) {
      return fail('Personel girişi bu ortamda yapılandırılmamış (Firebase ayarları eksik).', cleanEmail, 'not_configured');
    }

    try {
      const credential = await fb.signInWithEmailAndPassword(fb.auth, cleanEmail, cleanPassword);
      const token = await credential.user.getIdTokenResult(true);
      const authUser = userFromFirebase(credential.user, token.claims);
      if (!authUser) {
        await fb.signOut(fb.auth).catch(() => {});
        return fail('Bu hesaba MESA personel rolü atanmamış. Yöneticinizle iletişime geçin.', cleanEmail, 'missing_role_claim');
      }
      resetRateLimit(rateKey);
      writeStorage('localStorage', STAFF_HINT_KEY, '1');
      touchActivity();
      startActivityWatch();
      setUser(authUser);
      auditSuccess(authUser, cleanEmail);
      return { success: true, user: authUser };
    } catch (error) {
      return fail(firebaseErrorMessage(error), cleanEmail, error?.code || 'unknown');
    }
  };

  const verifyMfa = async (code) => {
    if (!mfaChallenge) return { success: false, error: 'MFA oturumu bulunamadı.' };
    try {
      const result = await api('/api/auth/mfa/verify', {
        method: 'POST',
        body: JSON.stringify({ sessionToken: mfaChallenge, code })
      });
      const authUser = userFromApi(result.user);
      if (!authUser) throw new Error('Bu hesabın rolü portal erişimi için tanımlı değil.');
      setMfaChallenge(null);
      setApiToken(result.token);
      writeStorage('sessionStorage', AUTH_TOKEN_KEY, result.token);
      touchActivity();
      startActivityWatch();
      setUser(authUser);
      setLoginError('');
      auditSuccess(authUser, authUser.email);
      return { success: true, user: authUser };
    } catch (error) {
      setLoginError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = useCallback(async (reason = 'user') => {
    if (AUTH_PROVIDER === 'api' && apiToken) {
      await api('/api/auth/logout', { method: 'POST', token: apiToken }).catch(() => { });
    }
    if (AUTH_PROVIDER === 'firebase' && firebaseRef.current?.auth) {
      await firebaseRef.current.signOut(firebaseRef.current.auth).catch(() => { });
    }
    writeStorage('sessionStorage', AUTH_TOKEN_KEY, null);
    writeStorage('localStorage', STAFF_HINT_KEY, null);
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
  }, [apiToken]);

  // ── Boşta kalma oturum zaman aşımı ──
  useEffect(() => {
    if (!user) return undefined;
    try { startActivityWatch(); } catch { /* no-op */ }
    if (isSessionExpired()) { logout('timeout'); return undefined; }
    const interval = setInterval(() => {
      if (isSessionExpired()) logout('timeout');
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [user, logout]);

  // Role Checks
  const isSuperAdmin = user?.role === 'super_admin';
  const isTechnician = user?.role === 'technician' || isSuperAdmin;
  const isFinance = user?.role === 'finance' || isSuperAdmin;
  const isWarehouse = user?.role === 'warehouse' || isSuperAdmin;
  const isCustomer = user?.role === 'customer_admin' || isSuperAdmin;
  const isStaff = Boolean(user) && user.role !== 'customer_admin';

  const hasPermission = (permission) => {
    if (!user) return false;
    if (isSuperAdmin || user.permissions?.includes('ALL')) return true;
    return user.permissions?.includes(permission) || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isSuperAdmin,
        isTechnician,
        isFinance,
        isWarehouse,
        isCustomer,
        isStaff,
        hasPermission,
        login,
        verifyMfa,
        mfaChallenge,
        logout,
        loginError,
        setLoginError,
        ensureAuth,
        authStatus,
        isAuthReady: authStatus === 'ready',
        authProvider: AUTH_PROVIDER,
        apiToken
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
