---
title: "About"
description: "The maker and the project behind ChoCo"
---

## Hi, I’m enric0r.

I’m a maker and electronics tinkerer interested in DIY music hardware and sound synthesis. ChoCo is my compact USB MIDI controller for playing and changing chords directly from a physical interface. It was inspired in part by hands-on chord instruments such as [HiChord by Pocket Audio](https://hichord.shop/).

## The project

ChoCo combines a Raspberry Pi Pico, a 3×4 keypad, an analog joystick and a 128×64 OLED. The keypad selects a scale degree, the joystick changes the chord, and the display keeps the current state visible. The firmware sends MIDI notes to a connected computer or instrument.

The [ChoCo repository](https://github.com/enric0r/ChoCo) contains the firmware, KiCad design, tests and project notes. The [documentation]({{< relref "docs" >}}) explains the controls, pin map, firmware setup and troubleshooting. If you build a board, check its revision against the KiCad files and firmware pin settings.

## Links

- [ChoCo source and hardware files](https://github.com/enric0r/ChoCo)
- [My other projects on GitHub](https://github.com/enric0r)
- [SoundCloud](https://soundcloud.com/enric0r)

The firmware and hardware files are distributed under the [PolyForm Noncommercial License 1.0.0](https://github.com/enric0r/ChoCo/blob/main/LICENSE).
