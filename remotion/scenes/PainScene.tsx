import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../components/AnimatedGradient";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

export const PainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Product. Engineering. Sales."
  const line1Scale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const line1Opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2: Tool names with staggered reveal
  const toolsStartFrame = 30;
  const tool1Opacity = interpolate(frame - toolsStartFrame, [0, 10], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tool2Opacity = interpolate(
    frame - toolsStartFrame - 12,
    [0, 10],
    [0, 0.6],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const tool3Opacity = interpolate(
    frame - toolsStartFrame - 24,
    [0, 10],
    [0, 0.6],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Fade out lines 1 and 2 before line 3
  const fadeOutStart = 100;
  const linesOpacityFade = interpolate(
    frame,
    [fadeOutStart, fadeOutStart + 15],
    [1, 0.25],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Line 3: "Zero connection." with punchy entrance
  const line3StartFrame = 110;
  const line3Scale = spring({
    frame: frame - line3StartFrame,
    fps,
    config: { damping: 15, stiffness: 180 },
  });

  const line3Opacity = interpolate(frame - line3StartFrame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const line3Y = interpolate(
    spring({
      frame: frame - line3StartFrame,
      fps,
      config: { damping: 200 },
    }),
    [0, 1],
    [30, 0],
  );

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.4} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        }}
      >
        {/* Line 1: Team names */}
        <div
          style={{
            opacity: line1Opacity * linesOpacityFade,
            transform: `scale(${line1Scale})`,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            Product. Engineering. Sales.
          </div>
        </div>

        {/* Line 2: Tool names (staggered) */}
        {frame >= toolsStartFrame && (
          <div
            style={{
              display: "flex",
              gap: 48,
              opacity: linesOpacityFade,
            }}
          >
            <span
              style={{
                fontSize: 44,
                fontWeight: 500,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
                opacity: tool1Opacity,
              }}
            >
              Linear
            </span>
            <span
              style={{
                fontSize: 44,
                fontWeight: 500,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
                opacity: tool2Opacity,
              }}
            >
              GitHub
            </span>
            <span
              style={{
                fontSize: 44,
                fontWeight: 500,
                color: COLORS.textSecondary,
                fontFamily: FONTS.body,
                opacity: tool3Opacity,
              }}
            >
              Salesforce
            </span>
          </div>
        )}

        {/* Line 3: "Zero connection." */}
        {frame >= line3StartFrame && (
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.accent,
              fontFamily: FONTS.display,
              transform: `scale(${line3Scale}) translateY(${line3Y}px)`,
              opacity: line3Opacity,
              textAlign: "center",
              letterSpacing: "-0.02em",
              marginTop: 32,
            }}
          >
            Zero connection.
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
