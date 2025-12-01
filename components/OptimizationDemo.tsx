
import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Play, RotateCcw, TrendingDown, CheckCircle2 } from 'lucide-react';

interface OptimizationDemoProps {
  lang: Language;
}

export const OptimizationDemo: React.FC<OptimizationDemoProps> = ({ lang }) => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;

  const t = {
    es: {
      title: "Optimización Iterativa (Adam)",
      desc: "Simulación de cómo el descenso de gradiente ajusta los parámetros (Posición, Covarianza, Color) para coincidir con la verdad fundamental (Ground Truth).",
      groundTruth: "Ground Truth (Objetivo)",
      prediction: "Predicción (Gaussiana)",
      step0: "Inicio: Aleatorio",
      step1: "Paso 1: Ajustar Posición (μ)",
      step2: "Paso 2: Ajustar Forma (Σ)",
      step3: "Paso 3: Ajustar Color (SH)",
      step4: "Convergencia",
      loss: "Pérdida (Error)"
    },
    en: {
      title: "Iterative Optimization (Adam)",
      desc: "Simulation of how gradient descent adjusts parameters (Position, Covariance, Color) to match the Ground Truth.",
      groundTruth: "Ground Truth (Target)",
      prediction: "Prediction (Gaussian)",
      step0: "Start: Random",
      step1: "Step 1: Adjust Position (μ)",
      step2: "Step 2: Adjust Shape (Σ)",
      step3: "Step 3: Adjust Color (SH)",
      step4: "Convergence",
      loss: "Loss (Error)"
    }
  };

  const text = t[lang];

  // Animation values based on step
  const getValues = (s: number) => {
    // Target: x: 70%, y: 50%, w: 60px, h: 40px, rot: 0, color: #10b981 (Emerald)
    // Start:  x: 30%, y: 30%, w: 30px, h: 80px, rot: 45, color: #ef4444 (Red)
    
    switch (s) {
      case 0: return { x: 30, y: 30, w: 30, h: 80, rot: 45, col: '#ef4444', loss: 1.0 };
      case 1: return { x: 60, y: 45, w: 35, h: 70, rot: 30, col: '#f59e0b', loss: 0.6 }; // Pos move
      case 2: return { x: 68, y: 48, w: 55, h: 45, rot: 10, col: '#eab308', loss: 0.3 }; // Shape fix
      case 3: return { x: 70, y: 50, w: 60, h: 40, rot: 0,  col: '#34d399', loss: 0.1 }; // Color fix
      case 4: return { x: 70, y: 50, w: 60, h: 40, rot: 0,  col: '#10b981', loss: 0.0 }; // Perfect
      default: return { x: 30, y: 30, w: 30, h: 80, rot: 45, col: '#ef4444', loss: 1.0 };
    }
  };

  const current = getValues(step);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
        <TrendingDown className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Visual Stage */}
        <div className="relative w-64 h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* Ground Truth Ghost */}
            <div 
                className="absolute border-2 border-dashed border-emerald-500/30 rounded-full flex items-center justify-center"
                style={{
                    left: '70%', top: '50%', width: '60px', height: '40px', transform: 'translate(-50%, -50%)'
                }}
            >
                <span className="text-[9px] text-emerald-500/50 -mt-8 whitespace-nowrap">{text.groundTruth}</span>
            </div>

            {/* The Learning Gaussian */}
            <div 
                className="absolute rounded-full transition-all duration-700 ease-in-out blur-md opacity-80"
                style={{
                    left: `${current.x}%`, 
                    top: `${current.y}%`, 
                    width: `${current.w}px`, 
                    height: `${current.h}px`, 
                    backgroundColor: current.col,
                    transform: `translate(-50%, -50%) rotate(${current.rot}deg)`
                }}
            ></div>

            {/* Connection Line (Gradient) */}
            {step < 4 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
                    <line 
                        x1={`${current.x}%`} y1={`${current.y}%`} 
                        x2="70%" y2="50%" 
                        stroke="white" strokeWidth="2" strokeDasharray="4 4" 
                    />
                </svg>
            )}
        </div>

        {/* Controls & Metrics */}
        <div className="flex-1 w-full space-y-6">
            
            {/* Steps Indicator */}
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-300">
                        {step === 0 ? text.step0 : 
                         step === 1 ? text.step1 : 
                         step === 2 ? text.step2 : 
                         step === 3 ? text.step3 : text.step4}
                    </span>
                    {step === 4 && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(step/maxSteps)*100}%` }}></div>
                </div>
            </div>

            {/* Loss Graph Simulation */}
            <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{text.loss}</span>
                    <span className="font-mono text-emerald-400">{current.loss.toFixed(3)}</span>
                </div>
                <div className="flex items-end h-16 gap-1 border-b border-l border-slate-700 p-1">
                    {[1.0, 0.6, 0.3, 0.1, 0.0].map((val, i) => (
                        <div 
                            key={i}
                            className={`w-1/5 rounded-t transition-all duration-300 ${i <= step ? 'bg-red-500 opacity-100' : 'bg-slate-800 opacity-30'}`}
                            style={{ height: `${val * 100}%`, backgroundColor: i <= step ? (val === 0 ? '#10b981' : '#f43f5e') : '' }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                 <button 
                    onClick={() => setStep(prev => Math.min(prev + 1, maxSteps))}
                    disabled={step >= maxSteps}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2 rounded font-bold text-sm flex items-center justify-center gap-2 transition"
                 >
                    <Play className="w-4 h-4" /> Optimizar
                 </button>
                 <button 
                    onClick={() => setStep(0)}
                    className="px-4 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition"
                 >
                    <RotateCcw className="w-4 h-4" />
                 </button>
            </div>

        </div>

      </div>
    </div>
  );
};
