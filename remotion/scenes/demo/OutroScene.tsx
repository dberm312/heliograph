import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

// ============================================================================
// Constants
// ============================================================================

const FACE_SIZE = 520;
const HALF_SIZE = FACE_SIZE / 2;

// Animation timing (~400 frames total)
const TIMING = {
  // Phase 1: Cards visible and holding (5 seconds = 150 frames @ 30fps)
  CARD_HOLD_END: 150,

  // Phase 2: Fold to cube (30 frames = 50% faster than original 60)
  FOLD_START: 150,
  FOLD_END: 180,

  // Phase 3: Cube spin (80 frames = 50% faster than original 160)
  SPIN_START: 180,
  SPIN_END: 260,
  TAGLINE_APPEAR: 180, // Tagline appears immediately at spin start

  // Phase 4: Tilt down (30 frames = 50% faster than original 60)
  TILT_START: 260,
  TILT_END: 290,

  // Phase 5: Finale (includes cube shrink)
  CUBE_SHRINK_START: 290,
  CUBE_SHRINK_END: 320,
  TITLE_APPEAR: 310,
  CTA_APPEAR: 340,
  URL_APPEAR: 360,
};

// The three tools/modules - ORDER MATTERS for face mapping
// Index 0 = front face, Index 1 = right face, Index 2 = left/back face
const MODULES = [
  {
    id: "task",
    label: "Task Management",
    description: "Organize work hierarchically from epics to actionable tasks",
    color: "#f97316",
    icon: "clipboard",
  },
  {
    id: "version",
    label: "Version Control",
    description: "Version any document type with full history and traceability",
    color: "#3b82f6",
    icon: "gitbranch",
  },
  {
    id: "stakeholder",
    label: "Stakeholder Intelligence",
    description: "Capture and track customer requirements with full visibility",
    color: "#8b5cf6",
    icon: "users",
  },
];

// Face order mapping for 3 pillars on 4 faces
const FACE_ORDER: Record<number, number> = { 0: 0, 1: 1, 2: 2, 3: 3 };

// ============================================================================
// SVG Icon Components
// ============================================================================

const UsersIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClipboardListIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="2" width="6" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <line x1="12" y1="11" x2="16" y2="11" />
    <line x1="12" y1="15" x2="16" y2="15" />
    <circle cx="8.5" cy="11" r="0.5" fill={color} />
    <circle cx="8.5" cy="15" r="0.5" fill={color} />
  </svg>
);

const GitBranchIcon: React.FC<{ color: string; size?: number }> = ({
  color,
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="6" y1="3" x2="6" y2="15" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
);

const getIcon = (iconName: string, color: string, size = 48) => {
  switch (iconName) {
    case "users":
      return <UsersIcon color={color} size={size} />;
    case "clipboard":
      return <ClipboardListIcon color={color} size={size} />;
    case "gitbranch":
      return <GitBranchIcon color={color} size={size} />;
    default:
      return null;
  }
};

// ============================================================================
// Cube Face Component
// ============================================================================

type CubeFaceProps = {
  module: (typeof MODULES)[number];
  transform: string;
  opacity: number;
  showDescription?: boolean;
};

const CubeFace: React.FC<CubeFaceProps> = ({
  module,
  transform,
  opacity,
  showDescription = true,
}) => {
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        background: `linear-gradient(135deg, ${module.color}dd 0%, ${module.color}99 100%)`,
        border: "2px solid rgba(255, 255, 255, 0.3)",
        boxShadow: `0 0 40px ${module.color}40`,
        borderRadius: 12,
      }}
    >
      {getIcon(module.icon, "rgba(255, 255, 255, 0.95)", 80)}
      <div
        style={{
          fontSize: 36,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 1)",
          fontFamily: FONTS.display,
          textAlign: "center",
          padding: "0 32px",
          lineHeight: 1.2,
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        {module.label}
      </div>
      {showDescription && (
        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.9)",
            fontFamily: FONTS.body,
            textAlign: "center",
            padding: "0 40px",
            lineHeight: 1.5,
            maxWidth: 420,
          }}
        >
          {module.description}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Logo Face Component
// ============================================================================

type LogoFaceProps = {
  transform: string;
  opacity: number;
  glowIntensity: number;
};

