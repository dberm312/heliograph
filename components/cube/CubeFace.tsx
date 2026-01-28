"use client";

interface CubeFaceProps {
  label: string;
  color: string;
  transform: string;
  opacity: number;
}

const FACE_SIZE = 280;

export function CubeFace({ label, color, transform, opacity }: CubeFaceProps) {
  return (
    <div
      style={{
        position: "absolute",
        width: FACE_SIZE,
        height: FACE_SIZE,
        transform,
        opacity,
        backfaceVisibility: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${color}dd 0%, ${color}99 100%)`,
        border: "2px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 16,
        boxShadow: `0 0 40px ${color}40`,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: "var(--font-clash-display), sans-serif",
          textAlign: "center",
          padding: 24,
          lineHeight: 1.3,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export { FACE_SIZE };
