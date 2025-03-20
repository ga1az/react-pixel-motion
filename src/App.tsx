"use client";

import { useState } from "react";
import { PixelMotion } from "../lib/index";
import DirectionControls from "./components/direction-controls";
import SpeedControl from "./components/speed-control";
import guardaBot from "./assets/guardbot1.svg";
// @ts-ignore
import skeleton from "./assets/skeleton.png";
// @ts-ignore
import warrior from "./assets/warrior.png";
// @ts-ignore
import superWarrior from "./assets/soldier.webp";

export default function Home() {
  const [rowIndex, setRowIndex] = useState<number | undefined>(0);
  const [fps, setFps] = useState<number>(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frame, setFrame] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pixel Motion Animations
          </h1>
          <p className="text-gray-600">
            Interactive sprite animations with React
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Guard Bot Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Guard Bot
            </h2>
            <div className="flex justify-center">
              <PixelMotion
                sprite={guardaBot}
                width={30}
                height={31}
                startFrame={0}
                frameCount={3}
                scale={5}
                shouldAnimate={true}
                fps={10}
                loop={true}
              />
            </div>
          </div>

          {/* Skeleton Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Skeleton</h2>
            <div className="flex justify-center">
              <PixelMotion
                sprite={skeleton}
                width={31}
                height={31}
                startFrame={0}
                scale={5}
              />
            </div>
          </div>
        </div>

        {/* Warrior with Controls Section */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Warrior ({fps} FPS)
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex justify-center">
              <PixelMotion
                sprite={warrior}
                width={30}
                height={30}
                scale={5}
                fps={fps}
                shouldAnimate={true}
                direction="grid"
                gridOptions={{
                  columns: 4,
                  rows: 4,
                  rowIndex: rowIndex,
                }}
              />
            </div>
            <div className="w-full md:w-auto">
              <DirectionControls
                rowIndex={rowIndex}
                setRowIndex={setRowIndex}
              />
              <SpeedControl fps={fps} setFps={setFps} />
            </div>
          </div>
        </div>

        {/* Super Warrior Section */}
        <div className="mt-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
          <span className="absolute top-2 right-2 text-gray-400 text-xs">
            Art: Riley Gombart
          </span>
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Super Warrior
          </h2>
          <div className="flex flex-col items-center gap-6">
            <span className="">Frame: {frame}</span>
            <div className="flex justify-center">
              <PixelMotion
                sprite={superWarrior}
                width={30}
                height={31}
                startFrame={0}
                frameCount={15}
                fps={35}
                shouldAnimate={isPlaying}
                loop={false}
                scale={10}
                onAnimationStart={() => {
                  console.log("La animación ha comenzado");
                }}
                onAnimationEnd={() => {
                  console.log("La animación ha terminado");
                  setIsPlaying(false);
                }}
                onFrameChange={(frameIndex) => {
                  setFrame(frameIndex);
                  console.log(`Frame actual: ${frameIndex}`);
                }}
                onSpecificFrame={{
                  frame: [1, 2], // Trigger on frames 1 and 2
                  callback: (frameIndex) =>
                    console.log(`Special action on frame ${frameIndex}`),
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              disabled={isPlaying}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                isPlaying
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
              }`}
            >
              {isPlaying ? "Attacking..." : "Attack!"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
