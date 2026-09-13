import React, { Suspense, lazy } from 'react';
import { Router, Routes, Route, Link } from './router/Router';
import { LanguageProvider } from './context/LanguageContext';
import { OperationalProvider, useOperational } from './context/OperationalContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingEmergencyButton } from './components/FloatingEmergencyButton';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ScrollToTop } from './components/ScrollToTop';
import { PageTransition } from './components/PageTransition';

import { ShoppingCart, CheckCircle2, AlertTriangle } from 'lucide-react';

// ── Lazy-loaded Pages (code splitting) ──
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const BrandsPage = lazy(() => import('./pages/BrandsPage').then(m => ({ default: m.BrandsPage })));
const FleetPage = lazy(() => import('./pages/FleetPage').then(m => ({ default: m.FleetPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage || m.default })));
const EmergencyWizardPage = lazy(() => import('./pages/EmergencyWizardPage').then(m => ({ default: m.EmergencyWizardPage })));
const ServiceTrackingPage = lazy(() => import('./pages/ServiceTrackingPage').then(m => ({ default: m.ServiceTrackingPage })));
const GuidesPage = lazy(() => import('./pages/GuidesPage').then(m => ({ default: m.GuidesPage })));
const GuideDetailPage = lazy(() => import('./pages/GuideDetailPage').then(m => ({ default: m.GuideDetailPage })));
const CustomerPortalPage = lazy(() => import('./pages/CustomerPortalPage').then(m => ({ default: m.CustomerPortalPage })));
const TechnicianPage = lazy(() => import('./pages/TechnicianPage').then(m => ({ default: m.TechnicianPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const FaultDiagnosticPage = lazy(() => import('./pages/FaultDiagnosticPage').then(m => ({ default: m.FaultDiagnosticPage })));
const PartsShopPage = lazy(() => import('./pages/PartsShopPage').then(m => ({ default: m.PartsShopPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ── Loading Fallback ──
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="loading-spinner" />
      <span className="text-xs font-semibold text-slate-500 animate-pulse">Yükleniyor...</span>
    </div>
  );
}

// ── Floating Cart Button ──
function FloatingCartButton() {
  const { cart, cartTotal } = useOperational();
  const totalCount = cart.reduce((acc, i) => acc + (i.quantity || i.qty || 0), 0);

  if (totalCount === 0) return null;

  return (
    <Link
      to="/yedek-parca"
      className="fixed bottom-24 right-6 z-40 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-2xl shadow-amber-500/30 flex items-center gap-2.5 transition-transform active:scale-95 animate-fadeIn"
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
      <AuthProvider>
        <OperationalProvider>
          <Router>
            <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                    <Route path="/index.html" element={<PageTransition><HomePage /></PageTransition>} />
                    <Route path="/hizmetler" element={<PageTransition><ServicesPage /></PageTransition>} />
                    <Route path="/hizmetler/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
                    <Route path="/ariza-kodu-cozucu" element={<PageTransition><FaultDiagnosticPage /></PageTransition>} />
                    <Route path="/yedek-parca" element={<PageTransition><PartsShopPage /></PageTransition>} />
                    <Route path="/markalar" element={<PageTransition><BrandsPage /></PageTransition>} />
                    <Route path="/filo" element={<PageTransition><FleetPage /></PageTransition>} />
                    <Route path="/rehberler" element={<PageTransition><GuidesPage /></PageTransition>} />
                    <Route path="/rehberler/:slug" element={<PageTransition><GuideDetailPage /></PageTransition>} />
                    <Route path="/hakkimizda" element={<PageTransition><AboutPage /></PageTransition>} />
                    <Route path="/iletisim" element={<PageTransition><ContactPage /></PageTransition>} />
                    <Route path="/ariza-bildir" element={<PageTransition><EmergencyWizardPage /></PageTransition>} />
                    <Route path="/servis-takip" element={<PageTransition><ServiceTrackingPage /></PageTransition>} />
                    <Route path="/musteri-portali" element={<PageTransition><CustomerPortalPage /></PageTransition>} />
                    <Route path="/teknisyen" element={<PageTransition><TechnicianPage /></PageTransition>} />
                    <Route path="/panel" element={<PageTransition><DashboardPage /></PageTransition>} />
                    <Route path="/admin" element={<PageTransition><AdminLoginPage /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />
                    <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <FloatingEmergencyButton />
              <FloatingCartButton />
              <WhatsAppWidget />
              <ScrollToTop />
            </div>
          </Router>
        </OperationalProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
