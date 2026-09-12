import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from '../router/Router';
import { SEO } from '../components/SEO';
import { faultCodesData } from '../data/faultCodesData';
import { 
  Search, Wrench, AlertTriangle, ShieldAlert, CheckCircle2, 
  ArrowRight, Phone, Cpu, Filter, Zap, BookOpen, Layers, Sparkles 
} from 'lucide-react';

export function FaultDiagnosticPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Tümü');
  const [selectedComponent, setSelectedComponent] = useState('Tümü');
  const [aiSymptomQuery, setAiSymptomQuery] = useState('');
  const [activeModalCode, setActiveModalCode] = useState(null);

  const brands = ['Tümü', 'Caterpillar (CAT)', 'Komatsu', 'JCB', 'Hidromek', 'Volvo CE', 'Hitachi', 'Bobcat'];
  const components = ['Tümü', 'Hidrolik', 'Motor', 'Şanzıman', 'Elektrik', 'Emisyon'];

  const filteredCodes = useMemo(() => {
    return faultCodesData.filter(item => {
      const matchesSearch = 
        !searchQuery ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.probableCauses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBrand = selectedBrand === 'Tümü' || item.brand.toLowerCase().includes(selectedBrand.toLowerCase().replace(' (cat)', '').replace(' ce', ''));
      const matchesComponent = selectedComponent === 'Tümü' || item.component.toLowerCase().includes(selectedComponent.toLowerCase());

      return matchesSearch && matchesBrand && matchesComponent;
    });
  }, [searchQuery, selectedBrand, selectedComponent]);

  const handleAiDiagnose = (e) => {
    e.preventDefault();
    if (!aiSymptomQuery.trim()) return;
    setSearchQuery(aiSymptomQuery.trim());
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Kritik':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">Acil Durdurma</span>;
      case 'Yüksek':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">Yüksek Öncelik</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">Orta / Kontrol</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-12">
      <SEO 
        title="DTC Arıza Kodu Çözücü & AI Diagnostik Motoru | CAT, Komatsu, JCB, Hidromek"
        description="İş makinası arıza kodlarını (MID/CID/FMI, CA, P0087, E-041) anında çözün. Olası arıza sebepleri, saha test adımları ve 7/24 mobil servis desteği."
        canonical="/ariza-kodu-cozucu"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-amber-400">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">DTC Arıza Kodu Çözücü</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Destekli Telematik & Saha Diagnostiği</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            İş Makinası <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Arıza Kodu Çözücü</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            CAT, Komatsu, JCB, Hidromek ve Volvo iş makinenizin gösterge ekranındaki DTC arıza kodunu girin; anında teknik açıklama, saha kontrol adımları ve çözüm rehberine ulaşın.
          </p>
        </div>

        {/* AI Symptom Assistant Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Akıllı Arıza Belirtisi Eşleştirici</h3>
                <p className="text-xs text-slate-400">Arıza kodunu bilmiyor musunuz? Yaşanan problemi yazın, sistem olası arızaları önersin.</p>
              </div>
            </div>

            <form onSubmit={handleAiDiagnose} className="flex-1 w-full md:max-w-lg flex gap-2">
              <input
                type="text"
                value={aiSymptomQuery}
                onChange={(e) => setAiSymptomQuery(e.target.value)}
                placeholder="Örn: Siyah duman atıyor, bom kalkmıyor, hararet..."
                className="flex-1 px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Teşhis Et</span>
              </button>
            </form>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Arıza Kodu veya Anahtar Kelime Ara (Örn: MID 039, CA559, E-041, P0087, Pompa...)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800 text-xs">
            {/* Brand Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <span className="text-slate-400 font-semibold mr-1 shrink-0">Marka:</span>
              {brands.slice(0, 5).map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap ${
                    selectedBrand === b
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Component Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <span className="text-slate-400 font-semibold mr-1 shrink-0">Bileşen:</span>
              {components.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedComponent(c)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap ${
                    selectedComponent === c
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-1">
          <span>Bulunan Arıza Kaydı: <strong className="text-amber-400">{filteredCodes.length}</strong></span>
          <span>7/24 Nöbetçi Mobil Destek Hattı: <a href="tel:05335293674" className="text-white font-bold hover:underline">0533 529 36 74</a></span>
        </div>

        {/* Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCodes.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-xl bg-slate-950 font-mono text-sm font-black text-amber-400 border border-slate-800">
                    {item.code}
                  </span>
                  {getSeverityBadge(item.severity)}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 font-medium">
                  <span className="text-slate-300 font-bold">{item.brand}</span>
                  <span>•</span>
                  <span className="text-amber-500/90">{item.component}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-2">
                  {item.description.tr}
                </h3>

                {/* Probable Causes */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Olası Sebepler:</span>
                  {item.probableCauses.slice(0, 2).map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span className="line-clamp-1">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalCode(item)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Teşhis Rehberi</span>
                </button>

                <Link
                  to={`/ariza-bildir?brand=${encodeURIComponent(item.brand)}&code=${encodeURIComponent(item.code)}&desc=${encodeURIComponent(item.description.tr)}`}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl transition-colors flex items-center gap-1 shadow-md shadow-amber-500/10"
                >
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Servis Çağır</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCodes.length === 0 && (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-slate-800 p-8">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-bold text-white">Aradığınız Kod Veritabanında Bulunamadı</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-6">
              Veritabanımızda bulunmayan özel bir arıza kodu veya yazılım hatası olabilir. Baş teknisyenimizle doğrudan görüşerek kodun anlamını hemen öğrenebilirsiniz.
            </p>
            <a
              href="tel:05335293674"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Teknik Sorumluya Sor: 0533 529 36 74</span>
            </a>
          </div>
        )}

      </div>

      {/* Detailed Diagnostic Guide Modal */}
      {activeModalCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white w-full max-w-2xl rounded-3xl border border-slate-700 shadow-2xl p-6 sm:p-8 space-y-6 my-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 font-mono font-black text-sm rounded-xl">
                  {activeModalCode.code}
                </span>
                <div>
                  <span className="text-xs text-slate-400">{activeModalCode.brand} • {activeModalCode.component}</span>
                  <h3 className="text-lg font-bold text-white">{activeModalCode.description.tr}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalCode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Sahada Yapılması Gereken Test Adımları:</h4>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                {activeModalCode.fieldActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Recommendation */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-white font-bold mb-0.5">Operatör Güvenlik Uyarısı:</strong>
                {activeModalCode.recommendation}
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveModalCode(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-semibold text-slate-300"
              >
                Kapat
              </button>
              <Link
                to={`/ariza-bildir?brand=${encodeURIComponent(activeModalCode.brand)}&code=${encodeURIComponent(activeModalCode.code)}`}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Wrench className="w-4 h-4" />
                <span>Bu Arıza İçin Mobil Ekip Çağır</span>
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
