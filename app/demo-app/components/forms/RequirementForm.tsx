"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { REQUIREMENT_STATUS_CONFIG } from "../../constants";
import { useDemo } from "../../context/DemoContext";
import type {
  NewRequirement,
  Priority,
  Requirement,
  RequirementStatus,
} from "../../types";

interface RequirementFormProps {
  requirement?: Requirement;
  onSubmit: (requirement: NewRequirement) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const STATUSES: RequirementStatus[] = [
  "draft",
  "pending",
  "approved",
  "inProgress",
  "completed",
];
const PRIORITIES: Priority[] = ["urgent", "high", "medium", "low"];

export function RequirementForm({
  requirement,
  onSubmit,
  onCancel,
  onDelete,
}: RequirementFormProps) {
  const { state } = useDemo();

  const [title, setTitle] = useState(requirement?.title || "");
  const [description, setDescription] = useState(requirement?.description || "");
  const [status, setStatus] = useState<RequirementStatus>(
    requirement?.status || "draft"
  );
  const [priority, setPriority] = useState<Priority>(
    requirement?.priority || "medium"
  );
  const [stakeholderId, setStakeholderId] = useState(
    requirement?.stakeholderId || ""
  );
  const [notes, setNotes] = useState(requirement?.notes || "");

  // Get stakeholders
  const stakeholders = state.persons.filter((p) =>
    p.personType.includes("stakeholder")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !stakeholderId) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      stakeholderId,
      notes: notes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Stakeholder */}
      <div>
        <label
          htmlFor="req-stakeholder"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Stakeholder <span className="text-red-400">*</span>
        </label>
        <select
          id="req-stakeholder"
          value={stakeholderId}
          onChange={(e) => setStakeholderId(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white focus:outline-none focus:border-white/30"
          required
          disabled={!!requirement} // Can't change stakeholder on edit
        >
          <option value="">Select stakeholder...</option>
          {stakeholders.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name} ({person.company})
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="req-title"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Title <span className="text-red-400">*</span>
        </label>
        <input
          id="req-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter requirement title..."
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="req-description"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Description
        </label>
        <textarea
          id="req-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the requirement in detail..."
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
            htmlFor="req-status"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Status
          </label>
          <select
            id="req-status"
            value={status}
            onChange={(e) => setStatus(e.target.value as RequirementStatus)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white focus:outline-none focus:border-white/30"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {REQUIREMENT_STATUS_CONFIG[s].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="req-priority"
            className="block text-sm font-medium text-white/70 mb-2"
          >
            Priority
          </label>
          <select
            id="req-priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
              text-white focus:outline-none focus:border-white/30"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="req-notes"
          className="block text-sm font-medium text-white/70 mb-2"
        >
          Notes
        </label>
        <textarea
          id="req-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add internal notes..."
          rows={2}
          className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10
            text-white placeholder-white/30 focus:outline-none focus:border-white/30
            resize-none"
        />
      </div>

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
            disabled={!title.trim() || !stakeholderId}
            className="px-6 py-2 rounded-lg bg-orange-500/20 text-orange-300
              border border-orange-500/30 hover:bg-orange-500/30
              transition-colors text-sm font-medium
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {requirement ? "Save Changes" : "Add Requirement"}
          </button>
        </div>
      </div>
    </form>
  );
}
