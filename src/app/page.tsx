export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 font-sans">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            🚀 Протокол Жизни
          </h1>
          <p className="text-gray-400">Твой AI-тренер по привычкам</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">День 7</div>
          <div className="text-2xl font-bold text-[#00ff9d]">🔥 7</div>
        </div>
      </div>

      {/* Приветствие */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-medium">Доброе утро, братан! ☀️</h2>
        <p className="text-gray-400 mt-1">Сегодня ты уже на 23% ближе к лучшей версии себя</p>
      </div>

      {/* Карточки привычек */}
      <div className="space-y-3">
        <div className="bg-[#111] rounded-2xl p-4 flex items-center gap-4">
          <input type="checkbox" className="w-6 h-6 accent-[#00ff9d]" />
          <div className="flex-1">
            <div className="font-medium">Проснуться в 6:30</div>
            <div className="text-xs text-gray-400">Ранний подъём</div>
          </div>
          <div className="text-[#00ff9d]">✅</div>
        </div>

        <div className="bg-[#111] rounded-2xl p-4 flex items-center gap-4">
          <input type="checkbox" className="w-6 h-6 accent-[#00ff9d]" />
          <div className="flex-1">
            <div className="font-medium">Выпить 3 литра воды</div>
            <div className="text-xs text-gray-400">Гидратация</div>
          </div>
        </div>

        <div className="bg-[#111] rounded-2xl p-4 flex items-center gap-4">
          <input type="checkbox" className="w-6 h-6 accent-[#00ff9d]" />
          <div className="flex-1">
            <div className="font-medium">Прочитать 20 минут</div>
            <div className="text-xs text-gray-400">Книги / саморазвитие</div>
          </div>
        </div>

        <div className="bg-[#111] rounded-2xl p-4 flex items-center gap-4">
          <input type="checkbox" className="w-6 h-6 accent-[#00ff9d]" />
          <div className="flex-1">
            <div className="font-medium">Тренировка в зале</div>
            <div className="text-xs text-gray-400">Сила и энергия</div>
          </div>
        </div>
      </div>

      {/* Большая кнопка */}
      <button 
        className="w-full mt-8 bg-[#00ff9d] hover:bg-[#00cc7a] text-black font-bold text-lg py-4 rounded-3xl transition-all active:scale-95"
      >
        ✅ Завершить день
      </button>

      <div className="text-center text-xs text-gray-500 mt-6">
        AI-мотивация включена • Протокол работает
      </div>
    </div>
  );
}
