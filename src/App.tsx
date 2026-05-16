import { useMemo, useState } from 'react';

import { BottomNav } from './components/layout/Bottom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/Home';
import { PlanPage } from './pages/Plan';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'plan'>('home');

  const pageTitle = useMemo(() => {
    return activeTab === 'home' ? 'Home' : 'Plan';
  }, [activeTab]);

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Header title={pageTitle} />
      {activeTab === 'home' ? <HomePage /> : <PlanPage />}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
}

export default App;
