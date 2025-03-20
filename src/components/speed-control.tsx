"use client";

import type { Dispatch, SetStateAction, ChangeEvent } from "react";

interface SpeedControlProps {
  fps: number;
  setFps: Dispatch<SetStateAction<number>>;
}

export default function SpeedControl({ fps, setFps }: SpeedControlProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFps(Number(e.target.value));
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <h3 className="text-sm font-medium text-gray-600">Animation Speed</h3>
      <div className="flex items-center gap-3 w-full">
        <span className="text-xs text-gray-500">Slow</span>
        <input
          type="range"
          min={1}
          max={60}
          value={fps}
          onChange={handleChange}
          className="w-full h-2 appearance-none bg-gray-200 rounded-full outline-none cursor-pointer accent-indigo-500"
          aria-label="Animation Speed"
        />
        <span className="text-xs text-gray-500">Fast</span>
      </div>
      <div className="text-sm font-medium px-3 py-1 bg-gray-100 rounded-full text-gray-700">
        {fps} FPS
      </div>
    </div>
  );
}
