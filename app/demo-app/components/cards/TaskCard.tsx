"use client";

import { Calendar, GripVertical } from "lucide-react";
import { COLORS } from "../../constants";
import { useDemo } from "../../context/DemoContext";
import type { Task } from "../../types";
import { formatDate, getCompanyColor } from "../../utils";
import { AvatarGroup } from "../common/AvatarGroup";
import { PriorityBadge } from "../common/PriorityBadge";

interface TaskCardProps {
  task: Task;
  onEdit?: () => void;
  isDragging?: boolean;
}

export function TaskCard({ task, onEdit, isDragging = false }: TaskCardProps) {
  const { getPersonById } = useDemo();

  const stakeholders = task.stakeholderIds
    .map(getPersonById)
    .filter(Boolean) as NonNullable<ReturnType<typeof getPersonById>>[];

  const executors = task.executorIds
    .map(getPersonById)
    .filter(Boolean) as NonNullable<ReturnType<typeof getPersonById>>[];

  // Get primary color from first stakeholder's company
  const primaryStakeholder = stakeholders[0];
  const accentColor = primaryStakeholder
    ? getCompanyColor(primaryStakeholder.company)
    : COLORS.gray;

  return (
    <div
      className={`
        group relative bg-white/5 backdrop-blur-sm rounded-xl p-4
        border border-white/10 hover:border-white/20
        transition-all duration-200
        ${isDragging ? "opacity-50 scale-105 shadow-2xl" : "hover:bg-white/8"}
        cursor-grab active:cursor-grabbing
      `}
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: accentColor,
      }}
      onClick={onEdit}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id);
        e.dataTransfer.effectAllowed = "move";
      }}
    >
      {/* Drag handle (visual indicator) */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-40 transition-opacity">
        <GripVertical className="w-4 h-4 text-white" />
      </div>

      {/* Header: Company/Client tag */}
      {primaryStakeholder && (
        <div
          className="text-[11px] font-semibold uppercase tracking-wide mb-2"
          style={{ color: accentColor }}
        >
          {primaryStakeholder.company}
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-medium text-white/90 mb-3 line-clamp-2">
        {task.title}
      </h4>

      {/* Meta row: Priority + Due date */}
      <div className="flex items-center gap-2 mb-3">
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <div className="flex items-center gap-1 text-[11px] text-white/50">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span>{formatDate(task.dueDate)}</span>
          </div>
        )}
      </div>

      {/* Footer: Avatars */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex flex-col gap-1">
          {stakeholders.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 uppercase">For:</span>
              <AvatarGroup persons={stakeholders} max={2} size="sm" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {executors.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/40 uppercase">By:</span>
              <AvatarGroup persons={executors} max={2} size="sm" />
            </div>
          )}
        </div>
      </div>

      {/* Linked requirements indicator */}
      {task.requirementIds.length > 0 && (
        <div className="absolute top-3 right-3">
          <div
            className="w-2 h-2 rounded-full bg-purple-400"
            title={`${task.requirementIds.length} linked requirement(s)`}
          />
        </div>
      )}
    </div>
  );
}
