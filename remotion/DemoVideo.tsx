import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { IntroTitleScene } from "./scenes/demo/IntroTitleScene";
import { OutroScene } from "./scenes/demo/OutroScene";
import { ProjectMgmtScene } from "./scenes/demo/ProjectMgmtScene";
import { StakeholderScene } from "./scenes/demo/StakeholderScene";
import { VersionControlScene } from "./scenes/demo/VersionControlScene";
import { loadFonts } from "./utils/fonts";

export const DemoVideo: React.FC = () => {
  useEffect(() => {
    loadFonts();
  }, []);

  // Scene durations (in frames at 30fps) - Total ~62s = 1860 frames
  const introDuration = 90; // 3s
  const projectMgmtDuration = 450; // 15s
  const versionControlDuration = 450; // 15s
  const stakeholderDuration = 450; // 15s
  const outroDuration = 450; // 15s

  // Transition configuration - macOS desktop swipe style (0.5s)
  const slideTransition = linearTiming({ durationInFrames: 15 });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro Title */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroTitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 2: Stakeholder Management (CRM) */}
        <TransitionSeries.Sequence durationInFrames={stakeholderDuration}>
          <StakeholderScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 3: Project Management */}
        <TransitionSeries.Sequence durationInFrames={projectMgmtDuration}>
          <ProjectMgmtScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 4: Version Control */}
        <TransitionSeries.Sequence durationInFrames={versionControlDuration}>
          <VersionControlScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 5: Outro */}
        <TransitionSeries.Sequence durationInFrames={outroDuration}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
