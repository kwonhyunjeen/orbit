import type { OverlayViewModel } from '../../types/ui';

type OverlayProps = OverlayViewModel & {
  onClose: () => void;
};

export function Overlay({ open, message, onClose }: OverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 text-left"
      aria-label="오버레이 닫기"
    >
      <div className="w-full max-w-md border border-slate-600 bg-slate-900 p-4">
        <p className="text-sm text-slate-100">{message}</p>
        <p className="mt-2 text-xs text-slate-400">탭하면 닫힙니다.</p>
      </div>
    </button>
  );
}
