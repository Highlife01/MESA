import React from 'react';
import { SEO } from '../components/SEO';
import { Link } from '../router/Router';
import { Truck, ShieldCheck, Wrench, Clock, MapPin, CheckCircle2, Zap, Radio, Activity } from 'lucide-react';

export const FleetPage = () => {
  const vehicleClasses = [
    {
      type: 'Ağır Şantiye 4x4 Acil Müdahale Araçları',
      count: '6 Araç',
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
      count: '8 Araç',
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
      count: '4 Araç',
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
        title="18 Araçlık Mobil Servis Filosu | Mesa İş Makinaları"
        description="Adana, Mersin, Hatay, Osmaniye ve tüm Çukurova'ya 45 dakikada ulaşan 18 tam donanımlı mobil servis aracı, araç içi hortum presi ve arıza tespit teknolojisi."
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
              18 Tam Donanımlı <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Gezici Mobil Filo</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Arızalanan iş makinasını şantiyeden sanayiye taşımak büyük vinç, çekici masrafı ve günlerce iş kaybı demektir. Mesa İş Makinaları olarak 18 araçlık modern filomuzla fabrikayı şantiyenize taşıyoruz.
            </p>
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
