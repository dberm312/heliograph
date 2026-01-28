"use client";

import { ClipboardList, GitBranch, Users, LucideIcon } from "lucide-react";

// Icon mapping
const ICONS: Record<string, LucideIcon> = {
  ClipboardList,
  GitBranch,
  Users,
};

interface CubeFaceProps {
  label: string;
  color: string;
  transform: string;
  opacity: number;
  icon?: string;
}

const FACE_SIZE = 280;

export function CubeFace({ label, color, transform, opacity, icon }: CubeFaceProps) {
  const IconComponent = icon ? ICONS[icon] : null;

  return (
    <div
      style={{
        position: "absolute",
        width: FACE_SIZE,
        height: FACE_SIZE,
        transform,
        opacity,
        backfaceVisibility: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)`,
        border: "2px solid rgba(255, 255, 255, 0.3)",
        boxShadow: `0 0 40px ${color}40`,
      }}
    >
      {IconComponent && (
        <IconComponent
          className="w-14 h-14 text-orange-300 icon-glow"
          aria-hidden="true"
        />
      )}
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "var(--font-clash-display), sans-serif",
          textAlign: "center",
          padding: "0 24px",
          lineHeight: 1.3,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export { FACE_SIZE };
