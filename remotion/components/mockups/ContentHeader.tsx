import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONTS } from "../../utils/fonts";

type ContentHeaderProps = {
  breadcrumb: string[];
  entranceDelay?: number;
};

export const ContentHeader: React.FC<ContentHeaderProps> = ({
  breadcrumb,
  entranceDelay = 20,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - entranceDelay,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const y = interpolate(entrance, [0, 1], [-10, 0]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Breadcrumb / Page navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {breadcrumb.map((item, index) => (
          <span key={item} style={{ display: "flex", alignItems: "center" }}>
            {index > 0 && (
              <span
                style={{
                  fontSize: 12,
                  color: "#94a3b8",
                  marginRight: 8,
                  fontFamily: FONTS.body,
                }}
              >
                /
              </span>
            )}
            <span
              style={{
                fontSize: index === breadcrumb.length - 1 ? 15 : 13,
                fontWeight: index === breadcrumb.length - 1 ? 600 : 400,
                color: index === breadcrumb.length - 1 ? "#1f2937" : "#64748b",
                fontFamily: FONTS.body,
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>

      {/* Heliograph Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* Logo mark - gradient square */}
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: "linear-gradient(135deg, #f97316 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(249, 115, 22, 0.25)",
          }}
        >
          {/* Inner mark - stylized "H" or sun rays */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1V3M7 11V13M1 7H3M11 7H13M3 3L4.5 4.5M9.5 9.5L11 11M3 11L4.5 9.5M9.5 4.5L11 3"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="7" cy="7" r="2" fill="white" />
          </svg>
        </div>

        {/* Logo text */}
        <span
          style={{
            fontFamily: FONTS.display,
            fontSize: 16,
            fontWeight: 600,
            color: "#1f2937",
            letterSpacing: "-0.01em",
          }}
        >
          Heliograph
        </span>
      </div>
    </div>
  );
};
