"use client";

import type { Person } from "../../types";
import { Avatar } from "./Avatar";

interface AvatarGroupProps {
  persons: Person[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({
  persons,
  max = 3,
  size = "sm",
}: AvatarGroupProps) {
  const displayed = persons.slice(0, max);
  const remaining = persons.length - max;

  if (persons.length === 0) {
    return <span className="text-xs text-white/40 italic">Unassigned</span>;
  }

  return (
    <div className="flex items-center -space-x-2">
      {displayed.map((person) => (
        <Avatar
          key={person.id}
          name={person.name}
          avatar={person.avatar}
          company={person.company}
          size={size}
        />
      ))}
      {remaining > 0 && (
        <div
          className={`
            ${size === "sm" ? "w-6 h-6 text-[10px]" : size === "md" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"}
            rounded-full flex items-center justify-center
            bg-white/10 border-2 border-white/20
            text-white/70 font-medium shrink-0
          `}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
