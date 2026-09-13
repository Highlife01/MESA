import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '../router/Router';
import { Phone, ChevronDown, Menu, X, ArrowUpRight, MapPin, ShoppingCart, LogOut, Lock } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { useLanguage } from '../context/LanguageContext';
import { useOperational } from '../context/OperationalContext';
import { useAuth } from '../context/AuthContext';
import './SiteChrome.css';

const languages = [{ code: 'tr', label: 'Türkçe' }, { code: 'en', label: 'English' }, { code: 'ar', label: 'العربية' }];

export const Navbar = () => {
  const { pathname } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { cart } = useOperational();
  const { user, isSuperAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileButtonRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const languageButtonRef = useRef(null);
  const cartItemCount = cart.reduce((sum, item) => sum + (item.quantity || item.qty || 0), 0);
  const localized = (tr, en, ar) => lang === 'en' ? en : lang === 'ar' ? ar : tr;
  const serviceRequest = localized('Servis Talebi', 'Request Service', 'طلب خدمة');
  const closeMenus = () => { setMobileMenuOpen(false); setServicesDropdownOpen(false); setLangDropdownOpen(false); };

  useEffect(() => { closeMenus(); }, [pathname]);
  useEffect(() => {
    const onPointerDown = (event) => { if (!headerRef.current?.contains(event.target)) closeMenus(); };
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      if (mobileMenuOpen) mobileButtonRef.current?.focus();
      else if (servicesDropdownOpen) servicesButtonRef.current?.focus();
      else if (langDropdownOpen) languageButtonRef.current?.focus();
      closeMenus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('pointerdown', onPointerDown); document.removeEventListener('keydown', onKeyDown); };
  }, [mobileMenuOpen, servicesDropdownOpen, langDropdownOpen]);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/hizmetler', dropdown: true },
    { name: localized('Bakım Hesapla', 'Maintenance Calc', 'حاسبة الصيانة'), href: '/bakim-hesaplayici' },
    { name: localized('Yedek Parça', 'Spare Parts', 'قطع الغيار'), href: '/yedek-parca' },
    { name: localized('18 Mobil Filo', '18 Mobile Fleet', 'الأسطول المتنقل'), href: '/filo' },
    { name: t('brands'), href: '/markalar' },
    { name: t('contact'), href: '/iletisim' },
  ];
  const isActive = (href) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <header className="mesa-header" ref={headerRef}>
      <div className="site-utility"><div className="site-chrome-container site-utility-inner">
        <div className="site-utility-location"><span className="site-location"><MapPin size={12} aria-hidden="true" /> Adana, Türkiye</span><span className="site-availability"><i aria-hidden="true" /> {localized('7/24 mobil servis desteği', '24/7 mobile service support', 'خدمة متنقلة على مدار الساعة')}</span></div>
        <div className="site-utility-actions">
          <Link className="site-utility-desktop" to="/servis-takip">{t('serviceTracking')}</Link>
          <Link className="site-utility-desktop site-cart-link" to="/yedek-parca" aria-label={localized(`Yedek parça sepeti, ${cartItemCount} ürün`, `Parts cart, ${cartItemCount} items`, `سلة قطع الغيار، ${cartItemCount}`)}><ShoppingCart size={13} aria-hidden="true" />{cartItemCount > 0 && <span>{cartItemCount}</span>}</Link>
          <div className="site-language site-utility-desktop" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setLangDropdownOpen(false); }}>
            <button ref={languageButtonRef} type="button" className="site-language-trigger" aria-label="Dil seçimi / Change language" aria-expanded={langDropdownOpen} aria-controls="site-language-options" onClick={() => { setLangDropdownOpen(!langDropdownOpen); setServicesDropdownOpen(false); }}>{lang.toUpperCase()} <ChevronDown size={11} aria-hidden="true" /></button>
            {langDropdownOpen && <div id="site-language-options" className="site-language-options">{languages.map((language) => <button key={language.code} type="button" aria-pressed={lang === language.code} onClick={() => { setLang(language.code); setLangDropdownOpen(false); }}>{language.label}</button>)}</div>}
          </div>
          {isSuperAdmin ? <><Link className="site-utility-desktop" to="/panel" title={user?.name}>Yönetim</Link><button className="site-utility-desktop site-logout" onClick={logout} aria-label="Oturumu kapat"><LogOut size={12} aria-hidden="true" /></button></> : <Link className="site-utility-desktop site-admin-link" to="/admin" aria-label="Yönetici girişi"><Lock size={12} aria-hidden="true" /></Link>}
          <a className="site-utility-phone" href="tel:05335293674"><Phone size={12} aria-hidden="true" /><span>0533 529 36 74</span></a>
        </div>
      </div></div>

      <div className="site-chrome-container site-navbar">
        <Link to="/" className="site-brand" aria-label="MESA İş Makinaları — Ana sayfa" onClick={closeMenus}>
          <div className="site-brand-badge">
            <img src="/images/mesa-logo.png" alt="MESA İş Makinaları" className="site-brand-img" />
          </div>
        </Link>
        <nav className="site-desktop-nav" aria-label="Ana navigasyon">
          {navLinks.map((link) => link.dropdown ? (
            <div key={link.href} className="site-services-nav" onMouseEnter={() => { setServicesDropdownOpen(true); setLangDropdownOpen(false); }} onMouseLeave={() => { if (!headerRef.current?.querySelector('.site-services-nav')?.contains(document.activeElement)) setServicesDropdownOpen(false); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesDropdownOpen(false); }}>
              <div className={`site-nav-dropdown-trigger ${isActive(link.href) ? 'is-active' : ''}`}><Link to={link.href} aria-current={isActive(link.href) ? 'page' : undefined} onClick={closeMenus}>{link.name}</Link><button ref={servicesButtonRef} type="button" aria-expanded={servicesDropdownOpen} aria-controls="site-services-menu" aria-label={localized('Hizmetler menüsünü aç', 'Open services menu', 'افتح قائمة الخدمات')} onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}><ChevronDown size={13} aria-hidden="true" /></button></div>
              {servicesDropdownOpen && <div id="site-services-menu" className="site-services-menu"><p>{localized('MAKİNANIZ İÇİN UZMAN ÇÖZÜMLER', 'EXPERT SOLUTIONS FOR YOUR MACHINERY', 'حلول متخصصة لآلاتك')}</p><div className="site-services-menu-grid">{servicesData.slice(0, 8).map((service) => <Link key={service.id} to={`/hizmetler/${service.slug}`} onClick={closeMenus}><span>{service.title}</span><ArrowUpRight size={15} aria-hidden="true" /></Link>)}</div><Link className="site-all-services" to="/hizmetler" onClick={closeMenus}>{t('allServices')} <ArrowUpRight size={16} aria-hidden="true" /></Link></div>}
            </div>
          ) : <Link key={link.href} className={`site-nav-link ${isActive(link.href) ? 'is-active' : ''}`} to={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>{link.name}</Link>)}
        </nav>
        <div className="site-navbar-actions"><Link className="site-service-cta" to="/ariza-bildir" onClick={closeMenus}>{serviceRequest}<ArrowUpRight size={18} aria-hidden="true" /></Link><button ref={mobileButtonRef} className="site-mobile-toggle" type="button" aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-controls="site-mobile-menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}</button></div>
      </div>

      {mobileMenuOpen && <div id="site-mobile-menu" className="site-mobile-menu">
        <nav aria-label="Mobil navigasyon">{navLinks.map((link) => <Link key={link.href} to={link.href} className={isActive(link.href) ? 'is-active' : ''} onClick={closeMenus} aria-current={isActive(link.href) ? 'page' : undefined}>{link.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>
        <div className="site-mobile-extras"><Link to="/servis-takip" onClick={closeMenus}>{t('serviceTracking')}</Link><Link to="/ariza-kodu-cozucu" onClick={closeMenus}>Arıza Kodu Çözücü</Link><Link to="/filo" onClick={closeMenus}>{t('fleet')}</Link><Link to="/rehberler" onClick={closeMenus}>{t('guides')}</Link><Link to="/yedek-parca" onClick={closeMenus}>Sepet ({cartItemCount})</Link><Link to={isSuperAdmin ? '/panel' : '/admin'} onClick={closeMenus}>{isSuperAdmin ? `Yönetim: ${user?.name || 'Admin'}` : 'Yönetici Girişi'}</Link>{isSuperAdmin && <button type="button" onClick={() => { logout(); closeMenus(); }}>Oturumu Kapat</button>}</div>
        <div className="site-mobile-languages" aria-label="Dil seçimi">{languages.map((language) => <button type="button" key={language.code} aria-pressed={lang === language.code} onClick={() => setLang(language.code)}>{language.label}</button>)}</div>
        <Link className="site-service-cta site-mobile-cta" to="/ariza-bildir" onClick={closeMenus}>{serviceRequest}<ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>}
    </header>
  );
};
