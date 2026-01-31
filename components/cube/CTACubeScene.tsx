"use client";

import { ArrowRight } from "lucide-react";
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
const FACE_ORDER: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3 };

interface CTACubeSceneProps {
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
}

export function CTACubeScene({
  heading = "Stop living in disconnected worlds",
  description = "One platform where Product, Engineering, and Customer teams finally sync.",
  ctaText = "Get Early Access",
  ctaHref = "https://forms.gle/8eMhsfNjWp2hXFuX9",
  secondaryText = "Join the customer-facing builders transforming how they ship custom solutions.",
}: CTACubeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { progress } = useScrollProgress({ containerRef });
  const reducedMotion = useReducedMotion();

  const halfSize = FACE_SIZE / 2;

  // If user prefers reduced motion, skip to final state
  const effectiveProgress = reducedMotion ? 1 : progress;

  // Phase calculations based on scroll progress (adjusted for 300vh)
  // All panels visible from the start
  const panelOpacity = [1, 1, 1];

  // Phase 1: Fold into cube (0-25%)
  const foldProgress = interpolate(effectiveProgress, [0, 0.25], [0, 1]);

  // Phase 2: Spin 1.5 rotations clockwise (25-70%)
  const spinProgress = interpolate(effectiveProgress, [0.25, 0.7], [0, 1]);
  const spinRotationY = spinProgress * -270; // 3 faces: CRM → PM → VC → CRM

  // Phase 3: Tilt down (70-90%)
  const tiltProgress = interpolate(effectiveProgress, [0.7, 0.9], [0, 1]);
  const tiltRotationX = tiltProgress * -90;

  // Phase 4: CTA content (90-100%)
  const ctaOpacity = interpolate(effectiveProgress, [0.9, 1.0], [0, 1]);
  const ctaTranslateY = interpolate(effectiveProgress, [0.9, 1.0], [20, 0]);

  // Logo glow intensity increases during tilt
  const logoGlow = interpolate(effectiveProgress, [0.7, 0.9], [0.3, 1]);

  // Calculate dynamic pillar content based on rotation
  const rotationQuarter = Math.floor(Math.abs(spinRotationY) / 90);

  const getPillar = (faceIndex: number) => {
    const order = FACE_ORDER[faceIndex];
    const distToPrev = ((rotationQuarter % 4) - order + 4) % 4;

    let effectiveQ: number;
    if (distToPrev <= 1) {
      effectiveQ = rotationQuarter - distToPrev;
    } else {
      effectiveQ = rotationQuarter + (4 - distToPrev);
    }

    const pillarIndex = ((effectiveQ % 3) + 3) % 3;
    return PILLARS[pillarIndex];
  };

  // Face transforms during fold phase
  const leftRotation = interpolate(foldProgress, [0, 1], [0, -90]);
  const leftTranslateX = interpolate(foldProgress, [0, 1], [-280, 0]);
  const leftTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  const centerTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  const rightRotation = interpolate(foldProgress, [0, 1], [0, 90]);
  const rightTranslateX = interpolate(foldProgress, [0, 1], [280, 0]);
  const rightTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

  // Additional faces opacity (appear during fold)
  const additionalFacesOpacity = interpolate(foldProgress, [0.5, 1], [0, 1]);

  // Is cube formed? (for applying spin/tilt rotation)
  const isCubeFormed = effectiveProgress >= 0.25;

  // Build cube container transform
  // Order matters: rotateX first so tilt happens in world space after spin
  const cubeRotation = isCubeFormed
    ? `rotateX(${tiltRotationX}deg) rotateY(${spinRotationY}deg)`
    : "";

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
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
              transform={`translateY(${-halfSize}px) rotateX(90deg) rotateZ(${-spinRotationY}deg)`}
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

        {/* CTA Content - positioned below the cube */}
        <div
          className="absolute left-0 right-0 px-6 text-center"
          style={{
            top: "calc(50% + 200px)",
            opacity: ctaOpacity,
            transform: `translateY(${ctaTranslateY}px)`,
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                color: "rgba(255, 255, 255, 1)",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              {heading}
            </h2>
            <p
              className="text-xl mb-10"
              style={{
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              {description}
            </p>
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 glass-card rounded-full px-8 py-4 text-lg font-semibold text-white hover:text-orange-200 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </a>
            <p
              className="text-sm mt-8"
              style={{
                color: "rgba(255, 255, 255, 0.4)",
              }}
            >
              {secondaryText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
