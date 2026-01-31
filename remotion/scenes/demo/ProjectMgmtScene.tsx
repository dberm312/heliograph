import { AbsoluteFill } from "remotion";
import { AnimatedGradient } from "../../components/AnimatedGradient";
import { MockupFrame } from "../../components/mockups/MockupFrame";
import { TaskView } from "../../components/mockups/TaskView";

const SCENE_PADDING = 40;

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
        {/* Mockup frame with Task view */}
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
            title="Heliograph — Tasks"
            width={1920 - SCENE_PADDING * 2}
            height={1080 - SCENE_PADDING * 2}
          >
            <TaskView />
          </MockupFrame>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
