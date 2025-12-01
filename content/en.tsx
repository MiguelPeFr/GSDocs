
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

export const enContent: Part[] = [
  {
    id: "part-1",
    title: "Part I: Fundamentals",
    description: "Historical context and the explicit revolution vs NeRF.",
    sections: [
      {
        id: "1",
        title: "1. Intro to NVS",
        subsections: [
          {
            id: "1.1",
            title: "The Challenge of 3D Reconstruction",
            content: (
              <div className="space-y-8">
                {/* 1. The Core Challenge */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-3">1. The Core Challenge: Novel View Synthesis (NVS)</h3>
                  <p className="mb-4 text-slate-300 leading-relaxed">
                    Novel View Synthesis (NVS) is the fundamental challenge in computer vision and graphics that seeks to generate photorealistic images of a scene from arbitrary viewpoints, based solely on a set of input images.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    The goal of NVS is to generate highly realistic 3D scenes. A key capability of this process is modeling <strong>view-dependent effects</strong>, such as reflections and highlights, which must change realistically according to the observer's perspective.
                  </p>
                </div>

                {/* 2. Traditional Limitations */}
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">2. Limitations of Traditional Graphics Methods</h3>
                  <p className="mb-4 text-slate-300">
                    Traditional graphics representations, such as polygons and meshes, achieve high rendering speed through rasterization. However, these traditional representations struggle to achieve the photorealism required for NVS:
                  </p>
                  <ul className="space-y-4 list-none">
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">Failure to Capture Complex Light</strong>
                        <span className="text-slate-400 text-sm">Meshes fundamentally struggle to capture complex continuous light transport phenomena and fine details (like reflections) that are essential for true photorealism.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">Intricate Volumes</strong>
                        <span className="text-slate-400 text-sm">Representing volumetric complexities like hair, fur, or smoke is often difficult when using triangular primitives and traditional rasterization methods.</span>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="min-w-[4px] bg-red-500 rounded-full h-auto"></div>
                      <div>
                        <strong className="text-white block">High Resources (Detailed Meshes)</strong>
                        <span className="text-slate-400 text-sm">Traditional rasterization methods often require substantial computational resources and memory to store and render large or highly detailed meshes.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* 3. The Solution: Radiance Fields */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-400 mb-4">3. The Solution: Radiance Fields</h3>
                  <p className="mb-6 text-slate-300">
                    Given these limitations, Radiance Fields emerged as an innovative solution in inverse rendering and novel view synthesis.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-1 mb-6">
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-emerald-400">
                      <strong className="text-emerald-400 block text-lg mb-1">Definition</strong>
                      <p className="text-slate-300 text-sm">A Radiance Field models the 3D environment to allow viewing from any arbitrary angle.</p>
                    </div>
                    
                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-400">
                      <strong className="text-amber-400 block text-lg mb-1">Implicit Pioneer (NeRF)</strong>
                      <p className="text-slate-300 text-sm">The emergence of NeRF (Neural Radiance Fields) was a breakthrough, offering remarkable rendering quality by modeling the scene as a continuous volumetric function encoded by a neural network. However, NeRF rendering was notoriously slow, restricting its application in large scenarios or real-time.</p>
                    </div>

                    <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-indigo-500 shadow-lg shadow-indigo-500/10">
                      <strong className="text-indigo-400 block text-lg mb-1">The Explicit Revolution (3DGS)</strong>
                      <p className="text-slate-300 text-sm">3D Gaussian Splatting (3DGS) was established to resolve NeRF's speed limitation, becoming the dominant method in NVS. 3DGS represents scenes using an explicit set of Gaussian primitives.</p>
                    </div>
                  </div>

                  <div className="bg-indigo-950/30 p-5 rounded-lg text-slate-300 italic text-sm leading-relaxed border border-indigo-900/50">
                    <p className="mb-3">
                      3DGS has transformed the landscape of 3D scene representations by offering an unmatched balance of photorealistic fidelity and real-time computational efficiency. The high-speed rendering of 3DGS has been fundamental for its adoption in research and applications, and it is ideal for use in VR/AR.
                    </p>
                    <p>
                      The development of 3DGS leverages foundations established by previous works, although the technology achieves innovative results without relying on a neural network for the core representation (unlike NeRF).
                    </p>
                  </div>
                </div>
              </div>
            )
          },
          {
            id: "1.2",
            title: "Historical Context",
            content: "From classical photogrammetry (textured meshes) that fails on complex surfaces, to Radiance Fields that model light volumetrically."
          }
        ]
      },
      {
        id: "2",
        title: "2. The Era of Radiance Fields",
        subsections: [
          {
            id: "2.0",
            title: "Introduction",
            content: (
              <p className="text-slate-300 leading-relaxed mb-6">
                Radiance Fields represent an innovative solution to the challenges of inverse rendering and novel view synthesis, aiming to generate highly realistic 3D scenes from 2D images. These fields model the 3D scene as a continuous function that encodes density and color at any point in space.
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
                     NeRF (Neural Radiance Fields), introduced in 2020 by Mildenhall et al., revolutionized NVS by offering superior photorealistic rendering quality.
                   </p>
                   <ul className="space-y-3 list-disc pl-5 text-slate-300">
                     <li>
                       <strong className="text-white">Implicit Representation:</strong> NeRF models the radiance field by encoding the geometry and appearance of the entire scene implicitly within the weights of a Multi-Layer Perceptron (MLP) neural network.
                     </li>
                     <li>
                       <strong className="text-white">5D Functional Model:</strong> The MLP is queried with a continuous 5D coordinate consisting of spatial location <span className="font-mono text-emerald-400">(x,y,z)</span> and view direction <span className="font-mono text-pink-400">(θ,ϕ)</span>.
                     </li>
                     <li>
                       <strong className="text-white">MLP Output:</strong> The neural network outputs two key values for that 5D location: volumetric density <span className="font-mono text-white">(σ)</span> and view-dependent emitted radiance <span className="font-mono text-white">(color c)</span>.
                     </li>
                   </ul>
                </div>

                <NeRFArchitectureDemo lang="en" />

                <div className="bg-red-950/20 border border-red-900/50 p-6 rounded-xl">
                   <h4 className="text-lg font-bold text-red-400 mb-4">2.1.1. NeRF Limitations: Slow Training & Rendering</h4>
                   <p className="text-slate-300 mb-4 text-sm">Despite its high visual fidelity, NeRF-based methods faced significant efficiency challenges.</p>
                   
                   <ul className="space-y-4">
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Rendering Method (Volumetric Ray Marching)</strong>
                         <span className="text-slate-400">To render an image, NeRF uses ray marching. This involves shooting a ray and repeatedly querying the MLP for hundreds of samples along each ray.</span>
                       </div>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Computational Intensity</strong>
                         <span className="text-slate-400">This massive MLP querying process (millions of times per image) represents the primary computational bottleneck.</span>
                       </div>
                     </li>
                     <li className="flex gap-3 text-sm">
                       <div className="min-w-[3px] bg-red-500/50 h-full rounded-full"></div>
                       <div>
                         <strong className="block text-red-200">Rendering Speed & Training Time</strong>
                         <span className="text-slate-400">Low FPS rates (seconds per frame) and training times of hours or days in original implementations.</span>
                       </div>
                     </li>
                   </ul>
                </div>
              </div>
            )
          },
          {
            id: "2.2",
            title: "The Birth of 3DGS",
             content: (
              <div className="space-y-6">
                <div>
                   <h4 className="text-lg font-bold text-indigo-400 mb-2">Kerbl et al. (SIGGRAPH 2023)</h4>
                   <p className="text-slate-300 mb-4">
                     3D Gaussian Splatting (3DGS) emerged as a methodology to address the computational bottlenecks plaguing NeRF.
                   </p>
                   
                   <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <strong className="text-amber-400 block mb-2">Paradigm Shift (Explicit)</strong>
                        <p className="text-xs text-slate-400">3DGS represents a profound architectural shift. The scene is modeled as a massive collection of individual 3D Gaussian primitives (position, covariance, color, opacity).</p>
                      </div>
                      <div className="bg-slate-800 p-4 rounded border border-slate-700">
                        <strong className="text-amber-400 block mb-2">No Neural Network Dependency</strong>
                        <p className="text-xs text-slate-400">Achieves innovative results without relying on neural networks for scene representation, relying on mathematical optimization and rasterization.</p>
                      </div>
                   </div>

                   <h5 className="text-md font-bold text-white mb-3 mt-8">2.2.1. Key Advantages</h5>
                   <ul className="grid gap-3 text-sm">
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">1</div>
                         <div>
                            <strong className="text-emerald-300 block">Real-Time Rendering</strong>
                            <span className="text-slate-400 text-xs">Frame rates (FPS) of 60+, reaching up to 900 FPS in optimized implementations.</span>
                         </div>
                      </li>
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">2</div>
                         <div>
                            <strong className="text-emerald-300 block">Differentiable Rasterization</strong>
                            <span className="text-slate-400 text-xs">Tile-based, highly parallelizable on GPU. Bypasses MLP latency queries.</span>
                         </div>
                      </li>
                      <li className="bg-emerald-950/30 border border-emerald-900/50 p-3 rounded flex gap-3 items-center">
                         <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center font-bold text-emerald-400">3</div>
                         <div>
                            <strong className="text-emerald-300 block">High Visual Fidelity</strong>
                            <span className="text-slate-400 text-xs">Matches or exceeds SOTA methods like Mip-NeRF360 with competitive training times.</span>
                         </div>
                      </li>
                   </ul>

                   <div className="mt-8 p-4 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30 italic text-center text-slate-300 text-sm">
                     "If NeRF is an implicit sculpture carved by millions of neural queries along rays, 3DGS is an explicit painting of millions of points 'splatted' directly onto the screen at lightning speed."
                   </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "3",
        title: "3. Explicit vs. Implicit",
        subsections: [
          {
            id: "3.1",
            title: "Representation Comparison",
            content: (
               <div>
                <p className="mb-4">
                  The fundamental difference between previous methods and 3DGS lies in how scene information is stored and processed.
                </p>
                <ComparisonTable lang="en" />
                <p className="mt-4">
                  3DGS is <strong>explicit</strong>: it is basically a 'fat' and fuzzy point cloud. You can see where each Gaussian is in space, unlike NeRF where the scene is 'hidden' inside the neural network weights.
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
    title: "Part II: Splatting Math",
    description: "The Gaussian primitive, covariance, and differentiable rasterization.",
    sections: [
      {
        id: "4",
        title: "4. The 3D Gaussian Primitive",
        subsections: [
          {
            id: "4.1",
            title: "Mathematical Definition",
            content: (
              <div>
                <p className="mb-4">
                  The fundamental unit is a 3D Gaussian function. Unlike a simple point, a Gaussian has volume and orientation. It is defined by its center, its covariance matrix (shape), and its opacity.
                </p>
                <div className="my-8">
                   <h4 className="text-xl font-bold text-indigo-400 mb-4">Interactive Demo: Anatomy of a Gaussian</h4>
                   <p className="text-sm text-slate-400 mb-4">Play with the controls to understand how the scale and rotation matrix affects the shape (Covariance) projected in 2D.</p>
                   <GaussianDemo lang="en" />
                </div>
              </div>
            )
          },
          {
            id: "4.2",
            title: "Key Attributes",
            content: "Each 'splat' has: Position (x,y,z), Covariance (3x3 matrix defining stretch and rotation), Opacity (alpha), and Color (via Spherical Harmonics for view-dependent effects)."
          }
        ]
      },
      {
        id: "5",
        title: "5. Projection and Appearance",
        subsections: [
          {
             id: "5.0",
             title: "Introduction",
             content: (
                <p className="text-slate-300 italic mb-6">
                   Appearance modeling and the projection process are core elements that allow 3D Gaussian Splatting (3DGS) to achieve its high visual fidelity and exceptional rendering speed.
                </p>
             )
          },
          {
            id: "5.1",
            title: "View-Dependent Appearance (SH)",
            content: (
              <div className="space-y-6">
                 <div>
                    <p className="text-slate-300 mb-4">
                       To model how an object's color and brightness change when viewed from different angles, 3DGS uses <strong>Spherical Harmonics (SH)</strong>.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
                       <li><strong className="text-indigo-400">Color Representation:</strong> Instead of static RGB, 3DGS uses SH coefficients to encode color as a function of the viewing angle.</li>
                       <li><strong className="text-indigo-400">Photometric Effects:</strong> Captures specularity (highlights) and reflections.</li>
                       <li><strong className="text-indigo-400">Learnable Parameters:</strong> Coefficients are optimized during training.</li>
                    </ul>
                 </div>
                 
                 <SHDemo lang="en" />

                 <div className="bg-slate-800 p-4 rounded border-l-4 border-red-500">
                    <h5 className="font-bold text-white mb-2">The Memory Problem (VRAM Bottleneck)</h5>
                    <p className="text-sm text-slate-400 mb-3">
                       Using high-order SH (Degree 3 = 16 coefficients per color) is the main memory consumer in 3DGS. Millions of primitives x 48 floats per primitive = Gigabytes of VRAM.
                    </p>
                    <div className="text-xs bg-slate-900 p-2 rounded text-emerald-400">
                       <strong>Alternative: Spherical Gaussians (SG).</strong> Frameworks like MEGS2 propose using SGs, which are more compact and allow reducing memory usage by 50% with similar quality.
                    </div>
                 </div>
              </div>
            )
          },
          {
            id: "5.2",
            title: "3D to 2D Projection (Covariance)",
            content: (
               <div className="space-y-6">
                  <p className="text-slate-300">
                     The rasterizer needs to project the 3D ellipsoid (defined by mean <span className="font-mono text-amber-400">μ</span> and covariance <span className="font-mono text-amber-400">Σ</span>) to a flat 2D splat (<span className="font-mono text-amber-400">μ', Σ'</span>).
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                     <div className="bg-slate-900 p-3 rounded">
                        <strong className="block text-amber-400 mb-1">Σ Decomposition</strong>
                        <p className="text-slate-400">The 3D matrix is decomposed into Rotation (R) and Scale (S) to ensure validity: <br/><span className="font-mono text-xs">Σ = RSSᵀRᵀ</span></p>
                     </div>
                     <div className="bg-slate-900 p-3 rounded">
                         <strong className="block text-amber-400 mb-1">The 2D Splat</strong>
                         <p className="text-slate-400">The projection creates a new 2D covariance Σ' that defines the shape of the blob on the screen.</p>
                     </div>
                  </div>

                  <ProjectionDemo lang="en" />
               </div>
            )
          },
          {
             id: "5.3",
             title: "Ray Space (EWA Splatting)",
             content: (
                <div className="bg-indigo-950/20 p-5 rounded-lg border border-indigo-900/30">
                   <h4 className="font-bold text-indigo-400 mb-3">The Key to Speed: EWA Volume Splatting</h4>
                   <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                      How 3DGS performs projection is inspired by EWA (Elliptical Weighted Average). To avoid NeRF's costly ray marching (sampling points along the ray), 3DGS uses an intermediate transformation called <strong>Ray Space</strong>.
                   </p>
                   <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Aligns parallel rays to a coordinate axis.</span>
                      </li>
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Facilitates analytic integration (exact math) instead of approximate sampling.</span>
                      </li>
                      <li className="flex gap-2">
                         <div className="min-w-[4px] bg-indigo-500 h-full rounded"></div>
                         <span>Enables ultra-fast direct rasterization (Alpha Blending).</span>
                      </li>
                   </ul>
                </div>
             )
          }
        ]
      },
      {
        id: "6",
        title: "6. Differentiable Rasterization",
        subsections: [
          {
            id: "6.1",
            title: "The Rendering Pipeline",
            content: (
              <div>
                 <p className="mb-4">
                  3DGS's speed comes from its tile-based rasterizer. Unlike Ray Marching (which shoots rays for every pixel), rasterization projects geometry directly onto the screen.
                 </p>
                 
                 <RasterizationDemo lang="en" />

                 <p className="mb-4 mt-6">
                   The specific 3DGS pipeline follows these GPU-optimized steps:
                 </p>
                 <div className="my-6">
                    <PipelineDemo lang="en" />
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
    title: "Part III: Training",
    description: "How to optimize millions of parameters to reconstruct the scene.",
    sections: [
      {
        id: "7",
        title: "7. Dataset Preparation (SfM)",
        subsections: [
          {
            id: "7.0",
            title: "Introduction",
            content: (
              <p className="text-slate-300 italic mb-6">
                Dataset preparation is the first crucial step in the 3D Gaussian Splatting pipeline. It is an initial reconstruction process using computer vision to obtain geometry and camera poses.
              </p>
            )
          },
          {
            id: "7.1",
            title: "Structure from Motion (SfM)",
             content: (
               <div className="space-y-6">
                  <div>
                      <p className="text-slate-300 mb-4">
                        The 3DGS pipeline takes a set of static images as input. The main function of this stage is to solve the <strong>Structure from Motion (SfM)</strong>.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                         <div className="bg-slate-800 p-4 rounded border-l-2 border-indigo-500">
                            <strong className="block text-indigo-400 mb-2">1. Pose Estimation</strong>
                            <p className="text-slate-400">SfM analyzes images, finds feature points, and calculates the exact position (extrinsic) and properties (intrinsic) of each camera.</p>
                         </div>
                         <div className="bg-slate-800 p-4 rounded border-l-2 border-emerald-500">
                             <strong className="block text-emerald-400 mb-2">2. Initial Geometry</strong>
                             <p className="text-slate-400">As a byproduct, it generates a <strong>sparse point cloud</strong> representing the basic structure of the scene.</p>
                         </div>
                      </div>

                      <SfMDemo lang="en" />

                      <div className="mt-6 bg-slate-900 p-4 rounded border border-slate-700">
                         <h5 className="font-bold text-white mb-2">Standard Tool: COLMAP</h5>
                         <p className="text-sm text-slate-400">
                            COLMAP is the default Open Source tool used. It provides high-quality reconstruction that serves as the "skeleton" for training.
                         </p>
                         <p className="text-xs text-slate-500 mt-2 italic">
                            Note: If the scene is dynamic, COLMAP might fail. Modern alternatives like DUSt3R remove the need for prior calibration.
                         </p>
                      </div>
                  </div>
               </div>
            )
          },
          {
            id: "7.2",
            title: "Gaussian Initialization",
             content: (
                <div className="space-y-6">
                    <p className="text-slate-300">
                       Once the SfM point cloud is obtained, each point is used to initialize a 3D Gaussian primitive. The goal is to convert a simple point (p) into an ellipsoid with volume (Splat).
                    </p>

                    <InitializationDemo lang="en" />

                    <div className="grid gap-3 text-sm">
                        <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">1.</div>
                            <div>
                                <strong className="text-slate-200">Position (μ)</strong>
                                <p className="text-slate-400 text-xs">Simply the location of the SfM point.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">2.</div>
                            <div>
                                <strong className="text-slate-200">Covariance (Σ)</strong>
                                <p className="text-slate-400 text-xs">Defines initial size. Calculated based on the mean distance to the 3 nearest neighbors (KNN) to avoid "holes".</p>
                            </div>
                        </div>
                         <div className="flex gap-3 bg-slate-800/50 p-3 rounded">
                            <div className="min-w-[20px] font-bold text-indigo-400">3.</div>
                            <div>
                                <strong className="text-slate-200">Color (SH)</strong>
                                <p className="text-slate-400 text-xs">Initialized by sampling pixel colors from original images that "see" that point.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
          },
          {
              id: "7.3",
              title: "Dataset Requirements",
              content: (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                      <h5 className="font-bold text-white mb-4 flex items-center gap-2">Capture Checklist</h5>
                      <ul className="space-y-3 text-sm text-slate-300">
                          <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Visual Coverage:</strong> Capture images from all angles. If you didn't photograph the back, it won't exist in 3D.</span>
                          </li>
                          <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Static Scene:</strong> Nothing should move during capture. Shadows or moving objects will confuse SfM.</span>
                          </li>
                           <li className="flex items-start gap-2">
                              <div className="min-w-[6px] h-[6px] rounded-full bg-indigo-500 mt-1.5"></div>
                              <span><strong>Fixed Lighting:</strong> Avoid auto-exposure or white balance changes in the camera if possible.</span>
                          </li>
                      </ul>
                      <div className="mt-4 p-3 bg-indigo-900/20 rounded border border-indigo-500/20 text-xs italic text-indigo-200">
                         "Think of SfM as building the skeleton of a house. 3DGS will then come to put the bricks and paint (the Gaussians) onto that structure."
                      </div>
                  </div>
              )
          }
        ]
      },
      {
        id: "8",
        title: "8. Optimization (Training)",
        subsections: [
          {
             id: "8.0",
             title: "Introduction",
             content: (
                 <p className="text-slate-300 italic mb-6">
                     The Optimization phase is the "learning" of the scene. It iteratively adjusts millions of parameters so that Gaussian projections match the training images.
                 </p>
             )
          },
          {
            id: "8.1",
            title: "Stochastic Gradient Descent (SGD)",
            content: (
                <div className="space-y-6">
                    <p className="text-slate-300">
                        The goal is to minimize the discrepancy between the rendered and real image. 3DGS uses the <strong>Adam</strong> optimizer to adjust the 4 sets of parameters for each Gaussian: Position (μ), Covariance (Σ), Color (c), and Opacity (α).
                    </p>
                    
                    <OptimizationDemo lang="en" />

                    <div className="bg-slate-900 p-4 rounded border border-slate-700 text-sm text-slate-400">
                        <strong>Technical Note:</strong> Activation functions are used to maintain valid values (e.g., Sigmoid for opacity in range [0,1]).
                    </div>
                </div>
            )
          },
          {
             id: "8.2",
             title: "Loss Function",
             content: (
                 <div className="space-y-6">
                     <p className="text-slate-300">
                         Visual quality is due to a composite loss function that combines color accuracy and structure.
                     </p>
                     
                     <LossDemo lang="en" />
                     
                     <div className="grid md:grid-cols-2 gap-4 text-sm">
                         <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                             <strong className="block text-indigo-400 mb-2">L1 Loss (Absolute Error)</strong>
                             <p className="text-slate-400">Measures direct RGB color difference. Ensures chromatic accuracy but can be blurry on its own.</p>
                         </div>
                         <div className="bg-slate-800 p-4 rounded border-l-4 border-pink-500">
                             <strong className="block text-pink-400 mb-2">D-SSIM (Structure)</strong>
                             <p className="text-slate-400">Structural Similarity Measure. Critical to avoid blurry artifacts and maintain perceptual sharpness.</p>
                         </div>
                     </div>
                 </div>
             )
          },
          {
              id: "8.3",
              title: "Gradient Calculation (Backward Pass)",
              content: (
                  <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-800">
                      <h4 className="font-bold text-white mb-3">How does it learn? (Differentiability)</h4>
                      <p className="text-slate-300 text-sm mb-4">
                          The key to 3DGS is that the entire rasterization pipeline is <strong>differentiable</strong>. This allows the calculated image error (Loss) to propagate backwards (Backward Pass) to each Gaussian.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-400 list-disc pl-5">
                          <li><strong>Differentiable Rasterizer:</strong> Specifically designed to allow an efficient backward pass.</li>
                          <li><strong>Explicit Gradients:</strong> Authors manually derived gradient math to avoid the slowness of automatic differentiation.</li>
                          <li><strong>Unlimited:</strong> Unlike older methods, the gradient flows through an unlimited number of overlapping Gaussians, allowing stable optimization.</li>
                      </ul>
                  </div>
              )
          }
        ]
      },
      {
        id: "9",
        title: "9. Adaptive Density Control (ADC)",
        subsections: [
          {
            id: "9.1",
            title: "Refining Geometry",
            content: (
              <div>
                <p className="mb-4">
                  Magic happens here. If a region has high error, the system decides: Do I need more small Gaussians here (Split)? Or do I need to fill a hole (Clone)?
                </p>
                <div className="my-8">
                   <h4 className="text-xl font-bold text-emerald-400 mb-4">Densification Simulator</h4>
                   <p className="text-sm text-slate-400 mb-4">Click buttons to simulate how the algorithm decides to split or clone Gaussians based on error gradient.</p>
                   <DensityDemo lang="en" />
                </div>
              </div>
            )
          },
          {
            id: "9.2",
            title: "Pruning Strategies",
            content: (
              <div className="space-y-6">
                 <p className="text-slate-300">
                   Pruning is essential to reduce overhead caused by storing and processing redundant or unnecessary primitives. The original 3DGS pruning mechanism is based on two main criteria, executed periodically (e.g., every 100 iterations):
                 </p>
                 
                 <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                        <strong className="block text-indigo-400 mb-2">1. Opacity Pruning</strong>
                        <p className="text-sm text-slate-400 mb-2">Removes Gaussians that are essentially transparent and have a negligible contribution.</p>
                        <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                            <li><strong>Criterion:</strong> If opacity (α) drops below a threshold <span className="font-mono">ϵ = 0.005</span>.</li>
                            <li><strong>Reset:</strong> Every 3000 steps, opacity of <em>all</em> Gaussians is reduced to force them to "fight" for existence, eliminating those no longer useful.</li>
                        </ul>
                    </div>
                    <div className="bg-slate-800 p-4 rounded border-l-4 border-pink-500">
                        <strong className="block text-pink-400 mb-2">2. Size Pruning</strong>
                        <p className="text-sm text-slate-400 mb-2">Removes Gaussians that are excessively large for the scene.</p>
                         <ul className="list-disc pl-4 text-xs text-slate-500 space-y-1">
                            <li><strong>Criterion:</strong> If max scale exceeds a percentage of the scene (e.g., 10%).</li>
                            <li><strong>Issue:</strong> Removing a large Gaussian can cause many small ones to appear to fill the hole, sometimes increasing memory usage.</li>
                        </ul>
                    </div>
                 </div>

                 <PruningDemo lang="en" />
              </div>
            )
          },
          {
            id: "9.5",
            title: "Advanced ADC Improvements",
            content: (
              <div className="space-y-8">
                 <p className="text-slate-300">
                    Subsequent research has proposed modifications to the original ADC to improve stability, accelerate convergence, and optimize compactness.
                 </p>

                 {/* A. Rising Gradient */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">A. Exponential Rising Gradient Threshold</h4>
                    <p className="text-slate-400 text-sm mb-4">
                       A fixed threshold is not optimal. At the start, we need many Gaussians (low threshold), but at the end, we want to avoid overfitting (high threshold).
                    </p>
                    <div className="flex gap-4 items-center bg-slate-950 p-3 rounded">
                       <div className="flex-1">
                           <span className="block text-xs font-bold text-emerald-400 mb-1">Start (T_start)</span>
                           <p className="text-xs text-slate-500">Low value (0.0001) for fast growth and structure building.</p>
                       </div>
                       <div className="text-slate-600">→</div>
                       <div className="flex-1">
                           <span className="block text-xs font-bold text-emerald-400 mb-1">End (T_end)</span>
                           <p className="text-xs text-slate-500">High value (0.0004) to refine only serious errors and prevent excess primitives.</p>
                       </div>
                    </div>
                 </div>

                 {/* B. Significance Aware */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">B. Significance-aware Pruning</h4>
                    <p className="text-slate-400 text-sm mb-3">
                       Critiques simple opacity pruning. A Gaussian might have low opacity but be visually significant (e.g., background).
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300 list-decimal pl-5">
                       <li>Calculates actual contribution to the pixel (blending weight).</li>
                       <li>Accumulates this contribution across all views.</li>
                       <li>Only prunes if <strong>accumulated contribution</strong> is low, protecting subtle background details.</li>
                    </ul>
                 </div>

                 {/* C. PixelGS */}
                 <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-3">C. Pixel-Aware Densification (PixelGS)</h4>
                    <p className="text-slate-400 text-sm mb-3">
                       Prevents large background Gaussians from splitting unnecessarily just because they have a high gradient.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-800 p-2 rounded">
                            <strong className="block text-indigo-400">Pixel Counting</strong>
                            Divides gradient by the number of covered pixels. Large Gaussians = Lower relative gradient.
                        </div>
                        <div className="bg-slate-800 p-2 rounded">
                            <strong className="block text-indigo-400">Depth Scaling</strong>
                            Reduces densification in the foreground and encourages it in the background where detail is needed.
                        </div>
                    </div>
                 </div>
              </div>
            )
          }
        ]
      },
      {
        id: "10",
        title: "10. Dynamic Scenes (4DGS)",
        subsections: [
          {
            id: "10.0",
            title: "Introduction",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  The extension of 3D Gaussian Splatting (3DGS) to the domain of motion and time is known as <strong>Dynamic 3D Gaussian Splatting</strong> or, commonly, <strong>4D Gaussian Splatting (4DGS)</strong>. This field seeks to capture and render temporally changing scenes, such as moving people, volumetric videos, or dynamic urban environments.
                </p>
                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-lg">
                  <p className="text-sm text-indigo-200">
                    The development of 4DGS is one of the key research directions that emerged after the original 3DGS paper, transforming it from a static scene capture method to one capable of handling volumetric video.
                  </p>
                </div>
              </div>
            )
          },
          {
            id: "10.1",
            title: "Spatio-Temporal Representation",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  To model the moving scene, 4DGS introduces a fourth dimension, time (t), alongside spatial coordinates (x,y,z). There are two main approaches:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-2 text-sm">1. Implicit Deformation Modeling (Deep Learning)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Uses neural networks to predict variations in the base Gaussian parameters for each moment in time. 
                      <br/><br/>
                      <span className="text-red-400">Disadvantage:</span> Computationally expensive, requires network queries for every Gaussian.
                    </p>
                  </div>
                  <div className="bg-slate-900 border border-slate-700 p-5 rounded-lg">
                    <h4 className="font-bold text-white mb-2 text-sm">2. Explicit 4D Representation (Hyperspheres)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Extends the 3D Gaussian to a <strong>4D Gaussian</strong> (hypersphere) with a 4D covariance matrix (Σ4D) and 4D mean (μ4D).
                      <br/><br/>
                      <span className="text-indigo-400">Detail:</span> Methods like Rotor4DGS use rotors to characterize complex 4D rotations.
                    </p>
                  </div>
                </div>

                <Dynamic4DDemo lang="en" />
              </div>
            )
          },
          {
            id: "10.2",
            title: "Technical Challenges",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">Extending 3DGS to dynamics poses three major challenges:</p>
                <ul className="space-y-3 list-disc pl-5 text-sm text-slate-300">
                  <li><strong>Temporal Coherence:</strong> Primitives must persist and maintain identity, rather than "flickering" or being recreated every frame.</li>
                  <li><strong>Real-Time Rendering:</strong> Reconstruction must not collapse performance.</li>
                  <li><strong>Scalability:</strong> File size should not grow exponentially for long videos.</li>
                </ul>

                <div className="bg-slate-800 p-4 rounded border-l-4 border-amber-500">
                  <h5 className="font-bold text-white mb-2">The "Slicing-First" Bottleneck</h5>
                  <p className="text-sm text-slate-400">
                    Many methods require "slicing" the 4D Gaussian into a static 3D one for each instant before rendering. This forces repeating expensive calculations every time time changes.
                  </p>
                </div>
              </div>
            )
          },
          {
            id: "10.3",
            title: "Implementations & Advances (Key Papers)",
            content: (
              <div className="space-y-8">
                {/* Disentangled4DGS */}
                <div className="bg-indigo-900/10 border border-indigo-500/30 p-5 rounded-lg">
                  <h4 className="text-lg font-bold text-indigo-400 mb-2">Disentangled 4D Gaussian Splatting</h4>
                  <p className="text-sm text-slate-300 mb-4">
                    Addresses the "slicing-first" inefficiency by separating temporal variables from spatial ones.
                  </p>
                  <ul className="grid grid-cols-1 gap-2 text-xs text-slate-400">
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> "Projection-First" Pipeline: Postpones temporal processing for higher speed.</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Record Performance: 343 FPS at 1352×1014 resolution (RTX 3090).</li>
                     <li className="flex items-center gap-2"><div className="w-1 h-1 bg-indigo-500 rounded-full"></div> Storage reduced by 4.5% vs full 4D matrices.</li>
                  </ul>
                </div>

                {/* Others */}
                <div className="space-y-4">
                   <h5 className="font-bold text-white border-b border-slate-800 pb-2">Other Notable Methods</h5>
                   <ul className="space-y-3 text-sm text-slate-300">
                      <li><strong>Dynamic 3D Gaussians (Luiten et al.):</strong> Emphasizes Gaussians having persistent identity (constant color/opacity) and only moving rigidly.</li>
                      <li><strong>Rotor4DGS (Duan et al.):</strong> Uses 4D rotors to handle complex rotations, reaching ~277 FPS.</li>
                   </ul>
                </div>

                {/* Use Cases */}
                <div className="bg-slate-900 p-5 rounded-lg border border-slate-700">
                   <h5 className="font-bold text-emerald-400 mb-4">Unlocked Use Cases</h5>
                   <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                      <div>• Virtual Production & VFX (Film)</div>
                      <div>• Autonomous Driving Simulators (VAD-GS)</div>
                      <div>• Large-scale Digital Twins</div>
                      <div>• Text-to-4D Generation (Generative AI)</div>
                      <div>• High-speed Virtual Reality (VR)</div>
                      <div>• Volumetric Video Compression</div>
                   </div>
                </div>
              </div>
            )
          }
        ]
      },
      {
        id: "11",
        title: "11. Compression & Optimization",
        subsections: [
          {
            id: "11.1",
            title: "The VRAM Bottleneck",
            content: (
              <div className="space-y-6">
                <p className="text-slate-300">
                  The primary challenge of 3DGS is its high Video Memory (VRAM) consumption. Explicitly representing millions of primitives with complex parameters (SH) can occupy gigabytes of memory.
                </p>

                <CompressionDemo lang="en" />

                <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
                   <div className="bg-slate-900 p-4 rounded border border-slate-700">
                      <strong className="block text-indigo-400 mb-2">Static VRAM</strong>
                      <p className="text-slate-400 text-xs">Parameters stored on disk/memory (position, covariance, color). ~800MB for large scenes.</p>
                   </div>
                   <div className="bg-slate-900 p-4 rounded border border-slate-700">
                      <strong className="block text-pink-400 mb-2">Dynamic VRAM</strong>
                      <p className="text-slate-400 text-xs">Memory used during rendering (sorting, 2D projection). Disk compression techniques do not always reduce this.</p>
                   </div>
                </div>
              </div>
            )
          },
          {
            id: "11.2",
            title: "Compression Strategies",
            content: (
              <div className="space-y-4">
                 <h5 className="text-white font-bold">1. ProtoGS (SfM Anchoring)</h5>
                 <p className="text-sm text-slate-400">
                    Reduces the number of Gaussians by grouping redundant primitives into "prototypes". Uses SfM points as anchors to partition the scene and apply clustering, drastically reducing the total number of primitives.
                 </p>

                 <h5 className="text-white font-bold mt-4">2. Quantization & Learned Priors</h5>
                 <p className="text-sm text-slate-400">
                    Methods like <strong>EAGLES</strong> or <strong>CompactGaussian</strong> use "codebooks" to compress parameters.
                    <br/>
                    <span className="text-amber-400 text-xs">Warning:</span> Although they reduce disk size, the GPU often must decode them completely before rendering, so the runtime VRAM saving is smaller.
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
                     Replacing expensive Spherical Harmonics (SH) with <strong>Spherical Gaussians (SG)</strong> is one of the most effective optimizations.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
                     <li><strong>Compact:</strong> A 3-lobe SG uses half the memory of a degree-3 SH.</li>
                     <li><strong>No Decoding:</strong> Unlike quantization, SGs can be rendered directly, saving actual VRAM.</li>
                     <li><strong>Unified Pruning:</strong> MEGS² jointly optimizes Gaussian removal and color parameter simplification.</li>
                  </ul>
               </div>
             )
          },
          {
             id: "11.4",
             title: "Training Optimization (BOGausS)",
             content: (
                <div className="space-y-4">
                   <p className="text-slate-300">
                      Training smarter to generate less junk from the start.
                   </p>
                   
                   <div className="bg-slate-800 p-4 rounded border-l-4 border-emerald-500">
                      <strong className="block text-emerald-400 mb-2">Exponential Rising Gradient Threshold</strong>
                      <p className="text-sm text-slate-400">
                         Instead of a fixed threshold for densification, BOGausS starts low (0.0001) to learn structure fast, and raises it exponentially (0.0004) to avoid creating millions of unnecessary Gaussians at the end.
                      </p>
                   </div>

                   <div className="bg-slate-800 p-4 rounded border-l-4 border-indigo-500">
                      <strong className="block text-indigo-400 mb-2">Significance-aware Pruning</strong>
                      <p className="text-sm text-slate-400">
                         Don't delete just because of low opacity. If a Gaussian is transparent but covers a large part of the background (high accumulated contribution), it's important. This method preserves backgrounds better than traditional pruning.
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
    title: "Part V: Practice",
    description: "Tools, Viewers, and Applications.",
    sections: [
      {
        id: "14",
        title: "14. Tools",
        subsections: [
          {
            id: "14.1",
            title: "Ecosystem",
            content: (
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Luma AI / Polycam:</strong> Mobile apps to capture and train in the cloud.</li>
                <li><strong className="text-white">gSplat (NerfStudio):</strong> Open-source library for researchers.</li>
                <li><strong className="text-white">SuperSplat / Viser:</strong> Web viewers for .ply files.</li>
              </ul>
            )
          }
        ]
      },
      {
        id: "15",
        title: "15. PLY Format",
        subsections: [
          {
            id: "15.1",
            title: "Exchange Standard",
            content: "The PLY file contains a flat list of vertices. Each vertex has custom properties: f_dc (color base), f_rest (SH coefs), opacity, scale, rot."
          }
        ]
      }
    ]
  }
];
