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
 * Scene 2: The Pattern (10-20s / 600 frames)
 *
 * "This happens everywhere."
 * "Edge innovation never reaches core."
 *
 * Visual: Multiple siloed cards, split screen EDGE vs CORE with blocked arrows
 */
export const Scene2Pattern: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Text animations
  const everywhereProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 30,
  });

  const edgeLabelProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
    delay: 150,
  });

  const coreLabelProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.snappy,
    delay: 180,
  });

  const neverReachesProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay: 300,
  });

  // Card scatter animation
  const cardsAppear = (delay: number) =>
    spring({
      frame,
      fps,
      config: SPRING_CONFIGS.gentle,
      delay,
    });

  // Arrow animation (blocked)
  const arrowProgress = interpolate(frame, [240, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Blocked indicator pulse
  const blockedPulse = interpolate(
    frame % 60,
    [0, 30, 60],
    [0.5, 1, 0.5],
  );

  // Gap emphasis
  const gapPulse = interpolate(frame, [420, 480, 540, 600], [1, 1.5, 1, 1.2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scattered cards data
  const cards = [
    { x: -450, y: -180, delay: 60, rotation: -5 },
    { x: -380, y: 50, delay: 90, rotation: 3 },
    { x: -500, y: 150, delay: 120, rotation: -8 },
    { x: -320, y: -50, delay: 75, rotation: 6 },
  ];

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
        size={400}
        position={{ top: 100, left: 100 }}
        opacity={0.5}
      />
      <GradientOrb
        color="blue"
        size={400}
        position={{ top: 100, right: 100 }}
        opacity={0.5}
        pulseDelay={45}
      />

      {/* "This happens everywhere." */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.heading2,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.textPrimary,
          opacity: everywhereProgress,
          transform: `translateY(${interpolate(everywhereProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        This happens everywhere.
      </div>

      {/* Split screen container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '60%',
          position: 'relative',
        }}
      >
        {/* EDGE side (left, orange) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* EDGE label */}
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.heading3,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.edge,
              opacity: edgeLabelProgress,
              transform: `scale(${interpolate(edgeLabelProgress, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 40px ${COLORS.orangeGlow}`,
              marginBottom: 40,
            }}
          >
            EDGE
          </div>

          {/* Scattered cards on edge side */}
          {cards.map((card, i) => {
            const cardProgress = cardsAppear(card.delay);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotation}deg) scale(${interpolate(cardProgress, [0, 1], [0.5, 1])})`,
                  opacity: cardProgress,
                }}
              >
                <GlassCard
                  glow="orange"
                  style={{
                    padding: '16px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: COLORS.edge,
                      opacity: 0.6,
                    }}
                  />
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: FONT_SIZES.small,
                      color: COLORS.textSecondary,
                    }}
                  >
                    Custom #{i + 1}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Gap/barrier in the middle */}
        <div
          style={{
            width: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Vertical divider */}
          <div
            style={{
              width: 4 * gapPulse,
              height: '80%',
              background: `linear-gradient(180deg,
                transparent 0%,
                ${COLORS.textMuted} 30%,
                ${COLORS.textMuted} 70%,
                transparent 100%)`,
              borderRadius: 2,
              opacity: 0.4,
            }}
          />

          {/* Blocked arrows */}
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              gap: 40,
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  opacity: arrowProgress * (1 - i * 0.2),
                }}
              >
                {/* Arrow */}
                <svg
                  width="60"
                  height="24"
                  viewBox="0 0 60 24"
                  style={{
                    transform: `translateX(${interpolate(arrowProgress, [0, 1], [-20, 0])}px)`,
                  }}
                >
                  <path
                    d="M0 12h40M40 12l-8-8M40 12l-8 8"
                    stroke={COLORS.edge}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="4 4"
                  />
                </svg>
                {/* Block indicator */}
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: -8,
                    opacity: blockedPulse,
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="M2 2l8 8M10 2l-8 8"
                      stroke={COLORS.white}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CORE side (right, blue) */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* CORE label */}
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: FONT_SIZES.heading3,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.core,
              opacity: coreLabelProgress,
              transform: `scale(${interpolate(coreLabelProgress, [0, 1], [0.8, 1])})`,
              textShadow: `0 0 40px ${COLORS.blueGlow}`,
            }}
          >
            CORE
          </div>

          {/* Core platform visual */}
          <div
            style={{
              marginTop: 40,
              opacity: coreLabelProgress,
            }}
          >
            <GlassCard
              glow="blue"
              style={{
                padding: '40px 60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${COLORS.core}, ${COLORS.backgroundBlueDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={COLORS.white}
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h18" />
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
                Platform
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* "Edge innovation never reaches core." */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontFamily: FONTS.display,
          fontSize: FONT_SIZES.heading3,
          fontWeight: FONT_WEIGHTS.semibold,
          color: COLORS.textSecondary,
          opacity: neverReachesProgress,
          transform: `translateY(${interpolate(neverReachesProgress, [0, 1], [30, 0])}px)`,
        }}
      >
        Edge innovation{' '}
        <span style={{ color: COLORS.textPrimary }}>never</span> reaches core.
      </div>
    </AbsoluteFill>
  );
};
