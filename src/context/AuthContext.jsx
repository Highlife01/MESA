import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const SUPER_ADMIN_CREDENTIALS = {
  email: 'cebrailkara@gmail.com',
  password: 'Ak010101',
  name: 'Cebrail Kara',
  role: 'super_admin',
  roleTitle: 'Süper Admin (Genel Koordinatör)',
  phone: '0534 407 55 85',
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

const STORAGE_KEY = 'mesa_auth_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading session', e);
    }
    return null;
  });

  const [loginError, setLoginError] = useState('');

  // Persist session
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

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
    } else {
      const errorMsg = 'E-posta veya şifre hatalı. Lütfen süper admin bilgilerinizi kontrol ediniz.';
      setLoginError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setUser(null);
    setLoginError('');
    localStorage.removeItem(STORAGE_KEY);
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
        superAdminEmail: SUPER_ADMIN_CREDENTIALS.email
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
