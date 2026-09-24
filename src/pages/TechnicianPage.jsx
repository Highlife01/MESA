import React, { useState, useEffect } from 'react';
import { Link } from '../router/Router';
import { SEO } from '../components/SEO';
import { useOperational } from '../context/OperationalContext';
import { useAuth, SYSTEM_ACCOUNTS } from '../context/AuthContext';
import { DigitalSignatureModal } from '../components/DigitalSignatureModal';
import { validateEvidenceFile } from '../lib/security';
import {
  Navigation, Phone, CheckCircle2, Clock, Wrench, ShieldCheck, ArrowLeft,
  Play, Pause, FileCheck, MapPin, User, Plus, Camera, Image, Trash2,
  AlertTriangle, Gauge, Lock, KeyRound, ChevronRight, Activity, ArrowRight
} from 'lucide-react';

export function TechnicianPage() {
  const { user, isTechnician, isSuperAdmin, switchDemoRole } = useAuth();
  const {
    activeOrders, transitionWorkOrderStatus, recordSignature,
    addWorkOrderEvidence, recordMeterReading, inventoryItems,
    recordInventoryMovement, machines
  } = useOperational();

  const [selectedOrderId, setSelectedOrderId] = useState(activeOrders[0]?.id || 'MS-5102');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(1440);
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);

  // Meter Reading Input
  const [meterInput, setMeterInput] = useState('');

  // Evidence Upload Form
  const [evidenceCategory, setEvidenceCategory] = useState('Yapılan İşlem');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [evidencePreview, setEvidencePreview] = useState(null);

  // Spare Parts Selector
  const [selectedPartId, setSelectedPartId] = useState(inventoryItems[0]?.id || '');
  const [partQty, setPartQty] = useState(1);

  const activeOrder = activeOrders.find(o => o.id === selectedOrderId || o.code === selectedOrderId) || activeOrders[0] || {
    id: 'MS-5102',
    code: 'MS-5102',
    customer: 'ABC İnşaat Ltd. Şti.',
    machine: 'JCB 3CX Eco Kazıcı Yükleyici',
    machineId: 'MCH-01-ABC-32',
    location: 'Seyhan OSB Şantiyesi, Adana',
    issue: 'Powershift 2. viteste sarsıntı ve çekiş düşüklüğü',
    status: 'Şantiyede',
    meterHours: 8421,
    evidence: [],
    partsUsed: ['JCB Şanzıman Filtresi', 'Selenoid Bobini']
  };

  // Sync meter input with active order
  useEffect(() => {
    if (activeOrder) {
      setMeterInput(activeOrder.meterHours || '');
    }
  }, [selectedOrderId]);

  // Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Save Signature
  const handleSaveSignature = (sigData) => {
    recordSignature(activeOrder.code, sigData, user?.name || 'Teknisyen');
    transitionWorkOrderStatus(activeOrder.code, 'Tamamlandı', {
      note: 'Müşteri dijital imzası alındı ve iş emri tamamlandı.',
      actor: user?.name || 'Teknisyen',
      actorRole: 'technician',
      stepIndex: 5
    });
    setIsTimerRunning(false);
  };

  // Save Meter Reading
  const handleSaveMeter = (e) => {
    e.preventDefault();
    if (!meterInput || isNaN(Number(meterInput))) return;
    recordMeterReading(activeOrder.machineId, Number(meterInput), user?.name || 'Teknisyen');
    transitionWorkOrderStatus(activeOrder.code, activeOrder.status, {
      meterHours: Number(meterInput),
      actor: user?.name || 'Teknisyen'
    });
  };

  // Handle Evidence Photo Upload (MIME + uzantı + boyut doğrulamalı)
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateEvidenceFile(file);
    if (!validation.valid) {
      alert(`Kanıt yüklenemedi: ${validation.error}`);
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setEvidencePreview(uploadEvent.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEvidence = () => {
    const photoUrl = evidencePreview || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
    addWorkOrderEvidence(activeOrder.code, {
      title: `${evidenceCategory} Kanıtı`,
      category: evidenceCategory,
      notes: evidenceNotes || 'Saha müdahale görseli',
      url: photoUrl
    }, user?.name || 'Teknisyen');

    setEvidencePreview(null);
    setEvidenceNotes('');
  };

  // Handle Add Part
  const handleAddPart = () => {
    const part = inventoryItems.find(p => p.id === selectedPartId);
    if (!part) return;

    recordInventoryMovement({
      partId: part.id,
      partName: part.name,
      type: 'consumption',
      qty: Number(partQty) || 1,
      workOrderCode: activeOrder.code,
      actor: user?.name || 'Teknisyen',
      note: `${activeOrder.machine} için saha montajı`
    });
  };

  // Status transitions
  const handleStatusChange = (newStatus, stepIdx) => {
    transitionWorkOrderStatus(activeOrder.code, newStatus, {
      stepIndex: stepIdx,
      actor: user?.name || 'Teknisyen',
      actorRole: 'technician',
      note: `Teknisyen terminali üzerinden durum "${newStatus}" yapıldı.`
    });
  };

  // If user has NO technician permission (addresses "Bu hesabın personel paneline erişim yetkisi bulunmuyor")
  if (!isTechnician && !isSuperAdmin) {
    return (
      <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center p-4">
        <SEO title="Personel Girişi Gerekli | MESA Servis" description="Saha teknisyeni mobil terminali yetkilendirmesi." />
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">Personel Girişi Gerekli</h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Bu terminal yalnızca saha ustaları ve teknik servis personeli içindir. Lütfen yetkili teknisyen veya süper admin hesabınızla oturum açın.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => switchDemoRole('technician')}
              className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/20 transition flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Mehmet Usta Olarak Giriş Yap (Hızlı Personel Demo)</span>
            </button>

            <button
              onClick={() => switchDemoRole('technician_ahmet')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <Wrench className="w-4 h-4 text-amber-600" />
              <span>Ahmet Usta (Hidrolik Uzmanı) Olarak Giriş</span>
            </button>

            <button
              onClick={() => switchDemoRole('super_admin')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Süper Admin (Root) Yetkisiyle Aç</span>
            </button>
          </div>

          <Link to="/admin" className="text-xs text-slate-400 hover:text-slate-600 font-medium block">
            Giriş Sayfasına Git
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center justify-start p-3 sm:p-6 py-8">
      <SEO
        title="Saha Teknisyen Mobil Terminali (PWA) | MESA"
        description="Mesa İş Makinaları saha ustaları iş emri, telematik sayaç, fotoğraf kanıtı, yedek parça kaydı ve dijital imza ekranı."
        canonical="/teknisyen"
      />

      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-[2rem] p-5 sm:p-7 shadow-xl space-y-5">

        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-600/30">
              {user?.avatar || 'MU'}
            </div>
            <div>
              <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <span>{user?.name || 'Mehmet Usta'}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-50 text-red-700 font-bold border border-red-200">
                  {user?.roleTitle?.split('(')[0] || 'Teknisyen'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                Saha Vardiyası Aktif
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/panel" className="text-xs text-slate-500 hover:text-slate-900 font-semibold flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ERP</span>
            </Link>
          </div>
        </div>

        {/* Order Selector */}
        <div>
          <label className="text-xs font-bold text-slate-600 block mb-1.5">Aktif İş Emrini Seç:</label>
          <select
            value={activeOrder.code || activeOrder.id}
            onChange={(e) => setSelectedOrderId(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-red-500 transition"
          >
            {activeOrders.map(o => (
              <option key={o.id} value={o.code || o.id}>
                {o.code} — {o.customer} ({o.machine})
              </option>
            ))}
          </select>
        </div>

        {/* Active Task Card */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">İş Emri & Şantiye Detayı</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-gradient-to-r from-red-600 to-red-700 text-white shadow-xs">
              {activeOrder.status}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-black text-red-600 font-mono">{activeOrder.code}</h2>
            {activeOrder.machineId && (
              <Link
                to={`/m/${machines.find(m => m.id === activeOrder.machineId)?.token || 'mch_8f4c21a7'}`}
                target="_blank"
                className="text-[11px] font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>Makine Pasaportu</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            )}
          </div>

          <p className="text-sm font-bold text-slate-900">{activeOrder.customer} • {activeOrder.machine}</p>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-0.5">
            <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>{activeOrder.location}</span>
          </div>

          <div className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
            <strong className="text-slate-900 block mb-0.5 font-bold">Bildirilen Arıza / Semptom:</strong>
            {activeOrder.issue}
          </div>
        </div>

        {/* Quick Action Navigation & Call */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(activeOrder.location)}`}
            target="_blank"
            rel="noreferrer"
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200"
          >
            <Navigation className="w-4 h-4 text-emerald-600" />
            <span>Navigasyon</span>
          </a>
          <a
            href={`tel:${activeOrder.phone || '05344075585'}`}
            className="bg-slate-50 hover:bg-slate-100 text-slate-800 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border border-slate-200"
          >
            <Phone className="w-4 h-4 text-blue-600" />
            <span>Müşteriyi Ara</span>
          </a>
        </div>

        {/* Live Work Timer */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Saha Müdahale Sayacı</span>
            <span className="text-xl font-black font-mono text-slate-900">{formatTimer(secondsElapsed)}</span>
          </div>

          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${isTimerRunning
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
              }`}
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Sayacı Başlat</span>
              </>
            )}
          </button>
        </div>

        {/* Step-by-Step Status Progression (Durum Makinesi) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 block">İş Emri Durum Geçişleri:</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { label: 'Mobil Ekip Yolda', step: 1 },
              { label: 'Şantiyede', step: 2 },
              { label: 'Teşhis / Test', step: 3 },
              { label: 'Parça Montajı', step: 3 },
              { label: 'Müşteri Onayı', step: 4 },
              { label: 'Tamamlandı', step: 5 }
            ].map((s) => (
              <button
                key={s.label}
                onClick={() => handleStatusChange(s.label, s.step)}
                className={`py-2 px-2.5 rounded-xl text-[11px] font-bold text-center transition border ${activeOrder.status === s.label
                    ? 'bg-red-600 text-white border-red-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Working Hours Meter Reading Input */}
        <form onSubmit={handleSaveMeter} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-amber-600" />
              <span>Çalışma Saati Sayacı (Şantiye Giriş Saati)</span>
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Örn: 8425 Saat"
              value={meterInput}
              onChange={e => setMeterInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Kaydet
            </button>
          </div>
        </form>

        {/* Evidence & Photo Upload */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-red-600" />
              <span>Saha Servis Kanıtı & Fotoğraf Ekle</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {activeOrder.evidence?.length || 0} Kanıt
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">Kategori:</label>
              <select
                value={evidenceCategory}
                onChange={e => setEvidenceCategory(e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
              >
                <option>Yapılan İşlem</option>
                <option>Önceki Durum</option>
                <option>Değişen Parça</option>
                <option>Basınç Testi</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold block mb-1">Fotoğraf Seç / Çek:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300"
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="Açıklama / Ölçüm Notu (örn: 380 bar basınç test edildi)"
            value={evidenceNotes}
            onChange={e => setEvidenceNotes(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-red-500"
          />

          {evidencePreview && (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
              <img src={evidencePreview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setEvidencePreview(null)}
                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full text-[10px]"
              >
                ✕
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveEvidence}
            className="w-full py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Kanıtı İş Emrine Ekle</span>
          </button>

          {/* Evidence Gallery */}
          {activeOrder.evidence && activeOrder.evidence.length > 0 && (
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Kayıtlı Kanıtlar:</span>
              <div className="grid grid-cols-2 gap-2">
                {activeOrder.evidence.map((ev, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
                    {ev.url ? (
                      <img src={ev.url} alt={ev.title} className="w-10 h-10 rounded-lg object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                        <Image className="w-4 h-4" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold text-slate-900 truncate">{ev.category}</p>
                      <p className="text-[9px] text-slate-500 truncate">{ev.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Spare Parts Deductions (Envanter Çift Taraflı Sarfiyatı) */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Kullanılan Yedek Parçalar & Stok Düşümü</span>
            <span className="text-[10px] text-slate-500 font-mono">
              {activeOrder.partsUsed?.length || 0} Parça
            </span>
          </div>

          <div className="flex gap-2">
            <select
              value={selectedPartId}
              onChange={e => setSelectedPartId(e.target.value)}
              className="flex-1 p-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 font-medium"
            >
              {inventoryItems.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} (Kalan Stok: {p.stock})
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={partQty}
              onChange={e => setPartQty(Math.max(1, Number(e.target.value)))}
              className="w-16 px-2 py-2 bg-white border border-slate-200 rounded-xl text-xs text-center font-bold"
            />
            <button
              onClick={handleAddPart}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Düş</span>
            </button>
          </div>

          {activeOrder.partsUsed && activeOrder.partsUsed.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 space-y-1 text-xs">
              {activeOrder.partsUsed.map((p, i) => (
                <div key={i} className="flex items-center justify-between text-slate-700 py-0.5">
                  <span className="text-slate-800 font-medium">{p}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Digital Signature & Finish Service CTA */}
        <div className="space-y-3 pt-2">
          {activeOrder.status === 'Tamamlandı' ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <strong className="block text-slate-900 font-bold">İş Emri Başarıyla Kapatıldı!</strong>
                <span>Müşteri yetkilisi tarafından dijital tutanak imzalandı.</span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsSignatureModalOpen(true)}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-600/25 transition-transform active:scale-95"
            >
              <FileCheck className="w-5 h-5" />
              <span>Müşteri İmzası Al & İşi Kapat (Dijital Tutanak)</span>
            </button>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              MESA Garantili Saha Servisi
            </span>
            <span>Konum: Çukurova / Seyhan OSB</span>
          </div>
        </div>

      </div>

      {/* Digital Signature Modal Component */}
      <DigitalSignatureModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        orderData={activeOrder}
        onSaveSignature={handleSaveSignature}
      />

    </div>
  );
}
