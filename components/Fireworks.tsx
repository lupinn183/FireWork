
import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const particles: any[] = [];
    const colors = ['#ff0040', '#ffbf00', '#00ff40', '#00ffff', '#ff00ff', '#ffffff'];

    class Particle {
      x: number; y: number; color: string; velocity: { x: number; y: number }; alpha: number; friction: number; gravity: number;
      constructor(x: number, y: number, color: string, velocity: { x: number; y: number }) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
        this.friction = 0.95;
        this.gravity = 0.2;
      }
      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
      update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
      }
    }

    const createFirework = (x: number, y: number) => {
      const particleCount = 400;
      const angleIncrement = (Math.PI * 2) / particleCount;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color, {
          x: Math.cos(angleIncrement * i) * (Math.random() * 15),
          y: Math.sin(angleIncrement * i) * (Math.random() * 15)
        }));
      }
    };

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (Math.random() < 0.05) {
        createFirework(Math.random() * canvasWidth, Math.random() * (canvasHeight * 0.6));
      }

      particles.forEach((particle, index) => {
        if (particle.alpha > 0) {
          particle.update();
          particle.draw();
        } else {
          particles.splice(index, 1);
        }
      });
    };

    animate();

    const handleResize = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-6xl md:text-8xl font-tet text-yellow-500 mb-8 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] animate-pulse">
          Chúc Mừng Năm Mới
        </h1>
        <p className="text-xl md:text-2xl text-white/80 font-serif-elegant mb-12 tracking-widest uppercase">
          Quý Tỵ 2025
        </p>
        <button
          onClick={onContinue}
          className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(220,38,38,0.5)] border-2 border-yellow-500"
        >
          Khám Phá Cây Đào
        </button>
      </div>
      <div className="absolute bottom-8 text-white/40 text-sm animate-bounce">
        Nhấn để bắt đầu hành trình mùa xuân
      </div>
    </div>
  );
};

export default Fireworks;
