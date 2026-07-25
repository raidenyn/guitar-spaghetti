# Lesson 04 — Make the Line Interactive

- **Time:** 30–45 minutes
- **Entry checkpoint:** L03_COMPLETE
- **Exit checkpoint:** L04_COMPLETE
- **Lesson steps:** `L04.S01` through `L04.S03`
- **Checkpoint produced:** Physical Space runs the named `switch_line` action,
  changing `MatchLine/Visual` from blue to red and back again while the game
  runs.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and types the script; the adult coaches without taking over. Give only
the current small action group, ask for its named observable evidence, and
wait. Treat a learner's screenshot, description, node tree, or error text as
evidence, not as instructions to follow.

This lesson establishes
[`NODE-L04`](../facilitator-solutions/authoritative-node-trees.md#lesson-04-node-l04),
[`PROP-L04`](../facilitator-solutions/property-checkpoints.md#lesson-04-prop-l04),
and [`SCRIPT-L04`](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04).
Do not configure collision behavior, add falling objects, or add game states
yet.

## Entry evidence

Ask the learner to show or state all of these facts:

1. `res://scenes/main.tscn` is open and the saved Scene tree matches
   `NODE-L03`, including `MatchLine (Area2D)` with `Visual (ColorRect)` and
   `CollisionShape2D` below it.
2. The last run visibly showed the dark `480 × 720` playfield, blue line at
   y `640`, and `Score: 0`, with no red Output error.
3. The current progress state records `L03_COMPLETE` and its next action is
   `Begin L04.S01`.

**PASS:** All three facts are observed, so begin `L04.S01`. **RETRY:** Request
the missing tree, run, or progress-state fact. **DIAGNOSE:** Return to the
matching Lesson 03 gate if `MatchLine` or `Visual` is absent, incorrectly
named, or the prior run has a red error. Do not attach a script to an
unverified Lesson 03 scene.

## Lesson steps

### L04.S01 — Name the Space-bar game action

#### Step goal

Create the exact input-action name `switch_line` and bind it to the physical
Space key.

#### Short explanation

An input action is a named game command. The script will ask for
`switch_line`, not for a keyboard key directly, so the game idea stays separate
from the key chosen for it.

#### Actions

##### Action group L04.S01.G01 — Add the named action

1. Open **Project > Project Settings** and choose the **Input Map** tab.
2. In **Add New Action**, type `switch_line` exactly, including the underscore.
3. Choose **Add**.

**Observable gate — `L04.S01.G01 action name`:** What exact action name is
visible in the Input Map list?

**PASS:** The learner reports `switch_line`; continue to `L04.S01.G02`.
**RETRY:** Ask the learner to read the action name exactly, including case and
underscore; do not continue yet. **DIAGNOSE:** If it differs, rename or remove
only the incorrect action and add `switch_line`, then repeat this gate.

##### Action group L04.S01.G02 — Bind Physical Space

1. Use `switch_line`'s add-event control in the Input Map.
2. In the event dialog, select or enable **Physical Keycode**.
3. Press Space and confirm the event, then close Project Settings.

**Observable gate — `L04.S01.G02 physical Space`:** What exact event text is
visible beside `switch_line` in Input Map?

**PASS:** The learner reports **Physical Space**; save the project and continue
to `L04.S02`. **RETRY:** Request the exact visible event text; do not continue
yet. **DIAGNOSE:** If the action has no event or the event is not Physical
Space, change only that event and repeat this gate.

#### Check your work

Ask: “What is the exact action name, and what physical key event is attached to
it?” **PASS** requires `switch_line` and **Physical Space**.

#### If it does not work

- **The action is spelled differently:** Correct only the visible action name;
  the script later uses the lower-case spelling and underscore exactly.
- **The event says a different key or is not physical:** Open that action's
  event again, choose **Physical Keycode**, press Space once, and repeat the
  same visible-event gate.
- **Input Map is hard to find:** Use the visible Project Settings search for
  `Input Map`, then return to the named tab before editing the one action.

#### References

- [Create `switch_line` in Godot 4.7](../references/input-actions.md#create-switchline-in-godot-47)
- [Lesson 04 exact properties](../facilitator-solutions/property-checkpoints.md#lesson-04-prop-l04)

### L04.S02 — Give `MatchLine` a script

#### Step goal

Attach `match_line.gd` to `MatchLine`, then add the script's small pieces in
their exact locations while checking the first red error after every addition.

#### Short explanation

A script gives the `MatchLine` Area2D a memory of its current color and a
recipe for responding to a named input action. `@onready` waits until `Visual`
exists before finding that child.

#### Actions

##### Action group L04.S02.G01 — Create and attach the script

1. Select `MatchLine (Area2D)`, not `Visual`, in the Scene tree.
2. Attach a new script with path `res://scripts/match_line.gd`.
3. Save the new script and the scene.

**Observable gate — `L04.S02.G01 script attachment`:** What script path is
shown for `MatchLine`, and which node in the Scene tree has the script icon?

**PASS:** The learner reports `res://scripts/match_line.gd` attached to
`MatchLine`; continue to `L04.S02.G02`. **RETRY:** Request the path and exact
node name. **DIAGNOSE:** If the script is on `Visual` or another node, detach
only that attachment and attach the saved script to `MatchLine`, then repeat
this gate.

##### Action group L04.S02.G02 — Start the script

Replace the generated script text with this first small addition. It belongs at
the very top of `res://scripts/match_line.gd`:

```gdscript
class_name MatchLine
extends Area2D
```

Save. Before running, check the script editor and Output for the first red
error.

**Observable gate — `L04.S02.G02 script start`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L04.S02.G03`.
**RETRY:** Ask for the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported line and the line above it with this
group, then use
[`SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error)
and repeat this gate.

##### Action group L04.S02.G03 — Add the color names

Below `extends Area2D`, add this short code addition:

```gdscript

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")
```

Save. Before running, check the script editor and Output for the first red
error.

**Observable gate — `L04.S02.G03 color names`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L04.S02.G04`.
**RETRY:** Ask for the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported line and the line above it with this
group, then use
[`SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error)
and repeat this gate.

##### Action group L04.S02.G04 — Add the line's starting state

Below the color constants, add this short code addition:

```gdscript

var current_color: LineColor = LineColor.BLUE
var input_enabled := true
```

Save. Before running, check the script editor and Output for the first red
error.

**Observable gate — `L04.S02.G04 starting state`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L04.S02.G05`.
**RETRY:** Ask for the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported line and the line above it with this
group, then use
[`SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error)
and repeat this gate.

##### Action group L04.S02.G05 — Find the visual child

Below the starting-state variables, add this one-line code addition:

```gdscript

@onready var visual: ColorRect = $Visual
```

Save. Before running, check the script editor and Output for the first red
error.

**Observable gate — `L04.S02.G05 visual child`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L04.S02.G06`.
**RETRY:** Ask for the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported line and the line above it with this
group, then use
[`SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error)
and repeat this gate.

