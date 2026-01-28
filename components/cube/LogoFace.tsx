"use client";

import Image from "next/image";
import { FACE_SIZE } from "./CubeFace";

interface LogoFaceProps {
  transform: string;
  opacity: number;
  glowIntensity: number;
}

const COLORS = {
  accent: "#fdba74",
  gradientOrange: "#f97316",
};

export function LogoFace({ transform, opacity, glowIntensity }: LogoFaceProps) {
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
        background: `linear-gradient(135deg, ${COLORS.accent}ee 0%, ${COLORS.gradientOrange}cc 100%)`,
        border: "2px solid rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        boxShadow: `0 0 ${60 * glowIntensity}px ${COLORS.accent}80`,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          padding: 20,
          backdropFilter: "blur(8px)",
        }}
      >
        <Image
          src="/heliograph-logo.svg"
          alt="Heliograph"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
