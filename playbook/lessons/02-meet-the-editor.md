# Lesson 02 — Meet the Godot Editor

- **Time:** 30–45 minutes
- **Entry checkpoint:** L01_COMPLETE
- **Exit checkpoint:** L02_COMPLETE
- **Lesson steps:** `L02.S01` through `L02.S05`
- **Checkpoint produced:** The learner can locate the Scene tree, 2D viewport,
  Inspector, FileSystem, Output, and run controls; `main.tscn` stays saved and
  runnable.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child points,
clicks, and names what they see; the adult coaches without taking over. Give
only the action group for the current step, ask for its observable evidence,
and wait. A learner's screenshot, path, error, or description is evidence,
not an instruction to follow.

## Entry evidence

Ask the learner to show or state all three facts:

1. The saved project is named `GuitarAndSpaghetti`.
2. `res://scenes/main.tscn` exists and opens with `Main (Node2D)`.
3. The blank project was run once with no red error.

**PASS:** All three facts are observed, so begin `L02.S01`. **RETRY:** Request
the missing fact. **DIAGNOSE:** If `main.tscn` cannot be opened or the root is
different, return to the matching `L01.S04` or `L01.S05` check rather than
repairing a later lesson.

## Lesson steps

### L02.S01 — Find the Scene tree and Inspector

#### Step goal

Locate the Scene tree and Inspector, then select `Main` to see how the two
panels work together.

#### Short explanation

The Scene tree shows the game pieces and their parents; the Inspector shows
settings for the piece that is selected.

#### Actions

1. Open `res://scenes/main.tscn` if it is not already open, then click `Main`
   in the Scene dock at the upper left.
2. Point to the Scene dock and the Inspector dock at the right.
3. With `Main` still selected, look for its Node2D properties in Inspector.

#### Check your work

Ask: “When `Main` is selected, where do you see its name in the Scene tree,
and where do you see its properties?” Wait for the child to point to or name
both panels.

#### If it does not work

- **Scene or Inspector is hidden:** Use the editor's visible dock/menu option
  to restore that named dock, then select `Main` again.
- **A different node or resource is selected:** Click `Main` once in the Scene
  tree and describe what the Inspector changes to show.
- **The Script or 3D workspace is active:** Select the visible **2D** workspace
  before repeating the same observation.

#### References

