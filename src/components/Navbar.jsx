import React, { useState } from 'react';
import { Link, useLocation } from '../router/Router';
import { Phone, Wrench, ChevronDown, Menu, X, ArrowRight, Globe, ShoppingCart, Cpu, PackageCheck } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { useOperational } from '../context/OperationalContext';

export const Navbar = () => {
  const { pathname } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { cart } = useOperational();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const languages = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/hizmetler', isDropdown: true },
    { name: 'Arıza Çözücü', href: '/ariza-kodu-cozucu', isSpecial: true },
    { name: 'Yedek Parça', href: '/yedek-parca' },
    { name: t('brands'), href: '/markalar' },
    { name: t('fleet'), href: '/filo' },
    { name: t('guides'), href: '/rehberler' },
    { name: t('about'), href: '/hakkimizda' },
    { name: t('contact'), href: '/iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Emergency Alert Ticker */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-1.5 px-4 text-xs font-bold shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span className="tracking-wide uppercase">{t('tickerAlert')}</span>
            <span className="font-medium hidden sm:inline">{t('tickerText')}</span>
          </div>
          <a
            href="tel:05335293674"
            className="flex items-center gap-1.5 bg-slate-950 text-amber-400 px-3 py-0.5 rounded-full hover:bg-slate-900 transition-colors shadow-sm ml-2 shrink-0"
          >
            <Phone className="w-3 h-3" />
            <span>0533 529 36 74</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white">MESA</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">SERVİS</span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase block font-medium">İş Makinaları & Hidrolik</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              link.isDropdown ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                      pathname.startsWith('/hizmetler')
                        ? 'text-amber-400 font-bold bg-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </Link>

                  {/* Mega Dropdown */}
                  {servicesDropdownOpen && (
                    <div className="absolute top-full left-0 w-[580px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      {servicesData.slice(0, 8).map((s) => (
                        <Link
                          key={s.id}
                          to={`/hizmetler/${s.slug}`}
                          className="p-3 rounded-xl hover:bg-slate-800/80 transition-colors flex flex-col group/item"
                        >
                          <span className="text-xs font-bold text-white group-hover/item:text-amber-400 transition-colors">
                            {s.title}
                          </span>
                          <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {s.shortDesc}
                          </span>
                        </Link>
                      ))}
                      <div className="col-span-2 pt-2 border-t border-slate-800 mt-1 flex justify-between items-center text-xs">
                        <Link to="/hizmetler" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
                          {t('allServices')} (11) <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <span className="text-slate-500">12 Ay / 2.000 Saat Garanti</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    link.isSpecial 
                      ? 'text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20'
                      : pathname === link.href
                        ? 'text-amber-400 font-bold bg-amber-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop Right CTAs + Language Selector */}
          <div className="hidden lg:flex items-center gap-2.5">
            
            {/* Cart Button */}
            <Link
              to="/yedek-parca"
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white transition-colors"
              title="Yedek Parça Sepeti"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                title="Dil Seçimi / Change Language"
              >
                <span>{currentLang.flag}</span>
                <span>{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                        lang === l.code ? 'bg-amber-500/20 text-amber-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-sm">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/servis-takip"
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
            >
              {t('serviceTracking')}
            </Link>
            <Link
              to="/ariza-bildir"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>{t('emergencyCall')}</span>
            </Link>
          </div>

          {/* Mobile Menu Button + Quick Lang Switch */}
          <div className="xl:hidden flex items-center gap-2">
            <Link
              to="/yedek-parca"
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[9px] font-black flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => {
                const nextLang = lang === 'tr' ? 'en' : lang === 'en' ? 'ar' : 'tr';
                setLang(nextLang);
              }}
              className="px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400"
            >
              {currentLang.flag} {currentLang.code.toUpperCase()}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                pathname === link.href || (link.isDropdown && pathname.startsWith('/hizmetler'))
                  ? 'bg-amber-500/10 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <Link
              to="/servis-takip"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold border border-slate-800"
            >
              {t('serviceTracking')}
            </Link>
            <Link
              to="/ariza-bildir"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold shadow-lg"
            >
              {t('emergencyCall')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
