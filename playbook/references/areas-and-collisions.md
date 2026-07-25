# Areas and Collision Detection

This game needs to notice the moment a falling object reaches the matching
line. It does not need either object to bounce or be pushed away. `Area2D` is
the Godot node for that kind of **detection**.

For the official Godot reference, see [Area2D](https://docs.godotengine.org/en/4.7/classes/class_area2d.html) and [collision introduction](https://docs.godotengine.org/en/4.7/tutorials/physics/physics_introduction.html).

## Detection is different from physical blocking

An `Area2D` notices overlap and sends a signal. It is like a doorway sensor:
it can say that something passed through, but it does not make the thing stop.
That is exactly what the game wants. `FallingThing` keeps moving until the
game receives the crossing event and resolves it.

Physical blocking is a different job, normally done by physics-body nodes such
as `CharacterBody2D` or `StaticBody2D`. Do not replace either game `Area2D`
with a blocking body: the intended result is a reported crossing, not a
bouncing object.

## Collision shapes draw the invisible sensor

An `Area2D` needs a child `CollisionShape2D` with a Shape resource. The shape
is the invisible rectangle Godot uses for overlap checks; a visible
`ColorRect` is only artwork and cannot detect a crossing by itself.

Use a `RectangleShape2D` for each sensor. The rectangle is centered on its
`CollisionShape2D` position, so its size is its full width and height, not a
half-size.

| Sensor | `CollisionShape2D` setup | Why |
|---|---|---|
| `FallingThing` | Enabled `RectangleShape2D`, position `(0, 0)`, size `(96, 64)` | Covers the reusable falling object. |
| `MatchLine` | Enabled `RectangleShape2D`, position `(240, 0)`, size `(480, 12)` | Covers the full visible line at `MatchLine` y `640`. |

The line's visible child is positioned at `(0, -6)` and sized `(480, 12)`.
Its collision shape sits at x `240` because the `MatchLine` node itself is at
`(0, 640)`, while a rectangle shape is centered on its own position. Compare
these values with [`PROP-L08`](../facilitator-solutions/property-checkpoints.md#lesson-08-prop-l08), not with a guess based on how wide the line looks.

## Layers and masks: identity and attention

A collision **layer** means “what I am.” A collision **mask** means “what I
look for.” They are numbered bits in Godot's Inspector. For this game, use the
numbers exactly as shown; no other layers are needed.

| Area | Layer: what I am | Mask: what I look for |
|---|---:|---:|
| `FallingThing` | `1` — FallingThing | `0` — nothing |
| `MatchLine` | `2` — MatchLine | `1` — FallingThing |

So the line looks for falling things. A falling thing does not need to look
back, because the line alone owns the detection and reports it to `Main`. This
keeps the event direction clear and avoids two places trying to resolve the
same crossing.

## `area_entered` reports the crossing

`MatchLine` connects its built-in `area_entered` signal in its `_ready()`
function. When an overlapping `Area2D` is found, the callback checks that it
is a `FallingThing`, then sends the game-specific `thing_crossed` signal to
`Main`:

```gdscript
func _ready() -> void:
    area_entered.connect(_on_area_entered)

func _on_area_entered(area: Area2D) -> void:
    var thing := area as FallingThing
    if input_enabled and thing != null:
        thing_crossed.emit(thing)
```

The small type check makes the line ignore any unrelated `Area2D` added in a
future experiment. The complete code is in
[`SCRIPT-L08`](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08).
The `thing_crossed` signal is then connected to `Main`, which decides whether
to score or end the round. See [signals](signals.md#the-five-required-connections)
for that handoff.

## Crossing checklist

Before asking the Lesson 08 gate question, check these observable facts in
order:

1. `FallingThing` and `MatchLine` are both `Area2D` nodes with enabled
   `CollisionShape2D` children and the exact rectangles above.
2. `FallingThing` uses layer `1`, mask `0`; `MatchLine` uses layer `2`, mask
   `1`.
3. `MatchLine` connects `area_entered` once to its own
   `_on_area_entered` callback.
4. `MatchLine` sends `thing_crossed` only after the callback identifies a
   `FallingThing`.
5. The falling object visibly reaches the line, is handled once by `Main`,
   and the next object waits for `SpawnDelay` rather than appearing instantly.

If the event is missing, do not change movement, scoring, and collision
settings together. Use the lesson gate and one of the recovery branches below.

## Recovery branches

These links name the evidence to request and the smallest repair. They do not
replace the current lesson's gate.

- [Warning icon or no rectangle shape — `SYM-SHAPE-01`](../facilitator-solutions/troubleshooting-map.md#sym-shape-01-missing-or-disabled-collision-shape)
- [Overlapping areas but no `area_entered` callback — `SYM-LAYER-01`](../facilitator-solutions/troubleshooting-map.md#sym-layer-01-areas-overlap-but-the-signal-does-not-fire)
- [A crossing is seen but the expected receiver does nothing — `SYM-SIGNAL-01`](../facilitator-solutions/troubleshooting-map.md#sym-signal-01-expected-callback-never-runs)
- [One object is handled twice — `SYM-SCORE-01`](../facilitator-solutions/troubleshooting-map.md#sym-score-01-one-object-scores-twice)

## Related concepts

- [The reusable falling scene](nodes-scenes-and-instances.md#scene)
- [Coordinates of the line and falling object](coordinates-movement-and-delta.md#the-game-screen-is-a-map)
- [Canonical collision settings](../facilitator-solutions/property-checkpoints.md#lesson-08-prop-l08)
