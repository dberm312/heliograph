import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Sequence,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { COLORS } from "../utils/colors";

type FeatureItemProps = {
  icon: "sparkles" | "message" | "bot" | "users";
  title: string;
  description: string;
  index: number;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const iconScale = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const textOpacity = interpolate(frame - 8, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textY = spring({
    frame: frame - 8,
    fps,
    config: { damping: 200 },
  });
  const translateY = interpolate(textY, [0, 1], [15, 0]);

  const icons = {
    sparkles: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1zM19 11l.5 1.5L21 13l-1.5.5-.5 1.5-.5-1.5L17 13l1.5-.5.5-1.5z"
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    message: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bot: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 8V4H8M2 14h2M20 14h2M9 18h6M9 14a1 1 0 100-2 1 1 0 000 2zM15 14a1 1 0 100-2 1 1 0 000 2z"
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="4"
          y="6"
          width="16"
          height="12"
          rx="2"
          stroke={COLORS.accent}
          strokeWidth="2"
        />
      </svg>
    ),
    users: (
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
        <path
          d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
          stroke={COLORS.accent}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  // Position based on index (2x2 grid)
  const positions = [
    { left: "25%", top: "30%" },
    { left: "75%", top: "30%" },
    { left: "25%", top: "70%" },
    { left: "75%", top: "70%" },
  ];

  const pos = positions[index];

  return (
    <div
      style={{
        position: "absolute",
        left: pos.left,
        top: pos.top,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        width: 400,
      }}
    >
      <div
        style={{
          transform: `scale(${iconScale})`,
          width: 100,
          height: 100,
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icons[icon]}
      </div>
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${translateY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "system-ui, sans-serif",
            marginBottom: 10,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 24,
            color: COLORS.textTertiary,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const Scene4Features: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const features = [
    {
      icon: "sparkles" as const,
      title: "Edge-to-Core Intelligence",
      description: "AI tracks custom requests and surfaces patterns",
    },
    {
      icon: "message" as const,
      title: "Heliograms",
      description: "Lightweight feedback forms with attribution",
    },
    {
      icon: "bot" as const,
      title: "AI-Native Workspace",
      description: "Human-AI collaboration, seamlessly",
    },
    {
      icon: "users" as const,
      title: "Cross-Functional Collab",
      description: "Break down silos between teams",
    },
  ];

  const featureDelay = 30; // frames between each feature

  return (
    <AbsoluteFill>
      <GradientBackground />
      <AbsoluteFill>
        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 64,
            fontWeight: 600,
            color: COLORS.textPrimary,
            fontFamily: "system-ui, sans-serif",
            opacity: titleOpacity,
          }}
        >
          Powerful Features
        </div>

        {/* Features grid */}
        <div
          style={{
            position: "absolute",
            top: 180,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {features.map((feature, index) => (
            <Sequence
              key={feature.title}
              from={index * featureDelay}
              layout="none"
            >
              <FeatureItem
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            </Sequence>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
