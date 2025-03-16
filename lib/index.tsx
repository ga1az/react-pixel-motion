import { useEffect, useRef, useState } from "react";
interface GridOptions {
  columns: number;
  rows: number;
  rowIndex?: number;
  columnIndex?: number;
  gap?: number;
}
interface BasePixelMotionProps {
  sprite: string | { src: string };
  width: number;
  height: number;
  frameCount?: number;
  fps?: number;
  shouldAnimate?: boolean;
  scale?: number;
  startFrame?: number;
  loop?: boolean;
}
interface HorizontalOrVerticalProps extends BasePixelMotionProps {
  direction?: "horizontal" | "vertical";
  gridOptions?: never;
}

interface GridProps extends BasePixelMotionProps {
  direction: "grid";
  gridOptions: GridOptions;
}

type PixelMotionProps = HorizontalOrVerticalProps | GridProps;
const PixelMotion = ({
  sprite, // URL for the sprite
  width, // Width of each frame
  height, // Height of each frame
  frameCount = 1, // Total number of frames
  fps = 60, // Frames per second
  direction = "horizontal", // 'horizontal' or 'vertical'
  shouldAnimate = false, // Start/stop the animation
  scale = 1, // Sprite scale
  startFrame = 0, // Initial frame
  loop = true, // Loop the animation
  gridOptions,
}: PixelMotionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(startFrame);
  const animationRef = useRef<number | null>(null);

  const actualFrameCount = (() => {
    if (direction === "grid" && gridOptions) {
      if (gridOptions.rowIndex !== undefined) {
        return gridOptions.columns;
      }
      if (gridOptions.columnIndex !== undefined) {
        return gridOptions.rows;
      }
      return gridOptions.columns * gridOptions.rows;
    }
    return frameCount;
  })();

  useEffect(() => {
    const img = new Image();
    img.src = typeof sprite === "string" ? sprite : sprite.src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      console.error("Error loading sprite");
      setIsLoaded(false);
    };
  }, [sprite]);

  useEffect(() => {
    if (!isLoaded || !shouldAnimate) return;

    const interval = 1000 / Math.max(fps, 1);
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        setCurrentFrame((prevFrame) => {
          const nextFrame = prevFrame + 1;
          return nextFrame >= actualFrameCount
            ? loop
              ? startFrame
              : prevFrame
            : nextFrame;
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
  }, [isLoaded, shouldAnimate, fps, startFrame, loop, actualFrameCount]);

  const getBackgroundPosition = (): string => {
    if (!isLoaded) return "0px 0px";

    if (direction === "grid" && gridOptions) {
      const { columns, rows, rowIndex, columnIndex, gap = 0 } = gridOptions;
      let row = 0;
      let col = 0;

      if (rowIndex !== undefined) {
        row = Math.min(Math.max(rowIndex, 0), rows - 1);
        col = currentFrame;
      } else if (columnIndex !== undefined) {
        row = currentFrame;
        col = Math.min(Math.max(columnIndex, 0), columns - 1);
      } else {
        row = Math.floor(currentFrame / columns);
        col = currentFrame % columns;
      }

      const xPos = col * (width + gap) * scale;
      const yPos = row * (height + gap) * scale;
      return `-${xPos}px -${yPos}px`;
    }

    const frameSize = direction === "horizontal" ? width : height;
    const position = currentFrame * frameSize * scale;
    return direction === "horizontal"
      ? `-${position}px 0px`
      : `0px -${position}px`;
  };

  const getBackgroundSize = (): string => {
    if (direction === "grid" && gridOptions) {
      const { columns, rows, gap = 0 } = gridOptions;
      const totalWidth = (width * columns + gap * (columns - 1)) * scale;
      const totalHeight = (height * rows + gap * (rows - 1)) * scale;
      return `${totalWidth}px ${totalHeight}px`;
    }

    return direction === "horizontal"
      ? `${width * frameCount * scale}px ${height * scale}px`
      : `${width * scale}px ${height * frameCount * scale}px`;
  };

  const spriteStyles: React.CSSProperties = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: isLoaded ? `url(${sprite})` : "none",
    backgroundPosition: getBackgroundPosition(),
    backgroundSize: getBackgroundSize(),
    backgroundRepeat: "no-repeat",
  };

  return <div style={spriteStyles} />;
};

export default PixelMotion;
