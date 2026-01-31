import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { RequirementList } from "../../components/mockups/RequirementCard";
import { StakeholderList } from "../../components/mockups/StakeholderList";

const SCENE_PADDING = 40;

export const StakeholderScene: React.FC = () => {
  const frame = useCurrentFrame();

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
          alignItems: "center",
          justifyContent: "center",
          padding: SCENE_PADDING,
        }}
      >
        {/* Mockup frame with stakeholder view */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MockupFrame
            title="Heliograph — Stakeholders"
            width={1920 - SCENE_PADDING * 2}
            height={1080 - SCENE_PADDING * 2}
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
                  background: "rgba(0, 0, 0, 0.1)",
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
