import { MODULE_COLORS } from "../utils/colors";
import type { FeatureItem } from "./stakeholderData";

// ============================================================
// Type Definitions
// ============================================================

export type DocumentType = "code" | "notebook" | "presentation";

export type CodeLine = {
  text: string;
  highlight?: boolean;
};

export type CodeContent = {
  language: string;
  lines: CodeLine[];
};

export type NotebookCell = {
  type: "markdown" | "code";
  content: string;
  output?: string;
};

export type NotebookContent = {
  cells: NotebookCell[];
};

export type PresentationContent = {
  title: string;
  bullets: string[];
};

export type Document = {
  id: string;
  filename: string;
  type: DocumentType;
  extension: string;
  content: CodeContent | NotebookContent | PresentationContent;
  linkedCommit: string;
  linkedStakeholder: string;
};

export type LinkedTask = {
  id: string;
  title: string;
};

export type LinkedStakeholder = {
  name: string;
  initials: string;
  color: string;
};

export type Commit = {
  id: string;
  hash: string;
  message: string;
  position: number; // Y position as percentage (0-1)
  linkedTask?: LinkedTask;
  linkedStakeholder?: LinkedStakeholder;
  isCherryPickSource?: boolean;
  isCherryPickTarget?: boolean;
  isStackedDiff?: boolean;
};

export type Branch = {
  name: string;
  color: string;
  xOffset: number;
  project?: string;
  commits: Commit[];
};

// ============================================================
// Feature Commentary Items (for left panel)
// ============================================================

export const VC_FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "vc1",
    text: "Version any document type",
    subtext:
      "Code, notebooks, presentations, specs—all tracked with full history",
    appearAt: 56,
  },
  {
    id: "vc2",
    text: "Link commits to stakeholders",
    subtext: "Every change traces back to who asked for it and why",
    appearAt: 131,
  },
  {
    id: "vc3",
    text: "Cross-project visibility",
    subtext: "See how changes in one project relate to others",
    appearAt: 206,
  },
  {
    id: "vc4",
    text: "Stack diffs for review",
    subtext: "Group related changes for cleaner code review workflows",
    appearAt: 281,
  },
  {
    id: "vc5",
    text: "Promote to core",
    subtext: "Cherry-pick client wins back to the main platform",
    appearAt: 356,
  },
];

// ============================================================
// Sample Documents
// ============================================================

export const DEMO_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    filename: "auth_handler.py",
    type: "code",
    extension: ".py",
    content: {
      language: "python",
      lines: [
        { text: "class SSOHandler:" },
        { text: "    def authenticate(self, token):" },
        { text: "        # SAML 2.0 validation", highlight: true },
        { text: "        claims = self.validate_saml(token)", highlight: true },
        { text: "        return self.create_session(claims)" },
        { text: "" },
        { text: "    def validate_saml(self, token):" },
        { text: '        """Validate SAML assertion"""' },
        { text: "        return self.parser.parse(token)" },
      ],
    } as CodeContent,
    linkedCommit: "c3",
    linkedStakeholder: "Sarah Chen",
  },
  {
    id: "doc-2",
    filename: "analysis.ipynb",
    type: "notebook",
    extension: ".ipynb",
    content: {
      cells: [
        { type: "markdown", content: "# Performance Analysis" },
        {
          type: "code",
          content: "df = pd.read_csv('metrics.csv')",
          output: "Loading 1,247 rows...",
        },
        {
          type: "code",
          content: "df.groupby('client').mean()",
          output: "        latency   throughput\nacme      45.2      1250\ntechstart 38.7      1480",
        },
      ],
    } as NotebookContent,
    linkedCommit: "c5",
    linkedStakeholder: "Data Analyst",
  },
  {
    id: "doc-3",
    filename: "Q1_Roadmap.pptx",
    type: "presentation",
    extension: ".pptx",
    content: {
      title: "Q1 2024 Roadmap",
      bullets: [
        "Enterprise SSO rollout",
        "API v2 migration",
        "Performance optimization",
        "Client customization framework",
      ],
    } as PresentationContent,
    linkedCommit: "m2",
    linkedStakeholder: "David Kim",
  },
];

// ============================================================
// Branches and Commits
// ============================================================

