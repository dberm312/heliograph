import type { Heliogram, HeliogramResponse, Respondent } from "@/types/heliogram";

const SAMPLE_RESPONDENTS: Respondent[] = [
  { name: "Sarah Chen", role: "VP of Engineering", email: "sarah@acme.com" },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    email: "marcus@techstart.io",
  },
  {
    name: "Elena Rodriguez",
    role: "Solutions Architect",
    email: "elena@enterprise.co",
  },
  { name: "James Wilson", role: "CTO", email: "james@startup.dev" },
  {
    name: "Priya Patel",
    role: "Director of Operations",
    email: "priya@operations.com",
  },
  { name: "Alex Kim", role: "Engineering Lead", email: "alex@devteam.io" },
];

export const SAMPLE_HELIOGRAMS: Heliogram[] = [
  {
    id: "hg_demo_onboard",
    title: "Acme Corp Onboarding Feedback",
    description: "Quick feedback on the new onboarding flow we built for Acme",
    status: "active",
    questions: [
      {
        id: "q_rate_exp",
        type: "rating",
        label: "How would you rate the overall onboarding experience?",
        required: true,
        order: 0,
        maxRating: 5,
        labels: { low: "Frustrating", high: "Delightful" },
      },
      {
        id: "q_initial",
        type: "reaction",
        label: "What was your initial reaction to the new dashboard?",
        required: true,
        order: 1,
        variant: "emoji",
      },
      {
        id: "q_improve",
        type: "text",
        label: "What's one thing we could improve?",
        required: false,
        order: 2,
        placeholder: "Share your thoughts...",
        multiline: true,
        maxLength: 500,
      },
    ],
    context: {
      project: "Acme Onboarding v2",
      client: "Acme Corp",
      tags: ["onboarding", "ux", "enterprise"],
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "hg_demo_feature",
    title: "SSO Integration Priority",
    description: "Help us prioritize SSO provider integrations for Q2",
    status: "active",
    questions: [
      {
        id: "q_scale_need",
        type: "scale",
        label: "How critical is SSO integration for your organization?",
        required: true,
        order: 0,
        min: 1,
        max: 10,
        step: 1,
        labels: { min: "Nice to have", max: "Blocker" },
      },
      {
        id: "q_provider",
        type: "text",
        label: "Which SSO providers do you need? (e.g., Okta, Azure AD)",
        required: true,
        order: 1,
        placeholder: "Enter provider names",
        multiline: false,
      },
      {
        id: "q_thumbs",
        type: "reaction",
        label: "Would you expand usage if SSO were available?",
        required: true,
        order: 2,
        variant: "thumbs",
      },
    ],
    context: {
      project: "Q2 Roadmap Planning",
      tags: ["feature-request", "security", "enterprise"],
    },
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-22T16:20:00Z",
  },
  {
    id: "hg_demo_ui",
    title: "Dashboard Layout Preference",
    description: "Which dashboard layout resonates with your team?",
    status: "active",
    questions: [
      {
        id: "q_react_layout",
        type: "reaction",
        label: "Layout A: Cards-based overview",
        required: true,
        order: 0,
        variant: "thumbs",
      },
      {
        id: "q_react_layout_b",
        type: "reaction",
        label: "Layout B: Table-focused data view",
        required: true,
        order: 1,
        variant: "thumbs",
      },
      {
        id: "q_why",
        type: "text",
        label: "What drives your preference?",
        required: false,
        order: 2,
        placeholder: "Tell us why...",
        multiline: true,
      },
    ],
    context: {
      project: "Dashboard Redesign",
      tags: ["ui", "design", "user-research"],
    },
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
];

export const SAMPLE_RESPONSES: HeliogramResponse[] = [
  // Responses for Onboarding Feedback
  {
    id: "resp_demo_001",
    heliogramId: "hg_demo_onboard",
    responses: [
      { questionId: "q_rate_exp", value: 4 },
      { questionId: "q_initial", value: 1 }, // emoji index: 😊
      {
        questionId: "q_improve",
        value:
          "The step-by-step wizard was great, but I'd love keyboard shortcuts for power users.",
      },
    ],
    respondent: SAMPLE_RESPONDENTS[0],
    submittedAt: "2024-01-21T09:15:00Z",
    source: "direct",
  },
  {
    id: "resp_demo_002",
    heliogramId: "hg_demo_onboard",
    responses: [
      { questionId: "q_rate_exp", value: 5 },
      { questionId: "q_initial", value: 0 }, // emoji index: 😍
      {
        questionId: "q_improve",
        value: "Nothing major - maybe add a progress indicator?",
      },
    ],
    respondent: SAMPLE_RESPONDENTS[1],
    submittedAt: "2024-01-21T11:30:00Z",
    source: "email",
  },
  {
    id: "resp_demo_003",
    heliogramId: "hg_demo_onboard",
    responses: [
      { questionId: "q_rate_exp", value: 3 },
      { questionId: "q_initial", value: 2 }, // emoji index: 😐
      {
        questionId: "q_improve",
        value:
          "The data import step was confusing. Needed to contact support.",
      },
    ],
    respondent: SAMPLE_RESPONDENTS[2],
    submittedAt: "2024-01-22T14:00:00Z",
    source: "direct",
  },
  // Responses for SSO Integration
  {
    id: "resp_demo_004",
    heliogramId: "hg_demo_feature",
    responses: [
      { questionId: "q_scale_need", value: 9 },
      { questionId: "q_provider", value: "Okta, Azure AD" },
      { questionId: "q_thumbs", value: 0 }, // thumbs up
    ],
    respondent: SAMPLE_RESPONDENTS[3],
    submittedAt: "2024-01-22T10:00:00Z",
    source: "direct",
  },
  {
    id: "resp_demo_005",
    heliogramId: "hg_demo_feature",
    responses: [
      { questionId: "q_scale_need", value: 7 },
      { questionId: "q_provider", value: "Google Workspace, OneLogin" },
      { questionId: "q_thumbs", value: 0 }, // thumbs up
    ],
    respondent: SAMPLE_RESPONDENTS[4],
    submittedAt: "2024-01-22T15:45:00Z",
    source: "embed",
  },
  // Responses for Dashboard Layout
  {
    id: "resp_demo_006",
    heliogramId: "hg_demo_ui",
    responses: [
      { questionId: "q_react_layout", value: 0 }, // thumbs up for A
      { questionId: "q_react_layout_b", value: 1 }, // thumbs down for B
      {
        questionId: "q_why",
        value:
          "Cards give a better high-level overview. Tables are too dense for daily use.",
      },
    ],
    respondent: SAMPLE_RESPONDENTS[5],
    submittedAt: "2024-01-22T16:30:00Z",
    source: "direct",
  },
];
