---
title: "Get started"
description: "Connect ChoCo and play a first chord"
weight: 10
---

## What you need

- An assembled ChoCo board with an RP2040, keypad, joystick, and OLED
- A USB data cable
- A computer with a MIDI monitor, instrument, or DAW
- A ChoCo firmware UF2 file, or PlatformIO to build one

The [hardware page]({{< relref "docs/building" >}}) lists the firmware pin map and links to the KiCad files. Check those against your board revision before applying power.

## Install the firmware

If a release provides `ChoCo-firmware.uf2`, download it from [ChoCo Releases](https://github.com/enric0r/ChoCo/releases). Otherwise, [build the UF2 with PlatformIO]({{< relref "docs/flashing_debugging" >}}).

1. Disconnect the board.
2. Hold **BOOTSEL** while connecting it to the computer.
3. Copy the UF2 file to the **RPI-RP2** drive.
4. Wait for the board to restart, then connect it to your MIDI host.

## Play your first chord

1. Select ChoCo's USB MIDI input in your MIDI monitor or DAW. The device name may use the USB core's default descriptor unless custom descriptors were enabled in the firmware.
2. Press and hold keypad **0**. It selects the first scale degree. Keys **0–6** correspond to degrees **1–7** on the OLED.
3. Move the joystick while holding a degree to hear a chord variation. Bring it back to center for the base triad.
4. Press **A** to raise the root by a semitone; press **B** to cycle scales.

The default scale is Ionian (major) and the base MIDI note is C4. The complete shortcuts and modes are in [Controls]({{< relref "docs/controls" >}}).

## If something does not work

- **No USB MIDI device:** use a data cable, reconnect after flashing, and check that the MIDI host has selected the correct input.
- **No sound:** ChoCo sends MIDI notes; it needs a MIDI instrument or software synth to make sound.
- **No OLED image:** check the display's power, I²C address, SDA/SCL pins, and selected I²C port.
- **Unexpected input:** verify the keypad and joystick wiring against the [pin map]({{< relref "docs/building" >}}).

See [Firmware and troubleshooting]({{< relref "docs/flashing_debugging" >}}) for diagnostic logging and physical checks.
