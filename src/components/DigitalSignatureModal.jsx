import React, { useRef, useState, useEffect } from 'react';
import { Wrench, CheckCircle2, RotateCcw, Printer, X, ShieldCheck, PenTool } from 'lucide-react';

export const DigitalSignatureModal = ({ 
  isOpen, 
  onClose, 
  orderData = {}, 
  onSaveSignature 
}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signerName, setSignerName] = useState(orderData.customer || '');
  const [signerRole, setSignerRole] = useState('Şantiye Şefi / Yetkili');
  const [technicianNotes, setTechnicianNotes] = useState('Dinamik basınç testi tamamlandı. Orijinal filtre ve hidrolik hortum montajı yapıldı. Makine test edilerek eksiksiz çalışır durumda teslim edildi.');
  const [signedDate, setSignedDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSignedDate(new Date().toLocaleString('tr-TR'));
      setIsCompleted(false);
      setTimeout(() => {
        initCanvas();
      }, 100);
    }
  }, [isOpen]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#0F172A';
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleComplete = () => {
    if (!hasSignature) {
      alert('Lütfen teslim tutanağını onaylamak için imza atınız.');
      return;
    }
    const canvas = canvasRef.current;
    const signatureDataUrl = canvas.toDataURL('image/png');
    
    if (onSaveSignature) {
      onSaveSignature({
        signatureDataUrl,
        signerName,
        signerRole,
        technicianNotes,
        signedDate,
        orderCode: orderData.code || 'MS-2026-00128'
      });
    }
    setIsCompleted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">MESA İŞ MAKİNALARI</h3>
              <p className="text-[11px] text-amber-400 font-medium tracking-wider uppercase">Saha Servis Teslim Tutanağı & Garanti Belgesi</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Printable Document */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto print:max-h-none print:p-0">
          
          {/* Work Order Info Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
            <div>
              <span className="text-slate-400 block font-medium">İş Emri No</span>
              <span className="font-mono font-bold text-amber-600 text-sm">{orderData.code || 'MS-2026-00128'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Tarih / Saat</span>
              <span className="font-semibold text-slate-800">{signedDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Makine / Model</span>
              <span className="font-semibold text-slate-800 truncate block">{orderData.machine || 'JCB 3CX Kazıcı'}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Müşteri / Lokasyon</span>
              <span className="font-semibold text-slate-800 truncate block">{orderData.customer || 'ABC İnşaat'}</span>
            </div>
          </div>

          {/* Service Protocol Details */}
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Gerçekleştirilen Teknik Müdahaleler & Usta Notu:</label>
              <textarea
                value={technicianNotes}
                onChange={(e) => setTechnicianNotes(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-sans"
              />
            </div>

            {/* Replaced Parts List */}
            <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
              <span className="font-bold text-slate-700 block mb-1.5 flex items-center justify-between">
                <span>Kullanılan Orijinal / Sertifikalı Parçalar:</span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">12 Ay Mesa Garantisi</span>
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Parker 4SP Çelik Örgülü Hidrolik Hortum (500 Bar) - 2 Adet</li>
                <li>Orijinal Basınç Emniyet Valfi & O-Ring Takımı - 1 Takım</li>
                <li>Mobil DTE 10 Excel 46 Hidrolik Sistem Yağı - 20 Litre</li>
              </ul>
            </div>
          </div>

          {/* Signer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Teslim Alan Müşteri / Yetkili Ad Soyad:</label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="Örn: Ahmet Yılmaz"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Görevi / Ünvanı:</label>
              <input
                type="text"
                value={signerRole}
                onChange={(e) => setSignerRole(e.target.value)}
                placeholder="Örn: Şantiye Şefi / Baş Operatör"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              />
            </div>
          </div>

          {/* Digital Signature Canvas Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <PenTool className="w-4 h-4 text-amber-500" />
                <span>Dokunmatik Ekran / Mouse ile Dijital İmza:</span>
              </span>
              <button
                type="button"
                onClick={clearCanvas}
                className="text-slate-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 overflow-hidden relative touch-none">
              <canvas
                ref={canvasRef}
                width={560}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[150px] cursor-crosshair block"
              />
              {!hasSignature && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-400 text-xs italic">
                  Parmağınız veya mouse ile burayı imzalayınız
                </div>
              )}
            </div>
          </div>

          {/* Legal Warranty Footnote */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              İşbu tutanağın imzalanmasıyla belirtilen servis müdahaleleri ve parça değişimleri eksiksiz teslim alınmış olup, revizyonlu bileşenler <strong>12 ay veya 2.000 çalışma saati</strong> boyunca Mesa İş Makinaları resmi servis garantisi altındadır.
            </p>
          </div>

          {/* Success State Alert */}
          {isCompleted && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-sm">İş Emri & Tutanak Başarıyla İmzalandı!</span>
                <span className="text-xs text-emerald-700">Tutanak sisteme kaydedildi ve müşteriye iletildi.</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Yazdır / PDF Olarak Kaydet</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            >
              Kapat
            </button>
            <button
              type="button"
              onClick={handleComplete}
              disabled={isCompleted}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'İmzalandı' : 'Tutanağı Onayla & Kapat'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
