import { useEffect, useRef, useState } from "react";

interface PixelMotionProps {
  sprite: string;
  width: number;
  height: number;
  frameCount: number;
  fps: number;
  direction?: "horizontal" | "vertical";
  shouldAnimate?: boolean;
  scale?: number;
  startFrame?: number;
}

const PixelMotion = ({
  sprite, // URL for the sprite
  width, // Width of each frame
  height, // Height of each frame
  frameCount, // Total number of frames
  fps = 60, // Frames per second
  direction = "horizontal", // 'horizontal' or 'vertical'
  shouldAnimate = true, // Start/stop the animation
  scale = 1, // Sprite scale
  startFrame = 0, // Initial frame
}: PixelMotionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(startFrame);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = sprite;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => console.error("Error loading sprite");
  }, [sprite]);

  useEffect(() => {
    if (!isLoaded || !shouldAnimate) return;

    const interval = 1000 / fps;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        setCurrentFrame((prevFrame) => {
          const nextFrame = prevFrame + 1;
          return nextFrame >= frameCount ? startFrame : nextFrame;
        });
        lastTime = currentTime - (deltaTime % interval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, shouldAnimate, fps, frameCount, startFrame]);

  const getBackgroundPosition = () => {
    if (!isLoaded) return "0px 0px";

    const frameSize = direction === "horizontal" ? width : height;
    const position = currentFrame * frameSize * scale;

    return direction === "horizontal"
      ? `-${position}px 0px`
      : `0px -${position}px`;
  };

  const spriteStyles = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: isLoaded ? `url(${sprite})` : "none",
    backgroundPosition: getBackgroundPosition(),
    backgroundSize:
      direction === "horizontal"
        ? `${width * frameCount * scale}px ${height * scale}px`
        : `${width * scale}px ${height * frameCount * scale}px`,
    backgroundRepeat: "no-repeat",
  };

  return <div style={spriteStyles} />;
};

export default PixelMotion;
