
import React, { useState } from 'react';
import { X, Camera, MapPin, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { generateLoveNote } from '../services/geminiService';
// Fix: Import ThemeConfig to type the new theme prop
import { ThemeConfig } from '../types';

interface AddMemoryModalProps {
  onClose: () => void;
  onAdd: (data: any) => void;
  // Fix: Add theme prop to interface
  theme: ThemeConfig;
}

const AddMemoryModal: React.FC<AddMemoryModalProps> = ({ onClose, onAdd, theme }) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleMagicNote = async () => {
    if (!location || !title) {
      alert("Hãy nhập địa điểm và tên chuyến đi trước nhé!");
      return;
    }
    setIsGenerating(true);
    const aiNote = await generateLoveNote(location, title);
    setNote(aiNote);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !imageUrl || !note) {
      alert("Vui lòng lấp đầy kỉ niệm bằng ảnh và thông tin nhé!");
      return;
    }
    onAdd({ title, location, date, note, imageUrl });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60">
      <div className="bg-[#15151e] w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-serif-elegant text-white">Lưu Giữ Khoảnh Khắc</h2>
            <p className="text-white/40 text-xs tracking-widest uppercase mt-1">Eternal Memory Node</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-full text-white/60 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Hôm ấy là ngày gì?</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Lần đầu đi xem phim..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Thời gian</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Chúng ta đã ở đâu?</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500/50" size={18} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nhập địa điểm..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Ảnh kỉ niệm</label>
            <div className={`relative border-2 border-dashed rounded-3xl h-48 flex flex-col items-center justify-center transition-all ${imageUrl ? 'border-rose-500/40' : 'border-white/10 hover:border-white/20'}`}>
              {imageUrl ? (
                <div className="absolute inset-0 p-2">
                  <img src={imageUrl} className="w-full h-full object-cover rounded-2xl" />
                  <button type="button" onClick={() => setImageUrl('')} className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white"><X size={14}/></button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center">
                  <Camera size={40} className="text-white/20 mb-2" />
                  <span className="text-white/40 text-xs">Thêm bức ảnh đẹp nhất</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Ghi chú yêu thương</label>
              <button
                type="button"
                onClick={handleMagicNote}
                disabled={isGenerating}
                className="flex items-center gap-2 text-[10px] font-bold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-widest"
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                Viết lời tình ca (AI)
              </button>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Bạn cảm thấy thế nào về ngày hôm ấy?"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:border-rose-500/50 transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-2xl font-bold tracking-[0.2em] uppercase hover:shadow-[0_10px_30px_rgba(225,29,72,0.3)] transition-all flex items-center justify-center gap-3"
          >
            <Sparkles size={20} />
            Lưu Vào Vĩnh Cửu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemoryModal;
