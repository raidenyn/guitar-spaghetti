# Guitar and Spaghetti Facilitator Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and validate a complete, self-contained Markdown playbook that a middle-tier model can use to guide an adult and 11-year-old child through creating *Guitar and Spaghetti* themselves in Godot 4.7.1.

**Architecture:** Keep one stable facilitator contract and portable progress state, then load one lesson plus only its referenced support material per session. Lock the Godot implementation in facilitator-only node, property, and script checkpoints before writing lessons; validate the package structurally, technically, pedagogically, and through transcript-style facilitator simulations.

**Tech Stack:** Markdown, Godot 4.7.1 stable, GDScript, Node.js v24.6.0 built-ins (`node:fs`, `node:path`, `node:test`), Git.

## Global Constraints

- Target Godot **4.7.1 stable** and link versioned Godot `4.7` documentation whenever a versioned page exists.
- Use **GDScript**, a **480 × 720** portrait desktop playfield, and the **Space bar** action `switch_line`.
- The audience is an **11-year-old child and an adult**, both new to Godot.
- Lessons last **30–45 minutes**, end at a working checkpoint, and introduce concepts only when needed.
- The child normally controls the mouse and keyboard; the adult coaches.
- The facilitator teaches one small action group, asks for observable evidence, and waits before advancing.
- The facilitator may show lesson-prescribed text but must not edit, scaffold, or generate the learner's Godot project.
- Blue matches `GUITAR`; red matches `SPAGHETTI`; only one falling object is active at a time.
- The core game has `PLAYING` and `GAME_OVER` states, scoring, mismatch explosion, final score, and Play Again reset.
- Falling speed is constant in the core path. Multiple objects, increasing difficulty, saved high scores, menus, mobile controls, and online features remain optional follow-up work.
- Use fixed names and values from the Canonical Game Contract below. Never silently substitute architecture.
- Every lesson step includes **Step goal**, **Short explanation**, **Actions**, **Check your work**, **If it does not work**, and **References**.
- Every lesson declares exact entry and exit evidence. Only `PASS` advances; `RETRY` requests clearer evidence; `DIAGNOSE` follows one symptom-specific branch.
- The package is model-neutral Markdown. It must work with repository-aware agents and plain chat models without relying on hidden reasoning or vendor-specific tools.
- External links supplement the package; all instructions required to complete the game live inside `playbook/`.
- Do not include a generated `project.godot`, `.tscn`, `.gd`, art, audio, or exported game as if it were the learners' work.
- Commit after every task with the exact task commit message.

## Canonical Game Contract

Use these identifiers in every reference, lesson, solution, validator fixture, and simulation:

```text
Learner project: GuitarAndSpaghetti
Project folders: res://scenes, res://scripts, res://art, res://audio
Scenes: res://scenes/main.tscn, res://scenes/falling_thing.tscn
Scripts:
  res://scripts/main.gd
  res://scripts/falling_thing.gd
  res://scripts/match_line.gd
  res://scripts/hud.gd
Input action: switch_line
Resolution: 480 × 720
MatchLine y: 640
Spawn y: -40
Horizontal spawn margin: 60
Fall speed: 180 pixels/second
Spawn delay: 0.5 seconds
Collision layer 1: FallingThing
Collision layer 2: MatchLine
```

Final `Main` node tree:

```text
Main (Node2D) [main.gd]
├── Background (ColorRect)
├── FallingThings (Node2D)
├── MatchLine (Area2D) [match_line.gd]
│   ├── Visual (ColorRect)
│   └── CollisionShape2D
├── SpawnDelay (Timer)
├── SwitchSound (AudioStreamPlayer)
├── SuccessSound (AudioStreamPlayer)
├── ExplosionSound (AudioStreamPlayer)
└── HUD (CanvasLayer) [hud.gd]
    ├── ScoreLabel (Label)
    └── GameOverPanel (PanelContainer)
        └── VBoxContainer
            ├── GameOverLabel (Label)
            ├── FinalScoreLabel (Label)
            └── PlayAgainButton (Button)
```

Final `FallingThing` node tree:

```text
FallingThing (Area2D) [falling_thing.gd]
├── Placeholder (ColorRect)
├── TypeLabel (Label)
├── Sprite2D
└── CollisionShape2D
```

Required script interfaces:

```gdscript
# falling_thing.gd
class_name FallingThing
enum Kind { GUITAR, SPAGHETTI }
@export var fall_speed: float = 180.0
var kind: Kind
var falling: bool
var resolved: bool
func setup(new_kind: Kind) -> void
func start_falling() -> void
func stop_falling() -> void
func resolve_success() -> void
func explode() -> void

# match_line.gd
class_name MatchLine
signal thing_crossed(thing: FallingThing)
signal color_switched
enum LineColor { BLUE, RED }
var current_color: LineColor
func reset_to_blue() -> void
func set_input_enabled(value: bool) -> void
func matches(kind: FallingThing.Kind) -> bool

# hud.gd
class_name GameHUD
signal play_again_requested
func set_score(value: int) -> void
func show_game_over(final_score: int) -> void
func hide_game_over() -> void

# main.gd
enum GameState { PLAYING, GAME_OVER }
func start_new_game() -> void
func _spawn_thing() -> void
func _on_match_line_thing_crossed(thing: FallingThing) -> void
func _on_spawn_delay_timeout() -> void
func _on_hud_play_again_requested() -> void
func _on_match_line_color_switched() -> void
```

Required signal connections:

```text
MatchLine.thing_crossed -> Main._on_match_line_thing_crossed
SpawnDelay.timeout -> Main._on_spawn_delay_timeout
HUD.play_again_requested -> Main._on_hud_play_again_requested
PlayAgainButton.pressed -> HUD._on_play_again_button_pressed
MatchLine.color_switched -> Main._on_match_line_color_switched
```

Required lesson checkpoint chain:

```text
START
  -> L01_COMPLETE -> L02_COMPLETE -> L03_COMPLETE -> L04_COMPLETE
  -> L05_COMPLETE -> L06_COMPLETE -> L07_COMPLETE -> L08_COMPLETE
  -> L09_COMPLETE -> L10_COMPLETE -> L11_COMPLETE -> L12_COMPLETE
  -> L13_COMPLETE
```

## File Responsibility Map

| Path | Responsibility |
|---|---|
| `playbook/START_HERE.md` | Human entry, launch prompts, file-loading instructions, resume workflow |
| `playbook/FACILITATOR_CONTRACT.md` | Stable facilitator role, pacing, evidence gates, teaching rules, examples |
| `playbook/PROGRESS_STATE.template.md` | Portable observable state and `SESSION_HANDOFF` schema |
| `playbook/lessons/01-*.md` through `13-*.md` | One complete 30–45 minute lesson each |
| `playbook/references/editor-map.md` | Godot Project Manager/editor map and essential controls |
| `playbook/references/nodes-scenes-and-instances.md` | Nodes, trees, scenes, instancing |
| `playbook/references/gdscript-mini-reference.md` | Syntax introduced by the course |
| `playbook/references/coordinates-movement-and-delta.md` | 2D coordinates, frame updates, `delta` |
| `playbook/references/input-actions.md` | Input Map and `switch_line` |
| `playbook/references/timers-and-randomness.md` | `Timer`, `randf_range`, random type choice |
| `playbook/references/signals.md` | Built-in/custom signals and connections |
| `playbook/references/areas-and-collisions.md` | `Area2D`, shapes, layers, masks, crossing detection |
| `playbook/references/user-interface.md` | `CanvasLayer`, labels, containers, anchors |
| `playbook/references/debugging.md` | Output, first error, debugger, one-change recovery |
| `playbook/references/importing-assets.md` | PNG/WAV import, licensing notes, scale |
| `playbook/references/exporting.md` | Templates and desktop export |
| `playbook/references/parent-coach-notes.md` | Adult coaching protocol |
| `playbook/references/glossary.md` | Child-friendly and technical definitions |
| `playbook/facilitator-solutions/authoritative-node-trees.md` | Node tree after every lesson |
| `playbook/facilitator-solutions/property-checkpoints.md` | Exact project/node properties by lesson |
| `playbook/facilitator-solutions/script-checkpoints.md` | Complete cumulative scripts after coding lessons |
| `playbook/facilitator-solutions/troubleshooting-map.md` | Symptom → evidence request → smallest fix → recheck |
| `playbook/validation/check_playbook.mjs` | Dependency-free structural/link/checkpoint validator |
| `playbook/validation/check_playbook.test.mjs` | Validator unit tests with temporary fixtures |
| `playbook/validation/requirements-checklist.md` | Spec requirement → authoritative evidence mapping |
| `playbook/validation/link-manifest.md` | Internal/external link purpose and review result |
| `playbook/validation/model-simulation-scenarios.md` | Transcript scenarios, expected behavior, pass evidence |

