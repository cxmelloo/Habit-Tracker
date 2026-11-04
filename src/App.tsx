import { useEffect, useState } from "react";
import { startOfWeek, addWeeks, subWeeks,} from "date-fns";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import type { Habit } from "./types";

function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentWeek, setCurrentWeek] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  function addHabit(name: string) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name,
      completedDates: [],
    };

    setHabits(prev => [...prev, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  }

  function toggleHabit(id: string, date: string) {
    setHabits(prev =>
      prev.map(habit => {
        if (habit.id !== id) return habit;

        const completed = habit.completedDates.includes(date);

        return {
          ...habit,
          completedDates: completed
            ? habit.completedDates.filter(d => d !== date)
            : [...habit.completedDates, date],
        };
      })
    );
  }

  function previousWeek() {
    setCurrentWeek(prev => subWeeks(prev, 1));
  }

  function nextWeek() {
    setCurrentWeek(prev => addWeeks(prev, 1));
  }

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
      <Header habits={habits}
        currentWeek={currentWeek}
        onPrev={previousWeek}
        onNext={nextWeek}/>

      <HabitForm onAddHabit={addHabit} />

      <HabitList habits={habits}
        currentWeek={currentWeek}
        onDeleteHabit={deleteHabit}
        onToggleHabit={toggleHabit}/>
    </div>
  );
}

export default App;
