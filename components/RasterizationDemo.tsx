import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';

interface RasterizationDemoProps {
  lang: Language;
}

export const RasterizationDemo: React.FC<RasterizationDemoProps> = ({ lang }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = {
    es: {
      title: "¿Qué es la Rasterización?",
      desc: "La rasterización es el proceso de convertir formas geométricas continuas (matemáticas) en píxeles discretos (pantalla).",
      instruction: "Arrastra el círculo azul (la Gaussiana continua) para ver cómo 'enciende' los píxeles del grid.",
      continuous: "Geometría Continua",
      discrete: "Grid de Píxeles (Discreto)",
      pixelVal: "Valor del Píxel"
    },
    en: {
      title: "What is Rasterization?",
      desc: "Rasterization is the process of converting continuous geometric shapes (math) into discrete pixels (screen).",
      instruction: "Drag the blue circle (the continuous Gaussian) to see how it 'lights up' the grid pixels.",
      continuous: "Continuous Geometry",
      discrete: "Pixel Grid (Discrete)",
      pixelVal: "Pixel Value"
    }
  };

  const text = t[lang];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePos(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updatePos(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updatePos = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPosition({ x, y });
  };

  // Generate 10x10 Grid
  const gridSize = 10;
  const cells = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      // Calculate distance from center of pixel to center of shape
      // Grid is 0-100 coordinates. Each cell is 10x10.
      const cellCenterX = x * 10 + 5;
      const cellCenterY = y * 10 + 5;
      
      const dist = Math.sqrt(
        Math.pow(cellCenterX - position.x, 2) + 
        Math.pow(cellCenterY - position.y, 2)
      );

      // Simple radial falloff (Gaussian-ish)
      const radius = 25;
      let intensity = 0;
      if (dist < radius) {
        // Smooth falloff
        intensity = Math.pow((1 - dist / radius), 1.5); 
      }

      cells.push({ x, y, intensity });
    }
  }

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl my-6 select-none">
      <h4 className="text-lg font-bold text-indigo-400 mb-2">{text.title}</h4>
      <p className="text-sm text-slate-300 mb-4">{text.desc}</p>
      
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        
        {/* Interactive Area */}
        <div className="relative">
            <div 
                ref={containerRef}
                className="relative w-64 h-64 bg-slate-950 border-2 border-slate-800 rounded cursor-move overflow-hidden"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                {/* Pixel Grid Rendering */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 pointer-events-none">
                    {cells.map((cell, i) => (
                        <div 
                            key={i} 
                            className="border-[0.5px] border-slate-800/30 flex items-center justify-center transition-colors duration-75"
                            style={{ 
                                backgroundColor: `rgba(99, 102, 241, ${cell.intensity})` // Indigo color with calc intensity
                            }}
                        >
                           {cell.intensity > 0.3 && (
                               <span className="text-[8px] text-white/70 font-mono">{(cell.intensity).toFixed(1)}</span>
                           )}
                        </div>
                    ))}
                </div>

                {/* Continuous Shape Overlay (The "Math") */}
                <div 
                    className="absolute w-[50%] h-[50%] border-2 border-cyan-400 rounded-full pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform duration-75"
                    style={{
                        top: '0',
                        left: '0',
                        transform: `translate(${position.x * 2.56 - 64}px, ${position.y * 2.56 - 64}px)` // map 0-100 to px minus half size (64)
                    }}
                >
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-300 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">{text.instruction}</p>
        </div>

        {/* Legend / Info */}
        <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border-2 border-cyan-400"></div>
                <span className="text-cyan-400 font-bold">{text.continuous}</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-indigo-500 rounded border border-slate-700"></div>
                <span className="text-indigo-400 font-bold">{text.discrete}</span>
            </div>
            
            <div className="p-3 bg-slate-800 rounded border border-slate-700 max-w-[200px]">
                <p className="text-xs text-slate-400 leading-relaxed">
                   En 3DGS, cada elipsoide (cyan) se proyecta sobre la pantalla. El rasterizador calcula cuánto cubre cada píxel (indigo) y mezcla los colores (Alpha Blending).
                </p>
            </div>
        </div>

      </div>
    </div>
  );
};