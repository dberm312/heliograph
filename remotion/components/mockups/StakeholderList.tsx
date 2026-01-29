import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type Stakeholder = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  status: "active" | "pending" | "inactive";
};

const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "CTO",
    company: "Acme Corp",
    avatar: "SC",
    status: "active",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "VP Engineering",
    company: "TechStart",
    avatar: "MJ",
    status: "active",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Product Lead",
    company: "DataFlow",
    avatar: "ER",
    status: "pending",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Engineering Manager",
    company: "Acme Corp",
    avatar: "DK",
    status: "active",
  },
];

const COMPANY_COLORS: Record<string, string> = {
  "Acme Corp": MODULE_COLORS.projectManagement.primary,
  TechStart: MODULE_COLORS.versionControl.primary,
  DataFlow: MODULE_COLORS.stakeholderManagement.primary,
};

type StakeholderCardProps = {
  stakeholder: Stakeholder;
  delay: number;
  isSelected: boolean;
  onSelect?: () => void;
};

const StakeholderCard: React.FC<StakeholderCardProps> = ({
  stakeholder,
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

  // Selection animation
  const selectionGlow = isSelected
    ? interpolate(Math.sin(frame * 0.1) * 0.5 + 0.5, [0, 1], [0.3, 0.6])
    : 0;

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
      }}
    >
      <GlassCard
        padding={16}
        borderRadius={12}
        opacity={isSelected ? 0.15 : 0.08}
        style={{
          border: isSelected
            ? `2px solid ${MODULE_COLORS.stakeholderManagement.primary}`
            : "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: isSelected
            ? `0 0 30px rgba(139, 92, 246, ${selectionGlow})`
            : "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Avatar */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COMPANY_COLORS[stakeholder.company]}40, ${COMPANY_COLORS[stakeholder.company]}20)`,
              border: `2px solid ${COMPANY_COLORS[stakeholder.company]}60`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.body,
            }}
          >
            {stakeholder.avatar}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: FONTS.body,
                marginBottom: 2,
              }}
            >
              {stakeholder.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
              }}
            >
              {stakeholder.role}
            </div>
            <div
              style={{
                fontSize: 11,
                color: COMPANY_COLORS[stakeholder.company],
                fontFamily: FONTS.body,
                marginTop: 4,
              }}
            >
              {stakeholder.company}
            </div>
          </div>

          {/* Status indicator */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background:
                stakeholder.status === "active"
                  ? "#22c55e"
                  : stakeholder.status === "pending"
                    ? "#eab308"
                    : "#6b7280",
              boxShadow:
                stakeholder.status === "active"
                  ? "0 0 8px rgba(34, 197, 94, 0.5)"
                  : "none",
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
};

type StakeholderListProps = {
  selectedIndex?: number;
};

export const StakeholderList: React.FC<StakeholderListProps> = ({
  selectedIndex = -1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: 320,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.textSecondary,
          fontFamily: FONTS.body,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: headerProgress,
        }}
      >
        Stakeholders
      </div>

      {/* Stakeholder cards */}
      {STAKEHOLDERS.map((stakeholder, index) => (
        <StakeholderCard
          key={stakeholder.id}
          stakeholder={stakeholder}
          delay={50 + index * 15}
          isSelected={index === selectedIndex}
        />
      ))}
    </div>
  );
};
