import type React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { GradientBackground } from './components/shared';
import {
  Scene1Problem,
  Scene2Pattern,
  Scene3Solution,
  Scene4CTA,
} from './components/scenes';
import { SCENE_TIMING } from './styles/constants';

/**
 * HeliographPromo - Main video composition
 *
 * 40 second promotional video with 4 scenes:
 * 1. The Problem (0-10s): "You build something brilliant... It stays trapped."
 * 2. The Pattern (10-20s): "This happens everywhere. Edge never reaches core."
 * 3. The Solution (20-35s): "Heliograph connects the edge to the core."
 * 4. CTA (35-40s): "Align your teams. Amplify your impact."
 */
export const HeliographPromo: React.FC = () => {
  const { transitionDuration } = SCENE_TIMING;

  return (
    <AbsoluteFill>
      {/* Persistent gradient background */}
      <GradientBackground />

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: The Problem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMING.scene1.duration}>
          <Scene1Problem />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: The Pattern */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMING.scene2.duration}>
          <Scene2Pattern />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: The Solution */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMING.scene3.duration}>
          <Scene3Solution />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4: CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENE_TIMING.scene4.duration}>
          <Scene4CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
