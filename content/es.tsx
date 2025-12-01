
import React from 'react';
import { Part } from '../types';
import { GaussianDemo } from '../components/GaussianDemo';
import { DensityDemo } from '../components/DensityDemo';
import { PipelineDemo } from '../components/PipelineDemo';
import { RasterizationDemo } from '../components/RasterizationDemo';
import { ComparisonTable } from '../components/ComparisonTable';
import { NeRFArchitectureDemo } from '../components/NeRFArchitectureDemo';
import { SHDemo } from '../components/SHDemo';
import { ProjectionDemo } from '../components/ProjectionDemo';
import { SfMDemo } from '../components/SfMDemo';
import { InitializationDemo } from '../components/InitializationDemo';
import { OptimizationDemo } from '../components/OptimizationDemo';
import { LossDemo } from '../components/LossDemo';
import { PruningDemo } from '../components/PruningDemo';
import { Dynamic4DDemo } from '../components/Dynamic4DDemo';
import { CompressionDemo } from '../components/CompressionDemo';

export const esContent: Part[] = [
  {
    id: "part-1",
    title: "Parte I: Fundamentos",
    description: "Contexto histórico y la revolución explícita frente a NeRF.",
    sections: [
      {
        id: "1",
        title: "1. Introducción a NVS",
        subsections: [
          {
            id: "1.1",
            title: "El Desafío de la Reconstrucción 3D",
            content: (
              <div className="space-y-8">
                {/* 1. El Desafío Central */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-3">1. El Desafío Central: Síntesis de Nuevas Vistas (NVS)</h3>
                  <p className="mb-4 text-slate-300 leading-relaxed">
                    La Síntesis de Nuevas Vistas (NVS) es el desafío fundamental en la visión por computadora y los gráficos que busca generar imágenes fotorrealistas de una escena desde puntos de vista arbitrarios, basándose únicamente en un conjunto de imágenes de entrada.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    El objetivo de NVS es generar escenas 3D altamente realistas. Una de las capacidades clave de este proceso es el modelado de <strong>efectos dependientes de la vista (view-dependent effects)</strong>, como los reflejos y las luces brillantes (highlights), que deben cambiar de manera realista según la perspectiva del observador.
                  </p>
                </div>

                {/* 2. Limitaciones Tradicionales */}
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">2. Limitaciones de los Métodos Gráficos Tradicionales</h3>
                  <p className="mb-4 text-slate-300">
                    Las representaciones gráficas tradicionales, como polígonos y mallas (meshes), logran una gran velocidad de renderizado a través de la rasterización. Sin embargo, estas representaciones tradicionales tienen dificultades para lograr el fotorrealismo necesario en la NVS:
                  </p>
                  <ul className="space-y-4 list-none">
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">Fallo en la Captura de Luz Compleja</strong>
                        <span className="text-slate-400 text-sm">Las mallas luchan fundamentalmente por capturar fenómenos complejos y continuos de transporte de luz y detalles finos (como reflejos) que son esenciales para un verdadero realismo fotográfico.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">Volúmenes Intricados</strong>
                        <span className="text-slate-400 text-sm">La representación de complejidades volumétricas como el pelo, el pelaje o el humo a menudo es difícil cuando se utilizan primitivas triangulares y métodos de rasterización tradicionales.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">Recursos Elevados (Mallas Detalladas)</strong>
                        <span className="text-slate-400 text-sm">Los métodos tradicionales de rasterización a menudo requieren recursos computacionales y memoria sustancial para almacenar y renderizar mallas grandes o muy detalladas.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* 3. La Solución: Radiance Fields */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">3. La Solución: Campos de Radiancia (Radiance Fields)</h3>
                  <p className="mb-6 text-slate-300">
                    Ante estas limitaciones, los Radiance Fields surgieron como una solución innovadora en la renderización inversa y la síntesis de nuevas vistas.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-1 mb-6">
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-400">
                      <strong className="text-emerald-400 block text-lg mb-1">Definición</strong>
                      <p className="text-slate-300 text-sm">Un Radiance Field modela el entorno 3D para permitir la vista desde cualquier ángulo arbitrario.</p>
                    </div>
                    
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-400">
                      <strong className="text-amber-400 block text-lg mb-1">Pionero Implícito (NeRF)</strong>
                      <p className="text-slate-300 text-sm">El surgimiento de NeRF (Neural Radiance Fields) supuso una revolución al ofrecer una calidad de renderizado notable al modelar la escena como una función volumétrica continua codificada por una red neuronal. No obstante, el renderizado en NeRF era notoriamente lento, lo que restringía su aplicación en escenarios grandes o en tiempo real.</p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-indigo-500 shadow-lg shadow-indigo-500/10">
                      <strong className="text-indigo-400 block text-lg mb-1">La Revolución Explícita (3DGS)</strong>
                      <p className="text-slate-300 text-sm">3D Gaussian Splatting (3DGS) se estableció para resolver la limitación de velocidad de NeRF, convirtiéndose en el método dominante en la NVS. 3DGS representa las escenas mediante un conjunto explícito de primitivas Gaussianas.</p>
                    </div>
                  </div>

                  <div className="bg-indigo-950/30 p-5 rounded-lg text-slate-300 italic text-sm leading-relaxed border border-indigo-900/50">
                    <p className="mb-3">
                      3DGS ha transformado el panorama de las representaciones de escenas 3D al ofrecer un equilibrio inigualable de fidelidad fotorealista y eficiencia computacional en tiempo real. El renderizado de alta velocidad de 3DGS ha sido fundamental para su adopción en investigación y aplicaciones, y es ideal para su uso en VR/AR.
                    </p>
                    <p>
                      El desarrollo de 3DGS aprovecha los fundamentos establecidos por trabajos anteriores, aunque la tecnología logra resultados innovadores sin depender de una red neuronal para la representación central (a diferencia de NeRF).
                    </p>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: "1.2",
            title: "Contexto Histórico",
            content: "Desde la fotogrametría clásica (mallas texturizadas) que falla en superficies complejas, hasta los Radiance Fields que modelan la luz volumétricamente."
          }
        ]
      },
      {
        id: "2",
        title: "2. La Era de los Radiance Fields",
        subsections: [
          {
            id: "2.0",
            title: "Introducción",
            content: (
              <p className="text-slate-300 leading-relaxed mb-6">
                Los Campos de Radiancia (Radiance Fields) representan una solución innovadora a los desafíos del inverse rendering y la síntesis de nuevas vistas, cuyo objetivo es generar escenas 3D altamente realistas a partir de imágenes 2D. Estos campos modelan la escena 3D como una función continua que codifica la densidad y el color en cualquier punto del espacio.
              </p>
            )
          },
          {
            id: "2.1",
            title: "NeRF (Neural Radiance Fields)",
            content: (
              <div className="space-y-6">
                <div>
                   <p className="text-slate-300 mb-4">
                     NeRF (Neural Radiance Fields), introducido en 2020 por Mildenhall et al., revolucionó la NVS al ofrecer una calidad de renderizado fotorrealista superior.
                   </p>
                   <ul className="space-y-3 list-disc pl-5 text-slate-300">
                     <li>
                       <strong className="text-white">Representación Implícita:</strong> NeRF modela el campo de radiancia codificando la geometría y la apariencia de toda la escena de manera implícita dentro de los pesos de una red neuronal MLP (Multi-Layer Perceptron).
                     </li>
                     <li>
                       <strong className="text-white">Modelo Funcional 5D:</strong> La MLP es consultada con una coordenada 5D continua que consta de la ubicación espacial <span className="font-mono text-emerald-400">(x,y,z)</span> y la dirección de la vista <span className="font-mono text-pink-400">(θ,ϕ)</span>.
                     </li>
                     <li>
                       <strong className="text-white">Salida de la MLP:</strong> La red neuronal emite dos valores clave para esa ubicación 5D: la densidad volumétrica <span className="font-mono text-white">(σ)</span> y la radiancia emitida dependiente de la vista <span className="font-mono text-white">(color c)</span>.
                     </li>
                   </ul>
                </div>

                <NeRFArchitectureDemo lang="es" />

                <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-xl">
                   <h4 className="text-lg font-bold text-red-400 mb-4">2.1.1. Limitaciones de NeRF: Entrenamiento y Renderizado Lentos</h4>
                   <p className="text-slate-300 mb-4 text-sm">A pesar de su alta fidelidad visual, los métodos basados en NeRF se enfrentaron a desafíos significativos en términos de eficiencia.</p>
                   
                   <ul className="space-y-4">
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Método de Renderizado (Volumetric Ray Marching)</strong>
                         <span className="text-slate-400">Para renderizar una imagen, NeRF utiliza ray marching. Esto implica lanzar un rayo y consultar repetidamente la MLP para cientos de puntos a lo largo de cada rayo.</span>
                       </div>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Intensidad Computacional</strong>
                         <span className="text-slate-400">Este proceso de consulta masiva a la MLP (millones de veces por imagen) representa el cuello de botella computacional primario.</span>
                       </div>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Velocidad y Tiempo de Entrenamiento</strong>
                         <span className="text-slate-400">Baja tasa de FPS (segundos por frame) y tiempos de entrenamiento de horas o días en implementaciones originales.</span>
                       </div>
                     </li>
                   </ul>
                </div>
              </div>
            )
          },
          {
            id: "2.2",
            title: "El Nacimiento de 3DGS",
            content: (
              <div className="space-y-6">
                <div>
                   <h4 className="text-lg font-bold text-indigo-400 mb-2">Kerbl et al. (SIGGRAPH 2023)</h4>
                   <p className="text-slate-300 mb-4">
                     3D Gaussian Splatting (3DGS) surgió como una metodología para abordar los cuellos de botella computacionales que afectaban a NeRF.
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <strong className="text-amber-400 block mb-2">Cambio de Paradigma (Explícito)</strong>
                        <p className="text-xs text-slate-400">3DGS representa un profundo cambio arquitectónico. La escena se modela como una colección masiva de primitivas Gaussianas 3D individuales (posición, covarianza, color, opacidad).</p>
                      </div>
                      <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <strong className="text-amber-400 block mb-2">No Dependencia de Redes (MLP)</strong>
                        <p className="text-xs text-slate-400">Logra resultados innovadores sin depender de redes neuronales para la representación de la escena, basándose en optimización matemática y rasterización.</p>
                      </div>
                   </div>

                   <h5 className="text-md font-bold text-white mb-3 mt-8">2.2.1. Ventajas Clave</h5>
                   <ul className="grid gap-3 text-sm">
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">1</div>
                         <div>
                            <strong className="text-emerald-300 block">Renderizado en Tiempo Real</strong>
                            <span className="text-slate-400 text-xs">Tasas de cuadros (FPS) de 60+, alcanzando hasta 900 FPS en implementaciones optimizadas.</span>
                         </div>
                      </li>
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">2</div>
                         <div>
                            <strong className="text-emerald-300 block">Rasterización Diferenciable</strong>
                            <span className="text-slate-400 text-xs">Basada en tiles, altamente paralelizable en GPU. Elude las consultas de latencia de la MLP.</span>
                         </div>
                      </li>
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">3</div>
                         <div>
                            <strong className="text-emerald-300 block">Alta Fidelidad Visual</strong>
                            <span className="text-slate-400 text-xs">Iguala o supera la calidad de métodos SOTA como Mip-NeRF360 con tiempos de entrenamiento competitivos.</span>
                         </div>
                      </li>
                   </ul>

                   <div className="mt-8 p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30 italic text-center text-slate-300 text-sm">
                     "Si NeRF es una escultura implícita tallada mediante millones de consultas neurales a lo largo de rayos, 3DGS es una pintura explícita de millones de puntos que se 'salpican' (splatting) directamente sobre la pantalla de forma ultrarrápida."
                   </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "3",
        title: "3. Explícito vs. Implícito",
        subsections: [
          {
            id: "3.1",
            title: "Comparación de Representaciones",
            content: (
              <div>
                <p className="mb-4">
                  La diferencia fundamental entre los métodos anteriores y 3DGS radica en cómo se almacena y procesa la información de la escena.
                </p>
                <ComparisonTable lang="es" />
                <p className="mt-4">
                  3DGS es <strong>explícito</strong>: es básicamente una nube de puntos 'gorda' y difusa. Puedes ver dónde está cada gaussiana en el espacio, a diferencia de NeRF donde la escena está 'oculta' dentro de los pesos de la red neuronal.
                </p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: "part-2",
    title: "Parte II: Matemática del Splatting",
    description: "La primitiva Gaussiana, covarianza y rasterización diferenciable.",
    sections: [
      {
        id: "4",
        title: "4. La Primitiva Gaussiana 3D",
        subsections: [
          {
            id: "4.1",
            title: "Definición Matemática",
            content: (
              <div>
                <p className="mb-4">
                  La unidad fundamental es una función Gaussiana 3D. A diferencia de un punto simple, una Gaussiana tiene volumen y orientación. Se define por su centro, su matriz de covarianza (forma) y su opacidad.
                </p>
                <div className="my-8">
                   <h4 className="text-xl font-bold text-indigo-400 mb-4">Demo Interactiva: Anatomía de una Gaussiana</h4>
                   <p className="text-sm text-slate-400 mb-4">Juega con los controles para entender cómo la matriz de escala y rotación afecta la forma (Covarianza) proyectada en 2D.</p>
                   <GaussianDemo lang="es" />
                </div>
              </div>
            )
          },
          {
            id: "4.2",
            title: "Atributos Clave",
            content: "Cada 'splat' tiene: Posición (x,y,z), Covarianza (matriz 3x3 que define el estiramiento y rotación), Opacidad (alpha) y Color (vía Armónicos Esféricos para efectos dependientes de la vista)."
          }
        ]
      },
      {
        id: "5",
        title: "5. Proyección y Apariencia",
        subsections: [
          {
             id: "5.0",
             title: "Introducción",
             content: (
                <p className="text-slate-300 italic mb-6">
                   El modelado de la apariencia y el proceso de proyección son elementos centrales que permiten a 3D Gaussian Splatting (3DGS) lograr su alta fidelidad visual y su excepcional velocidad de renderizado.
                </p>
             )
          },
          {
            id: "5.1",
            title: "Apariencia Dependiente de la Vista (SH)",
            content: (
              <div className="space-y-6">
                 <div>
                    <p className="text-slate-300 mb-4">
                       Para modelar la forma en que el color y el brillo de un objeto cambian al verlo desde diferentes ángulos, 3DGS utiliza <strong>Armónicos Esféricos (Spherical Harmonics, SH)</strong>.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                       <li><strong className="text-indigo-400">Representación del Color:</strong> En lugar de RGB estático, 3DGS usa coeficientes SH para codificar el color como una función del ángulo de visión.</li>
                       <li><strong className="text-indigo-400">Efectos Fotométricos:</strong> Captura especularidad (brillos) y reflexiones.</li>
                       <li><strong className="text-indigo-400">Parámetros Aprendibles:</strong> Los coeficientes se optimizan durante el entrenamiento.</li>
                    </ul>
                 </div>
                 
                 <SHDemo lang="es" />

                 <div className="bg-slate-800 p-4 rounded border-l-4 border-red-500">
                    <h5 className="font-bold text-white mb-2">El Problema de la Memoria (VRAM Bottleneck)</h5>
                    <p className="text-sm text-slate-400 mb-3">
                       El uso de SH de alto orden (Grado 3 = 16 coeficientes por color) es el principal consumidor de memoria en 3DGS. Millones de primitivas x 48 floats por primitiva = Gigabytes de VRAM.
                    </p>
                    <div className="text-xs bg-slate-900 p-2 rounded text-emerald-400">
                       <strong>Alternativa: Spherical Gaussians (SG).</strong> Frameworks like MEGS2 proponen usar SGs, que son más compactos y permiten reducir el uso de memoria en un 50% con calidad similar.
                    </div>
                 </div>
              </div>
            )
          },
          {
            id: "5.2",
            title: "Proyección 3D a 2D (Covarianza)",
            content: (
               <div className="space-y-6">
                  <p className="text-slate-300">
                     El rasterizador necesita proyectar el elipsoide 3D (definido por media <span className="font-mono text-amber-400">μ</span> y covarianza <span className="font-mono text-amber-400">Σ</span>) a un splat 2D plano (<span className="font-mono text-amber-400">μ', Σ'</span>).
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                     <div className="bg-slate-900 p-3 rounded">
                        <strong className="block text-amber-400 mb-1">Decomposición de Σ</strong>
                        <p className="text-slate-400">La matriz 3D se descompone en Rotación (R) y Escala (S) para asegurar que sea válida: <br/><span className="font-mono text-xs">Σ = RSSᵀRᵀ</span></p>
                     </div>
                     <div className="bg-slate-900 p-3 rounded">
                         <strong className="block text-amber-400 mb-1">El Splat 2D</strong>
                         <p className="text-slate-400">La proyección crea una nueva covarianza 2D Σ' que define la forma de la mancha en la pantalla.</p>
                     </div>
                  </div>

                  <ProjectionDemo lang="es" />
               </div>
            )
          },
          {
             id: "5.3",
             title: "El Espacio de Rayo (EWA Splatting)",
             content: (
                <div className="bg-indigo-950/20 p-5 rounded-lg border border-indigo-900/30">
                   <h4 className="font-bold text-indigo-400 mb-3">La clave de la velocidad: EWA Volume Splatting</h4>
                   <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      La forma en que 3DGS realiza la proyección está inspirada en EWA (Elliptical Weighted Average). Para evitar el costoso ray marching de NeRF (muestrear puntos a lo largo del rayo), 3DGS utiliza una transformación intermedia llamada <strong>Espacio de Rayo (Ray Space)</strong>.
                   </p>
                   <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Alinea los rayos paralelos a un eje de coordenadas.</span>
                      </li>
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Facilita la integración analítica (matemática exacta) en lugar de muestreo aproximado.</span>
                      </li>
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Permite la rasterización directa (Alpha Blending) ultrarrápida.</span>
                      </li>
                   </ul>
                </div>
             )
          }
        ]
      },
      {
        id: "6",
        title: "6. Rasterización Diferenciable",
        subsections: [
          {
            id: "6.1",
            title: "El Pipeline de Renderizado",
            content: (
              <div>
                 <p className="mb-4">
                  La velocidad de 3DGS viene de su rasterizador basado en tiles (baldosas). A diferencia del Ray Marching (que lanza rayos por cada pixel), la rasterización proyecta la geometría directamente sobre la pantalla.
                 </p>
                 
                 <RasterizationDemo lang="es" />

                 <p className="mb-4 mt-6">
                   El pipeline específico de 3DGS sigue estos pasos optimizados para GPU:
                 </p>
                 <div className="my-6">
                    <PipelineDemo lang="es" />
                 </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: "part-3",
    title: "Parte III: Entrenamiento",
    description: "Cómo optimizar millones de parámetros para reconstruir la escena.",
    sections: [
      {
        id: "7",
        title: "7. Preparación del Dataset (SfM)",
        subsections: [
          {
            id: "7.0",
            title: "Introducción",
            content: (
              <p className="text-slate-300 italic mb-6">
                La preparación del conjunto de datos es el primer paso crucial en el pipeline de 3D Gaussian Splatting. Es un proceso de reconstrucción inicial utilizando visión por computadora para obtener la geometría y la posición de la cámara.
              </p>
            )
          },
          {
            id: "7.1",
            title: "Estructura a partir de Movimiento (SfM)",
            content: (
               <div className="space-y-6">
                  <div>
                      <p className="text-slate-300 mb-4">
                        El pipeline de 3DGS toma como entrada un conjunto de imágenes estáticas. La función principal de esta etapa es resolver el problema de <strong>Structure from Motion (SfM)</strong>.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                         <div className="bg-slate-800 p-4 rounded border-l-2 border-indigo-500">
                            <strong className="block text-indigo-400 mb-2">1. Cálculo de Pose</strong>
                            <p className="text-slate-400">SfM analiza las imágenes, encuentra puntos característicos (features) y calcula la posición exacta (matriz extrínseca) y propiedades (intrínseca) de cada cámara.</p>
                         </div>
                         <div className="bg-slate-800 p-4 rounded border-l-2 border-emerald-500">
                             <strong className="block text-emerald-400 mb-2">2. Geometría Inicial</strong>
                             <p className="text-slate-400">Como subproducto, genera una <strong>nube de puntos dispersa (sparse point cloud)</strong> que representa la estructura básica de la escena.</p>
                         </div>
                      </div>

                      <SfMDemo lang="es" />

                      <div className="mt-6 bg-slate-900 p-4 rounded border border-slate-700">
                         <h5 className="font-bold text-white mb-2">Herramienta Estándar: COLMAP</h5>
                         <p className="text-sm text-slate-400">
                            COLMAP es la herramienta Open Source utilizada por defecto. Proporciona una reconstrucción de alta calidad que sirve como "esqueleto" para el entrenamiento.
                         </p>
                         <p className="text-xs text-slate-500 mt-2 italic">
                            Nota: Si la escena es dinámica, COLMAP puede fallar. Alternativas modernas como DUSt3R eliminan la necesidad de calibración previa.
                         </p>
                      </div>
                  </div>
               </div>
            )
          },
          {
            id: "7.2",
            title: "Inicialización de Gaussias",
            content: (
                <div className="space-y-6">
                    <p className="text-slate-300">
                       Una vez obtenida la nube de puntos de SfM, cada punto se utiliza para inicializar una primitiva Gaussiana 3D. El objetivo es convertir un punto simple (p) en un elipsoide con volumen (Splat).
                    </p>

                    <InitializationDemo lang="es" />

                    <div className="grid gap-3 text-sm">
                        <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">1.</div>
                            <div>
                                <strong className="text-slate-200">Posición (μ)</strong>
                                <p className="text-slate-400 text-xs">Es simplemente la ubicación del punto SfM.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">2.</div>
                            <div>
                                <strong className="text-slate-200">Covarianza (Σ)</strong>
                                <p className="text-slate-400 text-xs">Define el tamaño inicial. Se calcula basándose en la distancia media a los 3 puntos vecinos más cercanos (KNN) para evitar "huecos".</p>
                            </div>
                        </div>
                         <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">3.</div>
                            <div>
                                <strong className="text-slate-200">Color (SH)</strong>
                                <p className="text-slate-400 text-xs">Se inicializa tomando el color de los píxeles de las imágenes originales que "ven" ese punto.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
          },
          {
              id: "7.3",
              title: "Requisitos del Dataset",
              content: (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                      <h5 className="font-bold text-white mb-4 flex items-center gap-2">Checklist de Captura</h5>
                      <ul className="space-y-3 text-sm text-slate-300">
                          <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Cobertura Visual:</strong> Captura imágenes desde todos los ángulos. Si no fotografiaste la parte de atrás, no existirá en 3D.</span>
                          </li>
                          <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Escena Estática:</strong> Nada debe moverse durante la captura. Las sombras o objetos en movimiento confundirán a SfM.</span>
                          </li>
                           <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Iluminación Fija:</strong> Evita cambios de exposición automática o balance de blancos en la cámara si es posible.</span>
                          </li>
                      </ul>
                      <div className="mt-4 p-3 bg-indigo-900/20 rounded border border-indigo-500/20 text-xs italic text-indigo-200">
                         "Piensa en SfM como construir el esqueleto de una casa. 3DGS luego vendrá a poner los ladrillos y la pintura (las Gaussias) sobre esa estructura."
                      </div>
                  </div>
              )
          }
        ]
      },
      {
        id: "8",
        title: "8. Optimización (Training)",
        subsections: [
          {
             id: "8.0",
             title: "Introducción",
             content: (
                 <p className="text-slate-300 italic mb-6">
                     La fase de Optimización es el "aprendizaje" de la escena. Ajusta iterativamente millones de parámetros para que las proyecciones de las Gaussias coincidan con las imágenes de entrenamiento.
                 </p>
             )
          },
          {
            id: "8.1",
            title: "Descenso de Gradiente Estocástico (SGD)",
            content: (
                <div className="space-y-6">
                    <p className="text-slate-300">
                        El objetivo es minimizar la discrepancia entre la imagen renderizada y la real. 3DGS utiliza el optimizador <strong>Adam</strong> para ajustar los 4 conjuntos de parámetros de cada Gaussiana: Posición (μ), Covarianza (Σ), Color (c) y Opacidad (α).
                    </p>
                    
                    <OptimizationDemo lang="es" />

                    <div className="bg-slate-900 p-4 rounded border border-slate-700 text-sm text-slate-400">
                        <strong>Nota Técnica:</strong> Se utilizan funciones de activación para mantener valores válidos (ej. Sigmoide para opacidad en rango [0,1]).
                    </div>
                </div>
            )
          },
          {
             id: "8.2",
             title: "Función de Pérdida (Loss)",
             content: (
                 <div className="space-y-6">
                     <p className="text-slate-300">
                         La calidad visual se debe a una función de pérdida compuesta que combina precisión de color y estructura.
                     </p>
                     
                     <LossDemo lang="es" />
                     
                     <div className="grid md:grid-cols-2 gap-4 text-sm">
                         <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                             <strong className="block text-indigo-400 mb-2">L1 Loss (Error Absoluto)</strong>
                             <p className="text-slate-400">Mide la diferencia directa de color RGB. Garantiza precisión cromática pero puede resultar borroso por sí solo.</p>
                         </div>
                         <div className="bg-slate-800 p-4 rounded border-l-4 border-pink-500">
                             <strong className="block text-pink-400 mb-2">D-SSIM (Estructura)</strong>
                             <p className="text-slate-400">Medida de similitud estructural. Crítica para evitar artefactos borrosos y mantener la nitidez perceptual.</p>
                         </div>
                     </div>
                 </div>
             )
          },
          {
              id: "8.3",
              title: "Cálculo de Gradientes (Backward Pass)",
              content: (
                  <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-800">
                      <h4 className="font-bold text-white mb-3">¿Cómo aprende? (La Diferenciabilidad)</h4>
                      <p className="text-slate-300 text-sm mb-4">
                          La clave de 3DGS es que todo el pipeline de rasterización es <strong>diferenciable</strong>. Esto permite que el error calculado en la imagen (Loss) se propague hacia atrás (Backward Pass) hasta cada Gaussiana.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400 list-disc pl-5">
                          <li><strong>Rasterizador Diferenciable:</strong> Diseñado específicamente para permitir un backward pass eficiente.</li>
                          <li><strong>Gradientes Explícitos:</strong> Los autores derivaron manualmente las matemáticas de los gradientes para evitar la lentitud de la diferenciación automática.</li>
                          <li><strong>Sin Límite:</strong> A diferencia de métodos antiguos, el gradiente fluye a través de un número ilimitado de Gaussias superpuestas, permitiendo una optimización estable.</li>
                      </ul>
                  </div>
              )
          }
        ]
      },
      {
        id: "9",
        title: "9. Control Adaptativo de Densidad (ADC)",
        subsections: [
          {
            id: "9.1",
            title: "Refinando la Geometría",
            content: (
              <div>
                <p className="mb-4">
                  La magia ocurre aquí. Si una región tiene mucho error, el sistema decide: ¿Necesito más gaussias pequeñas aquí (Split)? ¿O necesito rellenar un hueco (Clone)?
                </p>
                <div className="my-8">
                   <h4 className="text-xl font-bold text-emerald-400 mb-4">Simulador de Densificación</h4>
                   <p className="text-sm text-slate-400 mb-4">Haz clic en los botones para simular cómo el algoritmo decide dividir o clonar gaussias basado en el gradiente de error.</p>
                   <DensityDemo lang="es" />
                </div>
              </div>
            )
          },
          {
            id: "9.2",
            title: "Estrategias de Poda (Pruning)",
            content: (
              <div className="space-y-6">
                 <p className="text-slate-300">
                   La poda es esencial para reducir la sobrecarga causada por el almacenamiento y procesamiento de primitivas redundantes o innecesarias. El mecanismo de poda del 3DGS original se basa en dos criterios principales, ejecutados periódicamente (por ejemplo, cada 100 iteraciones):
                 </p>
                 
                 <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                        <strong className="block text-indigo-400 mb-2">1. Poda por Opacidad</strong>
                        <p className="text-sm text-slate-400 mb-2">Se eliminan las Gaussias que son esencialmente transparentes y tienen una contribución insignificante.</p>
                        <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                            <li><strong>Criterio:</strong> Si la opacidad (α) cae por debajo de un umbral <span className="font-mono">ϵ = 0.005</span>.</li>
                            <li><strong>Reset:</strong> Cada 3000 pasos, la opacidad de <em>todas</em> las Gaussias se reduce para obligarlas a "luchar" por su existencia, eliminando las que ya no son útiles.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-pink-500">
                        <strong className="block text-pink-400 mb-2">2. Poda por Tamaño</strong>
                        <p className="text-sm text-slate-400 mb-2">Se eliminan las Gaussias que son excesivamente grandes para la escena.</p>
                         <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                            <li><strong>Criterio:</strong> Si la escala máxima excede un porcentaje de la escena (ej. 10%).</li>
                            <li><strong>Problema:</strong> Eliminar una Gaussiana grande puede causar que aparezcan muchas pequeñas para rellenar el hueco, a veces aumentando el uso de memoria.</li>
                        </ul>
                    </div>
                 </div>

                 <PruningDemo lang="es" />
              </div>
            )
          },
          {
            id: "9.5",
            title: "Mejoras Avanzadas en ADC",
            content: (
              <div className="space-y-8">
                 <p className="text-slate-300">
                    La investigación posterior ha propuesto modificaciones al ADC original para mejorar la estabilidad, acelerar la convergencia y optimizar la compactación.
                 </p>

                 {/* A. Gradiente Ascendente */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">A. Umbral de Gradiente Ascendente Exponencial</h4>
                    <p className="text-slate-400 text-sm mb-4">
                       Un umbral fijo no es óptimo. Al principio necesitamos muchas Gaussias (umbral bajo), pero al final queremos evitar el overfitting (umbral alto).
                    </p>
                    <div className="flex gap-4 items-center bg-slate-950 p-3 rounded">
                       <div className="flex-1">
                           <span className="block text-xs font-bold text-emerald-400 mb-1">Inicio (T_start)</span>
                           <p className="text-xs text-slate-500">Valor bajo (0.0001) para crecimiento rápido y construcción de estructura.</p>
                       </div>
                       <div className="text-slate-600">→</div>
                       <div className="flex-1">
                           <span className="block text-xs font-bold text-emerald-400 mb-1">Final (T_end)</span>
                           <p className="text-xs text-slate-500">Valor alto (0.0004) para refinar solo errores graves y evitar exceso de primitivas.</p>
                       </div>
                    </div>
                 </div>

                 {/* B. Significance Aware */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">B. Poda Consciente de la Significación</h4>
                    <p className="text-slate-400 text-sm mb-3">
                       Critica la poda por opacidad simple. Una Gaussiana puede tener baja opacidad pero ser muy importante visualmente (ej. fondo).
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 list-decimal pl-5">
                       <li>Calcula la contribución real al píxel (peso de mezcla).</li>
                       <li>Acumula esta contribución a lo largo de todas las vistas.</li>
                       <li>Solo poda si la <strong>contribución acumulada</strong> es baja, protegiendo detalles sutiles del fondo.</li>
                    </ul>
                 </div>

                 {/* C. PixelGS */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">C. Densificación Pixel-Aware (PixelGS)</h4>
                    <p className="text-slate-400 text-sm mb-3">
                       Evita que Gaussias grandes en el fondo se dividan innecesariamente solo por tener un gradiente alto.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-800 p-2 rounded">
                            <strong className="block text-indigo-400">Conteo de Píxeles</strong>
                            Divide el gradiente por el número de píxeles cubiertos. Gaussias grandes = Gradiente relativo menor.
                        </div>
                        <div className="bg-slate-800 p-2 rounded">
                            <strong className="block text-indigo-400">Escalado por Profundidad</strong>
                            Reduce la densificación en el primer plano y la fomenta en el fondo donde se necesita más detalle.
                        </div>
                    </div>
                 </div>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: "part-4",
    title: "Parte IV: Extensiones y Futuro",
    description: "4DGS, compresión y optimización.",
    sections: [
      {
        id: "10",
        title: "10. Escenas Dinámicas (4DGS)",
        subsections: [
          {
            id: "10.0",
            title: "Introducción",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  La extensión de 3D Gaussian Splatting (3DGS) al dominio del movimiento y el tiempo se conoce como <strong>Dynamic 3D Gaussian Splatting</strong> o, comúnmente, <strong>4D Gaussian Splatting (4DGS)</strong>. Este campo busca capturar y renderizar escenas que cambian temporalmente, como personas en movimiento, videos volumétricos o entornos urbanos dinámicos.
                </p>
                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-lg">
                  <p className="text-sm text-indigo-200">
                    El desarrollo de 4DGS es una de las direcciones clave de investigación que surgió tras el artículo original de 3DGS, transformándolo de un método de captura estática a uno capaz de manejar video volumétrico.
                  </p>
                </div>
              </div>
            )
          },
          {
            id: "10.1",
            title: "Representación Espacio-Temporal",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  Para modelar la escena en movimiento, 4DGS introduce una cuarta dimensión, el tiempo (t), junto a las coordenadas espaciales (x,y,z). Existen dos enfoques principales:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-2 text-sm">1. Modelado Implícito de Deformación (Deep Learning)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Emplea redes neuronales para predecir variaciones en los parámetros del Gaussiano base para cada momento del tiempo. 
                      <br/><br/>
                      <span className="text-red-400">Desventaja:</span> Costoso computacionalmente, requiere consultas a la red por cada Gaussiana.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-2 text-sm">2. Representación Explícita 4D (Hyperspheres)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Extiende el Gaussiano 3D a un <strong>Gaussiano 4D</strong> (hypersphere) con matriz de covarianza 4D (Σ4D) y media 4D (μ4D).
                      <br/><br/>
                      <span className="text-indigo-400">Detalle:</span> Métodos como Rotor4DGS usan rotores para caracterizar rotaciones 4D complejas.
                    </p>
                  </div>
                </div>

                <Dynamic4DDemo lang="es" />
              </div>
            )
          },
          {
            id: "10.2",
            title: "Desafíos Técnicos",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">Extender 3DGS a la dinámica plantea grandes retos:</p>
                <ul className="space-y-3 list-disc pl-5 text-sm text-slate-300">
                  <li><strong>Coherencia Temporal:</strong> Las primitivas deben persistir y mantener su identidad, en lugar de "parpadear" o ser recreadas en cada frame.</li>
                  <li><strong>Renderizado Real-Time:</strong> La reconstrucción no debe colapsar el rendimiento.</li>
                  <li><strong>Escalabilidad:</strong> El tamaño del archivo no debe crecer exponencialmente para videos largos.</li>
                </ul>

                <div className="bg-slate-800 p-4 rounded border-l-4 border-amber-500">
                  <h5 className="font-bold text-white mb-2">El Cuello de Botella "Slicing-First"</h5>
                  <p className="text-sm text-slate-400">
                    Muchos métodos requieren "rebanar" (slice) el Gaussiano 4D en uno 3D estático para cada instante antes de renderizar. Esto obliga a repetir cálculos costosos cada vez que el tiempo cambia.
                  </p>
                </div>
              </div>
            )
          },
          {
            id: "10.3",
            title: "Implementaciones y Avances (Papers Clave)",
            content: (
              <div className="space-y-8">
                {/* Disentangled4DGS */}
                <div className="bg-indigo-900/10 border border-indigo-500/30 p-5 rounded-lg">
                  <h4 className="text-lg font-bold text-indigo-400 mb-2">Disentangled 4D Gaussian Splatting</h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Aborda la ineficiencia del "slicing-first" separando las variables temporales de las espaciales.
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Pipeline "Projection-First": Pospone el procesamiento temporal para mayor velocidad.</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Rendimiento Récord: 343 FPS a resolución 1352×1014 (RTX 3090).</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Almacenamiento reducido en un 4.5% vs matrices 4D completas.</li>
                  </ul>
                </div>

                {/* Others */}
                <div className="space-y-4">
                   <h5 className="font-bold text-white border-b border-slate-800 pb-2">Otros Métodos Notables</h5>
                   <ul className="space-y-3 text-sm text-slate-300">
                      <li><strong>Dynamic 3D Gaussians (Luiten et al.):</strong> Enfatiza que los Gaussianos tengan identidad persistente (color/opacidad constantes) y solo se muevan rígidamente.</li>
                      <li><strong>Rotor4DGS (Duan et al.):</strong> Utiliza rotores 4D para manejar rotaciones complejas, alcanzando ~277 FPS.</li>
                   </ul>
                </div>

                {/* Use Cases */}
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                   <h5 className="font-bold text-emerald-400 mb-4">Casos de Uso Desbloqueados</h5>
                   <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                      <div>• Producción Virtual y VFX (Cine)</div>
                      <div>• Simuladores de Conducción Autónoma (VAD-GS)</div>
                      <div>• Digital Twins a gran escala</div>
                      <div>• Generación Text-to-4D (IA Generativa)</div>
                      <div>• Realidad Virtual (VR) de alta velocidad</div>
                      <div>• Compresión de Video Volumétrico</div>
                   </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "11",
        title: "11. Compresión y Optimización",
        subsections: [
          {
            id: "11.1",
            title: "El Cuello de Botella de VRAM",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  El desafío principal de 3DGS es su elevado consumo de memoria de video (VRAM). La representación explícita de millones de primitivas con parámetros complejos (SH) puede ocupar gigabytes de memoria.
                </p>

                <CompressionDemo lang="es" />

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                   <div className="bg-slate-900 p-4 rounded border border-slate-700">
                      <strong className="block text-indigo-400 mb-2">VRAM Estática</strong>
                      <p className="text-slate-400 text-xs">Los parámetros almacenados en disco/memoria (posición, covarianza, color). ~800MB para escenas grandes.</p>
                   </div>
                   <div className="bg-slate-900 p-4 rounded border border-slate-700">
                      <strong className="block text-pink-400 mb-2">VRAM Dinámica</strong>
                      <p className="text-slate-400 text-xs">Memoria usada durante el renderizado (ordenamiento, proyección 2D). Técnicas de compresión en disco no siempre reducen esto.</p>
                   </div>
                </div>
              </div>
            )
          },
          {
            id: "11.2",
            title: "Estrategias de Compresión",
            content: (
              <div className="space-y-4">
                 <h5 className="text-white font-bold">1. ProtoGS (Anclaje por SfM)</h5>
                 <p className="text-sm text-slate-400">
                    Reduce el número de Gaussias agrupando primitivas redundantes en "prototipos". Utiliza puntos SfM como anclas para dividir la escena y aplicar clustering, reduciendo drásticamente la cantidad total de primitivas.
                 </p>

                 <h5 className="text-white font-bold mt-4">2. Cuantización & Learned Priors</h5>
                 <p className="text-sm text-slate-400">
                    Métodos como <strong>EAGLES</strong> o <strong>CompactGaussian</strong> usan "codebooks" para comprimir los parámetros.
                    <br/>
                    <span className="text-amber-400 text-xs">Advertencia:</span> Aunque reducen el tamaño en disco, la GPU a menudo debe decodificarlos completamente antes de renderizar, por lo que el ahorro de VRAM en tiempo de ejecución es menor.
                 </p>
              </div>
            )
          },
          {
             id: "11.3",
             title: "Spherical Gaussians (MEGS²)",
             content: (
               <div className="space-y-4">
                  <p className="text-slate-300">
                     Reemplazar los costosos Armónicos Esféricos (SH) por <strong>Spherical Gaussians (SG)</strong> es una de las optimizaciones más efectivas.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
                     <li><strong>Compacto:</strong> Un SG de 3 lóbulos usa la mitad de memoria que un SH de grado 3.</li>
                     <li><strong>Sin Decodificación:</strong> A diferencia de la cuantización, los SG se pueden renderizar directamente, ahorrando VRAM real.</li>
                     <li><strong>Poda Unificada:</strong> MEGS² optimiza conjuntamente la eliminación de gaussias y la simplificación de sus parámetros de color.</li>
                  </ul>
               </div>
             )
          },
          {
             id: "11.4",
             title: "Optimización del Entrenamiento (BOGausS)",
             content: (
                <div className="space-y-4">
                   <p className="text-slate-300">
                      Entrenar de manera más inteligente para generar menos basura desde el principio.
                   </p>
                   
                   <div className="bg-slate-800 p-4 rounded border-l-4 border-emerald-500">
                      <strong className="block text-emerald-400 mb-2">Umbral de Gradiente Ascendente (Exponential Gradient)</strong>
                      <p className="text-sm text-slate-400">
                         En lugar de un umbral fijo para densificar, BOGausS comienza bajo (0.0001) para aprender rápido la estructura, y lo sube exponencialmente (0.0004) para evitar crear millones de gaussias innecesarias al final.
                      </p>
                   </div>

                   <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                      <strong className="block text-indigo-400 mb-2">Poda Consciente de la Significación</strong>
                      <p className="text-sm text-slate-400">
                         No borres solo por baja opacidad. Si una gaussiana es transparente pero cubre una gran parte del fondo (contribución acumulada alta), es importante. Este método preserva el fondo mejor que la poda tradicional.
                      </p>
                   </div>
                </div>
             )
          }
        ]
      }
    ]
  },
  {
    id: "part-5",
    title: "Parte V: Práctica",
    description: "Herramientas, Viewers y Aplicaciones.",
    sections: [
      {
        id: "14",
        title: "14. Herramientas",
        subsections: [
          {
            id: "14.1",
            title: "Ecosistema",
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Luma AI / Polycam:</strong> Apps móviles para capturar y entrenar en la nube.</li>
                <li><strong className="text-white">gSplat (NerfStudio):</strong> Librería open-source para investigadores.</li>
                <li>
                  <strong className="text-white">
                    <a href="https://superspl.at" target="_blank" rel="noreferrer" className="underline decoration-indigo-500 hover:text-indigo-400">SuperSplat</a> / Viser:
                  </strong> Visualizadores web para archivos .ply.
                </li>
                <li>
                  <strong className="text-white">
                    <a href="https://lichtfeld.io" target="_blank" rel="noreferrer" className="underline decoration-indigo-500 hover:text-indigo-400">Lichtfeld</a>:
                  </strong> Plataforma profesional para gestión y visualización de Gaussian Splats.
                </li>
              </ul>
            )
          }
        ]
      },
      {
        id: "15",
        title: "15. Formato PLY",
        subsections: [
          {
            id: "15.1",
            title: "El Estándar de Intercambio",
            content: "El archivo PLY contiene una lista plana de vértices. Cada vértice tiene propiedades custom: f_dc (color base), f_rest (SH coefs), opacity, scale, rot."
          }
        ]
      }
    ]
  }
];
