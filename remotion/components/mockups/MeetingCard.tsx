import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { MeetingNote, Person } from "../../data/stakeholderData";
import { ACME_INDIVIDUALS } from "../../data/stakeholderData";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";
import { GlassCard } from "./GlassCard";

type MeetingCardProps = {
  meeting: MeetingNote;
  delay: number;
};

export const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, delay }) => {
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

  // Get attendee data
  const attendees = meeting.attendees
    .map((id) => ACME_INDIVIDUALS.find((p) => p.id === id))
    .filter(Boolean) as Person[];

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
            marginBottom: 10,
          }}
        >
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "#1f2937",
              fontFamily: FONTS.body,
              flex: 1,
            }}
          >
            {meeting.title}
          </div>

          {/* Date badge */}
          <div
            style={{
              fontSize: 11,
              color: "#64748b",
              fontFamily: FONTS.body,
              padding: "4px 10px",
              background: "rgba(0, 0, 0, 0.04)",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            {meeting.date}
          </div>
        </div>

        {/* Summary */}
        <div
          style={{
            fontSize: 13,
            color: "#64748b",
            fontFamily: FONTS.body,
            lineHeight: 1.5,
            marginBottom: 14,
          }}
        >
          {meeting.summary}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Attendees */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                marginRight: 4,
              }}
            >
              {attendees.map((person, index) => (
                <div
                  key={person.id}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${MODULE_COLORS.projectManagement.primary}90, ${MODULE_COLORS.projectManagement.primary}60)`,
                    border: "2px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "white",
                    fontFamily: FONTS.body,
                    marginLeft: index > 0 ? -8 : 0,
                    zIndex: attendees.length - index,
                  }}
                >
                  {person.avatar}
                </div>
              ))}
            </div>
            <span
              style={{
                fontSize: 11,
                color: "#94a3b8",
                fontFamily: FONTS.body,
              }}
            >
              {attendees.length} attendee{attendees.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Action items */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 10px",
              borderRadius: 6,
              background:
                meeting.actionItems > 0
                  ? "rgba(249, 115, 22, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke={
                meeting.actionItems > 0
                  ? MODULE_COLORS.projectManagement.primary
                  : "#94a3b8"
              }
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
            </svg>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color:
                  meeting.actionItems > 0
                    ? MODULE_COLORS.projectManagement.primary
                    : "#94a3b8",
                fontFamily: FONTS.body,
              }}
            >
              {meeting.actionItems} action item
              {meeting.actionItems !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

type MeetingListProps = {
  meetings: MeetingNote[];
  baseDelay?: number;
};

export const MeetingList: React.FC<MeetingListProps> = ({
  meetings,
  baseDelay = 250,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {meetings.map((meeting, index) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          delay={baseDelay + index * 18}
        />
      ))}
    </div>
  );
};
