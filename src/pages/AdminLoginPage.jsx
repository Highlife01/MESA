import React, { useState } from 'react';
import { Link, useNavigate } from '../router/Router';
import { SEO } from '../components/SEO';
import { useAuth, SUPER_ADMIN_CREDENTIALS } from '../context/AuthContext';
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, 
  Crown, CheckCircle2, AlertCircle, Wrench, Sparkles, LogOut, ArrowLeft
} from 'lucide-react';

export function AdminLoginPage() {
  const { user, isSuperAdmin, login, logout, loginError, setLoginError, isAdminLoginConfigured } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        setSuccessToast(true);
        setTimeout(() => {
          navigate('/panel');
        }, 800);
      }
    }, 400);
  };

  const handleFillSuperAdmin = () => {
    if (!isAdminLoginConfigured) {
      setLoginError('Güvenli yönetici bilgileri henüz yapılandırılmadı. Lütfen .env dosyasını kontrol edin.');
      return;
    }
    setEmail(SUPER_ADMIN_CREDENTIALS.email);
    setPassword(SUPER_ADMIN_CREDENTIALS.password);
    setLoginError('');
  };

  // If already logged in
  if (user && isSuperAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <SEO 
          title="Süper Admin Oturumu Açık | MESA ERP"
          description="Mesa İş Makinaları Süper Admin yönetim paneli."
        />
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl backdrop-blur-xl animate-fadeIn">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-red-700 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-600/25 border border-red-400/30">
            <Crown className="w-10 h-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider border border-red-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Süper Admin Oturumu Aktif
          </span>

          <h2 className="text-2xl font-black text-slate-900">{user.name}</h2>
          <p className="text-sm text-slate-500 mt-1">{user.email}</p>
          <p className="text-xs text-slate-600 font-mono mt-2 bg-slate-100 py-1 px-3 rounded-lg inline-block border border-slate-200">
            Tam Yetkili Sistem Yöneticisi
          </p>

          <div className="mt-8 space-y-3">
            <Link
              to="/panel"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-transform active:scale-98"
            >
              <span>ERP Yönetim Paneline Git</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={logout}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition border border-slate-200"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Oturumu Kapat</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-slate-50 relative overflow-hidden">
      <SEO 
        title="Süper Admin Girişi | MESA İş Makinaları ERP"
        description="MESA İş Makinaları telematik ve ERP yönetim sistemi süper admin güvenli giriş ekranı."
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Top Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          <span className="text-xs font-mono text-slate-400">v2.6 Secure ERP</span>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm mb-4">
              <img src="/images/mesa-logo.png" alt="MESA İş Makinaları" className="h-7 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Süper Admin Girişi</h1>
            <p className="text-xs text-slate-500 mt-1.5">
              MESA Telematik, Saha Filosu & ERP Yönetim Portalı
            </p>
          </div>

          {/* Success Banner */}
          {successToast && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Giriş başarılı! Yönetim paneline yönlendiriliyorsunuz...</span>
            </div>
          )}

          {/* Error Banner */}
          {loginError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold flex items-center gap-2.5 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yönetici E-Posta Adresi
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="cebrailkara@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500 transition"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Şifre
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500 transition font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition"
                  aria-label={showPassword ? 'Şifreyi Gizle' : 'Şifreyi Göster'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 transition-all duration-200 active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Süper Admin Olarak Giriş Yap</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Fill Button */}
          {isAdminLoginConfigured ? (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={handleFillSuperAdmin}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>Güvenli Yönetici Bilgilerini Doldur ({SUPER_ADMIN_CREDENTIALS.name})</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-[11px] text-red-600 text-center">
                Yönetici hesabı henüz yapılandırılmadı. Lütfen .env dosyasına güvenli giriş bilgileri ekleyin.
              </p>
            </div>
          )}

        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit SSL Uçtan Uca Şifreli ERP İletişimi</span>
        </div>

      </div>
    </div>
  );
}
