
import React, { useState, useEffect, useRef } from 'react';
import { Memory } from '../types';
import { MapPin, Calendar, Heart } from 'lucide-react';

interface MemoryVoyagerProps {
  memories: Memory[];
  onSelect: (memory: Memory) => void;
}

const MemoryVoyager: React.FC<MemoryVoyagerProps> = ({ memories, onSelect }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix: Resolved syntax error where handleWheel was incorrectly defined with a trailing comma.
    // Also correctly passed { passive: false } to addEventListener to allow preventDefault().
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      setScrollPos(prev => Math.max(0, prev + e.deltaY * 0.5));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Sắp xếp memory theo thời gian
  const sortedMemories = [...memories].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#0a0a0f]">
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
        {sortedMemories.map((memory, index) => {
          // Tính toán vị trí Z dựa trên scroll và index
          const baseZ = -index * 1200;
          const currentZ = baseZ + scrollPos;
          
          // Chỉ render những cái ở gần để tối ưu
          if (currentZ > 1000 || currentZ < -5000) return null;

          const opacity = Math.min(1, Math.max(0, (currentZ + 2000) / 2000));
          const blur = Math.abs(currentZ) / 1000 * 4;

          return (
            <div
              key={memory.id}
              className="absolute transition-all duration-300 ease-out cursor-pointer hover:z-50"
              style={{
                transform: `translateZ(${currentZ}px) rotateY(${(index % 2 === 0 ? 1 : -1) * 5}deg)`,
                opacity: opacity,
                filter: `blur(${blur}px)`,
                pointerEvents: currentZ > -200 && currentZ < 500 ? 'auto' : 'none'
              }}
              onClick={() => onSelect(memory)}
            >
              <div className="w-[350px] md:w-[500px] bg-white/5 backdrop-blur-xl border border-white/20 p-4 rounded-3xl shadow-2xl transition-transform hover:scale-105 active:scale-95">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-white/10">
                  <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/40 backdrop-blur rounded-full text-[10px] text-white/80 flex items-center gap-1">
                    <Calendar size={10} /> {memory.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-serif-elegant text-white mb-2 flex items-center gap-2">
                   {memory.title} <Heart size={16} className="text-rose-500 fill-rose-500" />
                </h3>
                
                <div className="flex items-center gap-2 text-rose-300 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{memory.location}</span>
                </div>
                
                <p className="text-white/60 text-sm italic line-clamp-2">
                  "{memory.note}"
                </p>
                
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                   <button className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Xem chi tiết</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
         {sortedMemories.map((_, i) => (
           <div 
             key={i} 
             className={`w-1 transition-all duration-500 rounded-full ${Math.abs(scrollPos - i * 1200) < 600 ? 'h-12 bg-rose-500' : 'h-2 bg-white/20'}`} 
           />
         ))}
      </div>

      <div className="absolute bottom-10 left-10 z-20">
         <div className="text-white/20 text-[10px] uppercase tracking-[0.5em] animate-pulse">Cuộn để du hành ngược thời gian</div>
      </div>
    </div>
  );
};

export default MemoryVoyager;
