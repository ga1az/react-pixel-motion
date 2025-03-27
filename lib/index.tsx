import { useEffect, useRef, useState } from "react";

interface StaticImageData {
  src: string;
}
interface GridOptions {
  columns: number;
  rows: number;
  rowIndex?: number;
  columnIndex?: number;
  gap?: number;
}
interface BasePixelMotionProps {
  sprite: string | StaticImageData;
  width: number;
  height: number;
  frameCount?: number;
  fps?: number;
  shouldAnimate?: boolean;
  imageRendering?: boolean;
  scale?: number;
  startFrame?: number;
  loop?: boolean;
  onAnimationEnd?: () => void;
  onAnimationStart?: () => void;
  onFrameChange?: (frameIndex: number) => void;
  onSpecificFrame?: {
    frame: number | number[];
    callback: (frameIndex: number) => void;
  };
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

interface SpriteState {
  isLoaded: boolean;
  currentFrame: number;
}

const calculateFrameCount = (
  direction: string,
  frameCount: number,
  gridOptions?: GridOptions
): number => {
  if (direction === "grid" && gridOptions) {
    if (gridOptions.rowIndex !== undefined) return gridOptions.columns;
    if (gridOptions.columnIndex !== undefined) return gridOptions.rows;
    return gridOptions.columns * gridOptions.rows;
  }
  return frameCount;
};

const calculateBackgroundPosition = (
  direction: string,
  currentFrame: number,
  width: number,
  height: number,
  scale: number,
  gridOptions?: GridOptions
): string => {
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

const calculateBackgroundSize = (
  direction: string,
  width: number,
  height: number,
  frameCount: number,
  scale: number,
  gridOptions?: GridOptions
): string => {
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

const loadSpriteImage = (
  sprite: string | StaticImageData,
  setIsLoaded: (loaded: boolean) => void
) => {
  const img = new Image();
  img.src = typeof sprite === "string" ? sprite : sprite.src;
  img.onload = () => setIsLoaded(true);
  img.onerror = () => {
    console.error("Error loading sprite");
    setIsLoaded(false);
  };
};

const PixelMotion = ({
  sprite,
  width,
  height,
  frameCount = 1,
  fps = 60,
  direction = "horizontal",
  shouldAnimate = false,
  scale = 1,
  startFrame = 0,
  loop = true,
  imageRendering = true,
  gridOptions,
  onAnimationEnd,
  onAnimationStart,
  onFrameChange,
  onSpecificFrame,
}: PixelMotionProps) => {
  const [state, setState] = useState<SpriteState>({
    isLoaded: false,
    currentFrame: startFrame,
  });
  const animationRef = useRef<number | null>(null);
  const animationStarted = useRef(false);
  const previouslyAnimating = useRef(false);
  const hasAnimationEnded = useRef(false);

  const actualFrameCount = calculateFrameCount(
    direction,
    frameCount,
    gridOptions
  );

  useEffect(() => {
    loadSpriteImage(sprite, (loaded) =>
      setState((prev) => ({ ...prev, isLoaded: loaded }))
    );
  }, [sprite]);

  useEffect(() => {
    if (shouldAnimate && !previouslyAnimating.current) {
      setState((prev) => ({ ...prev, currentFrame: startFrame }));
      hasAnimationEnded.current = false;
    }
  }, [shouldAnimate, startFrame]);

  useEffect(() => {
    if (state.isLoaded && shouldAnimate && !previouslyAnimating.current) {
      previouslyAnimating.current = true;
      animationStarted.current = true;
      onAnimationStart?.();
    } else if (!shouldAnimate) {
      previouslyAnimating.current = false;
      animationStarted.current = false;
    }
  }, [state.isLoaded, shouldAnimate, onAnimationStart]);

  useEffect(() => {
    onFrameChange?.(state.currentFrame);
    if (onSpecificFrame) {
      const { frame, callback } = onSpecificFrame;
      if (Array.isArray(frame)) {
        if (frame.includes(state.currentFrame)) callback(state.currentFrame);
      } else if (frame === state.currentFrame) callback(state.currentFrame);
    }
  }, [state.currentFrame, onFrameChange, onSpecificFrame]);

  useEffect(() => {
    if (!state.isLoaded || !shouldAnimate) return;

    const interval = 1000 / Math.max(fps, 1);
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        setState((prev) => {
          const nextFrame = prev.currentFrame + 1;
          if (nextFrame >= actualFrameCount) {
            if (loop) return { ...prev, currentFrame: startFrame };
            if (!hasAnimationEnded.current && onAnimationEnd) {
              hasAnimationEnded.current = true;
              setTimeout(() => onAnimationEnd(), 0);
              return { ...prev, currentFrame: startFrame };
            }
            return prev;
          }
          return { ...prev, currentFrame: nextFrame };
        });
        lastTime = currentTime - (deltaTime % interval);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    state.isLoaded,
    shouldAnimate,
    fps,
    startFrame,
    loop,
    actualFrameCount,
    onAnimationEnd,
  ]);

  const spriteStyles: React.CSSProperties = {
    width: `${width * scale}px`,
    height: `${height * scale}px`,
    backgroundImage: state.isLoaded
      ? `url(${typeof sprite === "string" ? sprite : sprite.src})`
      : "none",
    backgroundPosition: calculateBackgroundPosition(
      direction,
      state.currentFrame,
      width,
      height,
      scale,
      gridOptions
    ),
    backgroundSize: calculateBackgroundSize(
      direction,
      width,
      height,
      frameCount,
      scale,
      gridOptions
    ),
    backgroundRepeat: "no-repeat",
    ...(imageRendering ? { imageRendering: "pixelated" } : {}),
  };

  return <div style={spriteStyles} />;
};

export {
  PixelMotion,
  type PixelMotionProps,
  type StaticImageData,
  type GridOptions,
  type BasePixelMotionProps,
  type HorizontalOrVerticalProps,
  type GridProps,
};
