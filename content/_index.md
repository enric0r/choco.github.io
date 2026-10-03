---
title: "ChoCo"
description: "A compact RP2040 USB MIDI chord controller"
---

# Play harmony with your hands

ChoCo is a compact USB MIDI chord controller built around a Raspberry Pi Pico. Seven degree keys play chords in the selected scale, a joystick reshapes them, and a 128×64 OLED shows what is happening. It connects to a MIDI host over USB.

{{< button href="docs/getting_started/" target="_self" >}}Get started{{< /button >}}
{{< button href="docs/controls/" target="_self" >}}Explore the controls{{< /button >}}

## From first note to deeper control

- **Stay in a scale.** Choose among nine scales and modes, then play degrees 1–7 from the keypad.
- **Shape a chord.** Move the joystick for sevenths, suspensions, extensions, and other variations.
- **Choose your feel.** Enable bass, strum, latch, single note, or smart voicing as needed.
- **See the state.** The OLED shows the active chord, key, modes, and harmonic suggestions.

The [documentation]({{< relref "docs" >}}) covers the controls, hardware connections, firmware installation, configuration, testing, and troubleshooting. The [firmware and KiCad sources](https://github.com/enric0r/ChoCo) are maintained in the ChoCo repository.
