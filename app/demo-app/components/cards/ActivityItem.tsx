"use client";

import {
  ArrowRight,
  FileText,
  Link2,
  Plus,
  RefreshCw,
  User,
} from "lucide-react";
import type { Activity } from "../../types";
import { formatDate } from "../../utils";

interface ActivityItemProps {
  activity: Activity;
}

const ACTIVITY_ICONS = {
  created: Plus,
  status_changed: ArrowRight,
  assigned: User,
  unassigned: User,
  updated: RefreshCw,
  requirement_linked: Link2,
} as const;

const ENTITY_COLORS = {
  task: "#f97316", // Orange
  requirement: "#8b5cf6", // Purple
  person: "#3b82f6", // Blue
} as const;

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = ACTIVITY_ICONS[activity.type] || FileText;
  const color = ENTITY_COLORS[activity.entityType];

  return (
    <div className="flex items-start gap-3 py-3">
      {/* Icon */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-4 h-4" style={{ color }} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/80">
          <span className="font-medium" style={{ color }}>
            {activity.entityTitle}
          </span>
        </p>
        <p className="text-xs text-white/50">{activity.description}</p>
      </div>

      {/* Timestamp */}
      <span className="text-xs text-white/40 shrink-0">
        {formatDate(activity.createdAt)}
      </span>
    </div>
  );
}
