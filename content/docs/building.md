---
title: "Building ChoCo 🛠️"
---

This page covers the **hardware build** of ChoCo, from PCB to a fully assembled controller.

ChoCo is designed to be easy to build using standard components and simple soldering tools.

---

## What you need

### Required tools
- Soldering iron (fine tip recommended)
- Solder (lead-free or leaded)
- Multimeter (optional, but useful)

### Main components
- **RP2040 board** (Raspberry Pi Pico or compatible)
- **3×4 keypad matrix** (7 keys used)
- **Analog joystick module**
- **OLED display** (SSD1306, 128×64, I2C)
- Passive components (resistors, capacitors)
- Headers / connectors as specified in the BOM

A full **Bill of Materials (BOM)** with exact part numbers is available in the repository.

---

## PCB manufacturing

1. Download the `.gerber` files from the Releases page
2. Upload them to your PCB manufacturer of choice
3. Use default settings unless you know what you’re changing

**Recommended PCB options**
- Thickness: **1.6 mm**
- Copper weight: **1 oz**
- Surface finish: HASL or ENIG
- Layers: 2

{{< alert icon="circle-info">}}
ChoCo was tested using JLCPCB, but any standard PCB manufacturer will work.
{{< /alert >}}

---

## Soldering order (recommended)

To make assembly easier, solder components in this order:

1. **Small SMD components** (resistors, capacitors)
2. **ICs and headers**
3. **OLED display connector**
4. **Joystick module**
5. **Key switches / keypad**
6. **Raspberry Pi Pico** (last)

Take extra care with:
- OLED orientation
- Joystick pin alignment
- Pico pin headers (keep them straight!)

---

## Wiring overview

### OLED (I2C1)
- SDA → **GP14**
- SCL → **GP15**
- Voltage → **3.3V only**

{{< alert icon="triangle-exclamation">}}
Ensure your OLED display is **3.3V compatible** or properly level-shifted.
{{< /alert >}}

---

### Joystick
- X axis → **A0**
- Y axis → **A1**
- Button → **GP7** (active-low by default)

---

### Keypad matrix

**Rows (outputs):**
- GP2
- GP1
- GP0

**Columns (inputs, pull-ups enabled):**
- GP3
- GP4
- GP5
- GP6

