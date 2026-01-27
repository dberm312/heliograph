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

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Building for customers?"
  const line1Scale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const line1Opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 1 exits
  const line1Exit = interpolate(frame, [40, 55], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line 2: "Your tools weren't built for this."
  const line2StartFrame = 45;
  const line2Scale = spring({
    frame: frame - line2StartFrame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const line2Opacity = interpolate(frame - line2StartFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.3} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Line 1 */}
        {frame < 60 && (
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              transform: `scale(${line1Scale})`,
              opacity: line1Opacity * line1Exit,
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            Building for customers?
          </div>
        )}

        {/* Line 2 */}
        {frame >= line2StartFrame && (
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              transform: `scale(${line2Scale})`,
              opacity: line2Opacity,
              textAlign: "center",
              letterSpacing: "-0.02em",
              maxWidth: 1400,
              lineHeight: 1.1,
            }}
          >
            Your tools weren&apos;t built for this.
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
