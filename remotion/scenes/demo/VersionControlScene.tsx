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
import { FONTS } from "../../utils/fonts";

const SCENE_PADDING = 40;

export const VersionControlScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Split panel animation
  const splitProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Show merge animation in last third of scene
  const showMerge = frame > 200;

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
        {/* Mockup frame with split view */}
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
            title="Heliograph — Version Control"
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
                    color: "#64748b",
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
                  background: "rgba(0, 0, 0, 0.1)",
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
                    color: "#64748b",
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
