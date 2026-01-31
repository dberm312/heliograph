import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { Person, Persona, Stakeholder } from "../../data/stakeholderData";
import { isPerson, isPersona } from "../../data/stakeholderData";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";
import { PersonaCard } from "./PersonaCard";

// Individual person card (similar to original StakeholderCard)
type PersonCardProps = {
  person: Person;
  delay: number;
  isSelected: boolean;
};

const PersonCard: React.FC<PersonCardProps> = ({
  person,
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

  // Use orange color for individuals
  const accentColor = MODULE_COLORS.projectManagement.primary;

  const statusColors = {
    active: "#22c55e",
    pending: "#eab308",
    inactive: "#6b7280",
  };

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
        opacity={isSelected ? 0.15 : 0.08}
        style={{
          border: isSelected
            ? `2px solid ${accentColor}`
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isSelected
            ? `0 0 30px rgba(249, 115, 22, ${selectionGlow})`
            : "none",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Avatar */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${accentColor}90, ${accentColor}60)`,
              border: `2px solid ${accentColor}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 700,
              color: "white",
              fontFamily: FONTS.body,
              flexShrink: 0,
            }}
          >
            {person.avatar}
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
              {person.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                fontFamily: FONTS.body,
              }}
            >
              {person.role}
            </div>
            <div
              style={{
                fontSize: 10,
                color: accentColor,
                fontFamily: FONTS.body,
                marginTop: 3,
              }}
            >
              {person.company}
            </div>
          </div>

          {/* Status indicator */}
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: statusColors[person.status],
              boxShadow:
                person.status === "active"
                  ? `0 0 8px ${statusColors[person.status]}80`
                  : "none",
              flexShrink: 0,
            }}
          />
        </div>
      </GlassCard>
    </div>
  );
};

// Section header component
type SectionHeaderProps = {
  title: string;
  count: number;
  delay: number;
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  count,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
        opacity: entrance,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#94a3b8",
          fontFamily: FONTS.body,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 10,
          color: "#cbd5e1",
          fontFamily: FONTS.body,
          padding: "1px 6px",
          background: "rgba(0, 0, 0, 0.04)",
          borderRadius: 4,
        }}
      >
        {count}
      </div>
    </div>
  );
};

type PeoplePersonaListProps = {
  individuals: Person[];
  personas: Persona[];
  selectedId?: string;
  baseDelay?: number;
};

export const PeoplePersonaList: React.FC<PeoplePersonaListProps> = ({
  individuals,
  personas,
  selectedId,
  baseDelay = 100,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header animation for the main section
  const headerProgress = spring({
    frame: frame - (baseDelay - 10),
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Calculate delays for staggered animation
  const individualsStartDelay = baseDelay;
  const dividersDelay = individualsStartDelay + individuals.length * 12 + 10;
  const personasStartDelay = dividersDelay + 15;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Main header */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#64748b",
          fontFamily: FONTS.body,
          marginBottom: 16,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          opacity: headerProgress,
        }}
      >
        Stakeholders
      </div>

      {/* Individuals section */}
      <SectionHeader
        title="Individuals"
        count={individuals.length}
        delay={individualsStartDelay - 5}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {individuals.map((person, index) => (
          <PersonCard
            key={person.id}
            person={person}
            delay={individualsStartDelay + index * 12}
            isSelected={person.id === selectedId}
          />
        ))}
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)",
          margin: "16px 0",
          opacity: interpolate(
            spring({
              frame: frame - dividersDelay,
              fps,
              config: { damping: 20, stiffness: 100 },
            }),
            [0, 1],
            [0, 1],
          ),
        }}
      />

      {/* Personas section */}
      <SectionHeader
        title="Personas"
        count={personas.length}
        delay={personasStartDelay - 5}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {personas.map((persona, index) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            delay={personasStartDelay + index * 12}
            isSelected={persona.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
};
