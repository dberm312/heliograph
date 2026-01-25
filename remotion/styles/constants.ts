// Design tokens matching globals.css

// Colors
export const COLORS = {
  // Background gradient
  backgroundOrange: '#fb923c', // orange-400
  backgroundBlue: '#3b82f6', // blue-500
  backgroundBlueDark: '#2563eb', // blue-600

  // Semantic colors
  edge: '#fb923c', // Warm orange for edge/custom/innovation
  core: '#3b82f6', // Cool blue for core/product/platform

  // Glows
  orangeGlow: 'rgba(251, 146, 60, 0.5)',
  blueGlow: 'rgba(59, 130, 246, 0.5)',

  // Glass morphism
  glassBg: 'rgba(255, 255, 255, 0.08)',
  glassBorder: 'rgba(255, 255, 255, 0.15)',
  glassHighlight: 'rgba(255, 255, 255, 0.25)',

  // Text
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textMuted: 'rgba(255, 255, 255, 0.6)',

  // Additional
  white: '#ffffff',
  black: '#000000',
} as const;

// Typography
export const FONTS = {
  display: "'Clash Display', system-ui, sans-serif",
  body: "'Satoshi', system-ui, sans-serif",
} as const;

export const FONT_SIZES = {
  hero: 120,
  heading1: 96,
  heading2: 72,
  heading3: 56,
  heading4: 48,
  body: 32,
  small: 24,
  caption: 18,
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// Spring configurations for Remotion
export const SPRING_CONFIGS = {
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 200 },
  bouncy: { damping: 8 },
  heavy: { damping: 15, stiffness: 80, mass: 2 },
  gentle: { damping: 30, stiffness: 100 },
} as const;

// Composition settings
export const COMPOSITION = {
  width: 1920,
  height: 1080,
  fps: 60,
  durationInFrames: 2400, // 40 seconds
} as const;

// Scene timing (in frames at 60fps)
export const SCENE_TIMING = {
  scene1: { start: 0, duration: 600 }, // 0-10s
  scene2: { start: 600, duration: 600 }, // 10-20s
  scene3: { start: 1200, duration: 900 }, // 20-35s
  scene4: { start: 2100, duration: 300 }, // 35-40s
  transitionDuration: 30, // 0.5s fade between scenes
} as const;

// Fontshare CSS imports for use in components
export const FONT_CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap');
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
`;
