
import React, { useState } from 'react';
import { Language } from '../types';
import { Database, Microchip, Cpu, BarChart3, TrendingUp, Layers } from 'lucide-react';

interface CompressionDemoProps {
  lang: Language;
}

export const CompressionDemo: React.FC<CompressionDemoProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'vram' | 'sh_sg' | 'training'>('vram');

  const t = {
    es: {
      tabs: {
        vram: "VRAM & Cuellos de Botella",
        sh_sg: "SH vs. SG",
        training: "Optimización (BOGausS)"
      },
      vram: {
        title: "Impacto en Memoria: Almacenamiento vs. Renderizado",
        desc: "La compresión clásica reduce el archivo en disco, pero a menudo la GPU debe descomprimir todo para renderizar. Métodos optimizados (como SG o Poda) reducen la memoria real de ejecución.",
        static: "VRAM Estática (Params)",
        dynamic: "VRAM Dinámica (Raster)",
        standard: "3DGS Estándar",
        quantized: "Cuantizado (Comprimido en Disco)",
        optimized: "Optimizado (MEGS/ProtoGS)",
        note: "Nota: La cuantización ahorra disco, pero puede añadir overhead de decodificación en VRAM."
      },
      sh_sg: {
        title: "El Costo del Color: SH vs. Spherical Gaussians",
        desc: "Los Armónicos Esféricos (SH) de alto grado consumen la mayor parte de la memoria. Las Gaussias Esféricas (SG) aproximan el brillo con muchos menos parámetros.",
        shTitle: "Armónicos Esféricos (SH Order 3)",
        sgTitle: "Spherical Gaussians (SG 3 Lobes)",
        coeffs: "Coeficientes",
        floats: "Floats por Gaussiana",
        quality: "Calidad Especular"
      },
      training: {
        title: "Umbral de Gradiente Ascendente",
        desc: "Estrategia de BOGausS: Comenzar con un umbral bajo para crecer rápido, y subirlo exponencialmente para evitar el overfitting y exceso de gaussias al final.",
        yAxis: "Umbral de Gradiente (T)",
        xAxis: "Iteraciones de Entrenamiento",
        growth: "Fase de Crecimiento",
        refine: "Fase de Refinamiento",
        traditional: "Umbral Fijo (Standard)",
        exponential: "Umbral Exponencial"
      }
    },
    en: {
      tabs: {
        vram: "VRAM & Bottlenecks",
        sh_sg: "SH vs. SG",
        training: "Optimization (BOGausS)"
      },
      vram: {
        title: "Memory Impact: Storage vs. Rendering",
        desc: "Classic compression reduces disk file size, but the GPU often must decompress everything to render. Optimized methods (like SG or Pruning) reduce actual runtime memory.",
        static: "Static VRAM (Params)",
        dynamic: "Dynamic VRAM (Raster)",
        standard: "Standard 3DGS",
        quantized: "Quantized (Disk Compressed)",
        optimized: "Optimized (MEGS/ProtoGS)",
        note: "Note: Quantization saves disk space but may add decoding overhead in VRAM."
      },
      sh_sg: {
        title: "The Cost of Color: SH vs. Spherical Gaussians",
        desc: "High-degree Spherical Harmonics (SH) consume most of the memory. Spherical Gaussians (SG) approximate highlights with far fewer parameters.",
        shTitle: "Spherical Harmonics (SH Order 3)",
        sgTitle: "Spherical Gaussians (SG 3 Lobes)",
        coeffs: "Coefficients",
        floats: "Floats per Gaussian",
        quality: "Specular Quality"
      },
      training: {
        title: "Rising Gradient Threshold",
        desc: "BOGausS Strategy: Start with a low threshold for fast growth, and raise it exponentially to prevent overfitting and excess Gaussians at the end.",
        yAxis: "Gradient Threshold (T)",
        xAxis: "Training Iterations",
        growth: "Growth Phase",
        refine: "Refinement Phase",
        traditional: "Fixed Threshold (Standard)",
        exponential: "Exponential Threshold"
      }
    }
  };

  const text = t[lang];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 my-6 shadow-xl">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700 pb-4">
        <button 
            onClick={() => setActiveTab('vram')}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 transition ${activeTab === 'vram' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
            <Database className="w-4 h-4" /> {text.tabs.vram}
        </button>
        <button 
            onClick={() => setActiveTab('sh_sg')}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 transition ${activeTab === 'sh_sg' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
            <Layers className="w-4 h-4" /> {text.tabs.sh_sg}
        </button>
        <button 
            onClick={() => setActiveTab('training')}
            className={`px-4 py-2 text-xs font-bold rounded flex items-center gap-2 transition ${activeTab === 'training' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
            <TrendingUp className="w-4 h-4" /> {text.tabs.training}
        </button>
      </div>

      {/* Content VRAM */}
      {activeTab === 'vram' && (
        <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div>
                <h4 className="font-bold text-indigo-400 mb-2">{text.vram.title}</h4>
                <p className="text-sm text-slate-300">{text.vram.desc}</p>
            </div>

            <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-around items-end h-64 gap-8">
                {/* Standard */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/3 group">
                    <div className="w-full bg-slate-800/50 rounded-t-lg relative overflow-hidden flex flex-col justify-end h-48 border-b border-white/10">
                         {/* Dynamic */}
                         <div className="w-full bg-indigo-500/30 h-[30%] flex items-center justify-center text-[10px] text-indigo-200 border-t border-indigo-500/50">
                            {text.vram.dynamic}
                         </div>
                         {/* Static */}
                         <div className="w-full bg-red-500/60 h-[70%] flex items-center justify-center text-[10px] text-white font-bold relative group-hover:bg-red-500/70 transition-colors">
                            {text.vram.static}
                            <span className="absolute bottom-2 text-[9px] opacity-70">~800MB</span>
                         </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{text.vram.standard}</span>
                </div>

                {/* Quantized */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/3 group">
                    <div className="w-full bg-slate-800/50 rounded-t-lg relative overflow-hidden flex flex-col justify-end h-48 border-b border-white/10">
                         {/* Decode Overhead */}
                         <div className="w-full bg-amber-500/20 h-[10%] flex items-center justify-center text-[9px] text-amber-200 border-t border-amber-500/30">
                            Decode
                         </div>
                         {/* Dynamic */}
                         <div className="w-full bg-indigo-500/30 h-[30%] flex items-center justify-center text-[10px] text-indigo-200 border-t border-indigo-500/50">
                            {text.vram.dynamic}
                         </div>
                         {/* Static (Compressed on disk, but expanded in RAM usually) */}
                         <div className="w-full bg-red-500/60 h-[60%] flex items-center justify-center text-[10px] text-white font-bold relative border-t border-dashed border-white/30">
                            {text.vram.static}
                         </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">{text.vram.quantized}</span>
                </div>

                {/* Optimized */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/3 group">
                    <div className="w-full bg-slate-800/50 rounded-t-lg relative overflow-hidden flex flex-col justify-end h-48 border-b border-white/10">
                         {/* Dynamic */}
                         <div className="w-full bg-indigo-500/20 h-[25%] flex items-center justify-center text-[10px] text-indigo-200 border-t border-indigo-500/50">
                            {text.vram.dynamic}
                         </div>
                         {/* Static */}
                         <div className="w-full bg-emerald-500/60 h-[30%] flex items-center justify-center text-[10px] text-white font-bold group-hover:bg-emerald-500/70 transition-colors">
                            {text.vram.static}
                            <span className="absolute bottom-2 text-[9px] opacity-70">~150MB</span>
                         </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400">{text.vram.optimized}</span>
                </div>
            </div>
            <p className="text-xs text-slate-500 italic text-center">{text.vram.note}</p>
        </div>
      )}

      {/* Content SH vs SG */}
      {activeTab === 'sh_sg' && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
             <div>
                <h4 className="font-bold text-pink-400 mb-2">{text.sh_sg.title}</h4>
                <p className="text-sm text-slate-300">{text.sh_sg.desc}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* SH */}
                <div className="bg-slate-950 border border-red-500/30 rounded-lg p-4 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-red-900/20 rotate-12">
                        <Database size={120} />
                    </div>
                    <h5 className="font-bold text-red-400 mb-4 relative z-10">{text.sh_sg.shTitle}</h5>
                    
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                            <span className="text-xs text-slate-400">{text.sh_sg.coeffs}</span>
                            <span className="text-sm font-mono font-bold text-red-200">16 per color</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-red-500/20">
                            <span className="text-xs text-slate-400">{text.sh_sg.floats}</span>
                            <span className="text-sm font-mono font-bold text-red-400">48 floats</span>
                        </div>
                        
                         {/* Visual Representation of Coeffs */}
                         <div className="grid grid-cols-8 gap-1 mt-2">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="h-4 bg-red-500/40 rounded-sm"></div>
                            ))}
                            <div className="col-span-8 text-[9px] text-center text-red-500/50 mt-1">x 3 (RGB)</div>
                         </div>
                    </div>
                </div>

                {/* SG */}
                <div className="bg-slate-950 border border-emerald-500/30 rounded-lg p-4 relative overflow-hidden">
                     <div className="absolute -right-4 -top-4 text-emerald-900/20 rotate-12">
                        <Cpu size={120} />
                    </div>
                    <h5 className="font-bold text-emerald-400 mb-4 relative z-10">{text.sh_sg.sgTitle}</h5>
                    
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded">
                            <span className="text-xs text-slate-400">{text.sh_sg.coeffs}</span>
                            <span className="text-sm font-mono font-bold text-emerald-200">3 Lobes (Direction + Sharpness)</span>
                        </div>
                        <div className="flex justify-between items-center bg-slate-900 p-2 rounded border border-emerald-500/20">
                            <span className="text-xs text-slate-400">{text.sh_sg.floats}</span>
                            <span className="text-sm font-mono font-bold text-emerald-400">~24 floats</span>
                        </div>

                         {/* Visual Representation of Coeffs */}
                         <div className="grid grid-cols-8 gap-1 mt-2">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-4 bg-emerald-500/40 rounded-sm"></div>
                            ))}
                            <div className="col-span-8 text-[9px] text-center text-emerald-500/50 mt-1">Reduced Parameter Space</div>
                         </div>
                    </div>
                </div>
            </div>
          </div>
      )}

      {/* Content Training */}
      {activeTab === 'training' && (
          <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div>
                <h4 className="font-bold text-emerald-400 mb-2">{text.training.title}</h4>
                <p className="text-sm text-slate-300">{text.training.desc}</p>
            </div>

            <div className="relative h-64 w-full bg-slate-950 rounded-lg border border-slate-800 p-4">
                {/* Labels */}
                <div className="absolute top-2 left-4 text-xs font-bold text-slate-500">{text.training.yAxis}</div>
                <div className="absolute bottom-2 right-4 text-xs font-bold text-slate-500">{text.training.xAxis}</div>

                {/* Graph SVG */}
                <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid */}
                    <line x1="40" y1="180" x2="380" y2="180" stroke="#334155" strokeWidth="1" />
                    <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="1" />

                    {/* Standard Threshold (Constant) */}
                    <path d="M 40 140 L 380 140" stroke="#64748b" strokeWidth="2" strokeDasharray="5,5" fill="none" />
                    <text x="300" y="130" fill="#64748b" fontSize="10">{text.training.traditional}</text>

                    {/* Exponential Threshold */}
                    <path 
                        d="M 40 160 Q 200 160 380 40" 
                        stroke="#10b981" strokeWidth="3" fill="none" 
                        className="drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]"
                    />
                    <text x="250" y="60" fill="#10b981" fontSize="10" fontWeight="bold">{text.training.exponential}</text>

                    {/* Zones */}
                    <rect x="40" y="20" width="150" height="160" fill="url(#growthGrad)" opacity="0.1" />
                    <rect x="190" y="20" width="190" height="160" fill="url(#refineGrad)" opacity="0.1" />
                    
                    <defs>
                        <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.5" />
                        </linearGradient>
                         <linearGradient id="refineGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.5" />
                        </linearGradient>
                    </defs>

                    {/* Zone Labels */}
                    <text x="80" y="175" fill="#10b981" fontSize="9" opacity="0.8">{text.training.growth}</text>
                    <text x="280" y="175" fill="#3b82f6" fontSize="9" opacity="0.8">{text.training.refine}</text>
                </svg>
            </div>
          </div>
      )}
    </div>
  );
};
