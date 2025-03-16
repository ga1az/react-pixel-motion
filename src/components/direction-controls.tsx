"use client";

import type { Dispatch, SetStateAction } from "react";

interface DirectionControlsProps {
  rowIndex: number | undefined;
  setRowIndex: Dispatch<SetStateAction<number | undefined>>;
}

export default function DirectionControls({
  rowIndex,
  setRowIndex,
}: DirectionControlsProps) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Direction</h3>
      <div style={styles.buttonGrid}>
        <button
          style={{ ...styles.button, ...styles.topButton }}
          onClick={() => setRowIndex(0)}
          aria-label="Move Up"
          className={rowIndex === 0 ? "active" : ""}
        >
          ⬆
        </button>
        <button
          style={{ ...styles.button, ...styles.rightButton }}
          onClick={() => setRowIndex(1)}
          aria-label="Move Right"
          className={rowIndex === 1 ? "active" : ""}
        >
          ➡
        </button>
        <button
          style={{ ...styles.button, ...styles.bottomButton }}
          onClick={() => setRowIndex(2)}
          aria-label="Move Down"
          className={rowIndex === 2 ? "active" : ""}
        >
          ⬇
        </button>
        <button
          style={{ ...styles.button, ...styles.leftButton }}
          onClick={() => setRowIndex(3)}
          aria-label="Move Left"
          className={rowIndex === 3 ? "active" : ""}
        >
          ⬅
        </button>
        <button
          style={{ ...styles.button, ...styles.centerButton }}
          onClick={() => setRowIndex(undefined)}
          aria-label="Cycle All Directions"
          className={rowIndex === undefined ? "active" : ""}
        >
          🔁
        </button>
      </div>
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
  buttonGrid: {
    display: "grid",
    gridTemplateAreas: `
      ". up ."
      "left center right"
      ". down ."
    `,
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
    gap: "0.5rem",
  },
  button: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.25rem",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#e0e0e0",
    },
    ":active": {
      transform: "scale(0.95)",
    },
  },
  topButton: {
    gridArea: "up",
  },
  rightButton: {
    gridArea: "right",
  },
  bottomButton: {
    gridArea: "down",
  },
  leftButton: {
    gridArea: "left",
  },
  centerButton: {
    gridArea: "center",
    backgroundColor: "#f5f5f5",
  },
};
