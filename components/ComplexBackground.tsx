
import React, { useEffect, useRef } from 'react';
import { ThemeConfig } from '../types';

interface ComplexBackgroundProps {
  theme: ThemeConfig;
}

const ComplexBackground: React.FC<ComplexBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: {x: number, y: number, size: number, speed: number, alpha: number}[] = [];
    let streams: {x: number, y: number, length: number, speed: number, alpha: number}[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 200 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.1,
        alpha: Math.random()
      }));
      streams = Array.from({ length: 30 }).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 200 + 100,
        speed: Math.random() * 2 + 1,
        alpha: Math.random() * 0.3
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Stars
      ctx.fillStyle = "#ffffff";
      particles.forEach(p => {
        ctx.globalAlpha = Math.sin(Date.now() * 0.001 + p.alpha * 10) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < 0) p.y = canvas.height;
      });

      // Draw Vertical Streams
      ctx.strokeStyle = theme.color;
      streams.forEach(s => {
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.length);
        ctx.stroke();
        s.y += s.speed;
        if (s.y > canvas.height) s.y = -s.length;
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, [theme.color]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <div className={`absolute inset-0 transition-colors duration-1000 ${theme.bgClass}`} />
      
      {/* Cinematic Grain & Vignette */}
      <div className="grain-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Starfield & Streams */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />

      {/* Decorative HUD Frames */}
      <div className="hud-bracket hud-tl opacity-20" style={{ borderColor: theme.color }} />
      <div className="hud-bracket hud-tr opacity-20" style={{ borderColor: theme.color }} />
      <div className="hud-bracket hud-bl opacity-20" style={{ borderColor: theme.color }} />
      <div className="hud-bracket hud-br opacity-20" style={{ borderColor: theme.color }} />

      {/* Ambience Clouds */}
      <div className="nebula-cloud w-[1500px] h-[1500px] -top-1/2 -left-1/4" style={{ backgroundColor: theme.color, opacity: 0.05 }} />
      <div className="nebula-cloud w-[1500px] h-[1500px] -bottom-1/2 -right-1/4" style={{ backgroundColor: theme.secondary, opacity: 0.05 }} />
      
      {/* 3D Grid Advanced */}
      <div className="grid-floor-v2" style={{ backgroundImage: `radial-gradient(circle, ${theme.color}22 1px, transparent 1px), linear-gradient(to right, ${theme.color}11 1px, transparent 1px), linear-gradient(to bottom, ${theme.color}11 1px, transparent 1px)` }} />
    </div>
  );
};

export default ComplexBackground;
