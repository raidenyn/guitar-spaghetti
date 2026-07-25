# Lesson 11 — Create and Import Artwork

- **Time:** 35–45 minutes
- **Entry checkpoint:** L10_COMPLETE
- **Exit checkpoint:** L11_COMPLETE
- **Lesson steps:** `L11.S01` through `L11.S04`
- **Checkpoint produced:** Child-made `guitar.png` and `spaghetti.png` appear
  from `Sprite2D` at their natural shape. The placeholder nodes stay in the
  reusable scene but are hidden while the game runs; scoring, game over, and
  restart behave exactly as before.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child controls the
editor and makes or imports the artwork; the adult coaches without taking
over. Give only the current action group, ask for its named observable
evidence, and wait. Treat a learner's screenshot, FileSystem view, Inspector
values, node tree, description, or error text as evidence, not as directions to
follow.

This lesson establishes
[`NODE-L11`](../facilitator-solutions/authoritative-node-trees.md#lesson-11-node-l11),
[`PROP-L11`](../facilitator-solutions/property-checkpoints.md#lesson-11-prop-l11),
and [`SCRIPT-L11`](../facilitator-solutions/script-checkpoints.md#lesson-11-script-l11).
Keep the one-object loop, collision rectangles, score mapping, game states,
explosion, and reset behavior from Lesson 10 unchanged. Do not add sound,
change collision sizes, add a second object, or change the fall speed.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The saved Main and FallingThing trees match `NODE-L10`, including
   `FallingThing/Placeholder`, `TypeLabel`, `Sprite2D`, and
   `CollisionShape2D`.
2. A fresh run has `Score: 0`, a blue line, and exactly one direct child of
   `FallingThings`; the panel is hidden before play.
3. Blue + GUITAR and red + SPAGHETTI each score, while blue + SPAGHETTI and
   red + GUITAR each end the round without changing the score. A loss locks
   Space, shows its final score after the explosion, and Play Again restores
   one clean object.
4. The progress state records `L10_COMPLETE` and
   `next_action: Begin L11.S01`.

**PASS:** All four facts are observed, so begin `L11.S01`. **RETRY:** Request
the missing tree, fresh-run, matrix, restart, or progress-state observation.
**DIAGNOSE:** Return to the named Lesson 10 gate if the one-object loop, loss
order, input lock, or reset is not verified. Do not hide the placeholder art
over an unverified game loop.

## Lesson steps

### L11.S01 — Make two recognisable original pictures

#### Step goal

Prepare one picture of a guitar and one picture of spaghetti that the player
can tell apart quickly.

#### Short explanation

The artwork is the picture the player sees, not the invisible sensor that
decides whether an object crossed the line. The child can choose the art style:
a drawing app, a photographed paper drawing, or simple original shapes are all
fine. The two pictures must be the child's or a family's own work; do not use
downloaded character art, logos, or art with unclear permission.

#### Actions

##### Action group L11.S01.G01 — Choose the two pictures

1. Choose one creation method: a drawing app, a photograph of a paper drawing,
   or simple original shapes.
2. Make a clearly recognisable guitar picture and a clearly recognisable
   spaghetti picture.
3. If the drawing app offers it, use a transparent background rather than a
   painted white rectangle.

**Observable gate — `L11.S01.G01 two art ideas`:** What will each picture show,
which creation method did you choose, and can you describe one feature that
makes the two pictures easy to tell apart?

**PASS:** The learner names an original guitar and spaghetti picture, their
creation method, and one visible difference; continue to `L11.S01.G02`.
**RETRY:** Request the missing picture, method, or difference. **DIAGNOSE:** If
the art source is unclear, choose a child-made drawing or shapes before saving
files; do not import it until its origin is known.

##### Action group L11.S01.G02 — Save the final PNG files

1. Export or save the guitar picture as a PNG named exactly `guitar.png`.
2. Export or save the spaghetti picture as a PNG named exactly `spaghetti.png`.
3. Keep each picture's longest side near 256 pixels when practical; it may be
   wider or taller than the other picture.

**Observable gate — `L11.S01.G02 filenames`:** What are the exact two filenames
and the approximate longest-side size of each picture?

**PASS:** The learner reports lowercase `guitar.png` and `spaghetti.png` and
two reasonable approximate sizes; continue to `L11.S02`. **RETRY:** Request
the missing exact filename or size. **DIAGNOSE:** If a filename is `Guitar.png`,
has `.PNG`, or contains an extra copy number, rename only that file to its
exact lowercase name. The script later needs the exact spelling.

#### Check your work

Ask: “Why might a transparent background look nicer than a white rectangle?”
**PASS** requires the idea that the game background can show around the drawing.

#### If it does not work

- **The two pictures look too similar:** Change one simple child-made detail,
  such as the guitar body shape or spaghetti's curly strands; do not change the
  game colors or matching rules.
- **The drawing app cannot save transparent PNGs:** A solid background is
  acceptable for this first game. Keep it inside the picture and still use PNG.
- **The picture is very large:** Keep the original outside the project and
  export a smaller copy near 256 pixels on its longest side. The script will
  fit the visible art into a fixed box later.

#### References

- [making picture files](../references/importing-assets.md#make-two-child-created-picture-files)
- [adult coaching roles](../references/parent-coach-notes.md#the-adults-useful-jobs)

### L11.S02 — Put the pictures in Godot

#### Step goal

Place the two exact PNG files in the project's `art` folder and wait until
Godot imports them as textures.

#### Short explanation

`res://` means the top of this Godot project. Godot watches project files and
imports a PNG into a `Texture2D` it can put on a Sprite2D. The exact lower-case
paths matter because the script will load them by name.

#### Actions

##### Action group L11.S02.G01 — Create or open the art folder

1. In the FileSystem dock, find the project root (`res://`).
2. Create a folder named exactly `art` if it is not already there.
3. Confirm its path reads `res://art`.

**Observable gate — `L11.S02.G01 art folder`:** What exact path does the
FileSystem dock show for the folder?

**PASS:** The learner reports `res://art`; continue to `L11.S02.G02`.
**RETRY:** Request the exact displayed path. **DIAGNOSE:** If the folder is
inside `.godot`, create `art` at the project root instead. Do not put learner
files in `.godot`; Godot owns that generated folder.

##### Action group L11.S02.G02 — Copy and inspect the imported textures

1. Use the computer's file manager to copy `guitar.png` and `spaghetti.png`
   into `res://art`.
2. Return to Godot and wait until both files appear in the FileSystem dock.
3. Select each file and confirm its preview is the expected picture.

**Observable gate — `L11.S02.G02 imported textures`:** What exact two paths,
lowercase filenames, and picture previews do you see in FileSystem?

**PASS:** The learner reports `res://art/guitar.png` with the guitar preview
and `res://art/spaghetti.png` with the spaghetti preview; continue to
`L11.S03`. **RETRY:** Request the missing path, filename, or preview.
**DIAGNOSE:** If either file does not appear, wait for import once, then compare
the file manager's destination and filename with this gate. Correct only the
one destination, case, or extension that differs; use
[`SYM-ASSET-01`](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)
if the path is right but Godot still cannot use the art.

#### Check your work

Ask: “What does `res://art/guitar.png` tell Godot?” **PASS** requires the idea
that it is the guitar picture's exact location inside this project.

#### If it does not work

- **Godot shows a file but the preview is wrong:** Replace only that copied
  file with the intended PNG, keeping the same exact filename.
- **The pictures were copied beside `project.godot` but not in art:** Move only
  those two files into `res://art`; do not create an extra nested `art/art`
  folder.
- **Import is taking a moment:** Wait for the FileSystem preview before
  changing script code. The import result is the evidence that the texture is
  ready.

#### References

- [put pictures in the project](../references/importing-assets.md#put-the-pictures-in-the-project-and-wait-for-import)
- [Godot image importing](https://docs.godotengine.org/en/4.7/tutorials/assets_pipeline/importing_images.html)

### L11.S03 — Let FallingThing choose a picture

#### Step goal

Update `FallingThing` so its Kind chooses the matching imported texture, scales
it evenly into a 96-pixel art box, and hides the temporary placeholder view.

#### Short explanation

`preload` makes the two imported files available to the script. `Sprite2D`
shows one selected texture. The same scale number is used on x and y, so a tall
guitar or wide spaghetti drawing keeps its own shape instead of being squashed.
The collision rectangle remains `(96, 64)`; visible art and collision sensing
are separate jobs.

#### Actions

##### Action group L11.S03.G01 — Load the two textures and name the art box

In `res://scripts/falling_thing.gd`, directly below the two existing color
constants, add this short code group:

~~~gdscript
const GUITAR_TEXTURE: Texture2D = preload("res://art/guitar.png")
const SPAGHETTI_TEXTURE: Texture2D = preload("res://art/spaghetti.png")
const ART_BOX_SIZE := 96.0
~~~

Save and check for the first red error.

**Observable gate — `L11.S03.G01 texture preloads`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L11.S03.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a preload cannot find a resource, compare just the quoted path
with the two imported FileSystem paths. Correct one filename or case difference
and repeat this gate.

##### Action group L11.S03.G02 — Give the script the Sprite2D path

Directly below the existing `type_label` `@onready` line, add:

~~~gdscript
@onready var sprite: Sprite2D = $Sprite2D
~~~

Save and check for the first red error.

**Observable gate — `L11.S03.G02 sprite path`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L11.S03.G03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Godot cannot find this node, show the FallingThing tree and
restore only the `Sprite2D` node name or the `$Sprite2D` path; do not add a
second Sprite2D.

##### Action group L11.S03.G03 — Rename the visual helper everywhere

In `falling_thing.gd`, replace the exact text `_apply_placeholder` with
`_apply_visual` in all three current places: the `_ready()` call, the `setup()`
call, and the function declaration. Leave the existing color and label lines
inside the renamed function for now. Save and check for the first red error.

**Observable gate — `L11.S03.G03 visual helper`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L11.S03.G04`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If one call still uses the old spelling, change only that call to
`_apply_visual()` and repeat this gate. Do not remove the color or label lines.

##### Action group L11.S03.G04 — Select the texture and keep its shape

At the end of the now-named `func _apply_visual() -> void:` body, directly
below the existing `type_label.text` line, add:

~~~gdscript
    var selected_texture := GUITAR_TEXTURE if kind == Kind.GUITAR else SPAGHETTI_TEXTURE
    sprite.texture = selected_texture
    var longest_side := max(selected_texture.get_width(), selected_texture.get_height())
    if longest_side > 0:
        sprite.scale = Vector2.ONE * (ART_BOX_SIZE / float(longest_side))
~~~

Save and check for the first red error.

**Observable gate — `L11.S03.G04 uniform scale`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L11.S03.G05`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the `if` body is red, compare its four spaces more indentation
than `var longest_side`. If a texture is missing, return to the exact preload
path gate rather than setting a texture manually in the Inspector.

##### Action group L11.S03.G05 — Show the art and hide the temporary view

Directly below the scale `if` block, add:

~~~gdscript
    placeholder.visible = false
    type_label.visible = false
    sprite.visible = true
~~~

Save and check for the first red error.

**Observable gate — `L11.S03.G05 visual states`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; save and continue to `L11.S04`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the label or colored rectangle remains during a run, compare
only these three visible assignments. If the Sprite2D is still hidden, restore
only `sprite.visible = true` and rerun this gate.

#### Check your work

Ask: “Why do x and y use the same scale number?” **PASS** requires the idea
that one number keeps the drawing's natural shape instead of stretching it.

#### If it does not work

- **The picture is huge, tiny, or stretched:** Use `SYM-ASSET-01` and compare
  the two `get_...` calls, `ART_BOX_SIZE := 96.0`, and the one
  `Vector2.ONE *` scale assignment. Do not set separate Inspector x and y
  scales.
- **The colored rectangle or word still appears:** Keep Placeholder and
  TypeLabel in the tree, but set their visible values false in `_apply_visual`.
- **A preload error names a file:** Correct exactly that `res://art/...` path
  or imported filename; do not replace it with a manually assigned texture.
- **The game detects crossings differently after adding art:** Restore the
  CollisionShape2D rectangle to `(96, 64)` and use the collision gate rather
  than resizing it to match a drawing.

#### References

- [Lesson 11 complete script](../facilitator-solutions/script-checkpoints.md#lesson-11-script-l11)
- [art box and visible-node properties](../facilitator-solutions/property-checkpoints.md#lesson-11-prop-l11)
- [art and collision are separate](../references/importing-assets.md#put-the-pictures-in-the-project-and-wait-for-import)
- [small-problem recovery order](../references/debugging.md#the-required-recovery-order)

### L11.S04 — Check the art without changing the game rules

#### Step goal

See both child-made pictures in play, confirm neither is stretched, and prove
that the familiar score and game-over behavior still works.

#### Short explanation

The script chooses the picture from the already-existing `kind` value. It does
not change a match, collision, score, or restart rule. Testing the same game
matrix after a visual change is how we know the art did not accidentally change
the game.

#### Actions

##### Action group L11.S04.G01 — Observe both pictures

1. Run the game and observe a GUITAR object; use Play Again as needed until one
   appears.
2. Observe a SPAGHETTI object in a later fresh round.
3. For each, look for its recognisable shape without a colored Placeholder or
   TypeLabel showing through.

**Observable gate — `L11.S04.G01 both art kinds`:** Describe the guitar and
spaghetti picture you saw, whether either one looked stretched, and whether
the colored rectangle or word was visible behind either picture.

**PASS:** The learner observes both recognisable pictures, neither stretched,
and no visible Placeholder or TypeLabel; continue to `L11.S04.G02`.
**RETRY:** Request the missing kind or visible-art observation. **DIAGNOSE:**
Use `SYM-ASSET-01` if an art kind is missing, huge, or invisible; return to the
visual-states gate if a placeholder remains visible.

##### Action group L11.S04.G02 — Recheck the four familiar outcomes

1. Observe blue + GUITAR and red + SPAGHETTI on separate objects; record that
   each increases the displayed score by exactly one.
2. Observe blue + SPAGHETTI and red + GUITAR on separate objects; record that
   each leaves the score unchanged, explodes, and shows the final-score panel.
3. After one observed loss, press Space and confirm it does not switch the
   line; then use Play Again and count the direct `FallingThings` children
   after the next spawn appears.

**Observable gate — `L11.S04.G02 art game matrix`:** Report the score result
for both correct pairs and both mismatch pairs, then report whether Space was
locked after a loss and the direct child count after Play Again.

**PASS:** The learner reports both correct pairs scoring exactly one, both
mismatch pairs keeping score unchanged and ending the round, locked Space, and
exactly one direct FallingThings child after restart. Continue to the lesson
checkpoint. **RETRY:** Request the missing mapping, score, loss, input, or
child-count result. **DIAGNOSE:** A wrong mapping returns to the Lesson 09
mapping gate; a changed collision result returns to Lesson 08; a broken loss or
restart returns to Lesson 10. Do not change art scale to repair a game-rule
failure.

#### Check your work

Ask: “Why did we leave the collision rectangle `(96, 64)` alone even though
our drawings have different shapes?” **PASS** requires the idea that the
rectangle is the invisible crossing sensor and the art only changes what is
seen.

#### If it does not work

- **Only one picture ever appears:** Keep using fresh rounds until both random
  kinds have been observed; do not change the random selection code to force a
  kind.
- **A picture looks different from its FileSystem preview:** Confirm the exact
  texture path and the uniform scale code, then use `SYM-ASSET-01`.
- **A correct picture now loses or misses the line:** The picture is not the
  matching rule. Compare the named Lesson 08, 09, or 10 evidence branch before
  editing any artwork code.

#### References

- [asset check before moving on](../references/importing-assets.md#asset-check-before-moving-on)
- [Lesson 11 node tree](../facilitator-solutions/authoritative-node-trees.md#lesson-11-node-l11)
- [Lesson 11 properties](../facilitator-solutions/property-checkpoints.md#lesson-11-prop-l11)
- [asset recovery branch](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)

## Lesson checkpoint

Before recording L11_COMPLETE, require this observable evidence:

1. FileSystem shows the exact lowercase imported paths `res://art/guitar.png`
   and `res://art/spaghetti.png`, each with the intended child-made preview.
2. The saved FallingThing tree still matches `NODE-L11`: Placeholder,
   TypeLabel, Sprite2D, and CollisionShape2D remain present under the reusable
   scene. During play Sprite2D is visible and Placeholder and TypeLabel are
   hidden.
3. `falling_thing.gd` compares with `SCRIPT-L11`: it preloads both textures,
   selects one by Kind, assigns it to Sprite2D, derives one uniform scale from
   the texture's longest side into `ART_BOX_SIZE := 96.0`, and leaves the
   collision geometry unchanged.
4. Both kinds were observed as recognisable, not stretched artwork with no
   visible colored rectangle or type word.
5. Both correct pairs each changed score by exactly one; both mismatch pairs
   each left score unchanged, ended the round, locked Space, and showed the
   final score after the explosion. One observed Play Again left exactly one
   direct FallingThings child.

**PASS:** Record L11_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing file, tree, script, art, mapping, or restart
observation. **DIAGNOSE:** Use `SYM-ASSET-01` for a specific imported-art
failure; otherwise return only to the named collision, scoring, or reset gate.
Do not claim that a sprite change preserved gameplay without observing the
matrix.

## Explain it back

Ask the child: “How does one FallingThing decide whether to show the guitar or
spaghetti picture, and why does it keep one scale number?” A good answer says
its `kind` chooses a texture and one scale number keeps the picture's shape.
Accept the child's own wording.

## Safe experiment

After L11_COMPLETE is fully observed, the child may temporarily change
`ART_BOX_SIZE` to `72.0`, run once to see a smaller picture, then restore it to
exactly `96.0`. Record `ART_BOX_SIZE temporary 72.0` in
`experiment_to_revert`, and confirm the restored `96.0` value and one visible
Sprite2D before returning to the required path. Do not resize the collision
rectangle, set separate x/y scales, or alter any game rule.

## If you stop here

Update the progress state with only observed facts. If L11_COMPLETE has not
passed, keep the current `L11.S##.G##` gate as `next_action` and record the
last FileSystem path, preview, script error, visible art result, or game-matrix
observation. If it has passed, record L11_COMPLETE, set `next_action` to Begin
L12.S01, and use this handoff format:

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "12"
current_step: "L12.S01"
last_exit_checkpoint: "L11_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE", "L03_COMPLETE", "L04_COMPLETE", "L05_COMPLETE", "L06_COMPLETE", "L07_COMPLETE", "L08_COMPLETE", "L09_COMPLETE", "L10_COMPLETE", "L11_COMPLETE"]
verified_node_tree: "Main and FallingThing match NODE-L11; FallingThing keeps Placeholder, TypeLabel, Sprite2D, and CollisionShape2D, with Sprite2D visible and Placeholder and TypeLabel hidden during play."
verified_runtime_behavior: "Both kinds appeared as recognisable, unstretched child-made artwork; both scoring pairs and both mismatch pairs kept their Lesson 10 behavior, and one Play Again left exactly one FallingThings child."
known_project_files: ["res://scenes/main.tscn", "res://scenes/falling_thing.tscn", "res://scripts/match_line.gd", "res://scripts/falling_thing.gd", "res://scripts/main.gd", "res://scripts/hud.gd", "res://art/guitar.png", "res://art/spaghetti.png"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L12.S01"
```

Do not claim the files imported, art shape was preserved, placeholders were
hidden, or the game matrix stayed unchanged unless the learner supplied those
exact observations.

## Next lesson

Continue with Lesson 12 — Add Sound and Game Feel after the handoff says
L11_COMPLETE. Lesson 12 adds three audio players and event sounds while
preserving the artwork, 96-pixel art box, collision geometry, and game rules.
