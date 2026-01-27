import { Composition } from "remotion";
import { HeliographVideo } from "./HeliographVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeliographPromo"
      component={HeliographVideo}
      durationInFrames={660}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
