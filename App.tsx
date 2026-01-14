
import React, { useState, useEffect } from 'react';
import { Plus, Music, Music2, LogOut, Heart, Zap, Orbit, Palette, Check, ShieldCheck } from 'lucide-react';
import GalaxyVoyager from './components/GalaxyVoyager';
import MemoryPopup from './components/MemoryPopup';
import AddMemoryModal from './components/AddMemoryModal';
import ComplexBackground from './components/ComplexBackground';
import { Memory, AppStage, ThemeType, ThemeConfig } from './types';

const THEMES: ThemeConfig[] = [
  { id: 'deep-space', name: 'Nebula Core', color: '#22d3ee', secondary: '#4c1d95', bgClass: 'bg-space' },
  { id: 'sakura', name: 'Sakura Digital', color: '#f472b6', secondary: '#9d174d', bgClass: 'bg-sakura' },
  { id: 'matrix', name: 'Cyber Grid', color: '#4ade80', secondary: '#064e3b', bgClass: 'bg-matrix' },
  { id: 'supernova', name: 'Supernova', color: '#fbbf24', secondary: '#78350f', bgClass: 'bg-nova' },
];

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES[0]);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('couple_memories_v2');
    if (saved) {
      setMemories(JSON.parse(saved));
    } else {
      const defaultMemories = [
        { id: '1', title: 'First Date', location: 'Cyber Café', date: '2023-05-20', note: 'The digital rain was falling outside...', imageUrl: 'https://images.unsplash.com/photo-1511733351957-2cdd99000a02?auto=format&fit=crop&q=80', createdAt: Date.now() - 50000000 },
        { id: '2', title: 'Star Gazing', location: 'Obsrvatory Park', date: '2024-01-15', note: 'We found our own constellations...', imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80', createdAt: Date.now() - 40000000 },
        { id: '3', title: 'Neon Walk', location: 'Tokyo Street', date: '2024-06-12', note: 'Neon signs were our only guides...', imageUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80', createdAt: Date.now() - 30000000 },
      ];
      setMemories(defaultMemories);
    }
  }, []);

  const handleAddMemory = (data: any) => {
    const newMemory: Memory = { id: Math.random().toString(36).substr(2, 9), ...data, createdAt: Date.now() };
    const updated = [newMemory, ...memories];
    setMemories(updated);
    localStorage.setItem('couple_memories_v2', JSON.stringify(updated));
    setIsAdding(false);
  };

  if (stage === AppStage.INTRO) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center overflow-hidden relative">
        <ComplexBackground theme={currentTheme} />
        <div className="relative z-10 text-center space-y-10 px-6 max-w-2xl">
           <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 blur-[60px] opacity-20 animate-pulse" style={{ backgroundColor: currentTheme.color }} />
                <div className="relative p-12 border border-white/5 rounded-full backdrop-blur-2xl transition-transform duration-1000 group-hover:scale-110">
                  <Orbit size={80} style={{ color: currentTheme.color }} className="animate-[spin_12s_linear_infinite]" />
                </div>
              </div>
           </div>
           
           <div className="space-y-4">
             <div className="flex items-center justify-center gap-4 mb-2">
                <ShieldCheck size={16} style={{ color: currentTheme.color }} />
                <span className="text-[10px] font-sci-fi text-white/40 uppercase tracking-[0.5em]">Identity Verified</span>
             </div>
             <h1 className="text-6xl md:text-9xl font-sci-fi text-white tracking-tighter uppercase font-bold">
               {currentTheme.id === 'sakura' ? 'Sakura' : 'Orbital'} <span className="opacity-50" style={{ color: currentTheme.color }}>Node</span>
             </h1>
             <p className="text-white/30 text-[9px] md:text-xs uppercase tracking-[0.7em] max-w-lg mx-auto leading-relaxed">
               Neural Link Synchronized // Welcome to the Memory Sphere
             </p>
           </div>

           <button onClick={() => setStage(AppStage.VOYAGER)} className="group relative px-24 py-8 overflow-hidden rounded-2xl border transition-all duration-1000" style={{ borderColor: `${currentTheme.color}33`, backgroundColor: `${currentTheme.color}0a` }}>
             <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" style={{ background: `linear-gradient(to right, transparent, ${currentTheme.color}22, transparent)` }} />
             <span className="relative z-10 font-sci-fi font-bold tracking-[0.4em] uppercase flex items-center gap-6 text-[11px]" style={{ color: currentTheme.color }}>
               Initiate Link <Zap size={18} />
             </span>
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col">
      <ComplexBackground theme={currentTheme} />
      
      <header className="absolute top-0 left-0 w-full z-[100] p-8 md:p-12 flex justify-between items-center pointer-events-none">
         <div className="pointer-events-auto flex items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 blur-xl opacity-30 animate-pulse" style={{ backgroundColor: currentTheme.color }} />
              <div className="relative w-14 h-14 md:w-20 md:h-20 bg-black/40 backdrop-blur-3xl rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
                <Heart size={32} style={{ color: currentTheme.color, fill: `${currentTheme.color}22` }} />
              </div>
            </div>
            <div>
              <h2 className="text-white font-sci-fi text-2xl md:text-4xl font-bold">ORBITAL.V3</h2>
              <p className="text-[10px] tracking-[0.3em] uppercase mt-2 opacity-50" style={{ color: currentTheme.color }}>Sim: {currentTheme.name}</p>
            </div>
         </div>
         
         <div className="pointer-events-auto flex gap-4 md:gap-6">
            <div className="relative">
              <button onClick={() => setShowThemeMenu(!showThemeMenu)} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border border-white/5 flex items-center justify-center bg-black/20 text-white/40 hover:text-white transition-all backdrop-blur-3xl shadow-xl">
                <Palette size={28} style={{ color: showThemeMenu ? currentTheme.color : 'inherit' }} />
              </button>
              {showThemeMenu && (
                <div className="absolute top-full right-0 mt-6 p-5 bg-black/80 backdrop-blur-[40px] border border-white/10 rounded-3xl w-64 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                  <p className="text-[9px] font-sci-fi text-white/30 uppercase tracking-[0.2em] mb-5 border-b border-white/5 pb-3">Environment Control</p>
                  <div className="space-y-2">
                    {THEMES.map(t => (
                      <button key={t.id} onClick={() => { setCurrentTheme(t); setShowThemeMenu(false); }} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${currentTheme.id === t.id ? 'bg-white/5' : 'hover:bg-white/5'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}44` }} />
                          <span className={`text-[11px] font-sci-fi uppercase tracking-wider ${currentTheme.id === t.id ? 'text-white' : 'text-white/40'}`}>{t.name}</span>
                        </div>
                        {currentTheme.id === t.id && <Check size={14} style={{ color: t.color }} />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setIsAudioPlaying(!isAudioPlaying)} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border border-white/5 flex items-center justify-center bg-black/20 text-white/40 hover:bg-white/5 transition-all backdrop-blur-3xl shadow-xl">
              {isAudioPlaying ? <Music2 size={28} style={{ color: currentTheme.color }} className="animate-pulse" /> : <Music size={28} />}
            </button>
            <button onClick={() => setStage(AppStage.INTRO)} className="w-14 h-14 md:w-20 md:h-20 rounded-2xl border border-white/5 flex items-center justify-center bg-black/20 text-white/40 hover:text-white hover:bg-white/5 transition-all backdrop-blur-3xl shadow-xl">
              <LogOut size={28} />
            </button>
         </div>
      </header>

      <main className="flex-1 w-full h-full relative z-10">
         <GalaxyVoyager memories={memories} onSelect={(m) => setSelectedMemory(m)} theme={currentTheme} />
      </main>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-8">
         <button onClick={() => setIsAdding(true)} className="group relative w-full flex items-center justify-center gap-8 py-7 rounded-2xl font-sci-fi font-bold overflow-hidden transition-all shadow-2xl active:scale-95" style={{ backgroundColor: currentTheme.color }}>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <Plus className="relative z-10 group-hover:text-black transition-colors" size={28} />
            <span className="relative z-10 tracking-[0.3em] uppercase text-[11px] group-hover:text-black transition-colors">Capture Memory</span>
         </button>
      </div>

      {isAdding && <AddMemoryModal onClose={() => setIsAdding(false)} onAdd={handleAddMemory} theme={currentTheme} />}
      {selectedMemory && <MemoryPopup memory={selectedMemory} onClose={() => setSelectedMemory(null)} theme={currentTheme} />}
      {isAudioPlaying && <audio autoPlay loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" className="hidden" />}
    </div>
  );
};

export default App;
