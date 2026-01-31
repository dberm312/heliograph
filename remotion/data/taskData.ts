import { MODULE_COLORS } from "../utils/colors";
import type { FeatureItem } from "./stakeholderData";

// ============================================================
// Work Item Types (Hierarchical)
// ============================================================

export type WorkItemType = "epic" | "story" | "task";
export type AssigneeType = "human" | "ai_agent" | "team";

export type Assignee = {
  type: AssigneeType;
  name: string;
  initials: string;
  memberCount?: number; // For teams only
};

export type WorkItem = {
  id: string;
  type: WorkItemType;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate?: string;
  assignee?: Assignee;
  parentId?: string;
  depth: number; // 0=epic, 1=story, 2=task
  linkedRequirement?: {
    id: string;
    title: string;
    stakeholder: string;
  };
  stakeholder: {
    name: string;
    initials: string;
    company: string;
    role: string;
  };
};

// ============================================================
// Inbox Message Types
// ============================================================

export type InboxMessageType = "question" | "update" | "mention";

export type InboxMessage = {
  id: string;
  type: InboxMessageType;
  workItemId: string;
  workItemTitle: string;
  workItemType: WorkItemType;
  author: {
    name: string;
    initials: string;
    type: AssigneeType;
  };
  content: string;
  timestamp: string;
  isRead: boolean;
};

// ============================================================
// Feature Commentary Items for Task Management Scene
// ============================================================

export const TASK_FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "tf1",
    text: "Organize work hierarchically",
    subtext: "Break epics into stories and actionable tasks",
    appearAt: 56,
  },
  {
    id: "tf2",
    text: "Assign to people, teams, or AI",
    subtext: "Flexible assignment for any work style",
    appearAt: 131,
  },
  {
    id: "tf3",
    text: "Maintain context chain",
    subtext: "Every task links to its story and stakeholder ask",
    appearAt: 206,
  },
  {
    id: "tf4",
    text: "Collaborate in context",
    subtext: "Ask questions directly on work items",
    appearAt: 281,
  },
  {
    id: "tf5",
    text: "Track decisions at every level",
    subtext: "Complete audit trail from strategy to code",
    appearAt: 356,
  },
];

// ============================================================
// Task Scene Timing Constants
// ============================================================

export const TASK_TIMING = {
  // Phase boundaries (450 frames total at 30fps = 15 seconds)
  PHASE_1_END: 125, // Hierarchy list view
  PHASE_2_END: 225, // Task selected, detail view slides in
  PHASE_3_END: 350, // Detail view with activity
  PHASE_4_END: 425, // Inbox section visible
  SCENE_END: 450,

  // Animation delays
  HEADER_DELAY: 25,
  CARD_STAGGER: 12, // Slightly faster for more items
  TRANSITION_DURATION: 25,

  // Key moments
  TASK_CLICK: 125, // User clicks on a task
  ACTIVITY_START: 175, // Activity items start appearing
  INBOX_APPEAR: 225, // Inbox section slides in
  INBOX_MESSAGE_HIGHLIGHT: 275, // First message highlights
  TYPING_START: 325, // Comment typing animation starts
  LINKED_REQ_HIGHLIGHT: 375, // Highlight the linked requirement
} as const;

// ============================================================
// Enhanced Task Type with Requirement Link
// ============================================================

export type TaskWithContext = {
  id: string;
  title: string;
  description: string;
  stakeholder: {
    name: string;
    initials: string;
    company: string;
    role: string;
  };
  linkedRequirement: {
    id: string;
    title: string;
    stakeholder: string;
  };
  status: "todo" | "in_progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignee?: {
    type: "human" | "ai_agent";
    name: string;
    initials: string;
  };
};

// ============================================================
// Demo Tasks Data
// ============================================================

