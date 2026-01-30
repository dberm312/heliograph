"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { STORAGE_KEY, STORAGE_VERSION } from "../constants";
import { INITIAL_STATE } from "../data/sampleData";
import type {
  Activity,
  DemoAction,
  DemoState,
  Person,
  Requirement,
  Task,
} from "../types";
import { debounce, generateId, getTimestamp } from "../utils";

// Reducer function
function demoReducer(state: DemoState, action: DemoAction): DemoState {
  const timestamp = getTimestamp();

  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const newActivity: Activity = {
        id: generateId(),
        type: "created",
        entityType: "task",
        entityId: newTask.id,
        entityTitle: newTask.title,
        description: "New task created",
        createdAt: timestamp,
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        activities: [newActivity, ...state.activities],
      };
    }

    case "UPDATE_TASK": {
      const { id, ...updates } = action.payload;
      const existingTask = state.tasks.find((t) => t.id === id);
      if (!existingTask) return state;

      const updatedTask = { ...existingTask, ...updates, updatedAt: timestamp };
      const newActivity: Activity = {
        id: generateId(),
        type: "updated",
        entityType: "task",
        entityId: id,
        entityTitle: updatedTask.title,
        description: "Task updated",
        createdAt: timestamp,
      };
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        activities: [newActivity, ...state.activities],
      };
    }

    case "DELETE_TASK": {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (!task) return state;
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
        selectedTaskId:
          state.selectedTaskId === action.payload
            ? null
            : state.selectedTaskId,
      };
    }

    case "MOVE_TASK": {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (!task || task.status === newStatus) return state;

      const newActivity: Activity = {
        id: generateId(),
        type: "status_changed",
        entityType: "task",
        entityId: taskId,
        entityTitle: task.title,
        description: `Status changed to "${newStatus}"`,
        createdAt: timestamp,
      };
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus, updatedAt: timestamp } : t
        ),
        activities: [newActivity, ...state.activities],
      };
    }

    case "ADD_PERSON": {
      const newPerson: Person = {
        ...action.payload,
        id: generateId(),
        createdAt: timestamp,
      };
      const newActivity: Activity = {
        id: generateId(),
        type: "created",
        entityType: "person",
        entityId: newPerson.id,
        entityTitle: newPerson.name,
        description: `${newPerson.name} added`,
        createdAt: timestamp,
      };
      return {
        ...state,
        persons: [...state.persons, newPerson],
        activities: [newActivity, ...state.activities],
      };
    }

    case "UPDATE_PERSON": {
      const { id, ...updates } = action.payload;
      const existingPerson = state.persons.find((p) => p.id === id);
      if (!existingPerson) return state;

      return {
        ...state,
        persons: state.persons.map((p) =>
          p.id === id ? { ...p, ...updates } : p
        ),
      };
    }

    case "DELETE_PERSON": {
      return {
        ...state,
        persons: state.persons.filter((p) => p.id !== action.payload),
        // Also remove person from tasks
        tasks: state.tasks.map((t) => ({
          ...t,
          stakeholderIds: t.stakeholderIds.filter((id) => id !== action.payload),
          executorIds: t.executorIds.filter((id) => id !== action.payload),
        })),
        // Remove requirements for this stakeholder
        requirements: state.requirements.filter(
          (r) => r.stakeholderId !== action.payload
        ),
        selectedPersonId:
          state.selectedPersonId === action.payload
            ? null
            : state.selectedPersonId,
      };
    }

    case "ADD_REQUIREMENT": {
      const newRequirement: Requirement = {
        ...action.payload,
        id: generateId(),
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      const stakeholder = state.persons.find(
        (p) => p.id === action.payload.stakeholderId
      );
      const newActivity: Activity = {
        id: generateId(),
        type: "created",
        entityType: "requirement",
        entityId: newRequirement.id,
        entityTitle: newRequirement.title,
        description: `New requirement created${stakeholder ? ` by ${stakeholder.name}` : ""}`,
        createdAt: timestamp,
      };
      return {
        ...state,
        requirements: [...state.requirements, newRequirement],
        activities: [newActivity, ...state.activities],
      };
    }

    case "UPDATE_REQUIREMENT": {
      const { id, ...updates } = action.payload;
      const existingReq = state.requirements.find((r) => r.id === id);
      if (!existingReq) return state;

      const updatedReq = { ...existingReq, ...updates, updatedAt: timestamp };

      // Check if status changed
      const statusChanged =
        updates.status && updates.status !== existingReq.status;
      const newActivity: Activity = {
        id: generateId(),
        type: statusChanged ? "status_changed" : "updated",
        entityType: "requirement",
        entityId: id,
        entityTitle: updatedReq.title,
        description: statusChanged
          ? `Status changed to "${updates.status}"`
          : "Requirement updated",
        createdAt: timestamp,
      };
      return {
        ...state,
        requirements: state.requirements.map((r) =>
          r.id === id ? updatedReq : r
        ),
        activities: [newActivity, ...state.activities],
      };
    }

    case "DELETE_REQUIREMENT": {
      return {
        ...state,
        requirements: state.requirements.filter(
          (r) => r.id !== action.payload
        ),
        // Also unlink from tasks
        tasks: state.tasks.map((t) => ({
          ...t,
          requirementIds: t.requirementIds.filter(
            (id) => id !== action.payload
          ),
        })),
      };
    }

    case "SET_VIEW":
      return { ...state, activeView: action.payload };

    case "SELECT_PERSON":
      return { ...state, selectedPersonId: action.payload };

    case "SELECT_TASK":
      return { ...state, selectedTaskId: action.payload };

    case "LOAD_STATE":
      return action.payload;

    case "RESET_STATE":
      return INITIAL_STATE;

    default:
      return state;
  }
}

