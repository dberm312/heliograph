import { Composition, registerRoot } from 'remotion';
import { HeliographPromo } from './HeliographPromo';
import { COMPOSITION } from './styles/constants';

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeliographPromo"
        component={HeliographPromo}
        durationInFrames={COMPOSITION.durationInFrames}
        fps={COMPOSITION.fps}
        width={COMPOSITION.width}
        height={COMPOSITION.height}
      />
    </>
  );
};

registerRoot(RemotionRoot);
