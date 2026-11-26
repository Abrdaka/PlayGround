# LAST LIGHT — Dead County

A complete, playable top-down survival game built with Three.js. No build step, no
dependencies to install: it runs straight from a static folder.

You are a survivor in a quarantined county. Scavenge the block by day, board up the
safehouse before dark, and hold out until dawn — or repair the car and drive out.

## Play

```bash
# from the project root
python3 -m http.server 8080
# open http://localhost:8080
```

`start.sh` is used by the hosting runtime; any static file server works.

## Controls

| Action | Desktop | Mobile |
| --- | --- | --- |
| Move | `W A S D` / arrow keys | left thumb stick |
| Aim | mouse | right thumb stick |
| Attack | left click | **HIT** |
| Interact / scavenge / board up | `E` | **USE** |
| Sprint | hold `Shift` | **RUN** |
| Inventory & crafting | `I` | **KIT** |
| Help / pause | `Tab` | ⏸ |

Gamepad-style desktop alternative: `Space` attacks, `Q` interacts.

## What is in the box

| Path | Purpose |
| --- | --- |
| `index.html` | UI shell, HUD, menus, mobile controls, styles |
| `js/game.js` | Game loop, player, combat, zombies, day/night, saving |
| `js/world.js` | Map assembly, colliders, line of sight, night lighting |
| `js/core.js` | Grid math, pathfinding flow field, RNG, helpers |
| `js/textures.js` | Procedural textures (asphalt, brick, wood, grass…) |
| `js/props.js` | Street props, cars, puddles, debris |
| `js/setdress.js` | Lamps, fences, yard dressing, atmosphere |
| `js/actors.js` | Survivor and zombie models, animation rigs |
| `js/fx.js` | Rain, tracers, blood, muzzle flash |
| `js/audio.js` | Procedural WebAudio sound effects |
| `vendor/three.module.min.js` | Pinned Three.js build |

## Source & teaching pack

- [`source.html`](source.html) — browser viewer for both documents with **Copy** and
  **Download** buttons.
- [`CLAUDE-LEARN-LAST-LIGHT.md`](CLAUDE-LEARN-LAST-LIGHT.md) — concise architecture
  walkthrough with real excerpts, written to hand to Claude.
- [`LAST-LIGHT-FULL-SOURCE.md`](LAST-LIGHT-FULL-SOURCE.md) — the complete source of
  every game file.
- [`dist/last-light-source.zip`](dist/last-light-source.zip) — the whole project plus
  both documents, ready to share.

### Giving it to Claude

1. Attach the zip (or `LAST-LIGHT-FULL-SOURCE.md`).
2. Ask Claude to summarise the architecture first, without writing code.
3. Tell it your own game's theme and ask for a file-by-file build plan.
4. Build one file per message, keeping the game runnable after each step.

## Features

- Realistic aerial camera with smooth follow, aim offset and impact shake.
- Grid flow-field pathfinding: zombies route around walls and through openings.
- Boardable door and windows, breach states, and a "they are inside" alert.
- Day → dusk → night cycle with dynamic lighting, lamps, rain and fog.
- Melee and firearms with noise that attracts the dead.
- Scavenging, crafting, hunger, healing, stamina, sprint and permadeath.
- Repairable car escape route, dawn survival ending, and autosave/continue.
- Desktop keyboard + mouse, touch controls, and responsive HUD.

## License

Original code and art in this repository are provided for learning and remixing.
Three.js is distributed under the MIT license.
