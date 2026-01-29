"use client";

import { useEffect, useRef, useState } from "react";
import { interpolate, useScrollProgress } from "@/hooks/useScrollProgress";
import { CubeFace, FACE_SIZE } from "./CubeFace";
import { LogoFace } from "./LogoFace";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
}

// The three pillars
const PILLARS = [
  { label: "CRM for Sales", color: "#38bdf8", icon: "Users" }, // Sky blue
  { label: "Project Management", color: "#3b82f6", icon: "ClipboardList" }, // Blue
  { label: "Version Control", color: "#6366f1", icon: "GitBranch" }, // Indigo
];

// Face order in the primary (front-facing) sequence as cube rotates CW:
// Face 0 (front) → Face 1 (right) → Face 2 (back) → Face 3 (left) → repeat
// This maps faceIndex to its position in that sequence
const FACE_ORDER: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3 };

export function CubeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress({ containerRef });
  const reducedMotion = useReducedMotion();

  const halfSize = FACE_SIZE / 2;

  // If user prefers reduced motion, skip to final state
  const effectiveProgress = reducedMotion ? 1 : progress;

  // Phase calculations based on scroll progress
  // All panels visible from the start
  const panelOpacity = [1, 1, 1];

  // Phase 2: Fold into cube (0-20%)
  const foldProgress = interpolate(effectiveProgress, [0, 0.2], [0, 1]);

  // Phase 3: Spin 1.5 rotations clockwise (20-80%)
  const spinProgress = interpolate(effectiveProgress, [0.2, 0.8], [0, 1]);
  const spinRotationY = spinProgress * -540; // 1.5 rotations clockwise

  // Phase 4: Tilt down (80-95%)
  const tiltProgress = interpolate(effectiveProgress, [0.8, 0.95], [0, 1]);
  const tiltRotationX = tiltProgress * 90;

  // Phase 5: Tagline (95-100%)
  const taglineOpacity = interpolate(effectiveProgress, [0.95, 1.0], [0, 1]);
  const taglineTranslateY = interpolate(
    effectiveProgress,
    [0.95, 1.0],
    [20, 0],
  );

  // Logo glow intensity increases during tilt
  const logoGlow = interpolate(effectiveProgress, [0.8, 0.95], [0.3, 1]);

  // Calculate dynamic pillar content based on rotation
  // This creates the illusion of only 3 faces on a 4-sided cube
  // Each face shows the pillar it will display when it becomes the primary (front) face
  // Content only changes when the face is at the back (hidden from view)
  const rotationQuarter = Math.floor(Math.abs(spinRotationY) / 90);

  const getPillar = (faceIndex: number) => {
    const order = FACE_ORDER[faceIndex];
    // Distance to the most recent quarter when this face was/is primary
    const distToPrev = ((rotationQuarter % 4) - order + 4) % 4;

    // Calculate the "effective quarter" that determines which pillar to show
    // If face is primary (dist=0) or just exited primary (dist=1), use current/recent quarter
    // Otherwise (becoming primary or hidden), use the upcoming quarter
    let effectiveQ: number;
    if (distToPrev <= 1) {
      effectiveQ = rotationQuarter - distToPrev;
    } else {
      effectiveQ = rotationQuarter + (4 - distToPrev);
    }

    // Convert to pillar index (handles negative values correctly)
    const pillarIndex = ((effectiveQ % 3) + 3) % 3;
    return PILLARS[pillarIndex];
  };

  // Face transforms during fold phase
  // Left face: starts at x=-280 (one face width), folds to left side
  const leftRotation = interpolate(foldProgress, [0, 1], [0, -90]);
  const leftTranslateX = interpolate(foldProgress, [0, 1], [-280, 0]);
  const leftTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  // Center face: stays as front, moves forward
  const centerTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  // Right face: starts at x=280 (one face width), folds to right side
  const rightRotation = interpolate(foldProgress, [0, 1], [0, 90]);
  const rightTranslateX = interpolate(foldProgress, [0, 1], [280, 0]);
  const rightTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  // Additional faces opacity (appear during fold)
  const additionalFacesOpacity = interpolate(foldProgress, [0.5, 1], [0, 1]);

  // Is cube formed? (for applying spin/tilt rotation)
  const isCubeFormed = effectiveProgress >= 0.2;

  // Build cube container transform
  const cubeRotation = isCubeFormed
    ? `rotateY(${spinRotationY}deg) rotateX(${tiltRotationX}deg)`
    : "";

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Sticky wrapper keeps cube centered during scroll */}
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* 3D Cube Container */}
        <div
          style={{
            position: "relative",
            width: FACE_SIZE,
            height: FACE_SIZE,
            transformStyle: "preserve-3d",
            transform: cubeRotation,
          }}
        >
          {/* Left Face (Face Index 3 for cycling) */}
          <CubeFace
            label={getPillar(3).label}
            color={getPillar(3).color}
            icon={getPillar(3).icon}
            opacity={panelOpacity[0]}
            transform={`translateX(${leftTranslateX}px) rotateY(${leftRotation}deg) translateZ(${leftTranslateZ}px)`}
          />

          {/* Front/Center Face (Face Index 0 for cycling) */}
          <CubeFace
            label={getPillar(0).label}
            color={getPillar(0).color}
            icon={getPillar(0).icon}
            opacity={panelOpacity[1]}
            transform={`translateZ(${centerTranslateZ}px)`}
          />

          {/* Right Face (Face Index 1 for cycling) */}
          <CubeFace
            label={getPillar(1).label}
            color={getPillar(1).color}
            icon={getPillar(1).icon}
            opacity={panelOpacity[2]}
            transform={`translateX(${rightTranslateX}px) rotateY(${rightRotation}deg) translateZ(${rightTranslateZ}px)`}
          />

          {/* Back Face (Face Index 2 for cycling) */}
          {foldProgress > 0 && (
            <CubeFace
              label={getPillar(2).label}
              color={getPillar(2).color}
              icon={getPillar(2).icon}
              opacity={additionalFacesOpacity}
              transform={`translateZ(${-halfSize}px) rotateY(180deg)`}
            />
          )}

          {/* Top Face - Heliograph Logo */}
          {foldProgress > 0.3 && (
            <LogoFace
              transform={`translateY(${-halfSize}px) rotateX(90deg)`}
              opacity={additionalFacesOpacity}
              glowIntensity={logoGlow}
            />
          )}

          {/* Bottom Face (decorative) */}
          {foldProgress > 0.5 && (
            <div
              style={{
                position: "absolute",
                width: FACE_SIZE,
                height: FACE_SIZE,
                transform: `translateY(${halfSize}px) rotateX(-90deg)`,
                opacity: additionalFacesOpacity * 0.8,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.15)",
                backfaceVisibility: "hidden",
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Tagline appears after tilt completes */}
        <div
          className="absolute bottom-32 left-0 right-0 flex justify-center"
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineTranslateY}px)`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                color: "rgba(255, 255, 255, 1)",
                fontFamily: "var(--font-clash-display), sans-serif",
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Quickly Align, Build, and Codify with
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: "#fdba74",
                fontFamily: "var(--font-clash-display), sans-serif",
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Heliograph
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