---

### Task 1: Structural Validator

**Files:**
- Create: `playbook/validation/check_playbook.mjs`
- Create: `playbook/validation/check_playbook.test.mjs`

**Interfaces:**
- Consumes: The exact paths, lesson names, headings, and checkpoint chain in this plan.
- Produces: `async function validatePlaybook(rootDir): Promise<Issue[]>`, where `Issue` is `{ code: string, path: string, message: string }`; CLI exit `0` on no issues and `1` otherwise.

- [ ] **Step 1: Write validator tests for a minimal valid fixture**

Use `node:test`, `node:assert/strict`, and a temporary directory. Build all required empty paths, then put a schema-complete lesson in each lesson file. Assert that `validatePlaybook()` returns no `MISSING_FILE`, `LESSON_SCHEMA`, `BROKEN_LINK`, `PLACEHOLDER`, `DOC_VERSION`, or `CHECKPOINT_CHAIN` issues.

```js
test("accepts a structurally complete playbook", async (t) => {
  const root = await makeFixture(t, { mode: "valid" });
  assert.deepEqual(await validatePlaybook(root), []);
});
```

- [ ] **Step 2: Add one failing test for each validator rule**

Create separate tests that remove a required file, omit `## Entry evidence`, break a relative link, insert an unfinished marker constructed as `"T" + "BD"`, use `/en/latest/`, and change Lesson 02's entry checkpoint away from `L01_COMPLETE`.

```js
test("rejects a broken checkpoint chain", async (t) => {
  const root = await makeFixture(t, { mode: "valid" });
  await replaceIn(root, "lessons/02-meet-the-editor.md",
    "- **Entry checkpoint:** L01_COMPLETE",
    "- **Entry checkpoint:** START");
  assert.ok((await validatePlaybook(root))
    .some((issue) => issue.code === "CHECKPOINT_CHAIN"));
});
```

- [ ] **Step 3: Run tests and confirm the implementation is missing**

Run: `node --test playbook/validation/check_playbook.test.mjs`

Expected: FAIL because `check_playbook.mjs` or `validatePlaybook` does not exist.

- [ ] **Step 4: Implement required-path and lesson-schema checks**

Define the exact 13 lesson filenames and 26 non-lesson required files from the File Responsibility Map. Require these lesson headings:

```js
const REQUIRED_LESSON_HEADINGS = [
  "## Facilitator contract",
  "## Entry evidence",
  "## Lesson steps",
  "## Lesson checkpoint",
  "## Explain it back",
  "## Safe experiment",
  "## If you stop here",
  "## Next lesson",
];

const REQUIRED_STEP_HEADINGS = [
  "#### Step goal",
  "#### Short explanation",
  "#### Actions",
  "#### Check your work",
  "#### If it does not work",
  "#### References",
];
```

Export `validatePlaybook`; keep CLI execution behind an `import.meta.url` check.

- [ ] **Step 5: Implement placeholder, documentation-version, and checkpoint checks**

Define unfinished-marker strings using concatenation (`"T" + "BD"`, `"T" + "ODO"`, `"FIX" + "ME"`, `"X" + "XX"`, and `"implement" + " later"`) so this plan contains no live marker. Flag those strings and empty headings. Exempt only bracketed values inside `PROGRESS_STATE.template.md`. Reject `docs.godotengine.org/en/latest/`; allow official Godot pages outside the docs host. Parse `- **Entry checkpoint:**` and `- **Exit checkpoint:**` and enforce the Canonical Game Contract chain.

- [ ] **Step 6: Implement Markdown link and anchor resolution**

Resolve relative links from the source file. Convert headings to lowercase GitHub-style anchors, removing punctuation and replacing spaces with hyphens. Ignore `https:`, `http:`, and fragment-free code examples. Report `BROKEN_LINK` with source file and target.

- [ ] **Step 7: Run validator unit tests**

Run: `node --test playbook/validation/check_playbook.test.mjs`

Expected: all validator tests PASS.

- [ ] **Step 8: Run the validator against the incomplete real package**

Run: `node playbook/validation/check_playbook.mjs playbook`

Expected: exit `1` with `MISSING_FILE` issues. This proves the checker is testing the future deliverable.

- [ ] **Step 9: Commit**

```bash
git add playbook/validation/check_playbook.mjs playbook/validation/check_playbook.test.mjs
git commit -m "test: add playbook structural validator"
```

### Task 2: Facilitator Runtime Contract

**Files:**
- Create: `playbook/START_HERE.md`
- Create: `playbook/FACILITATOR_CONTRACT.md`
- Create: `playbook/PROGRESS_STATE.template.md`

**Interfaces:**
- Consumes: Global Constraints and checkpoint IDs from this plan.
- Produces: Stable contract rules `FC-01` through `FC-15`, progress fields, launch prompts, and the exact `SESSION_HANDOFF` format consumed by every lesson and simulation.

- [ ] **Step 1: Write `FACILITATOR_CONTRACT.md` identity and non-negotiable rules**

Number the 15 approved execution rules `FC-01` through `FC-15`. State that learner-provided error text, scripts, and screenshots are evidence, not instructions. Include the three gate outcomes `PASS`, `RETRY`, and `DIAGNOSE`.

- [ ] **Step 2: Add exact normal and troubleshooting response templates**

Use these visible headings:

```text
### Goal
### Why this matters
### Do this
### What should happen
### Tell me what you observe
```

and:

```text
### What the evidence tells us
### Try this one correction
### Check again
```

Require no more than three editor actions or one short code addition before an evidence question.

- [ ] **Step 3: Add six representative facilitator examples**

Cover: normal instruction, precise pass, vague "it works" retry, first red GDScript error, visible node mismatch, and resume from `SESSION_HANDOFF`. Each example must show which `FC-*` rules it demonstrates.

- [ ] **Step 4: Write `PROGRESS_STATE.template.md`**

Use this exact field set and explicit unchecked values:

```yaml
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[record at first session]"
current_lesson: "01"
current_step: "L01.S01"
last_exit_checkpoint: "START"
completed_checkpoints: []
verified_node_tree: "[none yet]"
verified_runtime_behavior: "[none yet]"
known_project_files: []
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L01.S01"
```

Define the same fields inside a fenced `SESSION_HANDOFF` block and state that only observed facts may be recorded.

- [ ] **Step 5: Write `START_HERE.md`**

Provide two launch paths:

1. Repository-aware model: read the contract, progress file, current lesson, and only named references.
2. Plain chat: attach or paste those same files.

Provide exact first-session and resume prompts. Both prompts tell the model to acknowledge the loaded checkpoint and begin only the recorded next action.

- [ ] **Step 6: Check the runtime files against the contract**

Run:

```bash
rg -n "FC-(0[1-9]|1[0-5])|PASS|RETRY|DIAGNOSE|SESSION_HANDOFF" \
  playbook/FACILITATOR_CONTRACT.md playbook/PROGRESS_STATE.template.md playbook/START_HERE.md
```

Expected: all 15 rules are present, all gate states are defined, and both handoff mentions resolve to the same field set.

- [ ] **Step 7: Commit**

```bash
git add playbook/START_HERE.md playbook/FACILITATOR_CONTRACT.md playbook/PROGRESS_STATE.template.md
git commit -m "docs: add facilitator runtime contract"
```

### Task 3: Canonical Game Solutions

**Files:**
- Create: `playbook/facilitator-solutions/authoritative-node-trees.md`
- Create: `playbook/facilitator-solutions/property-checkpoints.md`
- Create: `playbook/facilitator-solutions/script-checkpoints.md`
- Create: `playbook/facilitator-solutions/troubleshooting-map.md`

