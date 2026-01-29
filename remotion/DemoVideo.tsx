import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
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

  // Scene durations (in frames at 30fps) - Total 45s = 1350 frames
  const introDuration = 90; // 3s
  const projectMgmtDuration = 360; // 12s
  const versionControlDuration = 360; // 12s
  const stakeholderDuration = 360; // 12s
  const outroDuration = 180; // 6s

  // Transition configuration
  const fadeTransition = linearTiming({ durationInFrames: 20 });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro Title */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroTitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 2: Project Management */}
        <TransitionSeries.Sequence durationInFrames={projectMgmtDuration}>
          <ProjectMgmtScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 3: Version Control */}
        <TransitionSeries.Sequence durationInFrames={versionControlDuration}>
          <VersionControlScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 4: Stakeholder Management */}
        <TransitionSeries.Sequence durationInFrames={stakeholderDuration}>
          <StakeholderScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 5: Outro */}
        <TransitionSeries.Sequence durationInFrames={outroDuration}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
