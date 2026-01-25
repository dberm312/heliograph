import type React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
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
import { GlassCard, GradientOrb } from '../shared';

/**
 * Scene 1: The Problem (0-10s / 600 frames)
 *
 * "You build something brilliant for one client."
 * "It stays trapped."
 *
 * Visual: Glass card appears representing custom work, then gets pushed/trapped
 */
export const Scene1Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const line1Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 30, // 0.5s
  });

  const line2Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 120, // 2s
  });

  const brilliantProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 90, // 1.5s
  });

  const line3Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 240, // 4s
  });

  // Card animation
  const cardAppear = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 180, // 3s
  });

  // Card gets trapped/pushed to corner
  const cardTrapProgress = interpolate(frame, [300, 420], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardScale = interpolate(cardTrapProgress, [0, 1], [1, 0.6]);
  const cardX = interpolate(cardTrapProgress, [0, 1], [0, 500]);
  const cardY = interpolate(cardTrapProgress, [0, 1], [0, -200]);
  const cardOpacity = interpolate(cardTrapProgress, [0.8, 1], [1, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Barrier animation
  const barrierProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
    delay: 360, // 6s
  });

  // "trapped" text emphasis
  const trappedGlow = interpolate(
    frame,
    [420, 480, 540],
    [0, 1, 0.6],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Decorative orbs */}
      <GradientOrb
        color="orange"
        size={600}
        position={{ top: -200, left: -200 }}
        opacity={0.6}
      />
      <GradientOrb
        color="blue"
        size={500}
        position={{ bottom: -150, right: -100 }}
        opacity={0.4}
        pulseDelay={90}
      />

      {/* Main text container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          maxWidth: 1400,
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* Line 1: "You build something" */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.heading1,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.textPrimary,
            opacity: line1Progress,
            transform: `translateY(${interpolate(line1Progress, [0, 1], [40, 0])}px)`,
          }}
        >
          You build something
        </div>

        {/* Line 2: "brilliant" with orange highlight */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.hero,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.edge,
            opacity: brilliantProgress,
            transform: `translateY(${interpolate(brilliantProgress, [0, 1], [40, 0])}px) scale(${interpolate(brilliantProgress, [0, 1], [0.9, 1])})`,
            textShadow: `0 0 60px ${COLORS.orangeGlow}, 0 0 120px ${COLORS.orangeGlow}`,
          }}
        >
          brilliant
        </div>

        {/* Line 3: "for one client." */}
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.heading1,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.textPrimary,
            opacity: line2Progress,
            transform: `translateY(${interpolate(line2Progress, [0, 1], [40, 0])}px)`,
          }}
        >
          for one client.
        </div>
      </div>

      {/* Glass card representing custom work */}
      <div
        style={{
          position: 'absolute',
          transform: `translate(${cardX}px, ${cardY}px) scale(${cardScale})`,
          opacity: cardAppear * cardOpacity,
          zIndex: 5,
        }}
      >
        <GlassCard
          glow="orange"
          style={{
            padding: '40px 60px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          {/* Icon: sparkle/custom work */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: `linear-gradient(135deg, ${COLORS.edge}, ${COLORS.backgroundOrange})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke={COLORS.white}
              strokeWidth="2"
            >
              <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: FONT_SIZES.body,
              fontWeight: FONT_WEIGHTS.medium,
              color: COLORS.textPrimary,
            }}
          >
            Custom Solution
          </div>
        </GlassCard>
      </div>

      {/* Barrier visual */}
      <div
        style={{
          position: 'absolute',
          right: 200,
          top: '50%',
          transform: `translateY(-50%) scaleX(${barrierProgress})`,
          transformOrigin: 'right center',
          width: 8,
          height: 400,
          background: `linear-gradient(180deg, transparent 0%, ${COLORS.textSecondary} 20%, ${COLORS.textSecondary} 80%, transparent 100%)`,
          borderRadius: 4,
          opacity: barrierProgress * 0.6,
        }}
      />

      {/* "It stays trapped." text */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.heading2,
          fontWeight: FONT_WEIGHTS.semibold,
          color: COLORS.textSecondary,
          opacity: line3Progress,
          transform: `translateY(${interpolate(line3Progress, [0, 1], [30, 0])}px)`,
          textShadow: trappedGlow > 0
            ? `0 0 ${40 * trappedGlow}px rgba(255, 255, 255, ${0.3 * trappedGlow})`
            : 'none',
        }}
      >
        It stays trapped.
      </div>
    </AbsoluteFill>
  );
};