export const VC_BRANCHES: Branch[] = [
  {
    name: "main",
    color: MODULE_COLORS.versionControl.primary, // Blue
    xOffset: 0,
    commits: [
      {
        id: "m1",
        hash: "a1b2c3d",
        message: "Initial release",
        position: 0.08,
      },
      {
        id: "m2",
        hash: "d4e5f6g",
        message: "Core auth system",
        position: 0.22,
        linkedStakeholder: {
          name: "David Kim",
          initials: "DK",
          color: MODULE_COLORS.stakeholderManagement.primary,
        },
      },
      {
        id: "m3",
        hash: "h7i8j9k",
        message: "API v2 base",
        position: 0.42,
      },
      {
        id: "m4",
        hash: "l0m1n2o",
        message: "Performance fixes",
        position: 0.58,
        isCherryPickTarget: true,
      },
      {
        id: "m5",
        hash: "p3q4r5s",
        message: "Batch processing",
        position: 0.78,
      },
    ],
  },
  {
    name: "acme-corp-v2",
    color: "#10b981", // Green
    xOffset: 60,
    project: "Acme Corp",
    commits: [
      {
        id: "c1",
        hash: "x1y2z3a",
        message: "Custom SSO flow",
        position: 0.32,
        linkedTask: { id: "ACME-42", title: "Enterprise SSO" },
        linkedStakeholder: {
          name: "Sarah Chen",
          initials: "SC",
          color: MODULE_COLORS.projectManagement.primary,
        },
      },
      {
        id: "c2",
        hash: "b4c5d6e",
        message: "Batch processing",
        position: 0.48,
        linkedTask: { id: "ACME-47", title: "Bulk imports" },
        linkedStakeholder: {
          name: "David Kim",
          initials: "DK",
          color: MODULE_COLORS.stakeholderManagement.primary,
        },
        isCherryPickSource: true,
        isStackedDiff: true,
      },
      {
        id: "c3",
        hash: "f7g8h9i",
        message: "SAML validation",
        position: 0.62,
        linkedStakeholder: {
          name: "Sarah Chen",
          initials: "SC",
          color: MODULE_COLORS.projectManagement.primary,
        },
        isStackedDiff: true,
      },
    ],
  },
  {
    name: "techstart-custom",
    color: "#8b5cf6", // Purple
    xOffset: 120,
    project: "TechStart",
    commits: [
      {
        id: "t1",
        hash: "j0k1l2m",
        message: "Webhook setup",
        position: 0.52,
        linkedTask: { id: "TS-15", title: "Event webhooks" },
        linkedStakeholder: {
          name: "Developer",
          initials: "DEV",
          color: MODULE_COLORS.versionControl.primary,
        },
      },
      {
        id: "t2",
        hash: "n3o4p5q",
        message: "Rate limiting",
        position: 0.68,
        linkedStakeholder: {
          name: "Developer",
          initials: "DEV",
          color: MODULE_COLORS.versionControl.primary,
        },
      },
    ],
  },
];

// ============================================================
// Animation Timing Constants
// ============================================================

export const VC_TIMING = {
  // Phase boundaries (450 frames total at 30fps = 15 seconds)
  PHASE_1_END: 112, // Document cycling starts
  PHASE_2_END: 225, // Branch tree fully rendered
  PHASE_3_END: 338, // Commits with badges shown
  PHASE_4_END: 412, // Cherry-pick animation complete
  SCENE_END: 450,

  // Document cycling
  DOC_1_START: 38,
  DOC_2_START: 150,
  DOC_3_START: 262,

  // Branch/commit animations
  MAIN_BRANCH_DRAW: 50,
  ACME_BRANCH_DRAW: 88,
  TECHSTART_BRANCH_DRAW: 125,
  COMMITS_APPEAR: 138,
  BADGES_APPEAR: 162,

  // Stacked diff indicator
  STACKED_DIFF_APPEAR: 250,

  // Cherry-pick animation
  CHERRY_PICK_START: 325,
  CHERRY_PICK_ARC_COMPLETE: 362,
  CHERRY_PICK_MERGE_FLASH: 375,
  CHERRY_PICK_COMPLETE: 400,
} as const;

// ============================================================
// Helper Functions
// ============================================================

export function getCurrentDocument(frame: number): Document {
  if (frame < VC_TIMING.DOC_2_START) return DEMO_DOCUMENTS[0];
  if (frame < VC_TIMING.DOC_3_START) return DEMO_DOCUMENTS[1];
  return DEMO_DOCUMENTS[2];
}

export function getDocumentTransitionProgress(
  frame: number,
  transitionStart: number,
  duration: number = 20,
): { entering: number; exiting: number } {
  const progress = Math.min(1, Math.max(0, (frame - transitionStart) / duration));
  return {
    entering: progress,
    exiting: 1 - progress,
  };
}
