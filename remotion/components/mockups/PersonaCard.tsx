import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Persona } from "../../data/stakeholderData";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

// Icon components for personas
const PersonaIcon: React.FC<{ icon: Persona["icon"]; size?: number }> = ({
  icon,
  size = 22,
}) => {
  const iconColor = MODULE_COLORS.stakeholderManagement.primary;

  switch (icon) {
    case "code":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "shield":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "chart":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "users":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={iconColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
};

type PersonaCardProps = {
  persona: Persona;
  delay: number;
  isSelected: boolean;
};

export const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  delay,
  isSelected,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.9, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const x = interpolate(entrance, [0, 1], [-20, 0]);

  // Selection animation - purple glow
  const selectionGlow = isSelected
    ? interpolate(Math.sin(frame * 0.1) * 0.5 + 0.5, [0, 1], [0.3, 0.6])
    : 0;

  const purpleColor = MODULE_COLORS.stakeholderManagement.primary;

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
      }}
    >
      <GlassCard
        padding={14}
        borderRadius={12}
        opacity={isSelected ? 0.12 : 0.05}
        style={{
          border: isSelected
            ? `2px solid ${purpleColor}`
            : `1px dashed ${purpleColor}40`,
          background: isSelected
            ? `rgba(139, 92, 246, 0.08)`
            : `rgba(139, 92, 246, 0.02)`,
          boxShadow: isSelected
            ? `0 0 30px rgba(139, 92, 246, ${selectionGlow})`
            : "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Icon container */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `rgba(139, 92, 246, 0.12)`,
              border: `1px solid ${purpleColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <PersonaIcon icon={persona.icon} size={22} />
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1f2937",
                fontFamily: FONTS.body,
                marginBottom: 2,
              }}
            >
              {persona.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                fontFamily: FONTS.body,
                marginBottom: 4,
              }}
            >
              {persona.description}
            </div>
            {/* User count badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 6px",
                borderRadius: 4,
                background: `rgba(139, 92, 246, 0.1)`,
                fontSize: 10,
                fontWeight: 500,
                color: purpleColor,
                fontFamily: FONTS.body,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              ~{persona.userCount} users
            </div>
          </div>

          {/* Visual indicator that it's a persona (group icon) */}
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: `rgba(139, 92, 246, 0.08)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={purpleColor}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
