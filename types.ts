import React from 'react';

export type Language = 'es' | 'en';

export interface SubSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface Section {
  id: string;
  title: string;
  subsections: SubSection[];
}

export interface Part {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export enum DemoType {
  GAUSSIAN_MATH = 'GAUSSIAN_MATH',
  DENSITY_CONTROL = 'DENSITY_CONTROL',
  RASTERIZATION = 'RASTERIZATION',
  NONE = 'NONE'
}