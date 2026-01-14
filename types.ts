
export interface Memory {
  id: string;
  imageUrl: string;
  note: string;
  location: string;
  date: string;
  title: string;
  createdAt: number;
}

// Fix: Exporting WishBranch interface for use in PeachTree and WishDetailModal components
export interface WishBranch {
  id: string;
  imageUrl: string;
  greeting: string;
  author: string;
  createdAt: number;
}

export enum AppStage {
  INTRO = 'INTRO',
  VOYAGER = 'VOYAGER'
}

export type ThemeType = 'deep-space' | 'sakura' | 'matrix' | 'supernova';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  color: string;
  secondary: string;
  bgClass: string;
}
