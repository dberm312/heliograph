import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../components/AnimatedGradient";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";

// Cube face size
const FACE_SIZE = 280;

// Tool data for cube faces
const TOOLS = [
  {
    label: "CRM for Sales",
    color: COLORS.gradientOrange,
  },
  {
    label: "Project management for Product",
    color: "#8b5cf6", // Purple
  },
  {
    label: "Source control for Engineering",
    color: COLORS.gradientBlue,
  },
];

// Individual cube face component
const CubeFace: React.FC<{
  label: string;
  color: string;
  transform: string;
  opacity: number;
}> = ({ label, color, transform, opacity }) => {
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
          color: COLORS.textPrimary,
          fontFamily: FONTS.display,
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
};

// Logo face for top of cube
const LogoFace: React.FC<{
  transform: string;
  opacity: number;
  glowIntensity: number;
}> = ({ transform, opacity, glowIntensity }) => {
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
        <Img
          src={staticFile("heliograph-logo.svg")}
          style={{ width: 100, height: 100 }}
        />
      </div>
    </div>
  );
};

// Main Scene Component
export const JobsMomentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase timing (total 300 frames = 10 seconds)
  const squaresAppearEnd = 60;
  const foldEnd = 120;
  const spinEnd = 200; // Extended spin
  const tiltEnd = 230; // Tilt completes here, then holds until end

  // Phase 1: Squares appear side-by-side (0-60)
  const squareEntranceDelays = [0, 15, 30]; // Staggered entrance

  // Calculate individual square positions and animations
  const getSquareState = (index: number) => {
    const delay = squareEntranceDelays[index];
    const entranceProgress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 12, stiffness: 100 },
    });

    const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    // Initial side-by-side positions: -320, 0, 320 (for 280px squares with 40px gap)
    const baseX = (index - 1) * 320;

    return { entranceProgress, opacity, baseX };
  };

  // Phase 2: Fold into cube (60-120)
  const foldProgress = interpolate(frame, [squaresAppearEnd, foldEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  // Phase 3: Cube spins (120-180)
  const spinProgress = interpolate(frame, [foldEnd, spinEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const spinRotationY = spinProgress * 360;

  // Phase 4: Tilt to show top (200-230), then hold
  const tiltProgress = interpolate(frame, [spinEnd, tiltEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const tiltRotationX = tiltProgress * -90; // Tilt forward 90 degrees to show top face directly

  // Logo glow intensity
  const logoGlow = interpolate(frame, [spinEnd, tiltEnd], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Check if cube is formed (for rotation)
  const isCubeFormed = frame >= foldEnd;

  // Calculate transforms for each face
  // For proper 3D cube geometry, transforms must be: rotateY first, then translateZ
  // This ensures faces are positioned correctly when the cube rotates
  const getFaceTransforms = () => {
    const halfSize = FACE_SIZE / 2;

    // Left face (index 0): starts at x=-320, folds to left side of cube
    // Final position: rotateY(-90deg) translateZ(halfSize) puts face at x=-halfSize
    const leftRotation = interpolate(foldProgress, [0, 1], [0, -90]);
    const leftTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);
    // During flat phase, we need translateX to position it. As it folds, the rotation handles X positioning
    const leftTranslateX = interpolate(foldProgress, [0, 1], [-320, 0]);

    // Center face (index 1): stays as front face
    // Final position: translateZ(halfSize)
    const centerTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);

    // Right face (index 2): starts at x=320, folds to right side of cube
    // Final position: rotateY(90deg) translateZ(halfSize) puts face at x=halfSize
    const rightRotation = interpolate(foldProgress, [0, 1], [0, 90]);
    const rightTranslateZ = interpolate(foldProgress, [0, 1], [0, halfSize]);
    const rightTranslateX = interpolate(foldProgress, [0, 1], [320, 0]);

    // Top/bottom/back faces: appear during fold
    const topOpacity = interpolate(foldProgress, [0.5, 1], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return {
      left: {
        rotation: leftRotation,
        translateX: leftTranslateX,
        translateZ: leftTranslateZ,
      },
      center: {
        translateZ: centerTranslateZ,
      },
      right: {
        rotation: rightRotation,
        translateX: rightTranslateX,
        translateZ: rightTranslateZ,
      },
      topOpacity,
    };
  };

  const faceTransforms = getFaceTransforms();
  const halfSize = FACE_SIZE / 2;

  // Build cube container transform
  const cubeRotation = isCubeFormed
    ? `rotateY(${spinRotationY}deg) rotateX(${tiltRotationX}deg)`
    : "";

  // Get entrance animations for each square
  const square0 = getSquareState(0);
  const square1 = getSquareState(1);
  const square2 = getSquareState(2);

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.5} />

      {/* 3D Scene Container */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: 1200,
        }}
      >
        {/* Cube Container */}
        <div
          style={{
            position: "relative",
            width: FACE_SIZE,
            height: FACE_SIZE,
            transformStyle: "preserve-3d",
            transform: cubeRotation,
          }}
        >
          {/* Left Face - CRM for Sales */}
          {/* Transform order: translateX (initial position) → rotateY (fold) → translateZ (cube depth) */}
          <CubeFace
            label={TOOLS[0].label}
            color={TOOLS[0].color}
            opacity={square0.opacity * square0.entranceProgress}
            transform={`translateX(${faceTransforms.left.translateX}px) rotateY(${faceTransforms.left.rotation}deg) translateZ(${faceTransforms.left.translateZ}px)`}
          />

          {/* Front Face - Project Management */}
          <CubeFace
            label={TOOLS[1].label}
            color={TOOLS[1].color}
            opacity={square1.opacity * square1.entranceProgress}
            transform={`translateZ(${faceTransforms.center.translateZ}px)`}
          />

          {/* Right Face - Source Control */}
          {/* Transform order: translateX (initial position) → rotateY (fold) → translateZ (cube depth) */}
          <CubeFace
            label={TOOLS[2].label}
            color={TOOLS[2].color}
            opacity={square2.opacity * square2.entranceProgress}
            transform={`translateX(${faceTransforms.right.translateX}px) rotateY(${faceTransforms.right.rotation}deg) translateZ(${faceTransforms.right.translateZ}px)`}
          />

          {/* Back Face (appears during fold) */}
          {foldProgress > 0 && (
            <div
              style={{
                position: "absolute",
                width: FACE_SIZE,
                height: FACE_SIZE,
                transform: `translateZ(${-halfSize}px) rotateY(180deg)`,
                opacity: faceTransforms.topOpacity,
                background: `linear-gradient(135deg, ${COLORS.gradientBlueDark}dd 0%, ${COLORS.gradientBlue}99 100%)`,
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                  fontFamily: FONTS.body,
                  textAlign: "center",
                }}
              >
                All in one
              </div>
            </div>
          )}

          {/* Top Face - Heliograph Logo */}
          {foldProgress > 0.3 && (
            <LogoFace
              transform={`translateY(${-halfSize}px) rotateX(90deg)`}
              opacity={faceTransforms.topOpacity}
              glowIntensity={logoGlow}
            />
          )}

          {/* Bottom Face (appears during fold) */}
          {foldProgress > 0.5 && (
            <div
              style={{
                position: "absolute",
                width: FACE_SIZE,
                height: FACE_SIZE,
                transform: `translateY(${halfSize}px) rotateX(-90deg)`,
                opacity: faceTransforms.topOpacity * 0.8,
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                border: "2px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 16,
              }}
            />
          )}
        </div>
      </AbsoluteFill>

      {/* Tagline appears after tilt completes */}
      {frame >= tiltEnd && (
        <div
          style={{
            position: "absolute",
            bottom: 180,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: interpolate(frame - tiltEnd, [0, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: FONTS.display,
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Quickly Align, Build, and Codify with
            </div>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: COLORS.accent,
                fontFamily: FONTS.display,
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Heliograph
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
