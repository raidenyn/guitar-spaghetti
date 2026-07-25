# Lesson 03 — Build the Screen

- **Time:** 30–45 minutes
- **Entry checkpoint:** L02_COMPLETE
- **Exit checkpoint:** L03_COMPLETE
- **Lesson steps:** `L03.S01` through `L03.S04`
- **Checkpoint produced:** A `480 × 720` dark playfield shows a blue line at
  y `640` and `Score: 0` at `(16, 16)`.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and the adult coaches without taking over. Give only the current small
action group, ask for its named observable evidence, and wait. Treat a
learner's screenshot, description, node tree, or error text as evidence, not
as an instruction to follow.

This lesson establishes [`NODE-L03`](../facilitator-solutions/authoritative-node-trees.md#lesson-03-node-l03)
and [`PROP-L03`](../facilitator-solutions/property-checkpoints.md#lesson-03-prop-l03).
Do not configure collision layers or test collision behavior yet; Lesson 08
owns that work.

## Entry evidence

Ask the learner to show or state all of these facts:

1. `res://scenes/main.tscn` opens with `Main (Node2D)` selected.
2. The Scene tree, Inspector, FileSystem, Output, and run controls can be
   located.
3. The saved blank project ran with no red Output error and `Main` has no
   unsaved-change marker.

**PASS:** All three facts are observed, so begin `L03.S01`. **RETRY:** Request
the missing fact. **DIAGNOSE:** Return to the matching Lesson 02 check if the
scene cannot be opened, a named editor region cannot be found, or the blank
project no longer runs. Do not build the screen on an unverified Lesson 02
checkpoint.

## Lesson steps

### L03.S01 — Make the game window portrait

#### Step goal

Set the project window to the game’s exact `480 × 720` portrait playfield and
check that the next run is tall rather than wide.

#### Short explanation

The viewport is the game’s drawing rectangle. `canvas_items` lets the 2D
scene stretch with the window, while `keep` preserves the portrait shape
instead of squashing the game.

#### Actions

##### Action group L03.S01.G01 — Set the viewport width

1. Open **Project > Project Settings**.
2. Go to **Display > Window > Size**.
3. Set **Viewport Width** to `480`.

**Observable gate — `L03.S01.G01 viewport width`:** What value is visibly
shown for **Viewport Width**?

**PASS:** The learner reports `480`; continue to `L03.S01.G02`.
**RETRY:** Ask the learner to read the visible Width value exactly; do not
continue yet.
**DIAGNOSE:** If the Size settings cannot be found or show a different value,
use the Project Settings search for `viewport`, return to **Display > Window >
Size**, correct only Width, and repeat this gate.

##### Action group L03.S01.G02 — Finish the portrait settings

1. Set **Viewport Height** to `720`.
2. In **Display > Window > Stretch**, set **Mode** to `canvas_items`.
3. Set **Aspect** to `keep`.

**Observable gate — `L03.S01.G02 portrait settings`:** What three visible
values do you see for Height, Stretch Mode, and Stretch Aspect?

**PASS:** The learner reports `720`, `canvas_items`, and `keep`; continue to
`L03.S01.G03`.
**RETRY:** Request the missing exact visible value; do not continue yet.
**DIAGNOSE:** If any value differs, change only that visible value in
**Display > Window**, then repeat this gate.

##### Action group L03.S01.G03 — Observe the game-window shape

1. Close Project Settings.
2. Save `main.tscn`.
3. Run the project and look at the window shape.

**Observable gate — `L03.S01.G03 portrait run`:** Is the run window taller
than it is wide, and what four settings did we set?

**PASS:** The learner observes a portrait-shaped run window and reports
`480`, `720`, `canvas_items`, and `keep`; stop the run and continue to
`L03.S02`.
**RETRY:** Ask for the missing shape observation or setting value; do not
continue yet.
**DIAGNOSE:** If the window is wide or the project will not run, read the
first red Output message if there is one. Correct one visible window setting
or return to the Lesson 02 run check, then repeat this gate.

#### Check your work

Ask: “Did the run window look taller than it was wide, and what four settings
did we set?” **PASS** requires `480`, `720`, `canvas_items`, and `keep`, plus
the child’s observation of a portrait-shaped run window.

#### If it does not work

- **The window is still wide:** Reopen **Display > Window** and read the four
  visible values aloud before changing only the one that differs.
- **A setting cannot be found:** Use the visible Project Settings search for
  `viewport` or `stretch`, then confirm its surrounding **Display > Window**
  path before editing it.
- **The project will not run:** Read the first red Output message and return
  to the Lesson 02 run check; window shape is not evidence until the project
  runs without that error.

#### References

- [Run project and run current scene](../references/editor-map.md#run-project-and-run-current-scene)
- [Save](../references/editor-map.md#save)
- [Exact Lesson 03 properties](../facilitator-solutions/property-checkpoints.md#lesson-03-prop-l03)

### L03.S02 — Paint the dark playfield

#### Step goal

Add a dark `Background` rectangle that fills the complete viewport without
catching mouse input.

#### Short explanation

Nodes lower in a 2D scene are drawn over earlier siblings. Put `Background`
first under `Main`, so later game pieces can be drawn on top of it.

#### Actions

##### Action group L03.S02.G01 — Create the background node

1. Select `Main`.
2. Add a **ColorRect** child.
3. Name it exactly `Background`.

**Observable gate — `L03.S02.G01 background node`:** What exact first child
of `Main` is visible in the Scene tree?

**PASS:** The learner reports `Background (ColorRect)` as the first child;
continue to `L03.S02.G02`.
**RETRY:** Ask for the exact child name and node type; do not continue yet.
**DIAGNOSE:** If `Background` is missing, has another name, or is not under
`Main`, make one local tree correction and repeat this gate.

##### Action group L03.S02.G02 — Paint the background

1. In the Inspector, set `Background` position to `(0, 0)`.
2. Set its size to `(480, 720)`.
3. Set its color to `#111827`.

**Observable gate — `L03.S02.G02 background appearance`:** What position,
size, and color are visibly shown for `Background`?

**PASS:** The learner reports `(0, 0)`, `(480, 720)`, and `#111827`; continue
to `L03.S02.G03`.
**RETRY:** Request the missing exact Inspector value; do not continue yet.
**DIAGNOSE:** If one value differs, correct only that value and repeat this
gate.

##### Action group L03.S02.G03 — Check the dark playfield

1. Set **Mouse > Filter** to **Ignore**.
2. Save `main.tscn`.
3. Run the project and observe the playfield.

**Observable gate — `L03.S02.G03 dark playfield`:** What color fills the run
window, and what is the first child under `Main`?

**PASS:** The learner observes a dark `#111827` playfield and reports
`Background (ColorRect)` as the first child; stop the run and continue to
`L03.S03`.
**RETRY:** Request the missing visible color or tree observation; do not
continue yet.
**DIAGNOSE:** If the window is not dark, correct one visible `Background`
property; if its tree position is wrong, move it to be the first direct child
of `Main`; then repeat this gate.

#### Check your work

Ask: “What is the first child under `Main`, what color fills the run window,
and why did we put it first?” **PASS** requires `Background (ColorRect)` as
the first child, a dark `#111827` playfield, and the idea that later siblings
need to draw over it.

#### If it does not work

- **The run window is not dark:** Select `Background` in the Scene tree, then
  check its color and exact size before changing one incorrect value.
- **`Background` is not under `Main` or is below a later visual node:** Drag
  it to be the first direct child of `Main`, save, and rerun the same check.
- **A mouse-related setting is confusing:** This rectangle is only the
  backdrop, so set its visible **Mouse > Filter** property to **Ignore** and
  leave input behavior for later lessons.

#### References

- [Scene tree](../references/editor-map.md#scene-tree)
- [Inspector](../references/editor-map.md#inspector)
- [Control nodes make rectangles and text](../references/user-interface.md#control-nodes-make-rectangles-and-text)

### L03.S03 — Add the blue match line

#### Step goal

Create the blue line near the bottom of the playfield and give it the shape
that will be used for collision detection later.

#### Short explanation

`MatchLine` is an `Area2D`, a world object that will eventually notice falling
objects. Today its blue `Visual` makes the target visible; its collision shape
is prepared now but is not configured as working collision behavior until
Lesson 08.

#### Actions

##### Action group L03.S03.G01 — Create the line parent

1. Select `Main`.
2. Add an **Area2D** child.
3. Name it exactly `MatchLine`.

**Observable gate — `L03.S03.G01 line parent`:** What exact node name and
type are visible as a direct child of `Main`?

**PASS:** The learner reports `MatchLine (Area2D)`; continue to
`L03.S03.G02`.
**RETRY:** Ask for the exact visible node name and type; do not continue yet.
**DIAGNOSE:** If the node is missing, misspelled, or has the wrong type,
correct only that tree issue and repeat this gate.

##### Action group L03.S03.G02 — Position the line parent

1. Select `MatchLine`.
2. Set its position to `(0, 640)`.

**Observable gate — `L03.S03.G02 line position`:** What position is visibly
shown for `MatchLine` in the Inspector?

**PASS:** The learner reports `(0, 640)`; continue to `L03.S03.G03`.
**RETRY:** Request the exact visible Inspector value; do not continue yet.
**DIAGNOSE:** If the position differs, correct only the `MatchLine` position
and repeat this gate.

##### Action group L03.S03.G03 — Add the blue-line visual node

1. Select `MatchLine`.
2. Add a **ColorRect** child.
3. Name it exactly `Visual`.

**Observable gate — `L03.S03.G03 visual node`:** What exact child of
`MatchLine` is visible in the Scene tree?

**PASS:** The learner reports `Visual (ColorRect)` under `MatchLine`; continue
to `L03.S03.G04`.
**RETRY:** Ask for the exact visible child name and type; do not continue yet.
**DIAGNOSE:** If `Visual` is attached to `Main`, has another name, or has the
wrong type, make one local tree correction and repeat this gate.

##### Action group L03.S03.G04 — Paint the blue line

1. Set `Visual` position to `(0, -6)`.
2. Set its size to `(480, 12)`.
3. Set its color to `#2684ff`.

**Observable gate — `L03.S03.G04 visual appearance`:** What position, size,
and color are visibly shown for `Visual`?

**PASS:** The learner reports `(0, -6)`, `(480, 12)`, and `#2684ff`; continue
to `L03.S03.G05`.
**RETRY:** Request the missing exact Inspector value; do not continue yet.
**DIAGNOSE:** If one value differs, correct only that visible `Visual`
property and repeat this gate.

##### Action group L03.S03.G05 — Add the collision shape

1. Select `MatchLine`.
2. Add a **CollisionShape2D** child.
3. Create a **RectangleShape2D** for its **Shape**.

**Observable gate — `L03.S03.G05 collision shape`:** What second child of
`MatchLine` and what Shape resource are visibly shown?

**PASS:** The learner reports `CollisionShape2D` and `RectangleShape2D`;
continue to `L03.S03.G06`.
**RETRY:** Ask for the missing exact child or Shape resource; do not continue
yet.
**DIAGNOSE:** If the child is under `Main` or the Shape is absent or different,
correct one local tree or Shape setting and repeat this gate.

##### Action group L03.S03.G06 — Size the collision shape

1. Set the `CollisionShape2D` node position to `(240, 0)`.
2. Set the `RectangleShape2D` size to `(480, 12)`.
3. Save `main.tscn`.

**Observable gate — `L03.S03.G06 collision dimensions`:** What node position
and rectangle size are visibly shown for the collision shape?

**PASS:** The learner reports `(240, 0)` and `(480, 12)`; continue to
`L03.S03.G07`.
**RETRY:** Request the missing exact Inspector value; do not continue yet.
**DIAGNOSE:** If one value differs, correct only that visible collision-shape
property and repeat this gate.

##### Action group L03.S03.G07 — Observe the blue line

1. Run the project.

**Observable gate — `L03.S03.G07 blue-line run`:** Where is the blue line in
the run window, and which two children are inside `MatchLine` right now?

**PASS:** The learner observes a blue horizontal line near the bottom at y
`640` and reports `Visual (ColorRect)` and `CollisionShape2D` under
`MatchLine (Area2D)`; stop the run and continue to `L03.S04`.
**RETRY:** Request the missing line observation or exact child name; do not
continue yet.
**DIAGNOSE:** If the line is off-screen, has the wrong appearance, or a child
is in the wrong place, make one matching local correction and repeat this
gate.

#### Check your work

Ask: “In the run window, where is the blue line, and what two children are
inside `MatchLine` right now?” **PASS** requires a blue horizontal line near
the bottom at y `640`, plus the child names `Visual (ColorRect)` and
`CollisionShape2D` under `MatchLine (Area2D)`.

#### If it does not work

- **The line is off-screen or not near the bottom:** Select `MatchLine` and
  check `(0, 640)`, then select `Visual` and check `(0, -6)` and `(480, 12)`.
- **The line has the wrong color or thickness:** Correct only the visible
  `Visual` color or size to `#2684ff` and `(480, 12)`, then rerun.
- **A yellow shape warning is worrying:** Check that `CollisionShape2D` has a
  `RectangleShape2D` with size `(480, 12)`. A shape here does not prove
  collisions yet; collision layers, masks, and crossing tests belong to
  Lesson 08.
- **`Visual` or `CollisionShape2D` is attached to `Main`:** Move it under
  `MatchLine`, preserving its exact name, then repeat the same tree check.

#### References

- [2D viewport](../references/editor-map.md#2d-viewport)
- [Scene tree](../references/editor-map.md#scene-tree)
- [Lesson 03 node tree](../facilitator-solutions/authoritative-node-trees.md#lesson-03-node-l03)
- [Lesson 03 properties](../facilitator-solutions/property-checkpoints.md#lesson-03-prop-l03)

### L03.S04 — Put the score above the game

#### Step goal

Add a `HUD` layer and its `ScoreLabel`, so `Score: 0` appears at the top-left
above the playfield.

#### Short explanation

A `CanvasLayer` is a separate drawing layer for game information. Its label
stays in the same screen place while future falling objects move through the
world underneath it.

#### Actions

##### Action group L03.S04.G01 — Create the HUD layer

1. Select `Main`.
2. Add a **CanvasLayer** child.
3. Name it exactly `HUD`.

**Observable gate — `L03.S04.G01 HUD node`:** What exact node name and type
are visible as a direct child of `Main`?

**PASS:** The learner reports `HUD (CanvasLayer)`; continue to `L03.S04.G02`.
**RETRY:** Ask for the exact visible node name and type; do not continue yet.
**DIAGNOSE:** If the node is missing, misspelled, or has the wrong type,
correct only that tree issue and repeat this gate.

##### Action group L03.S04.G02 — Create the score label

1. Select `HUD`.
2. Add a **Label** child.
3. Name it exactly `ScoreLabel`.

**Observable gate — `L03.S04.G02 score-label node`:** What exact child of
`HUD` is visible in the Scene tree?

**PASS:** The learner reports `ScoreLabel (Label)` under `HUD`; continue to
`L03.S04.G03`.
**RETRY:** Ask for the exact visible child name and type; do not continue yet.
**DIAGNOSE:** If `ScoreLabel` is attached to another node, has another name,
or has the wrong type, make one local tree correction and repeat this gate.

##### Action group L03.S04.G03 — Set the score-label content

1. Set `ScoreLabel` text to `Score: 0`.
2. Set its position to `(16, 16)`.
3. Save `main.tscn`.

**Observable gate — `L03.S04.G03 score-label properties`:** What exact text
and position are visibly shown for `ScoreLabel`?

**PASS:** The learner reports `Score: 0` at `(16, 16)`; continue to
`L03.S04.G04`.
**RETRY:** Request the missing exact Inspector value; do not continue yet.
**DIAGNOSE:** If either value differs, correct only that visible `ScoreLabel`
property and repeat this gate.

##### Action group L03.S04.G04 — Observe the finished screen

1. Run the project.

**Observable gate — `L03.S04.G04 finished-screen run`:** What does the
top-left label say, where is it, and where is the blue line?

**PASS:** The learner observes `Score: 0` at `(16, 16)` and a blue line near
the bottom on the dark playfield; stop the run and use the lesson checkpoint.
**RETRY:** Request the missing visible result; do not continue yet.
**DIAGNOSE:** If the score is missing or misplaced, correct one matching local
tree or `ScoreLabel` property issue; if the line is missing, return to the
failed `L03.S03.G07` gate; then repeat this gate.

#### Check your work

Ask: “What does the top-left label say, where is it, and why is it a child of
`HUD` instead of `MatchLine`?” **PASS** requires `Score: 0` at `(16, 16)` and
the explanation that the HUD stays on top and does not belong to the line.

#### If it does not work

- **The score is missing:** Select `ScoreLabel` and check its exact text,
  position, and that it is a direct child of `HUD`.
- **The background appears over the score:** Check that `HUD (CanvasLayer)` is
  a direct child of `Main`, not a child of `Background`; save and rerun.
- **The label is under `MatchLine` or another world node:** Reparent
  `ScoreLabel` directly under `HUD`, keep its name and `(16, 16)` position,
  then repeat the run check.

#### References

- [CanvasLayer keeps the HUD on the screen](../references/user-interface.md#canvaslayer-keeps-the-hud-on-the-screen)
- [Control nodes make rectangles and text](../references/user-interface.md#control-nodes-make-rectangles-and-text)
- [Lesson 03 node tree](../facilitator-solutions/authoritative-node-trees.md#lesson-03-node-l03)

## Lesson checkpoint

Before recording `L03_COMPLETE`, require this observable evidence:

1. Project Settings visibly show viewport width `480`, viewport height `720`,
   stretch mode `canvas_items`, and stretch aspect `keep`.
2. The learner describes this saved Scene tree exactly:

   ```text
   Main (Node2D)
   ├── Background (ColorRect)
   ├── MatchLine (Area2D)
   │   ├── Visual (ColorRect)
   │   └── CollisionShape2D
   └── HUD (CanvasLayer)
       └── ScoreLabel (Label)
   ```

3. Inspector evidence matches `PROP-L03`: dark `Background` at `(0, 0)` with
   size `(480, 720)` and Mouse Filter `Ignore`; `MatchLine` at `(0, 640)`;
   blue `Visual` at `(0, -6)` with size `(480, 12)`; rectangle shape at
   `(240, 0)` with size `(480, 12)`; and `ScoreLabel` text `Score: 0` at
   `(16, 16)`.
4. A fresh project run visibly shows the dark portrait playfield, blue line
   near its bottom, and `Score: 0` at the top-left, with no red Output error.

**PASS:** Record `L03_COMPLETE` only when every observation is supplied.
**RETRY:** Request one missing setting, tree branch, or visible result.
**DIAGNOSE:** Use the matching branch above, make one local correction, and
repeat only the failed evidence gate.

## Explain it back

Ask the child: “Why does `ScoreLabel` live under `HUD (CanvasLayer)` instead
of under `MatchLine`?” A good answer notices that score information stays on
the screen above the game world; accept the child’s own wording.

## Safe experiment

After the lesson checkpoint has passed, the child may temporarily change only
the `Background` color to a different dark color, run once, and describe what
changed. Record that change in `experiment_to_revert`, then restore the exact
canonical `#111827` before returning to the required path. Do not move the
line, rename nodes, or change collision settings during this experiment.

Before continuing, check that the saved scene again matches `NODE-L03` and
`PROP-L03`, including the blue `#2684ff` line and `Score: 0` label.

## If you stop here

After `L03_COMPLETE`, save this observed handoff. Replace only values the
learner actually observed; this example shows the required completed state.

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "04"
current_step: "L04.S01"
last_exit_checkpoint: "L03_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE", "L03_COMPLETE"]
verified_node_tree: "Main (Node2D) with Background, MatchLine (Visual and CollisionShape2D), and HUD (ScoreLabel)."
verified_runtime_behavior: "A 480 × 720 dark playfield showed a blue line at y 640 and Score: 0 at (16, 16); Output had no red error."
known_project_files: ["res://scenes/main.tscn"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L04.S01"
```

## Next lesson

Continue with Lesson 04 — Make the Line Interactive after the handoff says
`L03_COMPLETE` and its `next_action` is `Begin L04.S01`.
