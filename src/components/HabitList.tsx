import HabitItem from "./HabitItem";
import type { Habit } from "../types";
import type { WeekProps } from "../types";

type HabitListProps = WeekProps & {
  habits: Habit[];
  onDeleteHabit: (id: string) => void;
  onToggleHabit: (id: string, date: string) => void;
};

function HabitList({ habits, currentWeek, onDeleteHabit, onToggleHabit,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <h1 className="text-center text-zinc-500 py-12">No habits yet. Add one above to get started!</h1>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} currentWeek={currentWeek}
          onDelete={() => onDeleteHabit(habit.id)}
          onToggle={(date) => onToggleHabit(habit.id, date)}/>
      ))}
    </div>
  );
}

export default HabitList;
