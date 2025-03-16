# React Pixel Motion

A lightweight React component for creating smooth, pixelated sprite animations. Perfect for games, retro-style interfaces, and pixel art animations. Totallyinspired by [react-sprite-animation](https://github.com/jcblw/react-sprite-animator).

## Features

- 🎮 Simple API for sprite sheet animations
- 🖼️ Support for both horizontal and vertical sprite sheets
- 🔄 Control over animation speed, scale, and direction
- 📱 Responsive and lightweight

<div align="center">
  <img src="./demo.gif" alt="Demo" width="50" />
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
import PixelMotion from "@ga1az/react-pixel-motion";
import characterSprite from './assets/character.svg'; // or any other image format

function App() {
  return (
    <PixelMotion
      sprite={characterSprite}
      width={24}
      height={31}
      frameCount={3}
      fps={10}
      scale={5}
    />
  );
}
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sprite` | `string` | *Required* | URL or import of the sprite sheet image |
| `width` | `number` | *Required* | Width of each frame in pixels |
| `height` | `number` | *Required* | Height of each frame in pixels |
| `frameCount` | `number` | `1` | Total number of frames in the sprite sheet |
| `fps` | `number` | `60` | Frames per second for the animation |
| `direction` | `'horizontal'` \| `'vertical'` | `'horizontal'` | Direction of the sprite sheet |
| `shouldAnimate` | `boolean` | `false` | Whether the animation should play |
| `scale` | `number` | `1` | Scale factor for the sprite |
| `startFrame` | `number` | `0` | Initial frame to start the animation |
| `loop` | `boolean` | `false` | Whether the animation should loop |

## Development

```bash
bun install
bun run dev # to run the demo
bun run build # to build the library
```

