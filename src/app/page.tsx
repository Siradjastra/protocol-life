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
  'Каждый день - это новый шанс',
  'Ты сильнее, чем думаешь',
  'Привычки - это твой суперсила',
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
      alert(`Протокол создан для ${name}! 🎉`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '8px'
          }}>
            {name ? `${name}` : 'Привет'} 👋
          </h1>
          <p style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#60a5fa',
            marginBottom: '8px'
          }}>
            День {day}
          </p>
          <p style={{ 
            fontSize: '14px', 
            color: '#9ca3af',
            fontStyle: 'italic'
          }}>
            "{motivation}"
          </p>
        </div>

        {/* Name Input */}
        <div style={{ marginBottom: '24px' }}>
          <input
            type="text"
            placeholder="Как тебя зовут?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(71, 85, 105, 0.6)',
              color: 'white',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: '0 0 0 2px transparent',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 2px #60a5fa';
              e.target.style.background = 'rgba(71, 85, 105, 0.8)';
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = '0 0 0 2px transparent';
              e.target.style.background = 'rgba(71, 85, 105, 0.6)';
            }}
          />
        </div>

        {/* Habits Grid */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            color: '#d1d5db',
            marginBottom: '16px',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Выбери привычки
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            {HABITS.map((habit) => (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: selectedHabits.includes(habit.id)
                    ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                    : 'rgba(55, 65, 81, 0.6)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: selectedHabits.includes(habit.id)
                    ? '0 0 12px rgba(37, 99, 235, 0.5)'
                    : 'none',
                }}
                onMouseOver={(e) => {
                  if (!selectedHabits.includes(habit.id)) {
                    e.target.style.background = 'rgba(75, 85, 99, 0.8)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!selectedHabits.includes(habit.id)) {
                    e.target.style.background = 'rgba(55, 65, 81, 0.6)';
                  }
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '32px' }}>{habit.emoji}</span>
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>{habit.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          disabled={!name.trim() || selectedHabits.length === 0}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '8px',
            border: 'none',
            background: name.trim() && selectedHabits.length > 0
              ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
              : 'rgba(75, 85, 99, 0.5)',
            color: name.trim() && selectedHabits.length > 0 ? 'white' : 'rgba(200, 200, 200, 0.5)',
            fontSize: '16px',
            fontWeight: '600',
            cursor: name.trim() && selectedHabits.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s',
            boxShadow: name.trim() && selectedHabits.length > 0
              ? '0 0 20px rgba(37, 99, 235, 0.4)'
              : 'none',
          }}
          onMouseOver={(e) => {
            if (name.trim() && selectedHabits.length > 0) {
              e.target.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.6)';
              e.target.style.transform = 'scale(1.02)';
            }
          }}
          onMouseOut={(e) => {
            e.target.style.boxShadow = '0 0 20px rgba(37, 99, 235, 0.4)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Создать мой Протокол 🚀
        </button>

        {selectedHabits.length > 0 && (
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', marginTop: '16px' }}>
            Выбрано: {selectedHabits.length}/9
          </p>
        )}
      </div>
    </div>
  );
}
