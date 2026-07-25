# Authoritative Node Trees

These are cumulative facilitator checkpoints. Names, capitalization, node types,
parenting, and script attachments are part of the checkpoint. A scene instance
is shown as a complete subtree so a facilitator can compare what the learner
sees without guessing.

## Lesson 01 — `NODE-L01`

```text
Main (Node2D)
```

`Main` is saved as `res://scenes/main.tscn`.

## Lesson 02 — `NODE-L02`

```text
Main (Node2D)
```

The editor tour does not change the saved scene tree.

## Lesson 03 — `NODE-L03`

```text
Main (Node2D)
├── Background (ColorRect)
├── MatchLine (Area2D)
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

The two `CollisionShape2D` nodes used by the complete game are visible from
their scene-creation lessons, but collision detection is not configured or
tested until Lesson 08.

## Lesson 04 — `NODE-L04`

```text
Main (Node2D)
├── Background (ColorRect)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

## Lesson 05 — `NODE-L05`

`Main` contains one temporary, manually placed instance:

```text
Main (Node2D)
├── Background (ColorRect)
├── FallingThing (Area2D) [falling_thing.gd] — instance
│   ├── Placeholder (ColorRect)
│   ├── TypeLabel (Label)
│   ├── Sprite2D
│   └── CollisionShape2D
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

The source scene saved as `res://scenes/falling_thing.tscn` is:

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 06 — `NODE-L06`

The node trees are unchanged from `NODE-L05`. The reusable scene now applies
the selected `Kind` to `Placeholder` and `TypeLabel`.

```text
Main (Node2D)
├── Background (ColorRect)
├── FallingThing (Area2D) [falling_thing.gd] — instance
│   ├── Placeholder (ColorRect)
│   ├── TypeLabel (Label)
│   ├── Sprite2D
│   └── CollisionShape2D
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 07 — `NODE-L07`

The manual instance is removed. `Main` becomes responsible for creating one
instance under `FallingThings`.

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 08 — `NODE-L08`

The trees are unchanged from `NODE-L07`. This is the first checkpoint where
both `CollisionShape2D` rectangles, collision layers and masks, and
`MatchLine.thing_crossed` are verified together.

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
└── HUD (CanvasLayer)
    └── ScoreLabel (Label)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 09 — `NODE-L09`

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
└── HUD (CanvasLayer) [hud.gd]
    └── ScoreLabel (Label)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 10 — `NODE-L10`

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
└── HUD (CanvasLayer) [hud.gd]
    ├── ScoreLabel (Label)
    └── GameOverPanel (PanelContainer)
        └── VBoxContainer
            ├── GameOverLabel (Label)
            ├── FinalScoreLabel (Label)
            └── PlayAgainButton (Button)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 11 — `NODE-L11`

The trees are unchanged from `NODE-L10`. `Sprite2D` now displays the selected
art texture; `Placeholder` and `TypeLabel` remain in the source scene but are
hidden during play.

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
└── HUD (CanvasLayer) [hud.gd]
    ├── ScoreLabel (Label)
    └── GameOverPanel (PanelContainer)
        └── VBoxContainer
            ├── GameOverLabel (Label)
            ├── FinalScoreLabel (Label)
            └── PlayAgainButton (Button)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect) — hidden during play
├── TypeLabel (Label) — hidden during play
├── Sprite2D — selected art visible during play
└── CollisionShape2D
```

## Lesson 12 — `NODE-L12`

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
├── SwitchSound (AudioStreamPlayer)
├── SuccessSound (AudioStreamPlayer)
├── ExplosionSound (AudioStreamPlayer)
└── HUD (CanvasLayer) [hud.gd]
    ├── ScoreLabel (Label)
    └── GameOverPanel (PanelContainer)
        └── VBoxContainer
            ├── GameOverLabel (Label)
            ├── FinalScoreLabel (Label)
            └── PlayAgainButton (Button)
```

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

## Lesson 13 — `NODE-L13`

The export preflight must end with these two final Canonical Game Contract
trees exactly.

Final `Main` node tree:

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
├── SwitchSound (AudioStreamPlayer)
├── SuccessSound (AudioStreamPlayer)
├── ExplosionSound (AudioStreamPlayer)
└── HUD (CanvasLayer) [hud.gd]
    ├── ScoreLabel (Label)
    └── GameOverPanel (PanelContainer)
        └── VBoxContainer
            ├── GameOverLabel (Label)
            ├── FinalScoreLabel (Label)
            └── PlayAgainButton (Button)
```

Final `FallingThing` node tree:

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```
