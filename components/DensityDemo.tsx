import React, { useState } from 'react';
import { Language } from '../types';

type Gaussian = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

interface DensityDemoProps {
  lang: Language;
}

export const DensityDemo: React.FC<DensityDemoProps> = ({ lang }) => {
  const [gaussians, setGaussians] = useState<Gaussian[]>([
    { id: 1, x: 50, y: 50, size: 20, color: '#f43f5e' }
  ]);
  const [nextId, setNextId] = useState(2);

  const t = {
    es: {
      initial: "Estado inicial: 1 Gaussiana grande con alto error.",
      reset: "Reset.",
      splitMsg: "Split: Se dividen las grandes (Over-reconstruction) en más pequeñas.",
      cloneMsg: "Clone: Se duplican en áreas 'vacías' (Under-reconstruction).",
      btnReset: "Reset",
      btnSplit: "Simular SPLIT",
      btnClone: "Simular CLONE",
      target: "Área Objetivo"
    },
    en: {
      initial: "Initial state: 1 large Gaussian with high error.",
      reset: "Reset.",
      splitMsg: "Split: Large ones (Over-reconstruction) are split into smaller ones.",
      cloneMsg: "Clone: Duplicated in 'empty' areas (Under-reconstruction).",
      btnReset: "Reset",
      btnSplit: "Simulate SPLIT",
      btnClone: "Simulate CLONE",
      target: "Target Area"
    }
  };

  const text = t[lang];
  const [message, setMessage] = useState(text.initial);

  // Sync message when language changes if it matches one of the known states
  React.useEffect(() => {
    // Simple heuristic to update message language on switch
    if (message.includes("Estado") || message.includes("Initial")) setMessage(text.initial);
    else if (message.includes("Reset")) setMessage(text.reset);
    else if (message.includes("Split")) setMessage(text.splitMsg);
    else if (message.includes("Clone")) setMessage(text.cloneMsg);
  }, [lang]);

  const reset = () => {
    setGaussians([{ id: 1, x: 50, y: 50, size: 20, color: '#f43f5e' }]);
    setNextId(2);
    setMessage(text.reset);
  };

  const split = () => {
    // Simulate splitting large gaussians into smaller ones
    const newGaussians: Gaussian[] = [];
    let idCounter = nextId;

    gaussians.forEach(g => {
      if (g.size > 10) {
        // Split into 2
        newGaussians.push({ ...g, id: idCounter++, x: g.x - 5, y: g.y - 5, size: g.size / 1.5, color: '#10b981' });
        newGaussians.push({ ...g, id: idCounter++, x: g.x + 5, y: g.y + 5, size: g.size / 1.5, color: '#10b981' });
      } else {
        newGaussians.push(g);
      }
    });

    setGaussians(newGaussians);
    setNextId(idCounter);
    setMessage(text.splitMsg);
  };

  const clone = () => {
    // Simulate cloning in high gradient areas
    const newGaussians: Gaussian[] = [...gaussians];
    let idCounter = nextId;

    gaussians.forEach(g => {
      // Clone nearby
      if (Math.random() > 0.3) { // random chance to simulate gradient threshold
         newGaussians.push({ ...g, id: idCounter++, x: g.x + (Math.random()*10 - 5), y: g.y + (Math.random()*10 - 5), color: '#3b82f6' });
      }
    });

    setGaussians(newGaussians);
    setNextId(idCounter);
    setMessage(text.cloneMsg);
  };

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button onClick={reset} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white text-sm font-medium transition">{text.btnReset}</button>
        <button onClick={split} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded text-white text-sm font-medium transition">{text.btnSplit}</button>
        <button onClick={clone} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm font-medium transition">{text.btnClone}</button>
      </div>
      
      <p className="text-sm text-indigo-300 mb-4 h-6">{message}</p>

      <div className="relative h-64 bg-slate-950 rounded border border-slate-800 overflow-hidden cursor-crosshair">
        {gaussians.map(g => (
            <div
                key={g.id}
                className="absolute rounded-full blur-sm transition-all duration-500 ease-out"
                style={{
                    left: `${g.x}%`,
                    top: `${g.y}%`,
                    width: `${g.size}px`,
                    height: `${g.size}px`,
                    backgroundColor: g.color,
                    opacity: 0.7,
                    transform: 'translate(-50%, -50%)'
                }}
            />
        ))}
        
        {/* Target overlay simulation */}
        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-dashed border-white/20 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            <span className="text-xs text-white/30">{text.target}</span>
        </div>
      </div>
    </div>
  );
};