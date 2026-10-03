---
title: "Firmware and troubleshooting"
description: "Build, flash, and diagnose ChoCo"
weight: 40
---

## Build with PlatformIO

Open the [ChoCo firmware repository](https://github.com/enric0r/ChoCo) in VS Code with PlatformIO, or use the CLI in its root directory:

```powershell
pio run
```

The project has one environment, `pico`, for the Arduino RP2040 core. The build writes `.pio/build/pico/firmware.uf2`. The TinyUSB and network-disable flags in `platformio.ini` are part of the USB MIDI setup.

## Flash the board

### BOOTSEL drive

Hold **BOOTSEL** while connecting the RP2040 board. Copy `firmware.uf2` to the **RPI-RP2** drive. The board reboots after the copy. A release UF2, when available, can be obtained from [ChoCo Releases](https://github.com/enric0r/ChoCo/releases).

### PlatformIO upload

```powershell
pio run -t upload
```

`platformio.ini` sets `upload_port = COM5` for one development machine. If your board uses another port, override that setting locally. Do not assume every board appears as COM5.

## Serial diagnostics

Normal release builds set `CHOCO_LOG_LEVEL` to `CHOCO_LOG_LEVEL_NONE`, so the serial monitor is intentionally quiet. For diagnostics, temporarily set it to `CHOCO_LOG_LEVEL_INFO` or `CHOCO_LOG_LEVEL_DEBUG` in `lib/Config/Config.h`, rebuild and flash, then run:

```powershell
pio device monitor
```

Restore `NONE` for normal use. **C + B** prints chord history only at INFO level or higher; otherwise the OLED shows `Serial log OFF`. The firmware's [DEBUGGING.md](https://github.com/enric0r/ChoCo/blob/main/DEBUGGING.md) includes a physical acceptance checklist.

## Quick checks

| Symptom | Check |
| --- | --- |
| USB MIDI missing | USB data cable, BOOTSEL flashing result, MIDI host input selection, reconnection after flashing |
| MIDI arrives but no sound | Instrument or software synth assigned to the MIDI input |
| OLED missing | Power, address `0x3C`, GP14/GP15 wiring, I²C1 selection |
| Wrong joystick direction | Axis swap and inversion settings in `Config.h`; test on the mounted board |
| Keypad misses or repeats | Matrix wiring and the 10 ms debounce setting |
| Stuck or late notes | Test latch and strum modes, then follow the physical checks in `DEBUGGING.md` |

The host tests simulate control and MIDI events. USB delivery, analog noise, matrix ghosting, OLED appearance, and end-to-end timing require a real board and MIDI host.
