import { FileQuestion } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="glass-card noise-texture relative rounded-2xl p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
          <FileQuestion className="w-8 h-8 text-white/60" aria-hidden="true" />
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-white mb-2">
        {title}
      </h3>
      <p className="text-white/60 mb-6 max-w-sm mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-400 hover:bg-orange-300 text-white font-medium rounded-xl transition-colors duration-300"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
