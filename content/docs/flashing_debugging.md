---
title: "Flashing & Debugging ⚡"
---

This page explains how to **build, upload, and debug** the ChoCo firmware using PlatformIO.

PlatformIO is the recommended workflow and provides an easy setup for RP2040 boards.

---

## Recommended setup

- **VS Code**
- **PlatformIO extension**
- Raspberry Pi Pico (or compatible RP2040 board)

---

## Build & upload (PlatformIO)

### VS Code (recommended)

1. Install the **PlatformIO** extension
2. Open the `ChoCo` project folder
3. Click:
   - ✔️ **Build**
   - ➡️ **Upload**
   - 🔌 **Monitor** (to view logs)

---

### CLI (optional)

```bash
pio run
pio run -t upload
pio device monitor
