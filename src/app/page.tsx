'use client';

import { useEffect, useState } from 'react';

const HABITS = [
  { id: 1, name: 'Book', emoji: '📖' },
  { id: 2, name: 'Workouts', emoji: '💪' },
  { id: 3, name: 'Hydration', emoji: '💧' },
  { id: 4, name: 'Stairs', emoji: '🪜' },
  { id: 5, name: 'Meditation', emoji: '🧘' },
  { id: 6, name: 'Study', emoji: '📚' },
  { id: 7, name: 'Gantel', emoji: '🏋️' },
  { id: 8, name: 'Cigarette', emoji: '🚭' },
  { id: 9, name: 'Water', emoji: '🥤' },
];

const MOTIVATIONS = [
  'Я думал ты сдашься на 3 день',
  'Ты сильнее, чем думаешь',
  'Каждый день - это новый шанс',
];

export default function Home() {
  const [name, setName] = useState('');
  const [selectedHabits, setSelectedHabits] = useState<number[]>([]);
  const [day, setDay] = useState(1);
  const [motivation, setMotivation] = useState('');

  useEffect(() => {
    setDay(Math.floor(Math.random() * 100) + 1);
    setMotivation(MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)]);
  }, []);

  const toggleHabit = (id: number) => {
    setSelectedHabits((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (name.trim() && selectedHabits.length > 0) {
      localStorage.setItem('protocol', JSON.stringify({ name, habits: selectedHabits, day }));
      alert(`Протокол создан! 🎉`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white mb-2">{name || 'Привет'} 👋</h1>
          <p className="text-lg font-semibold text-blue-400">День {day}</p>
          <p className="text-sm text-gray-400 italic">"{motivation}"</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-300 mb-4 uppercase">Выбери привычки</h2>
          <div className="grid grid-cols-3 gap-3">
            {HABITS.map((habit) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-lg transition-all ${
                  selectedHabits.includes(habit.id)
                    ? 'bg-blue-600 ring-2 ring-blue-400'
                    : 'bg-slate-700'
                }`}
              >
                <span className="text-3xl">{habit.emoji}</span>
                <div className="text-xs text-gray-200 mt-1">{habit.name}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!name.trim() || selectedHabits.length === 0}
          className={`w-full py-3 rounded-lg font-bold ${
            name.trim() && selectedHabits.length > 0
              ? 'bg-blue-600 text-white'
              : 'bg-gray-600 text-gray-400'
          }`}
        >
          Создать Протокол 🚀
        </button>

        {selectedHabits.length > 0 && (
          <p className="text-center text-sm text-gray-400 mt-4">Выбрано: {selectedHabits.length}/9</p>
        )}
      </div>
    </div>
  );
}
