"use client";

import { Link2 } from "lucide-react";
import { useDemo } from "../../context/DemoContext";
import type { Requirement } from "../../types";
import { formatDate } from "../../utils";
import { PriorityBadge } from "../common/PriorityBadge";
import { RequirementStatusBadge } from "../common/StatusBadge";

interface RequirementCardProps {
  requirement: Requirement;
  onClick?: () => void;
}

export function RequirementCard({
  requirement,
  onClick,
}: RequirementCardProps) {
  const { state } = useDemo();

  // Find tasks linked to this requirement
  const linkedTasks = state.tasks.filter((t) =>
    t.requirementIds.includes(requirement.id),
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl transition-all duration-200
        border border-white/10 bg-white/5 hover:bg-white/8 hover:border-white/20"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-medium text-white/90">{requirement.title}</h4>
        <RequirementStatusBadge status={requirement.status} />
      </div>

      {/* Description */}
      {requirement.description && (
        <p className="text-sm text-white/50 line-clamp-2 mb-3">
          {requirement.description}
        </p>
      )}

      {/* Notes */}
      {requirement.notes && (
        <p className="text-xs text-white/40 italic mb-3 line-clamp-1">
          Note: {requirement.notes}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PriorityBadge priority={requirement.priority} />
          {linkedTasks.length > 0 && (
            <span className="flex items-center gap-1 text-xs text-blue-300/70">
              <Link2 className="w-3 h-3" aria-hidden="true" />
              {linkedTasks.length} task{linkedTasks.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <span className="text-xs text-white/40">
          Updated {formatDate(requirement.updatedAt)}
        </span>
      </div>
    </button>
  );
}
