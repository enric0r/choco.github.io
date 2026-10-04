---
title: "Documentazione"
description: "Guida completa all’uso, all’hardware e al firmware di ChoCo"
---

## Per iniziare {#get-started}

ChoCo è un controller USB MIDI per accordi basato su RP2040. Per sentire il suono servono un cavo USB dati e un monitor MIDI, uno strumento software o una DAW. Se hai già una scheda assemblata:

1. Scarica `ChoCo-firmware.uf2` dalle [release di ChoCo](https://github.com/enric0r/ChoCo/releases), se disponibile, oppure compila il firmware con PlatformIO come spiegato più avanti.
2. Scollega la scheda. Tieni premuto **BOOTSEL** mentre la colleghi al computer.
3. Copia il file UF2 nell’unità **RPI-RP2**. Al termine la scheda si riavvia.
4. Seleziona l’ingresso USB MIDI di ChoCo nel programma che usi e carica uno strumento.
5. Tieni premuto il tasto **0** per suonare il primo grado. Muovi il joystick per cambiare accordo; riportalo al centro per tornare alla triade di base.

All’avvio la tonica è C4 e la scala è Ionian (maggiore). Il nome del dispositivo USB può essere quello predefinito del core RP2040, a meno che nel firmware non siano stati abilitati descrittori personalizzati.

## Comandi {#controls}

Qui sotto trovi le tre righe di tasti e il joystick nella loro posizione fisica. Le sigle sono quelle usate dal firmware.

{{< controller-map >}}

Le scale disponibili sono Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian, harmonic minor e melodic minor.

### Scorciatoie del joystick

| Gesto | Azione |
| --- | --- |
| Tieni premuto un grado e muovi il joystick | Applica una variante dell’accordo; torna al centro per la triade di base |
| Tieni premuto `C` e muovi a sinistra / destra | Abbassa / alza l’ottava |
| Tieni premuto `C` e muovi in basso | Cambia mappa: `DEFAULT`, `EXTEND`, `CHROM` |
| Tieni premuto `C` e premi brevemente il joystick | Attiva o disattiva il basso |
| Tieni premuti `C` e `A` e premi brevemente il joystick | Attiva o disattiva strum; annulla la scorciatoia per latch |
| Tieni premuto `C` e premi a lungo il joystick | Attiva o disattiva smart voicing |
| Premi brevemente il joystick senza `C` | Ferma l’accordo corrente e annulla le note strum in attesa |
| Premi a lungo il joystick senza `C` | Attiva o disattiva la modalità nota singola |
| In `CHROM`, muovi a sinistra / destra senza tenere un accordo | Abbassa / alza la tonica di un semitono |

Una pressione breve dura meno di 500 ms; quella lunga viene riconosciuta dopo 1000 ms. Il joystick usa soglie diverse per l’attivazione e il rilascio, così la direzione resta selezionata mentre torna parzialmente verso il centro.

## Modificare un accordo {#shape-a-chord}

Il joystick ha tre mappe di variazioni. Tieni premuto un grado e muovilo nella direzione desiderata. Nelle celle con due risultati separati da `/`, il primo vale per le triadi maggiori o aumentate, il secondo per le altre.

| Direzione | `DEFAULT` | `EXTEND` | `CHROM` |
| --- | --- | --- | --- |
| Su | Minore / Maggiore | Minore / Maggiore | Minore con settima maggiore |
| Giù | Sus4 | 7♯9 | Maggiore 13 |
| Sinistra | Diminuito / Minore | Sus4 + 7 | Semidiminuito 7 |
| Destra | Maggiore 7 / Minore 7 | Add11 | 6/9 |
| Alto-sinistra | Aumentato | Semidiminuito 7 | Maggiore 7♯11 |
| Alto-destra | Dominante 7 | Dominante 9 | Dominante 13 |
| Basso-sinistra | Maggiore 6 / Sus2 | Add9 | Dominante 7♭9 |
| Basso-destra | Maggiore 9 / Minore 9 | Minore 11 | Dominante 7 alterato |

I nomi seguono `getChordVariationForDirection()` nel firmware. Quando il joystick torna al centro, viene ripristinata la triade diatonica del grado selezionato.

## Modalità e display {#modes-and-display}

- **Latch (`LAT`)** mantiene l’ultimo accordo anche dopo il rilascio del tasto del grado.
- **Basso (`BAS`)** aggiunge una tonica un’ottava sotto l’accordo e aggiorna subito le note in esecuzione quando viene attivato o disattivato.
- **Strum (`STR`)** sfalsa l’attacco delle note. Le note ancora in attesa vengono annullate quando l’accordo viene rilasciato o sostituito.
- **Smart voicing (`VOI`)** cerca un passaggio compatto tra gli accordi. La modifica si applica al prossimo accordo generato.
- **Nota singola (`NOTE`)** suona solo la nota del grado selezionato.

L’OLED mostra tonica e scala selezionate, grado attivo o `EDIT`, nome dell’accordo, sigle delle modalità e suggerimenti armonici `NEXT`. I suggerimenti non sono una previsione. I messaggi di stato sostituiscono temporaneamente la riga in basso. Il display si aggiorna circa ogni 100 ms e resta acceso mentre un accordo suona.

### Aspetto dello schermo {#screen-layout}

Queste sono ricostruzioni illustrative del display monocromatico 128×64 usato dal firmware, non fotografie di una scheda in funzione. Nomi degli accordi, modalità e gradi suggeriti cambiano in base ai comandi.

{{< screen-gallery >}}

In alto compaiono tonica e scala, poi `D1`–`D7` per il grado in esecuzione oppure `EDIT` quando tieni premuto `C`. Al centro c’è il nome dell’accordo; sotto sono visibili le modalità attive. Un messaggio temporaneo sostituisce solo la riga `NEXT`.

I tasti e il pulsante del joystick usano un debounce di 10 ms. Un nuovo grado premuto sostituisce quello corrente. Al rilascio la riproduzione si ferma, salvo quando latch è attivo; un altro grado ancora premuto non riparte automaticamente. Se due gradi vengono premuti esattamente insieme, prevale quello più basso. Su una matrice senza diodi per ogni tasto, alcune combinazioni possono produrre ghosting.

## Hardware {#hardware}

La [cartella hardware di ChoCo](https://github.com/enric0r/ChoCo/tree/main/hardware) contiene schema KiCad, PCB, file di progetto e l’archivio della scheda `ChoCo_REV-02.zip`. Prima di ordinare o assemblare, verifica i file dell’archivio e la revisione della scheda. La distinta qui sotto riporta tipologie e quantità presenti nel progetto. I modelli effettivamente acquistati e i fornitori restano da confermare con il costruttore.

Queste sono le impostazioni predefinite del firmware in [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h):

| Funzione | Pin RP2040 | Dettaglio |
| --- | --- | --- |
| Righe della tastiera | GP2, GP1, GP0 | Tre righe |
| Colonne della tastiera | GP3, GP4, GP5, GP6 | Quattro colonne con pull-up sugli ingressi |
| Joystick X / Y | A0 / A1 | Ingressi analogici; il firmware scambia e inverte gli assi per la revisione attuale del PCB |
| Pulsante del joystick | GP13 | Attivo basso, con pull-up sull’ingresso per impostazione predefinita |
| OLED SDA / SCL | GP14 / GP15 | I²C1 (`Wire1`), indirizzo `0x3C` |

Il display è un OLED I²C 128×64 compatibile con SSD1306. Prima di alimentare il modulo, verifica tensione, ordine dei pin e collegamenti effettivi.

### Distinta componenti del prototipo {#bom}

Le quantità si riferiscono a **un controller**. I componenti elettronici sono
ricavati dallo schema e dal PCB KiCad; keycap e case sono visibili nelle foto
del prototipo. L’elenco documenta il montaggio senza inventare modelli o link
d’acquisto.

| Quantità | Componente | Dettaglio |
| --- | --- | --- |
| 1 | PCB ChoCo | Il prototipo riporta REV-02 |
| 1 | Raspberry Pi Pico | Modulo RP2040, `A1` |
| 1 | OLED I²C 128×64 | `J1`; firmware per SSD1306 a `0x3C`; modello esatto da confermare |
| 1 | Joystick analogico con pulsante | Impronta tipo PS4; modello esatto da confermare |
| 10 | Switch meccanici | Impronte MX da 1u, `S1–S10`; marca e variante da confermare |
| 10 | Diodi della matrice | Impronte assiali DO-35, `D1–D10`; il simbolo cita 1N4148, modello montato da confermare |
| 10 | Keycap | Nelle foto: 3 scuri, 3 marroni e 4 chiari |
| 1 insieme | Case / base | Visibile nelle foto; materiale e dettagli di fabbricazione da confermare |
| 1 | Cavo USB dati | Con connettore adatto al Pico installato |

Il PCB prevede anche quattro impronte per fori di fissaggio `2.2mm_M2`. Lunghezza
delle viti, distanziali e pin header/socket vanno annotati in base al montaggio
reale: non sono componenti elettronici aggiuntivi dello schema. Le etichette del
joystick nello schema e nel PCB non coincidono, quindi non le presentiamo come
codici d’acquisto verificati.

La [BOM dettagliata](https://github.com/enric0r/ChoCo/blob/main/hardware/BOM.md)
riporta riferimenti, impronte, fonti e dettagli ancora da aggiungere sul
montaggio effettivo. La repository del firmware contiene l’elenco di riferimento;
questa sintesi va aggiornata quando viene confermato un componente.

## Firmware {#firmware}

La [repository del firmware ChoCo](https://github.com/enric0r/ChoCo) usa PlatformIO con un solo ambiente `pico` e il core Arduino RP2040. Dalla radice della repository del firmware:

```powershell
pio run
pio run -t upload
pio device monitor
```

La compilazione produce `.pio/build/pico/firmware.uf2`. Puoi copiare questo file nell’unità **RPI-RP2** in modalità BOOTSEL invece di usare `pio run -t upload`. In `platformio.ini`, `upload_port = COM5` è un valore specifico della macchina di sviluppo: sovrascrivilo localmente se usi un’altra porta. I flag TinyUSB e quelli che disabilitano la rete servono alla configurazione USB MIDI di questo firmware.

Nelle build di rilascio `CHOCO_LOG_LEVEL` è impostato su `CHOCO_LOG_LEVEL_NONE`, quindi il monitor seriale resta volutamente silenzioso. Per la diagnostica scegli temporaneamente INFO o DEBUG in `lib/Config/Config.h`, ricompila e carica il firmware, poi esegui `pio device monitor`. Ripristina `NONE` per l’uso normale. **C + B** stampa la cronologia degli accordi solo con log INFO o superiore; altrimenti l’OLED mostra `Serial log OFF`.

## Configurazione {#configuration}

Mappatura dei pin, soglie, tempi, modalità predefinite e opzioni funzionali si trovano in [`lib/Config/Config.h`](https://github.com/enric0r/ChoCo/blob/main/lib/Config/Config.h).

| Impostazione | Predefinito | Scopo |
| --- | --- | --- |
| `JOYSTICK_TRIGGER_ENGAGE_PCT` / `JOYSTICK_TRIGGER_RELEASE_PCT` | 72 / 55 | Isteresi della direzione; la soglia di attivazione deve essere maggiore |
| `JOYSTICK_SWAP_AXES`, `JOYSTICK_INVERT_X`, `JOYSTICK_INVERT_Y` | 1, 1, 1 | Orientamento dell’attuale revisione PCB |
| `INPUT_DEBOUNCE_MS` | 10 | Stabilizzazione dei fronti di pressione e rilascio |
| `UI_REFRESH_MS` | 100 | Intervallo di aggiornamento OLED |
| `SCREENSAVER_TIMEOUT_MS` | 30000 | Inattività prima dello screensaver |
| `STRUM_NOTE_DELAY_MS` | 14 | Intervallo fra le note in modalità strum |
| `CHOCO_LOG_LEVEL` | `NONE` | Livello della diagnostica seriale |

Le soglie del joystick hanno controlli in fase di compilazione: entrambe devono essere tra 1 e 99 e quella di rilascio deve essere inferiore a quella di attivazione. Puoi configurare le stringhe USB del produttore e del prodotto, ma i descrittori USB personalizzati sono disattivati per impostazione predefinita.

## Risoluzione dei problemi {#troubleshooting}

| Sintomo | Cosa controllare |
| --- | --- |
| Il dispositivo USB MIDI non compare | Cavo USB dati, esito del caricamento, ingresso selezionato nel programma MIDI, riconnessione dopo il caricamento |
| Arrivano eventi MIDI ma non si sente nulla | Assegna uno strumento o un sintetizzatore software all’ingresso MIDI |
| L’OLED resta spento | Alimentazione, indirizzo I²C `0x3C`, GP14/GP15, scelta di I²C1 |
| Il joystick va nella direzione sbagliata | Scambio e inversione degli assi; verifica con la scheda montata |
| La tastiera perde o ripete pressioni | Cablaggio della matrice e debounce di 10 ms |
| Note bloccate o in ritardo | Controlla latch e strum, poi segui i test fisici in `DEBUGGING.md` |

I test eseguiti sul computer non riproducono il trasporto USB, il rumore analogico, il ghosting della matrice, l’aspetto dell’OLED o la latenza effettiva. Per queste verifiche usa una scheda reale e un programma MIDI. Il file [DEBUGGING.md](https://github.com/enric0r/ChoCo/blob/main/DEBUGGING.md) della repository del firmware contiene una checklist più dettagliata.

## Per contribuire {#for-contributors}

`src/main.cpp` gestisce l’avvio e il ciclo degli eventi. Le librerie indipendenti in `lib/` gestiscono comandi, logica degli accordi, display, MIDI e configurazione condivisa. Le inclusioni tra librerie vanno dichiarate nel `library.json` della libreria che le usa, senza creare dipendenze cicliche. Evita lunghi `delay()` e allocazioni dinamiche nel ciclo principale.

La CI compila il firmware ed esegue sei programmi di test C++ sul computer. Su Linux, macOS o WSL con `g++`:

```bash
bash test/run_host_tests.sh
pio run
```

Non esiste un target `pio test`. La suite verifica logica degli accordi e del joystick, debounce, direzioni del display, strum annullabile e ciclo principale con GPIO, tempo e MIDI simulati. Leggi [CONTRIBUTING.md](https://github.com/enric0r/ChoCo/blob/main/CONTRIBUTING.md) per il flusso delle PR. ChoCo è distribuito con [licenza PolyForm Noncommercial 1.0.0](https://github.com/enric0r/ChoCo/blob/main/LICENSE).
