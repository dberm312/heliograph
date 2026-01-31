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

    </div>
  );
};
