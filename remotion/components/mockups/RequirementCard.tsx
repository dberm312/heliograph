import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, STATUS_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type Requirement = {
  id: string;
  title: string;
  description: string;
  status: "approved" | "inProgress" | "pending" | "blocked";
  priority: "high" | "medium" | "low";
  dueDate?: string;
};

const REQUIREMENTS: Requirement[] = [
  {
    id: "1",
    title: "SSO Integration",
    description: "Implement SAML-based SSO for enterprise authentication",
    status: "approved",
    priority: "high",
    dueDate: "Q1 2024",
  },
  {
    id: "2",
    title: "Custom Reports",
    description: "Build configurable reporting dashboard with export options",
    status: "inProgress",
    priority: "high",
    dueDate: "Q2 2024",
  },
  {
    id: "3",
    title: "API Rate Limiting",
    description: "Add configurable rate limits per client",
    status: "pending",
    priority: "medium",
  },
  {
    id: "4",
    title: "Data Retention Policy",
    description: "Implement automated data archival based on policy",
    status: "inProgress",
    priority: "medium",
    dueDate: "Q2 2024",
  },
];

type RequirementItemProps = {
  requirement: Requirement;
  delay: number;
};

const RequirementItem: React.FC<RequirementItemProps> = ({
  requirement,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const x = interpolate(entrance, [0, 1], [30, 0]);

  // Status pulse animation for in-progress items
  const statusPulse =
    requirement.status === "inProgress"
      ? interpolate(Math.sin(frame * 0.15) * 0.5 + 0.5, [0, 1], [0.6, 1])
      : 1;

  const statusConfig = {
    approved: { color: STATUS_COLORS.approved, label: "Approved", icon: "✓" },
    inProgress: {
      color: STATUS_COLORS.inProgress,
      label: "In Progress",
      icon: "→",
    },
    pending: { color: STATUS_COLORS.pending, label: "Pending", icon: "○" },
    blocked: { color: "#ef4444", label: "Blocked", icon: "!" },
  };

  const status = statusConfig[requirement.status];

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
      }}
    >
      <GlassCard padding={20} borderRadius={12} opacity={0.1}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1f2937",
              fontFamily: FONTS.body,
              flex: 1,
            }}
          >
            {requirement.title}
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 6,
              background: `${status.color}15`,
              border: `1px solid ${status.color}40`,
              opacity: statusPulse,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: status.color,
              }}
            >
              {status.icon}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: status.color,
                fontFamily: FONTS.body,
              }}
            >
              {status.label}
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: 13,
            color: "#64748b",
            fontFamily: FONTS.body,
            lineHeight: 1.5,
            marginBottom: 12,
          }}
        >
          {requirement.description}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Priority */}
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 8px",
              borderRadius: 4,
              background:
                requirement.priority === "high"
                  ? "rgba(239, 68, 68, 0.15)"
                  : requirement.priority === "medium"
                    ? "rgba(234, 179, 8, 0.15)"
                    : "rgba(107, 114, 128, 0.15)",
              color:
                requirement.priority === "high"
                  ? "#dc2626"
                  : requirement.priority === "medium"
                    ? "#ca8a04"
                    : "#6b7280",
              textTransform: "uppercase",
              fontFamily: FONTS.body,
            }}
          >
            {requirement.priority} priority
          </div>

          {/* Due date */}
          {requirement.dueDate && (
            <div
              style={{
                fontSize: 11,
                color: "#94a3b8",
                fontFamily: FONTS.body,
              }}
            >
              Due: {requirement.dueDate}
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

type RequirementListProps = {
  visible?: boolean;
};

export const RequirementList: React.FC<RequirementListProps> = ({
  visible = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  if (!visible) return null;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        flex: 1,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#64748b",
          fontFamily: FONTS.body,
          marginBottom: 8,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: headerProgress,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Requirements</span>
        <span
          style={{
            fontSize: 12,
            color: "#94a3b8",
            fontWeight: 500,
          }}
        >
          Sarah Chen's Items
        </span>
      </div>

      {/* Requirement cards */}
      {REQUIREMENTS.map((requirement, index) => (
        <RequirementItem
          key={requirement.id}
          requirement={requirement}
          delay={130 + index * 20}
        />
      ))}
    </div>
  );
};