export const DEMO_TASKS: TaskWithContext[] = [
  {
    id: "1",
    title: "Implement SSO SAML endpoint",
    description:
      "Build the SAML authentication endpoint for enterprise SSO integration as requested by Sarah Chen.",
    stakeholder: {
      name: "Sarah Chen",
      initials: "SC",
      company: "Acme Corp",
      role: "CTO",
    },
    linkedRequirement: {
      id: "req-sso",
      title: "Enterprise SSO Integration",
      stakeholder: "Sarah Chen (CTO)",
    },
    status: "in_progress",
    priority: "high",
    dueDate: "Jan 15",
    assignee: {
      type: "human",
      name: "Alex Rivera",
      initials: "AR",
    },
  },
  {
    id: "2",
    title: "Write API documentation for v2 endpoints",
    description:
      "Complete OpenAPI spec and developer guides covering all new v2 API endpoints.",
    stakeholder: {
      name: "Marcus Johnson",
      initials: "MJ",
      company: "TechStart",
      role: "VP Engineering",
    },
    linkedRequirement: {
      id: "req-docs",
      title: "API Documentation Portal",
      stakeholder: "Developer Persona",
    },
    status: "todo",
    priority: "medium",
    dueDate: "Jan 18",
    assignee: {
      type: "ai_agent",
      name: "Claude Agent",
      initials: "AI",
    },
  },
  {
    id: "3",
    title: "Configure webhook event schema",
    description:
      "Define and implement webhook payload schemas for real-time notifications.",
    stakeholder: {
      name: "David Kim",
      initials: "DK",
      company: "Acme Corp",
      role: "Engineering Manager",
    },
    linkedRequirement: {
      id: "req-webhooks",
      title: "Webhook Event System",
      stakeholder: "Developer Persona",
    },
    status: "done",
    priority: "medium",
    dueDate: "Jan 10",
  },
];

// ============================================================
// Stakeholder Colors (for task assignee avatars)
// ============================================================

export const TASK_STAKEHOLDER_COLORS: Record<string, string> = {
  "Sarah Chen": MODULE_COLORS.projectManagement.primary,
  "Marcus Johnson": MODULE_COLORS.versionControl.primary,
  "David Kim": MODULE_COLORS.stakeholderManagement.primary,
  "Alex Rivera": MODULE_COLORS.projectManagement.primary,
};

// ============================================================
// Status Configuration
// ============================================================

export const TASK_STATUS_CONFIG = {
  todo: { label: "To Do", color: "#6b7280", bg: "rgba(107, 114, 128, 0.2)" },
  in_progress: {
    label: "In Progress",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.2)",
  },
  done: { label: "Done", color: "#10b981", bg: "rgba(16, 185, 129, 0.2)" },
} as const;

// ============================================================
// Work Item Type Configuration
// ============================================================

export const WORK_ITEM_TYPE_CONFIG = {
  epic: {
    label: "Epic",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.15)",
    icon: "E",
    indent: 0,
  },
  story: {
    label: "Story",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.15)",
    icon: "S",
    indent: 28,
  },
  task: {
    label: "Task",
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.15)",
    icon: "T",
    indent: 56,
  },
} as const;

// ============================================================
// Assignee Gradient Configuration
// ============================================================

export const ASSIGNEE_GRADIENTS = {
  human: (color: string) => `linear-gradient(135deg, ${color}, ${color}88)`,
  ai_agent: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
  team: "linear-gradient(135deg, #14b8a6, #22c55e)",
} as const;

// ============================================================
// Hierarchical Demo Work Items
// ============================================================

