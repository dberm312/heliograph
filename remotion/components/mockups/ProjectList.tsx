import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Project } from "../../data/stakeholderData";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type ProjectCardProps = {
  project: Project;
  delay: number;
  isSelected: boolean;
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
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

  const statusConfig = {
    active: {
      label: "Active",
      color: "#22c55e",
      bg: "rgba(34, 197, 94, 0.15)",
    },
    onboarding: {
      label: "Onboarding",
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.15)",
    },
    completed: {
      label: "Completed",
      color: "#6b7280",
      bg: "rgba(107, 114, 128, 0.15)",
    },
  };

  const status = statusConfig[project.status];

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
            ? `2px solid ${project.color}`
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isSelected
            ? `0 0 30px ${project.color}${Math.round(selectionGlow * 255)
                .toString(16)
                .padStart(2, "0")}`
            : "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          {/* Color indicator */}
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${project.color}90, ${project.color}60)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* Client initial */}
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "white",
                fontFamily: FONTS.body,
              }}
            >
              {project.client.charAt(0)}
            </span>
          </div>

          {/* Project info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1f2937",
                fontFamily: FONTS.body,
                marginBottom: 3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {project.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: project.color,
                fontFamily: FONTS.body,
                marginBottom: 8,
              }}
            >
              {project.client}
            </div>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {/* Status badge */}
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: 4,
                  background: status.bg,
                  fontSize: 10,
                  fontWeight: 600,
                  color: status.color,
                  fontFamily: FONTS.body,
                }}
              >
                {status.label}
              </div>

              {/* Counts */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 10,
                  color: "#64748b",
                  fontFamily: FONTS.body,
                }}
              >
                <span>{project.stakeholderCount} people</span>
                <span style={{ color: "#d1d5db" }}>|</span>
                <span>{project.personaCount} personas</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

type ProjectListProps = {
  projects: Project[];
  selectedIndex?: number;
  baseDelay?: number;
};

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  selectedIndex = -1,
  baseDelay = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation
  const headerProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          opacity: headerProgress,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#64748b",
            fontFamily: FONTS.body,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Projects
        </div>
        <div
          style={{
            fontSize: 11,
            color: "#94a3b8",
            fontFamily: FONTS.body,
            padding: "2px 8px",
            background: "rgba(0, 0, 0, 0.04)",
            borderRadius: 4,
          }}
        >
          {projects.length} active
        </div>
      </div>

      {/* Project cards */}
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          delay={baseDelay + index * 15}
          isSelected={index === selectedIndex}
        />
      ))}
    </div>
  );
};