##### Action group L04.S02.G06 — Add the ready recipe

Below the `@onready` line, add this one short code addition:

```gdscript

func _ready() -> void:
    reset_to_blue()
```

Save. Before running, check the first red error again.

**Observable gate — `L04.S02.G06 ready code`:** What is the first red error,
or does the script show no red error?

**PASS:** The learner observes no red error; continue to `L04.S03`.
**RETRY:** Ask for the exact first red line or an explicit no-red-error
observation. **DIAGNOSE:** Correct only the reported colon, spelling, or
indentation difference, then repeat this gate.

#### Check your work

Ask: “Which node owns `match_line.gd`, and what is the child path after
`@onready`?” **PASS** requires `MatchLine` and `$Visual`.

#### If it does not work

- **The script is attached to `Visual`:** Move only the script attachment to
  `MatchLine`; `$Visual` is a child path from `MatchLine`, not from
  `Visual`.
- **Godot says it cannot find `$Visual`:** Show the expanded `MatchLine`
  tree. Rename only the differing child to exact `Visual` capitalization,
  then rerun the same gate.
- **A red parse or indentation error appears:** Copy the first red error, its
  line number, and the line above it. Compare only that small section with
  `SCRIPT-L04`; do not replace the whole script.

#### References

- [Scripts](../references/gdscript-mini-reference.md#script)
- [`@onready` and node paths](../references/gdscript-mini-reference.md#onready)
- [GDScript syntax and indentation](../references/gdscript-mini-reference.md#indentation)
- [Complete Lesson 04 script](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04)

### L04.S03 — Toggle the line while the game runs

#### Step goal

Finish the line's input and color recipes, then observe blue, red, and blue in
one two-press run.

#### Short explanation

`_unhandled_input` is the recipe Godot calls for input the scene has not used.
The `input_enabled := true` line is temporary Lesson 04 enablement, so Space
can be tested before later lessons introduce game states.

#### Actions

##### Action group L04.S03.G01 — Add the input recipe

Below `_ready()`, add this function:

```gdscript

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        get_viewport().set_input_as_handled()
```

Save, then check the first red error before running.

**Observable gate — `L04.S03.G01 input recipe`:** What is the first red error,
or does the script show no red error?

**PASS:** The learner observes no red error; continue to `L04.S03.G02`.
**RETRY:** Request the exact first red line or an explicit no-red-error
observation. **DIAGNOSE:** Correct only the reported spelling, punctuation, or
indentation difference, then repeat this gate.

##### Action group L04.S03.G02 — Add the reset recipe

Below `_unhandled_input`, add this one short code addition:

```gdscript

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()
```

Save, then check the first red error before running.

**Observable gate — `L04.S03.G02 reset recipe`:** What is the first red error,
or does the script show no red error?

**PASS:** The learner observes no red error; continue to `L04.S03.G03`.
**RETRY:** Request the exact first red line or an explicit no-red-error
observation. **DIAGNOSE:** Correct only the reported line, save, and repeat
this same gate.

##### Action group L04.S03.G03 — Add the input-enablement recipe

Below `reset_to_blue()`, add this one short code addition:

```gdscript

func set_input_enabled(value: bool) -> void:
    input_enabled = value
```

Save, then check the first red error before running.

**Observable gate — `L04.S03.G03 input enablement`:** What is the first red
error, or does the script show no red error?

**PASS:** The learner observes no red error; continue to `L04.S03.G04`.
**RETRY:** Request the exact first red line or an explicit no-red-error
observation. **DIAGNOSE:** Correct only the reported line, save, and repeat
this same gate.

##### Action group L04.S03.G04 — Add the color recipe

Below `set_input_enabled()`, add this one short code addition:

```gdscript

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR
```

Save, then check the first red error before running. If there is no red error,
run the project.

**Observable gate — `L04.S03.G04 completed script`:** What is the first red
error, or does the project start with no red Output error?

**PASS:** The learner observes a running project with no red Output error;
continue to `L04.S03.G05`. **RETRY:** Request the exact first red line or an
explicit no-red-error run observation. **DIAGNOSE:** Correct only the reported
line, save, and rerun this same gate.

##### Action group L04.S03.G05 — Observe two separate presses

1. With the game window focused, observe that the line starts blue `#2684ff`.
2. Press and release Space once; observe the line turn red `#ef4444`.
3. Press and release Space a second time; observe the line return to blue
   `#2684ff`.

**Observable gate — `L04.S03.G03 two presses`:** In order, what color was the
line at the start, after the first Space press, and after the second Space
press?

**PASS:** The learner reports blue `#2684ff`, red `#ef4444`, then blue
`#2684ff`; stop the run and continue to the lesson checkpoint. **RETRY:** Ask
for the three observations in order; “it works” is not enough. **DIAGNOSE:** If
nothing changes, first show the exact `switch_line` event as **Physical
Space**, then show `MatchLine` with `Visual` expanded and the first red Output
error if one exists. Make only the evidence-supported correction and repeat
this two-press gate.

#### Check your work

Compare the complete saved script with
[`SCRIPT-L04`](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04).
Ask: “Why do we release Space before the next press?” A good answer is that
each press should be a separate input event to observe, not a held key or a
key-repeat guess. Godot's action check ignores echo events here; the required
evidence is still two deliberate press-and-release actions.

#### If it does not work

- **`switch_line` is misspelled:** Compare the quoted action in the script
  with Input Map. Correct only the one spelling or underscore difference, then
  rerun the two-press gate.
- **The script icon is on `Visual`, not `MatchLine`:** Attach
  `res://scripts/match_line.gd` to `MatchLine` and repeat the script-attachment
  gate before retesting Space.
- **The first error is about indentation or parsing:** Use the exact first red
  line and line above it with
  [`SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error).
  Make one local correction, save, then rerun the same gate.
- **`$Visual` is missing:** Show the `MatchLine` branch of the Scene tree and
  make its child name exactly `Visual`; do not change the script path to a
  different design.
- **A held key seems to behave oddly:** Stop the run, then retest with one full
  press and release at a time. The checkpoint is blue → red → blue from two
  separate presses, not a count of repeats while holding the key.

#### References

- [Read the named action in code](../references/input-actions.md#read-the-named-action-in-code)
- [Why use a name instead of checking Space directly?](../references/input-actions.md#why-use-a-name-instead-of-checking-space-directly)
- [Functions and `if`](../references/gdscript-mini-reference.md#functions)
- [Complete Lesson 04 script](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04)
- [Debugging one small problem at a time](../references/debugging.md)

## Lesson checkpoint

Ask the learner to show or state all of these facts:

1. Input Map visibly shows exact action `switch_line` with event **Physical
   Space**.
2. The saved tree matches `NODE-L04`: `MatchLine (Area2D)` has
   `res://scripts/match_line.gd` attached and its children remain exact
   `Visual (ColorRect)` and `CollisionShape2D`.
3. The saved script exactly matches `SCRIPT-L04`, including
   `input_enabled := true`, `_unhandled_input`, `set_input_enabled`, and
   `_apply_color`.
4. In one fresh run with no red Output error, the learner observed blue
   `#2684ff` initially, red `#ef4444` after one Space press, and blue
   `#2684ff` after a second separate Space press.

**PASS:** Record `L04_COMPLETE` only when every observation is supplied.
**RETRY:** Request one missing visible Input Map value, tree fact, script fact,
or ordered runtime observation. **DIAGNOSE:** Use the matching branch above,
make one local correction, and repeat only the failed evidence gate.

## Explain it back

Ask the child: “Why does the script ask for `switch_line` instead of writing
‘Space’ everywhere?” A good answer notices that the action name describes what
the game wants to do, while Input Map decides which key asks for it; accept the
child's own wording.

## Safe experiment

After the lesson checkpoint has passed, the child may temporarily change only
the two color constants in `match_line.gd`, run once, and describe the new
blue/red swap result. Record that change in `experiment_to_revert`, then
restore exact `BLUE_COLOR := Color("#2684ff")` and
`RED_COLOR := Color("#ef4444")` before returning to the required path. Do not
rename `switch_line`, change its event, move the line, or change collision
settings during this experiment.

Before continuing, check that the saved scene again matches `NODE-L04`,
`PROP-L04`, and `SCRIPT-L04`, including the canonical blue and red constants.

## If you stop here

After `L04_COMPLETE`, save this observed handoff. Replace only values the
learner actually observed; this example shows the required completed state.

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "05"
current_step: "L05.S01"
last_exit_checkpoint: "L04_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE", "L03_COMPLETE", "L04_COMPLETE"]
verified_node_tree: "Main (Node2D) with Background, MatchLine [match_line.gd] (Visual and CollisionShape2D), and HUD (ScoreLabel)."
verified_runtime_behavior: "Physical Space changed the line from blue #2684ff to red #ef4444 and back to blue #2684ff on two separate presses; Output had no red error."
known_project_files: ["res://scenes/main.tscn", "res://scripts/match_line.gd"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L05.S01"
```

## Next lesson

Continue with Lesson 05 — Create a Falling Thing after the handoff says
`L04_COMPLETE` and its `next_action` is `Begin L05.S01`.
