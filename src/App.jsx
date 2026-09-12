import React from 'react';
import { Router, Routes, Route } from './router/Router';
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

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hizmetler" element={<ServicesPage />} />
            <Route path="/hizmetler/:slug" element={<ServiceDetailPage />} />
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
      </div>
    </Router>
  );
}

export default App;
