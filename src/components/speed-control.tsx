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
    <div style={styles.container}>
      <h3 style={styles.title}>Animation Speed</h3>
      <div style={styles.controlWrapper}>
        <span style={styles.label}>Slow</span>
        <input
          type="range"
          min={1}
          max={60}
          value={fps}
          onChange={handleChange}
          style={styles.slider}
          aria-label="Animation Speed"
        />
        <span style={styles.label}>Fast</span>
      </div>
      <div style={styles.valueDisplay}>{fps} FPS</div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "0.75rem",
  },
  title: {
    margin: 0,
    fontSize: "1rem",
    color: "#555",
  },
  controlWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    width: "100%",
  },
  label: {
    fontSize: "0.75rem",
    color: "#777",
  },
  slider: {
    width: "150px",
    height: "8px",
    appearance: "none" as const,
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    outline: "none",
    cursor: "pointer",
  },
  valueDisplay: {
    fontSize: "0.875rem",
    fontWeight: "bold" as const,
    color: "#555",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
  },
};
