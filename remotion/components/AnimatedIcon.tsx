import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import type { ReactNode } from "react";

type AnimatedIconProps = {
  children: ReactNode;
  delay?: number;
  size?: number;
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  delay = 0,
  size = 64,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 200 },
  });

  const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
