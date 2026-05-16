type BottomNavProps = {
  activeTab: 'home' | 'plan';
  onChangeTab: (tab: 'home' | 'plan') => void;
};

export function BottomNav({ activeTab, onChangeTab }: BottomNavProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t border-slate-700 bg-slate-950 px-4 py-3">
      <div className="mx-auto flex w-full max-w-md items-center justify-between">
        <button
          type="button"
          onClick={() => onChangeTab('home')}
          className={
            activeTab === 'home'
              ? 'rounded-sm border border-slate-600 px-4 py-2 text-sm text-slate-100'
              : 'rounded-sm border border-slate-700 px-4 py-2 text-sm text-slate-300'
          }
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => onChangeTab('plan')}
          className={
            activeTab === 'plan'
              ? 'rounded-sm border border-slate-600 px-4 py-2 text-sm text-slate-100'
              : 'rounded-sm border border-slate-700 px-4 py-2 text-sm text-slate-300'
          }
        >
          Plan
        </button>
      </div>
    </nav>
  );
}
