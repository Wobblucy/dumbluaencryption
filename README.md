# Two-Stage Offline Licensing Demo

[Example Final Result](https://github.com/Wobblucy/dumbluaencryption/blob/main/demo-payload/examplefinaladdon.png)

A portable demonstration of client-side addon licensing for World of Warcraft.

# Two-Stage Offline Licensing Demo  
### Educational Proof-of-Concept for World of Warcraft Addons

---

## What This Demonstrates
- How account specific identifiers could be used to generate character specific DRM, along with obfuscation techniques one could use inside the WoW environment.

  ### Obfuscation is explicitly against the TOS, DO NOT IMPLEMENT THIS IN YOUR ADDON
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

These techniques **raise the cost of inspection**, but would not stand up to someone dedicated to reversing the code. 

---

## Important Notes
- This project **is solely for educational purposes**
- Client-side licensing can always be bypassed
- Obfuscation ≠ security
## License

MIT
