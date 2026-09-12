import React from 'react';
import { Link } from '../router/Router';
import { Phone, Mail, MapPin, Wrench, Shield, Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">MESA</span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold ml-1.5">İŞ MAKİNALARI</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Adana ve Çukurova genelinde 18 mobil servis aracı, 2.500 m² entegre atölye ve 450 bar test istasyonumuzla paletli ekskavatör, bekoloder ve telehandler sınıfı iş makinelerine 7/24 garantili revizyon desteği.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="tel:05335293674"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" /> 0533 529 36 74
              </a>
              <Link
                to="/ariza-bildir"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-800 transition-colors"
              >
                <span>Acil Sihirbaz</span>
              </Link>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Hizmetlerimiz</h4>
            <ul className="space-y-2.5 text-xs">
              {servicesData.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/hizmetler/${s.slug}`} className="hover:text-amber-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/hizmetler" className="text-amber-400 font-semibold hover:underline">
                  Tüm Hizmetler (11) →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Guides & Brands */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Teknik & Rehberler</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/rehberler" className="hover:text-amber-400 transition-colors">Teknik Bilgi Bankası</Link></li>
              <li><Link to="/rehberler/hidrolik-yag-kirliligi-ve-pompa-omru" className="hover:text-amber-400 transition-colors">ISO 4406 Yağ Analizi</Link></li>
              <li><Link to="/rehberler/dpf-ve-adblue-arizalarinin-onlenmesi" className="hover:text-amber-400 transition-colors">DPF & AdBlue Çözümleri</Link></li>
              <li><Link to="/markalar" className="hover:text-amber-400 transition-colors">Caterpillar Teşhis</Link></li>
              <li><Link to="/markalar" className="hover:text-amber-400 transition-colors">JCB ServiceMaster</Link></li>
              <li><Link to="/markalar" className="hover:text-amber-400 transition-colors">Hidromek H-Diag</Link></li>
              <li><Link to="/markalar" className="hover:text-amber-400 transition-colors">Komatsu & Volvo</Link></li>
            </ul>
          </div>

          {/* Col 4: Corporate & Portal */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Kurumsal & Portallar</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/hakkimizda" className="hover:text-amber-400 transition-colors">Hakkımızda & Atölye</Link></li>
              <li><Link to="/filo" className="hover:text-amber-400 transition-colors">18 Donanımlı Mobil Filo</Link></li>
              <li><Link to="/servis-takip" className="hover:text-amber-400 transition-colors">Canlı Servis Takibi</Link></li>
              <li><Link to="/musteri-portali" className="hover:text-amber-400 transition-colors">Müşteri B2B Portalı</Link></li>
              <li><Link to="/teknisyen" className="hover:text-amber-400 transition-colors">Teknisyen PWA Ekranı</Link></li>
              <li><Link to="/panel" className="hover:text-amber-400 transition-colors">ERP Yönetim Paneli</Link></li>
              <li><Link to="/iletisim" className="hover:text-amber-400 transition-colors">İletişim & Konum</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2008 - 2026 Mesa İş Makinaları ve Hidrolik Sistemleri San. Tic. Ltd. Şti. Tüm Hakları Saklıdır.
          </div>
          <div className="flex items-center gap-4">
            <span>Adana / Çukurova / Türkiye</span>
            <span>•</span>
            <span className="text-amber-400">7/24 Kesintisiz Şantiye Desteği</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
