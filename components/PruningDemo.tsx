import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Scissors, RefreshCw, Eraser, AlertTriangle } from 'lucide-react';

interface PruningDemoProps {
  lang: Language;
}

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  status: 'normal' | 'pruned' | 'reset';
}

export const PruningDemo: React.FC<PruningDemoProps> = ({ lang }) => {
  const [dots, setDots] = useState<Dot[]>([]);
  const [nextId, setNextId] = useState(0);

  const t = {
    es: {
      title: "Simulador de Poda (Pruning)",
      opacitySection: "Poda por Opacidad",
      sizeSection: "Poda por Tamaño",
      btnSpawn: "Generar Gaussias",
      btnPruneOpacity: "Podar Invisibles (< 0.1)",
      btnResetOpacity: "Opacity Reset (Global)",
      btnPruneSize: "Podar Gigantes (> 40px)",
      infoReset: "El 'Reset' baja la opacidad de todas las gaussias periódicamente para obligarlas a re-aprender o ser eliminadas si no son necesarias.",
      infoSize: "Las gaussias demasiado grandes (rojas) suelen ser artefactos de 'over-reconstruction' y se eliminan.",
      legendNormal: "Normal",
      legendLow: "Baja Opacidad",
      legendBig: "Excesiva"
    },
    en: {
      title: "Pruning Simulator",
      opacitySection: "Opacity Pruning",
      sizeSection: "Size Pruning",
      btnSpawn: "Spawn Gaussians",
      btnPruneOpacity: "Prune Invisible (< 0.1)",
      btnResetOpacity: "Opacity Reset (Global)",
      btnPruneSize: "Prune Giant (> 40px)",
      infoReset: "'Reset' lowers the opacity of all Gaussians periodically to force them to re-learn or be deleted if unnecessary.",
      infoSize: "Gaussians that are too large (red) are often 'over-reconstruction' artifacts and are removed.",
      legendNormal: "Normal",
      legendLow: "Low Opacity",
      legendBig: "Excessive"
    }
  };

  const text = t[lang];

  // Initialize random dots
  const spawnDots = () => {
    const newDots: Dot[] = [];
    for (let i = 0; i < 15; i++) {
      const isBig = Math.random() > 0.8;
      const isFaint = Math.random() > 0.6;
      
      newDots.push({
        id: Date.now() + i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 80 + 10,
        size: isBig ? 50 + Math.random() * 20 : 15 + Math.random() * 10,
        opacity: isFaint ? 0.05 : 0.6 + Math.random() * 0.4,
        color: isBig ? '#f43f5e' : (isFaint ? '#94a3b8' : '#10b981'),
        status: 'normal'
      });
    }
    setDots(newDots);
  };

  useEffect(() => {
    spawnDots();
  }, []);

  const pruneOpacity = () => {
    setDots(prev => prev.map(d => 
      d.opacity < 0.1 ? { ...d, status: 'pruned' } : d
    ));
    setTimeout(() => {
      setDots(prev => prev.filter(d => d.opacity >= 0.1));
    }, 500);
  };

  const resetOpacity = () => {
    setDots(prev => prev.map(d => ({
       ...d,
       opacity: Math.min(d.opacity, 0.3), // Clamp max opacity
       status: 'reset',
       color: d.size > 40 ? '#f43f5e' : '#3b82f6' // Change color to indicate reset state
    })));
    
    // Return to normal status visual after animation
    setTimeout(() => {
        setDots(prev => prev.map(d => ({...d, status: 'normal'})));
    }, 500);
  };

  const pruneSize = () => {
    setDots(prev => prev.map(d => 
      d.size > 40 ? { ...d, status: 'pruned' } : d
    ));
    setTimeout(() => {
      setDots(prev => prev.filter(d => d.size <= 40));
    }, 500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Scissors className="w-5 h-5 text-pink-400" /> {text.title}
      </h4>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Canvas */}
        <div className="relative w-full md:w-2/3 h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-inner">
           <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
           
           {dots.map(d => (
             <div
               key={d.id}
               className={`absolute rounded-full blur-sm transition-all duration-500 ease-in-out flex items-center justify-center
                  ${d.status === 'pruned' ? 'scale-0 opacity-0' : 'scale-100'}
                  ${d.status === 'reset' ? 'animate-pulse' : ''}
               `}
               style={{
                 left: `${d.x}%`,
                 top: `${d.y}%`,
                 width: `${d.size}px`,
                 height: `${d.size}px`,
                 backgroundColor: d.color,
                 opacity: d.opacity,
                 transform: 'translate(-50%, -50%)',
                 border: d.size > 40 ? '1px dashed white' : 'none'
               }}
             >
               {d.opacity < 0.1 && d.status !== 'pruned' && (
                 <span className="text-[8px] text-white font-bold opacity-100">Low</span>
               )}
             </div>
           ))}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-6">
          
          <button 
            onClick={spawnDots}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-xs font-bold text-slate-300 transition flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3 h-3" /> {text.btnSpawn}
          </button>

          <div className="space-y-2">
             <h5 className="text-xs font-bold text-indigo-400 uppercase tracking-wider border-b border-indigo-900/50 pb-1">{text.opacitySection}</h5>
             <button 
                onClick={pruneOpacity}
                className="w-full py-2 bg-indigo-900/40 hover:bg-indigo-900/60 border border-indigo-500/30 rounded text-xs text-indigo-200 transition flex items-center gap-2 px-3"
             >
                <Eraser className="w-3 h-3" /> {text.btnPruneOpacity}
             </button>
             <button 
                onClick={resetOpacity}
                className="w-full py-2 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-500/30 rounded text-xs text-blue-200 transition flex items-center gap-2 px-3"
             >
                <RefreshCw className="w-3 h-3" /> {text.btnResetOpacity}
             </button>
             <p className="text-[10px] text-slate-500 italic leading-tight">{text.infoReset}</p>
          </div>

          <div className="space-y-2">
             <h5 className="text-xs font-bold text-pink-400 uppercase tracking-wider border-b border-pink-900/50 pb-1">{text.sizeSection}</h5>
             <button 
                onClick={pruneSize}
                className="w-full py-2 bg-pink-900/40 hover:bg-pink-900/60 border border-pink-500/30 rounded text-xs text-pink-200 transition flex items-center gap-2 px-3"
             >
                <Scissors className="w-3 h-3" /> {text.btnPruneSize}
             </button>
             <p className="text-[10px] text-slate-500 italic leading-tight">{text.infoSize}</p>
          </div>

        </div>
      </div>
      
      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center text-[10px] text-slate-400">
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div> {text.legendNormal}</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500 opacity-50"></div> {text.legendLow}</div>
         <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500 border border-dashed border-white/50"></div> {text.legendBig}</div>
      </div>

    </div>
  );
};