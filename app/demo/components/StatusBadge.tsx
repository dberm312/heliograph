import type { HeliogramStatus } from "@/types/heliogram";

interface StatusBadgeProps {
  status: HeliogramStatus;
}

const statusConfig: Record<
  HeliogramStatus,
  { label: string; className: string }
> = {
  draft: {
    label: "Draft",
    className: "bg-white/10 text-white/70",
  },
  active: {
    label: "Active",
    className: "bg-emerald-500/20 text-emerald-300",
  },
  closed: {
    label: "Closed",
    className: "bg-red-500/20 text-red-300",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
