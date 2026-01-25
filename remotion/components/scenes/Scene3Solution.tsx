import type React from 'react';
import {
  AbsoluteFill,
  Easing,
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
 * Scene 3: The Solution (20-35s / 900 frames)
 *
 * "Heliograph connects the edge to the core."
 *
 * Visual: Logo transforms into bridge, particles flow, feature cards appear
 */
export const Scene3Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo animation
  const logoProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 0,
  });

  // "Heliograph connects" text
  const connectsTextProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 60,
  });

  // "the edge to the core" text
  const edgeCoreTextProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 120,
  });

  // Bridge animation
  const bridgeProgress = interpolate(frame, [180, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Particle flow (continuous after bridge forms)
  const particlePhase = Math.max(0, frame - 300);

  // Feature cards
  const feature1Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 420,
  });

  const feature2Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 510,
  });

  const feature3Progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.gentle,
    delay: 600,
  });

  // Features orbit/settle animation
  const orbitProgress = interpolate(frame, [720, 900], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const features = [
    {
      title: 'Edge-to-Core Intelligence',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
      progress: feature1Progress,
      startX: -400,
    },
    {
      title: 'AI-Native Workspace',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
          <path d="M12 8V4H8" />
          <rect x="8" y="8" width="8" height="8" rx="1" />
          <path d="M12 16v4h4" />
          <path d="M16 12h4v4" />
          <path d="M4 12H8" />
        </svg>
      ),
      progress: feature2Progress,
      startX: 0,
    },
    {
      title: 'Cross-Functional Collaboration',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={COLORS.white} strokeWidth="2">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      progress: feature3Progress,
      startX: 400,
    },
  ];

  // Generate particles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const baseOffset = (i * 50) % 300;
    const yOffset = Math.sin(i * 1.5) * 30;
    const particleProgress = ((particlePhase + baseOffset) % 300) / 300;
    const opacity = particleProgress < 0.1 || particleProgress > 0.9
      ? interpolate(particleProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
      : 1;

    return {
      x: interpolate(particleProgress, [0, 1], [-300, 300]),
      y: yOffset,
      opacity: opacity * Math.min(1, particlePhase / 60),
      size: 6 + (i % 3) * 2,
      color: interpolate(particleProgress, [0, 0.5, 1], [0, 0.5, 1]) < 0.5
        ? COLORS.edge
        : COLORS.core,
    };
  });

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
        size={500}
        position={{ left: -100, top: '50%' }}
        opacity={0.4}
      />
      <GradientOrb
        color="blue"
        size={500}
        position={{ right: -100, top: '50%' }}
        opacity={0.4}
        pulseDelay={60}
      />

      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          opacity: logoProgress,
          transform: `scale(${interpolate(logoProgress, [0, 1], [0.8, 1])})`,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: FONT_SIZES.heading3,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.textPrimary,
            letterSpacing: '0.05em',
          }}
        >
          Heliograph
        </div>
      </div>

      {/* "Heliograph connects" text */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.heading2,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.textPrimary,
          opacity: connectsTextProgress,
          transform: `translateY(${interpolate(connectsTextProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        Heliograph connects
      </div>

      {/* Bridge visualization */}
      <div
        style={{
          position: 'relative',
          width: 800,
          height: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60,
        }}
      >
        {/* Edge node (orange) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: 100,
            height: 100,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.edge}, ${COLORS.backgroundOrange})`,
            opacity: edgeCoreTextProgress,
            transform: `scale(${interpolate(edgeCoreTextProgress, [0, 1], [0.5, 1])})`,
            boxShadow: `0 0 40px ${COLORS.orangeGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.small,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
            }}
          >
            EDGE
          </span>
        </div>

        {/* Bridge line */}
        <div
          style={{
            position: 'absolute',
            left: 100,
            width: 600,
            height: 8,
            background: `linear-gradient(90deg, ${COLORS.edge}, ${COLORS.core})`,
            borderRadius: 4,
            transform: `scaleX(${bridgeProgress})`,
            transformOrigin: 'left center',
            opacity: edgeCoreTextProgress,
          }}
        />

        {/* Particles flowing along bridge */}
        {particles.map((particle, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: '50%',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              background: particle.color,
              transform: `translate(${particle.x}px, ${particle.y}px)`,
              opacity: particle.opacity * bridgeProgress,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}

        {/* Core node (blue) */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            width: 100,
            height: 100,
            borderRadius: 20,
            background: `linear-gradient(135deg, ${COLORS.core}, ${COLORS.backgroundBlueDark})`,
            opacity: edgeCoreTextProgress,
            transform: `scale(${interpolate(edgeCoreTextProgress, [0, 1], [0.5, 1])})`,
            boxShadow: `0 0 40px ${COLORS.blueGlow}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.small,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.white,
            }}
          >
            CORE
          </span>
        </div>
      </div>

      {/* "the edge to the core" text */}
      <div
        style={{
          marginTop: 40,
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.heading2,
          fontWeight: FONT_WEIGHTS.bold,
          opacity: edgeCoreTextProgress,
          transform: `translateY(${interpolate(edgeCoreTextProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        <span style={{ color: COLORS.edge }}>the edge</span>
        <span style={{ color: COLORS.textPrimary }}> to </span>
        <span style={{ color: COLORS.core }}>the core</span>
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
        }}
      >
        {features.map((feature, i) => {
          const settleX = interpolate(orbitProgress, [0, 1], [feature.startX * 0.3, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: feature.progress,
                transform: `translateX(${interpolate(feature.progress, [0, 1], [feature.startX, 0]) + settleX}px) translateY(${interpolate(feature.progress, [0, 1], [60, 0])}px)`,
              }}
            >
              <GlassCard
                glow={i === 0 ? 'orange' : i === 2 ? 'blue' : 'none'}
                style={{
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  minWidth: 280,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background:
                      i === 0
                        ? COLORS.edge
                        : i === 2
                          ? COLORS.core
                          : `linear-gradient(135deg, ${COLORS.edge}, ${COLORS.core})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feature.icon}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: FONT_SIZES.small,
                    fontWeight: FONT_WEIGHTS.medium,
                    color: COLORS.textPrimary,
                  }}
                >
                  {feature.title}
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
