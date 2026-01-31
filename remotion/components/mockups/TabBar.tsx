import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

type Tab = {
  id: string;
  label: string;
  count?: number;
};

type TabBarProps = {
  tabs: Tab[];
  activeTabId: string;
  entranceDelay?: number;
};

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  entranceDelay = 180,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const y = interpolate(entrance, [0, 1], [10, 0]);

  // Find active tab index for underline position
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);

  const accentColor = MODULE_COLORS.stakeholderManagement.primary;

  return (
    <div
      style={{
        display: "flex",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        marginBottom: 20,
        position: "relative",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTabId;

        return (
          <div
            key={tab.id}
            style={{
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#1f2937" : "#64748b",
                fontFamily: FONTS.body,
                transition: "color 0.2s",
              }}
            >
              {tab.label}
            </span>

            {tab.count !== undefined && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: isActive ? accentColor : "#94a3b8",
                  fontFamily: FONTS.body,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: isActive
                    ? `${accentColor}15`
                    : "rgba(0, 0, 0, 0.04)",
                }}
              >
                {tab.count}
              </span>
            )}

            {/* Active indicator underline */}
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  bottom: -1,
                  left: 12,
                  right: 12,
                  height: 2,
                  background: accentColor,
                  borderRadius: 1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

// Header for detail panel that includes stakeholder name
type DetailPanelHeaderProps = {
  stakeholderName: string;
  stakeholderType: "individual" | "persona";
  entranceDelay?: number;
};

export const DetailPanelHeader: React.FC<DetailPanelHeaderProps> = ({
  stakeholderName,
  stakeholderType,
  entranceDelay = 175,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const x = interpolate(entrance, [0, 1], [20, 0]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "#94a3b8",
            fontFamily: FONTS.body,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: 4,
          }}
        >
          {stakeholderType === "persona" ? "Persona" : "Stakeholder"}
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#1f2937",
            fontFamily: FONTS.display,
          }}
        >
          {stakeholderName}
        </div>
      </div>

      {/* Quick actions placeholder */}
      <div
        style={{
          display: "flex",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "rgba(0, 0, 0, 0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>
    </div>
  );
};
