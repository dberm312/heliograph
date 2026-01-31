import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { FeatureItem } from "../data/stakeholderData";
import { MODULE_COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

type FeatureCommentaryProps = {
  title: string;
  items: FeatureItem[];
  accentColor?: string; // Defaults to MODULE_COLORS.stakeholderManagement.primary
};

type FeatureItemComponentProps = {
  item: FeatureItem;
  isActive: boolean;
  isPast: boolean;
  index: number;
  accentColor: string;
};

const FeatureItemComponent: React.FC<FeatureItemComponentProps> = ({
  item,
  isActive,
  isPast,
  index,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entranceProgress = spring({
    frame: frame - item.appearAt,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const opacity = interpolate(entranceProgress, [0, 1], [0, 1]);
  const translateY = interpolate(entranceProgress, [0, 1], [20, 0]);

  // Active state glow animation
  const activeGlow = isActive
    ? interpolate(Math.sin((frame - item.appearAt) * 0.1), [-1, 1], [0.4, 0.7])
    : 0;

  return (
    <div
      style={{
        opacity: isPast && !isActive ? 0.5 : opacity,
        transform: `translateY(${translateY}px)`,
        padding: "20px 24px",
        marginBottom: 12,
        borderRadius: 12,
        background: isActive
          ? `linear-gradient(135deg, ${accentColor}15, ${accentColor}08)`
          : "rgba(0, 0, 0, 0.02)",
        border: isActive
          ? `1px solid ${accentColor}40`
          : "1px solid rgba(0, 0, 0, 0.04)",
        boxShadow: isActive
          ? `0 0 24px ${accentColor}${Math.round(activeGlow * 255)
              .toString(16)
              .padStart(2, "0")}`
          : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Active indicator dot */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: 4,
          height: isActive ? "60%" : "0%",
          borderRadius: 2,
          background: accentColor,
          opacity: isActive ? 1 : 0,
          transition: "height 0.2s ease",
        }}
      />

      {/* Number badge */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: isActive
              ? accentColor
              : isPast
                ? "rgba(0, 0, 0, 0.08)"
                : "rgba(0, 0, 0, 0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 600,
            fontFamily: FONTS.body,
            color: isActive ? "#fff" : "rgba(0, 0, 0, 0.5)",
            flexShrink: 0,
          }}
        >
          {isPast && !isActive ? (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            index + 1
          )}
        </div>

        {/* Text content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              lineHeight: 1.4,
              fontFamily: FONTS.body,
              fontWeight: isActive ? 500 : 400,
              color: isActive ? "#1f2937" : "#6b7280",
            }}
          >
            {item.text}
          </p>
          <p
            style={{
              margin: 0,
              marginTop: 6,
              fontSize: 16,
              lineHeight: 1.5,
              fontFamily: FONTS.body,
              fontWeight: 400,
              color: "#9ca3af",
            }}
          >
            {item.subtext}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FeatureCommentary: React.FC<FeatureCommentaryProps> = ({
  title,
  items,
  accentColor = MODULE_COLORS.stakeholderManagement.primary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance animation
  const headerEntrance = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  const headerOpacity = interpolate(headerEntrance, [0, 1], [0, 1]);
  const headerY = interpolate(headerEntrance, [0, 1], [-20, 0]);

  // Find current active item (most recent item that has appeared)
  const activeIndex = items.reduce((acc, item, index) => {
    if (frame >= item.appearAt) {
      return index;
    }
    return acc;
  }, -1);

  // Filter to only show items that have appeared
  const visibleItems = items.filter((item) => frame >= item.appearAt);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "32px 24px",
      }}
    >
      {/* Header */}
      <div
        style={{
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
          marginBottom: 32,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            fontWeight: 600,
            fontFamily: FONTS.display,
            color: accentColor,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 48,
            height: 3,
            borderRadius: 2,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
          }}
        />
      </div>

      {/* Feature items list */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {visibleItems.map((item) => {
          const originalIndex = items.findIndex((i) => i.id === item.id);
          const isActive = originalIndex === activeIndex;
          const isPast = originalIndex < activeIndex;

          return (
            <FeatureItemComponent
              key={item.id}
              item={item}
              isActive={isActive}
              isPast={isPast}
              index={originalIndex}
              accentColor={accentColor}
            />
          );
        })}
      </div>
    </div>
  );
};
