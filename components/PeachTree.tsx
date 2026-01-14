
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { WishBranch } from '../types';

interface PeachTreeProps {
  branches: WishBranch[];
  onBranchClick: (branch: WishBranch) => void;
}

// Bông hoa đào chi tiết hơn
const PeachBlossom = ({ size, color }: { size: number; color: string }) => (
  <div 
    className="absolute pointer-events-none" 
    style={{ 
      width: size, 
      height: size, 
      background: color, 
      borderRadius: '50% 10% 50% 10%', 
      transform: `rotate(${Math.random() * 360}deg)`,
      filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
      opacity: 0.9
    }} 
  />
);

const PeachTree: React.FC<PeachTreeProps> = ({ branches, onBranchClick }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  // Sinh hệ thống cành nhánh đệ quy (Organic Structure)
  const treeStructure = useMemo(() => {
    const planes = 8; // Số lượng mặt phẳng để tạo khối 3D
    const results = [];

    for (let p = 0; p < planes; p++) {
      const planeRotation = (p * 360) / planes;
      const branchPaths: any[] = [];
      const flowerClusters: any[] = [];

      // Hàm đệ quy vẽ cành
      const grow = (x: number, y: number, angle: number, length: number, thickness: number, depth: number) => {
        if (depth > 5) return;

        const endX = x + Math.cos(angle) * length;
        const endY = y - Math.sin(angle) * length;

        branchPaths.push({ x1: x, y1: y, x2: endX, y2: endY, thickness });

        // Tại các nhánh cuối, thêm cụm hoa
        if (depth >= 3) {
          const flowerCount = 8 - depth;
          for (let f = 0; f < flowerCount; f++) {
            flowerClusters.push({
              x: endX + (Math.random() - 0.5) * 30,
              y: endY + (Math.random() - 0.5) * 30,
              size: 6 + Math.random() * 8,
              color: ['#ffb7c5', '#ff85a2', '#f472b6'][Math.floor(Math.random() * 3)]
            });
          }
        }

        // Tách nhánh
        const subBranches = depth === 0 ? 3 : 2;
        for (let b = 0; b < subBranches; b++) {
          const newAngle = angle + (Math.random() - 0.5) * 0.8;
          const newLength = length * (0.6 + Math.random() * 0.3);
          grow(endX, endY, newAngle, newLength, thickness * 0.7, depth + 1);
        }
      };

      // Bắt đầu mọc từ gốc
      grow(0, 0, Math.PI / 2 + (Math.random() - 0.5) * 0.2, 120, 15, 0);
      results.push({ planeRotation, branchPaths, flowerClusters });
    }
    return results;
  }, []);

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setRotation(prev => prev + deltaX * 0.5);
    setStartX(clientX);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ perspective: '2000px' }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onMouseUp={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <div 
        className="relative w-1 h-1 flex items-center justify-center transition-transform duration-150 ease-out"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg) translateY(200px)` 
        }}
      >
        {/* CHẬU CÂY 3D NGHỆ THUẬT */}
        <div 
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-32 bg-white rounded-t-3xl shadow-2xl overflow-hidden border-4 border-blue-100"
          style={{ transform: 'translateZ(0px)', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#1e40af 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
          <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="text-blue-800 font-serif font-bold text-xl border-2 border-blue-800 px-4 py-1">PHÚC</div>
            <div className="mt-2 text-[8px] text-blue-400 tracking-[0.5em]">GỐM SỨ BÁT TRÀNG</div>
          </div>
        </div>

        {/* THÂN CÂY CHÍNH (3D Volume) */}
        <div className="absolute w-12 h-[150px] bottom-0 origin-bottom bg-gradient-to-b from-[#3d2b1f] to-[#1a110a] rounded-full blur-[0.5px]" style={{ transform: 'translateY(-20px)' }} />

        {/* CÁC MẶT PHẲNG CÀNH NHÁNH (L-SYSTEM GENERATED) */}
        {treeStructure.map((plane, pIdx) => (
          <div 
            key={pIdx}
            className="absolute inset-0 pointer-events-none"
            style={{ 
              transform: `rotateY(${plane.planeRotation}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg width="600" height="600" viewBox="-300 -600 600 600" className="overflow-visible">
              <defs>
                <linearGradient id="branchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#5c4033" />
                  <stop offset="100%" stopColor="#2d1e15" />
                </linearGradient>
              </defs>
              
              {/* Vẽ cành */}
              {plane.branchPaths.map((path, bIdx) => (
                <line
                  key={`branch-${bIdx}`}
                  x1={path.x1} y1={path.y1}
                  x2={path.x2} y2={path.y2}
                  stroke="url(#branchGrad)"
                  strokeWidth={path.thickness}
                  strokeLinecap="round"
                />
              ))}

              {/* Vẽ cụm hoa */}
              {plane.flowerClusters.map((flower, fIdx) => (
                <circle
                  key={`flower-${fIdx}`}
                  cx={flower.x} cy={flower.y}
                  r={flower.size / 2}
                  fill={flower.color}
                  className="animate-pulse"
                  style={{ opacity: 0.8 }}
                />
              ))}
            </svg>
          </div>
        ))}

        {/* LỜI CHÚC TREO (BÙA LỘC) */}
        {branches.map((branch, index) => {
          const angle = (index * (360 / Math.max(branches.length, 1)));
          const radius = 220 + (index % 2 * 40);
          const yPos = -150 - (index * 80) % 350;

          return (
            <div
              key={branch.id}
              className="absolute pointer-events-auto"
              style={{
                top: `${yPos}px`,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div 
                className="group cursor-pointer flex flex-col items-center animate-bounce-slow"
                style={{ 
                  transform: `rotateY(${-rotation - angle}deg)`,
                  animationDelay: `${index * 0.5}s`
                }}
                onClick={(e) => {
                   e.stopPropagation();
                   onBranchClick(branch);
                }}
              >
                {/* Dây treo vàng */}
                <div className="w-[1px] h-20 bg-yellow-400 shadow-sm mb-[-2px]" />
                
                {/* Thẻ bài lời chúc */}
                <div className="relative w-20 h-28 bg-red-600 rounded-lg border-2 border-yellow-400 shadow-2xl flex flex-col items-center p-1.5 transition-all duration-300 group-hover:scale-110">
                  <div className="w-full h-16 bg-white rounded overflow-hidden mb-1">
                    <img src={branch.imageUrl} alt="wish" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px] text-yellow-300 font-tet text-center leading-tight">
                    {branch.author}
                  </div>
                  <div className="absolute bottom-1 w-8 h-1 bg-yellow-400 rounded-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PeachTree;
