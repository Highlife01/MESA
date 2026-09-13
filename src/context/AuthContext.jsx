import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const envEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL || 'cebrailkara@gmail.com';
const envPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD || 'Ak010101';
const envName = import.meta.env.VITE_SUPER_ADMIN_NAME || 'Cebrail Kara';

export const isAdminLoginConfigured = Boolean(
  (import.meta.env.VITE_SUPER_ADMIN_EMAIL && import.meta.env.VITE_SUPER_ADMIN_PASSWORD) ||
  (envEmail && envPassword)
);

export const SUPER_ADMIN_CREDENTIALS = {
  email: envEmail,
  password: envPassword,
  name: envName,
  role: 'super_admin',
  roleTitle: 'Süper Admin (Genel Koordinatör)',
  phone: '+90 533 529 36 74',
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
    'system_configuration'
  ]
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState('');

  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!isAdminLoginConfigured) {
      const errorMsg = 'Yönetici girişi için güvenli site ayarları yapılandırılmamış. Lütfen .env dosyasına VITE_SUPER_ADMIN_EMAIL ve VITE_SUPER_ADMIN_PASSWORD değerlerini ekleyin.';
      setLoginError(errorMsg);
      return { success: false, error: errorMsg };
    }

    if (
      cleanEmail === SUPER_ADMIN_CREDENTIALS.email.toLowerCase() &&
      cleanPassword === SUPER_ADMIN_CREDENTIALS.password
    ) {
      const authUser = {
        email: SUPER_ADMIN_CREDENTIALS.email,
        name: SUPER_ADMIN_CREDENTIALS.name,
        role: SUPER_ADMIN_CREDENTIALS.role,
        roleTitle: SUPER_ADMIN_CREDENTIALS.roleTitle,
        phone: SUPER_ADMIN_CREDENTIALS.phone,
        avatar: SUPER_ADMIN_CREDENTIALS.avatar,
        permissions: SUPER_ADMIN_CREDENTIALS.permissions,
        loginTime: new Date().toISOString()
      };
      setUser(authUser);
      setLoginError('');
      return { success: true, user: authUser };
    }

    const errorMsg = 'E-posta veya şifre hatalı. Lütfen güvenli yönetici bilgilerinizi kontrol ediniz.';
    setLoginError(errorMsg);
    return { success: false, error: errorMsg };
  };

  const logout = () => {
    setUser(null);
    setLoginError('');
  };

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isSuperAdmin,
        login,
        logout,
        loginError,
        setLoginError,
        superAdminEmail: SUPER_ADMIN_CREDENTIALS.email,
        isAdminLoginConfigured
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
