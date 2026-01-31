import type {
  Priority,
  RequirementStatus,
  TaskStatus,
  ViewType,
} from "./types";

// Brand colors matching the design system
export const COLORS = {
  // Primary gradient stops
  orange: "#f97316",
  orangeLight: "#fdba74",
  orangeDark: "#ea580c",
  blue: "#3b82f6",
  blueLight: "#93c5fd",
  blueDark: "#2563eb",
  purple: "#8b5cf6",
  purpleLight: "#c4b5fd",
  purpleDark: "#7c3aed",
  green: "#22c55e",
  greenLight: "#86efac",
  red: "#ef4444",
  redLight: "#fca5a5",
  yellow: "#eab308",
  yellowLight: "#fde047",
  gray: "#6b7280",
  grayLight: "#9ca3af",
} as const;

// Task status colors and labels
export const TASK_STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: string; bgColor: string }
> = {
  backlog: {
    label: "Backlog",
    color: COLORS.gray,
    bgColor: "rgba(107, 114, 128, 0.2)",
  },
  todo: {
    label: "To Do",
    color: COLORS.yellow,
    bgColor: "rgba(234, 179, 8, 0.2)",
  },
  inProgress: {
    label: "In Progress",
    color: COLORS.orange,
    bgColor: "rgba(249, 115, 22, 0.2)",
  },
  review: {
    label: "Review",
    color: COLORS.blue,
    bgColor: "rgba(59, 130, 246, 0.2)",
  },
  done: {
    label: "Done",
    color: COLORS.green,
    bgColor: "rgba(34, 197, 94, 0.2)",
  },
};

// Requirement status colors and labels
export const REQUIREMENT_STATUS_CONFIG: Record<
  RequirementStatus,
  { label: string; color: string; bgColor: string }
> = {
  draft: {
    label: "Draft",
    color: COLORS.gray,
    bgColor: "rgba(107, 114, 128, 0.2)",
  },
  pending: {
    label: "Pending",
    color: COLORS.yellow,
    bgColor: "rgba(234, 179, 8, 0.2)",
  },
  approved: {
    label: "Approved",
    color: COLORS.green,
    bgColor: "rgba(34, 197, 94, 0.2)",
  },
  inProgress: {
    label: "In Progress",
    color: COLORS.orange,
    bgColor: "rgba(249, 115, 22, 0.2)",
  },
  completed: {
    label: "Completed",
    color: COLORS.blue,
    bgColor: "rgba(59, 130, 246, 0.2)",
  },
};

// Priority colors and labels
export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string; bgColor: string }
> = {
  urgent: {
    label: "Urgent",
    color: COLORS.red,
    bgColor: "rgba(239, 68, 68, 0.2)",
  },
  high: {
    label: "High",
    color: COLORS.orange,
    bgColor: "rgba(249, 115, 22, 0.2)",
  },
  medium: {
    label: "Medium",
    color: COLORS.yellow,
    bgColor: "rgba(234, 179, 8, 0.2)",
  },
  low: {
    label: "Low",
    color: COLORS.gray,
    bgColor: "rgba(107, 114, 128, 0.2)",
  },
};

// Person type colors
export const PERSON_TYPE_COLORS = {
  stakeholder: COLORS.purple,
  executor: COLORS.blue,
} as const;

// Company colors for visual distinction (can be extended)
export const COMPANY_COLORS: Record<string, string> = {
  "Acme Corp": COLORS.orange,
  TechStart: COLORS.blue,
  DataFlow: COLORS.purple,
};

// View configuration
export const VIEW_CONFIG: Record<
  ViewType,
  { label: string; icon: string; description: string }
> = {
  dashboard: {
    label: "Dashboard",
    icon: "LayoutDashboard",
    description: "Overview and activity",
  },
  tasks: {
    label: "Tasks",
    icon: "ClipboardList",
    description: "Kanban task board",
  },
  people: {
    label: "People",
    icon: "Users",
    description: "Stakeholders & executors",
  },
  requirements: {
    label: "Requirements",
    icon: "FileText",
    description: "Stakeholder requirements",
  },
};

// Kanban column order
export const KANBAN_COLUMNS: TaskStatus[] = [
  "backlog",
  "todo",
  "inProgress",
  "review",
  "done",
];

// localStorage key
export const STORAGE_KEY = "heliograph-demo-state";
export const STORAGE_VERSION = 1;
