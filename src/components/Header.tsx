import {
  endOfWeek,
  format,
  startOfWeek,
} from "date-fns";

import Button from "./Button";
import type { Habit, WeekProps } from "../types";

type HeaderProps = WeekProps & {
  habits: Habit[];
  onPrev: () => void;
  onNext: () => void;
};

function Header({ habits, currentWeek, onPrev, onNext,
}: HeaderProps) {
  const today = format(new Date(), "yyyy-MM-dd");

  const completedToday = habits.filter(habit =>
    habit.completedDates.includes(today)
  ).length;

  const weekStart = startOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  const weekEnd = endOfWeek(currentWeek, {
    weekStartsOn: 1,
  });

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Habit Tracker</h1>

        <span className="text-zinc-400 text-sm">{completedToday} / {habits.length} done today</span>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <span className="text-zinc-400 text-sm">{format(weekStart, "MMM d")} – {format(weekEnd, "MMM d")}</span>

        <div className="flex items-center gap-2">
          <Button type="button" variant="secondary" text="Prev" onClick={onPrev}/>

          <Button type="button" variant="secondary" text="Next" onClick={onNext}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
