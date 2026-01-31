import type React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MODULE_COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";
import type { Callout } from "../data/stakeholderData";

type CalloutBubbleProps = {
  callout: Callout;
  containerWidth: number;
  containerHeight: number;
};

export const CalloutBubble: React.FC<CalloutBubbleProps> = ({
  callout,
  containerWidth,
  containerHeight,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isVisible =
    frame >= callout.appearAt &&
    frame < callout.appearAt + callout.duration;

  if (!isVisible) return null;

  // Calculate entrance and exit progress
  const entranceProgress = spring({
    frame: frame - callout.appearAt,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const exitStart = callout.appearAt + callout.duration - 15;
  const exitProgress = interpolate(
    frame,
    [exitStart, callout.appearAt + callout.duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const combinedOpacity = Math.min(entranceProgress, exitProgress);
  const scale = interpolate(entranceProgress, [0, 1], [0.9, 1]);

  // Convert percentage position to pixels
  const x = (callout.position.x / 100) * containerWidth;
  const y = (callout.position.y / 100) * containerHeight;

  // Calculate pointer arrow path if pointTo is specified
  const pointerPath = callout.pointTo
    ? calculatePointerPath(
        callout.position,
        callout.pointTo,
        containerWidth,
        containerHeight
      )
    : null;

  return (
    <>
      {/* Pointer arrow SVG */}
      {pointerPath && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: containerWidth,
            height: containerHeight,
            pointerEvents: "none",
            opacity: combinedOpacity,
          }}
        >
          <defs>
            <linearGradient
              id={`pointer-gradient-${callout.id}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={MODULE_COLORS.stakeholderManagement.primary}
                stopOpacity="0.6"
              />
              <stop
                offset="100%"
                stopColor={MODULE_COLORS.stakeholderManagement.primary}
                stopOpacity="0.2"
              />
            </linearGradient>
          </defs>
          <path
            d={pointerPath}
            stroke={`url(#pointer-gradient-${callout.id})`}
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,4"
          />
          {/* Arrow head */}
          {callout.pointTo && (
            <circle
              cx={(callout.pointTo.x / 100) * containerWidth}
              cy={(callout.pointTo.y / 100) * containerHeight}
              r="4"
              fill={MODULE_COLORS.stakeholderManagement.primary}
              opacity="0.6"
            />
          )}
        </svg>
      )}

      {/* Callout bubble */}
      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${scale})`,
          opacity: combinedOpacity,
          maxWidth: 300,
          padding: "14px 18px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 12,
          border: `1px solid ${MODULE_COLORS.stakeholderManagement.primary}40`,
          boxShadow: `
            0 4px 24px rgba(139, 92, 246, 0.15),
            0 0 0 1px rgba(139, 92, 246, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8)
          `,
          pointerEvents: "none",
        }}
      >
        {/* Purple accent dot */}
        <div
          style={{
            position: "absolute",
            top: -4,
            left: 20,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: MODULE_COLORS.stakeholderManagement.primary,
            boxShadow: `0 0 8px ${MODULE_COLORS.stakeholderManagement.primary}80`,
          }}
        />

        <p
          style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 500,
            color: "#1f2937",
            fontFamily: FONTS.body,
            lineHeight: 1.5,
          }}
        >
          {callout.text}
        </p>
      </div>
    </>
  );
};

// Helper function to calculate a curved path between two points
function calculatePointerPath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  containerWidth: number,
  containerHeight: number
): string {
  const x1 = (from.x / 100) * containerWidth;
  const y1 = (from.y / 100) * containerHeight;
  const x2 = (to.x / 100) * containerWidth;
  const y2 = (to.y / 100) * containerHeight;

  // Calculate control point for a smooth curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Offset the control point perpendicular to the line
  const dx = x2 - x1;
  const dy = y2 - y1;
  const curvature = 0.3;
  const controlX = midX - dy * curvature;
  const controlY = midY + dx * curvature;

  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}

// Overlay component that renders all callouts
type CalloutOverlayProps = {
  callouts: Callout[];
  containerWidth: number;
  containerHeight: number;
};

export const CalloutOverlay: React.FC<CalloutOverlayProps> = ({
  callouts,
  containerWidth,
  containerHeight,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: containerWidth,
        height: containerHeight,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {callouts.map((callout) => (
        <CalloutBubble
          key={callout.id}
          callout={callout}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
        />
      ))}
    </div>
  );
};
