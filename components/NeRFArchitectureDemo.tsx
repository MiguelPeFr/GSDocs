import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Network, ArrowRight, Eye, Box } from 'lucide-react';

interface NeRFArchitectureDemoProps {
  lang: Language;
}

export const NeRFArchitectureDemo: React.FC<NeRFArchitectureDemoProps> = ({ lang }) => {
  const [spatial, setSpatial] = useState(50); // Represents x,y,z variation
  const [viewDir, setViewDir] = useState(0);  // Represents theta, phi variation
  
  // Computed dummy outputs based on inputs for visualization
  const density = (Math.sin(spatial / 10) + 1) / 2; // 0 to 1
  const r = (Math.cos(viewDir / 20) + 1) * 120;
  const g = (Math.sin(spatial / 20) + 1) * 100;
  const b = (Math.sin(viewDir / 15) + 1) * 120;

  const t = {
    es: {
      title: "Arquitectura NeRF: La Función 5D",
      desc: "NeRF es una función matemática F(x,y,z, θ,ϕ) → (RGB, σ). Mueve los controles para ver cómo la Posición y la Dirección de Vista alimentan a la Red Neuronal para producir Color y Densidad.",
      inputTitle: "Input 5D",
      mlpTitle: "Caja Negra (MLP)",
      outputTitle: "Output",
      spatialLabel: "Posición Espacial (x,y,z)",
      viewLabel: "Dirección de Vista (θ,ϕ)",
      color: "Color (c)",
      density: "Densidad (σ)",
      depSpatial: "Depende de Posición",
      depView: "Depende de Vista"
    },
    en: {
      title: "NeRF Architecture: The 5D Function",
      desc: "NeRF is a mathematical function F(x,y,z, θ,ϕ) → (RGB, σ). Adjust controls to see how Position and View Direction feed the Neural Network to produce Color and Density.",
      inputTitle: "5D Input",
      mlpTitle: "Black Box (MLP)",
      outputTitle: "Output",
      spatialLabel: "Spatial Position (x,y,z)",
      viewLabel: "View Direction (θ,ϕ)",
      color: "Color (c)",
      density: "Density (σ)",
      depSpatial: "Pos Dependent",
      depView: "View Dependent"
    }
  };

  const text = t[lang];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-8 shadow-xl">
      <div className="mb-6 border-b border-slate-800 pb-4">
        <h4 className="text-lg font-bold text-blue-400 flex items-center gap-2">
          <Network className="w-5 h-5" />
          {text.title}
        </h4>
        <p className="text-sm text-slate-400 mt-2">{text.desc}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between">
        
        {/* INPUT COLUMN */}
        <div className="flex-1 bg-slate-950/50 p-4 rounded border border-slate-800 flex flex-col justify-center gap-6">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-800 pb-2">{text.inputTitle}</h5>
          
          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
              <Box className="w-4 h-4" /> {text.spatialLabel}
            </label>
            <input 
              type="range" min="0" max="100" value={spatial} onChange={(e) => setSpatial(parseInt(e.target.value))}
              className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
              <span>(x, y, z)</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-bold text-pink-400 mb-2">
              <Eye className="w-4 h-4" /> {text.viewLabel}
            </label>
            <input 
              type="range" min="0" max="100" value={viewDir} onChange={(e) => setViewDir(parseInt(e.target.value))}
              className="w-full accent-pink-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
              <span>(θ, ϕ)</span>
            </div>
          </div>
        </div>

        {/* ARROW 1 */}
        <div className="flex items-center justify-center text-slate-600">
           <ArrowRight className="w-6 h-6 animate-pulse" />
        </div>

        {/* MLP COLUMN */}
        <div className="flex-1 bg-blue-900/10 p-4 rounded border border-blue-900/30 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider text-center mb-4 z-10">{text.mlpTitle}</h5>
          
          {/* Neural Net Viz */}
          <div className="flex gap-4 z-10">
            {[1,2,3].map(layer => (
               <div key={layer} className="flex flex-col gap-2">
                 {[1,2,3,4].map(node => (
                    <div 
                      key={node} 
                      className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-300"
                      style={{ opacity: 0.3 + Math.random() * 0.7 }} // flicker effect
                    ></div>
                 ))}
               </div>
            ))}
          </div>
          <div className="mt-4 text-[10px] text-blue-300/50 font-mono text-center">
            Fully Connected<br/>Layers + ReLU
          </div>
        </div>

        {/* ARROW 2 */}
        <div className="flex items-center justify-center text-slate-600">
           <ArrowRight className="w-6 h-6 animate-pulse" />
        </div>

        {/* OUTPUT COLUMN */}
        <div className="flex-1 bg-slate-950/50 p-4 rounded border border-slate-800 flex flex-col justify-center gap-6">
          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center border-b border-slate-800 pb-2">{text.outputTitle}</h5>
          
          {/* Color Output */}
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">{text.color}</span>
                <span className="text-[10px] text-pink-400 border border-pink-900/50 px-1 rounded bg-pink-900/10">{text.depView}</span>
            </div>
            <div 
                className="h-8 w-full rounded shadow-inner transition-colors duration-100"
                style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
            ></div>
            <div className="mt-1 font-mono text-[10px] text-slate-500 text-center">rgb({r.toFixed(0)}, {g.toFixed(0)}, {b.toFixed(0)})</div>
          </div>

          {/* Density Output */}
          <div className="bg-slate-900 p-3 rounded border border-slate-800">
             <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">{text.density}</span>
                <span className="text-[10px] text-emerald-400 border border-emerald-900/50 px-1 rounded bg-emerald-900/10">{text.depSpatial}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${density * 100}%`, opacity: density }}
                ></div>
            </div>
            <div className="mt-1 font-mono text-[10px] text-slate-500 text-right">σ = {density.toFixed(2)}</div>
          </div>

        </div>

      </div>
    </div>
  );
};