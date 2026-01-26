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

export const Scene1Logo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 30,
  });

  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline typewriter effect (starts after logo)
  const tagline = "Align your teams. Amplify your impact.";
  const taglineStartFrame = 45;
  const charsPerSecond = 25;
  const charsPerFrame = charsPerSecond / fps;

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
  const showCursor = frame >= taglineStartFrame && charsToShow < tagline.length;

  return (
    <AbsoluteFill>
      <GradientBackground />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {/* Logo container */}
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
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 24,
              padding: 24,
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
              fontWeight: 600,
              color: COLORS.textPrimary,
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Heliograph
          </span>
        </div>

        {/* Tagline with typewriter effect */}
        <div
          style={{
            fontSize: 48,
            color: COLORS.textSecondary,
            fontFamily: "system-ui, sans-serif",
            fontWeight: 400,
            height: 60,
          }}
        >
          {displayTagline}
          {showCursor && (
            <span
              style={{
                opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
              }}
            >
              |
            </span>
          )}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
