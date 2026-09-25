import React from 'react';
import { Link } from '../router/Router';
import { useAuth } from '../context/AuthContext';

export function RequireStaff({ children, adminOnly = false }) {
  const { loading, isStaff, isSuperAdmin } = useAuth();

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center text-slate-600" role="status">Oturum kontrol ediliyor…</div>;
  }

  if (!isStaff || (adminOnly && !isSuperAdmin)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md text-center p-8 bg-white border border-slate-200 rounded-2xl">
          <h1 className="text-xl font-bold text-slate-900">Yetkili personel girişi gerekli</h1>
          <p className="mt-3 text-sm text-slate-600">
            {adminOnly ? 'Bu alana yalnızca sistem yöneticileri erişebilir.' : 'Bu alana erişmek için personel hesabınızla giriş yapın.'}
          </p>
          <Link to="/admin" className="inline-block mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl">Personel Girişi</Link>
        </div>
      </div>
    );
  }

  return children;
}
