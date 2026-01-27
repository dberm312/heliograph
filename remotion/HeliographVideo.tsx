import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { JobsMomentScene } from "./scenes/JobsMomentScene";
import { loadFonts } from "./utils/fonts";

export const HeliographVideo: React.FC = () => {
  // Load fonts on mount
  useEffect(() => {
    loadFonts();
  }, []);

  // Scene durations (in frames at 30fps) - Total ~13s = 390 frames
  const introDuration = 90; // ~3s
  const cubeDuration = 300; // ~10s - 3D cube animation with extended hold

  // Transition configurations
  const fadeTransition = linearTiming({ durationInFrames: 15 });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro - FDE cross-functional work */}
        <TransitionSeries.Sequence durationInFrames={introDuration}>
          <IntroScene />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 2: 3D Cube - Three tools become one */}
        <TransitionSeries.Sequence durationInFrames={cubeDuration}>
          <JobsMomentScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
