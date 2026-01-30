"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-white/40" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold text-white/80 mb-2">
        {title}
      </h3>
      <p className="text-sm text-white/50 max-w-sm mb-4">{description}</p>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="px-4 py-2 rounded-lg bg-orange-500/20 text-orange-300
            border border-orange-500/30 hover:bg-orange-500/30
            transition-colors duration-200 text-sm font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