export const DEMO_WORK_ITEMS: WorkItem[] = [
  // Epic
  {
    id: "epic-1",
    type: "epic",
    title: "Enterprise Authentication System",
    description: "Complete overhaul of authentication for enterprise clients",
    status: "in_progress",
    priority: "high",
    depth: 0,
    assignee: {
      type: "team",
      name: "Platform Team",
      initials: "PT",
      memberCount: 5,
    },
    stakeholder: {
      name: "Sarah Chen",
      initials: "SC",
      company: "Acme Corp",
      role: "CTO",
    },
  },
  // Story 1 under Epic
  {
    id: "story-1",
    type: "story",
    title: "SSO Integration",
    description: "Implement single sign-on support for enterprise customers",
    status: "in_progress",
    priority: "high",
    depth: 1,
    parentId: "epic-1",
    assignee: {
      type: "human",
      name: "Sarah Chen",
      initials: "SC",
    },
    stakeholder: {
      name: "Sarah Chen",
      initials: "SC",
      company: "Acme Corp",
      role: "CTO",
    },
    linkedRequirement: {
      id: "req-sso",
      title: "Enterprise SSO Integration",
      stakeholder: "Sarah Chen (CTO)",
    },
  },
  // Task 1 under Story 1
  {
    id: "task-1",
    type: "task",
    title: "Implement SSO SAML endpoint",
    description: "Build the SAML authentication endpoint for enterprise SSO integration",
    status: "in_progress",
    priority: "high",
    dueDate: "Jan 15",
    depth: 2,
    parentId: "story-1",
    assignee: {
      type: "human",
      name: "Alex Rivera",
      initials: "AR",
    },
    stakeholder: {
      name: "Sarah Chen",
      initials: "SC",
      company: "Acme Corp",
      role: "CTO",
    },
    linkedRequirement: {
      id: "req-sso",
      title: "Enterprise SSO Integration",
      stakeholder: "Sarah Chen (CTO)",
    },
  },
  // Task 2 under Story 1
  {
    id: "task-2",
    type: "task",
    title: "Write SSO test suite",
    description: "Create comprehensive test coverage for SSO flows",
    status: "todo",
    priority: "medium",
    dueDate: "Jan 18",
    depth: 2,
    parentId: "story-1",
    assignee: {
      type: "ai_agent",
      name: "Claude Agent",
      initials: "AI",
    },
    stakeholder: {
      name: "Sarah Chen",
      initials: "SC",
      company: "Acme Corp",
      role: "CTO",
    },
    linkedRequirement: {
      id: "req-sso",
      title: "Enterprise SSO Integration",
      stakeholder: "Sarah Chen (CTO)",
    },
  },
  // Story 2 under Epic
  {
    id: "story-2",
    type: "story",
    title: "API Security",
    description: "Enhance API security with rate limiting and auth improvements",
    status: "in_progress",
    priority: "medium",
    depth: 1,
    parentId: "epic-1",
    assignee: {
      type: "team",
      name: "Security Team",
      initials: "ST",
      memberCount: 3,
    },
    stakeholder: {
      name: "David Kim",
      initials: "DK",
      company: "Acme Corp",
      role: "Engineering Manager",
    },
  },
  // Task 3 under Story 2
  {
    id: "task-3",
    type: "task",
    title: "Configure webhook auth",
    description: "Set up authentication for webhook endpoints",
    status: "done",
    priority: "medium",
    dueDate: "Jan 10",
    depth: 2,
    parentId: "story-2",
    assignee: {
      type: "human",
      name: "David Kim",
      initials: "DK",
    },
    stakeholder: {
      name: "David Kim",
      initials: "DK",
      company: "Acme Corp",
      role: "Engineering Manager",
    },
    linkedRequirement: {
      id: "req-webhooks",
      title: "Webhook Event System",
      stakeholder: "Developer Persona",
    },
  },
];

// ============================================================
// Demo Inbox Messages
// ============================================================

export const DEMO_INBOX_MESSAGES: InboxMessage[] = [
  {
    id: "msg-1",
    type: "question",
    workItemId: "task-1",
    workItemTitle: "Implement SSO SAML endpoint",
    workItemType: "task",
    author: {
      name: "Sarah Chen",
      initials: "SC",
      type: "human",
    },
    content: "Should we support both SAML 2.0 and OpenID Connect?",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "msg-2",
    type: "update",
    workItemId: "task-3",
    workItemTitle: "Configure webhook auth",
    workItemType: "task",
    author: {
      name: "David Kim",
      initials: "DK",
      type: "human",
    },
    content: "Schema validation complete, ready for review",
    timestamp: "4 hours ago",
    isRead: true,
  },
  {
    id: "msg-3",
    type: "mention",
    workItemId: "story-1",
    workItemTitle: "SSO Integration",
    workItemType: "story",
    author: {
      name: "Claude Agent",
      initials: "AI",
      type: "ai_agent",
    },
    content: "@team API docs need updating for new auth flow",
    timestamp: "Yesterday",
    isRead: false,
  },
];

// ============================================================
// Inbox Message Type Configuration
// ============================================================

export const INBOX_MESSAGE_TYPE_CONFIG = {
  question: {
    icon: "?",
    color: "#8b5cf6",
    bg: "rgba(139, 92, 246, 0.15)",
    label: "Question",
  },
  update: {
    icon: "↑",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.15)",
    label: "Update",
  },
  mention: {
    icon: "@",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.15)",
    label: "Mention",
  },
} as const;
