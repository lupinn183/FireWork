
import React from 'react';
import { X, MapPin, Calendar, Heart, Share2, Terminal } from 'lucide-react';
// Fix: Import ThemeConfig to type the new theme prop
import { Memory, ThemeConfig } from '../types';

const LottiePlayer = 'lottie-player' as any;

interface MemoryPopupProps {
  memory: Memory;
  onClose: () => void;
  // Fix: Add theme prop to interface
  theme: ThemeConfig;
}

const MemoryPopup: React.FC<MemoryPopupProps> = ({ memory, onClose, theme }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-6xl h-full max-h-[85vh] grid md:grid-cols-[1fr_400px] bg-[#050510]/95 backdrop-blur-3xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.2)] animate-in zoom-in-95 duration-500">
        
        {/* Memory Visualizer Side */}
        <div className="relative h-full overflow-hidden group">
          <img 
            src={memory.imageUrl} 
            className="w-full h-full object-cover opacity-80" 
            alt={memory.title}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#050510]" />
          <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay scanline" />
          
          {/* Lottie Robot Helper */}
          <div className="absolute top-10 left-10 w-40 h-40 pointer-events-none drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]">
             <LottiePlayer
                src="https://lottie.host/80918076-2165-4d05-b09e-76e339b69b59/G5kM0D5v9g.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              />
          </div>
        </div>

        {/* Neural Data Side */}
        <div className="p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-[#050510] relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-cyan-500/20 rounded-xl text-white/40 hover:text-cyan-400 transition-all border border-white/10"
          >
            <X size={20} />
          </button>

          <div className="space-y-8 mt-10">
            <div className="flex items-center gap-3">
              <Terminal size={16} className="text-cyan-500" />
              <span className="text-[10px] font-sci-fi uppercase tracking-[0.4em] text-cyan-400">Data Stream // {memory.id}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sci-fi text-white leading-tight uppercase">
              {memory.title}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <Calendar size={14} className="text-cyan-500 mb-2" />
                <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Timeline Index</p>
                <p className="text-xs font-sci-fi text-white">{memory.date}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <MapPin size={14} className="text-cyan-500 mb-2" />
                <p className="text-[8px] uppercase tracking-widest text-white/40 mb-1">Geospatial Ref</p>
                <p className="text-xs font-sci-fi text-white truncate">{memory.location}</p>
              </div>
            </div>

            <div className="relative p-6 bg-cyan-500/5 border-l-2 border-cyan-500 rounded-r-2xl">
              <p className="text-lg md:text-xl font-serif-elegant text-cyan-50/80 leading-relaxed italic">
                "{memory.note}"
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-4">
               <button className="flex-1 min-w-[150px] flex items-center justify-center gap-3 py-4 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-black transition-all font-sci-fi text-[10px] uppercase tracking-widest">
                 <Heart size={14} /> Neural Pulse
               </button>
               <button className="flex-1 min-w-[150px] flex items-center justify-center gap-3 py-4 bg-white/5 border border-white/10 text-white/40 rounded-xl hover:text-white transition-all font-sci-fi text-[10px] uppercase tracking-widest">
                 <Share2 size={14} /> Broadcast
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryPopup;
