'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css';

// Инициализация Telegram WebApp
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        MainButton: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
          onClick: (fn: () => void) => void;
          offClick: (fn: () => void) => void;
        };
        initDataUnsafe?: {
          user?: {
            first_name?: string;
            last_name?: string;
            username?: string;
            id?: number;
          };
        };
        colorScheme?: string;
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [countdownValue, setCountdownValue] = useState(9);
  const [isCounting, setIsCounting] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [userName, setUserName] = useState<string>('');

  // Инициализация Telegram и получение данных пользователя
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // расширяем на весь экран
      
      // Получаем имя пользователя для персонализации (опционально)
      if (tg.initDataUnsafe?.user?.first_name) {
        setUserName(tg.initDataUnsafe.user.first_name);
      }
      
      // Адаптация под тему Telegram (можно применить цвета к CSS переменным)
      if (tg.themeParams) {
        const root = document.documentElement;
        root.style.setProperty('--tg-bg-color', tg.themeParams.bg_color || '#000000');
        root.style.setProperty('--tg-text-color', tg.themeParams.text_color || '#ffffff');
      }
    }
  }, []);

  // Проверяем, видел ли пользователь онбординг
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('protocol_onboarding_seen');
    if (hasSeenOnboarding === 'true') {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }
  }, []);

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
    
    // Сохраняем, что онбординг пройден
    localStorage.setItem('protocol_onboarding_seen', 'true');
    
    // Переход на дашборд после короткой задержки
    setTimeout(() => {
      setShowOnboarding(false);
    }, 1000);
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
    if (!showOnboarding) return;
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
  }, [showOnboarding]);

  if (showOnboarding === null) {
    return null; // можно добавить красивый лоадер, но для простоты оставим
  }

  // Дашборд (временная заглушка, позже заменишь на полноценный)
  if (!showOnboarding) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.dashboardCard}>
          <h1 className={styles.dashboardTitle}>📊 Твой день</h1>
          <p className={styles.dashboardGreeting}>
            {userName ? `С возвращением, ${userName}!` : 'С возвращением!'}
          </p>
          <p className={styles.dashboardText}>День №1 в Протоколе</p>
          <button
            className={styles.resetButton}
            onClick={() => {
              localStorage.removeItem('protocol_onboarding_seen');
              window.location.reload();
            }}
          >
            Сбросить онбординг (тест)
          </button>
        </div>
      </div>
    );
  }

  // Онбординг с обратным отсчётом
  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.container}>
        <div className={styles.glassCard}>
          <div className={styles.dayTitle}>✨ ПРОТОКОЛ ЖИЗНИ ✨</div>
          <div className={styles.mainText}>
            {userName ? `${userName}, твой путь` : 'Твой путь'}<br />
            к лучшей версии себя
          </div>
          <button 
            ref={buttonRef}
            className={styles.countdownBtn} 
            onClick={resetAndStart}
          >
            <div className={styles.countdownNumber}>{countdownValue}</div>
            <div className={styles.countdownLabel}>СТАРТ</div>
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
