import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animated gradient background
  const gradientAngle = interpolate(frame, [0, 90], [135, 145]);
  const pulseOpacity = interpolate(frame % 45, [0, 22, 45], [0.95, 1, 0.95]);

  // Logo entrance with pulse
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150 },
  });

  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse on logo
  const logoPulse = interpolate(frame % 30, [0, 15, 30], [1, 1.03, 1]);

  // Tagline fade in
  const taglineStartFrame = 15;
  const taglineOpacity = interpolate(
    frame - taglineStartFrame,
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const taglineY = interpolate(
    spring({
      frame: frame - taglineStartFrame,
      fps,
      config: { damping: 200 },
    }),
    [0, 1],
    [30, 0],
  );

  // URL fade in
  const urlStartFrame = 40;
  const urlOpacity = interpolate(frame - urlStartFrame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* Animated gradient background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${gradientAngle}deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue}, ${COLORS.gradientBlueDark})`,
          opacity: pulseOpacity,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale * logoPulse})`,
            opacity: logoOpacity,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 28,
              padding: 28,
            }}
          >
            <Img
              src={staticFile("heliograph-logo.svg")}
              style={{ width: 140, height: 140 }}
            />
          </div>
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              letterSpacing: "-0.03em",
            }}
          >
            Heliograph
          </span>
        </div>

        {/* Tagline */}
        {frame >= taglineStartFrame && (
          <div
            style={{
              fontSize: 40,
              fontWeight: 500,
              color: COLORS.textSecondary,
              fontFamily: FONTS.body,
              transform: `translateY(${taglineY}px)`,
              opacity: taglineOpacity,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            The modern toolchain for customer-facing builders.
          </div>
        )}

        {/* URL */}
        {frame >= urlStartFrame && (
          <div
            style={{
              fontSize: 48,
              fontWeight: 600,
              color: COLORS.accent,
              fontFamily: FONTS.display,
              opacity: urlOpacity,
              marginTop: 16,
              letterSpacing: "-0.01em",
            }}
          >
            heliograph.dev
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
