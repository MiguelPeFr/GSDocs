import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Play, Pause, ChevronRight, Box, EyeOff, Grid, Palette } from 'lucide-react';

interface PipelineDemoProps {
  lang: Language;
}

export const PipelineDemo: React.FC<PipelineDemoProps> = ({ lang }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 4000); // 4 seconds per step
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const t = {
    es: {
      steps: [
        { title: "1. Proyección", desc: "Se transforman las Gaussias del espacio 3D al plano de imagen 2D usando la matriz de vista.", icon: Box },
        { title: "2. Culling", desc: "Se descartan las Gaussias que están fuera del campo de visión (Frustum) para ahorrar recursos.", icon: EyeOff },
        { title: "3. Tiling & Sort", desc: "La pantalla se divide en tiles de 16x16. Las Gaussias se ordenan por profundidad (Radix Sort).", icon: Grid },
        { title: "4. Rasterización", desc: "Cada tile procesa sus listas de Gaussias. Se acumula color y opacidad (Alpha Blending) pixel por pixel.", icon: Palette },
      ],
      play: "Reproducir",
      pause: "Pausar"
    },
    en: {
      steps: [
        { title: "1. Projection", desc: "Gaussians are transformed from 3D space to the 2D image plane using the view matrix.", icon: Box },
        { title: "2. Culling", desc: "Gaussians outside the camera view frustum are discarded to save performance.", icon: EyeOff },
        { title: "3. Tiling & Sort", desc: "Screen is divided into 16x16 tiles. Gaussians are sorted by depth (Radix Sort).", icon: Grid },
        { title: "4. Rasterization", desc: "Each tile processes its Gaussian lists. Color and opacity are accumulated (Alpha Blending) per pixel.", icon: Palette },
      ],
      play: "Play",
      pause: "Pause"
    }
  };

  const content = t[lang];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-8 shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8 relative z-10 px-2 md:px-8">
            {content.steps.map((step, idx) => (
                <button 
                    key={idx}
                    onClick={() => { setActiveStep(idx); setIsPlaying(false); }}
                    className={`flex flex-col items-center gap-2 group transition-all duration-300 relative z-10 ${idx === activeStep ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                        idx === activeStep ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 
                        idx < activeStep ? 'bg-slate-800 border-indigo-900 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-600'
                    }`}>
                        <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <span className={`text-[9px] md:text-[10px] uppercase font-bold tracking-wider hidden md:block ${idx === activeStep ? 'text-indigo-400' : 'text-slate-500'}`}>
                        Paso {idx + 1}
                    </span>
                </button>
            ))}
            {/* Connecting Line */}
            <div className="absolute top-5 md:top-6 left-4 md:left-10 right-4 md:right-10 h-1 bg-slate-800 -z-0 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-600 transition-all duration-500 ease-in-out"
                    style={{ width: `${(activeStep / 3) * 100}%` }}
                ></div>
            </div>
        </div>

        {/* Visual Stage */}
        <div className="bg-slate-950/50 rounded-lg border border-slate-800 h-64 relative mb-6 overflow-hidden flex items-center justify-center">
            
            {/* Step 1: Projection Viz */}
            {activeStep === 0 && (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    {/* 3D Space */}
                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                        <div className="w-16 h-16 border-2 border-slate-600 rounded-full animate-pulse flex items-center justify-center text-slate-500 text-xs font-bold bg-slate-900">3D</div>
                        <span className="text-[10px] text-slate-600 mt-2">World Space</span>
                    </div>
                     {/* Arrow */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600">
                        <ChevronRight className="w-10 h-10 animate-[moveRight_1.5s_infinite]" />
                    </div>
                     {/* 2D Plane */}
                    <div className="absolute right-[20%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                         <div className="w-14 h-20 bg-indigo-500/10 border border-indigo-500/50 rounded flex items-center justify-center text-indigo-400 text-xs font-bold shadow-[0_0_30px_rgba(99,102,241,0.1)] backdrop-blur-sm transform rotate-y-12">
                            2D
                         </div>
                         <span className="text-[10px] text-indigo-500/50 mt-2">Screen Space</span>
                    </div>
                    {/* Projected Dot Animation */}
                    <div className="absolute w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8] animate-[project_2s_infinite]"></div>
                    <style>{`
                        @keyframes project {
                            0% { left: 25%; top: 50%; opacity: 0; transform: scale(2) translateY(-50%); }
                            10% { opacity: 1; }
                            90% { left: 75%; top: 50%; opacity: 1; transform: scale(1) translateY(-50%); }
                            100% { left: 75%; top: 50%; opacity: 0; transform: translateY(-50%); }
                        }
                        @keyframes moveRight {
                            0% { transform: translate(-50%, -50%) translateX(-5px); opacity: 0.5; }
                            50% { transform: translate(-50%, -50%) translateX(5px); opacity: 1; }
                            100% { transform: translate(-50%, -50%) translateX(-5px); opacity: 0.5; }
                        }
                    `}</style>
                </div>
            )}

            {/* Step 2: Culling Viz */}
            {activeStep === 1 && (
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Frustum Shape */}
                    <svg width="300" height="200" viewBox="0 0 300 200" className="opacity-80">
                        <defs>
                            <linearGradient id="frustumGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <path d="M 40 100 L 260 20 L 260 180 Z" fill="url(#frustumGrad)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="40" cy="100" r="6" fill="#60a5fa" /> {/* Camera */}
                        <text x="35" y="125" fontSize="10" fill="#60a5fa" opacity="0.7">Camera</text>
                    </svg>
                    
                    {/* Points Inside (Kept) */}
                    <div className="absolute left-[60%] top-[40%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-bounce"></div>
                    <div className="absolute left-[70%] top-[60%] w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="absolute left-[50%] top-[50%] w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#10b981] animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    
                    {/* Points Outside (Discarded) */}
                    <div className="absolute left-[60%] top-[10%] flex flex-col items-center animate-pulse opacity-50">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-[10px] text-red-500 font-bold mt-1">CULL</span>
                    </div>
                    
                    <div className="absolute left-[55%] top-[85%] flex flex-col items-center animate-pulse opacity-50" style={{animationDelay: '0.5s'}}>
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-[10px] text-red-500 font-bold mt-1">CULL</span>
                    </div>
                </div>
            )}

            {/* Step 3: Tiling & Sort Viz */}
            {activeStep === 2 && (
                <div className="relative w-full h-full flex items-center justify-center p-8">
                     <div className="w-48 h-48 bg-slate-900 border border-slate-700 grid grid-cols-4 grid-rows-4 gap-[1px] relative shadow-2xl">
                        {/* Grid Lines */}
                        {[...Array(16)].map((_, i) => (
                             <div key={i} className="bg-slate-800/30 flex items-center justify-center text-[8px] text-slate-700 font-mono">
                                {i}
                             </div>
                        ))}
                        
                        {/* Sorting Animation Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 bg-black/60 backdrop-blur-[1px]">
                             <div className="flex items-end gap-2 h-24 pb-2 border-b border-indigo-500/30">
                                 {/* Animated Bars simulating sorting */}
                                 <div className="w-4 bg-indigo-500 rounded-t shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[sortHeight1_3s_infinite]" style={{height: '40%'}}></div>
                                 <div className="w-4 bg-indigo-400 rounded-t shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[sortHeight2_3s_infinite]" style={{height: '80%'}}></div>
                                 <div className="w-4 bg-indigo-600 rounded-t shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[sortHeight3_3s_infinite]" style={{height: '20%'}}></div>
                                 <div className="w-4 bg-indigo-300 rounded-t shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-[sortHeight4_3s_infinite]" style={{height: '60%'}}></div>
                             </div>
                             <div className="bg-indigo-900/50 px-3 py-1 rounded border border-indigo-500/30">
                                <span className="text-xs text-indigo-200 font-mono font-bold">Radix Sort (Depth)</span>
                             </div>
                        </div>
                        <style>{`
                            @keyframes sortHeight1 { 0% { height: 40%; order: 2; } 40% { height: 20%; order: 1; } 100% { height: 20%; order: 1; } }
                            @keyframes sortHeight2 { 0% { height: 80%; order: 4; } 40% { height: 80%; order: 4; } 100% { height: 80%; order: 4; } } 
                            @keyframes sortHeight3 { 0% { height: 20%; order: 1; } 40% { height: 40%; order: 2; } 100% { height: 40%; order: 2; } } 
                            @keyframes sortHeight4 { 0% { height: 60%; order: 3; } 40% { height: 60%; order: 3; } 100% { height: 60%; order: 3; } } 
                        `}</style>
                     </div>
                </div>
            )}

             {/* Step 4: Rasterization Viz */}
             {activeStep === 3 && (
                <div className="relative w-full h-full flex items-center justify-center">
                     <div className="w-40 h-40 bg-slate-900 rounded border border-slate-700 overflow-hidden relative shadow-2xl">
                         <div className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">Tile 16x16</div>
                         {/* Pixels filling */}
                         <div className="absolute inset-0 flex flex-wrap content-start pt-6 pl-1">
                             {[...Array(100)].map((_, i) => (
                                 <div 
                                    key={i} 
                                    className="w-4 h-4 m-[1px] bg-indigo-500 rounded-[1px]"
                                    style={{ 
                                        opacity: 0,
                                        animation: `pixelFade 2s infinite ${Math.random() * 0.5}s`
                                    }}
                                 ></div>
                             ))}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                             <div className="bg-black/60 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
                                <span className="text-xs font-bold text-white tracking-widest uppercase">Blending</span>
                             </div>
                         </div>
                     </div>
                     <style>{`
                        @keyframes pixelFade {
                            0% { opacity: 0; transform: scale(0.8); }
                            20% { opacity: 0.8; transform: scale(1); }
                            80% { opacity: 0.8; transform: scale(1); }
                            100% { opacity: 0; transform: scale(0.8); }
                        }
                     `}</style>
                </div>
            )}
        </div>

        {/* Text Description */}
        <div className="text-center min-h-[5rem] px-4 flex flex-col items-center justify-center">
            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                {content.steps[activeStep].title}
            </h4>
            <p className="text-sm text-slate-300 max-w-lg leading-relaxed animate-[fadeIn_0.5s_ease-out]">
                {content.steps[activeStep].desc}
            </p>
        </div>

        {/* Controls */}
        <div className="absolute top-6 right-6 z-20">
            <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-lg flex items-center justify-center"
                title={isPlaying ? content.pause : content.play}
            >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
        </div>
    </div>
  );
};