import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { BranchTree } from "../../components/mockups/BranchTree";
import { DiffView } from "../../components/mockups/DiffView";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

export const VersionControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scene title entrance
  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const titleX = interpolate(titleProgress, [0, 1], [-100, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  // Scene title exit
  const titleExit = interpolate(frame, [40, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Mockup frame entrance
  const frameProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 25, stiffness: 80 },
  });

  const frameScale = interpolate(frameProgress, [0, 1], [0.9, 1]);
  const frameOpacity = interpolate(frameProgress, [0, 1], [0, 1]);

  // Split panel animation
  const splitProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Fade out at end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Module badge
  const badgeOpacity = interpolate(frame, [50, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Show merge animation in last third of scene
  const showMerge = frame > 200;

  return (
    <AbsoluteFill>
      <AnimatedGradient intensity={0.3} />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
          opacity: fadeOut,
        }}
      >
        {/* Scene title (shows briefly at start) */}
        <div
          style={{
            position: "absolute",
            top: 80,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            opacity: titleExit,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.textPrimary,
              fontFamily: FONTS.display,
              transform: `translateX(${titleX}px)`,
              opacity: titleOpacity,
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: MODULE_COLORS.versionControl.primary,
                boxShadow: `0 0 20px ${MODULE_COLORS.versionControl.primary}`,
              }}
            />
            Version Control
          </div>
        </div>

        {/* Module badge (stays visible) */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 80,
            opacity: badgeOpacity,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            background: "rgba(59, 130, 246, 0.15)",
            borderRadius: 8,
            border: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: MODULE_COLORS.versionControl.primary,
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: MODULE_COLORS.versionControl.secondary,
              fontFamily: FONTS.body,
            }}
          >
            Version Control
          </div>
        </div>

        {/* Mockup frame with split view */}
        <div
          style={{
            transform: `scale(${frameScale})`,
            opacity: frameOpacity,
            marginTop: 40,
          }}
        >
          <MockupFrame
            title="Heliograph — Version Control"
            width={1600}
            height={750}
          >
            <div
              style={{
                display: "flex",
                height: "100%",
                padding: 32,
                gap: 40,
              }}
            >
              {/* Left panel - Branch tree */}
              <div
                style={{
                  flex: "0 0 350px",
                  opacity: splitProgress,
                  transform: `translateX(${interpolate(splitProgress, [0, 1], [-30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.textSecondary,
                    fontFamily: FONTS.body,
                    marginBottom: 20,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Branches
                </div>
                <BranchTree showMerge={showMerge} />
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                  opacity: splitProgress,
                }}
              />

              {/* Right panel - Diff view */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  opacity: splitProgress,
                  transform: `translateX(${interpolate(splitProgress, [0, 1], [30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.textSecondary,
                    fontFamily: FONTS.body,
                    marginBottom: 20,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Changes
                </div>
                <DiffView />
              </div>
            </div>
          </MockupFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
