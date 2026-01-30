"use client";

import {
  REQUIREMENT_STATUS_CONFIG,
  TASK_STATUS_CONFIG,
} from "../../constants";
import type { RequirementStatus, TaskStatus } from "../../types";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  size?: "sm" | "md";
}

export function TaskStatusBadge({ status, size = "sm" }: TaskStatusBadgeProps) {
  const config = TASK_STATUS_CONFIG[status];

  return (
    <span
      className={`
        inline-flex items-center font-semibold uppercase tracking-wide rounded
        ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}
      `}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}

interface RequirementStatusBadgeProps {
  status: RequirementStatus;
  size?: "sm" | "md";
}

export function RequirementStatusBadge({
  status,
  size = "sm",
}: RequirementStatusBadgeProps) {
  const config = REQUIREMENT_STATUS_CONFIG[status];

  return (
    <span
      className={`
        inline-flex items-center font-semibold uppercase tracking-wide rounded
        ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}
      `}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      {config.label}
    </span>
  );
}
