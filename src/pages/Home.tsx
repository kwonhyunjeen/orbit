import { OrbitScene } from '../components/3d/OrbitScene';

export function HomePage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 pb-24">
      <OrbitScene />

      <section className="mt-4 border border-slate-700 p-4">
        <h3 className="text-sm text-slate-200">오늘의 훈련</h3>
        <p className="mt-2 text-sm text-slate-400">훈련 카드가 여기에 표시됩니다.</p>
      </section>

      <section className="mt-4 border border-slate-700 p-4">
        <h3 className="text-sm text-slate-200">다가오는 일정</h3>
        <p className="mt-2 text-sm text-slate-400">내일부터 3일 훈련 요약이 표시됩니다.</p>
      </section>
    </main>
  );
}
