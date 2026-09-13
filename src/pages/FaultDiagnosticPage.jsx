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
      const descText = typeof item.description === 'object' ? (item.description.tr || '') : (item.description || item.title || '');
      const codeText = item.code || '';
      const brandText = item.brand || '';
      const compText = item.system || item.component || '';
      const causes = item.rootCauses || item.probableCauses || [];

      const matchesSearch = 
        !searchQuery ||
        codeText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        descText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brandText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        compText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        causes.some(c => String(c).toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesBrand = selectedBrand === 'Tümü' || brandText.toLowerCase().includes(selectedBrand.toLowerCase().replace(' (cat)', '').replace(' ce', ''));
      const matchesComponent = selectedComponent === 'Tümü' || compText.toLowerCase().includes(selectedComponent.toLowerCase());

      return matchesSearch && matchesBrand && matchesComponent;
    });
  }, [searchQuery, selectedBrand, selectedComponent]);

  const handleAiDiagnose = (e) => {
    e.preventDefault();
    if (!aiSymptomQuery.trim()) return;
    setSearchQuery(aiSymptomQuery.trim());
  };

  const getSeverityBadge = (severity) => {
    const sevStr = String(severity || '');
    if (sevStr.includes('Kritik')) {
      return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">Acil Durdurma</span>;
    } else if (sevStr.includes('Yüksek')) {
      return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">Yüksek Öncelik</span>;
    }
    return <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">Standart / Teşhis</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-12">
      <SEO 
        title="DTC Arıza Kodu Çözücü & AI Diagnostik Motoru | CAT, Komatsu, JCB, Hidromek"
        description="İş makinası arıza kodlarını (MID/CID/FMI, CA, P0087, E-041) anında çözün. Olası arıza sebepleri, saha test adımları ve 7/24 mobil servis desteği."
        canonical="/ariza-kodu-cozucu"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-slate-500 mb-6">
          <Link to="/" className="hover:text-red-600">Ana Sayfa</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">DTC Arıza Kodu Çözücü</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Destekli Telematik & Saha Diagnostiği</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            İş Makinası <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">Arıza Kodu Çözücü</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            CAT, Komatsu, JCB, Hidromek ve Volvo iş makinenizin gösterge ekranındaki DTC arıza kodunu girin; anında teknik açıklama, saha kontrol adımları ve çözüm rehberine ulaşın.
          </p>
        </div>

        {/* AI Symptom Assistant Box */}
        <div className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-red-50 via-white to-amber-50 border border-red-200/80 shadow-xs relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white font-bold shrink-0 shadow-md shadow-red-600/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">Akıllı Arıza Belirtisi Eşleştirici</h3>
                <p className="text-xs text-slate-500">Arıza kodunu bilmiyor musunuz? Yaşanan problemi yazın, sistem olası arızaları önersin.</p>
              </div>
            </div>

            <form onSubmit={handleAiDiagnose} className="flex-1 w-full md:max-w-lg flex gap-2">
              <input
                type="text"
                value={aiSymptomQuery}
                onChange={(e) => setAiSymptomQuery(e.target.value)}
                placeholder="Örn: Siyah duman atıyor, bom kalkmıyor, hararet..."
                className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-md shadow-red-600/20"
              >
                <span>Teşhis Et</span>
              </button>
            </form>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 mb-8 space-y-4 shadow-xs">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Arıza Kodu veya Anahtar Kelime Ara (Örn: MID 039, CA559, E-041, P0087, Pompa...)"
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-800"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            {/* Brand Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <span className="text-slate-500 font-semibold mr-1 shrink-0">Marka:</span>
              {brands.slice(0, 5).map(b => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap ${
                    selectedBrand === b
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Component Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              <span className="text-slate-500 font-semibold mr-1 shrink-0">Bileşen:</span>
              {components.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedComponent(c)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-colors whitespace-nowrap ${
                    selectedComponent === c
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>Bulunan Arıza Kaydı: <strong className="text-red-600 font-bold">{filteredCodes.length}</strong></span>
          <span>7/24 Nöbetçi Mobil Destek Hattı: <a href="tel:05335293674" className="text-red-600 font-bold hover:underline">0533 529 36 74</a></span>
        </div>

        {/* Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCodes.map((item) => {
            const desc = typeof item.description === 'object' ? (item.description.tr || '') : (item.description || item.title || '');
            const componentName = item.system || item.component || 'Genel Sistem';
            const causes = Array.isArray(item.rootCauses) ? item.rootCauses : (Array.isArray(item.probableCauses) ? item.probableCauses : []);

            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-red-500/50 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-xs hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-xl bg-slate-100 font-mono text-sm font-black text-red-600 border border-slate-200">
                      {item.code}
                    </span>
                    {getSeverityBadge(item.severity)}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-medium">
                    <span className="text-slate-800 font-bold">{item.brand}</span>
                    <span>•</span>
                    <span className="text-slate-500">{componentName}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-2">
                    {desc}
                  </h3>

                  {/* Probable Causes */}
                  {causes.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">Olası Sebepler:</span>
                      {causes.slice(0, 2).map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-red-500 mt-0.5">•</span>
                          <span className="line-clamp-1">{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalCode(item)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-red-600" />
                    <span>Teşhis Rehberi</span>
                  </button>

                  <Link
                    to={`/ariza-bildir?brand=${encodeURIComponent(item.brand || '')}&code=${encodeURIComponent(item.code || '')}&desc=${encodeURIComponent(desc)}`}
                    className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-black rounded-xl transition-colors flex items-center gap-1 shadow-md shadow-red-600/20"
                  >
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Servis Çağır</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCodes.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3 opacity-80" />
            <h3 className="text-lg font-bold text-slate-900">Aradığınız Kod Veritabanında Bulunamadı</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Veritabanımızda bulunmayan özel bir arıza kodu veya yazılım hatası olabilir. Baş teknisyenimizle doğrudan görüşerek kodun anlamını hemen öğrenebilirsiniz.
            </p>
            <a
              href="tel:05335293674"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl text-xs hover:from-red-500 hover:to-red-600 transition-all shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>Teknik Sorumluya Sor: 0533 529 36 74</span>
            </a>
          </div>
        )}

      </div>

      {/* Detailed Diagnostic Guide Modal */}
      {activeModalCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 my-auto animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white font-mono font-black text-sm rounded-xl">
                  {activeModalCode.code}
                </span>
                <div>
                  <span className="text-xs text-slate-500">{activeModalCode.brand} • {activeModalCode.system || activeModalCode.component || 'Genel Sistem'}</span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {typeof activeModalCode.description === 'object' ? activeModalCode.description.tr : (activeModalCode.description || activeModalCode.title)}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalCode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-wider">Sahada Yapılması Gereken Test Adımları:</h4>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                {(Array.isArray(activeModalCode.fieldActions) ? activeModalCode.fieldActions : (Array.isArray(activeModalCode.solutions) ? activeModalCode.solutions : ['Sistem basınçlarını manometre ile ölçünüz.', 'Sensör soket ve kablo tesisatını kontrol ediniz.'])).map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Parts if present */}
            {Array.isArray(activeModalCode.recommendedParts) && activeModalCode.recommendedParts.length > 0 && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                <strong className="block text-slate-800 font-bold mb-1.5">Önerilen Orijinal Parçalar:</strong>
                <div className="flex flex-wrap gap-2">
                  {activeModalCode.recommendedParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-[11px] font-mono">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Emergency Recommendation */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-900 font-bold mb-0.5">Operatör Güvenlik Uyarısı:</strong>
                <span>{activeModalCode.severity || 'Kritik uyarı'}: Sistem koruma moduna geçebilir. Yüksek basınç altında iken hortum veya rekorları gevşetmeyiniz.</span>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setActiveModalCode(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200"
              >
                Kapat
              </button>
              <Link
                to={`/ariza-bildir?brand=${encodeURIComponent(activeModalCode.brand || '')}&code=${encodeURIComponent(activeModalCode.code || '')}`}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-600/20"
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
