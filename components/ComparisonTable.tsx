import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { BrainCircuit, Box, Boxes, Sigma, ScanLine, Rotate3D } from 'lucide-react';

interface ComparisonTableProps {
  lang: Language;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  // State for interactions
  const [nerfScan, setNerfScan] = useState(50); // 0-100%
  const [gsRotation, setGsRotation] = useState(45); // Degrees

  // Animation for GS auto-rotation if not interacted
  useEffect(() => {
    const interval = setInterval(() => {
        setGsRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const t = {
    es: {
      headers: ["CARACTERÍSTICA", "NEURAL RADIANCE FIELDS (NERF)", "3D GAUSSIAN SPLATTING (3DGS)"],
      rows: [
        {
          feature: "Tipo de Representación",
          nerf: {
            badge: "Implícita (Implicit)",
            desc: "La escena está \"oculta\" dentro de una función matemática (red neuronal)."
          },
          gs: {
            badge: "Explícita (Explicit)",
            desc: "La escena está compuesta por objetos geométricos definidos (elipsoides)."
          }
        },
        {
          feature: "Unidad Básica",
          nerf: {
            title: "Red Neuronal MLP",
            icon: <BrainCircuit className="w-5 h-5 text-blue-400 mb-1" />,
            desc: "Codifica geometría y color en los pesos de la red. Es una función continua y volumétrica."
          },
          gs: {
            title: "Primitivas Gaussianas",
            icon: <Boxes className="w-5 h-5 text-amber-400 mb-1" />,
            desc: "Colección masiva de \"splats\". Cada uno tiene Posición, Rotación, Escala, Color y Opacidad."
          }
        },
        {
          feature: "Uso de Redes Neuronales",
          nerf: {
            title: "Altamente dependiente",
            desc: "La red neuronal ES la representación de la escena. Requiere inferencia costosa para cada rayo."
          },
          gs: {
            title: "Ninguna / Opcional",
            desc: "Se basa en optimización matemática directa de parámetros (Gradient Descent). No requiere MLP para renderizar."
          }
        }
      ],
      visual: {
        title: "Comparación Interactiva",
        nerfTitle: "Simulación NeRF (Ray Marching)",
        nerfDesc: "Mueve el slider para renderizar un píxel. Nota cómo CADA punto del rayo debe consultar a la Red Neuronal.",
        gsTitle: "Simulación 3DGS (Rasterization)",
        gsDesc: "Las Gaussias (elipsoides) existen explícitamente en 3D. Se proyectan y rotan instantáneamente.",
        scanLabel: "Escanear Píxel",
        rotateLabel: "Rotar Modelo"
      }
    },
    en: {
      headers: ["FEATURE", "NEURAL RADIANCE FIELDS (NERF)", "3D GAUSSIAN SPLATTING (3DGS)"],
      rows: [
        {
          feature: "Representation Type",
          nerf: {
            badge: "Implicit",
            desc: "The scene is \"hidden\" inside a mathematical function (neural network)."
          },
          gs: {
            badge: "Explicit",
            desc: "The scene is composed of defined geometric objects (ellipsoids)."
          }
        },
        {
          feature: "Basic Unit",
          nerf: {
            title: "MLP Neural Network",
            icon: <BrainCircuit className="w-5 h-5 text-blue-400 mb-1" />,
            desc: "Encodes geometry and color in network weights. It is a continuous volumetric function."
          },
          gs: {
            title: "Gaussian Primitives",
            icon: <Boxes className="w-5 h-5 text-amber-400 mb-1" />,
            desc: "Massive collection of \"splats\". Each has Position, Rotation, Scale, Color, and Opacity."
          }
        },
        {
          feature: "Neural Network Usage",
          nerf: {
            title: "Highly Dependent",
            desc: "The neural network IS the scene representation. Requires costly inference for every ray."
          },
          gs: {
            title: "None / Optional",
            desc: "Based on direct mathematical optimization of parameters (Gradient Descent). No MLP required for rendering."
          }
        }
      ],
      visual: {
        title: "Interactive Comparison",
        nerfTitle: "NeRF Simulation (Ray Marching)",
        nerfDesc: "Move slider to render a pixel. Notice how EVERY sample point must query the Neural Network.",
        gsTitle: "3DGS Simulation (Rasterization)",
        gsDesc: "Gaussians (ellipsoids) exist explicitly in 3D. They project and rotate instantly.",
        scanLabel: "Scan Pixel",
        rotateLabel: "Rotate Model"
      }
    }
  };

  const content = t[lang];

  // Helper for NeRF Ray Logic
  // Calculate ray path based on slider 0-100
  // SVG Viewbox 240x160. Ray starts at (20, 80). Ends at (200, mapped_y)
  const rayEndY = 20 + (nerfScan / 100) * 120;
  
  // Helper for 3DGS Rotation Logic
  // Simple array of "Gaussians" (x,y,z, color)
  const gaussians3D = [
      {x: 0, y: 0, z: 0, col: '#f59e0b', s: 20},
      {x: 30, y: 10, z: 10, col: '#d97706', s: 15},
      {x: -30, y: -10, z: -10, col: '#fbbf24', s: 15},
      {x: 0, y: 40, z: 0, col: '#b45309', s: 18},
      {x: 0, y: -40, z: 0, col: '#b45309', s: 18},
      {x: 20, y: 0, z: 30, col: '#fcd34d', s: 12},
      {x: -20, y: 0, z: -30, col: '#fcd34d', s: 12},
  ];

  // Project 3D points to 2D based on rotation
  const rad = (gsRotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const projectedGaussians = gaussians3D.map((g, i) => {
      // Rotate around Y axis
      const rx = g.x * cos - g.z * sin;
      const rz = g.x * sin + g.z * cos;
      
      // Simple perspective scale
      const scale = (200 / (200 - rz)); // fake depth
      
      return {
          ...g,
          px: 120 + rx * scale, // Center X is 120
          py: 80 + g.y * scale, // Center Y is 80
          pz: rz,
          scale: g.s * scale,
          id: i
      };
  }).sort((a, b) => b.pz - a.pz); // Painter's algo (draw back to front)

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl my-8">
      {/* Header */}
      <div className="hidden md:grid grid-cols-12 bg-slate-800/50 border-b border-slate-700 p-4 text-xs font-bold tracking-wider text-slate-400 uppercase">
        <div className="col-span-3">{content.headers[0]}</div>
        <div className="col-span-4 text-blue-400">{content.headers[1]}</div>
        <div className="col-span-5 text-amber-400">{content.headers[2]}</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-800">
        {content.rows.map((row, idx) => (
          <div key={idx} className="flex flex-col md:grid md:grid-cols-12 p-6 gap-4 md:gap-0 hover:bg-slate-800/20 transition-colors">
            <div className="md:col-span-3 font-bold text-white text-sm flex items-center">{row.feature}</div>
            <div className="md:col-span-4 md:pr-6">
              <div className="md:hidden text-xs font-bold text-blue-400 mb-1">{content.headers[1]}</div>
              {row.nerf.badge && <span className="inline-block px-3 py-1 rounded-full bg-blue-900/50 text-blue-200 text-xs font-semibold border border-blue-700/50 mb-2">{row.nerf.badge}</span>}
              {row.nerf.title && <div className="flex items-center gap-2 font-bold text-blue-200 mb-2">{row.nerf.icon}<span>{row.nerf.title}</span></div>}
              <p className="text-sm text-slate-400 leading-relaxed">{row.nerf.desc}</p>
            </div>
            <div className="md:col-span-5 md:pl-6 md:border-l border-slate-800/50">
              <div className="md:hidden text-xs font-bold text-amber-400 mb-1 mt-4">{content.headers[2]}</div>
              {row.gs.badge && <span className="inline-block px-3 py-1 rounded-full bg-amber-900/30 text-amber-200 text-xs font-semibold border border-amber-700/50 mb-2">{row.gs.badge}</span>}
              {row.gs.title && <div className="flex items-center gap-2 font-bold text-amber-200 mb-2">{row.gs.icon}<span>{row.gs.title}</span></div>}
              <p className="text-sm text-slate-300 leading-relaxed">{row.gs.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INTERACTIVE VISUAL COMPARISON */}
      <div className="grid md:grid-cols-12 border-t border-slate-800 bg-slate-950/30">
        <div className="md:col-span-3 p-6 font-bold text-white text-sm flex items-center border-r border-slate-800/50">
           <span className="flex items-center gap-2">
             <Sigma className="w-5 h-5 text-purple-400" />
             {content.visual.title}
           </span>
        </div>
        
        {/* === NERF SIMULATOR === */}
        <div className="md:col-span-4 p-6 flex flex-col items-center justify-start border-r border-slate-800/50 bg-blue-950/5 relative">
            <div className="w-full flex justify-between items-center mb-4">
                 <div className="text-xs font-bold text-blue-400 tracking-wider uppercase">{content.visual.nerfTitle}</div>
                 <BrainCircuit className="w-4 h-4 text-blue-500 animate-pulse" />
            </div>

            {/* Render Window */}
            <div className="relative bg-slate-900 rounded-lg border border-slate-800 shadow-inner p-2 w-full max-w-[280px]">
                <svg width="100%" height="160" viewBox="0 0 240 160" className="overflow-visible">
                    <defs>
                        <linearGradient id="rayGrad" gradientUnits="userSpaceOnUse" x1="20" y1="80" x2="200" y2={rayEndY}>
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* The Scene "Volume" */}
                    <path d="M 100 20 Q 220 0 220 80 Q 200 150 100 140 Q 60 100 100 20" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.5" />
                    
                    {/* Camera */}
                    <g transform="translate(20, 80)">
                       <path d="M -10 -10 L 10 0 L -10 10 Z" fill="#94a3b8" /> 
                    </g>
                    
                    {/* The Ray */}
                    <line x1="30" y1="80" x2="220" y2={rayEndY} stroke="url(#rayGrad)" strokeWidth="2" strokeDasharray="3 2" />

                    {/* Sampling Points on Ray */}
                    {[0.2, 0.4, 0.6, 0.8].map((t, i) => {
                        const px = 30 + (220 - 30) * t;
                        const py = 80 + (rayEndY - 80) * t;
                        
                        // Only show points if they are inside roughly volume area (simplification)
                        const isInVolume = px > 70 && px < 210; 
                        
                        return isInVolume ? (
                            <g key={i}>
                                <circle cx={px} cy={py} r="3" fill="#3b82f6" stroke="white" strokeWidth="1" />
                                {/* Line to Neural Net Box */}
                                <line x1={px} y1={py} x2={120} y2={130} stroke="#3b82f6" strokeWidth="1" opacity="0.5" className="animate-pulse" />
                            </g>
                        ) : null;
                    })}

                    {/* MLP Neural Network Representation */}
                    <g transform="translate(100, 120)">
                       <rect x="0" y="0" width="40" height="25" rx="4" fill="#172554" stroke="#3b82f6" strokeWidth="2" className="shadow-[0_0_10px_#3b82f6]" />
                       <text x="20" y="17" fontSize="10" fontWeight="bold" fill="#60a5fa" textAnchor="middle">MLP</text>
                    </g>
                </svg>
            </div>

            {/* Controls */}
            <div className="w-full mt-4 bg-slate-900 p-3 rounded border border-slate-800">
                <label className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="flex items-center gap-2"><ScanLine className="w-3 h-3"/> {content.visual.scanLabel}</span>
                    <span className="text-blue-400">{nerfScan}%</span>
                </label>
                <input 
                    type="range" min="0" max="100" 
                    value={nerfScan} 
                    onChange={(e) => setNerfScan(parseInt(e.target.value))}
                    className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>
             <p className="text-xs text-center text-slate-400 mt-3 italic">{content.visual.nerfDesc}</p>
        </div>

        {/* === 3DGS SIMULATOR === */}
        <div className="md:col-span-5 p-6 flex flex-col items-center justify-start bg-amber-950/5 relative">
            <div className="w-full flex justify-between items-center mb-4">
                 <div className="text-xs font-bold text-amber-400 tracking-wider uppercase">{content.visual.gsTitle}</div>
                 <Boxes className="w-4 h-4 text-amber-500" />
            </div>

            {/* Render Window */}
            <div className="relative bg-slate-900 rounded-lg border border-slate-800 shadow-inner p-2 w-full max-w-[280px] h-[178px] flex items-center justify-center overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 240 160" className="overflow-visible">
                     
                     {/* The "Screen" Plane behind */}
                     <rect x="20" y="20" width="200" height="120" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" rx="4" />
                     <text x="30" y="35" fontSize="8" fill="#475569">Rasterization Plane</text>

                     {/* The 3D Gaussians Projecting */}
                     {projectedGaussians.map((g) => (
                         <g key={g.id}>
                             {/* The Splat */}
                             <ellipse 
                                cx={g.px} 
                                cy={g.py} 
                                rx={g.scale * 1.2} 
                                ry={g.scale * 0.8} 
                                fill={g.col} 
                                fillOpacity={0.8} 
                                stroke="white" 
                                strokeWidth="0.5" 
                                strokeOpacity="0.3"
                                transform={`rotate(${gsRotation * 0.5}, ${g.px}, ${g.py})`} // Small local rotation for effect
                             />
                         </g>
                     ))}

                     {/* Axis Indicator */}
                     <g transform="translate(220, 140)">
                         <line x1="0" y1="0" x2="-10" y2="0" stroke="red" strokeWidth="1" />
                         <line x1="0" y1="0" x2="0" y2="-10" stroke="green" strokeWidth="1" />
                         <line x1="0" y1="0" x2="-7" y2="7" stroke="blue" strokeWidth="1" />
                     </g>
                </svg>
            </div>

            {/* Controls */}
            <div className="w-full mt-4 bg-slate-900 p-3 rounded border border-slate-800">
                <label className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="flex items-center gap-2"><Rotate3D className="w-3 h-3"/> {content.visual.rotateLabel}</span>
                    <span className="text-amber-400">{Math.round(gsRotation)}°</span>
                </label>
                <input 
                    type="range" min="0" max="360" 
                    value={gsRotation} 
                    onChange={(e) => setGsRotation(parseInt(e.target.value))}
                    className="w-full accent-amber-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
            </div>
            <p className="text-xs text-center text-slate-400 mt-3 italic">{content.visual.gsDesc}</p>
        </div>
      </div>
    </div>
  );
};
