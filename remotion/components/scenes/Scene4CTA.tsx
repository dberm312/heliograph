import type React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  COLORS,
  FONTS,
  FONT_SIZES,
  FONT_WEIGHTS,
  SPRING_CONFIGS,
} from '../../styles/constants';
import { GradientOrb } from '../shared';

/**
 * Scene 4: CTA (35-40s / 300 frames)
 *
 * "Align your teams."
 * "Amplify your impact."
 *
 * Visual: Clean gradient, tagline springs in, logo with subtle glow
 */
export const Scene4CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const alignProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 30,
  });

  const amplifyProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 90,
  });

  const logoProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 150,
  });

  // Logo glow pulse
  const glowPulse = interpolate(
    frame,
    [200, 260, 300],
    [0.6, 1, 0.8],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Subtle decorative orbs */}
      <GradientOrb
        color="orange"
        size={400}
        position={{ top: '30%', left: '20%' }}
        opacity={0.3}
      />
      <GradientOrb
        color="blue"
        size={400}
        position={{ bottom: '30%', right: '20%' }}
        opacity={0.3}
        pulseDelay={45}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* "Align your teams." */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.hero,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.textPrimary,
            opacity: alignProgress,
            transform: `translateY(${interpolate(alignProgress, [0, 1], [50, 0])}px) scale(${interpolate(alignProgress, [0, 1], [0.9, 1])})`,
            textShadow: '0 4px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          Align your teams.
        </div>

        {/* "Amplify your impact." */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.heading1,
            fontWeight: FONT_WEIGHTS.semibold,
            color: COLORS.edge,
            opacity: amplifyProgress,
            transform: `translateY(${interpolate(amplifyProgress, [0, 1], [40, 0])}px)`,
            textShadow: `0 0 60px ${COLORS.orangeGlow}, 0 4px 40px rgba(0, 0, 0, 0.2)`,
          }}
        >
          Amplify your impact.
        </div>

        {/* Logo */}
        <div
          style={{
            marginTop: 60,
            opacity: logoProgress,
            transform: `translateY(${interpolate(logoProgress, [0, 1], [30, 0])}px) scale(${interpolate(logoProgress, [0, 1], [0.9, 1])})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Logo glow effect */}
          <div
            style={{
              position: 'relative',
            }}
          >
            {/* Glow behind logo */}
            <div
              style={{
                position: 'absolute',
                inset: -40,
                background: `radial-gradient(circle, ${COLORS.orangeGlow} 0%, transparent 70%)`,
                opacity: glowPulse * 0.5,
                filter: 'blur(20px)',
              }}
            />

            {/* Logo image or text fallback */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Sun/heliograph icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.edge}, ${COLORS.core})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 ${40 * glowPulse}px ${COLORS.orangeGlow}`,
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.white}
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </div>

              {/* Wordmark */}
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: FONT_SIZES.heading3,
                  fontWeight: FONT_WEIGHTS.bold,
                  color: COLORS.textPrimary,
                  letterSpacing: '0.02em',
                }}
              >
                Heliograph
              </div>
            </div>
          </div>

          {/* Tagline below logo */}
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.medium,
              color: COLORS.textSecondary,
              marginTop: 8,
            }}
          >
            Connect the edge to the core.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
