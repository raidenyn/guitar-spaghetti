# Timers and Randomness

Lessons 07 and later use a timer to leave a tiny gap after an object is
resolved, then create a new object in a random allowed position and with a
random kind. The exact values here are canonical; use the current lesson for
the actions.

For deeper reading, see Godot's [Timer](https://docs.godotengine.org/en/4.7/classes/class_timer.html) and [random number generation](https://docs.godotengine.org/en/4.7/tutorials/math/random_number_generation.html) documentation.

## `SpawnDelay` waits, then announces `timeout`

`SpawnDelay` is a `Timer` node. When code calls `spawn_delay.start()`, it
counts down. At the end it emits its built-in `timeout` signal. The connected
`Main._on_spawn_delay_timeout()` callback calls `_spawn_thing()`.

The exact Inspector settings are:

| Setting | Required value | Meaning |
|---|---:|---|
| `wait_time` | `0.5` | Wait half a second. |
| `one_shot` | `true` | Stop after one timeout. |
| `autostart` | `false` | Do not begin counting when the scene first opens. |

`one_shot` is important because the game decides when a new object should
appear. `autostart` is off because `Main` starts the timer only after a
resolved object. These values are listed in
[`PROP-L07`](../facilitator-solutions/property-checkpoints.md#lesson-07-prop-l07).

## Random x position

The playfield is 480 pixels wide. A falling object is spawned with a safe
margin so it does not begin half outside the screen:

```gdscript
randf_range(60.0, 420.0)
```

`randf_range` returns a random decimal number from the first value through the
second value. Here that means an x position from `60.0` through `420.0`. The
spawn y value is always `-40.0`, above the top edge. The complete spawning
code appears in [`SCRIPT-L07`](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07).

## Random guitar or spaghetti

The game has two enum choices: `FallingThing.Kind.GUITAR` and
`FallingThing.Kind.SPAGHETTI`. `randi_range(0, 1)` produces either whole
number `0` or `1`. The canonical code uses `0` for guitar and `1` for
spaghetti:

```gdscript
var random_kind := (
    FallingThing.Kind.GUITAR
    if randi_range(0, 1) == 0
    else FallingThing.Kind.SPAGHETTI
)
```

Godot 4 automatically seeds its global random functions, so this course does
not call `randomize()`. Seeing several guitars in a row can still happen: a
random choice does not promise strict alternation.

## Check the visible result

After the Lesson 07 gate, exactly one object appears at a time. It begins just
above the screen, lands at varying horizontal positions between the margins,
and the next object arrives after the `0.5` second delay. Tell the facilitator
which kind appeared and whether its x position changed from the previous one.

## Related concepts

- [Movement and the spawn coordinate map](coordinates-movement-and-delta.md#the-game-screen-is-a-map)
- [Callbacks and signals](signals.md#built-in-and-custom-signals)
- [Required timer connection](signals.md#the-five-required-connections)