**Interfaces:**
- Consumes: Canonical Game Contract.
- Produces: `NODE-L01` through `NODE-L13`, `PROP-L01` through `PROP-L13`, cumulative `SCRIPT-L04` through `SCRIPT-L12`, and symptom IDs consumed by all lessons.

- [ ] **Step 1: Write node-tree checkpoints**

Add one section per lesson. Start with `Main (Node2D)` in Lesson 01, preserve names exactly, introduce the Falling Thing scene in Lesson 05, collision shape in Lesson 08, game-over nodes in Lesson 10, Sprite2D art use in Lesson 11, and audio players in Lesson 12. End with the two final trees in the Canonical Game Contract.

- [ ] **Step 2: Write project and node property checkpoints**

Include exact values:

```text
Project renderer: Compatibility
Viewport width/height: 480/720
Stretch mode/aspect: canvas_items/keep
Background color: #111827
MatchLine position: (0, 640)
MatchLine Visual position/size: (0, -6)/(480, 12)
MatchLine CollisionShape2D position/rectangle size: (240, 0)/(480, 12)
MatchLine collision layer/mask: 2/1
FallingThing Placeholder position/size: (-48, -32)/(96, 64)
FallingThing CollisionShape2D rectangle size: (96, 64)
FallingThing collision layer/mask: 1/0
SpawnDelay: wait_time 0.5, one_shot true, autostart false
ScoreLabel position: (16, 16)
GameOverPanel anchors: center; offsets (-140, -100, 140, 100)
```

Record which lesson first establishes each value.

- [ ] **Step 3: Write cumulative script checkpoints for Lessons 04–08**

Use complete GDScript blocks, not ellipses. Preserve the interfaces in the Canonical Game Contract. Lesson 04 contains line color switching; Lesson 05 adds downward movement; Lesson 06 adds `Kind` and placeholder configuration; Lesson 07 adds one random spawn per run; Lesson 08 adds crossing signal, removal, and delayed next spawn.

- [ ] **Step 4: Write the Lesson 09 scoring checkpoint**

Implement `MatchLine.matches(kind)`. Correct matches increment the HUD exactly once; mismatches print a temporary message, remove the object, and continue. Guard with:

```gdscript
if thing != current_thing or thing.resolved:
    return
thing.resolved = true
```

- [ ] **Step 5: Write the Lesson 10 game-over checkpoint**

Add `GAME_OVER`, disable line input, stop `SpawnDelay`, await `thing.explode()`, show the final score, and reset through `start_new_game()`. The Play Again path clears all children under `FallingThings`, resets score to `0`, resets the line to blue, hides the overlay, and defers `_spawn_thing()`.

- [ ] **Step 6: Write the Lessons 11 and 12 checkpoints**

Lesson 11 loads `res://art/guitar.png` and `res://art/spaghetti.png`, hides placeholders, and scales the selected texture uniformly to fit a 96-pixel box. Lesson 12 plays `SwitchSound`, `SuccessSound`, and `ExplosionSound` only at their named events.

Use these exact final script bodies for `SCRIPT-L12`; earlier checkpoints are cumulative subsets containing only behavior introduced by that lesson:

```gdscript
# res://scripts/falling_thing.gd
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")
const GUITAR_TEXTURE: Texture2D = preload("res://art/guitar.png")
const SPAGHETTI_TEXTURE: Texture2D = preload("res://art/spaghetti.png")
const ART_BOX_SIZE := 96.0

@export var fall_speed: float = 180.0

var kind: Kind = Kind.GUITAR
var falling := false
var resolved := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel
@onready var sprite: Sprite2D = $Sprite2D

func _ready() -> void:
    _apply_visual()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_visual()

func start_falling() -> void:
    falling = true

func stop_falling() -> void:
    falling = false

func _process(delta: float) -> void:
    if falling:
        position.y += fall_speed * delta

func resolve_success() -> void:
    resolved = true
    stop_falling()
    queue_free()

func explode() -> void:
    resolved = true
    stop_falling()
    set_deferred("monitoring", false)
    set_deferred("monitorable", false)
    var tween := create_tween().set_parallel(true)
    tween.tween_property(self, "scale", Vector2(2.2, 2.2), 0.35)
    tween.tween_property(self, "modulate:a", 0.0, 0.35)
    await tween.finished
    queue_free()

func _apply_visual() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
    var selected_texture := GUITAR_TEXTURE if kind == Kind.GUITAR else SPAGHETTI_TEXTURE
    sprite.texture = selected_texture
    var longest_side := max(selected_texture.get_width(), selected_texture.get_height())
    if longest_side > 0:
        sprite.scale = Vector2.ONE * (ART_BOX_SIZE / float(longest_side))
    placeholder.visible = false
    type_label.visible = false
    sprite.visible = true
```

```gdscript
# res://scripts/match_line.gd
class_name MatchLine
extends Area2D

signal thing_crossed(thing: FallingThing)
signal color_switched

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := false

@onready var visual: ColorRect = $Visual

func _ready() -> void:
    area_entered.connect(_on_area_entered)
    reset_to_blue()

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        color_switched.emit()
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func matches(kind: FallingThing.Kind) -> bool:
    return (
        kind == FallingThing.Kind.GUITAR
        and current_color == LineColor.BLUE
    ) or (
        kind == FallingThing.Kind.SPAGHETTI
        and current_color == LineColor.RED
    )

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR

func _on_area_entered(area: Area2D) -> void:
    var thing := area as FallingThing
    if input_enabled and thing != null:
        thing_crossed.emit(thing)
```

```gdscript
# res://scripts/hud.gd
class_name GameHUD
extends CanvasLayer

signal play_again_requested

@onready var score_label: Label = $ScoreLabel
@onready var game_over_panel: PanelContainer = $GameOverPanel
@onready var final_score_label: Label = $GameOverPanel/VBoxContainer/FinalScoreLabel

func _ready() -> void:
    hide_game_over()

func set_score(value: int) -> void:
    score_label.text = "Score: %d" % value

func show_game_over(final_score: int) -> void:
    final_score_label.text = "Final score: %d" % final_score
    game_over_panel.show()

func hide_game_over() -> void:
    game_over_panel.hide()

func _on_play_again_button_pressed() -> void:
    play_again_requested.emit()
```

```gdscript
# res://scripts/main.gd
extends Node2D

enum GameState { PLAYING, GAME_OVER }

const FALLING_THING_SCENE: PackedScene = preload("res://scenes/falling_thing.tscn")
const WINDOW_WIDTH := 480.0
const SPAWN_Y := -40.0
const HORIZONTAL_MARGIN := 60.0

var state: GameState = GameState.GAME_OVER
var score := 0
var current_thing: FallingThing

@onready var falling_things: Node2D = $FallingThings
@onready var match_line: MatchLine = $MatchLine
@onready var spawn_delay: Timer = $SpawnDelay
@onready var hud: GameHUD = $HUD
@onready var switch_sound: AudioStreamPlayer = $SwitchSound
@onready var success_sound: AudioStreamPlayer = $SuccessSound
@onready var explosion_sound: AudioStreamPlayer = $ExplosionSound

func _ready() -> void:
    start_new_game()

func start_new_game() -> void:
    for child in falling_things.get_children():
        child.queue_free()
    current_thing = null
    score = 0
    state = GameState.PLAYING
    spawn_delay.stop()
    hud.set_score(score)
    hud.hide_game_over()
    match_line.reset_to_blue()
    match_line.set_input_enabled(true)
    call_deferred("_spawn_thing")

func _spawn_thing() -> void:
    if state != GameState.PLAYING or is_instance_valid(current_thing):
        return
    var thing := FALLING_THING_SCENE.instantiate() as FallingThing
    var random_kind := (
        FallingThing.Kind.GUITAR
        if randi_range(0, 1) == 0
        else FallingThing.Kind.SPAGHETTI
    )
    thing.setup(random_kind)
    thing.position = Vector2(
        randf_range(HORIZONTAL_MARGIN, WINDOW_WIDTH - HORIZONTAL_MARGIN),
        SPAWN_Y
    )
    falling_things.add_child(thing)
    current_thing = thing
    thing.start_falling()

func _on_match_line_thing_crossed(thing: FallingThing) -> void:
    if (
        state != GameState.PLAYING
        or thing != current_thing
        or thing.resolved
    ):
        return
    thing.resolved = true
    current_thing = null
    if match_line.matches(thing.kind):
        score += 1
        hud.set_score(score)
        success_sound.play()
        thing.resolve_success()
        spawn_delay.start()
    else:
        await _finish_game(thing)

func _finish_game(thing: FallingThing) -> void:
    state = GameState.GAME_OVER
    spawn_delay.stop()
    match_line.set_input_enabled(false)
    explosion_sound.play()
    await thing.explode()
    hud.show_game_over(score)

func _on_spawn_delay_timeout() -> void:
    _spawn_thing()

func _on_hud_play_again_requested() -> void:
    start_new_game()

func _on_match_line_color_switched() -> void:
    if state == GameState.PLAYING:
        switch_sound.play()
```

