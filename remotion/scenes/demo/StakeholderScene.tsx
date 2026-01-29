import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { RequirementList } from "../../components/mockups/RequirementCard";
import { StakeholderList } from "../../components/mockups/StakeholderList";
import { COLORS, MODULE_COLORS } from "../../utils/colors";
import { FONTS } from "../../utils/fonts";

export const StakeholderScene: React.FC = () => {
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

  // Selection animation - select first stakeholder after delay
  const selectionProgress = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const selectedIndex = selectionProgress > 0.5 ? 0 : -1;
  const showRequirements = frame > 110;

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
                background: MODULE_COLORS.stakeholderManagement.primary,
                boxShadow: `0 0 20px ${MODULE_COLORS.stakeholderManagement.primary}`,
              }}
            />
            Stakeholder Management
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
            background: "rgba(139, 92, 246, 0.15)",
            borderRadius: 8,
            border: "1px solid rgba(139, 92, 246, 0.3)",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: MODULE_COLORS.stakeholderManagement.primary,
            }}
          />
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: MODULE_COLORS.stakeholderManagement.secondary,
              fontFamily: FONTS.body,
            }}
          >
            Stakeholder Management
          </div>
        </div>

        {/* Mockup frame with stakeholder view */}
        <div
          style={{
            transform: `scale(${frameScale})`,
            opacity: frameOpacity,
            marginTop: 40,
          }}
        >
          <MockupFrame
            title="Heliograph — Stakeholders"
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
              {/* Left panel - Stakeholder list */}
              <StakeholderList selectedIndex={selectedIndex} />

              {/* Divider */}
              <div
                style={{
                  width: 1,
                  background: "rgba(255, 255, 255, 0.1)",
                }}
              />

              {/* Right panel - Requirements */}
              <RequirementList visible={showRequirements} />
            </div>
          </MockupFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
