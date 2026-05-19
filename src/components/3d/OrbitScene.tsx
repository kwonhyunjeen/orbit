type OrbitSceneProps = {
  progressLabel?: string;
};

export function OrbitScene({ progressLabel = '3D Orbit Placeholder' }: OrbitSceneProps) {
  return (
    <section className="border border-slate-700 p-4">
      <h2 className="text-sm text-slate-200">3D Orbit</h2>
      <div className="mt-3 h-56 border border-slate-700">
        <p className="p-3 text-xs text-slate-400">{progressLabel}</p>
      </div>
    </section>
  );
}
