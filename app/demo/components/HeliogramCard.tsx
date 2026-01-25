"use client";

import Link from "next/link";
import { MessageSquare, BarChart3, Trash2, Clock } from "lucide-react";
import type { Heliogram } from "@/types/heliogram";
import { StatusBadge } from "./StatusBadge";

interface HeliogramCardProps {
  heliogram: Heliogram;
  responseCount: number;
  onDelete?: (id: string) => void;
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
}

export function HeliogramCard({
  heliogram,
  responseCount,
  onDelete,
}: HeliogramCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete && confirm("Are you sure you want to delete this Heliogram?")) {
      onDelete(heliogram.id);
    }
  };

  return (
    <div className="glass-card noise-texture relative rounded-2xl p-6 flex flex-col h-full group">
      <div className="flex items-start justify-between mb-4">
        <StatusBadge status={heliogram.status} />
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
          aria-label="Delete Heliogram"
        >
          <Trash2 className="w-4 h-4 text-white/60 hover:text-red-400" />
        </button>
      </div>

      <Link href={`/demo/${heliogram.id}`} className="flex-1">
        <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-orange-200 transition-colors duration-300">
          {heliogram.title}
        </h3>
        {heliogram.description && (
          <p className="text-white/60 text-sm line-clamp-2 mb-4">
            {heliogram.description}
          </p>
        )}
      </Link>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          <Link
            href={`/demo/${heliogram.id}`}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white/80 transition-colors"
          >
            <MessageSquare className="w-4 h-4" aria-hidden="true" />
            <span>{heliogram.questions.length} questions</span>
          </Link>
          <Link
            href={`/demo/${heliogram.id}/responses`}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-orange-300 transition-colors"
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span>{responseCount} responses</span>
          </Link>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/40">
          <Clock className="w-3 h-3" aria-hidden="true" />
          <span>{formatRelativeTime(heliogram.updatedAt)}</span>
        </div>
      </div>

      {heliogram.context?.tags && heliogram.context.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {heliogram.context.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
