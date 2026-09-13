import React from 'react';
import { Link } from '../router/Router';
import { ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import './SiteChrome.css';

export const Footer = () => (
  <footer className="mesa-footer">
    <div className="site-chrome-container">
      <div className="site-footer-heading"><p>GÜÇLÜ MAKİNALAR.<br /><span>GÜVENİLİR ÇÖZÜMLER.</span></p><Link to="/iletisim">Birlikte çalışalım <ArrowUpRight size={26} aria-hidden="true" /></Link></div>
      <div className="site-footer-main">
        <div className="site-footer-about">
          <Link to="/" className="site-brand" aria-label="MESA İş Makinaları — Ana sayfa">
            <div className="bg-white/95 px-3 py-1.5 rounded-xl inline-block shadow-sm">
              <img src="/images/mesa-logo.png" alt="MESA İş Makinaları" className="h-8 md:h-9 w-auto object-contain" />
            </div>
          </Link>
          <p>İş makinanızın gücüne güç katıyoruz. Adana ve çevre illerde teknik servis, hidrolik revizyon ve yedek parça çözümleri.</p>
          <a className="site-footer-whatsapp" href="https://wa.me/905344075585" target="_blank" rel="noopener noreferrer">WhatsApp ile ulaşın <ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="site-footer-links"><h3>KEŞFEDİN</h3><Link to="/hizmetler">Hizmetlerimiz</Link><Link to="/yedek-parca">Yedek Parça</Link><Link to="/markalar">Markalar</Link><Link to="/filo">Mobil Servis Filosu</Link><Link to="/hakkimizda">Kurumsal</Link><Link to="/rehberler">Teknik Rehberler</Link></div>
        <div className="site-footer-links"><h3>SERVİS & DESTEK</h3><Link to="/ariza-bildir">Servis Talebi Oluştur</Link><Link to="/servis-takip">Servis Takibi</Link><Link to="/ariza-kodu-cozucu">Arıza Kodu Çözücü</Link><Link to="/musteri-portali">Müşteri Portalı</Link><Link to="/teknisyen">Teknisyen Portalı</Link><Link to="/panel">Yönetim Paneli</Link></div>
        <div className="site-footer-contact"><h3>BİZE ULAŞIN</h3><a className="site-footer-phone" href="tel:05335293674"><Phone size={16} aria-hidden="true" />0533 529 36 74</a><a href="mailto:info@mesaisk.com"><Mail size={15} aria-hidden="true" />info@mesaisk.com</a><p><MapPin size={17} aria-hidden="true" /><span>Seyhan OSB, Şantiyeler Yolu No: 48<br />Seyhan / Adana</span></p><span className="site-footer-available"><i aria-hidden="true" />7/24 mobil servis desteği</span></div>
      </div>
      <div className="site-footer-bottom"><p>© {new Date().getFullYear()} MESA İş Makinaları. Tüm hakları saklıdır.</p><div><Link to="/admin">Yönetici Girişi</Link><Link to="/iletisim">İletişim <ArrowUpRight size={13} aria-hidden="true" /></Link></div></div>
    </div>
  </footer>
);
