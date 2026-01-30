// Core type aliases
export type PersonType = "stakeholder" | "executor";
export type TaskStatus = "backlog" | "todo" | "inProgress" | "review" | "done";
export type RequirementStatus =
  | "draft"
  | "pending"
  | "approved"
  | "inProgress"
  | "completed";
export type Priority = "urgent" | "high" | "medium" | "low";
export type ViewType = "dashboard" | "tasks" | "people" | "requirements";
export type ActivityType =
  | "created"
  | "status_changed"
  | "assigned"
  | "unassigned"
  | "updated"
  | "requirement_linked";

// Person - can be stakeholder, executor, or both
export interface Person {
  id: string;
  name: string;
  email: string;
  avatar: string; // Initials like "SC"
  role: string;
  company: string;
  personType: PersonType[];
  createdAt: string;
}

// Task with stakeholder/executor attribution
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  stakeholderIds: string[]; // Who this task is for
  executorIds: string[]; // Who's doing the work
  requirementIds: string[]; // Linked requirements
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Stakeholder requirement
export interface Requirement {
  id: string;
  title: string;
  description: string;
  status: RequirementStatus;
  priority: Priority;
  stakeholderId: string; // Who has this requirement
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Activity log entry for tracking changes
export interface Activity {
  id: string;
  type: ActivityType;
  entityType: "task" | "requirement" | "person";
  entityId: string;
  entityTitle: string; // For display without lookup
  description: string;
  createdAt: string;
}

// Root state for the demo
export interface DemoState {
  persons: Person[];
  tasks: Task[];
  requirements: Requirement[];
  activities: Activity[];
  activeView: ViewType;
  selectedPersonId: string | null;
  selectedTaskId: string | null;
}

// Form types for creating new entities (without id and timestamps)
export type NewPerson = Omit<Person, "id" | "createdAt">;
export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type NewRequirement = Omit<Requirement, "id" | "createdAt" | "updatedAt">;

// Action types for the reducer
export type DemoAction =
  | { type: "ADD_TASK"; payload: NewTask }
  | { type: "UPDATE_TASK"; payload: { id: string } & Partial<Task> }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "MOVE_TASK"; payload: { taskId: string; newStatus: TaskStatus } }
  | { type: "ADD_PERSON"; payload: NewPerson }
  | { type: "UPDATE_PERSON"; payload: { id: string } & Partial<Person> }
  | { type: "DELETE_PERSON"; payload: string }
  | { type: "ADD_REQUIREMENT"; payload: NewRequirement }
  | {
      type: "UPDATE_REQUIREMENT";
      payload: { id: string } & Partial<Requirement>;
    }
  | { type: "DELETE_REQUIREMENT"; payload: string }
  | { type: "SET_VIEW"; payload: ViewType }
  | { type: "SELECT_PERSON"; payload: string | null }
  | { type: "SELECT_TASK"; payload: string | null }
  | { type: "LOAD_STATE"; payload: DemoState }
  | { type: "RESET_STATE" };
