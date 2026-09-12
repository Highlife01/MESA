import React from 'react';
import { Link } from '../router/Router';
import { Wrench, Phone, Mail, MapPin, ShieldCheck, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      {/* Top Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">7/24 Kesintisiz Mobil Servis</h4>
                <p className="text-slate-400 mt-0.5">Adana ve çevre illerde 30 dakikada şantiyede müdahale.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">12 Ay Yazılı Garanti</h4>
                <p className="text-slate-400 mt-0.5">Tüm revizyonlu pompa, şanzıman ve motorlarda resmi garanti.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">18 Donanımlı Mobil Araç</h4>
                <p className="text-slate-400 mt-0.5">500 bar seyyar hidrolik pres, jeneratör ve OEM parçalar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: About */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">MESA İŞ MAKİNALARI</span>
                <span className="text-[10px] text-amber-400 block font-semibold uppercase tracking-wider">Teknik Servis & Hidrolik A.Ş.</span>
              </div>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Çukurova bölgesinin lider mobil iş makinası servisi. JCB, Caterpillar, Hidromek, Komatsu ve Volvo ekskavatör, loder ve vinç sistemleri için yerinde tamir ve revizyon.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="tel:05335293674"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>0533 529 36 74</span>
              </a>
            </div>
          </div>

          {/* Col 2: Hizmetlerimiz */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hızlı Erişim</h4>
            <ul className="space-y-2">
              <li><Link to="/ariza-kodu-cozucu" className="hover:text-amber-400 transition">DTC Arıza Çözücü</Link></li>
              <li><Link to="/yedek-parca" className="hover:text-amber-400 transition">OEM Yedek Parça</Link></li>
              <li><Link to="/hizmetler" className="hover:text-amber-400 transition">Tüm Hizmetlerimiz</Link></li>
              <li><Link to="/markalar" className="hover:text-amber-400 transition">Desteklenen Markalar</Link></li>
              <li><Link to="/filo" className="hover:text-amber-400 transition">Mobil Servis Filosu</Link></li>
              <li><Link to="/rehberler" className="hover:text-amber-400 transition">Teknik Rehberler</Link></li>
            </ul>
          </div>

          {/* Col 3: Müşteri & Portallar */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Portallar & Takip</h4>
            <ul className="space-y-2">
              <li><Link to="/servis-takip" className="hover:text-amber-400 transition">Canlı Servis Takip</Link></li>
              <li><Link to="/ariza-bildir" className="hover:text-amber-400 transition">7/24 Acil Çağrı Aç</Link></li>
              <li><Link to="/teknisyen" className="hover:text-amber-400 transition">Teknisyen Mobil Portalı</Link></li>
              <li><Link to="/panel" className="hover:text-amber-400 transition">ERP Telematik Panel</Link></li>
              <li><Link to="/musteri-portali" className="hover:text-amber-400 transition">Müşteri Portalı</Link></li>
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">İletişim & Konum</h4>
            <ul className="space-y-2.5 text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Seyhan OSB, Şantiyeler Yolu No: 48, Seyhan / Adana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:05335293674" className="hover:text-white">0533 529 36 74</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@mesaisk.com" className="hover:text-white">info@mesaisk.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} MESA İŞ MAKİNALARI LTD. ŞTİ. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            <Link to="/hakkimizda" className="hover:text-slate-400">Hakkımızda</Link>
            <Link to="/iletisim" className="hover:text-slate-400">İletişim</Link>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="hover:text-slate-400 flex items-center gap-1">
              Google Maps <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
