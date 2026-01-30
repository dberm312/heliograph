import type {
  Activity,
  DemoState,
  Person,
  Requirement,
  Task,
} from "../types";

// Sample people - mix of stakeholders, executors, and both
export const SAMPLE_PERSONS: Person[] = [
  {
    id: "person-1",
    name: "Sarah Chen",
    email: "sarah@acmecorp.com",
    avatar: "SC",
    role: "CTO",
    company: "Acme Corp",
    personType: ["stakeholder"],
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "person-2",
    name: "Marcus Johnson",
    email: "marcus@techstart.io",
    avatar: "MJ",
    role: "VP Engineering",
    company: "TechStart",
    personType: ["stakeholder", "executor"], // Both!
    createdAt: "2024-01-12T10:30:00Z",
  },
  {
    id: "person-3",
    name: "Elena Rodriguez",
    email: "elena@dataflow.co",
    avatar: "ER",
    role: "Product Lead",
    company: "DataFlow",
    personType: ["stakeholder"],
    createdAt: "2024-01-15T14:00:00Z",
  },
  {
    id: "person-4",
    name: "Alex Rivera",
    email: "alex@heliograph.io",
    avatar: "AR",
    role: "Senior Engineer",
    company: "Heliograph",
    personType: ["executor"],
    createdAt: "2024-01-08T08:00:00Z",
  },
  {
    id: "person-5",
    name: "David Kim",
    email: "david@acmecorp.com",
    avatar: "DK",
    role: "Engineering Manager",
    company: "Acme Corp",
    personType: ["executor"],
    createdAt: "2024-01-09T11:00:00Z",
  },
];

// Sample requirements linked to stakeholders
export const SAMPLE_REQUIREMENTS: Requirement[] = [
  {
    id: "req-1",
    title: "SSO Integration",
    description:
      "Implement SAML-based SSO for enterprise authentication. Must support Azure AD and Okta providers.",
    status: "approved",
    priority: "high",
    stakeholderId: "person-1", // Sarah Chen
    notes: "Security team has approved the architecture. Target Q1 completion.",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
  },
  {
    id: "req-2",
    title: "Real-time Dashboard",
    description:
      "Build a real-time analytics dashboard showing key metrics with WebSocket updates.",
    status: "inProgress",
    priority: "high",
    stakeholderId: "person-2", // Marcus Johnson
    notes: "Using existing charting library. Need to define exact metrics.",
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-22T16:00:00Z",
  },
  {
    id: "req-3",
    title: "Mobile Support",
    description:
      "Responsive design for tablet and mobile devices. Progressive web app capabilities.",
    status: "pending",
    priority: "medium",
    stakeholderId: "person-3", // Elena Rodriguez
    notes: "Waiting on design mockups from the UX team.",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-01-20T11:00:00Z",
  },
  {
    id: "req-4",
    title: "API Rate Limiting",
    description:
      "Implement rate limiting on public API endpoints to prevent abuse.",
    status: "approved",
    priority: "medium",
    stakeholderId: "person-1", // Sarah Chen
    notes: "Standard limits: 100 req/min for free tier, 1000 for paid.",
    createdAt: "2024-01-12T14:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
  {
    id: "req-5",
    title: "Data Export",
    description: "Allow users to export their data in CSV and JSON formats.",
    status: "completed",
    priority: "low",
    stakeholderId: "person-2", // Marcus Johnson
    notes: "Completed ahead of schedule. Users can now export from settings.",
    createdAt: "2024-01-08T09:00:00Z",
    updatedAt: "2024-01-16T17:00:00Z",
  },
  {
    id: "req-6",
    title: "Custom Branding",
    description:
      "White-label solution allowing clients to customize colors and logos.",
    status: "draft",
    priority: "low",
    stakeholderId: "person-3", // Elena Rodriguez
    notes: "Initial scoping. Need to evaluate complexity.",
    createdAt: "2024-01-22T13:00:00Z",
    updatedAt: "2024-01-22T13:00:00Z",
  },
];

// Sample tasks distributed across statuses
export const SAMPLE_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Deploy ML model to production",
    description:
      "Set up inference pipeline with proper monitoring and alerting. Include A/B testing capability.",
    status: "inProgress",
    priority: "high",
    stakeholderIds: ["person-1"], // Sarah Chen
    executorIds: ["person-4", "person-5"], // Alex, David
    requirementIds: [],
    dueDate: "2024-02-15",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-23T14:30:00Z",
  },
  {
    id: "task-2",
    title: "API integration review",
    description:
      "Review third-party API integrations for security and performance. Document findings.",
    status: "review",
    priority: "medium",
    stakeholderIds: ["person-2"], // Marcus Johnson
    executorIds: ["person-2"], // Marcus (both stakeholder and executor)
    requirementIds: [],
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-22T09:00:00Z",
  },
  {
    id: "task-3",
    title: "Implement SSO authentication",
    description:
      "Build SAML authentication flow with Azure AD and Okta support.",
    status: "todo",
    priority: "high",
    stakeholderIds: ["person-1"], // Sarah Chen
    executorIds: ["person-4"], // Alex
    requirementIds: ["req-1"], // Linked to SSO requirement
    dueDate: "2024-02-28",
    createdAt: "2024-01-21T09:00:00Z",
    updatedAt: "2024-01-21T09:00:00Z",
  },
  {
    id: "task-4",
    title: "Dashboard v2 design implementation",
    description: "Implement the new dashboard design with real-time updates.",
    status: "inProgress",
    priority: "high",
    stakeholderIds: ["person-2"], // Marcus Johnson
    executorIds: ["person-4", "person-5"], // Alex, David
    requirementIds: ["req-2"], // Linked to Real-time Dashboard
    createdAt: "2024-01-19T14:00:00Z",
    updatedAt: "2024-01-23T11:00:00Z",
  },
  {
    id: "task-5",
    title: "Security audit prep",
    description:
      "Prepare documentation and access for upcoming security audit.",
    status: "inProgress",
    priority: "urgent",
    stakeholderIds: ["person-1"], // Sarah Chen
    executorIds: ["person-5"], // David
    requirementIds: [],
    dueDate: "2024-01-30",
    createdAt: "2024-01-22T08:00:00Z",
    updatedAt: "2024-01-23T16:00:00Z",
  },
  {
    id: "task-6",
    title: "User analytics setup",
    description: "Configure analytics tracking for key user journeys.",
    status: "backlog",
    priority: "medium",
    stakeholderIds: ["person-3"], // Elena Rodriguez
    executorIds: [],
    requirementIds: [],
    createdAt: "2024-01-17T10:00:00Z",
    updatedAt: "2024-01-17T10:00:00Z",
  },
  {
    id: "task-7",
    title: "Documentation update",
    description: "Update API documentation with new endpoints and examples.",
    status: "review",
    priority: "low",
    stakeholderIds: ["person-2"], // Marcus Johnson
    executorIds: ["person-4"], // Alex
    requirementIds: [],
    createdAt: "2024-01-16T13:00:00Z",
    updatedAt: "2024-01-21T15:00:00Z",
  },
  {
    id: "task-8",
    title: "Load testing complete",
    description: "Run load tests and document performance baselines.",
    status: "done",
    priority: "medium",
    stakeholderIds: ["person-1", "person-2"], // Sarah, Marcus
    executorIds: ["person-5"], // David
    requirementIds: [],
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-19T17:00:00Z",
  },
  {
    id: "task-9",
    title: "Mobile responsive fixes",
    description: "Fix layout issues on tablet and mobile viewports.",
    status: "backlog",
    priority: "medium",
    stakeholderIds: ["person-3"], // Elena Rodriguez
    executorIds: [],
    requirementIds: ["req-3"], // Linked to Mobile Support
    createdAt: "2024-01-21T11:00:00Z",
    updatedAt: "2024-01-21T11:00:00Z",
  },
  {
    id: "task-10",
    title: "Rate limiter implementation",
    description: "Implement API rate limiting with Redis backend.",
    status: "todo",
    priority: "medium",
    stakeholderIds: ["person-1"], // Sarah Chen
    executorIds: ["person-4"], // Alex
    requirementIds: ["req-4"], // Linked to API Rate Limiting
    createdAt: "2024-01-20T15:00:00Z",
    updatedAt: "2024-01-20T15:00:00Z",
  },
];

