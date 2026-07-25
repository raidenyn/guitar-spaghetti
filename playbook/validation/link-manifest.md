# Playbook Link Manifest

Review date: **2026-07-25**

`STATIC PASS` for an external URL means its source, topic, and versioned path
were inspected in the repository. It does not claim a live network request;
live availability is reserved for the final completion audit. `PASS` for an
internal target means the file and anchor exist and were inspected. Godot
documentation targets use `/en/4.7/`; the official 4.7.1 download archive is
an allowed release/download page rather than a versioned documentation page.

## External URLs

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| EXT-001 | [Lesson 01 — L01.S02](../lessons/01-install-and-create.md#l01s02-download-and-open-the-right-godot-editor) | [Godot 4.7.1 download archive](https://godotengine.org/download/archive/4.7.1-stable/) | Download the standard editor for the learner's operating system. | Official 4.7.1 release/download page | 2026-07-25 | STATIC PASS |
| EXT-002 | [Editor map](../references/editor-map.md); [movement reference](../references/coordinates-movement-and-delta.md) | [Introduction to 2D](https://docs.godotengine.org/en/4.7/tutorials/2d/introduction_to_2d.html) | Explain the 2D workspace, coordinates, and game objects. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-003 | [Nodes/scenes reference](../references/nodes-scenes-and-instances.md) | [Nodes and Scenes](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/nodes_and_scenes.html) | Official second explanation of nodes, scenes, and instances. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-004 | [GDScript mini-reference](../references/gdscript-mini-reference.md) | [GDScript basics](https://docs.godotengine.org/en/4.7/tutorials/scripting/gdscript/gdscript_basics.html) | Full language syntax reference behind the course subset. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-005 | [Input actions](../references/input-actions.md) | [InputEvent](https://docs.godotengine.org/en/4.7/classes/class_inputevent.html) | Official event API used by MatchLine input handling. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-006 | [Input actions](../references/input-actions.md) | [InputMap](https://docs.godotengine.org/en/4.7/classes/class_inputmap.html) | Official named-action API behind `switch_line`. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-007 | [Timers and randomness](../references/timers-and-randomness.md) | [Timer](https://docs.godotengine.org/en/4.7/classes/class_timer.html) | Explain SpawnDelay properties and timeout. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-008 | [Timers and randomness](../references/timers-and-randomness.md) | [Random number generation](https://docs.godotengine.org/en/4.7/tutorials/math/random_number_generation.html) | Explain random kind and spawn position selection. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-009 | [Signals](../references/signals.md) | [Using signals](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/signals.html) | Official sender/receiver and connection tutorial. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-010 | [Areas and collisions](../references/areas-and-collisions.md) | [Area2D](https://docs.godotengine.org/en/4.7/classes/class_area2d.html) | Official sensor node API for FallingThing and MatchLine. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-011 | [Areas and collisions](../references/areas-and-collisions.md) | [Physics introduction](https://docs.godotengine.org/en/4.7/tutorials/physics/physics_introduction.html) | Distinguish overlap detection from physical blocking. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-012 | [UI and HUD](../references/user-interface.md) | [CanvasLayer](https://docs.godotengine.org/en/4.7/classes/class_canvaslayer.html) | Official drawing-layer behavior for the HUD. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-013 | [UI and HUD](../references/user-interface.md) | [Control](https://docs.godotengine.org/en/4.7/classes/class_control.html) | Official anchors, offsets, and UI-node base class. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-014 | [UI and HUD](../references/user-interface.md) | [GUI containers](https://docs.godotengine.org/en/4.7/tutorials/ui/gui_containers.html) | Explain VBoxContainer and automatic layout. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-015 | [Debugging](../references/debugging.md) | [Overview of debugging tools](https://docs.godotengine.org/en/4.7/tutorials/scripting/debug/overview_of_debugging_tools.html) | Official Output/Debugger concepts behind evidence-led recovery. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-016 | [Lesson 11 — L11.S02](../lessons/11-create-and-import-artwork.md#l11s02-put-the-pictures-in-godot); [asset reference](../references/importing-assets.md) | [Importing images](https://docs.godotengine.org/en/4.7/tutorials/assets_pipeline/importing_images.html) | Import the two child-made PNG textures. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-017 | [Asset reference](../references/importing-assets.md) | [Importing audio samples](https://docs.godotengine.org/en/4.7/tutorials/assets_pipeline/importing_audio_samples.html) | Import WAV/OGG event sounds. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-018 | [Exporting reference](../references/exporting.md) | [Exporting projects](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_projects.html) | General desktop export workflow and templates. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-019 | [Exporting reference](../references/exporting.md#macos-primary-path) | [Exporting for macOS](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_macos.html) | Platform details for the primary macOS path. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-020 | [Exporting reference](../references/exporting.md#windows-and-linux-differences) | [Exporting for Windows](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_windows.html) | Platform differences for a Windows debug build. | Godot 4.7 | 2026-07-25 | STATIC PASS |
| EXT-021 | [Exporting reference](../references/exporting.md#windows-and-linux-differences) | [Exporting for Linux](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_linux.html) | Platform differences for a Linux debug build. | Godot 4.7 | 2026-07-25 | STATIC PASS |

## Startup, handoff, and checkpoint routes

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| INT-001 | [START_HERE launch order](../START_HERE.md#launch-path-repository-aware-model) | [Facilitator contract](../FACILITATOR_CONTRACT.md) | Load stable rules before variable lesson context. | Playbook 1.0 | 2026-07-25 | PASS |
| INT-002 | [START_HERE launch order](../START_HERE.md#launch-path-repository-aware-model) | [Progress state template](../PROGRESS_STATE.template.md) | Supply durable checkpoint, observed state, and one next action. | Playbook 1.0 | 2026-07-25 | PASS |
| INT-003 | [START_HERE session guidance](../START_HERE.md#during-and-after-a-session) | [Exact SESSION_HANDOFF schema](../PROGRESS_STATE.template.md#sessionhandoff) | Transfer observed state without hidden chat history. | Playbook 1.0 | 2026-07-25 | PASS |
| INT-004 | All 13 lesson `Facilitator contract` sections | [FC-01 through FC-15](../FACILITATOR_CONTRACT.md#non-negotiable-execution-rules) | Reassert the stable contract in every lesson. | Playbook 1.0 | 2026-07-25 | PASS |
| INT-005 | [Lesson 01 next lesson](../lessons/01-install-and-create.md#next-lesson) | [Lesson 02](../lessons/02-meet-the-editor.md) | Begin the sequential `L01_COMPLETE → L02` route. | Playbook 1.0 | 2026-07-25 | PASS |
| INT-006 | Every lesson `Entry evidence` and `Next lesson` section | [Canonical checkpoint chain in requirements](requirements-checklist.md#lesson-roadmap-and-checkpoint-chain) | Keep `START → L01_COMPLETE … L13_COMPLETE` continuous. | Playbook 1.0 | 2026-07-25 | PASS |

## Authoritative node-tree links

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| NODE-03 | [Lesson 03](../lessons/03-build-the-screen.md) | [NODE-L03](../facilitator-solutions/authoritative-node-trees.md#lesson-03-node-l03) | Compare the first screen tree. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-04 | [Lesson 04](../lessons/04-make-the-line-interactive.md) | [NODE-L04](../facilitator-solutions/authoritative-node-trees.md#lesson-04-node-l04) | Verify MatchLine script attachment. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-05 | [Lesson 05](../lessons/05-create-a-falling-thing.md) | [NODE-L05](../facilitator-solutions/authoritative-node-trees.md#lesson-05-node-l05) | Compare reusable scene and temporary instance. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-06 | [Lesson 06](../lessons/06-create-guitars-and-spaghetti.md) | [NODE-L06](../facilitator-solutions/authoritative-node-trees.md#lesson-06-node-l06) | Preserve the reusable two-kind tree. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-07 | [Lesson 07](../lessons/07-spawn-objects-randomly.md) | [NODE-L07](../facilitator-solutions/authoritative-node-trees.md#lesson-07-node-l07) | Verify holder, timer, and no manual instance. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-08 | [Lesson 08](../lessons/08-detect-the-crossing.md) | [NODE-L08](../facilitator-solutions/authoritative-node-trees.md#lesson-08-node-l08) | Verify both sensor-bearing trees. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-09 | [Lesson 09](../lessons/09-match-and-score.md) | [NODE-L09](../facilitator-solutions/authoritative-node-trees.md#lesson-09-node-l09) | Verify HUD script addition. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-10 | [Lesson 10](../lessons/10-lose-and-restart.md) | [NODE-L10](../facilitator-solutions/authoritative-node-trees.md#lesson-10-node-l10) | Verify game-over panel hierarchy. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-11 | [Lesson 11](../lessons/11-create-and-import-artwork.md) | [NODE-L11](../facilitator-solutions/authoritative-node-trees.md#lesson-11-node-l11) | Preserve placeholder/sprite/collision separation. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-12 | [Lesson 12](../lessons/12-add-sound-and-game-feel.md) | [NODE-L12](../facilitator-solutions/authoritative-node-trees.md#lesson-12-node-l12) | Verify three direct audio players. | Playbook 1.0 | 2026-07-25 | PASS |
| NODE-13 | [Lesson 13](../lessons/13-test-and-export.md) | [NODE-L13](../facilitator-solutions/authoritative-node-trees.md#lesson-13-node-l13) | Final canonical tree preflight. | Playbook 1.0 | 2026-07-25 | PASS |

## Authoritative property links

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| PROP-03 | [Lesson 03](../lessons/03-build-the-screen.md) | [PROP-L03](../facilitator-solutions/property-checkpoints.md#lesson-03-prop-l03) | Screen, background, line, shape, and score values. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-04 | [Lesson 04](../lessons/04-make-the-line-interactive.md) | [PROP-L04](../facilitator-solutions/property-checkpoints.md#lesson-04-prop-l04) | Exact action name and Physical Space event. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-05 | [Lesson 05](../lessons/05-create-a-falling-thing.md) | [PROP-L05](../facilitator-solutions/property-checkpoints.md#lesson-05-prop-l05) | FallingThing geometry, layers, test position, and speed. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-06 | [Lesson 06](../lessons/06-create-guitars-and-spaghetti.md) | [PROP-L06](../facilitator-solutions/property-checkpoints.md#lesson-06-prop-l06) | Kind-to-color/label mapping. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-07 | [Lesson 07](../lessons/07-spawn-objects-randomly.md) | [PROP-L07](../facilitator-solutions/property-checkpoints.md#lesson-07-prop-l07) | Safe spawn range and timer settings. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-08 | [Lesson 08](../lessons/08-detect-the-crossing.md) | [PROP-L08](../facilitator-solutions/property-checkpoints.md#lesson-08-prop-l08) | Collision shapes and layer/mask contract. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-09 | [Lesson 09](../lessons/09-match-and-score.md) | [PROP-L09](../facilitator-solutions/property-checkpoints.md#lesson-09-prop-l09) | Score origin and canonical two-pair mapping. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-10 | [Lesson 10](../lessons/10-lose-and-restart.md) | [PROP-L10](../facilitator-solutions/property-checkpoints.md#lesson-10-prop-l10) | Panel layout and explosion tween. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-11 | [Lesson 11](../lessons/11-create-and-import-artwork.md) | [PROP-L11](../facilitator-solutions/property-checkpoints.md#lesson-11-prop-l11) | Exact texture paths and uniform art box. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-12 | [Lesson 12](../lessons/12-add-sound-and-game-feel.md) | [PROP-L12](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12) | Streams, Autoplay, volumes, and restored tuning. | Playbook 1.0 | 2026-07-25 | PASS |
| PROP-13 | [Lesson 13](../lessons/13-test-and-export.md) | [PROP-L13](../facilitator-solutions/property-checkpoints.md#lesson-13-prop-l13) | Final cumulative preflight values. | Playbook 1.0 | 2026-07-25 | PASS |

## Authoritative script links

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| SCRIPT-04 | [Lesson 04](../lessons/04-make-the-line-interactive.md) | [SCRIPT-L04](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04) | Complete first MatchLine script. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-05 | [Lesson 05](../lessons/05-create-a-falling-thing.md) | [SCRIPT-L05](../facilitator-solutions/script-checkpoints.md#lesson-05-script-l05) | Complete first FallingThing movement script. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-06 | [Lesson 06](../lessons/06-create-guitars-and-spaghetti.md) | [SCRIPT-L06](../facilitator-solutions/script-checkpoints.md#lesson-06-script-l06) | Complete two-kind visual script. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-07 | [Lesson 07](../lessons/07-spawn-objects-randomly.md) | [SCRIPT-L07](../facilitator-solutions/script-checkpoints.md#lesson-07-script-l07) | Complete one-object random spawning scripts. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-08 | [Lesson 08](../lessons/08-detect-the-crossing.md) | [SCRIPT-L08](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08) | Complete crossing and timer-loop scripts. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-09 | [Lesson 09](../lessons/09-match-and-score.md) | [SCRIPT-L09](../facilitator-solutions/script-checkpoints.md#lesson-09-script-l09) | Complete matching, HUD, and temporary mismatch scripts. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-10 | [Lesson 10](../lessons/10-lose-and-restart.md) | [SCRIPT-L10](../facilitator-solutions/script-checkpoints.md#lesson-10-script-l10) | Complete game state, explosion, and restart scripts. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-11 | [Lesson 11](../lessons/11-create-and-import-artwork.md) | [SCRIPT-L11](../facilitator-solutions/script-checkpoints.md#lesson-11-script-l11) | Complete artwork-selection scripts. | Playbook 1.0 | 2026-07-25 | PASS |
| SCRIPT-12 | [Lesson 12](../lessons/12-add-sound-and-game-feel.md); [Lesson 13](../lessons/13-test-and-export.md) | [SCRIPT-L12](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12) | Final scripts and five signal connections. | Playbook 1.0 | 2026-07-25 | PASS |

## Diagnostic routing links

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| SYM-01 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-NAME-01](../facilitator-solutions/troubleshooting-map.md#sym-name-01-wrong-node-capitalization) | Correct one exact node-capitalization mismatch. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-02 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-PATH-01](../facilitator-solutions/troubleshooting-map.md#sym-path-01-null-node-path) | Repair one differing node-path segment. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-03 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-GD-01](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error) | Diagnose exact first parse/indentation error. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-04 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-SIGNAL-01](../facilitator-solutions/troubleshooting-map.md#sym-signal-01-expected-callback-never-runs) | Verify one sender/receiver callback connection. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-05 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-SHAPE-01](../facilitator-solutions/troubleshooting-map.md#sym-shape-01-missing-or-disabled-collision-shape) | Restore one missing/disabled rectangle. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-06 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-LAYER-01](../facilitator-solutions/troubleshooting-map.md#sym-layer-01-areas-overlap-but-the-signal-does-not-fire) | Correct canonical layer/mask bits. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-07 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-SCORE-01](../facilitator-solutions/troubleshooting-map.md#sym-score-01-one-object-scores-twice) | Restore one connection and resolution guard. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-08 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-MAP-01](../facilitator-solutions/troubleshooting-map.md#sym-map-01-guitarspaghetti-color-mapping-reversed) | Restore blue/GUITAR and red/SPAGHETTI. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-09 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-RESET-01](../facilitator-solutions/troubleshooting-map.md#sym-reset-01-old-object-remains-after-restart) | Clear old children and defer one spawn. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-10 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-ASSET-01](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge) | Repair one asset path/visibility/scale issue. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-11 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-AUDIO-01](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent) | Inspect one AudioStreamPlayer and fix one setting. | Playbook 1.0 | 2026-07-25 | PASS |
| SYM-12 | [Debugging symptom routing](../references/debugging.md#symptom-routing) | [SYM-EXPORT-01](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing) | Install exact 4.7.1 templates after exact error evidence. | Playbook 1.0 | 2026-07-25 | PASS |

## Concept and final-acceptance links

| Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result |
|---|---|---|---|---|---|---|
| REF-01 | Lessons 01–03 | [Editor map](../references/editor-map.md) | Find the Project Manager, docks, viewport, run, save, undo, and warnings. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-02 | Lessons 01, 02, 05–07 | [Nodes, scenes, and instances](../references/nodes-scenes-and-instances.md) | Explain reusable scene structure and instantiation. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-03 | Lessons 04–12 | [GDScript mini-reference](../references/gdscript-mini-reference.md) | Explain only the code concepts used in the current lesson. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-04 | Lessons 05–07 | [Coordinates, movement, and delta](../references/coordinates-movement-and-delta.md) | Explain y-down, spawn points, and frame-independent speed. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-05 | [Lesson 04](../lessons/04-make-the-line-interactive.md) | [Input actions](../references/input-actions.md) | Create and read exact `switch_line`. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-06 | Lessons 07–08 | [Timers and randomness](../references/timers-and-randomness.md) | Explain SpawnDelay, random kind, and safe x range. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-07 | Lessons 08, 10, 12, 13 | [Signals](../references/signals.md) | Explain event ownership and final five connections. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-08 | Lessons 05 and 08 | [Areas and collisions](../references/areas-and-collisions.md) | Explain sensors, shapes, layers, masks, and crossing. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-09 | Lessons 03, 09, 10 | [User interface and HUD](../references/user-interface.md) | Explain CanvasLayer, Control layout, and overlay. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-10 | All failure branches | [Debugging](../references/debugging.md#the-required-recovery-order) | Use first error, one discriminating observation, one change, and rerun. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-11 | Lessons 11–12 | [Importing assets](../references/importing-assets.md) | Import exact art/audio, preserve collision, and record licenses. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-12 | [Lesson 13](../lessons/13-test-and-export.md) | [Exporting](../references/exporting.md) | Preflight, install templates, export locally, and compare behavior. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-13 | Lessons 01 and 11; all sessions | [Parent/coach notes](../references/parent-coach-notes.md) | Keep work child-led and recovery calm. | Playbook 1.0 | 2026-07-25 | PASS |
| REF-14 | All lessons | [Glossary](../references/glossary.md) | Supply friendly then precise definitions for course vocabulary. | Playbook 1.0 | 2026-07-25 | PASS |
| FINAL-01 | [Lesson 13 editor acceptance](../lessons/13-test-and-export.md#l13s02-record-editor-acceptance-evidence) | [Final property checkpoint](../facilitator-solutions/property-checkpoints.md#lesson-13-prop-l13) | Tie observed cases to canonical preflight values. | Playbook 1.0 | 2026-07-25 | PASS |
| FINAL-02 | [Lesson 13 export parity](../lessons/13-test-and-export.md#l13s04-prove-exported-build-parity) | [Editor/export comparison](../references/exporting.md#compare-editor-and-exported-behavior) | Require observed parity outside Godot. | Playbook 1.0 | 2026-07-25 | PASS |
