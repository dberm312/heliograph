import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Issue } from "../../data/stakeholderData";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type IssueCardProps = {
  issue: Issue;
  delay: number;
};

export const IssueCard: React.FC<IssueCardProps> = ({ issue, delay }) => {
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

  // Status pulse animation for open/blocked items
  const statusPulse =
    issue.status === "open" || issue.status === "blocked"
      ? interpolate(Math.sin(frame * 0.12) * 0.5 + 0.5, [0, 1], [0.7, 1])
      : 1;

  const statusConfig = {
    open: {
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.15)",
      label: "Open",
      icon: "○",
    },
    resolved: {
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.15)",
      label: "Resolved",
      icon: "✓",
    },
    blocked: {
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.15)",
      label: "Blocked",
      icon: "!",
    },
  };

  const priorityConfig = {
    critical: { color: "#dc2626", bg: "rgba(220, 38, 38, 0.15)" },
    high: { color: "#ea580c", bg: "rgba(234, 88, 12, 0.15)" },
    medium: { color: "#ca8a04", bg: "rgba(202, 138, 4, 0.15)" },
    low: { color: "#6b7280", bg: "rgba(107, 114, 128, 0.15)" },
  };

  const status = statusConfig[issue.status];
  const priority = priorityConfig[issue.priority];

  return (
    <div
      style={{
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
      }}
    >
      <GlassCard padding={16} borderRadius={12} opacity={0.08}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            {/* Status indicator dot */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: status.color,
                boxShadow:
                  issue.status !== "resolved"
                    ? `0 0 8px ${status.color}60`
                    : "none",
                opacity: statusPulse,
                flexShrink: 0,
              }}
            />
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "#1f2937",
                fontFamily: FONTS.body,
              }}
            >
              {issue.title}
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 6,
              background: status.bg,
              border: `1px solid ${status.color}30`,
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

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Priority badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 6,
              background: priority.bg,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: priority.color,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: priority.color,
                fontFamily: FONTS.body,
                textTransform: "uppercase",
              }}
            >
              {issue.priority}
            </span>
          </div>

          {/* Created date */}
          <div
            style={{
              fontSize: 11,
              color: "#94a3b8",
              fontFamily: FONTS.body,
            }}
          >
            Created: {issue.createdDate}
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

type IssueListProps = {
  issues: Issue[];
  baseDelay?: number;
};

export const IssueList: React.FC<IssueListProps> = ({
  issues,
  baseDelay = 290,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {issues.map((issue, index) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          delay={baseDelay + index * 18}
        />
      ))}
    </div>
  );
};
