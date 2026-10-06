import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from '../router/Router';
import { SEO } from '../components/SEO';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, 
  Crown, CheckCircle2, AlertCircle, Wrench, LogOut, ArrowLeft,
  User, Building2
} from 'lucide-react';

// Yalnızca site içi göreli yollara yönlendir (open-redirect koruması)
function safeNext(search) {
  try {
    const next = new URLSearchParams(search).get('next') || '';
    return next.startsWith('/') && !next.startsWith('//') ? next : '';
  } catch {
    return '';
  }
}

function defaultRouteFor(role) {
  if (role === 'technician') return '/teknisyen';
  if (role === 'customer_admin') return '/musteri-portali';
  return '/panel';
}

export function AdminLoginPage() {
  const { user, isSuperAdmin, isTechnician, login, verifyMfa, mfaChallenge, logout, loginError, setLoginError, ensureAuth, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();
  const nextPath = safeNext(search);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [mfaCode, setMfaCode] = useState('');

  useEffect(() => { ensureAuth(); }, [ensureAuth]);

  const goAfterLogin = (role) => {
    setSuccessToast(true);
    setTimeout(() => navigate(nextPath || defaultRouteFor(role), { replace: true }), 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        setPassword('');
        goAfterLogin(res.user?.role);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await verifyMfa(mfaCode);
    setLoading(false);
    if (res.success) {
      setPassword('');
      goAfterLogin(res.user?.role);
    }
  };

  // If already logged in
  if (user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <SEO 
          title="Oturum Açık | MESA Portal"
          description="Mesa İş Makinaları yönetim ve operasyon paneli."
          noindex
        />
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl backdrop-blur-xl animate-fadeIn space-y-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-red-700 text-white flex items-center justify-center mx-auto shadow-xl shadow-red-600/25 border border-red-400/30">
            {isSuperAdmin ? <Crown className="w-10 h-10" /> : isTechnician ? <Wrench className="w-10 h-10" /> : <User className="w-10 h-10" />}
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider border border-red-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Oturum Aktif: {user.roleTitle || user.role}
          </span>

          <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
          <p className="text-sm text-slate-500">{user.email}</p>

          <div className="pt-4 space-y-2.5">
            {isSuperAdmin && (
              <Link
                to="/panel"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition active:scale-98"
              >
                <span>ERP Yönetim Paneline Git</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {(isTechnician) && (
              <Link
                to="/teknisyen"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
                <span>Saha Teknisyen Terminaline Git</span>
              </Link>
            )}

            {(user.role === 'customer_admin' || isSuperAdmin) && (
              <Link
                to="/musteri-portali"
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition border border-slate-200"
              >
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Müşteri Portalına Git</span>
              </Link>
            )}

            <button
              onClick={() => logout()}
              className="w-full py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-2 transition border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Oturumu Kapat</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50 relative overflow-hidden">
      <SEO 
        title="Güvenli Personel & Yönetici Girişi | MESA ERP"
        description="MESA İş Makinaları telematik, ERP, saha teknisyen ve müşteri yönetim sistemi giriş ekranı."
        noindex
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Top Back Link */}
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="text-xs font-mono text-slate-400">v3.0 Multi-Role ERP</span>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm mb-3">
              <img src="/images/mesa-logo.png" alt="MESA İş Makinaları" className="h-7 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Kurumsal Portala Giriş</h1>
            <p className="text-xs text-slate-500 mt-1">
              Yönetici, saha teknisyeni, finans veya kurumsal müşteri oturumu
            </p>
          </div>

          {/* Success Banner */}
          {successToast && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Giriş başarılı! İlgili panele yönlendiriliyorsunuz...</span>
            </div>
          )}

          {/* Error Banner */}
          {loginError && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          {mfaChallenge ? (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <b>İki aşamalı doğrulama gerekli.</b><br />Authenticator uygulamanızdaki 6 haneli kodu girin.
                {import.meta.env.DEV && <><br />Yerel geliştirme ortamı kodu: <b>123456</b></>}
              </div>
              <input
                value={mfaCode}
                onChange={e => setMfaCode(e.target.value)}
                inputMode="numeric"
                maxLength={6}
                autoFocus
                placeholder="000000"
                className="w-full py-4 text-center tracking-[0.5em] font-mono text-xl bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500"
              />
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3.5 rounded-xl bg-red-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><ShieldCheck className="w-4 h-4" /><span>Kodu Doğrula</span></>}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  E-Posta Adresi
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@mesaismakineleri.com.tr"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Şifre
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-red-500 transition"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    aria-label={showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !isAuthReady}
                className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 transition active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Güvenli Giriş Yap</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-[11px] text-slate-500 leading-relaxed">
            Hesabınız yok veya şifrenizi unuttunuz mu?{' '}
            <a href="mailto:servis@mesaismakineleri.com.tr" className="font-bold text-slate-700 hover:text-red-600">
              Sistem yöneticisine yazın
            </a>
          </div>

        </div>

        {/* Security Info */}
        <div className="mt-5 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Şifreli Tenant Korumalı ERP Altyapısı</span>
        </div>

      </div>
    </div>
  );
}
