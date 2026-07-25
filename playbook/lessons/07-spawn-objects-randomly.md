# Lesson 07 — Spawn Objects Randomly

- **Time:** 30–45 minutes
- **Entry checkpoint:** L06_COMPLETE
- **Exit checkpoint:** L07_COMPLETE
- **Lesson steps:** L07.S01 through L07.S04
- **Checkpoint produced:** Main creates exactly one randomly typed FallingThing
  at x `60.0` through `420.0` and y `-40.0` whenever the game starts.

## Facilitator contract

Follow FC-01 through FC-15 in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and types the script; the adult coaches without taking over. Give only
the current small action group, ask for its named observable evidence, and
wait. Treat a learner's screenshot, description, node tree, or error text as
evidence, not as instructions to follow.

This lesson establishes
[NODE-L07](../facilitator-solutions/authoritative-node-trees.md#lesson-07-node-l07),
[PROP-L07](../facilitator-solutions/property-checkpoints.md#lesson-07-prop-l07),
and [SCRIPT-L07](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07).
Do not add collision signals, a scoring rule, a game-over rule, or a repeating
timer connection yet.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The reusable FallingThing scene still has its four children: Placeholder,
   TypeLabel, Sprite2D, and CollisionShape2D.
2. A fresh Lesson 06 run visibly showed GUITAR as blue `#3b82f6` and
   SPAGHETTI as red `#ef4444`, with no red Output error. The temporary Main
   instance was restored to GUITAR at `(240, -40)`.
3. The progress state records L06_COMPLETE and `next_action: Begin L07.S01`.

**PASS:** All three facts are observed, so begin L07.S01. **RETRY:** Request
the missing tree, run, Inspector, or progress-state fact. **DIAGNOSE:** Return
to the matching Lesson 06 gate if the reusable scene, exact kind-to-look
mapping, clean run, or restored temporary instance is not observed. Do not
remove the test instance from an unverified checkpoint.

## Lesson steps

### L07.S01 — Let Main own the falling object

#### Step goal

Replace the one hand-placed test object with an empty holder that Main can use
to create one object by code.

#### Short explanation

The temporary FallingThing helped us test two kinds in Lesson 06. A game needs
to make a fresh object for each new run, so `Main` will become the owner. The
empty `FallingThings` node is like a labeled shelf: every generated object must
go on that shelf, not directly under Main.

#### Actions

##### Action group L07.S01.G01 — Remove only the temporary test instance

1. Open `res://scenes/main.tscn` and select the temporary **FallingThing**
   instance directly below Main.
2. Delete that one instance, choosing **Delete** if Godot asks whether to
   delete the instance or its source scene.
3. Save `main.tscn`.

**Observable gate — L07.S01.G01 manual instance removed:** What children are
now visible directly below Main, and is a FallingThing instance still there?

**PASS:** The learner reports that the temporary FallingThing is gone while
Background, MatchLine, and HUD remain. Continue to L07.S01.G02. **RETRY:** Ask
for the exact visible Main children. **DIAGNOSE:** If the source scene was
deleted or another Main child disappeared, undo only that deletion, then delete
the FallingThing *instance* under Main and repeat this gate.

##### Action group L07.S01.G02 — Add the generated-object shelf

1. Select Main and add a **Node2D** child.
2. Name it exactly **FallingThings**.
3. Save `main.tscn`.

**Observable gate — L07.S01.G02 object holder:** What exact new child name and
type are visible directly below Main?

**PASS:** The learner reports FallingThings (Node2D); continue to L07.S01.G03.
**RETRY:** Request the exact visible name and type. **DIAGNOSE:** If it has a
different type, spelling, capitalization, or parent, correct just that node
and repeat this gate.

##### Action group L07.S01.G03 — Add the future half-second timer

1. Select Main and add a **Timer** child.
2. Name it exactly **SpawnDelay**.
3. Save `main.tscn`.

**Observable gate — L07.S01.G03 timer node:** What exact new child name and
type are visible directly below Main?

**PASS:** The learner reports SpawnDelay (Timer); continue to L07.S01.G04.
**RETRY:** Request the exact visible name and type. **DIAGNOSE:** If the Timer
is below FallingThings or has a different name, move or rename only that Timer,
then repeat this gate.

##### Action group L07.S01.G04 — Set the timer's prepared values

With SpawnDelay selected, set these three Inspector values:

1. **Wait Time**: `0.5`.
2. **One Shot**: on.
3. **Autostart**: off, then save `main.tscn`.

**Observable gate — L07.S01.G04 timer settings:** What values do you see for
Wait Time, One Shot, and Autostart?

**PASS:** The learner reports `0.5`, on, and off; continue to L07.S02.
**RETRY:** Request the missing exact Inspector value. **DIAGNOSE:** If one
value differs, change only that value and repeat this gate. The timer is not
connected or started in this lesson.

#### Check your work

Ask: “Where will a generated FallingThing be placed in the Scene tree?”
**PASS** requires `FallingThings`, not directly below Main.

#### If it does not work

- **Two FallingThings appear in the tree:** The manually placed test instance
  was left behind. Delete only that instance; keep the empty FallingThings
  Node2D.
- **SpawnDelay starts immediately:** Turn Autostart off. A later lesson decides
  when its half-second wait begins.
- **The holder is named FallingThing:** Rename it to the plural
  `FallingThings`; the script path depends on that exact name.

#### References

- [instances and reusable scenes](../references/nodes-scenes-and-instances.md)
- [timer settings](../references/timers-and-randomness.md#spawndelay-waits-then-announces-timeout)
- [Lesson 07 node tree](../facilitator-solutions/authoritative-node-trees.md#lesson-07-node-l07)
- [Lesson 07 properties](../facilitator-solutions/property-checkpoints.md#lesson-07-prop-l07)

### L07.S02 — Prepare FallingThing for Main's setup call

#### Step goal

Make the reusable scene wait for Main to choose its kind and tell it when to
start falling.

#### Short explanation

The Inspector chose `kind` only for the temporary Lesson 06 test. Now Main
will call `setup` before the new object joins the scene tree, then start it
after it is added. This keeps the choice and the movement under Main's control.

#### Actions

##### Action group L07.S02.G01 — Make kind a script value, not an Inspector test

Open `res://scripts/falling_thing.gd`. Replace this exact line:

~~~gdscript
@export var kind: Kind = Kind.GUITAR
~~~

with this one line:

~~~gdscript
var kind: Kind = Kind.GUITAR
~~~

Save and check for the first red error.

**Observable gate — L07.S02.G01 script-owned kind:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S02.G02.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Kind is still exported, compare only this one line. Keep
`Kind.GUITAR` exactly capitalized, but remove only `@export`, then repeat this
gate.

##### Action group L07.S02.G02 — Wait for Main to start movement

Inside `func _ready() -> void:`, delete only this line:

~~~gdscript
    start_falling()
~~~

Leave `_apply_placeholder()` in place. Save and check for the first red error.

**Observable gate — L07.S02.G02 ready behavior:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If `_apply_placeholder()` was also removed, restore only that
line inside `_ready()` and leave `start_falling()` out, then repeat this gate.

#### Check your work

Ask: “Which script now chooses kind and calls `start_falling()`?” **PASS**
requires Main for both answers.

#### If it does not work

- **The new object has no visible word or color:** Keep `_apply_placeholder()`
  in `_ready()`. `setup` saves the chosen kind before the scene is ready, and
  `_ready()` applies that saved choice when its child nodes exist.
- **The object begins falling before Main says so:** Check that the only
  `start_falling()` call removed here was the one inside FallingThing `_ready()`.
- **The Inspector still offers Kind:** Confirm the line starts `var kind`, not
  `@export var kind`.

#### References

- [variables and functions](../references/gdscript-mini-reference.md)
- [Lesson 07 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07)

### L07.S03 — Teach Main to create one random object

#### Step goal

Attach `main.gd` and add the small script pieces that create one random guitar
or spaghetti object at a safe starting position.

#### Short explanation

`preload` remembers the FallingThing scene so `instantiate()` can make a fresh
copy. Main picks a kind and position first, calls `setup`, adds the copy to the
FallingThings shelf, remembers it as `current_thing`, and then starts its fall.
Calling `setup` before `add_child` is safe because FallingThing `_ready()` will
apply the saved kind after its visual child nodes are ready.

#### Actions

##### Action group L07.S03.G01 — Attach Main's script

1. Select the Main (Node2D) root, not a child.
2. Attach a script at exactly `res://scripts/main.gd`.
3. Save the script and `main.tscn`.

**Observable gate — L07.S03.G01 main script:** What script path is shown on
Main, and which exact node has the script icon?

**PASS:** The learner reports `res://scripts/main.gd` on Main; continue to
L07.S03.G02. **RETRY:** Request both the path and node name. **DIAGNOSE:** If
the script is on FallingThings or another child, detach only that attachment
and attach the saved script to Main, then repeat this gate.

##### Action group L07.S03.G02 — Remember the reusable scene

Directly below the anchor `extends Node2D`, add this one line:

~~~gdscript

const FALLING_THING_SCENE: PackedScene = preload("res://scenes/falling_thing.tscn")
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G02 preload:** Is there a red error? If yes, copy
its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L07.S03.G03.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Godot says it cannot find the resource, correct only the path
inside the quotes to `res://scenes/falling_thing.tscn`, then repeat this gate.

##### Action group L07.S03.G03 — Name the screen and spawn limits

Directly below the preload line, add this short code addition:

~~~gdscript
const WINDOW_WIDTH := 480.0
const SPAWN_Y := -40.0
const HORIZONTAL_MARGIN := 60.0
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G03 spawn constants:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.G04.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported constant line with this group. Keep the
minus sign in `-40.0`; it means the object begins just above the screen.

##### Action group L07.S03.G04 — Remember the current object

Directly below the constant group, add this one line:

~~~gdscript

var current_thing: FallingThing
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G04 current object:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.G05.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If FallingThing is unknown, first confirm the preload path and
the class name in `falling_thing.gd`; then correct only the reported name and
repeat this gate.

##### Action group L07.S03.G05 — Find Main's two helper nodes

Directly below the `var current_thing` anchor, add this code group:

~~~gdscript

@onready var falling_things: Node2D = $FallingThings
@onready var spawn_delay: Timer = $SpawnDelay
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G05 node paths:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L07.S03.G06.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a node path is not found, compare only `$FallingThings` or
`$SpawnDelay` with the exact Scene tree name, then repeat this gate.

##### Action group L07.S03.G06 — Spawn once when Main is ready

Below the complete `@onready` group, add this code group:

~~~gdscript

func _ready() -> void:
    _spawn_thing()
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G06 startup call:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L07.S03.G07.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the call is not indented, give `_spawn_thing()` its four
spaces inside `_ready()`, then repeat this gate.

##### Action group L07.S03.G07 — Start the one-object safety check

Below the complete `_ready()` function, add this code group:

~~~gdscript

func _spawn_thing() -> void:
    if is_instance_valid(current_thing):
        return
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G07 one-object check:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.G08.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the return line is not eight spaces in, correct only its
indentation and repeat this gate.

##### Action group L07.S03.G08 — Make a fresh copy and choose its kind

Inside `_spawn_thing()`, directly below the `return` anchor, add this code
group exactly:

~~~gdscript
    var thing := FALLING_THING_SCENE.instantiate() as FallingThing
    var random_kind := (
        FallingThing.Kind.GUITAR
        if randi_range(0, 1) == 0
        else FallingThing.Kind.SPAGHETTI
    )
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G08 copied random kind:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.G09.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the error points to the copy line, check the spelling
`instantiate()` and the exact preload constant. If it points to the choice,
compare only this whole choice group with SCRIPT-L07, then repeat this gate.

##### Action group L07.S03.G09 — Choose the look and safe start position

Directly below the complete random-kind group, add this code group:

~~~gdscript
    thing.setup(random_kind)
    thing.position = Vector2(
        randf_range(HORIZONTAL_MARGIN, WINDOW_WIDTH - HORIZONTAL_MARGIN),
        SPAWN_Y
    )
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G09 setup and position:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S03.G10.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the x value is outside the intended range, restore exactly
`randf_range(HORIZONTAL_MARGIN, WINDOW_WIDTH - HORIZONTAL_MARGIN)`. Do not use
the whole window width as the range.

##### Action group L07.S03.G10 — Put it on the shelf and start it

Directly below the complete position group, add this code group:

~~~gdscript
    falling_things.add_child(thing)
    current_thing = thing
    thing.start_falling()
~~~

Save and check for the first red error.

**Observable gate — L07.S03.G10 complete spawn method:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L07.S04.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the object appears directly below Main, compare only the first
line with `falling_things.add_child(thing)`. If it does not move, confirm only
the last line is `thing.start_falling()`, then repeat this gate.

#### Check your work

Ask: “Put these in order: choose kind, set up the object, add it to
FallingThings, and start it.” **PASS** requires that `setup` is before
`add_child`, and `start_falling` is after Main adds the object.

#### If it does not work

- **Godot cannot load the PackedScene:** Check the quoted preload path exactly:
  `res://scenes/falling_thing.tscn`.
- **`instantiate` is red:** It is spelled `instantiate()` with one `n` after
  `i` and ends with parentheses.
- **The generated object is below Main:** Change only its parent line to
  `falling_things.add_child(thing)`.
- **Two objects appear:** Check that the manual Lesson 06 instance is gone and
  that `current_thing = thing` remains below the add-child line.

#### References

- [preload, typed values, and functions](../references/gdscript-mini-reference.md)
- [instances](../references/nodes-scenes-and-instances.md#instance)
- [random kind and position](../references/timers-and-randomness.md#random-guitar-or-spaghetti)
- [Lesson 07 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07)

### L07.S04 — Observe random starts honestly

#### Step goal

Run the game enough times to observe one generated object per run, both kinds,
and safe horizontal starts without pretending that a few runs prove randomness.

#### Short explanation

Each run starts with a new random choice. Random does not mean blue then red in
a perfect pattern: several guitars in a row can happen by coincidence. Five
runs are a useful check for visible behavior, but a repeated type is a reason
to collect clearer evidence, not a code error by itself.

#### Actions

##### Action group L07.S04.G01 — Inspect one generated object

1. Run the project and, while the object is still visible, switch to Godot's
   **Remote** Scene tree; first note its visible word, GUITAR or SPAGHETTI.
2. Open Main, then FallingThings, and select its one FallingThing child.
3. Read its position x and y in the Inspector, then stop the run.

**Observable gate — L07.S04.G01 one generated object:** What visible word
appeared, what exact x and y position did you see, and how many FallingThing
children were inside FallingThings?

**PASS:** The learner reports one child, y `-40`, and x from `60.0` through
`420.0`; continue to L07.S04.G02. **RETRY:** Request the missing Kind,
position, or child count. **DIAGNOSE:** If the child is under Main or there are
two children, return to the matching L07.S01 or L07.S03 gate. If x or y is out
of range, return only to L07.S03.G09. Do not add a timer loop to compensate.

##### Action group L07.S04.G02 — Collect five fresh-run observations

1. Run the project five separate times, stopping each run after you see the
   object begin above the playfield.
2. For each run, record the visible word: GUITAR or SPAGHETTI.
3. Also record whether it began safely inside the left and right margins.

**Observable gate — L07.S04.G02 five-run check:** Tell me the five observed
words and whether every start stayed inside both margins. Did both words appear
at least once?

**PASS:** The learner reports five observations, every start inside the
margins, and at least one GUITAR plus one SPAGHETTI; continue to the lesson
checkpoint. **RETRY:** If the observations are incomplete, request the missing
runs. If all five happen to be one kind, run up to five additional fresh runs
and report them; that repetition is not a code failure. **DIAGNOSE:** If a run
shows a red Output error, a label/color mismatch, an object outside a margin,
or more than one generated object, use the matching current-step branch and
repeat this gate.

#### Check your work

Ask: “Why can five guitars in a row still be random?” **PASS** requires the
idea that every run makes an independent random choice; random does not promise
alternation.

#### If it does not work

- **Only one visible type appeared in five runs:** This is a **RETRY**, not a
  diagnosis. Run up to five more fresh runs and record the observations.
- **A start is too close to an edge:** Compare only the `randf_range` line with
  SCRIPT-L07; it must use the `60.0` margins through the named constants.
- **The line changes color but the object kind seems wrong:** MatchLine's
  LineColor is separate from FallingThing Kind. Check the object's visible word
  and placeholder color, not the line color.

#### References

- [checking the visible result](../references/timers-and-randomness.md#check-the-visible-result)
- [movement and coordinates](../references/coordinates-movement-and-delta.md)
- [Lesson 07 properties](../facilitator-solutions/property-checkpoints.md#lesson-07-prop-l07)

## Lesson checkpoint

Before recording L07_COMPLETE, require this observable evidence:

1. The saved Main tree matches NODE-L07: it has FallingThings (Node2D) and
   SpawnDelay (Timer), no manually placed FallingThing, and no extra generated
   object in the saved scene.
2. SpawnDelay shows wait time `0.5`, One Shot on, and Autostart off.
3. A Remote-tree run showed exactly one FallingThing child below FallingThings,
   with y `-40` and x from `60.0` through `420.0`.
4. Five fresh-run observations showed starts within both margins and eventually
   showed both GUITAR blue `#3b82f6` and SPAGHETTI red `#ef4444`, with no red
   Output error. If the first five matched by chance, the learner supplied the
   additional observed runs rather than treating repetition as a defect.
5. The learner compares the complete saved `falling_thing.gd`, `match_line.gd`,
   and `main.gd` with
   [SCRIPT-L07](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07).
   In particular, `falling_thing.gd` has unexported `var kind`, `_ready()` only
   applies the placeholder, and `main.gd` uses the exact preload, position
   range, `falling_things.add_child(thing)`, and `thing.start_falling()` order.

**PASS:** Record L07_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing tree branch, timer value, Remote-tree run,
fresh-run observation, or complete-script comparison. **DIAGNOSE:** Use the
matching current-step branch, make one local correction, and repeat only the
failed evidence gate.

## Explain it back

Ask the child: “Why does Main call `setup` before it adds a FallingThing to the
tree?” A good answer notices that Main saves the chosen kind first, then the
new scene's `_ready()` can apply the correct color and word once its child
nodes are ready. Accept the child's own wording.

## Safe experiment

After L07_COMPLETE is fully observed, an optional experiment may temporarily
change only `HORIZONTAL_MARGIN` from `60.0` to `100.0`. Record
`HORIZONTAL_MARGIN temporary 100.0` in `experiment_to_revert`, run once and
notice the narrower safe area, then restore exactly `60.0`, save, and recheck
one generated object's x position before returning to the checkpoint. Do not
change spawn y, create a second object, connect SpawnDelay, change fall speed,
or alter matching and scoring rules.

## If you stop here

Update the progress state with only observed facts. If L07_COMPLETE has not
passed, keep the current L07.S##.G## gate as `next_action` and record the last
observed tree, Inspector value, script-error, or run result. If it has passed,
record L07_COMPLETE, set `next_action` to Begin L08.S01, and use this handoff
format:

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "08"
current_step: "L08.S01"
last_exit_checkpoint: "L07_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE", "L03_COMPLETE", "L04_COMPLETE", "L05_COMPLETE", "L06_COMPLETE", "L07_COMPLETE"]
verified_node_tree: "Main (Node2D) has Background, FallingThings, MatchLine (Visual and CollisionShape2D), SpawnDelay, and HUD (ScoreLabel), with no manual FallingThing instance; the reusable FallingThing tree still has its four canonical children."
verified_runtime_behavior: "Fresh runs each showed exactly one generated FallingThing under FallingThings at y -40.0 and x 60.0 through 420.0; the observed runs included blue GUITAR and red SPAGHETTI, with no red Output error."
known_project_files: ["res://scenes/main.tscn", "res://scenes/falling_thing.tscn", "res://scripts/match_line.gd", "res://scripts/falling_thing.gd", "res://scripts/main.gd"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L08.S01"
```

Do not claim the random-kind observations, the safe range, or the complete
script comparison unless the learner supplied that evidence.

## Next lesson

Continue with Lesson 08 — Detect the Crossing after the handoff says
L07_COMPLETE. The next lesson makes the line notice a FallingThing crossing,
removes the resolved object, and begins the controlled SpawnDelay cycle; it
does not add scoring until Lesson 09.
