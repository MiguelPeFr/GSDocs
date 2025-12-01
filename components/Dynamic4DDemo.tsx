
import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { Clock, Activity, Layers, Play, Pause } from 'lucide-react';

interface Dynamic4DDemoProps {
  lang: Language;
}

export const Dynamic4DDemo: React.FC<Dynamic4DDemoProps> = ({ lang }) => {
  const [time, setTime] = useState(0); // 0 to 100
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState<'deformation' | 'slicing'>('slicing');

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime(prev => (prev + 0.5) % 100);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const t = {
    es: {
      title: "Visualizando el Espacio-Tiempo (4D)",
      modeDeformation: "Método 1: Deformación (Deep Learning)",
      modeSlicing: "Método 2: Slicing 4D (Hyperspheres)",
      descDeformation: "Una red neuronal predice el desplazamiento (Δx, Δy) para cada instante t.",
      descSlicing: "El objeto existe como un 'tubo' continuo en 4D. El tiempo (t) es un plano que 'rebana' este tubo para obtener la forma 3D actual.",
      time: "Tiempo (t)",
      input: "Input",
      output: "Gaussiana (t)",
      network: "MLP / Grid",
      trajectory: "Trayectoria 4D",
      slice: "Slice Actual"
    },
    en: {
      title: "Visualizing Spacetime (4D)",
      modeDeformation: "Method 1: Deformation (Deep Learning)",
      modeSlicing: "Method 2: 4D Slicing (Hyperspheres)",
      descDeformation: "A neural network predicts the displacement (Δx, Δy) for each timestamp t.",
      descSlicing: "The object exists as a continuous 'tube' in 4D. Time (t) is a plane that 'slices' this tube to get the current 3D shape.",
      time: "Time (t)",
      input: "Input",
      output: "Gaussian (t)",
      network: "MLP / Grid",
      trajectory: "4D Trajectory",
      slice: "Current Slice"
    }
  };

  const text = t[lang];

  // Simulation Logic
  const normalizedTime = time / 100;
  // Trajectory: A sine wave
  const getPosAtTime = (t: number) => {
      const y = 50 + Math.sin(t * Math.PI * 2) * 30;
      const x = 50 + Math.cos(t * Math.PI * 2) * 20;
      return { x, y };
  };

  const currentPos = getPosAtTime(normalizedTime);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" /> {text.title}
      </h4>

      {/* Mode Switcher */}
      <div className="flex bg-slate-800 p-1 rounded-lg mb-6">
        <button 
            onClick={() => setMode('deformation')}
            className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 transition ${mode === 'deformation' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Activity className="w-4 h-4" /> {text.modeDeformation}
        </button>
        <button 
            onClick={() => setMode('slicing')}
            className={`flex-1 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 transition ${mode === 'slicing' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
        >
            <Layers className="w-4 h-4" /> {text.modeSlicing}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* VISUALIZATION STAGE */}
        <div className="relative w-full md:w-2/3 h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* === MODE: DEFORMATION === */}
            {mode === 'deformation' && (
                <>
                    {/* Diagram Flow */}
                    <div className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
                         <div className="bg-slate-800 border border-indigo-500/50 p-2 rounded text-[10px] text-indigo-300 font-mono">
                            t = {normalizedTime.toFixed(2)}
                         </div>
                         <div className="w-1 h-8 bg-indigo-500/50"></div>
                         <div className="w-16 h-12 bg-indigo-900/40 border border-indigo-500 rounded flex items-center justify-center text-[10px] text-center font-bold text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            {text.network}
                         </div>
                         <div className="w-1 h-8 bg-indigo-500/50"></div>
                         <div className="bg-slate-800 border border-indigo-500/50 p-2 rounded text-[10px] text-emerald-300 font-mono">
                            Δx, Δy
                         </div>
                    </div>

                    {/* Resulting Object */}
                    <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <div 
                            className="absolute w-12 h-12 rounded-full blur-md bg-indigo-500 transition-transform duration-75"
                            style={{
                                left: `${currentPos.x + 20}%`, // Offset to right
                                top: `${currentPos.y}%`,
                                transform: 'translate(-50%, -50%)',
                                opacity: 0.8
                            }}
                        ></div>
                        {/* Ghost trail */}
                        <div className="absolute w-12 h-12 rounded-full border border-indigo-500/20"
                             style={{ left: '70%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        </div>
                    </div>
                </>
            )}

            {/* === MODE: SLICING === */}
            {mode === 'slicing' && (
                <div className="relative w-full h-full perspective-500">
                    {/* The 4D Trajectory (Visualized as a tube/path in 2D space + Time axis) */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        {/* Draw the full path */}
                        <path 
                            d={Array.from({length: 100}).map((_, i) => {
                                const tPos = i / 100;
                                const pos = getPosAtTime(tPos);
                                // Map Time to X-axis, Y-position to Y-axis
                                const screenX = (i / 100) * 100 + '%';
                                const screenY = pos.y + '%';
                                return `${i===0?'M':'L'} ${screenX} ${screenY}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#334155"
                            strokeWidth="20"
                            strokeLinecap="round"
                            className="opacity-50"
                        />
                        <path 
                             d={Array.from({length: 100}).map((_, i) => {
                                const tPos = i / 100;
                                const pos = getPosAtTime(tPos);
                                const screenX = (i / 100) * 100 + '%';
                                const screenY = pos.y + '%';
                                return `${i===0?'M':'L'} ${screenX} ${screenY}`;
                            }).join(' ')}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            className="opacity-50"
                        />
                    </svg>

                    {/* The Slicing Plane (Current Time) */}
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-red-500/50 shadow-[0_0_15px_rgba(244,63,94,0.5)] z-10"
                        style={{ left: `${time}%` }}
                    >
                        <div className="absolute top-0 -translate-x-1/2 -mt-4 text-[10px] text-red-400 font-bold bg-slate-900 px-1 rounded">
                            t
                        </div>
                    </div>

                    {/* The Intersected Gaussian */}
                    <div 
                        className="absolute w-10 h-10 rounded-full bg-emerald-400 blur-sm z-20 shadow-[0_0_20px_#34d399] transition-all duration-75"
                        style={{
                            left: `${time}%`,
                            top: `${currentPos.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    ></div>
                    
                    <div className="absolute bottom-4 left-4 text-[10px] text-slate-500 italic max-w-xs">
                        {text.descSlicing}
                    </div>
                </div>
            )}

        </div>

        {/* CONTROLS */}
        <div className="flex-1 w-full space-y-6">
             <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                <p className="text-sm text-slate-300 mb-2 min-h-[3rem]">
                    {mode === 'deformation' ? text.descDeformation : text.descSlicing}
                </p>
             </div>

             <div>
                <label className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>{text.time}</span>
                    <span className="font-mono text-indigo-400">{time.toFixed(1)}</span>
                </label>
                <div className="flex gap-4 items-center">
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 text-white transition"
                    >
                        {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                    </button>
                    <input 
                        type="range" min="0" max="100" step="0.1"
                        value={time} 
                        onChange={(e) => { setTime(parseFloat(e.target.value)); setIsPlaying(false); }}
                        className="flex-1 accent-indigo-500 h-1 bg-slate-700 rounded cursor-pointer"
                    />
                </div>
             </div>
        </div>

      </div>
    </div>
  );
};
