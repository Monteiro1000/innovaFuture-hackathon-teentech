import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Header, Footer } from '@/components/brand';
import { LandingPage } from '@/pages/LandingPage';
import { DemoEntryPage } from '@/pages/DemoEntryPage';
import { StudentPage } from '@/pages/StudentPage';
import { TeacherDashboardPage } from '@/pages/TeacherDashboardPage';
import { ManagerDashboardPage } from '@/pages/ManagerDashboardPage';
import { BrandGuidePage } from '@/pages/BrandGuidePage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-gp-roxo-escuro text-gp-branco">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/entrar" element={<DemoEntryPage />} />
              <Route path="/demo" element={<Navigate to="/entrar" replace />} />
              <Route path="/aluno" element={<StudentPage />} />
              <Route path="/professor" element={<TeacherDashboardPage />} />
              <Route path="/gestor" element={<ManagerDashboardPage />} />
              <Route path="/identidade" element={<BrandGuidePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
