import {
  linearTiming,
  springTiming,
  TransitionSeries,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { useEffect } from "react";
import { AbsoluteFill } from "remotion";
import { CTAScene } from "./scenes/CTAScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { HookScene } from "./scenes/HookScene";
import { PainScene } from "./scenes/PainScene";
import { RevealScene } from "./scenes/RevealScene";
import { loadFonts } from "./utils/fonts";

export const HeliographVideo: React.FC = () => {
  // Load fonts on mount
  useEffect(() => {
    loadFonts();
  }, []);

  // Scene durations (in frames at 30fps) - Total ~22s = 660 frames
  const hookDuration = 90; // ~3s
  const painDuration = 180; // ~6s
  const revealDuration = 120; // ~4s
  const featuresDuration = 180; // ~6s
  const ctaDuration = 90; // ~3s

  // Transition configurations
  const fadeTransition = linearTiming({ durationInFrames: 15 });
  const slideTransition = springTiming({
    config: { damping: 200 },
    durationInFrames: 20,
  });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Hook */}
        <TransitionSeries.Sequence durationInFrames={hookDuration}>
          <HookScene />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 2: Pain Point */}
        <TransitionSeries.Sequence durationInFrames={painDuration}>
          <PainScene />
        </TransitionSeries.Sequence>

        {/* Transition: Slide from right */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 3: Solution Reveal */}
        <TransitionSeries.Sequence durationInFrames={revealDuration}>
          <RevealScene />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 4: Features */}
        <TransitionSeries.Sequence durationInFrames={featuresDuration}>
          <FeaturesScene />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 5: CTA */}
        <TransitionSeries.Sequence durationInFrames={ctaDuration}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
