'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [countdownValue, setCountdownValue] = useState(9);
  const [isCounting, setIsCounting] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateDisplay = () => {
    const numberEl = document.querySelector(`.${styles.countdownNumber}`);
    if (numberEl) {
      numberEl.classList.add('scale-animation');
      setTimeout(() => numberEl.classList.remove('scale-animation'), 150);
    }
  };

  const finishCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsCounting(false);
    setShowCompletion(true);
    if (buttonRef.current) {
      buttonRef.current.classList.remove(styles.pulse);
    }
    console.log('Отсчёт завершён! Переход к основному функционалу...');
    // ⚡ Здесь потом добавишь переход на следующий экран
    setTimeout(() => {
      alert('Протокол активирован! Добро пожаловать в твою новую жизнь.');
    }, 500);
  };

  const tick = () => {
    setCountdownValue((prev) => {
      if (prev > 1) {
        updateDisplay();
        return prev - 1;
      } else if (prev === 1) {
        updateDisplay();
        finishCountdown();
        return 0;
      } else {
        finishCountdown();
        return 0;
      }
    });
  };

  const startCountdown = () => {
    if (intervalRef.current) return;
    setIsCounting(true);
    setShowCompletion(false);
    intervalRef.current = setInterval(tick, 1000);
    if (buttonRef.current) {
      buttonRef.current.classList.add(styles.pulse);
    }
  };

  const resetAndStart = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCountdownValue(9);
    setShowCompletion(false);
    startCountdown();
  };

  useEffect(() => {
    // Создаём плавающие частицы на фоне
    const createParticles = () => {
      const particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles';
      particlesContainer.style.position = 'fixed';
      particlesContainer.style.top = '0';
      particlesContainer.style.left = '0';
      particlesContainer.style.width = '100%';
      particlesContainer.style.height = '100%';
      particlesContainer.style.pointerEvents = 'none';
      particlesContainer.style.zIndex = '0';
      document.body.appendChild(particlesContainer);

      const particleCount = 60;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${Math.random() * 12 + 8}s`;
        particle.style.opacity = `${Math.random() * 0.5 + 0.2}`;
        particlesContainer.appendChild(particle);
      }
    };

    createParticles();
    startCountdown();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const container = document.getElementById('particles');
      if (container) container.remove();
    };
  }, []);

  return (
    <div style={{ 
      background: 'radial-gradient(circle at 20% 30%, #0a0f1e, #03060c)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div className={styles.container}>
        <div className={styles.glassCard}>
          <div className={styles.dayTitle}>✨ ТВОЙ ДЕНЬ X ✨</div>
          <div className={styles.mainText}>
            Твой протокол жизни —<br />это получить лучшую версию себя
          </div>
          <button 
            ref={buttonRef}
            className={styles.countdownBtn} 
            onClick={resetAndStart}
          >
            <div className={styles.countdownNumber}>{countdownValue}</div>
            <div className={styles.countdownLabel}>СТАРТ ЧЕРЕЗ</div>
          </button>
          <div 
            className={styles.completionMessage}
            style={{ opacity: showCompletion ? 1 : 0 }}
          >
            🚀 Путь начинается...
          </div>
        </div>
      </div>
    </div>
  );
}
