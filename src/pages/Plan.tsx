import { useMemo, useState } from 'react';

import { BottomSheet } from '../components/ui/BottomSheet';
import { Overlay } from '../components/ui/Overlay';
import { planData } from '../constants/planData';
import type {
  BottomSheetViewModel,
  CalendarItem,
  OverlayViewModel,
  TrainingKind,
  TrainingLabelItem,
  WeeklyCalendarGroup,
} from '../types/ui';

const trainingLabelItems: TrainingLabelItem[] = [
  { label: 'Easy', colorClass: 'bg-emerald-500' },
  { label: 'Long', colorClass: 'bg-sky-500' },
  { label: 'Tempo', colorClass: 'bg-amber-500' },
  { label: 'Interval', colorClass: 'bg-violet-500' },
  { label: 'Rest', colorClass: 'bg-slate-500' },
  { label: 'Strength', colorClass: 'bg-rose-500' },
  { label: 'Race', colorClass: 'bg-cyan-400' },
];

const typeColorClassByTraining: Record<TrainingKind, string> = {
  rest: 'bg-slate-500',
  easy: 'bg-emerald-500',
  long: 'bg-sky-500',
  tempo: 'bg-amber-500',
  interval: 'bg-violet-500',
  strength: 'bg-rose-500',
  race: 'bg-cyan-400',
};

const calendarDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const calendarItems: CalendarItem[] = Object.entries(planData).map(([dateKey, value]) => {
  const date = new Date(`${dateKey}T00:00:00`);
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const dayLabel = calendarDays[date.getDay()] ?? '일';

  return {
    dateKey,
    month,
    dayOfMonth,
    dayLabel,
    type: value.type,
    label: value.label,
    rowSummary: value.rowSummary,
  };
});

const weeklyPreviewWeeks: WeeklyCalendarGroup[] = Array.from({ length: 5 }, (_, index) => {
  const weekNumber = index + 1;

  return {
    weekNumber,
    items: calendarItems.slice(index * 7, index * 7 + 7),
  };
});

export function PlanPage() {
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [calendarView, setCalendarView] = useState<'month' | 'week'>('week');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const totalWeeks = weeklyPreviewWeeks.length;

  const selectedItem = useMemo(() => {
    if (selectedDateKey === null) {
      return null;
    }

    return calendarItems.find((item) => item.dateKey === selectedDateKey) ?? null;
  }, [selectedDateKey]);

  const bottomSheetModel: BottomSheetViewModel = useMemo(() => {
    if (selectedItem === null) {
      return { open: false, title: '' };
    }

    return {
      open: true,
      title: `${selectedItem.month}/${selectedItem.dayOfMonth} 훈련 상세`,
    };
  }, [selectedItem]);

  const overlayModel: OverlayViewModel = useMemo(() => {
    return {
      open: overlayMessage.length > 0,
      message: overlayMessage,
    };
  }, [overlayMessage]);

  const activeWeekItems = weeklyPreviewWeeks.find((week) => week.weekNumber === selectedWeek)?.items ?? [];

  const handleCloseBottomSheet = () => {
    setSelectedDateKey(null);
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

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === 1 ? totalWeeks : prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => (prevWeek === totalWeeks ? 1 : prevWeek + 1));
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

          {calendarView === 'month' ? (
            <>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {calendarDays.map((day) => {
                  return (
                    <div key={day} className="text-center text-xs text-slate-400">
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 grid grid-cols-7 gap-2">
                {calendarItems.map((item) => {
                  return (
                    <button
                      key={item.dateKey}
                      type="button"
                      className="relative aspect-square border border-slate-700 p-1 text-left text-xs text-slate-300"
                      aria-label={`${item.month}월 ${item.dayOfMonth}일`}
                      onClick={() => setSelectedDateKey(item.dateKey)}
                    >
                      <span>{item.dayOfMonth}</span>
                      <span
                        className={`absolute right-1 bottom-1 size-1.5 rounded-full ${typeColorClassByTraining[item.type]}`}
                      />
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handlePrevWeek}
                  className="rounded-sm border border-slate-700 px-2 py-1 text-xs text-slate-300"
                  aria-label="이전 주차"
                >
                  {'<'}
                </button>
                <p className="text-xs text-slate-200">{selectedWeek}주차</p>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="rounded-sm border border-slate-700 px-2 py-1 text-xs text-slate-300"
                  aria-label="다음 주차"
                >
                  {'>'}
                </button>
              </div>

              <div className="space-y-2">
                {activeWeekItems.map((item) => {
                  return (
                    <button
                      key={item.dateKey}
                      type="button"
                      className="w-full border border-slate-700 px-3 py-2 text-left"
                      aria-label={`${item.month}/${item.dayOfMonth} ${item.label}`}
                      onClick={() => setSelectedDateKey(item.dateKey)}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-11 border border-slate-700 px-2 py-1 text-center">
                            <p className="text-[10px] text-slate-400">{item.dayLabel}</p>
                            <p className="text-xs text-slate-200">
                              {item.month}/{item.dayOfMonth}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-100">{item.label}</p>
                            <p className="mt-1 text-[11px] text-slate-400">{item.rowSummary}</p>
                          </div>
                        </div>
                        <span className={`size-2 rounded-full ${typeColorClassByTraining[item.type]}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
