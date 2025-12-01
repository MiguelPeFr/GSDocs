import React, { useState } from 'react';
import { Language } from '../types';
import { Camera, Cuboid as Cube } from 'lucide-react';

interface SfMDemoProps {
  lang: Language;
}

export const SfMDemo: React.FC<SfMDemoProps> = ({ lang }) => {
  const [step, setStep] = useState(0);

  const t = {
    es: {
      title: "Pipeline Structure from Motion (SfM)",
      desc: "COLMAP analiza las imágenes para encontrar puntos en común y reconstruir la geometría.",
      step0: "1. Captura",
      step0Desc: "Múltiples fotos alrededor del objeto.",
      step1: "2. Features",
      step1Desc: "Detección y matching de puntos clave.",
      step2: "3. Triangulación",
      step2Desc: "Cálculo de profundidad y Nube de Puntos.",
      obj: "Objeto Real",
      pc: "Nube de Puntos (Sparse)"
    },
    en: {
      title: "Structure from Motion (SfM) Pipeline",
      desc: "COLMAP analyzes images to find common points and reconstruct geometry.",
      step0: "1. Capture",
      step0Desc: "Multiple photos around the object.",
      step1: "2. Features",
      step1Desc: "Keypoint detection and matching.",
      step2: "3. Triangulation",
      step2Desc: "Depth calculation and Point Cloud.",
      obj: "Real Object",
      pc: "Point Cloud (Sparse)"
    }
  };

  const text = t[lang];

  // Visual constants
  const cameras = [
    { x: 50, y: 10, angle: 90 },
    { x: 90, y: 50, angle: 180 },
    { x: 50, y: 90, angle: 270 },
    { x: 10, y: 50, angle: 0 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      <h4 className="text-lg font-bold text-indigo-400 mb-2 flex items-center gap-2">
        <Camera className="w-5 h-5" /> {text.title}
      </h4>
      <p className="text-sm text-slate-400 mb-6">{text.desc}</p>

      {/* Main Stage */}
      <div className="relative h-64 bg-slate-950/50 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        
        {/* Cameras Ring */}
        {cameras.map((cam, i) => (
            <div 
                key={i}
                className="absolute transition-all duration-500"
                style={{ 
                    left: `${cam.x}%`, 
                    top: `${cam.y}%`, 
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div 
                    className={`p-2 rounded-lg border transition-all duration-300 ${step >= 0 ? 'bg-slate-800 border-indigo-500 text-indigo-400' : 'opacity-0'}`}
                    style={{ transform: `rotate(${cam.angle}deg)` }}
                >
                    <Camera className="w-5 h-5" />
                </div>
                {/* Ray to center */}
                {step === 1 && (
                     <div 
                        className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-indigo-500/50 origin-left animate-pulse"
                        style={{ 
                            transform: `rotate(${cam.angle}deg)`,
                            zIndex: 0
                        }}
                     ></div>
                )}
            </div>
        ))}

        {/* Center Object / Point Cloud */}
        <div className="relative z-10 w-24 h-24 flex items-center justify-center">
            {step < 2 ? (
                // Solid Object
                <div className={`transition-opacity duration-500 ${step === 2 ? 'opacity-0' : 'opacity-100'}`}>
                    <Cube className="w-16 h-16 text-amber-500" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-500 whitespace-nowrap">{text.obj}</span>
                </div>
            ) : (
                // Point Cloud
                <div className="relative w-full h-full animate-[spin_10s_linear_infinite]">
                    {[...Array(20)].map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_5px_#34d399]"
                            style={{
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                animation: `pulse ${1 + Math.random()}s infinite`
                            }}
                        ></div>
                    ))}
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-ping"></div>
                </div>
            )}
            
            {step === 2 && (
                 <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-emerald-400 whitespace-nowrap font-bold">{text.pc}</span>
            )}
        </div>

      </div>

      {/* Stepper Controls */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {[0, 1, 2].map((s) => (
            <button
                key={s}
                onClick={() => setStep(s)}
                className={`flex flex-col items-center p-2 rounded transition-all ${
                    step === s 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
            >
                <span className="text-xs font-bold mb-1">
                    {s === 0 ? text.step0 : s === 1 ? text.step1 : text.step2}
                </span>
                <span className="text-[9px] opacity-70 hidden md:block">{
                    s === 0 ? text.step0Desc : s === 1 ? text.step1Desc : text.step2Desc
                }</span>
            </button>
        ))}
      </div>

    </div>
  );
};