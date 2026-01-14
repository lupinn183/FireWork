
import React, { useState } from 'react';
import { X, Sparkles, Image as ImageIcon, Wand2, Loader2 } from 'lucide-react';
import { generateGreeting } from '../services/geminiService';

interface AddBranchModalProps {
  onClose: () => void;
  onAdd: (data: { imageUrl: string; greeting: string; author: string }) => void;
}

const AddBranchModal: React.FC<AddBranchModalProps> = ({ onClose, onAdd }) => {
  const [author, setAuthor] = useState('');
  const [greeting, setGreeting] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMagicGreeting = async () => {
    if (!author) {
      alert("Vui lòng nhập tên của bạn trước nhé!");
      return;
    }
    setIsGenerating(true);
    const aiWish = await generateGreeting(`Lời chúc từ ${author} dành cho gia đình và bạn bè`);
    setGreeting(aiWish);
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !greeting || !imageUrl) {
      alert("Vui lòng điền đầy đủ thông tin và chọn ảnh nhé!");
      return;
    }
    onAdd({ author, greeting, imageUrl });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-red-600 p-6 flex justify-between items-center text-white">
          <h2 className="text-2xl font-tet">Thêm Lời Chúc Mùa Xuân</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Author Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bạn là ai?</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nhập tên của bạn..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh của bạn</label>
            <div 
              className={`relative border-2 border-dashed rounded-2xl p-4 transition-all ${
                imageUrl ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-red-400'
              }`}
            >
              {imageUrl ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
                  <ImageIcon size={48} className="text-gray-400 mb-2" />
                  <span className="text-gray-500">Bấm để chọn ảnh hoặc kéo thả vào đây</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Greeting Textarea */}
          <div className="relative">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Lời chúc Tết</label>
              <button
                type="button"
                onClick={handleMagicGreeting}
                disabled={isGenerating}
                className="flex items-center gap-2 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Wand2 size={14} />}
                Gợi ý AI
              </button>
            </div>
            <textarea
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Nhập lời chúc của bạn tại đây..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <Sparkles className="group-hover:animate-spin" />
            Treo Lên Cây Đào
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBranchModal;
