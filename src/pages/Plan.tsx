import { useMemo, useState } from 'react';

import { BottomSheet } from '../components/ui/BottomSheet';
import { Overlay } from '../components/ui/Overlay';
import type { BottomSheetViewModel, CalendarCellViewModel, OverlayViewModel, TrainingLabelItem } from '../types/ui';

const trainingLabelItems: TrainingLabelItem[] = [
  { label: 'Easy', colorClass: 'bg-emerald-500' },
  { label: 'Long', colorClass: 'bg-sky-500' },
  { label: 'Tempo', colorClass: 'bg-amber-500' },
  { label: 'Interval', colorClass: 'bg-violet-500' },
  { label: 'Rest', colorClass: 'bg-slate-500' },
];

const calendarDays = ['일', '월', '화', '수', '목', '금', '토'];

const calendarCells: CalendarCellViewModel[] = Array.from({ length: 35 }, (_, index) => {
  return {
    key: `cell-${index + 1}`,
    label: index + 1,
  };
});

export function PlanPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('month');

  const bottomSheetModel: BottomSheetViewModel = useMemo(() => {
    if (selectedDay === null) {
      return { open: false, title: '' };
    }

    return {
      open: true,
      title: `${selectedDay}일 훈련 상세`,
    };
  }, [selectedDay]);

  const overlayModel: OverlayViewModel = useMemo(() => {
    return {
      open: overlayMessage.length > 0,
      message: overlayMessage,
    };
  }, [overlayMessage]);

  const visibleCalendarCells = useMemo(() => {
    if (calendarView === 'week') {
      return calendarCells.slice(0, 7);
    }

    return calendarCells;
  }, [calendarView]);

  const handleCloseBottomSheet = () => {
    setSelectedDay(null);
  };

  const handleCloseOverlay = () => {
    setOverlayMessage('');
  };

  const handleCompleteDummy = () => {
    setOverlayMessage('You did it! 더미 오버레이 메시지입니다.');
  };

  const handleCancelDummy = () => {
    setOverlayMessage('오늘은 쉬어가도 괜찮아요. 더미 오버레이 메시지입니다.');
  };

  return (
    <>
      <main className="mx-auto w-full max-w-md px-4 pt-4 pb-24">
        <section className="border border-slate-700 p-4">
          <h2 className="text-base text-slate-100">Run 10K Planning</h2>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {trainingLabelItems.map((item) => {
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${item.colorClass}`} />
                  <span className="text-xs text-slate-300">{item.label}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border border-slate-700 p-3">
            <p className="text-sm text-slate-200">달성률</p>
            <p className="mt-1 text-xs text-slate-400">러닝 0/11 · 근력 0/4</p>
          </div>
        </section>

        <section className="mt-4 border border-slate-700 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm text-slate-200">캘린더</h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCalendarView('month')}
                className={
                  calendarView === 'month'
                    ? 'rounded-sm border border-slate-500 px-2 py-1 text-xs text-slate-100'
                    : 'rounded-sm border border-slate-700 px-2 py-1 text-xs text-slate-300'
                }
              >
                월간
              </button>
              <button
                type="button"
                onClick={() => setCalendarView('week')}
                className={
                  calendarView === 'week'
                    ? 'rounded-sm border border-slate-500 px-2 py-1 text-xs text-slate-100'
                    : 'rounded-sm border border-slate-700 px-2 py-1 text-xs text-slate-300'
                }
              >
                주간
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-2">
            {calendarDays.map((day) => {
              return (
                <div key={day} className="text-center text-xs text-slate-400">
                  {day}
                </div>
              );
            })}

            {visibleCalendarCells.map((cell) => {
              return (
                <button
                  key={cell.key}
                  type="button"
                  className="h-10 border border-slate-700 text-xs text-slate-300"
                  aria-label={`${cell.label}일`}
                  onClick={() => setSelectedDay(cell.label)}
                >
                  {cell.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-4 border border-slate-700 p-4">
          <h3 className="text-sm text-slate-200">상세 보기</h3>
          <p className="mt-2 text-sm text-slate-400">날짜 선택 시 바텀시트가 표시됩니다.</p>
        </section>
      </main>

      <BottomSheet open={bottomSheetModel.open} title={bottomSheetModel.title} onClose={handleCloseBottomSheet}>
        <p className="text-xs text-slate-300">훈련 상세 더미 데이터 영역</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleCompleteDummy}
            className="rounded-sm border border-slate-600 px-3 py-2 text-xs text-slate-100"
          >
            완료
          </button>
          <button
            type="button"
            onClick={handleCancelDummy}
            className="rounded-sm border border-slate-700 px-3 py-2 text-xs text-slate-300"
          >
            취소
          </button>
        </div>
      </BottomSheet>

      <Overlay open={overlayModel.open} message={overlayModel.message} onClose={handleCloseOverlay} />
    </>
  );
}
