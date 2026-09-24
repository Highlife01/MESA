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
import { MobileStickyCTA } from './components/MobileStickyCTA';

import { ShoppingCart, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ErrorBoundary } from './components/ErrorBoundary';

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
const MachinePassportPage = lazy(() => import('./pages/MachinePassportPage').then(m => ({ default: m.MachinePassportPage })));
const TechnicianPage = lazy(() => import('./pages/TechnicianPage').then(m => ({ default: m.TechnicianPage })));
const DashboardPage = lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const FaultDiagnosticPage = lazy(() => import('./pages/FaultDiagnosticPage').then(m => ({ default: m.FaultDiagnosticPage })));
const PartsShopPage = lazy(() => import('./pages/PartsShopPage').then(m => ({ default: m.PartsShopPage })));
const MaintenanceCalculatorPage = lazy(() => import('./pages/MaintenanceCalculatorPage').then(m => ({ default: m.MaintenanceCalculatorPage })));
const NationalLandingPage = lazy(() => import('./pages/NationalLandingPage').then(m => ({ default: m.NationalLandingPage || m.default })));
const RegionalHubPage = lazy(() => import('./pages/RegionalHubPage').then(m => ({ default: m.RegionalHubPage || m.default })));
const CitiesHubPage = lazy(() => import('./pages/CitiesHubPage').then(m => ({ default: m.CitiesHubPage || m.default })));
const CityLandingPage = lazy(() => import('./pages/CityLandingPage').then(m => ({ default: m.CityLandingPage || m.default })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// ── Loading Fallback (Resilient Branded Shell with Emergency Call CTA) ──
function PageLoader() {
  const [showRetry, setShowRetry] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowRetry(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white shadow-xl shadow-red-600/30 border border-red-500/40 mb-4 animate-pulse">
        <span className="font-black text-xl tracking-tighter">MESA</span>
      </div>
      <div className="loading-spinner mb-3" />
      <span className="text-xs font-bold text-slate-300">MESA İş Makinaları Servis Portalı Yükleniyor...</span>
      <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
        7/24 Acil Şantiye Müdahale & Mobil Servis Merkezi
      </p>

      {showRetry && (
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col items-center gap-2 animate-fadeIn">
          <span className="text-[11px] text-slate-400">Yükleme geciktiyse doğrudan teknisyen hattımızı arayabilirsiniz:</span>
          <a
            href="tel:05344075585"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-red-600/30"
          >
            <span>7/24 Acil Çağrı: 0534 407 55 85</span>
          </a>
          <button
            onClick={() => window.location.reload()}
            className="text-[11px] text-slate-400 hover:text-white underline mt-1"
          >
            Sayfayı Yeniden Yükle
          </button>
        </div>
      )}
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
            <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-red-600 selection:text-white">
              <Navbar />
              <main className="flex-1">
                <ErrorBoundary>
                  <Suspense fallback={<PageLoader />}>
                    <Routes>
                      <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
                      <Route path="/index.html" element={<PageTransition><HomePage /></PageTransition>} />
                      <Route path="/turkiye-is-makinalari-servisi" element={<PageTransition><NationalLandingPage /></PageTransition>} />
                      <Route path="/hizmet-bolgeleri" element={<PageTransition><RegionalHubPage /></PageTransition>} />
                      <Route path="/bolgeler" element={<PageTransition><RegionalHubPage /></PageTransition>} />
                      
                      {/* Şehir Bazlı SEO ve Bölge Hub Rotaları */}
                      <Route path="/sehirler" element={<PageTransition><CitiesHubPage /></PageTransition>} />
                      <Route path="/sehirler/:slug" element={<PageTransition><CityLandingPage /></PageTransition>} />
                      
                      {/* Ulusal Hedefli Hizmet Sayfaları */}
                      <Route path="/is-makinalari-servisi" element={<PageTransition><ServiceDetailPage explicitSlug="is-makinalari-servisi" /></PageTransition>} />
                      <Route path="/is-makinasi-tamiri" element={<PageTransition><ServiceDetailPage explicitSlug="is-makinasi-tamiri" /></PageTransition>} />
                      <Route path="/mobil-teknik-servis" element={<PageTransition><ServiceDetailPage explicitSlug="mobil-teknik-servis" /></PageTransition>} />
                      <Route path="/hidrolik-servis" element={<PageTransition><ServiceDetailPage explicitSlug="hidrolik-servis" /></PageTransition>} />
                      <Route path="/hidrolik-silindir-tamiri" element={<PageTransition><ServiceDetailPage explicitSlug="hidrolik-silindir-tamiri" /></PageTransition>} />
                      <Route path="/is-makinasi-ariza-tespiti" element={<PageTransition><ServiceDetailPage explicitSlug="is-makinasi-ariza-tespiti" /></PageTransition>} />
                      <Route path="/is-makinasi-bakim" element={<PageTransition><ServiceDetailPage explicitSlug="is-makinasi-bakim" /></PageTransition>} />
                      <Route path="/teleskopik-yukleyici-servisi" element={<PageTransition><ServiceDetailPage explicitSlug="teleskopik-yukleyici-servisi" /></PageTransition>} />
                      <Route path="/forklift-servisi" element={<PageTransition><ServiceDetailPage explicitSlug="forklift-servisi" /></PageTransition>} />
                      <Route path="/ekskavator-servisi" element={<PageTransition><ServiceDetailPage explicitSlug="ekskavator-servisi" /></PageTransition>} />
                      <Route path="/kepce-loader-servisi" element={<PageTransition><ServiceDetailPage explicitSlug="kepce-loader-servisi" /></PageTransition>} />

                      <Route path="/hizmetler" element={<PageTransition><ServicesPage /></PageTransition>} />
                      <Route path="/hizmetler/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
                      <Route path="/bakim-hesaplayici" element={<PageTransition><MaintenanceCalculatorPage /></PageTransition>} />
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
                      <Route path="/m/:token" element={<PageTransition><MachinePassportPage /></PageTransition>} />
                      <Route path="/musteri-portali" element={<PageTransition><CustomerPortalPage /></PageTransition>} />
                      <Route path="/teknisyen" element={<PageTransition><TechnicianPage /></PageTransition>} />
                      <Route path="/panel" element={<PageTransition><DashboardPage /></PageTransition>} />
                      <Route path="/admin" element={<PageTransition><AdminLoginPage /></PageTransition>} />
                      <Route path="/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />
                      <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <Footer />
              <MobileStickyCTA />
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
