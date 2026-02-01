import { MODULE_COLORS } from "../utils/colors";

// ============================================================
// Type Definitions
// ============================================================

export type Project = {
  id: string;
  name: string;
  client: string;
  status: "active" | "onboarding" | "completed";
  color: string;
  stakeholderCount: number;
  personaCount: number;
};

export type Person = {
  id: string;
  type: "individual";
  name: string;
  role: string;
  company: string;
  avatar: string;
  status: "active" | "pending" | "inactive";
};

export type Persona = {
  id: string;
  type: "persona";
  name: string;
  description: string;
  icon: "code" | "shield" | "chart" | "users";
  userCount: number;
};

export type Stakeholder = Person | Persona;

export type Requirement = {
  id: string;
  title: string;
  description: string;
  status: "approved" | "inProgress" | "pending" | "blocked";
  priority: "high" | "medium" | "low";
  linkedTo: string;
  dueDate?: string;
};

export type MeetingNote = {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  summary: string;
  actionItems: number;
};

export type Issue = {
  id: string;
  title: string;
  status: "open" | "resolved" | "blocked";
  priority: "critical" | "high" | "medium" | "low";
  linkedTo: string;
  createdDate: string;
};

export type Callout = {
  id: string;
  text: string;
  position: { x: number; y: number };
  pointTo?: { x: number; y: number };
  appearAt: number;
  duration: number;
};

// ============================================================
// Sample Data: Projects
// ============================================================

export const PROJECTS: Project[] = [
  {
    id: "acme-platform",
    name: "Acme Platform Migration",
    client: "Acme Corp",
    status: "active",
    color: MODULE_COLORS.projectManagement.primary, // Orange
    stakeholderCount: 2,
    personaCount: 3,
  },
  {
    id: "techstart-api",
    name: "TechStart API Integration",
    client: "TechStart",
    status: "active",
    color: MODULE_COLORS.versionControl.primary, // Blue
    stakeholderCount: 2,
    personaCount: 2,
  },
  {
    id: "dataflow-analytics",
    name: "DataFlow Analytics Suite",
    client: "DataFlow",
    status: "onboarding",
    color: MODULE_COLORS.stakeholderManagement.primary, // Purple
    stakeholderCount: 3,
    personaCount: 4,
  },
];

// ============================================================
// Sample Data: Stakeholders for Acme Project
// ============================================================

export const ACME_INDIVIDUALS: Person[] = [
  {
    id: "sarah",
    type: "individual",
    name: "Sarah Chen",
    role: "CTO",
    company: "Acme Corp",
    avatar: "SC",
    status: "active",
  },
  {
    id: "david",
    type: "individual",
    name: "David Kim",
    role: "Engineering Manager",
    company: "Acme Corp",
    avatar: "DK",
    status: "active",
  },
];

export const ACME_PERSONAS: Persona[] = [
  {
    id: "developer",
    type: "persona",
    name: "Developer",
    description: "Internal platform developers",
    icon: "code",
    userCount: 50,
  },
  {
    id: "security-admin",
    type: "persona",
    name: "Security Admin",
    description: "Security & compliance team",
    icon: "shield",
    userCount: 5,
  },
  {
    id: "data-analyst",
    type: "persona",
    name: "Data Analyst",
    description: "Business intelligence team",
    icon: "chart",
    userCount: 20,
  },
];

export const ACME_STAKEHOLDERS: Stakeholder[] = [
  ...ACME_INDIVIDUALS,
  ...ACME_PERSONAS,
];

// ============================================================
// Sample Data: Requirements (linked to Developer persona)
// ============================================================

export const DEVELOPER_REQUIREMENTS: Requirement[] = [
  {
    id: "req-1",
    title: "API Documentation Portal",
    description: "Interactive API docs with code examples and testing sandbox",
    status: "approved",
    priority: "high",
    linkedTo: "developer",
    dueDate: "Q1 2024",
  },
  {
    id: "req-2",
    title: "SDK for JavaScript/TypeScript",
    description: "Type-safe SDK with autocomplete support for modern IDEs",
    status: "inProgress",
    priority: "high",
    linkedTo: "developer",
    dueDate: "Q2 2024",
  },
  {
    id: "req-3",
    title: "Webhook Event System",
    description: "Real-time notifications for platform events via webhooks",
    status: "pending",
    priority: "medium",
    linkedTo: "developer",
  },
  {
    id: "req-4",
    title: "Local Development Environment",
    description: "Docker-based local setup mirroring production",
    status: "inProgress",
    priority: "medium",
    linkedTo: "developer",
    dueDate: "Q2 2024",
  },
];

// ============================================================
// Sample Data: Meeting Notes
// ============================================================

