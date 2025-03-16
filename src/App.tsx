"use client";

import { useState } from "react";
import PixelMotionComponent from "../lib/index";
import DirectionControls from "./components/direction-controls";
import SpeedControl from "./components/speed-control";
import guardaBot from "./assets/guardbot1.svg";
import skeleton from "./assets/skeleton.png";
import warrior from "./assets/warrior.png";

export default function Home() {
  const [rowIndex, setRowIndex] = useState<number | undefined>(0);
  const [fps, setFps] = useState<number>(10);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pixel Motion Animations</h1>

      <div style={styles.spriteContainer}>
        <div style={styles.spriteCard}>
          <h2 style={styles.spriteTitle}>Guard Bot</h2>
          <PixelMotionComponent
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

        <div style={styles.spriteCard}>
          <h2 style={styles.spriteTitle}>Skeleton</h2>
          <PixelMotionComponent
            sprite={skeleton}
            width={31}
            height={31}
            startFrame={0}
            scale={5}
          />
        </div>
      </div>

      <div style={styles.interactiveContainer}>
        <div style={styles.spriteCard}>
          <h2 style={styles.spriteTitle}>Warrior ({fps} FPS)</h2>
          <PixelMotionComponent
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

        <div style={styles.controlsContainer}>
          <DirectionControls rowIndex={rowIndex} setRowIndex={setRowIndex} />
          <SpeedControl fps={fps} setFps={setFps} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    gap: "2rem",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#333",
  },
  spriteContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    gap: "2rem",
    width: "100%",
  },
  interactiveContainer: {
    display: "flex",
    flexWrap: "wrap" as const,
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    padding: "1rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  spriteCard: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    padding: "1.5rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
    ":hover": {
      transform: "translateY(-5px)",
    },
  },
  spriteTitle: {
    fontSize: "1.25rem",
    marginBottom: "1rem",
    color: "#555",
  },
  controlsContainer: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
};
