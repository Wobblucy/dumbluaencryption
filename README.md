# Two-Stage Offline Licensing Demo

[Example Final Result](https://github.com/Wobblucy/dumbluaencryption/blob/main/demo-payload/examplefinaladdon.png)

A portable demonstration of client-side addon licensing for World of Warcraft.

# Two-Stage Offline Licensing Demo  
### Educational Proof-of-Concept for World of Warcraft Addons

## Overview
This repository contains a **purely educational demonstration** exploring what is *technically possible* using **client-side Lua only** in World of Warcraft addons.

The goal of this project is **research and learning**, not security enforcement.

It illustrates how a character-bound “license” *could* be derived, obfuscated, and validated entirely on the client — **without servers, accounts, or online verification**. Everything runs locally from a zip file and is intentionally easy to inspect, modify, and reverse.

> ⚠️ This is **not** a production licensing system.  
> Client-side protections are inherently bypassable and should never be treated as secure DRM.

---

## What This Demonstrates
- How WoW exposes character-specific identifiers (GUIDs)
- How temporal data can be incorporated into validation logic
- Multi-stage key derivation techniques
- Common Lua obfuscation patterns used in addons
- Why trust-based, client-only licensing has hard limits

This project exists to help developers **understand the tradeoffs**, not to promote enforcement or restriction.

---

## Quick Start (For Study & Exploration)

### 1. Generate a Sample License Hash
1. Copy the `LicenseProbe` folder into:
Interface/AddOns/

2. Log into WoW on any character
3. Type:
/lp

4. Click the generated hash to select it, then press **Ctrl+C**

---

### 2. Compile the Demo Addon
1. Open `website/index.html` in any modern web browser  
*(works fully offline)*
2. Paste the copied license hash
3. Click **Compile Addon**
4. Download the three generated files

---

### 3. Install the Demo
1. Create:
Interface/AddOns/LicenseDemo/

2. Place all three downloaded files inside
3. Reload the UI:
/reload

4. Type:
/ldemo


The demo intentionally expires **15 minutes after hash generation** and displays a live countdown to illustrate time-based validation logic.

---

## Techniques Shown (Academic Context)
The following are included **strictly for educational analysis**:

- Character-bound identifiers (GUID binding)
- Short-lived temporal binding
- Multi-stage key derivation
- Control-flow flattening
- Symbol mangling
- Dead-code injection
- Shuffled payload chunks
- Basic anti-tamper checks
- Self-destructing plaintext logic

These techniques **raise the cost of casual inspection**, but do not provide real security.

---

## Important Notes
- This project **does not prevent piracy**
- Client-side licensing can always be bypassed
- Obfuscation ≠ security
- The real value is understanding implementation patterns and limitations
## License

MIT