export const DEVELOPER_MEETINGS: MeetingNote[] = [
  {
    id: "meeting-1",
    title: "API Design Review",
    date: "Jan 15, 2024",
    attendees: ["sarah", "david"],
    summary:
      "Reviewed REST vs GraphQL approaches. Decided on REST with optional GraphQL gateway.",
    actionItems: 3,
  },
  {
    id: "meeting-2",
    title: "SDK Architecture Discussion",
    date: "Jan 22, 2024",
    attendees: ["david"],
    summary:
      "Discussed code generation strategy and versioning approach for the TypeScript SDK.",
    actionItems: 2,
  },
  {
    id: "meeting-3",
    title: "Developer Experience Feedback",
    date: "Jan 29, 2024",
    attendees: ["sarah", "david"],
    summary:
      "Gathered feedback from internal devs. Top requests: better error messages, faster iteration cycles.",
    actionItems: 5,
  },
];

// ============================================================
// Sample Data: Issues
// ============================================================

export const DEVELOPER_ISSUES: Issue[] = [
  {
    id: "issue-1",
    title: "Rate limiting causing CI failures",
    status: "open",
    priority: "critical",
    linkedTo: "developer",
    createdDate: "Jan 28, 2024",
  },
  {
    id: "issue-2",
    title: "Inconsistent error response formats",
    status: "resolved",
    priority: "high",
    linkedTo: "developer",
    createdDate: "Jan 20, 2024",
  },
  {
    id: "issue-3",
    title: "Missing pagination on list endpoints",
    status: "open",
    priority: "medium",
    linkedTo: "developer",
    createdDate: "Jan 25, 2024",
  },
  {
    id: "issue-4",
    title: "Auth token expiry not documented",
    status: "blocked",
    priority: "high",
    linkedTo: "developer",
    createdDate: "Jan 18, 2024",
  },
];

// ============================================================
// Callout Data with Timing (legacy - kept for reference)
// ============================================================

export const CALLOUTS: Callout[] = [
  {
    id: "c1",
    text: "Track multiple client engagements in one place",
    position: { x: 72, y: 35 },
    appearAt: 75,
    duration: 94,
  },
  {
    id: "c2",
    text: "Individual stakeholders AND user personas",
    position: { x: 68, y: 42 },
    pointTo: { x: 22, y: 58 },
    appearAt: 188,
    duration: 94,
  },
  {
    id: "c3",
    text: "Requirements tracked per person or persona",
    position: { x: 75, y: 28 },
    appearAt: 281,
    duration: 69,
  },
  {
    id: "c4",
    text: "Never lose context from stakeholder meetings",
    position: { x: 72, y: 55 },
    appearAt: 331,
    duration: 69,
  },
  {
    id: "c5",
    text: "Track blockers and escalations by stakeholder",
    position: { x: 72, y: 38 },
    appearAt: 381,
    duration: 62,
  },
  {
    id: "c6",
    text: "Complete stakeholder visibility for Forward-Deployed Engineers",
    position: { x: 50, y: 82 },
    appearAt: 425,
    duration: 69,
  },
];

// ============================================================
// Feature Commentary Items (for left panel)
// ============================================================

export type FeatureItem = {
  id: string;
  text: string;
  subtext: string;
  appearAt: number;
};

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "f1",
    text: "Organize requirements by project",
    subtext:
      "Separate by customer, business unit, or product—with native hierarchy",
    appearAt: 75,
  },
  {
    id: "f2",
    text: "Assign stakeholders & personas",
    subtext: "Map requirements to executives and teams alike",
    appearAt: 150,
  },
  {
    id: "f3",
    text: "Capture stakeholder input",
    subtext: "Record requirements and decisions with full team visibility",
    appearAt: 225,
  },
  {
    id: "f4",
    text: "Link requirements to tasks",
    subtext: "Maintain context and traceability across projects",
    appearAt: 300,
  },
  {
    id: "f5",
    text: "Surface critical asks",
    subtext: "Automatically bubble up priorities to platform teams",
    appearAt: 375,
  },
];

// ============================================================
// Animation Timing Constants
// ============================================================

export const TIMING = {
  // Phase boundaries (scaled 1.25x for 15s duration)
  PHASE_1_END: 112, // Projects view ends
  PHASE_2_END: 225, // People/Personas view ends
  PHASE_3_END: 300, // Requirements tab ends
  PHASE_4_END: 350, // Tasks tab ends
  PHASE_5_END: 400, // Issues tab ends
  SCENE_END: 450,

  // Animation delays
  HEADER_DELAY: 25,
  CARD_STAGGER: 19,
  TRANSITION_DURATION: 25,

  // Key moments
  PROJECT_CLICK: 106,
  PERSONA_SELECT: 219,
  TAB_TASKS: 300,
  TAB_ISSUES: 350,
} as const;

// ============================================================
// Helper Functions
// ============================================================

export function getViewState(frame: number): "projects" | "people" | "detail" {
  if (frame < TIMING.PHASE_1_END) return "projects";
  if (frame < TIMING.PHASE_2_END) return "people";
  return "detail";
}

export function getActiveTab(
  frame: number,
): "requirements" | "tasks" | "issues" {
  if (frame < TIMING.TAB_TASKS) return "requirements";
  if (frame < TIMING.TAB_ISSUES) return "tasks";
  return "issues";
}

export function isPersona(stakeholder: Stakeholder): stakeholder is Persona {
  return stakeholder.type === "persona";
}

export function isPerson(stakeholder: Stakeholder): stakeholder is Person {
  return stakeholder.type === "individual";
}
