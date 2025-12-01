import React, { useState } from 'react';
import { Language } from '../types';
import { Sparkles, ArrowRight, User, Ruler, Palette } from 'lucide-react';

interface InitializationDemoProps {
  lang: Language;
}

export const InitializationDemo: React.FC<InitializationDemoProps> = ({ lang }) => {
  const [step, setStep] = useState(0);

  const t = {
    es: {
      title: "Inicialización: De Punto a Gaussiana",
      desc: "Cómo un punto simple de SfM (sin volumen) se convierte en una primitiva 3D renderizable.",
      steps: ["Punto SfM", "Posición (μ)", "Covarianza (Σ)", "Color & Opacidad"],
      info: [
        "Input: Un punto 3D desnudo proveniente de COLMAP.",
        "La posición del punto se asigna como la media (centro) de la Gaussiana.",
        "El tamaño (escala) se calcula basado en la distancia a los vecinos más cercanos (KNN).",
        "El color se toma de las imágenes originales. La opacidad inicia en un valor fijo."
      ]
    },
    en: {
      title: "Initialization: From Point to Gaussian",
      desc: "How a simple SfM point (no volume) becomes a renderable 3D primitive.",
      steps: ["SfM Point", "Position (μ)", "Covariance (Σ)", "Color & Opacity"],
      info: [
        "Input: A bare 3D point from COLMAP.",
        "Point position is assigned as the mean (center) of the Gaussian.",
        "Size (scale) is calculated based on distance to nearest neighbors (KNN).",
        "Color is sampled from original images. Opacity starts at a fixed value."
      ]
    }
  };

  const text = t[lang];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
        <Sparkles className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      {/* STAGE */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        
        {/* Visualizer */}
        <div className="relative w-48 h-48 bg-slate-950 rounded border border-slate-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            
            {/* Neighbors (Visible only in step 2+) */}
            {step >= 2 && (
                <>
                    <div className="absolute top-[30%] left-[30%] w-1 h-1 bg-slate-600 rounded-full"></div>
                    <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-slate-600 rounded-full"></div>
                    <div className="absolute top-[20%] left-[70%] w-1 h-1 bg-slate-600 rounded-full"></div>
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="50%" y1="50%" x2="80%" y2="70%" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="50%" y1="50%" x2="70%" y2="20%" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
                    </svg>
                </>
            )}

            {/* The Main Point / Gaussian */}
            <div 
                className="relative transition-all duration-700 ease-out flex items-center justify-center"
                style={{
                    width: step < 2 ? '8px' : '60px',
                    height: step < 2 ? '8px' : '40px',
                    borderRadius: '50%',
                    backgroundColor: step === 3 ? '#ec4899' : '#fff', // Pink at end, white start
                    opacity: step === 3 ? 0.8 : 1,
                    boxShadow: step >= 2 ? '0 0 20px rgba(255,255,255,0.2)' : 'none',
                    transform: step >= 2 ? 'rotate(-15deg)' : 'none'
                }}
            >
                {step < 2 && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>

            {/* Labels */}
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500">
                {step === 0 && "p_i"}
                {step === 1 && "μ = p_i"}
                {step === 2 && "Σ = KNN(p_i)"}
                {step === 3 && "RGBA"}
            </div>
        </div>

        {/* Controls / Info */}
        <div className="flex-1 w-full">
            <div className="flex flex-col gap-2">
                {text.steps.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => setStep(i)}
                        className={`text-left px-4 py-3 rounded text-sm font-bold flex items-center justify-between transition-all ${
                            step === i 
                            ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/50' 
                            : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                        }`}
                    >
                        <span className="flex items-center gap-2">
                             {i === 1 && <User className="w-3 h-3" />}
                             {i === 2 && <Ruler className="w-3 h-3" />}
                             {i === 3 && <Palette className="w-3 h-3" />}
                             {s}
                        </span>
                        {step === i && <ArrowRight className="w-4 h-4 animate-pulse" />}
                    </button>
                ))}
            </div>
            
            <div className="mt-4 p-3 bg-slate-800/50 rounded border-l-2 border-emerald-500 text-xs text-slate-300 leading-relaxed">
                {text.info[step]}
            </div>
        </div>

      </div>
    </div>
  );
};