// Sample activity feed
export const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: "activity-1",
    type: "status_changed",
    entityType: "task",
    entityId: "task-5",
    entityTitle: "Security audit prep",
    description: 'Status changed to "In Progress"',
    createdAt: "2024-01-23T16:00:00Z",
  },
  {
    id: "activity-2",
    type: "assigned",
    entityType: "task",
    entityId: "task-4",
    entityTitle: "Dashboard v2 design implementation",
    description: "David Kim assigned as executor",
    createdAt: "2024-01-23T11:00:00Z",
  },
  {
    id: "activity-3",
    type: "updated",
    entityType: "requirement",
    entityId: "req-2",
    entityTitle: "Real-time Dashboard",
    description: "Notes updated with charting library decision",
    createdAt: "2024-01-22T16:00:00Z",
  },
  {
    id: "activity-4",
    type: "created",
    entityType: "requirement",
    entityId: "req-6",
    entityTitle: "Custom Branding",
    description: "New requirement created by Elena Rodriguez",
    createdAt: "2024-01-22T13:00:00Z",
  },
  {
    id: "activity-5",
    type: "status_changed",
    entityType: "task",
    entityId: "task-2",
    entityTitle: "API integration review",
    description: 'Status changed to "Review"',
    createdAt: "2024-01-22T09:00:00Z",
  },
  {
    id: "activity-6",
    type: "requirement_linked",
    entityType: "task",
    entityId: "task-3",
    entityTitle: "Implement SSO authentication",
    description: 'Linked to requirement "SSO Integration"',
    createdAt: "2024-01-21T09:30:00Z",
  },
  {
    id: "activity-7",
    type: "created",
    entityType: "task",
    entityId: "task-9",
    entityTitle: "Mobile responsive fixes",
    description: "New task created",
    createdAt: "2024-01-21T11:00:00Z",
  },
  {
    id: "activity-8",
    type: "status_changed",
    entityType: "requirement",
    entityId: "req-1",
    entityTitle: "SSO Integration",
    description: 'Status changed to "Approved"',
    createdAt: "2024-01-20T14:30:00Z",
  },
];

// Default initial state
export const INITIAL_STATE: DemoState = {
  persons: SAMPLE_PERSONS,
  tasks: SAMPLE_TASKS,
  requirements: SAMPLE_REQUIREMENTS,
  activities: SAMPLE_ACTIVITIES,
  activeView: "dashboard",
  selectedPersonId: null,
  selectedTaskId: null,
};
