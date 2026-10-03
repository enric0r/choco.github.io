---
title: "Hardware"
description: "Board files and firmware pin map"
weight: 30
---

The [ChoCo repository](https://github.com/enric0r/ChoCo/tree/main/hardware) contains the KiCad schematic (`ChoCo.kicad_sch`), PCB (`ChoCo.kicad_pcb`), project file, and a `ChoCo_REV-02.zip` board archive. Check the archive contents and board revision before ordering a PCB. The repository does not currently contain a verified component BOM; use the schematic and PCB as the source for footprints and values.

## Firmware pin map

The defaults below come from [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h). Update that file if your wiring differs.

| Function | RP2040 pin | Notes |
| --- | --- | --- |
| Keypad rows | GP2, GP1, GP0 | Three rows |
| Keypad columns | GP3, GP4, GP5, GP6 | Four columns, input pull-ups |
| Joystick X / Y | A0 / A1 | Analog inputs; software swaps and inverts axes for the current PCB revision |
| Joystick button | GP13 | Active low with input pull-up by default |
| OLED SDA / SCL | GP14 / GP15 | I²C1 (`Wire1`), address `0x3C` |

The OLED expects an SSD1306-compatible 128×64 I²C display. Verify voltage compatibility and pin order for the specific module you use. Firmware settings do not replace checking the schematic and physical wiring.

## Keypad layout

```text
A  B  C  _
1  3  5  _
0  2  4  6
```

Keys **0–6** select scale degrees. **A** and **B** change the root and scale; **C** is a modifier. The three `_` positions are unused in the firmware layout.

For operation after assembly, continue with [Get started]({{< relref "docs/getting_started" >}}) and [Controls]({{< relref "docs/controls" >}}).
