# React Pixel Motion

A lightweight React component for creating smooth, pixelated sprite animations. Perfect for games, retro-style interfaces, and pixel art animations. Totally inspired by [react-sprite-animation](https://github.com/jcblw/react-sprite-animator).

<div align="center">
  <img src="./src/assets/demo.gif" alt="Demo" width="50" />
</div>


## Features

- 🎮 Simple API for sprite sheet animations
- 🖼️ Support horizontal, vertical and grid sprite sheets
- 🔄 Control over animation speed, scale, and direction
- 📱 Responsive and lightweight

## Sprite Sheet example supports

<div align="center" style="display: flex; gap: 10px; justify-content: center; font-weight: bold;">
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p>Sprite 1 row x 3 columns</p>
    <img src="./src/assets/guardbot1.svg" alt="Sprite Sheet Example" width="100" height="100" />
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p>Sprite 1 rows x 1 columns</p>
    <img src="./src/assets/skeleton.png" alt="Sprite Sheet Example" width="100" height="100" />
  </div>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <p>Sprite 4 rows x 4 columns</p>
    <img src="./src/assets/warrior.png" alt="Sprite Sheet Example" width="100" height="100" />
  </div>
</div>

## Installation

```bash
# Using npm
npm install @ga1az/react-pixel-motion

# Using yarn
yarn add @ga1az/react-pixel-motion

# Using pnpm
pnpm add @ga1az/react-pixel-motion

# Using bun
bun add @ga1az/react-pixel-motion
```

## Usage

```tsx
import { PixelMotion } from "@ga1az/react-pixel-motion";
import characterSprite from './assets/character.svg'; // or any other image format
import warrior from './assets/warrior.png';

function App() {
  return (
    <PixelMotion
      sprite={characterSprite}
      width={24} // Width of each frame in pixels (required)
      height={31} // Height of each frame in pixels (required)
      frameCount={3} // Total number of frames in the sprite sheet (optional)
      fps={10} // Frames per second for the animation (optional)
      scale={5} // Scale factor for the sprite (optional)
      startFrame={0} // Initial frame to start the animation (optional)
      loop={true} // Whether the animation should loop (optional)
      shouldAnimate={true} // Whether the animation should play (optional)
      direction="horizontal" // Direction of the sprite sheet (optional)
      onAnimationEnd={() => console.log('Animation ended')} // Callback when animation ends (optional)
      onAnimationStart={() => console.log('Animation started')} // Callback when animation starts (optional)
    />
    // Grid 4x4 example
    <PixelMotion
      sprite={warrior}
      width={30}
      height={30}
      scale={5}
      fps={5}
      shouldAnimate={true}
      direction="grid" // Direction of the sprite sheet (optional)
      gridOptions={{
        columns: 4, // Total columns in the sprite sheet (required)
        rows: 4, // Total rows in the sprite sheet (required)
        rowIndex: 0, // Index of the row to animate (optional)
      }}
      onFrameChange={(frameIndex) => console.log(`Current frame: ${frameIndex}`)} // Callback for each frame change (optional)
    />

    // Example with specific frame callback
    <PixelMotion
      sprite={characterSprite}
      width={24}
      height={31}
      frameCount={3}
      fps={10}
      scale={5}
      shouldAnimate={true}
      onSpecificFrame={{
        frame: [1, 2], // Trigger on frames 1 and 2
        callback: (frameIndex) => console.log(`Special action on frame ${frameIndex}`) // Callback for specific frames (optional)
      }}
    />
  );
}
```

## API

### Props


| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sprite` | `string` \| `StaticImageData` | *Required* | URL or import of the sprite sheet image |
| `width` | `number` | *Required* | Width of each frame in pixels |
| `height` | `number` | *Required* | Height of each frame in pixels |
| `frameCount` | `number` | `1` | Total number of frames in the sprite sheet |
| `fps` | `number` | `60` | Frames per second for the animation |
| `direction` | `'horizontal'` \| `'vertical'` \| `'grid'` | `'horizontal'` | Direction of the sprite sheet |
| `shouldAnimate` | `boolean` | `false` | Whether the animation should play |
| `scale` | `number` | `1` | Scale factor for the sprite |
| `startFrame` | `number` | `0` | Initial frame to start the animation |
| `loop` | `boolean` | `true` | Whether the animation should loop |
| `gridOptions` | `object` | `undefined` | Options for grid sprite sheets (see Grid Options table) |
| `onAnimationEnd` | `() => void` | `undefined` | Callback function when animation ends (only if loop=false) |
| `onAnimationStart` | `() => void` | `undefined` | Callback function when animation starts |
| `onFrameChange` | `(frameIndex: number) => void` | `undefined` | Callback function for each frame change |
| `onSpecificFrame` | `{ frame: number \| number[], callback: (frameIndex: number) => void }` | `undefined` | Callback for specific frames |

### Grid Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `columns` | `number` | *Required* | Number of columns in the grid |
| `rows` | `number` | *Required* | Number of rows in the grid |
| `rowIndex` | `number` | `undefined` | Index of the row to animate (animate horizontally) |
| `columnIndex` | `number` | `undefined` | Index of the column to animate (animate vertically) |
| `gap` | `number` | `0` | Gap between frames in pixels |

## Development

```bash
bun install
bun run dev # to run the demo
bun run build # to build the library
```