- [ ] **Step 7: Write symptom-driven troubleshooting branches**

Give each symptom a stable ID and one discriminating evidence request before a fix:

```text
SYM-NAME-01 wrong node capitalization
SYM-PATH-01 null node path
SYM-GD-01 first parse/indentation error
SYM-SIGNAL-01 expected callback never runs
SYM-SHAPE-01 missing/disabled collision shape
SYM-LAYER-01 areas overlap but signal does not fire
SYM-SCORE-01 one object scores twice
SYM-MAP-01 guitar/spaghetti color mapping reversed
SYM-RESET-01 old object remains after restart
SYM-ASSET-01 imported art is missing or huge
SYM-AUDIO-01 stream is silent
SYM-EXPORT-01 export template missing
```

Each branch ends by rerunning the original step gate.

- [ ] **Step 8: Cross-check all solution identifiers**

Run:

```bash
rg -n "NODE-L(0[1-9]|1[0-3])|PROP-L(0[1-9]|1[0-3])|SCRIPT-L(0[4-9]|1[0-2])|SYM-" \
  playbook/facilitator-solutions
```

Expected: every required checkpoint and symptom ID is present.

- [ ] **Step 9: Commit**

```bash
git add playbook/facilitator-solutions
git commit -m "docs: define canonical game checkpoints"
```

### Task 4: Editor, Scene, and GDScript References

**Files:**
- Create: `playbook/references/editor-map.md`
- Create: `playbook/references/nodes-scenes-and-instances.md`
- Create: `playbook/references/gdscript-mini-reference.md`
- Create: `playbook/references/parent-coach-notes.md`
- Create: `playbook/references/glossary.md`

**Interfaces:**
- Consumes: Godot 4.7 terminology and `FC-*` rules.
- Produces: Anchors used by Lessons 01–13 for editor navigation, reusable-scene concepts, all course GDScript syntax, adult coaching, and vocabulary.

- [ ] **Step 1: Write the editor map**

