import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { BottomNav } from './components/layout/Bottom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/Home';
import { PlanPage } from './pages/Plan';
import { SplashPage } from './pages/Splash';

function App() {
  const { pathname } = useLocation();

  const activeTab: 'home' | 'plan' = pathname.startsWith('/plan') ? 'plan' : 'home';
  const pageTitle = pathname.startsWith('/plan') ? 'Plan' : 'Home';

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Header title={pageTitle} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <BottomNav activeTab={activeTab} />
    </div>
  );
}

export default App;
