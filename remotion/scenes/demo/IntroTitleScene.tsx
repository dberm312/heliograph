import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

export const IntroTitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title entrance (delayed)
  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtitle entrance (more delayed)
  const subtitleProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 25, stiffness: 100 },
  });

  const subtitleY = interpolate(subtitleProgress, [0, 1], [30, 0]);
  const subtitleOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.5} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          opacity: fadeOut,
        }}
      >
        {/* Heliograph Logo */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: FONTS.display,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Heliograph
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: FONTS.display,
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          See Heliograph in Action
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: COLORS.textSecondary,
            fontFamily: FONTS.body,
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleOpacity,
            textAlign: "center",
          }}
        >
          Three modules. One platform.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