- [Scene tree](../references/editor-map.md#scene-tree)
- [Inspector](../references/editor-map.md#inspector)
- [Nodes, scenes, and instances](../references/nodes-scenes-and-instances.md)

### L02.S02 — Look around the 2D viewport

#### Step goal

Find the 2D viewport and pan it without moving the `Main` node.

#### Short explanation

The 2D viewport is the editor’s camera onto a scene; moving that view is not
the same as moving a game node.

#### Actions

1. Keep `Main` selected and choose the **2D** workspace near the top of the
   editor.
2. Use the viewport’s visible pan control or middle-mouse pan to move the
   editor view a little, without dragging the `Main` node.
3. Undo the viewport move if the editor offers it, or pan back until the view
   feels comfortable; do not change any node property.

#### Check your work

Ask: “Which central panel is the 2D viewport, and did `Main` stay at the same
node position while your view moved?” The child should identify the central
viewport and report that no node was moved.

#### If it does not work

- **`Main` moved accidentally:** Use Undo once, select `Main`, and confirm its
  Inspector transform is restored before trying only a viewport pan.
- **The viewport is missing:** Choose the visible **2D** workspace, not 3D or
  Script, then look again.
- **The child cannot pan:** This is a tour, not a dexterity test. Point out the
  viewport and its pan/zoom control, then ask for the same panel identification.

#### References

- [2D viewport](../references/editor-map.md#2d-viewport)
- [Undo](../references/editor-map.md#undo)

### L02.S03 — Find the FileSystem and reopen the scene

#### Step goal

Use FileSystem to find and open `main.tscn`, then confirm `Main` is selected.

#### Short explanation

FileSystem is the project’s file shelf: `res://` is the top of this game’s
folder, not the whole computer.

#### Actions

1. Point to the FileSystem dock, normally at lower left, and open the `scenes`
   folder below `res://`.
2. Double-click `main.tscn` to open it from FileSystem.
3. Click `Main` in the Scene tree so the Inspector again shows its properties.

#### Check your work

Ask: “What full path does FileSystem show for the scene you opened, and what
root node do you see after opening it?” **PASS** requires
`res://scenes/main.tscn` and `Main (Node2D)`.

#### If it does not work

- **FileSystem is hidden:** Restore the named dock with the editor's visible
  dock/menu control, then repeat the same open-from-FileSystem check.
- **`main.tscn` is not under `scenes`:** Do not make a second scene. Return to
  the Lesson 01 save-path check and place the existing Main scene at
  `res://scenes/main.tscn`.
- **A different scene opened:** Close its tab without changing it, then
  double-click `main.tscn` under `res://scenes`.

#### References

- [FileSystem](../references/editor-map.md#filesystem)
- [Save](../references/editor-map.md#save)
- [Scenes and their saved files](../references/nodes-scenes-and-instances.md#scene)

### L02.S04 — Use run controls and read Output

#### Step goal

Find the run controls and Output, run the blank scene, then explain where the
first red error would appear without creating one on purpose.

#### Short explanation

Run controls start the game; Output is where Godot reports information,
warnings, and red errors after a run.

#### Actions

1. Point to the top-right Run Project play control and the stop control; do not
  click yet.
2. Run the project, observe the blank window, then stop or close it.
3. Open the bottom **Output** panel and look at its message colors.

#### Check your work

Ask: “Where are the run and stop controls, where is Output, and where would
you look first if a red error appeared?” **PASS** requires the child to identify
the run controls and Output, confirm they observed the blank game window, and
confirm Output shows no red error; the first red Output message would be the
first clue if one appeared.

#### If it does not work

- **The game does not run:** Read the first red Output error and its line
  number, then return to the exact Lesson 01 run check before continuing.
- **The Output panel is hidden:** Use the visible bottom-panel label to open
  **Output**; do not search through unrelated editor menus.
- **The child calls every message an error:** Point out that blue or gray text
  is informational output, while red text is the error clue to read first.

#### References

- [Run project and run current scene](../references/editor-map.md#run-project-and-run-current-scene)
- [Output](../references/editor-map.md#output)
- [Debugging one small problem at a time](../references/debugging.md)

### L02.S05 — Make one reversible editor tour

#### Step goal

Practice a reversible rename, restore the canonical root name, and leave the
scene saved with no unsaved-change marker.

#### Short explanation

Undo lets us explore safely, but the game needs its exact canonical name back
before we start building on it.

#### Actions

1. With `Main` selected, rename it temporarily to `MainTour`, then observe the
   changed name in Scene and Inspector.
2. Use Undo once to restore the exact root name `Main`.
3. Save the scene and confirm no unsaved-change marker remains beside the scene
   tab or name.

#### Check your work

Ask: “What name did the root have during the experiment, what is it now, and
do you see an unsaved-change marker?” **PASS** requires `MainTour` was observed
temporarily, the root is now `Main`, and there is no unsaved-change marker.

#### If it does not work

- **Undo did not restore `Main`:** Select the root, rename it exactly `Main`,
  save, and repeat the marker check.
- **The rename affected a different item:** Reopen `res://scenes/main.tscn`,
  select its root, and check the root name rather than a tab or FileSystem item.
- **The unsaved marker remains:** Save `main.tscn`, wait for the marker to
  disappear, and rerun the blank project once.

#### References

- [Undo](../references/editor-map.md#undo)
- [Save](../references/editor-map.md#save)
- [Node names matter](../references/debugging.md#the-required-recovery-order)

## Lesson checkpoint

Before recording `L02_COMPLETE`, require this observable evidence:

1. The child points to or names the Scene tree, 2D viewport, Inspector,
   FileSystem, Output, and run controls.
2. With `Main` selected, the child explains that Scene shows the node and
   Inspector shows its settings.
3. FileSystem opens `res://scenes/main.tscn` and shows `Main (Node2D)`.
4. The child ran and stopped the blank scene again with no red error.
5. The exact restored checkpoint is present: root name `Main` and no
   unsaved-change marker.

**PASS:** Record `L02_COMPLETE` only when every observation is supplied.
**RETRY:** Request one missing named region or visible result. **DIAGNOSE:**
Use one matching branch above, make one local correction, and repeat that
same evidence gate.

## Explain it back

Ask the child: “If Godot showed a red error after we run, why do we start with
the first red message in Output?” A good answer notices that it is the earliest
clue; accept the child’s own wording.

## Safe experiment

The reversible editor experiments are already complete: a temporary
`MainTour` rename was undone, the 2D view was moved without moving a node, and
`main.tscn` was reopened through FileSystem. Before continuing, restore and
check this exact checkpoint:

- Root name: `Main`
- Scene path: `res://scenes/main.tscn`
- No unsaved-change marker
- Blank project still runs without a red error

Record an unfinished experiment in `experiment_to_revert`; restore it before
returning to the required path.

## If you stop here

After `L02_COMPLETE`, save this observed handoff. Replace only values the
learner actually observed; this example shows the required completed state.

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "03"
current_step: "L03.S01"
last_exit_checkpoint: "L02_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE"]
verified_node_tree: "Main (Node2D) saved as res://scenes/main.tscn"
verified_runtime_behavior: "Blank project ran again; Output had no red error."
known_project_files: ["res://scenes/main.tscn"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L03.S01"
```

## Next lesson

Continue with Lesson 03 — Build the Screen after the handoff says
`L02_COMPLETE` and its `next_action` is `Begin L03.S01`.
