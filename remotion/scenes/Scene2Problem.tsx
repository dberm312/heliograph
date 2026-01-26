import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { COLORS } from "../utils/colors";

export const Scene2Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title fade in
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = spring({
    frame,
    fps,
    config: { damping: 200 },
  });
  const titleTranslateY = interpolate(titleY, [0, 1], [-30, 0]);

  // Arrows converging animation
  const arrowProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const leftArrowX = interpolate(arrowProgress, [0, 1], [-300, -200]);
  const rightArrowX = interpolate(arrowProgress, [0, 1], [300, 200]);

  // Labels fade in
  const leftLabelOpacity = interpolate(frame - 45, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rightLabelOpacity = interpolate(frame - 55, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Question mark pulsing
  const questionScale = interpolate(frame % 30, [0, 15, 30], [1, 1.1, 1], {
    extrapolateRight: "clamp",
  });
  const questionOpacity = interpolate(frame - 75, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GradientBackground />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "system-ui, sans-serif",
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
          }}
        >
          The Convergence Challenge
        </div>

        {/* Converging arrows visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            position: "relative",
            width: 1200,
            height: 200,
          }}
        >
          {/* Left side - Product to Services */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: `translateX(${leftArrowX}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: leftLabelOpacity,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 21h18M3 7v1a3 3 0 003 3h12a3 3 0 003-3V7M21 7H3l9-4 9 4z"
                stroke={COLORS.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 40,
                color: COLORS.textSecondary,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Product
            </span>
            {/* Arrow pointing right */}
            <svg width="60" height="40" viewBox="0 0 60 40">
              <path
                d="M5 20 L45 20 M35 10 L45 20 L35 30"
                stroke={COLORS.gradientOrange}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Center question mark */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: `translateX(-50%) scale(${questionScale})`,
              opacity: questionOpacity,
              fontSize: 100,
              color: COLORS.accent,
              fontWeight: 700,
            }}
          >
            ?
          </div>

          {/* Right side - Services to Product */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: `translateX(${rightArrowX}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              opacity: rightLabelOpacity,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 7h-9M14 17H5M17 17a3 3 0 100-6 3 3 0 000 6zM7 7a3 3 0 100-6 3 3 0 000 6z"
                stroke={COLORS.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 40,
                color: COLORS.textSecondary,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              Services
            </span>
            {/* Arrow pointing left */}
            <svg width="60" height="40" viewBox="0 0 60 40">
              <path
                d="M55 20 L15 20 M25 10 L15 20 L25 30"
                stroke={COLORS.gradientOrange}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: COLORS.textTertiary,
            fontFamily: "system-ui, sans-serif",
            opacity: interpolate(frame - 85, [0, 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Custom work and core capabilities must flow together
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
