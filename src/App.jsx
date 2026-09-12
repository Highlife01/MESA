import React from 'react';
import { Router, Routes, Route, Link } from './router/Router';
import { LanguageProvider } from './context/LanguageContext';
import { OperationalProvider, useOperational } from './context/OperationalContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingEmergencyButton } from './components/FloatingEmergencyButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { BrandsPage } from './pages/BrandsPage';
import { FleetPage } from './pages/FleetPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EmergencyWizardPage } from './pages/EmergencyWizardPage';
import { ServiceTrackingPage } from './pages/ServiceTrackingPage';
import { GuidesPage } from './pages/GuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { CustomerPortalPage } from './pages/CustomerPortalPage';
import { TechnicianPage } from './pages/TechnicianPage';
import { DashboardPage } from './pages/DashboardPage';
import { FaultDiagnosticPage } from './pages/FaultDiagnosticPage';
import { PartsShopPage } from './pages/PartsShopPage';

import { ShoppingCart, Bell, CheckCircle2, AlertTriangle } from 'lucide-react';

function ToastContainer() {
  const { toasts } = useOperational();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 space-y-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="p-4 rounded-2xl bg-slate-900/95 text-white border border-amber-500/50 shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-right duration-200"
        >
          {toast.type === 'error' ? (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <strong className="block text-amber-400 font-bold">{toast.title}</strong>
            <span className="text-slate-300">{toast.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FloatingCartButton() {
  const { cart, cartTotal } = useOperational();
  const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  if (totalCount === 0) return null;

  return (
    <Link
      to="/yedek-parca"
      className="fixed bottom-24 right-6 z-40 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 transition-transform active:scale-95 animate-bounce"
    >
      <ShoppingCart className="w-4 h-4" />
      <span>Sepet ({totalCount})</span>
      <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 font-mono">
        {cartTotal.toLocaleString('tr-TR')} ₺
      </span>
    </Link>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <OperationalProvider>
        <Router>
          <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
            <Navbar />
            <ToastContainer />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/hizmetler" element={<ServicesPage />} />
                <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
                <Route path="/ariza-kodu-cozucu" element={<FaultDiagnosticPage />} />
                <Route path="/yedek-parca" element={<PartsShopPage />} />
                <Route path="/markalar" element={<BrandsPage />} />
                <Route path="/filo" element={<FleetPage />} />
                <Route path="/rehberler" element={<GuidesPage />} />
                <Route path="/rehberler/:slug" element={<GuideDetailPage />} />
                <Route path="/hakkimizda" element={<AboutPage />} />
                <Route path="/iletisim" element={<ContactPage />} />
                <Route path="/ariza-bildir" element={<EmergencyWizardPage />} />
                <Route path="/servis-takip" element={<ServiceTrackingPage />} />
                <Route path="/musteri-portali" element={<CustomerPortalPage />} />
                <Route path="/teknisyen" element={<TechnicianPage />} />
                <Route path="/panel" element={<DashboardPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
            <FloatingEmergencyButton />
            <FloatingCartButton />
          </div>
        </Router>
      </OperationalProvider>
    </LanguageProvider>
  );
}

export default App;
