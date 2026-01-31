import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

export const IntroTitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance (earliest)
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const logoOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Heliograph title entrance
  const titleScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [5, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "The modern toolchain for" entrance (delayed)
  const tagline1Progress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const tagline1Y = interpolate(tagline1Progress, [0, 1], [30, 0]);
  const tagline1Opacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "customer-facing builders" entrance (more delayed)
  const tagline2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 22, stiffness: 110 },
  });

  const tagline2Y = interpolate(tagline2Progress, [0, 1], [30, 0]);
  const tagline2Opacity = interpolate(frame, [30, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URL entrance (most delayed)
  const urlProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 25, stiffness: 100 },
  });

  const urlY = interpolate(urlProgress, [0, 1], [20, 0]);
  const urlOpacity = interpolate(frame, [45, 60], [0, 1], {
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
          gap: 16,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile("heliograph-logo.svg")}
          style={{
            width: 480,
            height: 480,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            marginBottom: 24,
          }}
        />

        {/* Heliograph Title */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 800,
            color: COLORS.textPrimary,
            fontFamily: FONTS.display,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            letterSpacing: "-3px",
          }}
        >
          Heliograph
        </div>

        {/* Tagline Part 1 */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: FONTS.body,
            transform: `translateY(${tagline1Y}px)`,
            opacity: tagline1Opacity,
            textAlign: "center",
            marginTop: 16,
          }}
        >
          The modern toolchain for
        </div>

        {/* Tagline Part 2 - Gradient Text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            background: "linear-gradient(90deg, #fdba74, #fb923c)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: FONTS.body,
            transform: `translateY(${tagline2Y}px)`,
            opacity: tagline2Opacity,
            textAlign: "center",
          }}
        >
          customer-facing builders
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.6)",
            fontFamily: FONTS.body,
            transform: `translateY(${urlY}px)`,
            opacity: urlOpacity,
            textAlign: "center",
            marginTop: 32,
          }}
        >
          heliograph.dev
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
