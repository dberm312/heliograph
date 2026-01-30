"use client";

import { getCompanyColor } from "../../utils";

interface AvatarProps {
  name: string;
  avatar: string;
  company?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const SIZES = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-10 h-10 text-sm",
};

export function Avatar({
  name,
  avatar,
  company,
  size = "md",
  showTooltip = true,
}: AvatarProps) {
  const color = company ? getCompanyColor(company) : "#6b7280";

  return (
    <div
      className={`
        ${SIZES[size]}
        rounded-full flex items-center justify-center
        font-semibold text-white
        border-2 shrink-0
      `}
      style={{
        background: `linear-gradient(135deg, ${color}40, ${color}20)`,
        borderColor: `${color}60`,
      }}
      title={showTooltip ? name : undefined}
    >
      {avatar}
    </div>
  );
}
