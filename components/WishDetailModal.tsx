
import React from 'react';
import { X, Calendar, User } from 'lucide-react';
import { WishBranch } from '../types';

interface WishDetailModalProps {
  branch: WishBranch;
  onClose: () => void;
}

const WishDetailModal: React.FC<WishDetailModalProps> = ({ branch, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300 border-4 border-yellow-500">
        <div className="relative h-64 overflow-hidden">
          <img src={branch.imageUrl} alt="wish" className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="p-8 -mt-12 relative bg-white rounded-t-[2.5rem]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
               <User size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Gửi bởi</p>
              <h3 className="text-xl font-bold text-gray-800">{branch.author}</h3>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-2xl border-l-4 border-red-500 italic text-gray-700 text-lg leading-relaxed font-serif-elegant mb-6">
            "{branch.greeting}"
          </div>

          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{new Date(branch.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
            <div className="text-red-600 font-bold font-tet text-lg">Vạn Sự Như Ý</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishDetailModal;
