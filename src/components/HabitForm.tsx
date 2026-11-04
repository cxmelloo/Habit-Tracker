
import { useState, type FormEvent } from "react";
import Button from "./Button";

type HabitFormProps = {
  onAddHabit: (name: string) => void;
};

function HabitForm({ onAddHabit }: HabitFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) return;

    onAddHabit(trimmedName);
    setName("");
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)}
        className="flex-1 min-w-0 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."/>

      <Button type="submit" disabled={!name.trim()} className="rounded-xl" text="Add Habit"/>
    </form>
  );
}

export default HabitForm;
