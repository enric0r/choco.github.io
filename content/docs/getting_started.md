---
title: "Getting Started 🚀"
---

Getting started with **ChoCo** is simple.  
ChoCo is an open-hardware USB-MIDI controller, designed to be built using standard PCB manufacturing and easy-to-source components.

This guide walks you through the basic steps needed to go from files to a working device.

---

## 1. Download the PCB files

Start by downloading the **Gerber files**, which are ready for PCB manufacturing.

<div class="flex gap-4 flex-wrap mt-4 mb-6">

{{< button href="https://github.com/enric0r/ChoCo/releases" target="_blank" >}}
⬇️ Download Gerber files
{{< /button >}}
</div>

---

## 2. Order the PCB

Upload the downloaded `.gerber` files to your PCB manufacturer of choice and use the default settings unless you know what you’re doing.

{{< alert icon="circle-info" cardColor="#6D9DC5" iconColor="#FFFFFF" textColor="#FFFFFF">}}
Choose the **PCB manufacturer** of your liking.  
{{< /alert >}}

Recommended options:
- **Base Material:** FR-4
- **Layers:** 2
- **Board thickness:** 1.6 mm  
- **Copper weight:** 1 oz  
- **Surface finish:** HASL
- **Silkscreen** & **PCB Color:** Whatever you like the most  

---

## 3. Source the components

Once the PCB is ordered, you’ll need to source the electronic components.

{{< alert icon="circle-info" cardColor="#6D9DC5" iconColor="#FFFFFF" textColor="#FFFFFF">}}
**Note**: All the links below ARE NOT affiliated/referral, are just to show an example of the components needed.
{{< /alert >}}

At a minimum, ChoCo requires:
- [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/)
- [10x Key Switches 5 pins](https://amzn.eu/d/gIBJ4OQ)
- [PS4 Joystick](https://amzn.eu/d/7egcikS)
- [OLED display](https://amzn.eu/d/bgN2Kaj)
- [Switching Diodes](https://amzn.eu/d/1peefNB) (1N4148 will work)
- Micro-USB Cable

👉 A **BOM (Bill of Materials)** is available in the repository with exact part numbers and links.

---

## 4. Assemble the board

Solder the components onto the PCB, starting with:
1. Diodes -- Mind the orientation of the diodes
2. OLED Screen
3. Raspberry Pi Pico -- Make sure to solder header pins to the Raspberry before soldering it to the ChoCo PCB
4. Switches -- Take your time during this step to ensure each switch is correctly in place, especially if you are using 3 pin switches as you might end up having crooked switches.
5. Joystick

Take your time and double-check component orientation before soldering.

---

## 5. Flash the firmware

Once assembled, connect the Raspberry Pi Pico to your computer via USB and flash the ChoCo firmware.



### Installation 
1. [Download `ChoCo-firmware.uf2`](https://github.com/enric0r/ChoCo/releases/latest)
2. Connect your Raspberry Pi Pico while holding BOOTSEL button
3. A new mass-storage device should appear -> Copy the .uf2 file to the RPI-RP2 drive
4. The device will automatically reboot with the new firmware

Detailed flashing instructions are available in the **Documentation** section.

---

## 6. Connect and play

After flashing:
- Plug ChoCo into your computer
- Open your DAW or MIDI monitor
- Select **ChoCo** as a MIDI input
- Start triggering chords 🎵

ChoCo will automatically stay in key and scale, letting you focus on harmony and musical ideas.

---

## What’s next?

- Learn how chord shaping works
- Customize scales and keys
- Modify or extend the firmware
- Design your own enclosure

Head over to the **Documentation** section to dive deeper.

Happy building! 🚀🎶
