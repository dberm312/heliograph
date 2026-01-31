"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { KANBAN_COLUMNS, TASK_STATUS_CONFIG } from "../../constants";
import { useDemo } from "../../context/DemoContext";
import type { NewTask, Priority, Task, TaskStatus } from "../../types";
import { formatDateForInput } from "../../utils";

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: NewTask) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const PRIORITIES: Priority[] = ["urgent", "high", "medium", "low"];

export function TaskForm({
  task,
  onSubmit,
  onCancel,
  onDelete,
}: TaskFormProps) {
  const { state } = useDemo();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskStatus>(task?.status || "backlog");
  const [priority, setPriority] = useState<Priority>(
    task?.priority || "medium",
  );
  const [stakeholderIds, setStakeholderIds] = useState<string[]>(
    task?.stakeholderIds || [],
  );
  const [executorIds, setExecutorIds] = useState<string[]>(
    task?.executorIds || [],
  );
  const [requirementIds, setRequirementIds] = useState<string[]>(
    task?.requirementIds || [],
  );
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? formatDateForInput(task.dueDate) : "",
  );

  // Get persons by type
  const stakeholders = state.persons.filter((p) =>
    p.personType.includes("stakeholder"),
  );
  const executors = state.persons.filter((p) =>
    p.personType.includes("executor"),
  );

  // Get available requirements (from selected stakeholders)
  const availableRequirements = state.requirements.filter((r) =>
    stakeholderIds.includes(r.stakeholderId),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      stakeholderIds,
      executorIds,
      requirementIds,
      dueDate: dueDate || undefined,
    });
  };

  const toggleSelection = (
    id: string,
    current: string[],
    setter: (ids: string[]) => void,
  ) => {
    if (current.includes(id)) {
      setter(current.filter((i) => i !== id));
    } else {
      setter([...current, id]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label
          htmlFor="task-title"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="task-description"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Description
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details..."
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30
            resize-none"
        />
      </div>

      {/* Status & Priority row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="task-status"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Status
          </label>
          <select
            id="task-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white focus:outline-none focus:border-white/30"
          >
            {KANBAN_COLUMNS.map((s) => (
              <option key={s} value={s}>
                {TASK_STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="task-priority"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Priority
          </label>
          <select
            id="task-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white focus:outline-none focus:border-white/30 capitalize"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p} className="capitalize">
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="task-due-date"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Due Date
        </label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white focus:outline-none focus:border-white/30"
        />
      </div>

      {/* Stakeholders */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">
          Stakeholders (who is this for?)
        </label>
        <div className="flex flex-wrap gap-2">
          {stakeholders.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() =>
                toggleSelection(person.id, stakeholderIds, setStakeholderIds)
              }
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                stakeholderIds.includes(person.id)
                  ? "bg-purple-500/30 text-purple-200 border border-purple-500/50"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
              }`}
            >
              {person.name}
            </button>
          ))}
          {stakeholders.length === 0 && (
            <span className="text-sm text-white/40 italic">
              No stakeholders available
            </span>
          )}
        </div>
      </div>

      {/* Executors */}
      <div>
        <label className="block text-sm font-medium text-white/70 mb-2">
          Executors (who will do the work?)
        </label>
        <div className="flex flex-wrap gap-2">
          {executors.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() =>
                toggleSelection(person.id, executorIds, setExecutorIds)
              }
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                executorIds.includes(person.id)
                  ? "bg-blue-500/30 text-blue-200 border border-blue-500/50"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
              }`}
            >
              {person.name}
            </button>
          ))}
          {executors.length === 0 && (
            <span className="text-sm text-white/40 italic">
              No executors available
            </span>
          )}
        </div>
      </div>

      {/* Link Requirements (only show if stakeholders selected) */}
      {availableRequirements.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Link Requirements
          </label>
          <div className="flex flex-wrap gap-2">
            {availableRequirements.map((req) => (
              <button
                key={req.id}
                type="button"
                onClick={() =>
                  toggleSelection(req.id, requirementIds, setRequirementIds)
                }
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  requirementIds.includes(req.id)
                    ? "bg-orange-500/30 text-orange-200 border border-orange-500/50"
                    : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                }`}
              >
                {req.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              text-red-400 hover:bg-red-500/10 transition-colors text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-white/60 hover:text-white/80
              hover:bg-white/5 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-6 py-2 rounded-lg bg-orange-500/20 text-orange-300
              border border-orange-500/30 hover:bg-orange-500/30
              transition-colors text-sm font-medium
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {task ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </form>
  );
}