const LogoFace: React.FC<LogoFaceProps> = ({
  transform,
  opacity,
  glowIntensity,
}) => {
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
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        boxShadow: `0 0 ${60 * glowIntensity}px rgba(249, 115, 22, ${glowIntensity * 0.6})`,
        borderRadius: 8,
      }}
    >
      <Img
        src={staticFile("heliograph-logo.svg")}
        style={{
          width: "85%",
          height: "85%",
          transform: "scaleX(-1)",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

// ============================================================================
// Tool Card Component (for entrance phase)
// ============================================================================

type ToolCardProps = {
  module: (typeof MODULES)[number];
  initialX: number;
  initialY: number;
  delay: number;
  foldProgress: number;
  targetTransform: string;
};

const ToolCard: React.FC<ToolCardProps> = ({
  module,
  initialX,
  initialY,
  delay,
  foldProgress,
  targetTransform,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const entranceX = interpolate(entrance, [0, 1], [initialX, 0]);
  const entranceY = interpolate(entrance, [0, 1], [initialY, 0]);
  const entranceScale = interpolate(entrance, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(entrance, [0, 1], [0, 1]);

  // During fold phase, transition to cube face position
  const isFolding = foldProgress > 0;

  if (isFolding) {
    // During folding, the CubeFace component handles rendering
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(${entranceX}px, ${entranceY}px) scale(${entranceScale})`,
        opacity: entranceOpacity,
      }}
    >
      <CubeFace module={module} transform="" opacity={1} showDescription />
    </div>
  );
};

// ============================================================================
// Helper: Get pillar for dynamic face content during spin
// ============================================================================

const getPillar = (faceIndex: number, rotationQuarter: number) => {
  const order = FACE_ORDER[faceIndex];
  const distToPrev = ((rotationQuarter % 4) - order + 4) % 4;

  let effectiveQ: number;
  if (distToPrev <= 1) {
    effectiveQ = rotationQuarter - distToPrev;
  } else {
    effectiveQ = rotationQuarter + (4 - distToPrev);
  }

  const pillarIndex = ((effectiveQ % 3) + 3) % 3;
  return MODULES[pillarIndex];
};

// ============================================================================
// Main OutroScene Component
// ============================================================================

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // -------------------------------------------------------------------------
  // Phase 1: Cards visible and holding (frames 0-150)
  // No entrance animation - cards start visible
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Phase 2: Fold to Cube (frames 60-120)
  // -------------------------------------------------------------------------
  const foldProgress = interpolate(
    frame,
    [TIMING.FOLD_START, TIMING.FOLD_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Card positions during fold
  // Left card (Stakeholder - MODULES[2]) - starts at x=-560, folds to left face
  const leftX = interpolate(foldProgress, [0, 1], [-560, 0]);
  const leftRotY = interpolate(foldProgress, [0, 1], [0, -90]);
  const leftZ = interpolate(foldProgress, [0, 1], [0, HALF_SIZE]);

  // Center card (Task - MODULES[0]) - stays front, moves forward
  const centerZ = interpolate(foldProgress, [0, 1], [0, HALF_SIZE]);

  // Right card (Version Control - MODULES[1]) - starts at x=560, folds to right face
  const rightX = interpolate(foldProgress, [0, 1], [560, 0]);
  const rightRotY = interpolate(foldProgress, [0, 1], [0, 90]);
  const rightZ = interpolate(foldProgress, [0, 1], [0, HALF_SIZE]);

  // Additional faces opacity (appear during fold)
  const additionalFacesOpacity = interpolate(foldProgress, [0.5, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // -------------------------------------------------------------------------
  // Phase 3: Cube Spin (frames 120-280)
  // -------------------------------------------------------------------------
  const spinProgress = interpolate(
    frame,
    [TIMING.SPIN_START, TIMING.SPIN_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const spinRotationY = spinProgress * -540; // 1.5 rotations clockwise

  // Calculate rotation quarter for dynamic face content
  const rotationQuarter = Math.floor(Math.abs(spinRotationY) / 90);

  // Tagline animation
  const taglineProgress = spring({
    frame: frame - TIMING.TAGLINE_APPEAR,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const taglineY = interpolate(taglineProgress, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(
    frame,
    [TIMING.TAGLINE_APPEAR, TIMING.TAGLINE_APPEAR + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // -------------------------------------------------------------------------
  // Phase 4: Tilt Down (frames 280-340)
  // -------------------------------------------------------------------------
  const tiltProgress = interpolate(
    frame,
    [TIMING.TILT_START, TIMING.TILT_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const tiltRotationX = tiltProgress * 90;

  // Logo glow increases during tilt
  const logoGlow = interpolate(
    frame,
    [TIMING.TILT_START, TIMING.TILT_END],
    [0.3, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Fade out tagline during tilt
  const taglineFade = interpolate(
    frame,
    [TIMING.TILT_START, TIMING.TILT_START + 30],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // -------------------------------------------------------------------------
  // Phase 5: Finale (frames 340-450)
  // -------------------------------------------------------------------------

  // Cube shrinks down after tilt to make room for text
  const cubeScale = interpolate(
    frame,
    [TIMING.CUBE_SHRINK_START, TIMING.CUBE_SHRINK_END],
    [1, 0.45],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Cube moves up as it shrinks
  const cubeY = interpolate(
    frame,
    [TIMING.CUBE_SHRINK_START, TIMING.CUBE_SHRINK_END],
    [0, -100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Title entrance (after cube shrinks)
  const titleProgress = spring({
    frame: frame - TIMING.TITLE_APPEAR,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);
  const titleOpacity = interpolate(
    frame,
    [TIMING.TITLE_APPEAR, TIMING.TITLE_APPEAR + 25],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // CTA entrance
  const ctaProgress = spring({
    frame: frame - TIMING.CTA_APPEAR,
    fps,
    config: { damping: 18, stiffness: 90 },
  });
  const ctaY = interpolate(ctaProgress, [0, 1], [20, 0]);
  const ctaOpacity = interpolate(
    frame,
    [TIMING.CTA_APPEAR, TIMING.CTA_APPEAR + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // URL entrance
  const urlProgress = spring({
    frame: frame - TIMING.URL_APPEAR,
    fps,
    config: { damping: 25, stiffness: 100 },
  });
  const urlY = interpolate(urlProgress, [0, 1], [20, 0]);
  const urlOpacity = interpolate(
    frame,
    [TIMING.URL_APPEAR, TIMING.URL_APPEAR + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // -------------------------------------------------------------------------
  // Determine what phase we're in for cube visibility
  // -------------------------------------------------------------------------
  const isCubeFormed = frame >= TIMING.FOLD_END;
  const showCards = frame < TIMING.FOLD_START;
  const showFoldingCards = frame >= TIMING.FOLD_START;

  // Build cube container transform
  const cubeRotation = isCubeFormed
    ? `rotateY(${spinRotationY}deg) rotateX(${tiltRotationX}deg)`
    : "";

  // Cards start visible - no entrance animation
  // Final positions for the pre-fold layout
  const preLeftX = -560;
  const preCenterY = 0;
  const preRightX = 560;

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.5} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Perspective container for 3D */}
        <div
          style={{
            perspective: 1200,
            perspectiveOrigin: "center center",
          }}
        >
          {/* Cube / Cards container */}
          <div
            style={{
              position: "relative",
              width: FACE_SIZE,
              height: FACE_SIZE,
              transformStyle: "preserve-3d",
              transform: `scale(${cubeScale}) translateY(${cubeY}px) ${cubeRotation}`,
            }}
          >
            {/* Phase 1: Cards visible and holding (before fold) */}
            {showCards && (
              <>
                {/* Left card - Stakeholder (MODULES[2]) */}
                <div
                  style={{
                    position: "absolute",
                    transform: `translateX(${preLeftX}px)`,
                  }}
                >
                  <CubeFace
                    module={MODULES[2]}
                    transform=""
                    opacity={1}
                    showDescription
                  />
                </div>

                {/* Center card - Task (MODULES[0]) */}
                <div
                  style={{
                    position: "absolute",
                    transform: `translateY(${preCenterY}px)`,
                  }}
                >
                  <CubeFace
                    module={MODULES[0]}
                    transform=""
                    opacity={1}
                    showDescription
                  />
                </div>

                {/* Right card - Version Control (MODULES[1]) */}
                <div
                  style={{
                    position: "absolute",
                    transform: `translateX(${preRightX}px)`,
                  }}
                >
                  <CubeFace
                    module={MODULES[1]}
                    transform=""
                    opacity={1}
                    showDescription
                  />
                </div>
              </>
            )}

            {/* Phase 2+: Folding cards / Cube faces */}
            {showFoldingCards && (
              <>
                {/* Left face (Stakeholder - purple - MODULES[2]) */}
                <CubeFace
                  module={
                    isCubeFormed ? getPillar(3, rotationQuarter) : MODULES[2]
                  }
                  transform={`translateX(${leftX}px) rotateY(${leftRotY}deg) translateZ(${leftZ}px)`}
                  opacity={1}
                  showDescription
                />

                {/* Front face (Task - orange - MODULES[0]) */}
                <CubeFace
                  module={
                    isCubeFormed ? getPillar(0, rotationQuarter) : MODULES[0]
                  }
                  transform={`translateZ(${centerZ}px)`}
                  opacity={1}
                  showDescription
                />

                {/* Right face (Version Control - blue - MODULES[1]) */}
                <CubeFace
                  module={
                    isCubeFormed ? getPillar(1, rotationQuarter) : MODULES[1]
                  }
                  transform={`translateX(${rightX}px) rotateY(${rightRotY}deg) translateZ(${rightZ}px)`}
                  opacity={1}
                  showDescription
                />

                {/* Back face (appears during fold) */}
                {foldProgress > 0 && (
                  <CubeFace
                    module={getPillar(2, rotationQuarter)}
                    transform={`translateZ(${-HALF_SIZE}px) rotateY(180deg)`}
                    opacity={additionalFacesOpacity}
                    showDescription
                  />
                )}

                {/* Top face - Logo (appears during fold) */}
                {foldProgress > 0.3 && (
                  <LogoFace
                    transform={`translateY(${-HALF_SIZE}px) rotateX(90deg)`}
                    opacity={additionalFacesOpacity}
                    glowIntensity={logoGlow}
                  />
                )}

                {/* Bottom face - decorative (appears during fold) */}
                {foldProgress > 0.5 && (
                  <div
                    style={{
                      position: "absolute",
                      width: FACE_SIZE,
                      height: FACE_SIZE,
                      transform: `translateY(${HALF_SIZE}px) rotateX(-90deg)`,
                      opacity: additionalFacesOpacity * 0.8,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      border: "2px solid rgba(255, 255, 255, 0.15)",
                      backfaceVisibility: "hidden",
                      borderRadius: 8,
                    }}
                    aria-hidden="true"
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Tagline (appears during spin phase) - absolutely positioned */}
        <div
          style={{
            position: "absolute",
            bottom: 180,
            left: 0,
            right: 0,
            transform: `translateY(${taglineY}px)`,
            opacity: taglineOpacity * taglineFade,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              color: "#ffffff",
              textShadow:
                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              fontFamily: FONTS.display,
            }}
          >
            From stakeholders to code, all connected
          </div>
        </div>

        {/* Finale: Title, CTA, URL (appear after cube shrinks) - absolutely positioned */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Heliograph Title */}
          <div
            style={{
              transform: `translateY(${titleY}px)`,
              opacity: titleOpacity,
            }}
          >
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: COLORS.textPrimary,
                fontFamily: FONTS.display,
                letterSpacing: "-2px",
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Heliograph
            </div>
          </div>

          {/* CTA Button */}
          <div
            style={{
              transform: `translateY(${ctaY}px)`,
              opacity: ctaOpacity,
            }}
          >
            <div
              style={{
                padding: "16px 48px",
                borderRadius: 12,
                background: `linear-gradient(135deg, ${COLORS.gradientOrange}, ${COLORS.gradientBlue})`,
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.textPrimary,
                fontFamily: FONTS.body,
                boxShadow: "0 8px 32px rgba(249, 115, 22, 0.3)",
              }}
            >
              Get Started Today
            </div>
          </div>

          {/* URL */}
          <div
            style={{
              transform: `translateY(${urlY}px)`,
              opacity: urlOpacity,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: FONTS.body,
              }}
            >
              heliograph.dev
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
