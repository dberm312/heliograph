import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

type AnimatedTextProps = {
  text: string;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  typewriter?: boolean;
  typewriterSpeed?: number; // chars per second
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = 48,
  color = "rgba(255, 255, 255, 1)",
  fontWeight = 400,
  typewriter = false,
  typewriterSpeed = 30,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (typewriter) {
    const charsPerFrame = typewriterSpeed / fps;
    const charsToShow = Math.floor(
      interpolate(
        frame - delay,
        [0, text.length / charsPerFrame],
        [0, text.length],
        {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        },
      ),
    );
    const displayText = text.slice(0, charsToShow);

    return (
      <span
        style={{
          fontSize,
          color,
          fontWeight,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {displayText}
        {charsToShow < text.length && (
          <span
            style={{
              opacity: Math.floor(frame / 15) % 2 === 0 ? 1 : 0,
            }}
          >
            |
          </span>
        )}
      </span>
    );
  }

  // Fade in animation
  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const y = interpolate(translateY, [0, 1], [20, 0]);

  return (
    <span
      style={{
        fontSize,
        color,
        fontWeight,
        fontFamily: "system-ui, sans-serif",
        opacity,
        transform: `translateY(${y}px)`,
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
};
