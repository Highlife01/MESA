import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { Link } from '../router/Router';
import { Truck, ShieldCheck, Wrench, Clock, MapPin, CheckCircle2, Zap, Radio, Activity, Navigation, Phone, MessageSquare, Gauge, AlertCircle, Sparkles } from 'lucide-react';

export const FleetPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('ceyhan');

  const regions = {
    ceyhan: {
      name: 'Ceyhan & Yumurtalık Enerji Sahası',
      city: 'Adana',
      dist: '28 km',
      eta: '25 - 35 dk',
      nearestVan: '01 MSA 01 - Ford Transit 4x4 (Mobil Atölye 1)',
      tech: 'Mehmet Usta (Baş Teknisyen - 18 Yıl Tecrübe)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Finn-Power P20 Mobil Hortum Presi', 'CAT ET & JCB Diagnostik Laptop', 'Kaeser Vidalı Kompresör', '600 Bar Manometre'],
      notes: 'BOTAŞ, Toros Tarım ve Ceyhan Petrokimya sahalarına acil servis geçiş kartı mevcut.'
    },
    merkez: {
      name: 'Adana Merkez (Seyhan, Yüreğir, Sarıçam OSB)',
      city: 'Adana',
      dist: '9 km',
      eta: '15 - 20 dk',
      nearestVan: '01 MSA 02 - Iveco Daily Yüksek Tavan (Mobil Atölye 2)',
      tech: 'Ahmet Usta (Powershift & Hidrolik Uzmanı)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Araç İçi Tesviye Tezgahı', 'Tüm Markalar İçin ECU Test Seti', '500 Lt Hidrolik Yağ Tankı', '12 kW Dizel Jeneratör'],
      notes: 'Hacı Sabancı OSB ve Seyhan Metal Sanayi sahasına 15 dakikada yerinde varış garantisi.'
    },
    mersin: {
      name: 'Mersin Limanı, Serbest Bölge & Tarsus OSB',
      city: 'Mersin',
      dist: '42 km',
      eta: '30 - 45 dk',
      nearestVan: '01 MSA 03 - Renault Master Ağır Mobil Atölye',
      tech: 'Can Usta (Liman Ekipmanları & Reach Stacker Uzmanı)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Liman Vinçleri CAN-Bus Teşhis Kiti', 'Mobil Hortum Presi', 'Termal Kaçak Dedektörü', 'Pnömatik Bijon Tabancaları'],
      notes: 'MIP Mersin Uluslararası Limanı ve Tarsus Organize Sanayi sahasında kesintisiz 7/24 nöbet.'
    },
    kozan: {
      name: 'Kozan, İmamoğlu & Kadirli Baraj & Taş Ocakları',
      city: 'Adana / Osmaniye',
      dist: '55 km',
      eta: '35 - 50 dk',
      nearestVan: '01 MSA 06 - MAN TGE 4x4 Ağır Saha Servisi',
      tech: 'Salih Usta (Paletli Ekskavatör & Ağır Motor Uzmanı)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Seyyar Borwerk Pim Delik İşleme', 'Lincoln Gazaltı Kaynak Ünitesi', 'Mobil Azot Tüpleri', 'Ağır Hizmet Kilit Beşikleri'],
      notes: 'Çamurlu maden yolları ve dik taş ocağı rampalarına özel kilitli 4x4 çekiş donanımı.'
    },
    hatay: {
      name: 'İskenderun Demir Çelik, Antakya & Dörtyol',
      city: 'Hatay',
      dist: '68 km',
      eta: '45 - 60 dk',
      nearestVan: '01 MSA 08 - Ford Ranger 4x4 Hızlı Müdahale',
      tech: 'Burak Usta (ECU Teşhis & Common Rail Enjektör)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Mobil Hortum Presi', 'Bosch Common Rail Teşhis Kiti', 'Dijital Debimetre', '24V Hızlı Akü Takviye'],
      notes: 'İskenderun Liman bölgesi ve sanayi tesislerine Otoyol üzerinden ekspres servis.'
    },
    osmaniye: {
      name: 'Osmaniye OSB & Toprakkale Lojistik Bölgesi',
      city: 'Osmaniye',
      dist: '50 km',
      eta: '35 - 45 dk',
      nearestVan: '01 MSA 04 - Isuzu D-Max 4x4 Gezici Servis',
      tech: 'Mustafa Usta (Mobil Torna & Hidrolik Revizyon)',
      phone: '05344075585',
      status: 'Nöbetçi / Çıkışa Hazır',
      hotline: '0534 407 55 85',
      equipment: ['Yerinde Hortum İmalatı', 'Komatsu & Volvo Teşhis Yazılımları', 'Vidalı Kompresör', 'Manuel Hidrolik Test Pompası'],
      notes: 'Osmaniye Demir Çelik OSB fabrikalarına ve lojistik antrepolara hızlı müdahale.'
    }
  };

  const currentHub = regions[selectedRegion] || regions.ceyhan;

  const vehicleClasses = [
    {
      type: 'Ağır Şantiye 4x4 Acil Müdahale Araçları',
      count: '2 Araç',
      chassis: 'Isuzu D-Max & Ford Ranger 4x4 Yükseltilmiş Süspansiyon',
      mission: 'Zorlu taş ocakları, maden sahaları ve çamurlu baraj projelerine doğrudan şantiye içi intikal.',
      equipment: [
        'Kaeser mobil dizel vidalı hava kompresörü (7 bar / 1000 lt/dk)',
        'Finn-Power mobil hidrolik hortum presi (1/4" - 2" arası 4 telli)',
        'Lincoln Electric inverter jeneratörlü gazaltı kaynak ünitesi',
        'Dijital 600 Bar hidrolik manometre ve debimetre test seti',
        'Tüm markalar için orijinal OEM diagnostik laptop seti'
      ]
    },
    {
      type: 'Yüksek Tavanlı Entegre Mobil Atölye Panelvanları',
      count: '2 Araç',
      chassis: 'Ford Transit & Iveco Daily Yüksek Tavan Ağır Hizmet',
      mission: 'Otoyol şantiyeleri, metro/tünel hatları ve OSB sanayi tesislerinde kapsamlı yerinde revizyon.',
      equipment: [
        'Araç içi talaşlı tesviye tezgahı ve ağır hizmet mengene ünitesi',
        'Kapalı devre yağ tahliye vakum pompası ve 500 lt temiz yağ tankı',
        'Seyyar borwerk delik işleme makinesi ve lazer merkezleme mastarı',
        'Çok kanallı dijital depolamalı osiloskop ve CAN-Bus test cihazı',
        'En çok kullanılan 250+ kalem OEM o-ring, keçe ve rakor stoğu'
      ]
    },
    {
      type: 'Ağır Parça & Ataşman Nakil Kurtarıcıları',
      count: '1 Araç',
      chassis: 'Isuzu NPR & Mitsubishi Fuso Hidrolik Vinçli Kamyonet',
      mission: 'Ağır hidrolik pompaların, kule dönüş dişlilerinin, kova ve kırıcı ataşmanlarının şantiyeden atölyeye güvenli transferi.',
      equipment: [
        '3.5 Ton kapasiteli hidrolik katlanır bomlu yükleme vinci',
        'Hidrolik platform kayar kasa yükleme düzeneği',
        'Ağır motor ve şanzıman taşıma beşik kilit aparatları',
        'Kırıcı azot dolum tüpleri ve yüksek basınç regülatörleri'
      ]
    }
  ];

  const onBoardTools = [
    { name: 'Finn-Power P20 Mobil Hortum Presi', desc: 'Şantiye sahasında 2 inç 4 telli spiral hortum basabilme yeteneği.' },
    { name: 'CAT ET & JCB ServiceMaster Laptopları', desc: 'ECU hata kodu okuma, sensör kalibrasyonu ve canlı telematik testi.' },
    { name: 'Kaeser Vidalı Dizel Kompresör', desc: 'Radyatör temizliği ve pnömatik bijon/somun sökme için kesintisiz hava.' },
    { name: 'Fluke & Testo Termal Görüntüleme', desc: 'Aşırı ısınan hidrolik valf ve aşınan rulmanların termal tespiti.' },
    { name: '600 Bar Dijital Hidrolik Manometre', desc: 'Pompa debi ve pilot hat basınç düşüşlerinin noktasal ölçümü.' },
    { name: 'Lazerli Seyyar Borwerk Mastarı', desc: 'Şantiyede sökülmeden bom/arm pim deliklerinin işlenmesi.' }
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <SEO
        title="5 Araçlık Mobil Servis Filosu | Mesa İş Makinaları"
        description="Adana, Mersin, Hatay, Osmaniye ve tüm Çukurova'ya 45 dakikada ulaşan 5 tam donanımlı mobil servis aracı, araç içi hortum presi ve arıza tespit teknolojisi."
        canonical="/filo"
        keywords="mobil servis aracı iş makinası, gezici servis adana, yerinde hortum presi, şantiye acil servis, mersin iş makinası servisi"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Truck className="w-4 h-4" /> 7/24 Kesintisiz Saha Gücü
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              5 Tam Donanımlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Gezici Mobil Filo</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Arızalanan iş makinasını şantiyeden sanayiye taşımak büyük vinç, çekici masrafı ve günlerce iş kaybı demektir. Mesa İş Makinaları olarak 5 araçlık modern filomuzla fabrikayı şantiyenize taşıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ INTERACTIVE: LIVE FLEET LOCATOR & REGIONAL ETA CALCULATOR ═══════════ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Canlı Telematik Radarı • 5 Araç Aktif</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Şantiyenize En Yakın Nöbetçi Mobil Servisi Bulun
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Bulunduğunuz bölgeyi seçin; hazır bekleyen en yakın mobil atölyemizi, ustamızı ve tahmini varış süresini anında görün.
              </p>
            </div>

            {/* 5 Fleet Live Counter Bar */}
            <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 text-xs shrink-0">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 block text-[10px] font-bold">SAHADA</span>
                <span className="text-red-600 font-mono font-black text-sm">2 Araç</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 shadow-xs">
                <span className="text-emerald-600 block text-[10px] font-bold">NÖBETÇİ HAZIR</span>
                <span className="text-emerald-700 font-mono font-black text-sm">2 Araç</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-slate-400 block text-[10px] font-bold">İKMAL / ATÖLYE</span>
                <span className="text-slate-700 font-mono font-black text-sm">1 Araç</span>
              </div>
            </div>
          </div>

          {/* Regional Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
            {Object.entries(regions).map(([key, reg]) => {
              const isSelected = selectedRegion === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedRegion(key)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-red-600 text-white border-red-600 shadow-lg shadow-red-600/25 scale-[1.02]'
                      : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                      {reg.city}
                    </span>
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-red-500'}`} />
                  </div>
                  <span className="font-bold text-xs line-clamp-1 block">{reg.name.split('(')[0]}</span>
                  <span className={`text-[11px] font-mono mt-1 block font-bold ${isSelected ? 'text-amber-200' : 'text-slate-500'}`}>
                    ~{reg.eta.split('-')[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Match Result Card */}
          <div className="bg-gradient-to-br from-white to-slate-50 border-2 border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: ETA & Vehicle Specs */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wide shadow-xs">
                    {currentHub.name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    {currentHub.status}
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">
                    📍 Mesafe: {currentHub.dist}
                  </span>
                </div>

                <div className="pt-2">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentHub.nearestVan}
                  </h3>
                  <p className="text-sm font-bold text-red-600 flex items-center gap-2 mt-1">
                    <Wrench className="w-4 h-4" />
                    Görevli Usta: <span className="text-slate-800">{currentHub.tech}</span>
                  </p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed bg-white/80 p-3 rounded-xl border border-slate-200">
                    <strong className="text-slate-900">Bölge Operasyon Notu:</strong> {currentHub.notes}
                  </p>
                </div>

                {/* On-board Equipment Badges */}
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Bu Araçtaki Hazır Donanım & Test Cihazları:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentHub.equipment.map((eq, eqIdx) => (
                      <div key={eqIdx} className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium truncate">{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic ETA Box & Action CTAs */}
              <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-md text-center space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    Tahmini Şantiyeye Varış Süresi
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600 font-mono tracking-tight">
                    {currentHub.eta}
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold block">
                    ✓ Çukurova Otoyolu & Sahadan Canlı Veri
                  </span>
                </div>

                <div className="pt-2 space-y-2.5">
                  <a
                    href={`https://wa.me/905344075585?text=${encodeURIComponent(`Merhaba MESA Servis, ${currentHub.name} bölgesindeki şantiyem için ${currentHub.nearestVan} aracını acil müdahale için çağırmak istiyorum.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Bu Aracı WhatsApp'tan Çağır</span>
                  </a>

                  <a
                    href={`tel:${currentHub.phone}`}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
                  >
                    <Phone className="w-4 h-4 text-red-400" />
                    <span>Nöbetçi Ustayı Ara: {currentHub.hotline}</span>
                  </a>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] text-slate-400 block">
                    7/24 Seyyar Hidrolik Hortum Presi & Orijinal Diagnostik Garantisi
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Vehicle Classes Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {vehicleClasses.map((v, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-red-500/40 hover:shadow-lg transition-all shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-slate-900">{v.type}</h3>
                    <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-bold text-xs border border-red-200">
                      {v.count}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Şasi: <span className="text-slate-700 font-medium">{v.chassis}</span></p>
                </div>
                <p className="text-sm text-slate-600 max-w-md">{v.mission}</p>
              </div>

              <div className="pt-6">
                <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-4">Araç İçi Sabit Donanım & Cihazlar:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {v.equipment.map((eq, eIdx) => (
                    <div key={eIdx} className="flex items-center gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs text-slate-700 font-medium">{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipment Inventory */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Saha Donanım Standartlarımız</h2>
            <p className="text-slate-500 text-sm">Mobil ekiplerimizin kullandığı profesyonel test ve imalat ekipmanları.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onBoardTools.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:border-red-500/30 transition-colors shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{t.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-10 shadow-xl shadow-red-600/20">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Şu An Şantiyenizde Arıza mı Var?</h2>
          <p className="text-red-100 text-sm max-w-2xl mx-auto mb-8">
            En yakın donanımlı mobil servis aracımızı şantiyenize yönlendirmek için acil çağrı merkezimizi arayın.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:05335293674"
              className="px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-xl transition-all"
            >
              0533 529 36 74 Acil Ara
            </a>
            <Link
              to="/ariza-bildir"
              className="px-8 py-4 rounded-xl bg-red-800/60 hover:bg-red-800 text-white font-semibold text-sm border border-red-400/40 transition-all"
            >
              Acil Servis Sihirbazı ile Bildir
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
