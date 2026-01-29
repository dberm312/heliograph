import { Composition } from "remotion";
import { DemoVideo } from "./DemoVideo";
import { HeliographVideo } from "./HeliographVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeliographPromo"
        component={HeliographVideo}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