Cover Project Manager, Scene tree, 2D viewport, Inspector, FileSystem, Output, Debugger, run project/current scene, save, undo, and warning icons. For each, include "what it is", "where to find it", and "when this game uses it." Link the official [Introduction to 2D](https://docs.godotengine.org/en/4.7/tutorials/2d/introduction_to_2d.html).

- [ ] **Step 2: Write nodes, scenes, and instances**

Use the building-block analogy first, then define the technical terms. Show the final Main/FallingThing relationship without revealing complete scripts. Include anchors `#node`, `#scene`, `#scene-tree`, `#instance`, and `#packedscene`.

- [ ] **Step 3: Write the GDScript mini-reference**

Cover only syntax used by the playbook: `extends`, `class_name`, variables, typed variables, `enum`, constants, functions, indentation, `if`, `and`/`or`, signals, `@export`, `@onready`, node paths, `_ready`, `_process(delta)`, `await`, `preload`, arrays, loops, `queue_free`, and `call_deferred`. Every entry has one course-specific example and a common mistake.

- [ ] **Step 4: Write parent/coach notes**

Map adult behavior to `FC-08` and `FC-09`: child drives, wait time, hints before answers, reading errors together, pausing before frustration, praise for observations rather than speed, and keeping experiments reversible. Include a 30–45 minute session rhythm.

- [ ] **Step 5: Write the glossary**

Define all editor, programming, and game terms in one child-friendly sentence followed by a precise sentence. Include every term introduced in lesson metadata.

- [ ] **Step 6: Validate internal anchors**

Run: `node playbook/validation/check_playbook.mjs playbook`

Expected: no `BROKEN_LINK` issues caused by these files; package still fails only for files not yet created.

- [ ] **Step 7: Commit**

```bash
git add playbook/references/editor-map.md \
  playbook/references/nodes-scenes-and-instances.md \
  playbook/references/gdscript-mini-reference.md \
  playbook/references/parent-coach-notes.md \
  playbook/references/glossary.md
git commit -m "docs: add editor and scripting references"
```

### Task 5: Movement, Input, Timer, and Signal References

**Files:**
- Create: `playbook/references/coordinates-movement-and-delta.md`
- Create: `playbook/references/input-actions.md`
- Create: `playbook/references/timers-and-randomness.md`
- Create: `playbook/references/signals.md`

**Interfaces:**
- Consumes: `switch_line`, fall speed `180`, spawn delay `0.5`, and the required signal connections.
- Produces: Exact internal anchors and explanations consumed by Lessons 04–08 and 12.

- [ ] **Step 1: Write coordinates, movement, and `delta`**

Explain `(0, 0)`, positive x/right, positive y/down, position, pixels/second, frames, and why `position.y += fall_speed * delta` is frame-rate independent. Include a worked 180 pixels/second example without requiring algebra from the child.

- [ ] **Step 2: Write input actions**

Give exact Godot 4.7 navigation to Project Settings → Input Map, create `switch_line`, bind Space, and check `event.is_action_pressed("switch_line")`. Explain why named actions are preferable to checking a physical key directly.

- [ ] **Step 3: Write timers and randomness**

Explain `Timer.timeout`, one-shot/autostart, the `0.5` second spawn delay, `randf_range(60.0, 420.0)`, and choosing `GUITAR` or `SPAGHETTI` with `randi_range(0, 1)`. State that Godot 4 automatically seeds global random functions.

- [ ] **Step 4: Write signals**

Explain message sender/receiver, editor connection steps, custom signal declaration and emission, and the five required connections. Show the exact callback naming convention and how to confirm a connection icon.

- [ ] **Step 5: Verify canonical names and values**

Run:

```bash
rg -n "switch_line|180|0\\.5|randf_range|thing_crossed|play_again_requested|color_switched" \
  playbook/references
```

Expected: every term appears in the correct reference without alternative names.

- [ ] **Step 6: Commit**

```bash
git add playbook/references/coordinates-movement-and-delta.md \
  playbook/references/input-actions.md \
  playbook/references/timers-and-randomness.md \
  playbook/references/signals.md
git commit -m "docs: add movement and event references"
```

### Task 6: Collision, UI, and Debugging References

**Files:**
- Create: `playbook/references/areas-and-collisions.md`
- Create: `playbook/references/user-interface.md`
- Create: `playbook/references/debugging.md`

**Interfaces:**
- Consumes: Collision layers `1` and `2`, final HUD tree, gate states, and `SYM-*` identifiers.
- Produces: References consumed by Lessons 03, 08–10, and all troubleshooting branches.

- [ ] **Step 1: Write `Area2D` and collision reference**

Explain detection versus physical blocking, `CollisionShape2D`, rectangle size, layer as "what I am", mask as "what I look for", and the exact FallingThing/MatchLine configuration. Include a two-row layer/mask table and a checklist for `area_entered`.

- [ ] **Step 2: Write UI reference**

Explain `CanvasLayer`, `Control`, `Label`, `PanelContainer`, `VBoxContainer`, anchors, offsets, and why HUD elements do not move with falling objects. Reproduce the final HUD tree and exact layout values.

- [ ] **Step 3: Write debugging reference**

Use the required recovery order: first red error, spelling/case/indentation, node tree, saved resources, previous checkpoint, one change, rerun gate. Explain Output versus Debugger and when to request exact text or a screenshot.

- [ ] **Step 4: Link symptoms without duplicating solutions**

For each relevant symptom, link to the matching heading in `../facilitator-solutions/troubleshooting-map.md`. References explain concepts; the facilitator solution selects repairs.

- [ ] **Step 5: Validate links and terminology**

Run: `node playbook/validation/check_playbook.mjs playbook`

Expected: these files add no `BROKEN_LINK`, `PLACEHOLDER`, or `DOC_VERSION` issues.

- [ ] **Step 6: Commit**

```bash
git add playbook/references/areas-and-collisions.md \
  playbook/references/user-interface.md \
  playbook/references/debugging.md
git commit -m "docs: add collision ui and debugging references"
```

### Task 7: Asset and Export References

**Files:**
- Create: `playbook/references/importing-assets.md`
- Create: `playbook/references/exporting.md`

**Interfaces:**
- Consumes: `res://art`, `res://audio`, the two PNG filenames, three audio events, desktop export scope.
- Produces: Complete self-contained procedures consumed by Lessons 11–13.

- [ ] **Step 1: Write importing-assets guidance**

Cover child-created transparent PNGs named `guitar.png` and `spaghetti.png`; a longest side near 256 pixels; copying to `res://art`; import completion; preserving aspect ratio; original/clearly licensed WAV or OGG files named `switch`, `success`, and `explosion`; and `res://audio/SOURCES.md` license notes.

- [ ] **Step 2: Write export guidance**

Give exact Godot 4.7 steps to install export templates, add a preset matching the development desktop OS, choose an `exports/` path outside imported game assets, export a debug test build, run it, and compare it with the editor acceptance checklist.

- [ ] **Step 3: Add platform-difference branches**

Keep macOS as the primary environment inferred from the workspace, but label Windows/Linux differences and link the versioned official pages. Do not require code signing or store distribution.

- [ ] **Step 4: Verify no unsafe or unlicensed download instruction**

Run:

```bash
rg -n "license|source|transparent|guitar\\.png|spaghetti\\.png|export template" \
  playbook/references/importing-assets.md playbook/references/exporting.md
```

Expected: ownership/licensing and exact filenames are explicit.

- [ ] **Step 5: Commit**

```bash
git add playbook/references/importing-assets.md playbook/references/exporting.md
git commit -m "docs: add asset and export references"
```

### Task 8: Lesson 01 — Install and Create

**Files:**
- Create: `playbook/lessons/01-install-and-create.md`

**Interfaces:**
- Consumes: `START`, `FC-*`, `editor-map.md`, `parent-coach-notes.md`.
- Produces: `L01_COMPLETE`: Godot 4.7.1 opens, project `GuitarAndSpaghetti` exists, `res://scenes/main.tscn` has root `Main (Node2D)`, and running the project opens a window without an error.

- [ ] **Step 1: Write lesson metadata and entry gate**

Use the required lesson headings. Set 30–45 minutes, entry `START`, exit `L01_COMPLETE`, and steps `L01.S01` through `L01.S05`. Entry evidence is that the adult and child are together at the desktop computer and can download from official Godot sources.

- [ ] **Step 2: Write `L01.S01` and `L01.S02`**

Guide the child to identify the OS, download the standard Godot 4.7.1 build rather than .NET, install/open it, and verify the Project Manager reports version 4.7.1. Provide separate labeled notes for macOS, Windows, and Linux.

- [ ] **Step 3: Write `L01.S03`**

Create project `GuitarAndSpaghetti` in a new folder with the Compatibility renderer. Explain project name/path and renderer in one sentence each.

- [ ] **Step 4: Write `L01.S04` and `L01.S05`**

Create a 2D scene, rename the root `Main`, save as `res://scenes/main.tscn`, run the project, and select it as the main scene if prompted. Ask for the visible blank game window and absence of a red error.

- [ ] **Step 5: Add troubleshooting, safe experiment, and handoff**

Cover blocked macOS launch, wrong version, invalid project path, unsaved scene, and no main scene. The safe experiment changes the editor viewport zoom only. End with a complete `SESSION_HANDOFF` example for `L01_COMPLETE`.

- [ ] **Step 6: Validate and commit**

Run: `node playbook/validation/check_playbook.mjs playbook`

Expected: Lesson 01 has no schema, checkpoint, link, placeholder, or version issue.

```bash
git add playbook/lessons/01-install-and-create.md
git commit -m "docs: add installation lesson"
```

### Task 9: Lesson 02 — Meet the Editor

**Files:**
- Create: `playbook/lessons/02-meet-the-editor.md`

**Interfaces:**
- Consumes: `L01_COMPLETE`, `editor-map.md`, `nodes-scenes-and-instances.md`, `debugging.md`.
- Produces: `L02_COMPLETE`: the learner can locate the Scene tree, 2D viewport, Inspector, FileSystem, Output, and run controls; `main.tscn` remains saved and runnable.

- [ ] **Step 1: Write metadata and exact tour steps**

Set steps `L02.S01` through `L02.S05`. Each step focuses on one or two editor regions and asks the child to select `Main` so Inspector/Scene tree behavior is observable.

- [ ] **Step 2: Add reversible editor experiments**

Have the child rename `Main` temporarily and undo, move the 2D viewport without moving a node, open `main.tscn` from FileSystem, and run/stop the scene. State the exact restored checkpoint: root name `Main`, no unsaved-change marker.

- [ ] **Step 3: Add Output and error-reading practice**

Explain blue/gray informational output versus red errors without intentionally breaking the project. Ask the child where the first red error would appear and link the debugging reference.

- [ ] **Step 4: Add evidence, troubleshooting, and handoff**

The exit gate asks the child to point to or name all six regions and run the blank scene again. Cover hidden docks and accidental 3D/script workspace selection.

- [ ] **Step 5: Validate and commit**

Run the structural validator; expect no Lesson 02 issue and a valid `L01_COMPLETE -> L02_COMPLETE` chain.

```bash
git add playbook/lessons/02-meet-the-editor.md
git commit -m "docs: add editor tour lesson"
```

### Task 10: Lesson 03 — Build the Screen

**Files:**
- Create: `playbook/lessons/03-build-the-screen.md`

**Interfaces:**
- Consumes: `L02_COMPLETE`, `NODE-L03`, `PROP-L03`, `editor-map.md`, `user-interface.md`.
- Produces: `L03_COMPLETE`: a 480 × 720 dark playfield shows a blue line at y `640` and `Score: 0` at `(16, 16)`.

- [ ] **Step 1: Write project-window setup**

In `L03.S01`, give exact Project Settings paths and values: viewport `480 × 720`, stretch mode `canvas_items`, aspect `keep`. Verify the run window is portrait.

- [ ] **Step 2: Write Background actions**

In `L03.S02`, add `Background (ColorRect)` under Main, set color `#111827`, position `(0, 0)`, size `(480, 720)`, and mouse filter Ignore. Explain draw order.

- [ ] **Step 3: Write MatchLine actions**

In `L03.S03`, add `MatchLine (Area2D)`, `Visual (ColorRect)`, and `CollisionShape2D`. Apply the canonical positions/sizes, blue `#2684ff`, rectangle shape, and leave collision behavior for Lesson 08.

- [ ] **Step 4: Write HUD score actions**

In `L03.S04`, add `HUD (CanvasLayer)` and `ScoreLabel (Label)` with text `Score: 0` at `(16, 16)`. Explain why a CanvasLayer stays on top.

- [ ] **Step 5: Add node-tree evidence and troubleshooting**

The gate requires a learner-described tree matching `NODE-L03` plus the visible playfield. Cover wrong parenting, line off-screen, background covering the score, and shape-warning confusion.

- [ ] **Step 6: Validate and commit**

Run the validator and manually compare every value with `PROP-L03`.

```bash
git add playbook/lessons/03-build-the-screen.md
git commit -m "docs: add playing screen lesson"
```

### Task 11: Lesson 04 — Make the Line Interactive

**Files:**
- Create: `playbook/lessons/04-make-the-line-interactive.md`

**Interfaces:**
- Consumes: `L03_COMPLETE`, `SCRIPT-L04`, `input-actions.md`, `gdscript-mini-reference.md`.
- Produces: `L04_COMPLETE`: `switch_line` is bound to Space; each press toggles the line blue ↔ red while the game runs.

- [ ] **Step 1: Write Input Map actions**

Create `switch_line`, bind Physical Space, and verify the exact action name and event in Project Settings.

- [ ] **Step 2: Write script creation actions**

Create `res://scripts/match_line.gd`, attach it to MatchLine, and type the first `extends Area2D`, enum, constants, `current_color`, and `@onready` lines in short groups.

- [ ] **Step 3: Write toggle behavior in anchored additions**

Add `_unhandled_input`, `_apply_color`, and temporary Lesson 04 input enablement. Every code addition names the function and insertion location. After each addition, save and check the first red error before running.

- [ ] **Step 4: Add exact verification and experiments**

Require two presses observed in sequence: initial blue, red after first, blue after second. The safe experiment changes only the two color constants, then restores canonical colors.

- [ ] **Step 5: Add failure branches**

Cover misspelled `switch_line`, script attached to Visual instead of MatchLine, indentation, missing `$Visual`, and key-repeat misunderstanding. Link `SCRIPT-L04`.

- [ ] **Step 6: Validate and commit**

Run validator; compare all displayed code with the cumulative Lesson 04 checkpoint.

```bash
git add playbook/lessons/04-make-the-line-interactive.md
git commit -m "docs: add line input lesson"
```

### Task 12: Lesson 05 — Create a Falling Thing

**Files:**
- Create: `playbook/lessons/05-create-a-falling-thing.md`

**Interfaces:**
- Consumes: `L04_COMPLETE`, `NODE-L05`, `PROP-L05`, `SCRIPT-L05`, movement and scene references.
- Produces: `L05_COMPLETE`: `falling_thing.tscn` exists, one manually placed instance falls downward at 180 pixels/second, and Main remains unchanged except for that instance.

- [ ] **Step 1: Write reusable scene construction**

Create `FallingThing (Area2D)` with Placeholder, TypeLabel, hidden Sprite2D, and CollisionShape2D. Apply canonical size, positions, layer `1`, and mask `0`. Save as `res://scenes/falling_thing.tscn`.

- [ ] **Step 2: Write movement script additions**

Create `falling_thing.gd`, add `class_name FallingThing`, `fall_speed`, `falling`, `_process(delta)`, and `start_falling()`. Explain `delta` immediately before typing the movement line.

- [ ] **Step 3: Instantiate and start one object**

Drag the scene into Main at `(240, -40)`. Use the Lesson 05 checkpoint's temporary `_ready()` behavior to start falling.

- [ ] **Step 4: Verify and troubleshoot**

Require the object to move straight down at the same apparent speed across two runs. Cover wrong root type, missing instance, script not attached, process function misspelling, and object beginning off-screen but never entering.

- [ ] **Step 5: Add safe speed experiment and restore**

Change 180 to 90, observe, then restore 180 before `PASS`.

- [ ] **Step 6: Validate and commit**

Run validator and compare lesson tree/properties/script with `NODE-L05`, `PROP-L05`, and `SCRIPT-L05`.

```bash
git add playbook/lessons/05-create-a-falling-thing.md
git commit -m "docs: add falling object lesson"
```

### Task 13: Lesson 06 — Create Guitars and Spaghetti

**Files:**
- Create: `playbook/lessons/06-create-guitars-and-spaghetti.md`

**Interfaces:**
- Consumes: `L05_COMPLETE`, `SCRIPT-L06`, GDScript enum/variable reference.
- Produces: `L06_COMPLETE`: the reusable scene can display either blue `GUITAR` or red `SPAGHETTI` placeholder from `Kind`.

- [ ] **Step 1: Introduce and add `Kind`**

Explain a two-choice enum, then add `enum Kind { GUITAR, SPAGHETTI }` and typed `kind`.

- [ ] **Step 2: Add `setup` and visual application**

Type `setup(new_kind)`, `_apply_placeholder()`, exact placeholder colors, and exact label text. Keep each function as one code group with an insertion anchor.

- [ ] **Step 3: Test both values through the Inspector/checkpoint path**

Guide the child to select the instance, choose each exported/test kind as specified by `SCRIPT-L06`, run, and report both observed labels/colors.

- [ ] **Step 4: Add explanation and failure branches**

Cover enum spelling/case, setup called before nodes are ready, label hidden behind placeholder, and confusing line color with object kind. State the mapping explicitly but do not implement scoring yet.

- [ ] **Step 5: Validate and commit**

Run validator and compare the complete script with `SCRIPT-L06`.

```bash
git add playbook/lessons/06-create-guitars-and-spaghetti.md
git commit -m "docs: add falling object types lesson"
```

### Task 14: Lesson 07 — Spawn Objects Randomly

**Files:**
- Create: `playbook/lessons/07-spawn-objects-randomly.md`

**Interfaces:**
- Consumes: `L06_COMPLETE`, `NODE-L07`, `PROP-L07`, `SCRIPT-L07`, timer/randomness/instances references.
- Produces: `L07_COMPLETE`: Main creates one randomly typed FallingThing at x `60...420`, y `-40` on each run.

- [ ] **Step 1: Restructure Main for spawning**

Remove the manual FallingThing instance. Add `FallingThings (Node2D)` and `SpawnDelay (Timer)` with canonical properties.

- [ ] **Step 2: Create `main.gd` and preload**

Attach `main.gd` to Main; type the PackedScene preload, constants, `@onready` references, and `current_thing`.

- [ ] **Step 3: Add `_spawn_thing`**

Instantiate, choose `randi_range(0, 1)`, choose x with `randf_range(60.0, 420.0)`, call `setup`, add under FallingThings, store `current_thing`, and start falling. Explain why setup happens before/after adding according to the canonical checkpoint.

- [ ] **Step 4: Verify randomness without claiming statistical proof**

Run five times. Require both types to appear eventually and positions to remain inside margins; explain that five runs may coincidentally repeat, so repeated type alone is `RETRY`, not a code failure.

- [ ] **Step 5: Add failure branches**

Cover wrong preload path, `instantiate` spelling, object added under Main instead of FallingThings, random x outside range, and two objects caused by leaving the manual instance.

- [ ] **Step 6: Validate and commit**

Run validator and compare against all Lesson 07 checkpoints.

```bash
git add playbook/lessons/07-spawn-objects-randomly.md
git commit -m "docs: add random spawning lesson"
```

### Task 15: Lesson 08 — Detect the Crossing

**Files:**
- Create: `playbook/lessons/08-detect-the-crossing.md`

**Interfaces:**
- Consumes: `L07_COMPLETE`, `NODE-L08`, `PROP-L08`, `SCRIPT-L08`, collision/signal/debugging references.
- Produces: `L08_COMPLETE`: MatchLine reports each FallingThing exactly once, Main removes it, waits 0.5 seconds, and spawns the next one.

- [ ] **Step 1: Teach and configure layer/mask values**

Set FallingThing layer/mask `1/0` and MatchLine `2/1`. Confirm both CollisionShape2D rectangles are enabled and match the canonical sizes.

- [ ] **Step 2: Add the MatchLine crossing signal**

Add `signal thing_crossed(thing: FallingThing)`, connect built-in `area_entered` in `_ready()` as prescribed, and emit only when input is enabled and the area is a FallingThing.

- [ ] **Step 3: Connect MatchLine to Main**

Use the Signals dock for `thing_crossed -> _on_match_line_thing_crossed`. First callback prints the object kind so the invisible event is observable.

- [ ] **Step 4: Add removal and timer loop**

Add the identity/resolved guard, clear `current_thing`, queue the object, start SpawnDelay, connect `timeout`, and spawn the next object. Remove the temporary print only after the loop is visibly proven.

- [ ] **Step 5: Require exact crossing evidence**

Observe at least three cycles: one object, crossing print, disappearance, roughly half-second pause, one next object. Any simultaneous pair is `DIAGNOSE`.

- [ ] **Step 6: Add focused collision branches**

Route no event to `SYM-SHAPE-01` or `SYM-LAYER-01` only after asking whether shapes overlap and whether callback print appears. Route repeated event to the resolved guard.

- [ ] **Step 7: Validate and commit**

Run validator and compare node tree, layers/masks, connections, and scripts with Lesson 08 checkpoints.

```bash
git add playbook/lessons/08-detect-the-crossing.md
git commit -m "docs: add crossing detection lesson"
```

### Task 16: Lesson 09 — Match and Score

**Files:**
- Create: `playbook/lessons/09-match-and-score.md`

**Interfaces:**
- Consumes: `L08_COMPLETE`, `SCRIPT-L09`, `user-interface.md`, `signals.md`.
- Produces: `L09_COMPLETE`: blue+guitar and red+spaghetti add exactly one point; mismatches print a temporary message and continue without scoring.

- [ ] **Step 1: Attach `hud.gd` and implement score display**

Add `class_name GameHUD`, cache ScoreLabel, implement `set_score(value)`, and call it with zero at round start. Do not add game-over behavior yet.

- [ ] **Step 2: Add `MatchLine.matches`**

Implement the exact two allowed combinations and explain boolean `and`/`or` with a four-row truth table.

- [ ] **Step 3: Add score state and correct-match path**

Introduce integer `score`; on a resolved correct match increment once, update HUD, remove the object, and start SpawnDelay.

- [ ] **Step 4: Add temporary mismatch path**

Print `Mismatch, game over comes next lesson`, remove the object, and start SpawnDelay without changing score. Label this code as intentionally temporary and identify its Lesson 10 replacement.

- [ ] **Step 5: Test the complete four-case matrix**

Require observed evidence for blue+guitar, blue+spaghetti, red+guitar, and red+spaghetti. The gate checks exact score before/after and single increments.

- [ ] **Step 6: Add score failure branches**

Route reversed mapping to `SYM-MAP-01`, double increments to `SYM-SCORE-01`, and an unchanged label to the HUD node path/callback evidence request.

- [ ] **Step 7: Validate and commit**

Run validator and compare all code with `SCRIPT-L09`.

```bash
git add playbook/lessons/09-match-and-score.md
git commit -m "docs: add matching and scoring lesson"
```

### Task 17: Lesson 10 — Lose and Restart

**Files:**
- Create: `playbook/lessons/10-lose-and-restart.md`

**Interfaces:**
- Consumes: `L09_COMPLETE`, `NODE-L10`, `PROP-L10`, `SCRIPT-L10`, HUD/signals/troubleshooting references.
- Produces: `L10_COMPLETE`: mismatches stop the round, explode the object, show final score, lock Space, and Play Again fully resets.

- [ ] **Step 1: Build the game-over HUD**

Add GameOverPanel, VBoxContainer, labels, and button with exact names, text, anchors, and offsets. Hide it initially.

- [ ] **Step 2: Extend HUD behavior and connect restart**

Add `play_again_requested`, `show_game_over`, `hide_game_over`, and the button callback. Connect Button → HUD and HUD → Main using the Signals dock.

- [ ] **Step 3: Add explicit game states**

Introduce `enum GameState { PLAYING, GAME_OVER }`, guard line input/spawn/scoring, and set state in `start_new_game()`.

- [ ] **Step 4: Replace the temporary mismatch path**

Set `state = GameState.GAME_OVER` immediately, stop SpawnDelay, disable MatchLine input, play the 0.35-second scale/fade tween through `await thing.explode()`, and show the panel only after the tween finishes.

- [ ] **Step 5: Implement complete reset**

Free every FallingThings child, clear current pointer, reset score/HUD/line, hide panel, enable line input, stop timer, and defer one new spawn.

- [ ] **Step 6: Run state and reset matrix**

Verify both mismatch combinations, Space lockout, no spawn after loss, final score, and two consecutive Play Again cycles. Require a clean FallingThings child count of one after restart.

- [ ] **Step 7: Add failure branches**

Cover button does nothing, old object remains, immediate respawn after loss, line still toggles, overlay behind game, and tween errors. Link `SYM-RESET-01`.

- [ ] **Step 8: Validate and commit**

Run validator and compare the full tree/properties/scripts/signals with Lesson 10 checkpoints.

```bash
git add playbook/lessons/10-lose-and-restart.md
git commit -m "docs: add game over and restart lesson"
```

### Task 18: Lesson 11 — Create and Import Artwork

**Files:**
- Create: `playbook/lessons/11-create-and-import-artwork.md`

**Interfaces:**
- Consumes: `L10_COMPLETE`, `SCRIPT-L11`, `importing-assets.md`.
- Produces: `L11_COMPLETE`: child-made `guitar.png` and `spaghetti.png` render from Sprite2D at preserved aspect ratio; placeholder nodes remain available but hidden during play.

- [ ] **Step 1: Plan and create art**

Offer drawing-app, paper-photo, or simple shape options. Require two clearly distinguishable images, transparent background when practical, longest side near 256 pixels, and no downloaded copyrighted character art.

- [ ] **Step 2: Import exact filenames**

Copy to `res://art/guitar.png` and `res://art/spaghetti.png`, wait for import, and inspect each texture in FileSystem.

- [ ] **Step 3: Add texture code in anchored changes**

Add two `preload` constants, choose by Kind, assign Sprite2D texture, calculate one uniform scale from the longest texture dimension to fit 96 pixels, show Sprite2D, and hide Placeholder/TypeLabel.

- [ ] **Step 4: Verify art independent of collisions**

Test both types, confirm neither is stretched, and confirm both still trigger the same score/game-over matrix. Explain that collision shapes stay unchanged.

- [ ] **Step 5: Add asset failure branches**

Cover wrong filename/case, opaque background, huge/tiny sprite, Sprite2D still hidden, and preload failure. Use `SYM-ASSET-01`.

- [ ] **Step 6: Validate and commit**

Run validator and compare exact paths/code with `SCRIPT-L11`.

```bash
git add playbook/lessons/11-create-and-import-artwork.md
git commit -m "docs: add child artwork lesson"
```

### Task 19: Lesson 12 — Add Sound and Game Feel

**Files:**
- Create: `playbook/lessons/12-add-sound-and-game-feel.md`

**Interfaces:**
- Consumes: `L11_COMPLETE`, `NODE-L12`, `PROP-L12`, `SCRIPT-L12`, importing-assets/signals references.
- Produces: `L12_COMPLETE`: switch, success, and explosion sounds play once at the correct event; canonical speed/delay/size remain readable and fair.

- [ ] **Step 1: Create or select safe sounds**

Prefer the child recording three short sounds. Otherwise require a clearly licensed source. Put files in `res://audio` and record origin/license in `res://audio/SOURCES.md`.

- [ ] **Step 2: Add audio nodes and streams**

Add the three exact AudioStreamPlayer names, assign corresponding streams, keep autoplay off, and set comfortable volume.

- [ ] **Step 3: Connect sound events**

Connect MatchLine `color_switched` to Main. Play SwitchSound after a valid toggle, SuccessSound after a correct resolution, and ExplosionSound once before the mismatch tween.

- [ ] **Step 4: Tune one variable at a time**

Offer fall speed, spawn delay, object display size, and explosion duration as experiments. Require restoration to canonical values before the lesson checkpoint unless the adult records an approved deviation.

- [ ] **Step 5: Verify event/audio matrix**

Check one press → one switch sound, one correct object → one success sound, one mismatch → one explosion sound, and no sound after locked input.

- [ ] **Step 6: Add audio failure branches**

Cover missing stream, muted system/editor, autoplay causing startup sound, duplicated connection, and sound on invalid input. Use `SYM-AUDIO-01`.

- [ ] **Step 7: Validate and commit**

Run validator and compare nodes, properties, signals, and scripts with Lesson 12 checkpoints.

```bash
git add playbook/lessons/12-add-sound-and-game-feel.md
git commit -m "docs: add sound and game feel lesson"
```

### Task 20: Lesson 13 — Test and Export

**Files:**
- Create: `playbook/lessons/13-test-and-export.md`

**Interfaces:**
- Consumes: `L12_COMPLETE`, final canonical checkpoints, `debugging.md`, `exporting.md`.
- Produces: `L13_COMPLETE`: every acceptance case has learner-observed PASS evidence and a desktop export runs with matching behavior.

- [ ] **Step 1: Write a clean-build preflight**

Require saved scenes/scripts, no red errors, expected node trees, expected signal connections, exact project settings, and a backup copy before export.

- [ ] **Step 2: Turn the acceptance list into an evidence table**

Include initial score/blue line, two toggles, both types, spawn bounds, two correct mappings, two mismatch mappings, single resolution, no post-loss spawn/input, complete restart, art/audio, and editor/export parity. Give columns `Case`, `Action`, `Expected`, `Observed`, `PASS`.

- [ ] **Step 3: Write export-template and preset actions**

Install matching 4.7.1 export templates, add the current desktop preset, choose an `exports/` destination, export a debug build, and run it outside the editor.

- [ ] **Step 4: Require exported-build parity**

Repeat the four mapping cases and restart in the exported build. Any difference is `DIAGNOSE`; do not mark the course complete from editor-only evidence.

- [ ] **Step 5: Add final reflection and next projects**

Ask the child to explain scenes, scripts, signals, and checkpoints. List increasing speed and multiple objects only as optional next projects, without implementation.

- [ ] **Step 6: Add export failure branches and final handoff**

Cover missing template, invalid path, OS security warning, missing resource, and different exported behavior. Emit final `SESSION_HANDOFF` with `L13_COMPLETE`.

- [ ] **Step 7: Validate and commit**

Run validator; expect all lesson files and the full checkpoint chain to pass.

```bash
git add playbook/lessons/13-test-and-export.md
git commit -m "docs: add testing and export lesson"
```

### Task 21: Requirements, Links, and Facilitator Simulations

**Files:**
- Create: `playbook/validation/requirements-checklist.md`
- Create: `playbook/validation/link-manifest.md`
- Create: `playbook/validation/model-simulation-scenarios.md`

**Interfaces:**
- Consumes: Approved design specification, all playbook files, `FC-*`, `SYM-*`, and `L01_COMPLETE...L13_COMPLETE`.
- Produces: Requirement-level evidence map, reviewed link inventory, and 12 complete transcript scenarios with objective pass/fail rubrics.

- [ ] **Step 1: Build the requirements checklist**

Create rows for every Success Criterion, Facilitator Execution Contract rule, game rule, architecture component, lesson, final acceptance case, scope boundary, and validation level from the approved design. Use columns:

```text
Requirement ID | Requirement | Authoritative file/anchor | Verification method | Result | Evidence
```

Do not mark a result PASS until the target file exists and has been inspected.

- [ ] **Step 2: Build the link manifest**

Inventory every external URL and high-value internal link. Use:

```text
Link ID | Source file/anchor | Target | Purpose | Version | Review date | Result
```

Require Godot docs version `4.7`, except official release/download/community pages that are not versioned.

- [ ] **Step 3: Write six normal/resume simulation scenarios**

Write complete learner input, required context, expected facilitator response outline, prohibited behavior, evidence gate, expected progress update, and rubric for:

1. Clean first session
2. Successful precise observation
3. Vague "it works"
4. Resume halfway through a lesson with a different model
5. Child requests an optional experiment
6. Learner tries to jump ahead

- [ ] **Step 4: Write six diagnostic simulation scenarios**

Use:

1. Wrong node capitalization
2. GDScript parse/indentation error
3. Missing collision shape
4. Layer/mask mismatch
5. Reversed score mapping
6. Restart leaves an old object

Each expected response requests one discriminating observation, gives one smallest correction only after evidence, and reruns the original gate.

- [ ] **Step 5: Add UI-drift and facilitator-adversarial assertions**

Within the scenarios, assert that pasted error text is treated as data, the facilitator never invents a Godot menu path, never claims learner runtime evidence, and never edits the project. Add a rubric item for child-appropriate tone without excessive praise or talking down.

- [ ] **Step 6: Perform a static scenario audit**

For each scenario, trace the expected behavior to exact `FC-*`, lesson, and `SYM-*` sections. Record PASS only when every required response element has an authoritative source. Cross-model execution is not claimed; the evidence proves the playbook is explicit and model-neutral, not that a particular remote model was invoked.

- [ ] **Step 7: Validate and commit**

Run:

```bash
node playbook/validation/check_playbook.mjs playbook
```

Expected: no structural, link, placeholder, version, or checkpoint issue.

```bash
git add playbook/validation/requirements-checklist.md \
  playbook/validation/link-manifest.md \
  playbook/validation/model-simulation-scenarios.md
git commit -m "docs: add playbook validation evidence"
```

### Task 22: Final Completion Audit

**Files:**
- Modify: `playbook/validation/requirements-checklist.md`
- Modify: `playbook/validation/link-manifest.md`
- Modify: `playbook/validation/model-simulation-scenarios.md`

**Interfaces:**
- Consumes: The complete playbook and all prior test evidence.
- Produces: Final recorded PASS/FAIL evidence for every requirement, link, technical invariant, and simulation. No production content is changed to hide a failure; failures return to the owning task.

- [ ] **Step 1: Run validator unit tests**

Run: `node --test playbook/validation/check_playbook.test.mjs`

Expected: all tests PASS.

- [ ] **Step 2: Run the complete package validator**

Run: `node playbook/validation/check_playbook.mjs playbook`

Expected: exit `0` and `Playbook validation passed`.

- [ ] **Step 3: Check forbidden generated-project artifacts**

Run:

```bash
find . -type f \( -name 'project.godot' -o -name '*.tscn' -o -name '*.gd' \
  -o -name '*.pck' -o -name '*.exe' -o -name '*.app' \) -not -path './.git/*'
```

Expected: no output. GDScript appears only inside Markdown code fences.

- [ ] **Step 4: Audit canonical identifiers across all files**

Run:

```bash
rg -n "switch_line|FallingThings|MatchLine|SpawnDelay|PlayAgainButton|GUITAR|SPAGHETTI" playbook
```

Inspect every occurrence for exact capitalization and meaning. Search separately for rejected alternatives such as `switch_color`, `FallingObjects`, `SpawnTimer`, and `RestartButton`; expect no instructional use.

- [ ] **Step 5: Review every external source**

Open each unique URL in `link-manifest.md`, confirm the target topic and version, then record the current date and PASS/FAIL. Replace or remove dead/scope-inappropriate links and rerun the validator.

- [ ] **Step 6: Perform the technical path review**

Read `SCRIPT-L04` through `SCRIPT-L12` cumulatively and check:

- Every referenced node exists at that checkpoint.
- Every signal signature matches its callback.
- No script uses an asset before its lesson creates it.
- No object can resolve twice.
- Only one object is active.
- Game over stops spawning and input.
- Restart clears old objects and resets score/line/UI.
- Art changes visuals without changing collision.
- Audio plays once per named event.

Record each result and exact solution anchor in `requirements-checklist.md`. State explicitly that learner runtime remains a lesson-time evidence gate because no generated Godot project is part of this deliverable.

- [ ] **Step 7: Audit every facilitator simulation**

For each scenario, verify the expected response against the contract, current lesson, troubleshooting map, and progress schema. Record a short evidence citation for pacing, evidence request, smallest correction, recheck, tone, and handoff.

- [ ] **Step 8: Reconcile the approved design requirement by requirement**

Open `docs/superpowers/specs/2026-07-25-guitar-and-spaghetti-playbook-design.md`. For every design heading, identify at least one PASS row in `requirements-checklist.md`. Any missing/weak row is a failure and returns to the owning task.

- [ ] **Step 9: Run final clean-tree evidence commands**

Run:

```bash
node --test playbook/validation/check_playbook.test.mjs
node playbook/validation/check_playbook.mjs playbook
git diff --check
git status --short
```

Expected: tests PASS, validator passes, no whitespace errors, and only the three validation evidence files are modified before the final commit.

- [ ] **Step 10: Commit final evidence**

```bash
git add playbook/validation/requirements-checklist.md \
  playbook/validation/link-manifest.md \
  playbook/validation/model-simulation-scenarios.md
git commit -m "docs: complete facilitator playbook audit"
```

- [ ] **Step 11: Verify repository state**

Run:

```bash
git status --short --branch
git log --oneline -5
```

Expected: clean working tree and the final audit commit at `HEAD`.
