export default function Home() {
  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'system-ui',
      backgroundColor: '#0f0f0f',
      color: 'white',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '32px' }}>🚀 Протокол Жизни</h1>
      <p style={{ fontSize: '20px', marginTop: '10px' }}>
        Твой личный AI-тренер по привычкам
      </p>
      
      <div style={{ marginTop: '50px' }}>
        <h2>Доброе утро!</h2>
        <p>Сегодня день №1 в твоём Протоколе</p>
      </div>

      <button style={{
        marginTop: '40px',
        padding: '16px 32px',
        fontSize: '18px',
        backgroundColor: '#00aaff',
        color: 'white',
        border: 'none',
        borderRadius: '9999px',
        cursor: 'pointer'
      }}>
        ✅ Начать день
      </button>
    </div>
  );
}
