import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../utils/colors";

type AnimatedGradientProps = {
  intensity?: number; // 0-1 for how much the gradient animates
  pulseSpeed?: number; // frames per pulse cycle
};

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  intensity = 0.5,
  pulseSpeed = 120,
}) => {
  const frame = useCurrentFrame();

  // Subtle gradient angle rotation
  const baseAngle = 135;
  const angleVariation = 15 * intensity;
  const gradientAngle = interpolate(
    frame % (pulseSpeed * 2),
    [0, pulseSpeed, pulseSpeed * 2],
    [baseAngle, baseAngle + angleVariation, baseAngle],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Subtle opacity pulse for depth
  const pulseOpacity = interpolate(
    frame % pulseSpeed,
    [0, pulseSpeed / 2, pulseSpeed],
    [0.95, 1, 0.95],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${gradientAngle}deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue}, ${COLORS.gradientBlueDark})`,
          opacity: pulseOpacity,
        }}
      />
      {/* Subtle noise overlay for texture */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: "overlay",
        }}
      />
    </AbsoluteFill>
  );
};
