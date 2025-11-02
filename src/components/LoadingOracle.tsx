import { useState, useEffect } from 'react';

interface LoadingOracleProps {
  onComplete: () => void;
}

export function LoadingOracle({ onComplete }: LoadingOracleProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const timer = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="text-center py-12 animate-pulse">
      <div className="text-6xl mb-6">🔮</div>
      <div className="text-2xl text-amber-300 font-semibold">
        神谕鉴定中{dots}
      </div>
      <div className="text-sm text-amber-500 mt-4 opacity-70">
        正在解析财经话术的江湖门第...
      </div>
    </div>
  );
}