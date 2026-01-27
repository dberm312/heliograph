import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../components/AnimatedGradient";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

type FeatureProps = {
  headline: string;
  subtext: string;
  index: number;
};

const Feature: React.FC<FeatureProps> = ({ headline, subtext, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline animation
  const headlineScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const headlineOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineX = interpolate(
    spring({
      frame,
      fps,
      config: { damping: 200 },
    }),
    [0, 1],
    [index % 2 === 0 ? -100 : 100, 0],
  );

  // Subtext appears after headline
  const subtextOpacity = interpolate(frame - 12, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtextY = interpolate(
    spring({
      frame: frame - 12,
      fps,
      config: { damping: 200 },
    }),
    [0, 1],
    [20, 0],
  );

  // Accent line animation
  const lineWidth = interpolate(frame - 8, [0, 15], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Headline */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.textPrimary,
          fontFamily: FONTS.display,
          transform: `scale(${headlineScale}) translateX(${headlineX}px)`,
          opacity: headlineOpacity,
          letterSpacing: "-0.02em",
        }}
      >
        {headline}
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 4,
          backgroundColor: COLORS.accent,
          borderRadius: 2,
        }}
      />

      {/* Subtext */}
      <div
        style={{
          fontSize: 36,
          fontWeight: 500,
          color: COLORS.textSecondary,
          fontFamily: FONTS.body,
          transform: `translateY(${subtextY}px)`,
          opacity: subtextOpacity,
        }}
      >
        {subtext}
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const features = [
    {
      headline: "Project Management",
      subtext: "Tasks that connect to your customers",
    },
    {
      headline: "Version Control",
      subtext: "For everything. Not just code.",
    },
    {
      headline: "Stakeholder Tracking",
      subtext: "Requirements meet reality",
    },
  ];

  const featureDuration = 55; // frames per feature
  const featureGap = 5; // small overlap for snappiness

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.4} />
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {features.map((feature, index) => (
          <Sequence
            key={feature.headline}
            from={index * (featureDuration - featureGap)}
            durationInFrames={featureDuration}
            layout="none"
          >
            <AbsoluteFill
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feature
                headline={feature.headline}
                subtext={feature.subtext}
                index={index}
              />
            </AbsoluteFill>
          </Sequence>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