// Context type
interface DemoContextType {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
  // Convenience getters
  getPersonById: (id: string) => Person | undefined;
  getTaskById: (id: string) => Task | undefined;
  getRequirementById: (id: string) => Requirement | undefined;
  getRequirementsByStakeholder: (stakeholderId: string) => Requirement[];
  getTasksByPerson: (
    personId: string,
    role: "stakeholder" | "executor"
  ) => Task[];
}

const DemoContext = createContext<DemoContextType | null>(null);

// Storage helpers
interface StoredState {
  version: number;
  state: DemoState;
}

function loadFromStorage(): DemoState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed: StoredState = JSON.parse(stored);
    if (parsed.version !== STORAGE_VERSION) {
      // Version mismatch, clear old data
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed.state;
  } catch {
    return null;
  }
}

function saveToStorage(state: DemoState): void {
  if (typeof window === "undefined") return;

  try {
    const toStore: StoredState = {
      version: STORAGE_VERSION,
      state,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Storage quota exceeded or other error - silently fail
    console.warn("Failed to save demo state to localStorage");
  }
}

// Provider component
export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_STATE);
  const isInitialized = useRef(false);

  // Load state from localStorage on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const stored = loadFromStorage();
    if (stored) {
      dispatch({ type: "LOAD_STATE", payload: stored });
    }
  }, []);

  // Save state to localStorage on changes (debounced)
  const debouncedSave = useRef(
    debounce((s: DemoState) => saveToStorage(s), 300)
  ).current;

  useEffect(() => {
    if (isInitialized.current) {
      debouncedSave(state);
    }
  }, [state, debouncedSave]);

  // Convenience getters
  const getPersonById = useCallback(
    (id: string) => state.persons.find((p) => p.id === id),
    [state.persons]
  );

  const getTaskById = useCallback(
    (id: string) => state.tasks.find((t) => t.id === id),
    [state.tasks]
  );

  const getRequirementById = useCallback(
    (id: string) => state.requirements.find((r) => r.id === id),
    [state.requirements]
  );

  const getRequirementsByStakeholder = useCallback(
    (stakeholderId: string) =>
      state.requirements.filter((r) => r.stakeholderId === stakeholderId),
    [state.requirements]
  );

  const getTasksByPerson = useCallback(
    (personId: string, role: "stakeholder" | "executor") =>
      state.tasks.filter((t) =>
        role === "stakeholder"
          ? t.stakeholderIds.includes(personId)
          : t.executorIds.includes(personId)
      ),
    [state.tasks]
  );

  return (
    <DemoContext.Provider
      value={{
        state,
        dispatch,
        getPersonById,
        getTaskById,
        getRequirementById,
        getRequirementsByStakeholder,
        getTasksByPerson,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

// Hook for consuming the context
export function useDemo(): DemoContextType {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
