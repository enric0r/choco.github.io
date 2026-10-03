---
title: "Configuration and development"
description: "Firmware settings, structure, and tests"
weight: 50
---

## Configuration

Hardware pins, thresholds, timings, default modes, and feature settings belong in [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h). Useful settings include:

| Setting | Default | Purpose |
| --- | --- | --- |
| `JOYSTICK_TRIGGER_ENGAGE_PCT` / `JOYSTICK_TRIGGER_RELEASE_PCT` | 72 / 55 | Direction hysteresis; engage must exceed release |
| `JOYSTICK_SWAP_AXES`, `JOYSTICK_INVERT_X`, `JOYSTICK_INVERT_Y` | 1, 1, 1 | Orientation for the current PCB revision |
| `INPUT_DEBOUNCE_MS` | 10 | Stable interval for press and release edges |
| `UI_REFRESH_MS` | 100 | OLED refresh interval |
| `SCREENSAVER_TIMEOUT_MS` | 30000 | Idle time before screensaver |
| `STRUM_NOTE_DELAY_MS` | 14 | Spacing between strummed notes |
| `CHOCO_LOG_LEVEL` | `NONE` | Release logging; raise temporarily for diagnostics |

The joystick threshold values have compile-time guards: each must be 1–99, and release must be lower than engage. USB manufacturer and product strings are configurable, but custom descriptors are disabled by default. `platformio.ini` supplies the TinyUSB and network-disable flags needed by this firmware.

## Project structure

| Path | Role |
| --- | --- |
| `src/main.cpp` | Setup and responsive event loop |
| `lib/Controls/` | Keypad, joystick, debouncing, control snapshots |
| `lib/ChordEngine/` | Scales, chord generation, inversions, voicing, history |
| `lib/Display/` | OLED status, messages, splash, screensaver |
| `lib/MIDI/` | USB MIDI transport |
| `lib/Config/` | Shared compile-time settings |
| `test/logic/` | Native C++ host tests |
| `hardware/` | KiCad design and board files |

Each `lib/` directory is a PlatformIO library. If a cross-library include is added, update the consuming `library.json` dependency without making a cycle. Keep the hot loop free of heap allocation and long delays; strum scheduling and OLED refresh are designed to preserve input responsiveness.

## Tests

The repository's CI builds the firmware and runs six host test programs. On Linux, macOS, or WSL with native `g++`:

```bash
bash test/run_host_tests.sh
pio run
```

The host suite covers chord and joystick logic, debouncing, display direction, cancellable strum, and the main loop with simulated GPIO, time, and MIDI. It does not emulate USB or OLED hardware. On Windows with Ubuntu in WSL, run `wsl -d Ubuntu -- bash test/run_host_tests.sh`. There is no `pio test` target.

The [contribution guide](https://github.com/enric0r/ChoCo/blob/main/CONTRIBUTING.md) describes the expected PR details, and [DEBUGGING.md](https://github.com/enric0r/ChoCo/blob/main/DEBUGGING.md) contains the physical acceptance checks. ChoCo is distributed under the [PolyForm Noncommercial License 1.0.0](https://github.com/enric0r/ChoCo/blob/main/LICENSE).
