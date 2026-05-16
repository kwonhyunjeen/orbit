import { BottomNav } from './components/layout/Bottom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/Home';

function App() {
  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100">
      <Header />
      <HomePage />
      <BottomNav />
    </div>
  );
}

export default App;
