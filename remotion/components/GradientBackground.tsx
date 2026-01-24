import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { COLORS } from "../utils/colors";

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle gradient shift animation
  const gradientAngle = interpolate(frame, [0, 540], [135, 145]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue}, ${COLORS.gradientBlueDark})`,
      }}
    />
  );
};
