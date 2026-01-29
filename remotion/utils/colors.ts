export const COLORS = {
  // Primary gradient stops
  gradientOrange: "#f97316", // orange-400
  gradientBlue: "#3b82f6", // blue-500
  gradientBlueDark: "#2563eb", // blue-600

  // Accents
  accent: "#fdba74", // orange-300

  // Text
  textPrimary: "rgba(255, 255, 255, 1)",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  textTertiary: "rgba(255, 255, 255, 0.7)",
  textMuted: "rgba(255, 255, 255, 0.6)",

  // Background
  background: "#2563eb", // blue-600
} as const;

// Module-specific colors for demo video
export const MODULE_COLORS = {
  projectManagement: {
    primary: "#f97316", // Orange
    secondary: "#fdba74", // Light orange
    accent: "#ea580c", // Dark orange
  },
  versionControl: {
    primary: "#3b82f6", // Blue
    secondary: "#93c5fd", // Light blue
    accent: "#2563eb", // Dark blue
  },
  stakeholderManagement: {
    primary: "#8b5cf6", // Purple
    secondary: "#c4b5fd", // Light purple
    accent: "#7c3aed", // Dark purple
  },
} as const;

// Status colors for mockups
export const STATUS_COLORS = {
  backlog: "#6b7280", // Gray
  inProgress: "#f97316", // Orange
  review: "#3b82f6", // Blue
  done: "#22c55e", // Green
  approved: "#22c55e", // Green
  pending: "#eab308", // Yellow
} as const;
