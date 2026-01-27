import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../components/AnimatedGradient";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

export const RevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale with confident bounce
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Brand name appears after logo
  const brandStartFrame = 20;
  const brandScale = spring({
    frame: frame - brandStartFrame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const brandOpacity = interpolate(frame - brandStartFrame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline appears with typing effect
  const taglineStartFrame = 45;
  const tagline = "One platform. All teams. Finally connected.";
  const charsPerFrame = 0.8;
  const charsToShow = Math.floor(
    interpolate(
      frame - taglineStartFrame,
      [0, tagline.length / charsPerFrame],
      [0, tagline.length],
      {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const displayTagline = tagline.slice(0, charsToShow);

  // Cursor blink
  const showCursor = frame >= taglineStartFrame && charsToShow < tagline.length;
  const cursorOpacity = showCursor && Math.floor(frame / 8) % 2 === 0 ? 1 : 0;

  // Glow effect on logo
  const glowIntensity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.6} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* Logo with glow */}
        <div
          style={{
            position: "relative",
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.accent}40 0%, transparent 70%)`,
              opacity: glowIntensity,
              filter: "blur(20px)",
            }}
          />
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 32,
              padding: 32,
              backdropFilter: "blur(10px)",
              position: "relative",
            }}
          >
            <Img
              src={staticFile("heliograph-logo.svg")}
              style={{ width: 160, height: 160 }}
            />
          </div>
        </div>

        {/* Brand name */}
        {frame >= brandStartFrame && (
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              transform: `scale(${brandScale})`,
              opacity: brandOpacity,
              letterSpacing: "-0.03em",
            }}
          >
            Heliograph
          </div>
        )}

        {/* Tagline with typing effect */}
        {frame >= taglineStartFrame && (
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              color: COLORS.textSecondary,
              fontFamily: FONTS.body,
              height: 60,
              display: "flex",
              alignItems: "center",
            }}
          >
            {displayTagline}
            <span
              style={{
                opacity: cursorOpacity,
                marginLeft: 2,
                color: COLORS.accent,
              }}
            >
              |
            </span>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
