export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#111827] text-white p-5 font-sans">
      {/* Верхняя панель */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
            🚀
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Протокол Жизни</h1>
            <p className="text-cyan-400 text-sm">AI-тренер • Версия 1.0</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <span className="text-amber-400 text-2xl">🔥</span>
            <div>
              <div className="text-xs text-gray-400">Стрек</div>
              <div className="text-3xl font-bold text-amber-400">7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Приветствие */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold mb-2">Доброе утро, братан! ☀️</h2>
        <p className="text-gray-400 text-lg">Сегодня ты уже на <span className="text-emerald-400 font-bold">23%</span> ближе к лучшей версии себя</p>
      </div>

      {/* Карточки привычек */}
      <div className="space-y-4">
        {/* Привычка 1 */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all">
          <div className="text-4xl">⏰</div>
          <div className="flex-1">
            <div className="font-semibold text-lg">Проснуться в 6:30</div>
            <div className="text-sm text-gray-400">Ранний подъём</div>
          </div>
          <input type="checkbox" checked className="w-7 h-7 accent-emerald-400" />
        </div>

        {/* Привычка 2 */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all">
          <div className="text-4xl">💧</div>
          <div className="flex-1">
            <div className="font-semibold text-lg">Выпить 3 литра воды</div>
            <div className="text-sm text-gray-400">Гидратация</div>
          </div>
          <input type="checkbox" className="w-7 h-7 accent-emerald-400" />
        </div>

        {/* Привычка 3 */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all">
