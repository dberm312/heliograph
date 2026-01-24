import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Scene1Logo } from "./scenes/Scene1Logo";
import { Scene2Problem } from "./scenes/Scene2Problem";
import { Scene3Solution } from "./scenes/Scene3Solution";
import { Scene4Features } from "./scenes/Scene4Features";
import { Scene5CTA } from "./scenes/Scene5CTA";

export const HeliographVideo: React.FC = () => {
  // Scene durations (in frames at 30fps)
  const scene1Duration = 100; // ~3.3s - Logo intro
  const scene2Duration = 130; // ~4.3s - Problem
  const scene3Duration = 130; // ~4.3s - Solution
  const scene4Duration = 150; // ~5s - Features
  const scene5Duration = 75; // ~2.5s - CTA

  // Transition durations
  const fadeTransition = linearTiming({ durationInFrames: 20 });
  const slideTransition = linearTiming({ durationInFrames: 25 });

  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Logo Intro */}
        <TransitionSeries.Sequence durationInFrames={scene1Duration}>
          <Scene1Logo />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 2: The Problem */}
        <TransitionSeries.Sequence durationInFrames={scene2Duration}>
          <Scene2Problem />
        </TransitionSeries.Sequence>

        {/* Transition: Slide from right */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={slideTransition}
        />

        {/* Scene 3: The Solution */}
        <TransitionSeries.Sequence durationInFrames={scene3Duration}>
          <Scene3Solution />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 4: Features */}
        <TransitionSeries.Sequence durationInFrames={scene4Duration}>
          <Scene4Features />
        </TransitionSeries.Sequence>

        {/* Transition: Fade */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={fadeTransition}
        />

        {/* Scene 5: CTA */}
        <TransitionSeries.Sequence durationInFrames={scene5Duration}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
