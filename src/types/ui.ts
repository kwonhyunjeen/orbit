export type MainTab = 'home' | 'plan';

export type BottomSheetViewModel = {
  open: boolean;
  title: string;
};

export type OverlayViewModel = {
  open: boolean;
  message: string;
};

export type CalendarCellViewModel = {
  key: string;
  label: number;
};

export type TrainingLabelItem = {
  label: string;
  colorClass: string;
};

export type TrainingKind = 'rest' | 'easy' | 'long' | 'tempo' | 'interval' | 'strength' | 'race';

export type CalendarItem = {
  dateKey: string;
  month: number;
  dayOfMonth: number;
  dayLabel: string;
  type: TrainingKind;
  label: string;
  rowSummary: string;
};

export type WeeklyCalendarGroup = {
  weekNumber: number;
  items: CalendarItem[];
};
