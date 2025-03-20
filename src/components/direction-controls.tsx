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
    <div className="flex flex-col items-center gap-3">
      <h3 className="text-sm font-medium text-gray-600">Direction</h3>
      <div
        className="grid grid-cols-3 gap-2"
        style={{
          gridTemplateAreas: `
          ". up ."
          "left center right"
          ". down ."
        `,
        }}
      >
        <button
          type="button"
          className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg border ${
            rowIndex === 0
              ? "active"
              : "bg-white border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setRowIndex(0)}
          aria-label="Move Up"
          style={{ gridArea: "up" }}
        >
          ⬆
        </button>
        <button
          type="button"
          className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg border ${
            rowIndex === 1
              ? "active"
              : "bg-white border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setRowIndex(1)}
          aria-label="Move Right"
          style={{ gridArea: "right" }}
        >
          ➡
        </button>
        <button
          type="button"
          className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg border ${
            rowIndex === 2
              ? "active"
              : "bg-white border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setRowIndex(2)}
          aria-label="Move Down"
          style={{ gridArea: "down" }}
        >
          ⬇
        </button>
        <button
          type="button"
          className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg border ${
            rowIndex === 3
              ? "active"
              : "bg-white border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setRowIndex(3)}
          aria-label="Move Left"
          style={{ gridArea: "left" }}
        >
          ⬅
        </button>
        <button
          type="button"
          className={`w-10 h-10 flex items-center justify-center text-xl rounded-lg border ${
            rowIndex === undefined
              ? "active"
              : "bg-white border-gray-200 hover:bg-gray-100"
          }`}
          onClick={() => setRowIndex(undefined)}
          aria-label="Cycle All Directions"
          style={{ gridArea: "center" }}
        >
          🔁
        </button>
      </div>
    </div>
  );
}
