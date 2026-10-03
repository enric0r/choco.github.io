---
title: "Documentation"
description: "Everything you need to play, build, and develop ChoCo"
---

## Get started

ChoCo is an RP2040 USB MIDI chord controller. It needs a USB data cable and a MIDI monitor, software instrument, or DAW to make sound. If you already have an assembled board, these steps get you to the first chord:

1. Get a `ChoCo-firmware.uf2` from [ChoCo Releases](https://github.com/enric0r/ChoCo/releases), if one is available, or build it with PlatformIO as described below.
2. Disconnect the board. Hold **BOOTSEL** while connecting it to your computer.
3. Copy the UF2 to the **RPI-RP2** drive. The board restarts after the copy.
4. Select ChoCo’s USB MIDI input in your MIDI host and load an instrument.
5. Hold keypad **0** to play the first scale degree. Move the joystick to change the chord; release it to return to the base triad.

The initial root is C4 and the initial scale is Ionian (major). The USB device name may use the RP2040 core’s default descriptor unless custom descriptors were enabled in the firmware.

## Controls

The three-row keypad is arranged like this:

```text
A  B  C  _
1  3  5  _
0  2  4  6
```

| Input | Action |
| --- | --- |
| `0`–`6` | Play scale degrees 1–7; the OLED shows them as `D1`–`D7` |
| `A` | Raise the root note by one semitone |
| `B` | Cycle to the next scale |
| Hold `C`, press `0`–`6` | Cycle the stored inversion for that degree |
| Hold `C`, press and release `A` | Toggle chord latch |
| Hold `C`, press `B` | Print chord history when INFO serial logging is enabled |

The scale choices are Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, harmonic minor, and melodic minor.

### Joystick shortcuts

| Gesture | Action |
| --- | --- |
| Hold a degree, move the stick | Apply a chord variation; return to center for the base triad |
| Hold `C`, move left / right | Shift octave down / up |
| Hold `C`, move down | Cycle joystick mode: `DEFAULT`, `EXTEND`, `CHROM` |
| Hold `C`, short press stick | Toggle bass |
| Hold `C` and `A`, short press stick | Toggle strum; this cancels the latch shortcut |
| Hold `C`, long press stick | Toggle smart voicing |
| Short press stick without `C` | Stop the current chord and cancel pending strum notes |
| Long press stick without `C` | Toggle single-note mode |
| In `CHROM`, move left / right with no chord held | Lower / raise the root by one semitone |

A short press is under 500 ms; a long press is handled after 1000 ms. The stick uses separate engage and release thresholds so a direction remains selected as it moves partway toward center.

## Shape a chord

The joystick has three variation maps. With a degree held, each direction chooses the chord in the table. For a slash-separated pair, the first choice applies to major or augmented base triads; the second applies to other triads.

| Direction | `DEFAULT` | `EXTEND` | `CHROM` |
| --- | --- | --- | --- |
| Up | Minor / Major | Minor / Major | Minor-major 7 |
| Down | Sus4 | 7♯9 | Major 13 |
| Left | Diminished / Minor | Sus4 + 7 | Half-diminished 7 |
| Right | Major 7 / Minor 7 | Add11 | 6/9 |
| Up-left | Augmented | Half-diminished 7 | Major 7♯11 |
| Up-right | Dominant 7 | Dominant 9 | Dominant 13 |
| Down-left | Major 6 / Sus2 | Add9 | Dominant 7♭9 |
| Down-right | Major 9 / Minor 9 | Minor 11 | Dominant 7 altered |

These labels follow `getChordVariationForDirection()` in the firmware. Returning to center restores the diatonic triad for the selected degree.

## Modes and display

- **Latch (`LAT`)** keeps the last chord sounding after a degree is released.
- **Bass (`BAS`)** adds a root note one octave below the chord and updates the sounding chord immediately when toggled.
- **Strum (`STR`)** staggers note starts. Pending notes are cancelled when a chord is released or replaced.
- **Smart voicing (`VOI`)** seeks a compact transition between chords. Its setting applies to the next generated chord.
- **Single note (`NOTE`)** plays only the selected degree note.

The OLED shows the selected key and scale, the active degree or `EDIT`, the chord name, mode badges, and `NEXT` harmonic suggestions. `NEXT` is a set of suggestions, not a prediction. Status messages briefly replace the footer. Display refresh is limited to about 100 ms, and a sounding chord keeps the screen awake.

Each key and the joystick button use 10 ms stable-edge debouncing. A newly pressed degree replaces the sounding one. Releasing it stops playback unless latch is enabled; an older held degree does not replay automatically. Exactly simultaneous degree presses select the lowest degree. Some multi-key combinations can produce matrix ghosting on hardware without per-key diodes.

## Hardware

The [ChoCo hardware directory](https://github.com/enric0r/ChoCo/tree/main/hardware) contains the KiCad schematic, PCB, project file, and a `ChoCo_REV-02.zip` board archive. Check the archive contents and your board revision before ordering or assembling. The repository does not currently include a verified component BOM; use the schematic and PCB for footprints and values.

The firmware defaults in [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h) are:

| Function | RP2040 pin | Detail |
| --- | --- | --- |
| Keypad rows | GP2, GP1, GP0 | Three rows |
| Keypad columns | GP3, GP4, GP5, GP6 | Four columns with input pull-ups |
| Joystick X / Y | A0 / A1 | Analog; firmware swaps and inverts axes for the current PCB revision |
| Joystick button | GP13 | Active low with input pull-up by default |
| OLED SDA / SCL | GP14 / GP15 | I²C1 (`Wire1`), address `0x3C` |

The display is an SSD1306-compatible 128×64 I²C OLED. Verify the voltage, pin order, and wiring of the actual module before powering it.

## Firmware

The [ChoCo firmware repository](https://github.com/enric0r/ChoCo) uses PlatformIO with one `pico` environment and the Arduino RP2040 core. In the firmware repository root:

```powershell
pio run
pio run -t upload
pio device monitor
```

The build produces `.pio/build/pico/firmware.uf2`. You can copy that file to the BOOTSEL **RPI-RP2** drive instead of using `pio run -t upload`. `platformio.ini` has a machine-specific `upload_port = COM5`; override it locally if your board uses another port. The TinyUSB and network-disable build flags are required by this firmware’s USB MIDI setup.

Release builds set `CHOCO_LOG_LEVEL` to `CHOCO_LOG_LEVEL_NONE`, so the serial monitor is intentionally quiet. For diagnostics, temporarily choose INFO or DEBUG in `lib/Config/Config.h`, rebuild and flash, then run `pio device monitor`. Restore `NONE` for normal use. **C + B** prints chord history only when INFO logging or higher is enabled; otherwise the OLED says `Serial log OFF`.

## Configuration

Pin mappings, thresholds, timings, default modes, and feature switches belong in [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h).

| Setting | Default | Purpose |
| --- | --- | --- |
| `JOYSTICK_TRIGGER_ENGAGE_PCT` / `JOYSTICK_TRIGGER_RELEASE_PCT` | 72 / 55 | Direction hysteresis; engage must exceed release |
| `JOYSTICK_SWAP_AXES`, `JOYSTICK_INVERT_X`, `JOYSTICK_INVERT_Y` | 1, 1, 1 | Current PCB orientation |
| `INPUT_DEBOUNCE_MS` | 10 | Stable press and release edges |
| `UI_REFRESH_MS` | 100 | OLED refresh interval |
| `SCREENSAVER_TIMEOUT_MS` | 30000 | Idle time before screensaver |
| `STRUM_NOTE_DELAY_MS` | 14 | Time between strummed note starts |
| `CHOCO_LOG_LEVEL` | `NONE` | Serial diagnostics level |

Joystick thresholds have compile-time guards: both must be 1–99, and release must be lower than engage. USB manufacturer and product strings can be configured, but custom USB descriptors are disabled by default.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| USB MIDI device missing | USB data cable, flashing result, MIDI host input selection, reconnection after flashing |
| MIDI events but no sound | Assign an instrument or software synth to the MIDI input |
| OLED stays blank | Power, I²C address `0x3C`, GP14/GP15, I²C1 selection |
| Joystick points the wrong way | Axis swap and inversion settings; confirm on the mounted board |
| Keypad misses or repeats | Matrix wiring and 10 ms debounce setting |
| Stuck or late notes | Check latch and strum modes, then follow the physical tests in `DEBUGGING.md` |

The host tests do not emulate USB delivery, analog noise, matrix ghosting, OLED appearance, or end-to-end latency. Use a real board and MIDI host for those checks. The firmware repository’s [DEBUGGING.md](https://github.com/enric0r/ChoCo/blob/main/DEBUGGING.md) has a detailed acceptance checklist.

## For contributors

`src/main.cpp` owns setup and the responsive event loop. The independent PlatformIO libraries under `lib/` handle controls, chord logic, display, MIDI, and shared configuration. Cross-library includes must be declared in the consuming `library.json` without making dependency cycles. Keep long delays and heap allocation out of the hot loop.

CI builds the firmware and runs six native C++ host test programs. On Linux, macOS, or WSL with native `g++`:

```bash
bash test/run_host_tests.sh
pio run
```

There is no `pio test` target. The host suite covers chord and joystick logic, debouncing, display direction, cancellable strum, and the main loop with simulated GPIO, time, and MIDI. See [CONTRIBUTING.md](https://github.com/enric0r/ChoCo/blob/main/CONTRIBUTING.md) for PR expectations. ChoCo is distributed under the [PolyForm Noncommercial License 1.0.0](https://github.com/enric0r/ChoCo/blob/main/LICENSE).
