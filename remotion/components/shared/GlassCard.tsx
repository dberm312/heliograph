import type React from 'react';
import { COLORS } from '../../styles/constants';

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glow?: 'orange' | 'blue' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  glow = 'none',
}) => {
  const glowShadow =
    glow === 'orange'
      ? `0 0 60px ${COLORS.orangeGlow}`
      : glow === 'blue'
        ? `0 0 60px ${COLORS.blueGlow}`
        : 'none';

  return (
    <div
      style={{
        background: COLORS.glassBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${COLORS.glassBorder}`,
        borderRadius: 24,
        boxShadow: `
          0 0 0 1px rgba(255, 255, 255, 0.05) inset,
          0 4px 24px rgba(0, 0, 0, 0.1),
          0 1px 2px rgba(0, 0, 0, 0.1)${glow !== 'none' ? `, ${glowShadow}` : ''}
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
