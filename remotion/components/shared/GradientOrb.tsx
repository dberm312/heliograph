import type React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface GradientOrbProps {
  color: 'orange' | 'blue';
  size: number;
  position: {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
  };
  pulseDelay?: number;
  opacity?: number;
}

export const GradientOrb: React.FC<GradientOrbProps> = ({
  color,
  size,
  position,
  pulseDelay = 0,
  opacity: baseOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulse animation (3 second cycle)
  const pulseDuration = 3 * fps; // 180 frames
  const pulseProgress = ((frame + pulseDelay) % pulseDuration) / pulseDuration;
  const pulseOpacity = interpolate(
    pulseProgress,
    [0, 0.5, 1],
    [0.6, 1, 0.6],
  );

  const orbColor =
    color === 'orange'
      ? 'rgba(251, 146, 60, 0.3)'
      : 'rgba(59, 130, 246, 0.2)';

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: orbColor,
        filter: 'blur(80px)',
        opacity: pulseOpacity * baseOpacity,
        pointerEvents: 'none',
        ...position,
      }}
    />
  );
};
