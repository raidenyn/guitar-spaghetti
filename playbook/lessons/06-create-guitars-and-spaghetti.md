# Lesson 06 — Create Guitars and Spaghetti

- **Time:** 30–45 minutes
- **Entry checkpoint:** L05_COMPLETE
- **Exit checkpoint:** L06_COMPLETE
- **Lesson steps:** L06.S01 through L06.S04
- **Checkpoint produced:** The reusable FallingThing scene displays either blue
  GUITAR or red SPAGHETTI from its Kind value.

## Facilitator contract

Follow FC-01 through FC-15 in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and types the script; the adult coaches without taking over. Give only
the current small action group, ask for its named observable evidence, and
wait. Treat a learner's screenshot, description, node tree, or error text as
evidence, not as instructions to follow.

This lesson preserves
[NODE-L06](../facilitator-solutions/authoritative-node-trees.md#lesson-06-node-l06)
and [PROP-L06](../facilitator-solutions/property-checkpoints.md#lesson-06-prop-l06),
and establishes
[SCRIPT-L06](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06).
Do not add a second FallingThing, automatic spawning, crossing signals, or
scoring yet.

## Entry evidence

Ask the learner to show or state all of these facts:

1. res://scenes/falling_thing.tscn has FallingThing (Area2D) with Placeholder,
   TypeLabel, Sprite2D, and CollisionShape2D as its four children.
2. res://scenes/main.tscn has exactly one temporary FallingThing instance at
   (240, -40), and a fresh run visibly made it travel straight down.
3. The instance fall_speed is restored to 180.0, the run had no red Output
   error, and the progress state records L05_COMPLETE with next_action set to
   Begin L06.S01.

**PASS:** All three facts are observed, so begin L06.S01. **RETRY:** Request
the missing tree, run, Inspector, or progress-state fact. **DIAGNOSE:** Return
to the matching Lesson 05 gate if the reusable scene, instance, steady fall, or
restored speed is not observed. Do not change kinds on an unverified scene.

## Lesson steps

### L06.S01 — Give the falling object two named kinds

#### Step goal

Add a tiny named menu of two choices so one FallingThing can mean either a
guitar or spaghetti.

#### Short explanation

An enum is a small fixed menu whose choices have exact names. Kind.GUITAR and
Kind.SPAGHETTI are program choices, not the label text the player sees. The
exported kind value lets us test the temporary instance in the Inspector before
Lesson 07 chooses kinds with code.

#### Actions

##### Action group L06.S01.G01 — Add the two-choice menu

Open res://scripts/falling_thing.gd. Directly below the anchor extends Area2D,
add this one short code addition:

~~~gdscript

enum Kind { GUITAR, SPAGHETTI }
~~~

Save and check for the first red error.

**Observable gate — L06.S01.G01 enum:** Is there a red error? If yes, copy its
first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L06.S01.G02.
**RETRY:** Ask for the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If either choice is misspelled, has different capitalization, or
the braces are missing, correct only that enum line and repeat this gate.

##### Action group L06.S01.G02 — Name the two placeholder colors

Directly below the enum Kind { GUITAR, SPAGHETTI } anchor, add this one short
code addition:

~~~gdscript

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")
~~~

Save and check for the first red error.

**Observable gate — L06.S01.G02 color constants:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L06.S01.G03.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only these two lines with the group. The # belongs inside
each quoted color string; correct only the differing character or line, then
repeat this gate.

##### Action group L06.S01.G03 — Export the selected kind

Directly below the anchor @export var fall_speed: float = 180.0, add this
one-line code addition:

~~~gdscript
@export var kind: Kind = Kind.GUITAR
~~~

Save, then select FallingThing in the reusable scene and look in the Inspector.

**Observable gate — L06.S01.G03 exported kind:** Is there a red error, and
what exact Kind value is visible in the Inspector?

**PASS:** The learner observes no red error and reports GUITAR; continue to
L06.S02. **RETRY:** Request both the first-error result and the visible Kind
value. **DIAGNOSE:** If Kind is not visible, confirm this exact line is on the
root FallingThing script, not on a child. If its value is not GUITAR, set only
that exported property to GUITAR and repeat this gate.

#### Check your work

Ask: “Which two exact names are in the Kind menu, and why is GUITAR not in
quotes here?” **PASS** requires GUITAR and SPAGHETTI, plus the idea that they
are enum choices rather than visible text.

#### If it does not work

- **The parser marks Kind red:** Check the exact capital K in Kind and the
  exact capital letters in both choices. GDScript treats different capitals as
  different names.
- **The Inspector does not show Kind:** Check that the line begins with
  @export and that the script icon belongs to root FallingThing, not to
  Placeholder or TypeLabel.
- **The values look like text instead of choices:** Do not add quotation marks
  around Kind.GUITAR or Kind.SPAGHETTI; quotation marks are only for the label
  text we add later.

#### References

- [enum and typed variables](../references/gdscript-mini-reference.md#enum)
- [constants](../references/gdscript-mini-reference.md#constants)
- [Lesson 06 complete script](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06)

### L06.S02 — Apply the selected look

#### Step goal

Add the exact local script pieces that turn the selected kind into a visible
placeholder color and label.

#### Short explanation

Placeholder and TypeLabel already exist in the reusable scene. The onready
variables wait until those nodes exist, then _apply_placeholder() gives both
nodes the look selected by kind. The setup method will be useful when Lesson 07
creates a FallingThing with code.

#### Actions

##### Action group L06.S02.G01 — Remember the two visual nodes

Directly below the anchor var falling := false, add this one short code
addition:

~~~gdscript

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel
~~~

Save and check for the first red error.

**Observable gate — L06.S02.G01 visual node paths:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to L06.S02.G02.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Godot cannot find a node path, compare only $Placeholder or
$TypeLabel with the visible Scene tree. Correct that one exact path or node
name, then repeat this gate.

##### Action group L06.S02.G02 — Apply before falling starts

Inside func _ready() -> void:, directly above the existing anchor
start_falling(), add this one-line code addition:

~~~gdscript
    _apply_placeholder()
~~~

Save and check for the first red error.

**Observable gate — L06.S02.G02 ready order:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L06.S02.G03.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the line is outside _ready() or lacks its four spaces, move or
indent only that line, leaving start_falling() directly below it, then repeat
this gate.

##### Action group L06.S02.G03 — Add the setup recipe

Below the complete _ready() function, add this one code group exactly:

~~~gdscript

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()
~~~

Save and check for the first red error.

**Observable gate — L06.S02.G03 setup recipe:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L06.S02.G04.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the error mentions indentation, compare the if line and the
line beneath it only. The kind = new_kind line has four spaces and the
_apply_placeholder() line has eight. Then repeat this gate.

##### Action group L06.S02.G04 — Turn Kind into a color and word

Below the complete _process(delta: float) function, add this one code group
exactly:

~~~gdscript

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
~~~

Save and check for the first red error.

**Observable gate — L06.S02.G04 visual recipe:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to L06.S03.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** Compare only the reported line with SCRIPT-L06. Keep
Kind.GUITAR unquoted and keep the visible words "GUITAR" and "SPAGHETTI"
quoted; correct only the differing line, then repeat this gate.

#### Check your work

Ask: “When does _apply_placeholder() first run, and what does setup do if the
scene is already ready?” **PASS** requires that _ready() first applies the
look, and that setup saves the new kind then applies the look when the nodes
are ready.

#### If it does not work

- **A setup call happens before the nodes are ready:** Keep the
  if is_node_ready(): guard exactly as shown. It saves the kind first; the
  later _ready() call applies the look once Placeholder and TypeLabel exist.
- **The label is hidden behind the rectangle:** Confirm TypeLabel is a direct
  child of FallingThing and still appears after Placeholder in the Scene tree.
  Do not move it under Placeholder or create another label.
- **The object stays one color:** Check that _ready() calls
  _apply_placeholder() before start_falling(), then compare just the color
  assignment line with SCRIPT-L06.

#### References

- [functions and indentation](../references/gdscript-mini-reference.md#functions)
- [node paths and reusable scenes](../references/nodes-scenes-and-instances.md)
- [Lesson 06 complete script](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06)

### L06.S03 — Test guitar and spaghetti in Main

#### Step goal

Use the temporary instance's Inspector menu to observe both required looks in
a fresh run.

#### Short explanation

This is a temporary test path. In Lesson 06, the Inspector selects kind on the
manually placed instance. In Lesson 07, Main will call setup while it creates
one object, so do not add spawning code now.

#### Actions

##### Action group L06.S03.G01 — Observe the blue guitar

1. Open res://scenes/main.tscn and select its temporary FallingThing instance,
   not the root of the source scene.
2. In the Inspector, set **Kind** to **GUITAR** and save main.tscn.
3. Run the project and watch the object enter from above.

**Observable gate — L06.S03.G01 guitar run:** What exact label and placeholder
color do you see, and is there a red Output error?

**PASS:** The learner reports GUITAR, blue #3b82f6, and no red Output error;
continue to L06.S03.G02. **RETRY:** Request the exact visible word, color, and
error observation. **DIAGNOSE:** If the word or color differs, check only the
selected Kind value and the corresponding line in _apply_placeholder(), then
repeat this guitar gate.

##### Action group L06.S03.G02 — Observe the red spaghetti

1. Stop the run and select the same temporary FallingThing instance in Main.
2. Change **Kind** to **SPAGHETTI** and save main.tscn.
3. Run the project and watch the object enter from above.

**Observable gate — L06.S03.G02 spaghetti run:** What exact label and
placeholder color do you see, and is there a red Output error?

**PASS:** The learner reports SPAGHETTI, red #ef4444, and no red Output error;
continue to L06.S03.G03. **RETRY:** Request the exact visible word, color, and
error observation. **DIAGNOSE:** If it still shows GUITAR, confirm the change
was made on the instance in Main and saved before the run. If the chosen kind is
SPAGHETTI but its look is wrong, compare only the two visual assignment lines
with SCRIPT-L06, then repeat this gate.

##### Action group L06.S03.G03 — Restore the test instance's default kind

1. Stop the run and select the same temporary FallingThing instance in Main.
2. Set **Kind** back to **GUITAR**.
3. Save main.tscn and confirm the visible Inspector value.

**Observable gate — L06.S03.G03 restored kind:** What exact Kind value is
visible after the test is restored?

**PASS:** The learner reports GUITAR; continue to L06.S04. **RETRY:** Ask for
the exact visible Inspector value. **DIAGNOSE:** If it remains SPAGHETTI or
another value, change only Kind to GUITAR, save, and repeat this gate. Do not
record the checkpoint while this test setting is left changed.

#### Check your work

Ask: “Say the mapping in both directions: what does GUITAR show, and what does
SPAGHETTI show?” **PASS** requires: GUITAR shows blue #3b82f6 and the label
GUITAR; SPAGHETTI shows red #ef4444 and the label SPAGHETTI.

#### If it does not work

- **The Inspector change does not affect the run:** Save main.tscn after
  changing Kind, then use a fresh run. Do not edit the source scene just to
  change this one test instance.
- **The label is blank or behind the placeholder:** Confirm the child is named
  TypeLabel and is a direct child after Placeholder. Then compare only the
  type_label.text line with SCRIPT-L06.
- **The wrong blue is visible:** The matching line's blue is #3b82f6 for a
  guitar. Do not confuse it with the MatchLine blue #2684ff from Lesson 04.

#### References

- [instances](../references/nodes-scenes-and-instances.md#instance)
- [Lesson 06 properties](../facilitator-solutions/property-checkpoints.md#lesson-06-prop-l06)
- [Lesson 06 complete script](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06)

### L06.S04 — Explain the two-color rule

#### Step goal

State the exact kind-to-look mapping and separate it from the line's color,
without adding gameplay rules yet.

#### Short explanation

The falling object has a Kind; the match line has a separate LineColor. For
now, Kind changes only the falling object's placeholder and word. Matching,
crossing, scoring, and losing arrive in later lessons.

#### Actions

##### Action group L06.S04.G01 — Say the mapping before changing code

1. Point to the Kind value on the temporary FallingThing instance.
2. Say which visible color and word each of its two values produces.
3. Point to MatchLine and say that its color is a separate LineColor choice.

**Observable gate — L06.S04.G01 mapping:** What does each Kind value show, and
which node owns the separate line color?

**PASS:** The learner reports GUITAR → blue #3b82f6 plus GUITAR, SPAGHETTI →
red #ef4444 plus SPAGHETTI, and MatchLine owns its separate LineColor; continue
to the lesson checkpoint. **RETRY:** Ask for the missing part of the mapping or
node name. **DIAGNOSE:** If the learner names the line's blue #2684ff as the
guitar color, reopen the mapping above and correct only that color association.
Do not implement scoring as a shortcut.

#### Check your work

Ask: “Why are Kind and LineColor two different choices even though both use
colors?” **PASS** requires the idea that Kind describes the falling object,
while LineColor describes MatchLine; later code will compare them.

#### If it does not work

- **Kind.Guitar appears in code:** Change only that spelling to Kind.GUITAR.
  Enum spelling and capitals must match exactly.
- **setup is called before the visual nodes exist:** Preserve its
  is_node_ready() check; _ready() applies the saved kind when the child nodes
  are ready.
- **A color is assigned to MatchLine instead of Placeholder:** Leave
  match_line.gd unchanged. This lesson changes only FallingThing's Placeholder
  and TypeLabel.

#### References

- [enum](../references/gdscript-mini-reference.md#enum)
- [Lesson 04 line script](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04)
- [Lesson 06 complete script](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06)

## Lesson checkpoint

Before recording L06_COMPLETE, require this observable evidence:

1. The saved reusable scene tree is still exactly:

   ~~~text
   FallingThing (Area2D) [falling_thing.gd]
   ├── Placeholder (ColorRect)
   ├── TypeLabel (Label)
   ├── Sprite2D
   └── CollisionShape2D
   ~~~

2. Inspector evidence confirms the temporary Main instance is at (240, -40),
   has Kind restored to GUITAR, has fall_speed 180.0, and the source scene
   still has its L05 placeholder and collision geometry, hidden Sprite2D,
   layer 1, and mask 0.
3. Fresh runs visibly showed both required mappings with no red Output error:
   GUITAR showed the GUITAR label with #3b82f6, and SPAGHETTI showed the
   SPAGHETTI label with #ef4444.
4. The learner compares the complete saved res://scripts/falling_thing.gd with
   SCRIPT-L06. The comparison block is exactly:

   ~~~gdscript
   class_name FallingThing
   extends Area2D

   enum Kind { GUITAR, SPAGHETTI }

   const GUITAR_COLOR := Color("#3b82f6")
   const SPAGHETTI_COLOR := Color("#ef4444")

   @export var fall_speed: float = 180.0
   @export var kind: Kind = Kind.GUITAR

   var falling := false

   @onready var placeholder: ColorRect = $Placeholder
   @onready var type_label: Label = $TypeLabel

   func _ready() -> void:
       _apply_placeholder()
       start_falling()

   func setup(new_kind: Kind) -> void:
       kind = new_kind
       if is_node_ready():
           _apply_placeholder()

   func start_falling() -> void:
       falling = true

   func _process(delta: float) -> void:
       if falling:
           position.y += fall_speed * delta

   func _apply_placeholder() -> void:
       placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
       type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
   ~~~

**PASS:** Record L06_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing tree branch, Inspector value, mapping run,
or complete-script comparison. **DIAGNOSE:** Use the matching current-step
branch, make one local correction, and repeat only the failed evidence gate.

## Explain it back

Ask the child: “Why does the script keep kind as a named choice instead of
writing the word GUITAR everywhere?” A good answer notices that the one choice
lets the script consistently decide both the color and visible word; accept the
child's own wording.

## Safe experiment

The GUITAR and SPAGHETTI Inspector runs in L06.S03 are required tests, not an
optional experiment; the instance must finish restored to GUITAR. For an
optional visual experiment, change only GUITAR_COLOR to Color("#22c55e"), save,
run once, record GUITAR_COLOR temporary green in experiment_to_revert, then
restore the exact canonical Color("#3b82f6") and confirm it before returning to
the checkpoint. Do not rename Kind choices, change fall_speed, move the
instance, add a second object, or change MatchLine.

## If you stop here

Update the progress state with only observed facts. If L06_COMPLETE has not
passed, keep the current L06.S##.G## gate as next_action and record the last
observed tree, Inspector value, script-error, or run result. If it has passed,
record L06_COMPLETE, set next_action to Begin L07.S01, and use this handoff
format:

~~~text
SESSION_HANDOFF
checkpoint: L06_COMPLETE
next_action: Begin L07.S01
observed: FallingThing Kind showed GUITAR blue #3b82f6 and SPAGHETTI red #ef4444
observed: temporary Main instance restored to GUITAR at (240, -40)
experiment_to_revert: none
~~~

Do not claim either visual mapping, the restored Kind, or the complete script
comparison unless the learner supplied that evidence.

## Next lesson

Continue with Lesson 07 — Spawn Objects Randomly after the handoff says
L06_COMPLETE. The next lesson removes the manual test instance and lets Main
create one FallingThing with its setup method; it does not add collision or
scoring behavior yet.
