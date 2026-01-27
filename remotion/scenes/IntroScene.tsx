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

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text entrance animation
  const textScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 150 },
  });

  const textOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out at end of scene
  const fadeOut = interpolate(frame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.4} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 120,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: FONTS.display,
            transform: `scale(${textScale})`,
            opacity: textOpacity * fadeOut,
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: 1400,
            letterSpacing: "-0.02em",
          }}
        >
          When you're working as an FDE, you're working cross-functionally
          across many different skills and tools
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
