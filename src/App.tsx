import PixelMotion from "../lib";
import guardaBot from "./assets/guardbot1.svg";

function App() {
  return (
    <div>
      <PixelMotion
        sprite={guardaBot}
        width={24}
        height={31}
        frameCount={3}
        startFrame={0}
        fps={10}
        shouldAnimate={true}
        scale={5}
      />
    </div>
  );
}

export default App;
