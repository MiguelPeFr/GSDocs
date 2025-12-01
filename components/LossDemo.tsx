
import React, { useState } from 'react';
import { Language } from '../types';
import { Scale, AlertTriangle, Image as ImageIcon } from 'lucide-react';

interface LossDemoProps {
  lang: Language;
}

export const LossDemo: React.FC<LossDemoProps> = ({ lang }) => {
  const [errorLevel, setErrorLevel] = useState(50); // 0 (Perfect) to 100 (Bad)

  const t = {
    es: {
      title: "Función de Pérdida Compuesta",
      desc: "Equilibrio entre precisión de color (L1) y estructura (D-SSIM). Desliza para ver cómo el error visual afecta los valores de la pérdida.",
      render: "Imagen Renderizada",
      truth: "Ground Truth",
      l1Title: "L1 (Color)",
      ssimTitle: "D-SSIM (Estructura)",
      totalLoss: "Pérdida Total",
      formula: "L = 0.8 * L1 + 0.2 * D-SSIM"
    },
    en: {
      title: "Composite Loss Function",
      desc: "Balancing color accuracy (L1) and structure (D-SSIM). Slide to see how visual error affects loss values.",
      render: "Rendered Image",
      truth: "Ground Truth",
      l1Title: "L1 (Color)",
      ssimTitle: "D-SSIM (Structure)",
      totalLoss: "Total Loss",
      formula: "L = 0.8 * L1 + 0.2 * D-SSIM"
    }
  };

  const text = t[lang];

  // Calculate fake loss metrics based on slider
  const l1Value = (errorLevel / 100).toFixed(3);
  const ssimValue = (errorLevel / 100 * 0.5).toFixed(3); // SSIM usually varies less
  const totalLoss = (0.8 * parseFloat(l1Value) + 0.2 * parseFloat(ssimValue)).toFixed(3);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-indigo-400 mb-2 flex items-center gap-2">
        <Scale className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Visual Comparison */}
        <div className="flex-1 flex gap-4 justify-center">
            
            {/* Rendered (Error Prone) */}
            <div className="flex flex-col items-center gap-2">
                <div 
                    className="w-32 h-32 rounded border border-slate-600 overflow-hidden relative"
                    style={{
                        backgroundColor: '#4338ca', // Indigo base
                        filter: `blur(${errorLevel * 0.1}px) brightness(${100 + (errorLevel - 50)}%)` // Simulate error
                    }}
                >
                    {/* Pattern inside */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-overlay"></div>
                    
                    {/* Noise overlay */}
                    <div 
                        className="absolute inset-0 bg-repeat opacity-50"
                        style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
                            opacity: errorLevel * 0.005 
                        }}
                    ></div>
                </div>
                <span className="text-xs font-bold text-indigo-400">{text.render}</span>
            </div>

            {/* Ground Truth */}
            <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 rounded border border-emerald-500/50 overflow-hidden relative bg-indigo-700 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                     {/* Clean Pattern */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-overlay"></div>
                </div>
                <span className="text-xs font-bold text-emerald-400">{text.truth}</span>
            </div>

        </div>

        {/* Math & Controls */}
        <div className="flex-1 flex flex-col justify-center gap-6">
            
            {/* Slider */}
            <div>
                 <label className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>Error / Diferencia</span>
                    <span className="text-red-400">{errorLevel}%</span>
                </label>
                <input 
                    type="range" min="0" max="100" 
                    value={errorLevel} 
                    onChange={(e) => setErrorLevel(parseInt(e.target.value))}
                    className="w-full accent-red-500 h-1 bg-slate-700 rounded cursor-pointer"
                />
            </div>

            {/* Formula Block */}
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-500 font-mono mb-2 border-b border-slate-700 pb-1">{text.formula}</div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <span className="block text-[10px] text-slate-400">{text.l1Title}</span>
                        <span className="text-xl font-mono text-white">{l1Value}</span>
                    </div>
                    <div>
                         <span className="block text-[10px] text-slate-400">{text.ssimTitle}</span>
                         <span className="text-xl font-mono text-white">{ssimValue}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                    <span className="text-xs font-bold text-indigo-300">{text.totalLoss}</span>
                    <span className={`text-2xl font-bold font-mono ${parseFloat(totalLoss) < 0.1 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {totalLoss}
                    </span>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};
