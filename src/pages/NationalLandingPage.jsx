import React, { useState } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { SITE_CONFIG } from '../config/siteConfig';
import { regionsData } from '../data/regionsData';
import { LocationShareButton } from '../components/LocationShareButton';
import { 
  ShieldCheck, Wrench, Truck, Activity, Phone, MessageSquare, 
  MapPin, Clock, ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, Layers, Cpu
} from 'lucide-react';

export function NationalLandingPage() {
  const [activeRegion, setActiveRegion] = useState(regionsData[2]); // Akdeniz default

  const faqList = [
    {
      q: 'Türkiye geneli şantiyelere mobil servis ne kadar sürede ulaşır?',
      a: 'Çukurova ve Akdeniz bölgesinde 30-90 dakika, Marmara, Ege ve İç Anadolu sanayi koridorlarında 2-4 saat, Doğu ve Karadeniz bölgelerinde ise en yakın bölge lojistik noktamızdan ortalama 3-6 saat içinde intikal edilmektedir.'
    },
    {
      q: 'Hangi marka ve model iş makinelerine servis sağlıyorsunuz?',
      a: 'Caterpillar (CAT), Komatsu, JCB, Hidromek, Volvo Construction, Hitachi, Liebherr, Manitou, Merlo, Bobcat, Doosan ve Hyundai gibi tüm ağır inşaat ve madencilik iş makinelerine teknik servis ve revizyon hizmeti veriyoruz.'
    },
    {
      q: 'Şantiyede yerinde hangi onarımlar gerçekleştirilebilir?',
      a: '1/4" - 2" arası 4 telli hidrolik hortum presleme, elektronik arıza tespiti (DTC okuma), valf ve silindir sızdırmazlık keçe değişimi, periyodik filtre ve yağ bakımı, seyyar borwerk delik işleme ve gazaltı kaynak tahkimatı şantiyede yerinde yapılır.'
    },
    {
      q: 'Servis ve parça garantisi veriliyor mu?',
      a: 'Evet, MESA İş Makinaları tarafından yapılan tüm mekanik, motor ve hidrolik revizyonlar 12 ay veya 2.000 çalışma saati resmi servis garantisi altındadır.'
    }
  ];

  const nationalSchema = {
    '@type': 'Service',
    'name': 'Türkiye Geneli İş Makinaları Teknik Servisi',
    'serviceType': 'Ağır İş Makinası ve Hidrolik Saha Servisi',
    'provider': {
      '@type': 'LocalBusiness',
      'name': SITE_CONFIG.legalName,
      'telephone': SITE_CONFIG.phoneRaw,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': SITE_CONFIG.headquarters.district,
        'addressRegion': SITE_CONFIG.headquarters.city,
        'addressCountry': 'TR'
      }
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Turkey'
    },
    'description': 'Türkiye genelinde 81 ilde şantiyelerde yerinde mobil iş makinası tamiri, hidrolik pompa test tezgahı, arıza tespiti ve periyodik bakım hizmeti.'
  };

  const faqSchema = {
    '@type': 'FAQPage',
    'mainEntity': faqList.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  };

  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Türkiye İş Makinaları Servisi', url: '/turkiye-is-makinalari-servisi' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-red-600 selection:text-white">
      <SEO 
        title="Türkiye İş Makinaları Servisi | MESA İş Makinaları"
        description="Türkiye genelinde 81 ilde şantiyede 7/24 yerinde mobil iş makinası tamiri, hidrolik revizyon, ekskavatör ve telehandler servisi. 7/24 Acil Çağrı: 0533 529 36 74."
        canonical="/turkiye-is-makinalari-servisi"
        keywords="türkiye iş makinaları servisi, türkiye geneli iş makinası tamiri, mobil iş makinası servisi, hidrolik servis türkiye, şantiye teknik servis, ekskavatör servisi türkiye"
        schema={[nationalSchema, faqSchema]}
        breadcrumbs={breadcrumbs}
      />

      {/* ── Breadcrumb Bar ── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-red-600 transition">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Türkiye İş Makinaları Servisi</span>
          </nav>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 py-16 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Ulusal Saha Destek Altyapısı</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Türkiye Geneli <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-amber-600">
                İş Makinaları Teknik Servis
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              MESA İş Makinaları; Türkiye’nin 7 coğrafi bölgesindeki otoyol, tünel, baraj, maden ve inşaat şantiyelerine <strong className="text-slate-900 font-semibold">5 tam donanımlı gezici mobil servis aracı</strong>, 450 Bar dinamik hidrolik test standı ve seyyar borwerk delik işleme tezgahları ile 7/24 kesintisiz yerinde teknik müdahale sağlar.
            </p>

            {/* Quick Action CTA & GPS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:05335293674"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-red-600/20"
              >
                <Phone className="w-4 h-4" />
                <span>7/24 Acil Çağrı: 0533 529 36 74</span>
              </a>

              <Link
                to="/ariza-bildir"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 flex items-center gap-2 transition shadow-xs"
              >
                <Wrench className="w-4 h-4 text-red-600" />
                <span>Online Arıza Bildir</span>
              </Link>

              <LocationShareButton />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7 Coğrafi Bölge Lojistik Hub Gezgini ── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-2">Bölgesel Sevkiyat Ağı</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Türkiye'nin 7 Bölgesinde Mobil Servis Sevkiyatı
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Şantiyenizin bulunduğu coğrafi bölgeyi seçerek servis reaksiyon sürelerimizi ve desteklenen şehirleri inceleyin.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {regionsData.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveRegion(reg)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeRegion.id === reg.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {reg.shortName}
              </button>
            ))}
          </div>

          {/* Active Region Card */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Hizmet Bölgesi</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">{activeRegion.name}</h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">{activeRegion.hubCenter}</p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold inline-flex items-center gap-1.5 self-start md:self-center">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeRegion.dispatchTime}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed my-4">
              {activeRegion.description}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-900 block mb-2">Kapsamdaki İller:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeRegion.cities.map((city, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-medium"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 flex items-center justify-between">
              <span className="text-xs text-slate-500">Bu bölgedeki şantiyeniz için servis talep edin:</span>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(`Merhaba MESA Servis, ${activeRegion.name} bölgesindeki iş makinam için servis talep ediyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700"
              >
                <span>WhatsApp ile İletişime Geç</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ulusal Hizmet Alanlarımız ── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-2">Uzmanlık Alanlarımız</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Saha ve Atölye Teknik Hizmetlerimiz
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/is-makinalari-servisi"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                İş Makinası Tamiri & Revizyon
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Ekskavatör, loder ve bekoloder güç aktarım, motor, yürüyüş ve şasi revizyonu.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/hidrolik-servis"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Hidrolik Pompa & Sistem Tamiri
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Kawasaki, Rexroth, Parker ana pompa ve valf bloklarının 450 Bar dinamik test standında revizyonu.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/mobil-teknik-servis"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                7/24 Mobil Şantiye Servisi
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Yerinde hortum presleme, acil kaynak, marş/şarj dinamoları ve motor arıza tespiti.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/teleskopik-yukleyici-servisi"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Teleskopik Yükleyici (Telehandler)
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Manitou, Merlo, JCB Loadall bom zincirleri, moment sensörü kalibrasyonu ve hidrolik revizyon.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/forklift-servisi"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Endüstriyel Forklift Servisi
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Dizel, akülü ve LPG forkliftler için asansör zinciri, cer motoru ve şanzıman revizyonu.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              to="/is-makinasi-ariza-tespiti"
              className="group bg-white p-6 rounded-2xl border border-slate-200 hover:border-red-300 transition-all shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                Elektronik Arıza Tespiti & Diagnostik
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                OEM orijinal arıza tespit cihazlarıyla CAN-bus hatları, ECU ve sensör teşhisi.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
                <span>Detaylı Bilgi</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Sıkça Sorulan Sorular (FAQ) ── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-1">Merak Edilenler</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Türkiye Geneli Teknik Servis Hakkında SSS
            </h2>
          </div>

          <div className="space-y-4">
            {faqList.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 flex items-start gap-2">
                  <span className="text-red-600 font-black">?</span>
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 pl-4 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ulusal Acil Çağrı CTA ── */}
      <section className="py-12 bg-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Şantiyenizde İş Makinası mı Arızalandı?
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Hemen teknik servis sorumlumuzla görüşün veya şantiye konumunuzu iletin; en yakın mobil ekibimiz harekete geçsin.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:05335293674"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition shadow-lg shadow-red-600/30 flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>0533 529 36 74 Ara</span>
            </a>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent('Merhaba MESA Servis, acil iş makinası arızası bildirmek istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Servis Hattı</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NationalLandingPage;
