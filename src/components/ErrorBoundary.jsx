import React, { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, Phone, Wrench } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[MESA ErrorBoundary Caught]:', error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return <MesaErrorFallback onReset={this.handleReset} error={this.state.error} />;
    }

    return this.props.children;
  }
}

export function MesaErrorFallback({ onReset, error }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 select-none font-sans">
      <div className="max-w-lg w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6">
        
        {/* Brand Header */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-xl shadow-red-600/30 mx-auto">
          <Wrench className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-950/80 text-red-400 text-xs font-black tracking-widest uppercase border border-red-500/30">
            SİSTEM GÜVENLİĞİ AKTİF
          </span>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-3">
            Operasyonel Arayüz Kurtarıldı
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            Sayfa bileşeni yüklenirken beklenmeyen bir durum oluştu. Güvenlik protokolümüz devreye girerek verilerinizi koruma altına aldı.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onReset || (() => window.location.reload())}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sayfayı Yenile</span>
          </button>
          
          <a
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfa</span>
          </a>
        </div>

        {/* 7/24 Direct Phone Support Emergency Card */}
        <div className="pt-4 border-t border-slate-800/80">
          <p className="text-xs text-slate-400 mb-2">Acil şantiye arıza bildirimi için teknisyen hattı:</p>
          <a
            href="tel:05335293674"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-mono font-bold text-sm transition"
          >
            <Phone className="w-4 h-4 text-red-500 animate-pulse" />
            <span>0533 529 36 74 (7/24 Kesintisiz Nöbetçi Ekip)</span>
          </a>
        </div>

        {/* Non-production debug info */}
        {process.env.NODE_ENV !== 'production' && error && (
          <div className="text-left bg-black/50 p-4 rounded-xl text-xs font-mono text-red-300 overflow-x-auto max-h-36 border border-red-950">
            {error.toString()}
          </div>
        )}

      </div>
    </div>
  );
}

export default ErrorBoundary;
