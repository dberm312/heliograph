import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { COLORS } from "../utils/colors";

export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Edge label slides in from left
  const edgeProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const edgeX = interpolate(edgeProgress, [0, 1], [-300, 0]);
  const edgeOpacity = interpolate(edgeProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Core label slides in from right
  const coreProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 200 },
  });
  const coreX = interpolate(coreProgress, [0, 1], [300, 0]);
  const coreOpacity = interpolate(coreProgress, [0, 0.5], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Bridge connection draws from center
  const bridgeProgress = interpolate(frame - 50, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Logo appears as bridge
  const logoProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15 },
  });

  // Flow arrows animation
  const arrowProgress = interpolate(frame - 75, [0, 45], [0, 1], {
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
          gap: 50,
        }}
      >
        {/* Title */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "system-ui, sans-serif",
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
          }}
        >
          Edge to Core
        </div>

        {/* Connection visualization */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            position: "relative",
            width: 1400,
            height: 280,
          }}
        >
          {/* Edge (Left) */}
          <div
            style={{
              position: "absolute",
              left: 100,
              transform: `translateX(${edgeX}px)`,
              opacity: edgeOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 28,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: `3px solid ${COLORS.accent}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke={COLORS.accent}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: 24,
                  color: COLORS.textSecondary,
                  fontWeight: 500,
                }}
              >
                Frontline Teams
              </span>
            </div>
            <span
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: COLORS.accent,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Edge
            </span>
          </div>

          {/* Bridge / Connection */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Connection line */}
            <svg width="500" height="60" viewBox="0 0 500 60">
              {/* Left line */}
              <line
                x1="0"
                y1="30"
                x2={interpolate(bridgeProgress, [0, 0.5], [0, 200])}
                y2="30"
                stroke={COLORS.gradientOrange}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="12 8"
              />
              {/* Right line */}
              <line
                x1="500"
                y1="30"
                x2={interpolate(bridgeProgress, [0.5, 1], [500, 300])}
                y2="30"
                stroke={COLORS.gradientBlue}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="12 8"
              />
              {/* Flow arrows */}
              {arrowProgress > 0 && (
                <>
                  <polygon
                    points={`${100 + arrowProgress * 100},25 ${110 + arrowProgress * 100},30 ${100 + arrowProgress * 100},35`}
                    fill={COLORS.gradientOrange}
                    opacity={Math.min(1, arrowProgress * 2)}
                  />
                  <polygon
                    points={`${400 - arrowProgress * 100},25 ${390 - arrowProgress * 100},30 ${400 - arrowProgress * 100},35`}
                    fill={COLORS.gradientBlue}
                    opacity={Math.min(1, arrowProgress * 2)}
                  />
                </>
              )}
            </svg>

            {/* Heliograph logo as the bridge */}
            <div
              style={{
                transform: `scale(${logoProgress})`,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 20,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <Img
                src={staticFile("heliograph-logo.svg")}
                style={{ width: 64, height: 64 }}
              />
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Heliograph
              </span>
            </div>
          </div>

          {/* Core (Right) */}
          <div
            style={{
              position: "absolute",
              right: 100,
              transform: `translateX(${coreX}px)`,
              opacity: coreOpacity,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: 28,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                border: `3px solid ${COLORS.gradientBlue}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                  stroke={COLORS.gradientBlue}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                  stroke={COLORS.gradientBlue}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: 24,
                  color: COLORS.textSecondary,
                  fontWeight: 500,
                }}
              >
                Core Product
              </span>
            </div>
            <span
              style={{
                fontSize: 44,
                fontWeight: 600,
                color: COLORS.gradientBlue,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Core
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
