import { AbsoluteFill } from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { FeatureCommentary } from "../../components/FeatureCommentary";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { TaskViewEnhanced } from "../../components/mockups/TaskViewEnhanced";
import { TASK_FEATURE_ITEMS } from "../../data/taskData";
import { MODULE_COLORS } from "../../utils/colors";

const SCENE_PADDING = 40;
const PANEL_GAP = 32;
// Left panel takes 1/3 of the available width
const LEFT_PANEL_WIDTH = Math.floor((1920 - SCENE_PADDING * 2 - PANEL_GAP) / 3);
// Right panel (mockup) takes remaining 2/3
const MOCKUP_WIDTH = 1920 - SCENE_PADDING * 2 - LEFT_PANEL_WIDTH - PANEL_GAP;
const MOCKUP_HEIGHT = 1080 - SCENE_PADDING * 2;

export const ProjectMgmtScene: React.FC = () => {
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            gap: PANEL_GAP,
          }}
        >
          {/* Left Panel - Feature Commentary */}
          <div
            style={{
              width: LEFT_PANEL_WIDTH,
              height: MOCKUP_HEIGHT,
              flexShrink: 0,
              background: "#ffffff",
              borderRadius: 16,
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
              overflow: "hidden",
            }}
          >
            <FeatureCommentary
              title="Task Management"
              items={TASK_FEATURE_ITEMS}
              accentColor={MODULE_COLORS.projectManagement.primary}
            />
          </div>

          {/* Right Panel - Task Mockup */}
          <MockupFrame
            title="Heliograph — Tasks"
            width={MOCKUP_WIDTH}
            height={MOCKUP_HEIGHT}
          >
            <TaskViewEnhanced />
          </MockupFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
