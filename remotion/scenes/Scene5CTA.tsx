import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
} from "remotion";
import { COLORS } from "../utils/colors";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient pulse
  const pulseOpacity = interpolate(frame % 45, [0, 22, 45], [0.9, 1, 0.9]);
  const gradientAngle = interpolate(frame, [0, 60], [135, 140]);

  // Logo entrance with slight bounce
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 15 },
  });

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text animations
  const textProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });

  const textOpacity = interpolate(frame - 20, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  // Tagline
  const taglineOpacity = interpolate(frame - 35, [0, 15], [0, 1], {
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
          gap: 40,
        }}
      >
        {/* Logo */}
        <div
          style={{
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              borderRadius: 28,
              padding: 28,
            }}
          >
            <Img
              src={staticFile("heliograph-logo.svg")}
              style={{ width: 160, height: 160 }}
            />
          </div>
        </div>

        {/* Main CTA text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            fontSize: 84,
            fontWeight: 700,
            color: COLORS.textPrimary,
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          Transform how you build
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 40,
            color: COLORS.textSecondary,
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
          }}
        >
          Align your teams. Amplify your impact.
        </div>

        {/* Brand name */}
        <div
          style={{
            opacity: taglineOpacity,
            fontSize: 48,
            fontWeight: 600,
            color: COLORS.accent,
            fontFamily: "system-ui, sans-serif",
            marginTop: 24,
          }}
        >
          Heliograph
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
