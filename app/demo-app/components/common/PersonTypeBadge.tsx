"use client";

import { PERSON_TYPE_COLORS } from "../../constants";
import type { PersonType } from "../../types";

interface PersonTypeBadgeProps {
  type: PersonType;
  size?: "sm" | "md";
}

const TYPE_LABELS: Record<PersonType, string> = {
  stakeholder: "Stakeholder",
  executor: "Executor",
};

export function PersonTypeBadge({ type, size = "sm" }: PersonTypeBadgeProps) {
  const color = PERSON_TYPE_COLORS[type];

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1"}
      `}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {TYPE_LABELS[type]}
    </span>
  );
}
