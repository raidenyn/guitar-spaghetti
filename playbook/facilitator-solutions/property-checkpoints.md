# Property Checkpoints

Each checkpoint is cumulative: retain every earlier value unless the checkpoint
explicitly changes it. The “first established” labels identify the lesson that
owns each canonical value.

## Canonical value ownership

| Canonical value | Exact setting | First established |
|---|---|---|
| Project renderer | `Compatibility` | Lesson 01 |
| Viewport width / height | `480` / `720` | Lesson 03 |
| Stretch mode / aspect | `canvas_items` / `keep` | Lesson 03 |
| `Background` color | `#111827` | Lesson 03 |
| `MatchLine` position | `(0, 640)` | Lesson 03 |
| `MatchLine/Visual` position / size | `(0, -6)` / `(480, 12)` | Lesson 03 |
| `MatchLine/CollisionShape2D` position / rectangle size | `(240, 0)` / `(480, 12)` | Lesson 03; collision behavior verified Lesson 08 |
| `MatchLine` collision layer / mask | `2` / `1` | Lesson 08 |
| `FallingThing/Placeholder` position / size | `(-48, -32)` / `(96, 64)` | Lesson 05 |
| `FallingThing/CollisionShape2D` rectangle size | `(96, 64)` | Lesson 05; collision behavior verified Lesson 08 |
| `FallingThing` collision layer / mask | `1` / `0` | Lesson 05; verified Lesson 08 |
| `SpawnDelay` | `wait_time 0.5`, `one_shot true`, `autostart false` | Lesson 07 |
| `ScoreLabel` position | `(16, 16)` | Lesson 03 |
| `GameOverPanel` anchors / offsets | center / `(-140, -100, 140, 100)` | Lesson 10 |

## Lesson 01 — `PROP-L01`

- Project name: `GuitarAndSpaghetti`.
- Renderer: `Compatibility`.
- Main scene: `res://scenes/main.tscn`.

## Lesson 02 — `PROP-L02`

No project or node property changes. Confirm `PROP-L01` remains true and
`Main` has no unsaved-change marker after the editor experiments.

## Lesson 03 — `PROP-L03`

- Project Settings → Display → Window → Size → Viewport Width: `480`.
- Project Settings → Display → Window → Size → Viewport Height: `720`.
- Project Settings → Display → Window → Stretch → Mode: `canvas_items`.
- Project Settings → Display → Window → Stretch → Aspect: `keep`.
- `Background`: position `(0, 0)`, size `(480, 720)`, color `#111827`, and
  Mouse → Filter `Ignore`.
- `MatchLine`: position `(0, 640)`.
- `MatchLine/Visual`: position `(0, -6)`, size `(480, 12)`, color `#2684ff`.
- `MatchLine/CollisionShape2D`: position `(240, 0)` with a
  `RectangleShape2D` size of `(480, 12)`. Detection is configured in Lesson 08.
- `ScoreLabel`: position `(16, 16)` and text `Score: 0`.

## Lesson 04 — `PROP-L04`

- Input Map action: exact name `switch_line`.
- `switch_line` event: physical Space key.
- The cumulative values from `PROP-L03` remain unchanged.

## Lesson 05 — `PROP-L05`

- `FallingThing`: collision layer `1`, collision mask `0`.
- `FallingThing/Placeholder`: position `(-48, -32)`, size `(96, 64)`.
- `FallingThing/CollisionShape2D`: centered at `(0, 0)`, enabled, with a
  `RectangleShape2D` size of `(96, 64)`.
- `FallingThing/Sprite2D`: hidden.
- The temporary instance under `Main`: position `(240, -40)`.
- `fall_speed`: `180.0` pixels per second.

## Lesson 06 — `PROP-L06`

- `FallingThing.Kind.GUITAR`: placeholder color `#3b82f6`, label `GUITAR`.
- `FallingThing.Kind.SPAGHETTI`: placeholder color `#ef4444`, label
  `SPAGHETTI`.
