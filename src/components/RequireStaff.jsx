import React, { useEffect } from 'react';
import { Link, useLocation } from '../router/Router';
import { useAuth } from '../context/AuthContext';
import { SEO } from './SEO';

/**
 * Korumalı rota sarmalayıcısı.
 *
 * @param {'staff'|'admin'|'technician'|'customer'} access
 *   staff      → müşteri dışındaki tüm personel rolleri
 *   admin      → yalnızca süper admin
 *   technician → teknisyen veya süper admin
 *   customer   → kurumsal müşteri veya süper admin
 *
 * Not: Bu yalnızca arayüz kapısıdır. Gerçek veri erişimi sunucu tarafında
 * (Firestore kuralları / API) custom claim ile doğrulanmalıdır.
 */
export function RequireStaff({ children, access = 'staff', adminOnly = false }) {
  const { ensureAuth, isAuthReady, user, isStaff, isSuperAdmin, isTechnician, isCustomer } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => { ensureAuth(); }, [ensureAuth]);

  if (!isAuthReady) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-600" role="status">
        <SEO title="Oturum kontrol ediliyor | MESA" noindex />
        <div className="loading-spinner" />
        <span className="text-xs font-semibold">Oturum kontrol ediliyor…</span>
      </div>
    );
  }

  const mode = adminOnly ? 'admin' : access;
  const allowed = Boolean(user) && (
    mode === 'admin' ? isSuperAdmin
      : mode === 'technician' ? isTechnician
        : mode === 'customer' ? isCustomer
          : isStaff
  );

  if (!allowed) {
    const next = encodeURIComponent(pathname);
    const message = !user
      ? (mode === 'customer' ? 'Kurumsal müşteri portalına erişmek için hesabınızla giriş yapın.' : 'Bu alana erişmek için personel hesabınızla giriş yapın.')
      : 'Hesabınızın bu alana erişim yetkisi bulunmuyor.';

    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <SEO title="Giriş gerekli | MESA" noindex />
        <div className="max-w-md text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-xl">
          <h1 className="text-xl font-bold text-slate-900">{user ? 'Yetki gerekli' : 'Yetkili girişi gerekli'}</h1>
          <p className="mt-3 text-sm text-slate-600">{message}</p>
          <Link
            to={`/admin?next=${next}`}
            className="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl"
          >
            {user ? 'Farklı hesapla giriş yap' : 'Giriş Yap'}
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
