import React, { useState } from 'react';
import { Language } from '../types';

interface GaussianDemoProps {
  lang: Language;
}

export const GaussianDemo: React.FC<GaussianDemoProps> = ({ lang }) => {
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.8);

  // SVG Center
  const cx = 150;
  const cy = 150;

  const t = {
    es: {
      scaleX: "Escala X (Eigenvalue 1)",
      scaleY: "Escala Y (Eigenvalue 2)",
      rotation: "Rotación (Quaternion)",
      opacity: "Opacidad (Alpha)",
      info: "Covarianza (Σ): Controla la forma. En 3DGS, almacenamos escala y rotación por separado para asegurar que la matriz siempre sea válida."
    },
    en: {
      scaleX: "Scale X (Eigenvalue 1)",
      scaleY: "Scale Y (Eigenvalue 2)",
      rotation: "Rotation (Quaternion)",
      opacity: "Opacity (Alpha)",
      info: "Covariance (Σ): Controls the shape. In 3DGS, scale and rotation are stored separately to ensure the matrix is always valid."
    }
  };

  const text = t[lang];

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-slate-900 p-6 rounded-xl border border-slate-700 shadow-xl">
      {/* Visualization Area */}
      <div className="flex-1 flex items-center justify-center bg-grid-pattern relative min-h-[300px] bg-slate-950 rounded-lg overflow-hidden">
        {/* Background Grid Simulation */}
        <svg width="100%" height="300" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* The Gaussian Splat Representation */}
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Core Ellipse */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={50 * scaleX}
            ry={50 * scaleY}
            fill="url(#grad1)"
            transform={`rotate(${rotation}, ${cx}, ${cy})`}
            style={{ opacity: opacity }}
            filter="url(#blurMe)"
          />
          
          {/* Outline for clarity */}
          <ellipse
            cx={cx}
            cy={cy}
            rx={50 * scaleX}
            ry={50 * scaleY}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2"
            strokeDasharray="5,5"
            transform={`rotate(${rotation}, ${cx}, ${cy})`}
            style={{ opacity: 0.5 }}
          />

          <defs>
            <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" style={{ stopColor: '#818cf8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#312e81', stopOpacity: 0 }} />
            </radialGradient>
            <filter id="blurMe">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
          
          {/* Axis indicators */}
          <line x1={cx} y1={cy} x2={cx + 50} y2={cy} stroke="red" strokeWidth="2" opacity="0.5" />
          <line x1={cx} y1={cy} x2={cx} y2={cy - 50} stroke="green" strokeWidth="2" opacity="0.5" />
        </svg>
      </div>

      {/* Controls */}
      <div className="flex-1 space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">{text.scaleX}</label>
          <input 
            type="range" min="0.2" max="2.5" step="0.1" 
            value={scaleX} 
            onChange={(e) => setScaleX(parseFloat(e.target.value))}
            className="w-full accent-indigo-500" 
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">{text.scaleY}</label>
          <input 
            type="range" min="0.2" max="2.5" step="0.1" 
            value={scaleY} 
            onChange={(e) => setScaleY(parseFloat(e.target.value))}
            className="w-full accent-indigo-500" 
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">{text.rotation}</label>
          <input 
            type="range" min="0" max="360" step="1" 
            value={rotation} 
            onChange={(e) => setRotation(parseFloat(e.target.value))}
            className="w-full accent-emerald-500" 
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">{text.opacity}</label>
          <input 
            type="range" min="0.0" max="1" step="0.05" 
            value={opacity} 
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-full accent-pink-500" 
          />
        </div>
        
        <div className="bg-slate-800 p-4 rounded text-sm text-slate-300">
          <p><strong>{text.info.split(':')[0]}:</strong>{text.info.split(':')[1]}</p>
        </div>
      </div>
    </div>
  );
};