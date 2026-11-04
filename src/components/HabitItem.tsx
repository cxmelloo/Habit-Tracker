import Button from "./Button";
import { eachDayOfInterval, endOfWeek, format, isFuture, startOfDay, subDays,} from "date-fns";
import type { Habit, WeekProps } from "../types";

type HabitItemProps = WeekProps & {
  habit: Habit;
  onDelete: () => void;
  onToggle: (date: string) => void;
};

function HabitItem({ habit, currentWeek, onDelete, onToggle,
}: HabitItemProps) {
  const today = startOfDay(new Date());

  const visDates = eachDayOfInterval({
    start: currentWeek,
    end: endOfWeek(currentWeek, { weekStartsOn: 1 }),
  });

  const completedSet = new Set(habit.completedDates);

  let streak = 0;
  let cursor = today;

  if (!completedSet.has(format(today, "yyyy-MM-dd"))) {
    cursor = subDays(today, 1);
  }

  while (completedSet.has(format(cursor, "yyyy-MM-dd"))) {
    streak++;
    cursor = subDays(cursor, 1);
  }

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>

          <span className="text-sm text-amber-400">🔥{streak}</span>
        </div>

        <Button type="button" variant="ghost-destructive" text="Delete" onClick={onDelete} />
      </div>

      <div className="flex gap-1.5">
        {visDates.map(date => {
          const dateKey = format(date, "yyyy-MM-dd");
          const isCompleted = completedSet.has(dateKey);

          return (
            <Button key={dateKey} type="button" variant={isCompleted ? "primary" : "secondary"}
              className="flex flex-1 flex-col items-center gap-1 rounded-lg text-xs px-1 py-2"
              disabled={isFuture(date)}
              onClick={() => onToggle(dateKey)}>

              <span className="font-medium">{format(date, "EEE")}</span>

              <span>{format(date, "d")}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default HabitItem;
