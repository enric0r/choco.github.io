---
title: "Controls"
description: "Keypad, joystick, chord modes, and OLED"
weight: 20
---

## Keypad

```text
A  B  C  _
1  3  5  _
0  2  4  6
```

| Input | Action |
| --- | --- |
| `0`–`6` | Play the corresponding scale degree; the OLED labels them `D1`–`D7` |
| `A` | Raise the root note by one semitone |
| `B` | Cycle to the next scale |
| Hold `C`, press `0`–`6` | Cycle the stored inversion for that degree |
| Hold `C`, press and release `A` | Toggle chord latch |
| Hold `C`, press `B` | Send chord history to serial when INFO logging is enabled |

The available scales are Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, harmonic minor, and melodic minor. The initial root is C4 and the initial scale is Ionian.

## Joystick

Hold a degree key and move the joystick to replace its base triad with a variation. Returning to center restores the base chord. The active direction stays latched until the stick passes the release threshold, avoiding rapid toggling near the boundary.

| Gesture | Action |
| --- | --- |
| Hold `C`, move left / right | Shift octave down / up |
| Hold `C`, move down | Cycle joystick chord mode: `DEFAULT`, `EXTEND`, `CHROM` |
| Hold `C`, short press joystick button | Toggle bass mode |
| Hold `C` and `A`, short press joystick button | Toggle strum mode; the latch shortcut is cancelled |
| Hold `C`, long press joystick button | Toggle smart voicing |
| Short press joystick button without `C` | Stop the current chord and cancel pending strum notes; mode settings stay selected |
| Long press joystick button without `C` | Toggle single note mode |
| In `CHROM` mode, move left / right with no chord held | Lower / raise the root by one semitone |

A short press is shorter than 500 ms; a long press is handled after 1000 ms. These durations are configured in `lib/Config/Config.h`.

### Variation map

The choice for **Up** in `DEFAULT` and `EXTEND`, and several choices in `DEFAULT`, depend on the underlying triad. “Major-like” includes major and augmented triads; the other qualities take the alternate choice.

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

For each slash-separated pair, the first result applies to a major-like triad and the second to other triads. The map follows `getChordVariationForDirection()` in the firmware.

## Playback modes

- **Latch (`LAT`)** keeps the last played chord sounding after release.
- **Bass (`BAS`)** adds a root note one octave below the chord. Toggling it affects the active chord immediately.
- **Strum (`STR`)** staggers note starts; pending notes are cancelled when a chord is released or replaced.
- **Smart voicing (`VOI`)** seeks a compact transition between chords. Its setting applies to the next generated chord.
- **Single note (`NOTE`)** plays the degree note instead of a chord.

The OLED shows the selected key and scale, active degree or `EDIT`, the current chord name, mode badges, and `NEXT` harmonic suggestions. `NEXT` is a set of suggestions rather than a prediction. Temporary status messages appear in the footer. Display refresh is limited to about 100 ms, and a sounding chord keeps the screen awake.

### Input behavior

Each key and the joystick button use a 10 ms stable-edge debounce. A newly pressed degree replaces the sounding one. Releasing that degree stops playback unless latch is enabled; an older held degree does not automatically replay. Simultaneous degree presses select the lowest degree. Matrix ghosting with certain multi-key combinations can still occur on hardware without per-key diodes.
