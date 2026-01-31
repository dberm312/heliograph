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
        background: `rgba(0, 0, 0, ${opacity * 0.4})`,
        backdropFilter: "blur(24px)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
