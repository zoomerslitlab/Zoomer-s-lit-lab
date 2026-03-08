
import React, { useState, useEffect } from 'react';

const StudyTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="cyber-card p-4 rounded-xl flex items-center space-x-3 border-l-4 border-l-cyan-400">
        <div className="p-2 bg-cyan-900/30 rounded-lg">
          <svg className="w-5 h-5 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-cyan-500 font-bold font-orbitron">Session Active</p>
          <p className="text-xl font-orbitron font-bold text-white tabular-nums">{formatTime(seconds)}</p>
        </div>
      </div>
    </div>
  );
};

export default StudyTimer;
