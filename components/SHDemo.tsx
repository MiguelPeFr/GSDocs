import React, { useState } from 'react';
import { Language } from '../types';
import { Eye, Database, Layers } from 'lucide-react';

interface SHDemoProps {
  lang: Language;
}

export const SHDemo: React.FC<SHDemoProps> = ({ lang }) => {
  const [viewAngle, setViewAngle] = useState(0); // -90 to 90 degrees
  const [shDegree, setShDegree] = useState(3); // 0 (Diffuse) to 3 (High Specular)

  const t = {
    es: {
      title: "Visualizador de Armónicos Esféricos (SH)",
      desc: "Los SH permiten que el color cambie según el ángulo de visión. Grados más altos (High Degree) permiten brillos (specular highlights) más nítidos pero consumen mucha más memoria.",
      controlView: "Ángulo de Visión",
      controlDegree: "Grado SH (Complejidad)",
      memoryUsage: "Uso de Memoria (VRAM)",
      low: "Bajo (Color plano)",
      high: "Alto (Reflejos complejos)",
      shLabel: "Coeficientes SH",
      sgLabel: "Alternativa: Spherical Gaussians (Más eficiente)",
      degree0: "Grado 0 (Difuso)",
      degree3: "Grado 3 (Especular)"
    },
    en: {
      title: "Spherical Harmonics (SH) Visualizer",
      desc: "SH allow color to change based on viewing angle. Higher degrees allow for sharper specular highlights but consume significantly more memory.",
      controlView: "View Angle",
      controlDegree: "SH Degree (Complexity)",
      memoryUsage: "Memory Usage (VRAM)",
      low: "Low (Flat color)",
      high: "High (Complex reflections)",
      shLabel: "SH Coefficients",
      sgLabel: "Alternative: Spherical Gaussians (More efficient)",
      degree0: "Degree 0 (Diffuse)",
      degree3: "Degree 3 (Specular)"
    }
  };

  const text = t[lang];

  // Simulation logic
  // Calculate highlight position based on view angle
  // Map -90..90 to percentage 0..100
  const highlightPos = 50 + (viewAngle / 90) * 40; 
  
  // Calculate Glossiness based on SH Degree
  // Degree 0 = Flat (Diffuse)
  // Degree 3 = Sharp Highlight
  const showHighlight = shDegree > 0;
  const highlightIntensity = shDegree / 3; // 0 to 1
  const highlightSize = 40 - (shDegree * 10); // Higher degree = smaller, sharper highlight

  // Memory Bar Calculation (Conceptual)
  // Degree 0: 1 coeff (3 floats RGB)
  // Degree 1: 4 coeffs (12 floats)
  // Degree 2: 9 coeffs (27 floats)
  // Degree 3: 16 coeffs (48 floats)
  const coeffs = Math.pow(shDegree + 1, 2);
  const floats = coeffs * 3; 

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-indigo-400 mb-2 flex items-center gap-2">
        <Layers className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* VISUALIZATION */}
        <div className="relative w-48 h-48 flex-shrink-0">
           {/* The Sphere */}
           <svg width="100%" height="100%" viewBox="0 0 100 100">
              <defs>
                 <radialGradient id="shGrad" cx={`${highlightPos}%`} cy="40%" r={`${showHighlight ? highlightSize : 100}%`} fx={`${highlightPos}%`} fy="40%">
                    <stop offset="0%" stopColor="white" stopOpacity={showHighlight ? 0.9 : 0} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="1" />
                 </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="45" fill="url(#shGrad)" />
              
              {/* Eye Icon moving */}
              <g transform={`translate(${50 + (viewAngle/90)*60}, 50)`}>
                 <circle cx="0" cy="0" r="5" fill="white" stroke="#0f172a" />
              </g>
           </svg>
           <div className="absolute top-0 left-0 w-full text-center mt-2 pointer-events-none">
              <Eye className="w-4 h-4 text-white inline-block shadow-lg" />
           </div>
        </div>

        {/* CONTROLS & INFO */}
        <div className="flex-1 w-full space-y-6">
            
            {/* View Angle Control */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>{text.controlView}</span>
                    <span>{viewAngle}°</span>
                </label>
                <input 
                    type="range" min="-90" max="90" 
                    value={viewAngle} 
                    onChange={(e) => setViewAngle(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 h-1 bg-slate-700 rounded cursor-pointer"
                />
            </div>

            {/* SH Degree Control */}
            <div>
                <label className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                    <span>{text.controlDegree}</span>
                    <span className="text-indigo-400">{shDegree === 0 ? text.degree0 : `${text.degree3} (${shDegree})`}</span>
                </label>
                <input 
                    type="range" min="0" max="3" step="1"
                    value={shDegree} 
                    onChange={(e) => setShDegree(parseInt(e.target.value))}
                    className="w-full accent-pink-500 h-1 bg-slate-700 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>{text.low}</span>
                    <span>{text.high}</span>
                </div>
            </div>

            {/* Memory Usage Viz */}
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
                    <Database className="w-4 h-4" /> {text.memoryUsage}
                </div>
                
                <div className="space-y-3">
                    {/* SH Bar */}
                    <div>
                        <div className="flex justify-between text-[10px] text-pink-300 mb-1">
                            <span>{text.shLabel} (Degree {shDegree})</span>
                            <span>{floats} floats / splat</span>
                        </div>
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-pink-500 transition-all duration-300"
                                style={{ width: `${(floats / 48) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* SG Comparison (Static) */}
                    <div>
                        <div className="flex justify-between text-[10px] text-emerald-300 mb-1">
                            <span>{text.sgLabel}</span>
                            <span>~24 floats</span>
                        </div>
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 w-[50%]"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );
};