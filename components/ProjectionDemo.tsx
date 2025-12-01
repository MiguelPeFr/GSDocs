import React, { useState } from 'react';
import { Language } from '../types';
import { Box, Monitor, ArrowRight } from 'lucide-react';

interface ProjectionDemoProps {
  lang: Language;
}

export const ProjectionDemo: React.FC<ProjectionDemoProps> = ({ lang }) => {
  const [depth, setDepth] = useState(50); // Z distance
  const [rotation, setRotation] = useState(0); // Y Rotation

  const t = {
    es: {
      title: "Proyección 3D a 2D",
      desc: "Visualiza cómo una Gaussiana 3D (Elipsoide) se transforma en un Splat 2D (Elipse) en el plano de la imagen. La distancia afecta el tamaño y la rotación afecta la forma proyectada (covarianza).",
      worldSpace: "Espacio Mundo (3D)",
      imageSpace: "Espacio Imagen (2D)",
      controlDepth: "Distancia Cámara (Z)",
      controlRot: "Rotación Objeto",
      formula: "Σ' = J W Σ W^T J^T"
    },
    en: {
      title: "3D to 2D Projection",
      desc: "Visualize how a 3D Gaussian (Ellipsoid) transforms into a 2D Splat (Ellipse) on the image plane. Distance affects size, and rotation affects the projected shape (covariance).",
      worldSpace: "World Space (3D)",
      imageSpace: "Image Space (2D)",
      controlDepth: "Camera Distance (Z)",
      controlRot: "Object Rotation",
      formula: "Σ' = J W Σ W^T J^T"
    }
  };

  const text = t[lang];

  // Logic
  // 3D Object is an ellipsoid.
  // Rotation affects width/orientation in 3D view.
  // Depth affects scale in 2D view.
  
  // 3D Representation
  // We simulate a rotating ellipsoid by changing ellipse rx/ry based on rotation
  const rad = (rotation * Math.PI) / 180;
  const width3D = 30 + Math.abs(Math.cos(rad)) * 20; // Width changes with rotation
  
  // 2D Projection Representation
  // Perspective projection: scale = 1 / z
  const scaleFactor = 100 / (depth + 20); // avoid div by zero
  const projectedWidth = width3D * scaleFactor;
  const projectedHeight = 40 * scaleFactor;
  // Rotation is preserved in projection (simplified)
  const projectedRotation = Math.sin(rad) * 45; 

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
        <Monitor className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        
        {/* 3D WORLD VIEW */}
        <div className="flex-1 bg-slate-950/50 rounded border border-slate-800 p-4 relative overflow-hidden">
             <div className="absolute top-2 left-2 text-xs font-bold text-slate-500 uppercase">{text.worldSpace}</div>
             <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
             
             <div className="h-40 flex items-center justify-center perspective-500">
                {/* Simulated 3D Ellipsoid */}
                <div 
                    className="relative border-2 border-amber-500/50 bg-amber-500/20 rounded-full transition-all duration-100 flex items-center justify-center"
                    style={{
                        width: '80px',
                        height: '50px',
                        transform: `rotateY(${rotation}deg) scale(${1 - depth/200})`, // Show it getting smaller/further visually
                    }}
                >
                    {/* Axes */}
                    <div className="w-full h-[1px] bg-amber-300/50 absolute"></div>
                    <div className="h-full w-[1px] bg-amber-300/50 absolute"></div>
                    <span className="text-[10px] text-amber-300 font-mono bg-black/50 px-1 mt-12">Σ (3D)</span>
                </div>
             </div>
        </div>

        {/* MATH TRANSFORMATION */}
        <div className="flex flex-col items-center justify-center text-slate-500">
            <ArrowRight className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-mono border border-slate-700 px-1 rounded bg-slate-800 text-slate-300">{text.formula}</span>
        </div>

        {/* 2D IMAGE VIEW */}
        <div className="flex-1 bg-slate-950 rounded border border-slate-800 p-4 relative flex flex-col items-center justify-center">
             <div className="absolute top-2 left-2 text-xs font-bold text-slate-500 uppercase">{text.imageSpace}</div>
             
             {/* Screen Frame */}
             <div className="w-full h-40 border border-slate-700 bg-black/20 relative flex items-center justify-center overflow-hidden">
                 {/* The Splat */}
                 <div 
                    className="rounded-full blur-sm transition-all duration-75"
                    style={{
                        width: `${projectedWidth}px`,
                        height: `${projectedHeight}px`,
                        backgroundColor: '#fbbf24', // Amber
                        transform: `rotate(${projectedRotation}deg)`,
                        opacity: 0.9
                    }}
                 ></div>
                 <div className="absolute bottom-2 right-2 text-[10px] text-amber-500 font-mono">Σ' (2D)</div>
             </div>
        </div>

      </div>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">{text.controlDepth}</label>
            <input 
                type="range" min="10" max="150" 
                value={depth} 
                onChange={(e) => setDepth(parseInt(e.target.value))}
                className="w-full accent-blue-500 h-1 bg-slate-700 rounded cursor-pointer"
            />
        </div>
        <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">{text.controlRot}</label>
            <input 
                type="range" min="0" max="180" 
                value={rotation} 
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-slate-700 rounded cursor-pointer"
            />
        </div>
      </div>

    </div>
  );
};