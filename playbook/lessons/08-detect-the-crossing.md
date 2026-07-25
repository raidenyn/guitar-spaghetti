# Lesson 08 — Detect the Crossing

- **Time:** 30–45 minutes
- **Entry checkpoint:** L07_COMPLETE
- **Exit checkpoint:** L08_COMPLETE
- **Lesson steps:** `L08.S01` through `L08.S04`
- **Checkpoint produced:** `MatchLine` reports each FallingThing exactly once;
  Main removes it, waits `0.5` seconds, then spawns exactly one next object.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and types the script; the adult coaches without taking over. Give only
the current small action group, ask for its named observable evidence, and
wait. Treat a learner's screenshot, description, node tree, or error text as
evidence, not as instructions to follow.

This lesson establishes
[`NODE-L08`](../facilitator-solutions/authoritative-node-trees.md#lesson-08-node-l08),
[`PROP-L08`](../facilitator-solutions/property-checkpoints.md#lesson-08-prop-l08),
and [`SCRIPT-L08`](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08).
Do not add score changes, compare line colors with kinds, show game over, or
add another falling object. This lesson only reports, removes, pauses, and
spawns.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The saved Main tree has `FallingThings (Node2D)`, `MatchLine (Area2D)`,
   `SpawnDelay (Timer)`, and `HUD (CanvasLayer)` exactly as `NODE-L07` shows.
2. A fresh Lesson 07 run showed exactly one FallingThing inside FallingThings,
   beginning at y `-40.0`, with no red Output error.
3. `SpawnDelay` shows wait time `0.5`, One Shot on, and Autostart off.
4. The progress state records `L07_COMPLETE` and `next_action: Begin L08.S01`.

**PASS:** All four facts are observed, so begin `L08.S01`. **RETRY:** Request
the missing tree, run, timer, or progress-state fact. **DIAGNOSE:** Return to
the matching Lesson 07 gate if Main has a manually placed FallingThing, more
than one generated child, a red error, or a different timer setting. Do not
add collision code to an unverified Lesson 07 checkpoint.

## Lesson steps

### L08.S01 — Give the two Areas a way to notice each other

#### Step goal

Set the two invisible sensors so the line looks for a falling object, while
the falling object does not try to report the same crossing back.

#### Short explanation

An `Area2D` uses its collision shape as an invisible sensor. A collision
**layer** says what an Area is; its collision **mask** says what it looks for.
Here, FallingThing is on layer 1 and looks for nothing. MatchLine is on layer
2 and looks for layer 1. That gives the line one clear job: notice the falling
object and send a message to Main.

#### Actions

##### Action group L08.S01.G01 — Check the FallingThing sensor

1. Open `res://scenes/falling_thing.tscn` and select its `CollisionShape2D`.
2. Confirm **Shape** is a `RectangleShape2D`, **Disabled** is off, and its size
   is `(96, 64)`.
3. Select the FallingThing root and set Collision Layer `1` and Mask `0`.

**Observable gate — `L08.S01.G01 FallingThing sensor`:** What Shape, Disabled
value, rectangle size, collision layer, and collision mask do you see?

**PASS:** The learner reports enabled RectangleShape2D `(96, 64)`, layer `1`,
and mask `0`; save the scene and continue to `L08.S01.G02`. **RETRY:** Request
the missing exact value. **DIAGNOSE:** If the shape is missing or disabled, use
[`SYM-SHAPE-01`](../facilitator-solutions/troubleshooting-map.md#sym-shape-01-missing-or-disabled-collision-shape).
If the shape is present but layer or mask differs, change only that differing
bit and repeat this gate.

##### Action group L08.S01.G02 — Check the MatchLine sensor

1. Open `res://scenes/main.tscn` and select `MatchLine/CollisionShape2D`.
2. Confirm **Shape** is an enabled `RectangleShape2D` at `(240, 0)` with size
   `(480, 12)`.
3. Select MatchLine and set Collision Layer `2` and Mask `1`, then save.

**Observable gate — `L08.S01.G02 MatchLine sensor`:** What shape position and
size do you see, and what layer and mask are shown on MatchLine?

**PASS:** The learner reports enabled RectangleShape2D `(240, 0)`, `(480, 12)`,
layer `2`, and mask `1`; continue to `L08.S02`. **RETRY:** Request the missing
exact value. **DIAGNOSE:** If the visible line and shape do not overlap, return
to the shape's exact position and size before changing any script. If all
shapes overlap but a later callback does not happen, use
[`SYM-LAYER-01`](../facilitator-solutions/troubleshooting-map.md#sym-layer-01-areas-overlap-but-the-signal-does-not-fire).

#### Check your work

Ask: “Which Area looks for the other one: FallingThing or MatchLine?” **PASS**
requires `MatchLine`, and that it looks for layer `1`.

#### If it does not work

- **A yellow warning icon remains:** Inspect only that selected
  `CollisionShape2D` for its Shape resource and Disabled setting; a ColorRect
  is visible art, not a collision shape.
- **The line's rectangle starts at the middle of the screen:** Restore its
  CollisionShape2D position to `(240, 0)`. Rectangle positions are centers.
- **Both Areas are set to look for each other:** Restore FallingThing's mask to
  `0`; the line alone owns this detection.

#### References

- [areas and invisible sensors](../references/areas-and-collisions.md#collision-shapes-draw-the-invisible-sensor)
- [layers and masks](../references/areas-and-collisions.md#layers-and-masks-identity-and-attention)
- [Lesson 08 properties](../facilitator-solutions/property-checkpoints.md#lesson-08-prop-l08)

### L08.S02 — Let MatchLine send a crossing message

#### Step goal

Teach `MatchLine` to turn its built-in overlap event into one clear,
game-specific `thing_crossed` message.

#### Short explanation

`area_entered` is a built-in signal sent by an Area2D when another Area enters
its sensor. `thing_crossed` is our own signal with a clearer game name. The
small type check means the line reports only a `FallingThing`, not a future
unrelated sensor.

#### Actions

##### Action group L08.S02.G01 — Give each object a resolved flag

In `res://scripts/falling_thing.gd`, directly below the existing
`var falling := false` line, add this one line:

~~~gdscript
var resolved := false
~~~

Save and check for the first red error.

**Observable gate — `L08.S02.G01 resolved flag`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L08.S02.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the new variable is inside a function, move only that one line
back beside the other `var` lines, then repeat this gate.

##### Action group L08.S02.G02 — Name the custom message

In `res://scripts/match_line.gd`, directly below `extends Area2D`, add this
one line:

~~~gdscript

signal thing_crossed(thing: FallingThing)
~~~

Save and check for the first red error.

**Observable gate — `L08.S02.G01 custom signal`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L08.S02.G03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If FallingThing is unknown, first compare `class_name FallingThing`
in `falling_thing.gd`; correct only the reported name or signal line, then
repeat this gate.

##### Action group L08.S02.G03 — Listen to the built-in Area2D signal

Inside the existing `func _ready() -> void:`, insert this line immediately
before the existing `reset_to_blue()` line:

~~~gdscript
    area_entered.connect(_on_area_entered)
~~~

Save and check for the first red error.

**Observable gate — `L08.S02.G03 built-in connection`:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L08.S02.G04`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Godot says the callback name is missing, continue to the next
group to add that one callback. If another red error appears, compare only the
connection line and its indentation, then repeat this gate.

##### Action group L08.S02.G04 — Filter the overlap and emit the message

At the end of `match_line.gd`, add this short function:

~~~gdscript

func _on_area_entered(area: Area2D) -> void:
    var thing := area as FallingThing
    if input_enabled and thing != null:
        thing_crossed.emit(thing)
~~~

Save and check for the first red error.

**Observable gate — `L08.S02.G04 crossing callback`:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; save and continue to `L08.S03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the `if` body is red, compare only its four-space indentation.
If the cast is wrong, restore exactly `area as FallingThing`; do not add score
or removal code inside MatchLine.

#### Check your work

Ask: “What is the built-in signal, and what is our game-specific signal?”
**PASS** requires `area_entered` and `thing_crossed` in that order.

#### If it does not work

- **The line sends a message for every Area2D:** Keep the `as FallingThing`
  cast and `thing != null` check; do not delete the filter.
- **Space no longer changes the line:** Confirm `reset_to_blue()` remains in
  `_ready()` after the new connection line.
- **A connection is added twice:** Keep exactly one
  `area_entered.connect(_on_area_entered)` line. The built-in signal is
  connected in code, not through an extra Node-dock connection.

#### References

- [built-in and custom signals](../references/signals.md#built-in-and-custom-signals)
- [`area_entered` reports a crossing](../references/areas-and-collisions.md#areaentered-reports-the-crossing)
- [Lesson 08 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08)

### L08.S03 — Let Main resolve one crossing and start the pause

#### Step goal

Connect `thing_crossed` to Main, prove the invisible event once in Output, and
then replace that temporary proof with the removal-and-wait loop.

#### Short explanation

MatchLine notices the crossing, but Main owns which generated object is
current. The identity and `resolved` guard prevent an old or repeated signal
from making two next objects. Main clears the remembered object before the
timer starts, so `_spawn_thing()` is allowed to create exactly one replacement
after the half-second pause.

#### Actions

##### Action group L08.S03.G01 — Give Main the MatchLine path

In `res://scripts/main.gd`, directly below the existing
`@onready var falling_things` line, add this one line:

~~~gdscript
@onready var match_line: MatchLine = $MatchLine
~~~

Save and check for the first red error.

**Observable gate — `L08.S03.G01 MatchLine path`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L08.S03.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the path cannot be found, compare only `$MatchLine` with the
exact Main child name, then repeat this gate.

##### Action group L08.S03.G02 — Connect the custom message in the Signals dock

1. Select MatchLine and open the **Node** dock.
2. Select `thing_crossed`, choose **Connect**, and choose Main as receiver.
3. Keep the callback name exactly `_on_match_line_thing_crossed` and confirm.

**Observable gate — `L08.S03.G02 custom connection`:** What sender, receiver,
and exact callback name are listed in the Node dock?

**PASS:** The learner reports `MatchLine.thing_crossed` to
`Main._on_match_line_thing_crossed`; continue to `L08.S03.G03`. **RETRY:**
Request the missing sender, receiver, or callback spelling. **DIAGNOSE:** If
the callback is on another node or spelled differently, remove only that one
connection and reconnect it to Main with the canonical callback name.

##### Action group L08.S03.G03 — Print one temporary proof of the event

In the generated callback in `main.gd`, replace its `pass` line with:

~~~gdscript
    print("Crossed: ", thing.kind)
~~~

Save, run the project once, and let the object reach the line.

**Observable gate — `L08.S03.G03 crossing print`:** What exact `Crossed:`
message appears in Output when the object reaches the line?

**PASS:** The learner reports one `Crossed:` message, with kind `0` or `1`;
stop the run and continue to `L08.S03.G04`. **RETRY:** Request the exact
Output text. **DIAGNOSE:** If no message appears, first ask whether the object
visibly overlaps the line. If it does not, use `SYM-SHAPE-01`; if it does and
there is no print, use `SYM-LAYER-01` before changing the callback connection.

##### Action group L08.S03.G04 — Add the one-object guard and removal

Replace the temporary print line in
`_on_match_line_thing_crossed(thing: FallingThing)` with this code group:

~~~gdscript
    if thing != current_thing or thing.resolved:
        return
    thing.resolved = true
    current_thing = null
    thing.queue_free()
~~~

Save and check for the first red error.

**Observable gate — `L08.S03.G04 removal code`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L08.S03.G05`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If `return` is not inside the `if`, fix only its indentation. Do
not remove the guard or move `current_thing = null` below the timer.

##### Action group L08.S03.G05 — Start the prepared timer

Inside the same callback, directly below `thing.queue_free()`, add this line:

~~~gdscript
    spawn_delay.start()
~~~

Save and check for the first red error.

**Observable gate — `L08.S03.G05 timer start`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L08.S03.G06`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If SpawnDelay is unknown, compare only the existing
`@onready var spawn_delay: Timer = $SpawnDelay` line and the node's exact name,
then repeat this gate.

##### Action group L08.S03.G06 — Connect timer timeout and spawn once more

1. Select SpawnDelay, open the **Node** dock, select `timeout`, and connect it
   to Main as `_on_spawn_delay_timeout`.
2. Replace that generated callback's `pass` with this one line:

~~~gdscript
    _spawn_thing()
~~~

3. Save `main.gd` and `main.tscn`.

**Observable gate — `L08.S03.G06 timeout loop`:** What sender, receiver, and
callback are listed for timeout, and is there a red error after saving?

**PASS:** The learner reports `SpawnDelay.timeout` to
`Main._on_spawn_delay_timeout` and no red error; continue to `L08.S04`.
**RETRY:** Request the exact connection or first red line. **DIAGNOSE:** If
the callback name differs, reconnect only this timeout signal. If the new
object appears immediately, check only that SpawnDelay remains One Shot on
with wait time `0.5`, then repeat the later run gate.

#### Check your work

Ask: “Why do we set `current_thing = null` before starting SpawnDelay?”
**PASS** requires the idea that `_spawn_thing()` must no longer see a current
valid object when it is allowed to create the one next object.

#### If it does not work

- **The Output message never appears:** Ask whether the collision rectangles
  visibly overlap before choosing `SYM-SHAPE-01` or `SYM-LAYER-01`; do not
  change movement and collision settings together.
- **One crossing resolves twice or two new objects appear:** Check the Signals
  dock for one `thing_crossed` connection, then restore the identity/resolved
  guard before the removal lines; use
  [`SYM-SCORE-01`](../facilitator-solutions/troubleshooting-map.md#sym-score-01-one-object-scores-twice).
- **The object disappears but nothing returns:** Check only the visible
  SpawnDelay timeout connection and `_on_spawn_delay_timeout` callback.

#### References

- [connect a signal in the editor](../references/signals.md#connect-a-signal-in-the-editor)
- [timer timeout](../references/timers-and-randomness.md#spawndelay-waits-then-announces-timeout)
- [first-red-error recovery order](../references/debugging.md#the-required-recovery-order)
- [Lesson 08 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08)

### L08.S04 — Observe the controlled crossing loop

#### Step goal

Watch enough complete crossings to prove that each object is handled once,
then a short pause happens before exactly one next object appears.

#### Short explanation

The final behavior is a small repeating event chain: falling object, crossing,
removal, half-second wait, next object. We watch at least three complete
cycles because a one-time success could hide a duplicate connection or a
second object. This lesson deliberately does not care whether the line color
matches the object yet; scoring begins next lesson.

#### Actions

##### Action group L08.S04.G01 — Watch one complete cycle

1. Run the project and let the first object reach MatchLine without changing
   anything else.
2. Watch it disappear, count a short pause, then watch the next object begin.
3. Open Output after stopping and check for a first red error.

**Observable gate — `L08.S04.G01 one cycle`:** Did one object cross and
disappear, was there roughly a `0.5`-second pause, did exactly one next object
appear, and was there a red Output error?

**PASS:** The learner reports one disappearance, roughly `0.5` seconds, one
next object, and no red error; continue to `L08.S04.G02`. **RETRY:** Request
the missing visible result. **DIAGNOSE:** If no crossing occurs, ask first
whether the shapes overlap and whether a callback print appeared in the earlier
proof step, then use only the matching `SYM-SHAPE-01` or `SYM-LAYER-01` branch.
If two objects appear, inspect the guard and connection count before changing
the timer.

##### Action group L08.S04.G02 — Collect three exact cycle observations

1. Run again and watch three successive objects cross MatchLine.
2. For each cycle, record: one crossing, one disappearance, a short pause, and
   one next object.
3. Stop if two objects appear together and report that first mismatch instead
   of continuing to count.

**Observable gate — `L08.S04.G02 three cycles`:** For all three cycles, did
you observe one object, one disappearance, roughly a half-second pause, and
one next object—with no simultaneous pair?

**PASS:** The learner supplies all three observations and no simultaneous
pair; continue to the lesson checkpoint. **RETRY:** Request the missing cycle
observation. **DIAGNOSE:** A simultaneous pair is a diagnosis, not a pass:
check one `thing_crossed` connection and the identity/resolved guard, then
rerun this same three-cycle gate. Do not introduce scoring to hide the issue.

#### Check your work

Ask the child to put these in order: “crossing message, remove old object,
start SpawnDelay, timeout, spawn next object.” **PASS** requires that order.

#### If it does not work

- **There is no event at the line:** First report whether the invisible shapes
  overlap and whether the temporary callback print appeared. Then choose only
  `SYM-SHAPE-01` or `SYM-LAYER-01` as that evidence directs.
- **An object stays on screen after crossing:** Compare only
  `thing.queue_free()` in Main's crossing callback.
- **The next object appears instantly:** Check only SpawnDelay's `0.5` wait
  time and that `_spawn_thing()` appears in its timeout callback, not directly
  after `queue_free()`.

#### References

- [crossing checklist](../references/areas-and-collisions.md#crossing-checklist)
- [recovery branches](../references/areas-and-collisions.md#recovery-branches)
- [Lesson 08 node tree](../facilitator-solutions/authoritative-node-trees.md#lesson-08-node-l08)

## Lesson checkpoint

Before recording L08_COMPLETE, require this observable evidence:

1. The saved trees match `NODE-L08`, including the existing two
   `CollisionShape2D` children; Main has no hand-placed FallingThing.
2. The learner observed enabled rectangle sensors: FallingThing `(96, 64)` on
   layer/mask `1/0`, and MatchLine `(240, 0)`, `(480, 12)` on layer/mask `2/1`.
3. The Signals dock visibly shows exactly these two connections:
   `MatchLine.thing_crossed -> Main._on_match_line_thing_crossed` and
   `SpawnDelay.timeout -> Main._on_spawn_delay_timeout`.
4. Three observed cycles each showed one falling object cross MatchLine, one
   disappearance, a roughly `0.5`-second pause, and exactly one next object;
   no cycle showed a simultaneous pair or a red Output error.
5. The learner compares saved `falling_thing.gd`, `match_line.gd`, and
   `main.gd` with
   [SCRIPT-L08](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08).
   In particular, `resolved` is declared on FallingThing; MatchLine has one
   `area_entered` connection and emits `thing_crossed`; Main has the
   identity/resolved guard, clears `current_thing`, queues the object, starts
   SpawnDelay, and spawns only from timeout. No temporary `Crossed:` print
   remains in the saved checkpoint.

**PASS:** Record L08_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing tree, Inspector, connection, cycle, or
script-comparison fact. **DIAGNOSE:** Use the matching current-step branch,
make one local correction, and repeat only the failed gate.

## Explain it back

Ask the child: “Why does MatchLine send a message to Main instead of deleting
the object itself?” A good answer notices that MatchLine only detects a
crossing, while Main remembers the current object and controls what happens
next. Accept the child's own wording.

## Safe experiment

After L08_COMPLETE is fully observed, an optional experiment may temporarily
change `SpawnDelay` Wait Time from `0.5` to `1.0`. Record
`SpawnDelay Wait Time temporary 1.0` in `experiment_to_revert`, run one
observed cycle, then restore exactly `0.5`, save, and recheck one full cycle.
Do not make SpawnDelay repeating, alter collision layers, add a second object,
score a crossing, or change line-to-kind matching.

## If you stop here

Update the progress state with only observed facts. If L08_COMPLETE has not
passed, keep the current L08.S##.G## gate as `next_action` and record the last
observed tree, Inspector value, connection, script error, or cycle result. If
it has passed, record L08_COMPLETE, set `next_action` to Begin L09.S01, and
use this handoff format:

~~~text
SESSION_HANDOFF
checkpoint: L08_COMPLETE
next_action: Begin L09.S01
observed: FallingThing layer/mask 1/0 and MatchLine layer/mask 2/1 with enabled canonical rectangles
observed: three cycles each removed one crossing object, paused about 0.5 seconds, then spawned one next object
experiment_to_revert: none
~~~

Do not claim the collision configuration, connection count, three-cycle result,
or complete-script comparison unless the learner supplied that evidence.

## Next lesson

Continue with Lesson 09 — Match and Score after the handoff says
L08_COMPLETE. The next lesson compares blue with GUITAR and red with
SPAGHETTI, changes ScoreLabel on a correct match, and deliberately keeps a
mismatch as a temporary no-score result before Lesson 10 adds game over.
