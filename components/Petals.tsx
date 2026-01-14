
import React, { useMemo } from 'react';

const Petals: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 20,
      size: 10 + Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(100px) rotate(360deg); opacity: 0; }
        }
        .petal {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, #ffc0cb, #ff69b4);
          border-radius: 150% 10% 150% 10%;
          animation: fall linear infinite;
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
};

export default Petals;
