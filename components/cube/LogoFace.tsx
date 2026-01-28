"use client";

import Image from "next/image";
import { FACE_SIZE } from "./CubeFace";

interface LogoFaceProps {
  transform: string;
  opacity: number;
  glowIntensity: number;
}

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
        background: "rgba(255, 255, 255, 0.95)",
        border: "2px solid rgba(255, 255, 255, 0.4)",
        boxShadow: `0 0 ${60 * glowIntensity}px rgba(255, 255, 255, 0.5)`,
      }}
    >
      <Image
        src="/heliograph-logo.svg"
        alt="Heliograph"
        width={120}
        height={120}
      />
    </div>
  );
}
