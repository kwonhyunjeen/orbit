export function PlanPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 pt-4 pb-24">
      <section className="border border-slate-700 p-4">
        <h2 className="text-base text-slate-100">Run 10K Planning</h2>
        <p className="mt-2 text-sm text-slate-400">훈련 타입 범례와 달성률이 여기에 표시됩니다.</p>
      </section>

      <section className="mt-4 border border-slate-700 p-4">
        <h3 className="text-sm text-slate-200">캘린더</h3>
        <div className="mt-3 h-64 border border-slate-700" />
      </section>

      <section className="mt-4 border border-slate-700 p-4">
        <h3 className="text-sm text-slate-200">상세 보기</h3>
        <p className="mt-2 text-sm text-slate-400">날짜 선택 시 바텀시트가 표시됩니다.</p>
      </section>
    </main>
  );
}
