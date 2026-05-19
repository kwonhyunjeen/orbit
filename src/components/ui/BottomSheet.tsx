import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode, TouchEvent } from 'react';
import { useEffect, useRef } from 'react';

type BottomSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);

    return () => {
      globalThis.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartY.current = event.touches.item(0)?.clientY ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) {
      return;
    }

    const touchEndY = event.changedTouches.item(0)?.clientY ?? touchStartY.current;
    const movedDistance = touchEndY - touchStartY.current;

    if (movedDistance > 80) {
      onClose();
    }

    touchStartY.current = null;
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-30">
          <motion.button
            type="button"
            aria-label="바텀시트 외부 영역 닫기"
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 border-t border-slate-700 bg-slate-950 p-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="mx-auto w-full max-w-md" onClick={(event) => event.stopPropagation()}>
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-700" />

              <div className="flex items-center justify-between">
                <h4 className="text-sm text-slate-100">{title}</h4>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-sm border border-slate-700 px-2 py-1 text-xs text-slate-300"
                >
                  닫기
                </button>
              </div>

              <div className="mt-3 border border-slate-700 p-3">{children}</div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
