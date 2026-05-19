export type TabKey = 'home' | 'plan';

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
