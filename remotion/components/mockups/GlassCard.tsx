import type React from "react";

type GlassCardProps = {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  opacity?: number;
  padding?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  width = "auto",
  height = "auto",
  opacity = 0.08,
  padding = 24,
  borderRadius = 16,
  style = {},
}) => {
  return (
    <div
      style={{
        width,
        height,
        padding,
        borderRadius,
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