- The `Placeholder` geometry, collision geometry, layer, mask, and fall speed
  remain exactly as in `PROP-L05`.

## Lesson 07 — `PROP-L07`

- Spawn position y: `-40`.
- Horizontal spawn x range: `60.0` through `420.0`, inclusive of the intended
  margins.
- `SpawnDelay.wait_time`: `0.5`.
- `SpawnDelay.one_shot`: `true`.
- `SpawnDelay.autostart`: `false`.
- Exactly one generated instance is parented under `FallingThings`.

## Lesson 08 — `PROP-L08`

- `FallingThing`: collision layer `1`, collision mask `0`.
- `MatchLine`: collision layer `2`, collision mask `1`.
- `FallingThing/CollisionShape2D`: enabled `RectangleShape2D`, size `(96, 64)`.
- `MatchLine/CollisionShape2D`: enabled `RectangleShape2D`, position
  `(240, 0)`, size `(480, 12)`.
- `SpawnDelay` remains `wait_time 0.5`, `one_shot true`, `autostart false`.

This is the first cumulative gate for the complete collision configuration.
Layer means “what I am”; mask means “what I look for.”

## Lesson 09 — `PROP-L09`

- `ScoreLabel` begins at position `(16, 16)` with text `Score: 0`.
- Blue `#2684ff` matches `GUITAR`.
- Red `#ef4444` matches `SPAGHETTI`.
- A correct crossing changes the displayed score by exactly `1`; a mismatch
  leaves it unchanged.
- All `PROP-L08` collision and timing values remain unchanged.

## Lesson 10 — `PROP-L10`

- `GameOverPanel`: center anchor preset.
- `GameOverPanel` offsets `(left, top, right, bottom)`:
  `(-140, -100, 140, 100)`.
- `GameOverLabel` text: `Game Over`.
- `FinalScoreLabel` initial text may be `Final score: 0`; the script replaces
  the number at game over.
- `PlayAgainButton` text: `Play Again`.
- `GameOverPanel` is hidden before play and after reset.
- Explosion tween duration: `0.35` seconds, scale target `(2.2, 2.2)`, alpha
  target `0.0`.

## Lesson 11 — `PROP-L11`

- Guitar texture path: `res://art/guitar.png`.
- Spaghetti texture path: `res://art/spaghetti.png`.
- `Sprite2D` uses one uniform scale derived from the selected texture’s longest
  side to fit a `96.0`-pixel box.
- `Sprite2D` is visible during play.
- `Placeholder` and `TypeLabel` remain present but hidden during play.
- Collision geometry remains `(96, 64)`; art does not resize it.

## Lesson 12 — `PROP-L12`

- `SwitchSound`, `SuccessSound`, and `ExplosionSound` each have the intended
  imported stream assigned.
- Autoplay is off on all three players.
- Each player uses a comfortable, non-clipping volume chosen during the
  lesson.
- Canonical tuning is restored: fall speed `180.0`, spawn delay `0.5`, art box
  `96.0`, explosion duration `0.35`.

## Lesson 13 — `PROP-L13`

The editor and exported build must both retain every canonical value:

- Renderer `Compatibility`; viewport `480 × 720`; stretch
  `canvas_items` / `keep`.
- Background `#111827`.
- `MatchLine` at `(0, 640)`, Visual `(0, -6)` / `(480, 12)`, collision shape
  `(240, 0)` / `(480, 12)`, layer/mask `2/1`.
- `FallingThing` Placeholder `(-48, -32)` / `(96, 64)`, collision rectangle
  `(96, 64)`, layer/mask `1/0`.
- `SpawnDelay`: `wait_time 0.5`, `one_shot true`, `autostart false`.
- `ScoreLabel` at `(16, 16)`.
- `GameOverPanel`: center anchors and offsets
  `(-140, -100, 140, 100)`.
