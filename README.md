# Two-Stage Offline Licensing Demo

[Example Final Result](https://github.com/Wobblucy/dumbluaencryption/blob/main/demo-payload/examplefinaladdon.png)

A portable demonstration of client-side addon licensing for World of Warcraft.

## Overview

This project shows how addon authors can implement character-bound licensing using only client-side code. No server required - everything runs locally from a zip file.

## Quick Start

### 1. Generate Your License Hash

1. Copy the `LicenseProbe` folder to `Interface/AddOns/`
2. Log into WoW on your character
3. Type `/lp`
4. Click the hash to select it, then Ctrl+C to copy

### 2. Compile Your Licensed Addon

1. Open `website/index.html` in any browser (works offline)
2. Paste your license hash
3. Click "Compile Addon"
4. Download the 3 generated files

### 3. Install

1. Create folder `Interface/AddOns/LicenseDemo/`
2. Put all 3 downloaded files inside
3. Type `/reload` in-game
4. Type `/ldemo` to see the license display

The addon expires 15 minutes after hash generation. The display shows a live countdown.

## Features

- Character-bound licensing via GUID
- 15-minute temporal binding with live countdown
- Multi-stage key derivation
- Control-flow flattening
- Symbol mangling
- Dead code injection
- Shuffled payload chunks
- Anti-tamper detection
- Self-destructing plaintext

## Requirements

- World of Warcraft (Retail 11.x or Classic 1.15.x)
- Any modern web browser

## License

MIT
