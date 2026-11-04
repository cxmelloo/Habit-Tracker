export type Habit = {
  id: string;
  name: string;
  completedDates: string[];
};

export type WeekProps = {
  currentWeek: Date;
};