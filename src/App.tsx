import PixelMotion from "../lib";
import guardaBot from "./assets/guardbot1.svg";
import skeleton from "./assets/skeleton.png";

function App() {
  return (
    <div>
      <PixelMotion
        sprite={guardaBot}
        width={30}
        height={31}
        startFrame={0}
        frameCount={3}
        scale={5}
        shouldAnimate={true}
        fps={10}
        loop={false}
      />
      <PixelMotion
        sprite={skeleton}
        width={31}
        height={31}
        startFrame={0}
        scale={5}
      />
    </div>
  );
}

export default App;
