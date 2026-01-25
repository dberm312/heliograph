import type React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS, FONTS, FONT_SIZES, FONT_WEIGHTS, SPRING_CONFIGS } from '../../styles/constants';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: 'display' | 'body';
  color?: string;
  highlightColor?: string;
  style?: React.CSSProperties;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  fontSize = FONT_SIZES.heading2,
  fontWeight = FONT_WEIGHTS.bold,
  fontFamily = 'display',
  color = COLORS.textPrimary,
  highlightColor,
  style,
  animation = 'fadeUp',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: SPRING_CONFIGS.smooth,
    delay,
  });

  let transform = 'none';
  let opacity = progress;

  switch (animation) {
    case 'fadeUp':
      transform = `translateY(${interpolate(progress, [0, 1], [40, 0])}px)`;
      break;
    case 'fadeIn':
      transform = 'none';
      break;
    case 'slideLeft':
      transform = `translateX(${interpolate(progress, [0, 1], [-60, 0])}px)`;
      break;
    case 'slideRight':
      transform = `translateX(${interpolate(progress, [0, 1], [60, 0])}px)`;
      break;
    case 'scale':
      transform = `scale(${interpolate(progress, [0, 1], [0.8, 1])})`;
      break;
  }

  const textStyle: React.CSSProperties = {
    fontSize,
    fontWeight,
    fontFamily: fontFamily === 'display' ? FONTS.display : FONTS.body,
    color: highlightColor || color,
    opacity,
    transform,
    textShadow: highlightColor
      ? `0 0 40px ${highlightColor}40, 0 0 80px ${highlightColor}20`
      : undefined,
    ...style,
  };

  return <div style={textStyle}>{text}</div>;
};

// Specialized component for multi-line animated text
interface AnimatedLinesProps {
  lines: Array<{
    text: string;
    highlight?: boolean;
    highlightColor?: string;
  }>;
  baseDelay?: number;
  delayBetween?: number;
  fontSize?: number;
  fontWeight?: number;
  fontFamily?: 'display' | 'body';
  lineHeight?: number;
  style?: React.CSSProperties;
}

export const AnimatedLines: React.FC<AnimatedLinesProps> = ({
  lines,
  baseDelay = 0,
  delayBetween = 10,
  fontSize = FONT_SIZES.heading2,
  fontWeight = FONT_WEIGHTS.bold,
  fontFamily = 'display',
  lineHeight = 1.1,
  style,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {lines.map((line, index) => (
        <AnimatedText
          key={index}
          text={line.text}
          delay={baseDelay + index * delayBetween}
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          highlightColor={line.highlight ? (line.highlightColor || COLORS.edge) : undefined}
          style={{ lineHeight }}
        />
      ))}
    </div>
  );
};
