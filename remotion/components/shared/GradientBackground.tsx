import type React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONT_CSS } from '../../styles/constants';

export const GradientBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle gradient rotation over the video duration
  const gradientAngle = interpolate(frame, [0, durationInFrames], [135, 145], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* Font imports */}
      <style>{FONT_CSS}</style>

      {/* Main gradient background */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${gradientAngle}deg,
            ${COLORS.backgroundOrange} 0%,
            ${COLORS.backgroundBlue} 50%,
            ${COLORS.backgroundBlueDark} 100%)`,
        }}
      />

      {/* Noise texture overlay */}
      <AbsoluteFill
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
