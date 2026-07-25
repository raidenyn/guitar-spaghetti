# Lesson 13 — Test and Export

- **Time:** 45–60 minutes
- **Entry checkpoint:** L12_COMPLETE
- **Exit checkpoint:** L13_COMPLETE
- **Lesson steps:** L13.S01 through L13.S04
- **Checkpoint produced:** Every final acceptance case has learner-observed
  PASS evidence in the editor and in a playable desktop debug export.

## Facilitator contract

Follow FC-01 through FC-15 in [the facilitator contract](../FACILITATOR_CONTRACT.md).
The child operates Godot and the exported game; the adult coaches without
taking over. Give only the current small action group, ask for its named
observable evidence, and wait. A screenshot, exact visible text, exact first
error, node tree, or precise description is evidence. A green Export dialog or
“it works” is not evidence that the exported game works.

This lesson establishes
[NODE-L13](../facilitator-solutions/authoritative-node-trees.md#lesson-13-node-l13)
and [PROP-L13](../facilitator-solutions/property-checkpoints.md#lesson-13-prop-l13).
The final script checkpoint remains
[SCRIPT-L12](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12).
Do not redesign the game, add a second simultaneous object, change speed, or
make a distribution build. This is one local desktop debug export, not store
submission, signing, notarization, or publishing.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The progress state records L12_COMPLETE and next_action: Begin L13.S01.
2. The saved Main and FallingThing trees match NODE-L13, including the three
   named AudioStreamPlayers and HUD's complete GameOverPanel tree.
3. The Node dock shows the five required connections: MatchLine crossing and
   color switch to Main, SpawnDelay timeout to Main, PlayAgainButton pressed
   to HUD, and HUD play-again request to Main.
4. The latest editor run begins at Score: 0 with a blue line, plays the named
   sound feedback, and has no red Output error.
5. PROP-L13 is visible in the Inspector and Project Settings: Compatibility,
   480 × 720, canvas_items / keep, #111827, canonical line and collision
   values, SpawnDelay 0.5 one-shot/non-autostart, the ScoreLabel and panel
   layout, and the canonical art and explosion values.

**PASS:** All five facts are observed, so begin L13.S01. **RETRY:** Request
the missing progress, tree, connection, runtime, or property fact.
**DIAGNOSE:** Return to the exact earlier lesson gate for a changed tree,
connection, value, missing sound, or red error. Do not use export to hide an
unverified editor problem.

## Lesson steps

### L13.S01 — Make a clean export preflight

#### Step goal

Save a known-good project and verify the final Canonical Game Contract before
opening the Export menu.

#### Short explanation

An export copies the current saved project. It cannot fix an unsaved scene, a
red error, a missing connection, or a changed property. A small backup lets the
learner return to this evidence-backed version if an optional later project
goes wrong.

#### Actions

##### Action group L13.S01.G01 — Save and check the editor

1. Save every open scene and script in Godot.
2. Run the project once in the editor, then close the running game.
3. Open Output and record the first red error, or explicitly record that there
   is no red error.

**Observable gate — L13.S01.G01 saved editor run:** What exact first-red Output
result did you observe after the saved editor run?

**PASS:** The learner reports no red Output error; continue to L13.S01.G02.
**RETRY:** Request the exact first-red result. **DIAGNOSE:** Use the required
recovery order in [debugging.md](../references/debugging.md#the-required-recovery-order)
for the one first error, then rerun this same gate. Do not open Export while a
red error remains.

##### Action group L13.S01.G02 — Compare the two final trees

1. Open main.tscn and expand Main through every HUD child.
2. Open falling_thing.tscn and expand FallingThing through every child.
3. Compare both visible trees, including node types and capitalization, with
   NODE-L13.

**Observable gate — L13.S01.G02 final trees:** State the exact direct Main
children in order and the four direct FallingThing children in order.

**PASS:** The learner reports the two exact NODE-L13 trees; continue to
L13.S01.G03. **RETRY:** Request one missing name, type, or order.
**DIAGNOSE:** Restore only the visible differing tree segment using
[SYM-NAME-01](../facilitator-solutions/troubleshooting-map.md#sym-name-01-wrong-node-capitalization)
or [SYM-PATH-01](../facilitator-solutions/troubleshooting-map.md#sym-path-01-null-node-path),
then repeat this gate.

##### Action group L13.S01.G03 — Check final settings and connections

1. In Project Settings, confirm Compatibility, viewport 480 × 720, and stretch
   canvas_items / keep.
2. In the Inspector, compare the final values with PROP-L13.
3. In the Node dock, confirm all five entries named in the entry evidence.

**Observable gate — L13.S01.G03 canonical preflight:** Report the renderer,
viewport/stretch pair, and the five sender-to-callback connection entries.

**PASS:** The learner reports Compatibility, 480 × 720, canvas_items / keep,
and all five canonical connections; continue to L13.S01.G04. **RETRY:** Request
the missing value or connection. **DIAGNOSE:** Restore only the changed
canonical value or connection, then rerun this gate. The five entries are
listed in [the signals reference](../references/signals.md#the-five-required-connections).

##### Action group L13.S01.G04 — Back up and choose destination

1. With the adult, make a backup copy of the project folder using the agreed
   local backup method; do not treat .godot as the source copy.
2. Create or select an exports/ folder beside the project folder.
3. State the backup location and the chosen exports/ location.

**Observable gate — L13.S01.G04 backup and destination:** What exact backup
location and export location did you choose, and is exports/ outside res://art,
res://audio, and .godot?

**PASS:** The learner supplies both locations and confirms the export folder is
outside imported assets; continue to L13.S02. **RETRY:** Request the missing
location or outside-project fact. **DIAGNOSE:** If the destination is inside
imported assets, choose a neighboring exports/ folder and repeat this gate.

#### Check your work

Ask: “Why do we run and save before exporting?” **PASS** requires the idea
that export copies the saved project and does not repair an editor error.

#### If it does not work

- **Godot still shows a red error:** Record only the first red line and follow
  the required recovery order before returning to this preflight.
- **A node name or path differs:** Compare the visible tree with NODE-L13; do
  not rename a different node as a shortcut.
- **A property looks unfamiliar:** Check PROP-L13 and restore only the
  differing value; do not tune speed or collision settings during final test.

#### References

- [Final node trees](../facilitator-solutions/authoritative-node-trees.md#lesson-13-node-l13)
- [Final canonical properties](../facilitator-solutions/property-checkpoints.md#lesson-13-prop-l13)
- [Export preflight](../references/exporting.md#before-opening-the-export-menu)
- [Small-problem recovery order](../references/debugging.md#the-required-recovery-order)

### L13.S02 — Record editor acceptance evidence

#### Step goal

Turn the final game checks into observed evidence before comparing an export.

#### Short explanation

A test is a promised action and a visible result. This table makes sure a
single lucky round cannot hide a wrong mapping, duplicate resolution, locked
input failure, missing art, or missing sound.

#### Actions

##### Action group L13.S02.G01 — Copy the evidence table

In a notebook, document, or session record, copy this table. Fill Observed
only after doing the action. A row is not PASS until the learner actually sees
the expected result.

| Case | Action | Expected | Observed | PASS |
|---|---|---|---|---|
| New round | Run a fresh editor game | Score: 0; line blue; one active object |  |  |
| Two toggles | Press Space twice before crossing | blue → red → blue |  |  |
| Both types | Wait through spawns | GUITAR and SPAGHETTI each appear |  |  |
| Spawn bounds | Watch one spawn | x from 60 to 420; y is -40 above play area |  |  |
| Blue + GUITAR | Let GUITAR cross blue | score adds one; one next object follows delay |  |  |
| Red + SPAGHETTI | Switch to red; let SPAGHETTI cross | score adds one; one next object follows delay |  |  |
| Blue + SPAGHETTI | Let SPAGHETTI cross blue | score unchanged; one game-over resolution |  |  |
| Red + GUITAR | Switch to red; let GUITAR cross | score unchanged; one game-over resolution |  |  |
| Locked loss | Press Space and wait with panel visible | no toggle and no later spawn |  |  |
| Restart | Click Play Again | score zero, blue, hidden panel, one new object |  |  |
| Art and audio | Observe switch, success, mismatch | two artworks and three named sounds work |  |  |

**Observable gate — L13.S02.G01 evidence table:** Which eleven case names are
written, and which two columns must contain learner-observed evidence before a
row can pass?

**PASS:** The learner names all eleven cases and Observed plus PASS; continue to
L13.S02.G02. **RETRY:** Request the missing case or column. **DIAGNOSE:** If a
row omits an action, expected result, observed result, or PASS field, restore
that row before testing. Do not replace a mismatch row with “game works.”

##### Action group L13.S02.G02 — Observe playing rows

1. Run a fresh editor game and fill New round, Two toggles, Both types, and
   Spawn bounds from what the learner sees: its x position is from 60 to 420
   and its y position is -40 before it falls.
2. Wait for a GUITAR and test blue + GUITAR; record score change and direct
   FallingThings child count after the delay.
3. Wait for a SPAGHETTI, switch to red, and test red + SPAGHETTI the same way.

**Observable gate — L13.S02.G02 editor wins:** Report initial score and line,
both toggle colors, the two kinds observed, each winning pair's score change,
and direct FallingThings child count after each delay.

**PASS:** The learner observes Score: 0, blue → red → blue, both kinds, each
winning pair adding exactly one, and exactly one next object after each delay;
continue to L13.S02.G03. **RETRY:** Request the missing observation.
**DIAGNOSE:** A reversed mapping uses
[SYM-MAP-01](../facilitator-solutions/troubleshooting-map.md#sym-map-01-guitarspaghetti-color-mapping-reversed);
two scores or objects uses
[SYM-SCORE-01](../facilitator-solutions/troubleshooting-map.md#sym-score-01-one-object-scores-twice).
Repair one named cause, then repeat only the failed row.

##### Action group L13.S02.G03 — Observe both mismatch rows

1. On a SPAGHETTI, keep the line blue and record the blue + SPAGHETTI row.
2. After Play Again, on a GUITAR switch to red and record the red + GUITAR row.
3. For each row, press Space and wait while the panel is visible.

**Observable gate — L13.S02.G03 editor mismatches:** For both mismatches, report
score before/final score, whether one object exploded before the panel, whether
Space changed the line, and whether a later object appeared.

**PASS:** The learner observes unchanged score, one explosion then one panel,
no toggle, and no later spawn for both rows; continue to L13.S02.G04.
**RETRY:** Request the missing action/result. **DIAGNOSE:** Use the current
symptom's exact recovery branch—mapping, reset, signal, or first red error—and
repeat only that mismatch row. Do not record a mismatch PASS from score alone.

##### Action group L13.S02.G04 — Observe restart and assets

1. Click Play Again after the second loss; record score, line color, panel, and
   FallingThings child count after the new object appears.
2. Make one line switch, one correct match, and one mismatch; listen for the
   switch, success, and explosion sounds.
3. Confirm each falling type shows its intended artwork and record the first
   red Output result.

**Observable gate — L13.S02.G04 editor final rows:** What exact reset state,
child count, three sounds, two artworks, and first-red result did you observe?

**PASS:** The learner reports Score: 0, blue, hidden panel, exactly one child,
the three named feedback sounds, both artworks, and no red Output error. Mark
every editor table row PASS, then continue to L13.S03. **RETRY:** Request the
missing observed result. **DIAGNOSE:** Missing art uses
[SYM-ASSET-01](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge),
silent audio uses
[SYM-AUDIO-01](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent),
and a red error uses the required recovery order. Rerun only the affected row.

#### Check your work

Ask: “Why must we test both wrong pairs, not just one?” **PASS** requires the
idea that blue + SPAGHETTI and red + GUITAR are different possible mistakes.

#### If it does not work

- **A kind does not appear soon:** Keep observing the one-at-a-time spawn loop;
  do not edit randomness or manually force a second active object.
- **A row seems right but has no observation:** Leave it unmarked and repeat
  its exact action.
- **The loss happens twice or a new object appears:** Do not proceed to export;
  return to the named one-resolution or reset diagnosis.

#### References

- [Visible signal results](../references/signals.md#check-the-visible-result)
- [Final script checkpoint](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12)
- [Asset recovery](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)
- [Audio recovery](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent)

### L13.S03 — Export one desktop debug build

#### Step goal

Install matching templates, make a preset for this computer, and run the debug
build outside the editor.

#### Short explanation

Godot needs an export template that exactly matches its version to make a
playable desktop program. The export preset records target settings, while the
chosen exports/ path keeps generated files separate from source assets.

#### Actions

##### Action group L13.S03.G01 — Install matching template

1. In Godot choose **Editor → Manage Export Templates**.
2. Confirm the editor version is 4.7.1 and install matching 4.7.1 templates
   using the manager or matching official package.
3. Wait for the manager to show the required desktop template as installed.

**Observable gate — L13.S03.G01 export template:** What Godot version and
installed-template result does the manager show?

**PASS:** The learner reports 4.7.1 and matching desktop template installed;
continue to L13.S03.G02. **RETRY:** Request both facts. **DIAGNOSE:** If
templates are missing or mismatched, collect the exact message and use
[SYM-EXPORT-01](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing).
Do not continue with a near-match.

##### Action group L13.S03.G02 — Add computer's desktop preset

1. Choose **Project → Export…**, then **Add…**, and select the desktop platform
   matching this computer: macOS, Windows Desktop, or Linux/X11.
2. Keep ordinary resource options at defaults; do not choose Export PCK/ZIP for
   this playable test build.
3. For macOS, enter a valid lowercase learner-specific reverse-DNS bundle
   identifier, such as com.lee.guitarandspaghetti.

**Observable gate — L13.S03.G02 desktop preset:** What preset platform is
selected, and, on macOS, what exact bundle identifier is visible?

**PASS:** The learner reports the platform matching the development computer
and, if macOS, a valid lowercase learner-specific identifier; continue to
L13.S03.G03. **RETRY:** Request the missing selected-platform or identifier
fact. **DIAGNOSE:** If the target differs from the current computer or is
PCK/ZIP, select the matching desktop preset and repeat this gate.

##### Action group L13.S03.G03 — Create and run debug export

1. Set the preset path inside agreed exports/: .app on macOS, .exe on Windows,
   or the desktop executable path on Linux.
2. Choose **Export Project**, select **Debug**, and wait for completion.
3. Open the exported build from its exports/ location, outside Godot.

**Observable gate — L13.S03.G03 exported launch:** What exact export path did
you select, did export complete, and what appears when the outside-editor
build opens?

**PASS:** The learner reports the chosen outside-assets path, completed debug
export, and an exported game window; continue to L13.S04. **RETRY:** Request
the missing path, completion, or launch observation. **DIAGNOSE:** An invalid
path, missing resource, or launch warning is not PASS: capture its exact
message and follow the matching recovery branch below before re-export.

#### Check your work

Ask: “Why is an exported test not finished when the Export dialog turns
green?” **PASS** requires the idea that the playable build must be opened and
observed outside the editor.

#### If it does not work

- **Template missing or version mismatch:** Use SYM-EXPORT-01; install only the
  4.7.1 template matching the running editor.
- **Export path is invalid:** Choose agreed exports/, outside assets and .godot,
  then export again.
- **macOS shows an unsigned-app warning:** The adult reads the exact warning
  and decides whether to open the build just created. Do not bypass security
  settings, set up signing, or run unrelated commands.
- **Windows or Linux reports a warning or permission problem:** Record exact
  text and return to the export recovery branch; do not change unrelated
  permissions or install signing tools.
- **Artwork, sound, or another resource is missing:** Keep the exact first
  message or screenshot, repair that one source-project issue, then re-export.

#### References

- [Install matching export templates](../references/exporting.md#install-matching-export-templates)
- [Add a preset for this computer](../references/exporting.md#add-a-preset-for-this-computer)
- [macOS primary path](../references/exporting.md#macos-primary-path)
- [Windows and Linux differences](../references/exporting.md#windows-and-linux-differences)
- [Export-template recovery](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing)

### L13.S04 — Prove exported-build parity

#### Step goal

Show that the exported game has the same core behavior as the verified editor
game, then close the course with observable evidence.

#### Short explanation

An editor result proves the editor result only. Repeating the two winning
mappings, two mismatch mappings, and restart in the exported build checks that
the actual desktop program loaded the same scenes, scripts, art, audio, and
settings.

#### Actions

##### Action group L13.S04.G01 — Repeat two exported wins

1. In the exported build, record its fresh score and line color in the table.
2. Test blue + GUITAR and record exact score change and next-object result.
3. Test red + SPAGHETTI and record exact score change and next-object result.

**Observable gate — L13.S04.G01 exported wins:** What initial score/color and
what result did each exported winning pair produce, compared with its editor
row?

**PASS:** The learner observes Score: 0 and blue initially; both pairs add
exactly one and make one next object, matching editor rows; continue to
L13.S04.G02. **RETRY:** Request the missing observed comparison.
**DIAGNOSE:** Mark the row DIAGNOSE, preserve the first error or screenshot,
close the export, and repair one supported source-project difference before
re-exporting. Do not call editor-only evidence parity.

##### Action group L13.S04.G02 — Repeat two exported mismatches

1. In the exported build, test blue + SPAGHETTI and record the loss result.
2. Restart, then test red + GUITAR and record the loss result.
3. For each loss, press Space and wait while its panel is visible.

**Observable gate — L13.S04.G02 exported mismatches:** For each exported
mismatch, what were score before/final score, one-resolution result, Space
result, and later-spawn result compared with editor?

**PASS:** Both exported mismatches keep score unchanged, resolve once, explode
before one panel, ignore Space, make no later spawn, and match editor rows;
continue to L13.S04.G03. **RETRY:** Request the missing comparison.
**DIAGNOSE:** Mark only the differing row DIAGNOSE, keep its evidence, correct
the source project, then re-export and repeat that row.

##### Action group L13.S04.G03 — Repeat restart and assets outside Godot

1. Click Play Again in the exported build after a mismatch.
2. Record score, line, panel, and exactly one new object.
3. Record the two artworks and switch, success, and explosion sounds in the
   exported build, then compare each result with its editor row.

**Observable gate — L13.S04.G03 exported restart and assets:** What reset
state, child count, artworks, sounds, and editor/export comparison did you
observe?

**PASS:** The learner reports Score: 0, blue, hidden panel, exactly one new
object, both artworks, all three named sounds, and a match with editor.
Continue to L13.S04.G04. **RETRY:** Request the missing observation.
**DIAGNOSE:** A different exported result remains DIAGNOSE, even if editor rows
pass. Preserve the evidence, diagnose one source difference, and re-export
before continuing.

##### Action group L13.S04.G04 — Mark final evidence and reflect

1. Review every table row; mark PASS only when observed editor and exported
   results match.
2. Ask the child to explain what scenes, scripts, signals, and checkpoints did
   in this project.
3. Name one optional next project: increasing speed over time or handling
   multiple falling objects. Do not implement it in this finished project.

**Observable gate — L13.S04.G04 final evidence:** Are all eleven rows PASS with
matching editor/export observations, and how does the child explain scenes,
scripts, signals, and checkpoints?

**PASS:** Every row has observed matching editor/export evidence and the child
gives their own explanation. Continue to the lesson checkpoint.
**RETRY:** Request the one unrecorded row or explanation. **DIAGNOSE:** Any
different exported behavior, missing observation, red error, missing resource,
or unresolved security/launch warning keeps L13 incomplete; fix only the named
issue, re-export, and repeat its row.

#### Check your work

Ask: “What is the difference between an editor test and an exported-build
test?” **PASS** requires the idea that the exported test checks the playable
desktop copy outside Godot, so both need observed evidence.

#### If it does not work

- **The editor passes but export differs:** Mark DIAGNOSE; preserve the exact
  difference and follow the relevant source-project recovery branch. Do not
  mark L13 complete.
- **A resource is missing in export:** Use SYM-ASSET-01 for art or inspect the
  named audio stream; fix source project, rerun editor evidence, export again.
- **The app cannot open because of a system warning:** Record the warning and
  let the adult decide safe next step. Do not disable security features.
- **The table is blank after a test:** Repeat the action and write what the
  learner actually sees before selecting PASS or DIAGNOSE.

#### References

- [Compare editor and exported behavior](../references/exporting.md#compare-editor-and-exported-behavior)
- [Export recovery branches](../references/exporting.md#recovery-branches)
- [First-error recovery](../references/debugging.md#the-required-recovery-order)
- [Final canonical properties](../facilitator-solutions/property-checkpoints.md#lesson-13-prop-l13)

## Lesson checkpoint

Before recording L13_COMPLETE, require all of this observable evidence:

1. Saved trees exactly match NODE-L13, final values exactly match PROP-L13, and
   five required signal connections are visible.
2. The editor evidence table has PASS observations for initial score/blue line,
   two toggles, both types, spawn bounds, two correct mappings, two mismatch
   mappings, one resolution per mismatch, no post-loss input/spawn, complete
   restart, and art/audio.
3. The learner installed templates matching Godot 4.7.1, used the desktop
   preset for the current computer, selected an outside-assets exports/ path,
   made a debug export, and opened that build outside Godot.
4. The exported build repeats both winning mappings, both mismatch mappings,
   locked loss, restart, and assets with observed results matching editor.
5. No current red editor error, export failure, missing resource, different
   exported behavior, or unresolved security/launch warning remains.

**PASS:** Record L13_COMPLETE only when every item has learner-observed
evidence. **RETRY:** Request the one missing tree, value, connection, table
row, export-path, launch, or parity observation. **DIAGNOSE:** Preserve the
first exact difference and return to its named recovery branch. A successful
editor run or successful Export dialog alone is never sufficient.

## Explain it back

Ask the child: “What job did scenes, scripts, signals, and checkpoints each do
while you made Guitar and Spaghetti?” A good answer says scenes arranged game
pieces, scripts told them how to behave, signals let pieces send messages, and
checkpoints proved a saved stage worked before the next one. Accept the child's
own wording.

## Safe experiment

After L13_COMPLETE, choose one future-project idea to describe on paper:
increasing speed over time or safely handling multiple falling objects. Record
it as a new project idea, not an edit to this exported checkpoint. Do not
change this game's speed, one-object rule, mappings, state machine, assets, or
export preset while preserving the final canonical build.

## If you stop here

Update progress state with only observed facts. If L13_COMPLETE has not passed,
keep current L13.S##.G## gate as next_action and record the specific table row,
first red error, export message, launch warning, or editor/export difference.
If it has passed, record L13_COMPLETE and use this handoff format:

~~~text
SESSION_HANDOFF
checkpoint: L13_COMPLETE
next_action: Playbook complete — begin an optional new project only
observed: all final editor acceptance rows have learner-observed PASS evidence
observed: matching 4.7.1 desktop debug export ran outside Godot
observed: four mapping cases, locked loss, restart, art, and audio matched editor evidence
experiment_to_revert: none
~~~

Do not claim final completion without learner's own editor and exported
observations for every listed case.

## Next lesson

The core playbook is complete after L13_COMPLETE. Keep exported debug build and
evidence table as finished-project record. A future project may start from a
fresh plan for increasing speed over time or multiple falling objects; it is
not a continuation of this canonical checkpoint.
