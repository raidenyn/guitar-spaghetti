# Guitar and Spaghetti Facilitator Playbook Design

- **Date:** 2026-07-25
- **Target engine:** Godot 4.7.1 stable
- **Language:** GDScript
- **Target platform:** Desktop, controlled with the Space bar
- **Audience:** An 11-year-old child and an adult, both new to Godot
- **Facilitator target:** Model-neutral; intended for Sonnet-class and GPT-5.6 Terra-class capability

## Purpose

Create a complete, self-contained facilitator playbook that a capable middle-tier model, including Sonnet-class and GPT-5.6 Terra-class models, can follow to guide an adult and child through building *Guitar and Spaghetti* themselves.

The primary goal is to learn the Godot editor and the game-creation process. Finishing the game is the motivating thread through the lessons rather than the only measure of success.

The deliverable is a model-neutral Markdown package containing the facilitator contract, progress protocol, individual lessons, internal references, authoritative facilitator-only checkpoints, and validation material. It is not a generated Godot project.

## Success Criteria

The playbook succeeds when:

- A pair with no Godot knowledge can begin with installation and a blank project.
- Lessons fit into 30–45 minute sessions and end with visible progress.
- The child normally controls the mouse and keyboard while the adult coaches.
- Every new Godot or programming concept is explained before it is used.
- The child types short GDScript sections and can describe their purpose afterward.
- Each lesson provides an observable checkpoint, a safe experiment, troubleshooting help, and references.
- The resulting game can be played repeatedly, restarted after a loss, and exported as a desktop build.
- A model can begin or resume a session using only the facilitator contract, progress state, current lesson, and directly referenced supporting pages.
- Different supported models lead the same required path, use the same node and file names, and enforce the same checkpoints.
- The model teaches and diagnoses but never edits or generates the learner's Godot project.
- Every completed step is backed by learner-reported observable evidence.
- A portable session handoff lets another model resume without relying on hidden chat history.
- Static validation proves that required files, lesson sections, internal links, checkpoints, and final acceptance criteria are complete.

## Playbook Package

The playbook is a modular package under `playbook/`:

```text
playbook/
├── START_HERE.md
├── FACILITATOR_CONTRACT.md
├── PROGRESS_STATE.template.md
├── lessons/
│   ├── 01-install-and-create.md
│   ├── 02-meet-the-editor.md
│   ├── 03-build-the-screen.md
│   ├── 04-make-the-line-interactive.md
│   ├── 05-create-a-falling-thing.md
│   ├── 06-create-guitars-and-spaghetti.md
│   ├── 07-spawn-objects-randomly.md
│   ├── 08-detect-the-crossing.md
│   ├── 09-match-and-score.md
│   ├── 10-lose-and-restart.md
│   ├── 11-create-and-import-artwork.md
│   ├── 12-add-sound-and-game-feel.md
│   └── 13-test-and-export.md
├── references/
│   ├── editor-map.md
│   ├── nodes-scenes-and-instances.md
│   ├── gdscript-mini-reference.md
│   ├── coordinates-movement-and-delta.md
│   ├── input-actions.md
│   ├── timers-and-randomness.md
│   ├── signals.md
│   ├── areas-and-collisions.md
│   ├── user-interface.md
│   ├── debugging.md
│   ├── importing-assets.md
│   ├── exporting.md
│   ├── parent-coach-notes.md
│   └── glossary.md
├── facilitator-solutions/
│   ├── authoritative-node-trees.md
│   ├── property-checkpoints.md
│   ├── script-checkpoints.md
│   └── troubleshooting-map.md
└── validation/
    ├── requirements-checklist.md
    ├── link-manifest.md
    └── model-simulation-scenarios.md
```

`START_HERE.md` is the human entry point. It explains how to start with a repository-aware model and how to use the package in a plain chat by attaching or pasting the required files.

`FACILITATOR_CONTRACT.md` is the stable instruction layer loaded at the beginning of every session. The current progress state and lesson are variable context. Reference and solution pages are loaded only when the current step needs them.

The modular form is the canonical edition. It avoids loading the entire course into context and gives each lesson the model's full attention. All files together are self-contained; external links are supplemental sources rather than missing instructions.

## Facilitator Execution Contract

The contract assigns the model the role of patient lesson facilitator, not project implementer. It requires the model to:

1. Read the progress state and current lesson before teaching.
2. Check the lesson's entry criteria and resolve unmet prerequisites first.
3. Present one small action group at a time, normally no more than three editor actions or one short code addition.
4. Use the sequence: goal, short explanation, actions, and one observable verification question.
5. Wait for the learners' result before advancing.
6. Treat a screenshot, described visible behavior, exact node tree, or exact first error as evidence; treat silence or "probably works" as insufficient.
7. Diagnose the current step before offering later-step changes.
8. Keep the child at the keyboard and address explanations to the child without talking down to them.
9. Ask prediction and explain-it-back questions, but keep them brief enough to preserve play time.
10. Keep optional experiments clearly separated from the required path and restore the required checkpoint afterward.
11. Use the authoritative node names, property values, and scripts from the playbook.
12. Never silently redesign the architecture or substitute a different Godot feature.
13. Never edit, scaffold, or generate the learner's Godot project. The model may show the exact lesson-prescribed text for the child to type.
14. Never claim that a checkpoint passed without the required observable evidence.
15. End or pause each session with the progress-state and handoff protocol.

The model must not dump a whole lesson at once, continue past a failed gate, overwhelm the child with multiple alternative fixes, or ask the learners to replace a complete script when a small local correction is sufficient.

The normal facilitator response shape is:

```text
Goal
One short explanation
Do this
What should happen
Tell me what you observe
```

Troubleshooting responses instead use:

```text
What the evidence tells us
One smallest check or correction
How to verify the correction
```

The package includes representative examples of a normal step, a successful verification, a vague learner response, a visible mismatch, a GDScript error, and a resume-from-handoff interaction.

## Teaching Approach

The playbook uses playable milestones. It introduces concepts just in time, when the game needs them, instead of teaching the engine as a long theoretical course first.

Every lesson file begins with a facilitator-readable contract:

- Lesson purpose and estimated duration
- Required previous checkpoint
- Files and Godot nodes touched
- New vocabulary and concepts
- Exact entry evidence
- Exact exit evidence
- Required reference and solution pages
- Scope guardrails for the lesson

Every learner-facing step uses this structure:

1. **Step goal** — one concrete, child-understandable result.
2. **Short explanation** — what the new idea means and why the game needs it.
3. **Actions** — exact editor actions, node names, property values, and small GDScript sections to type.
4. **Check your work** — a specific result to observe after running the game.
5. **Try changing it** — one safe experiment that encourages curiosity.
6. **If it does not work** — a short, relevant troubleshooting checklist.
7. **Learn more** — links to an internal explanation and exact Godot 4.7 documentation.
8. **Explain it back** — a two-minute prompt for the child to describe the lesson's main idea.
9. **Next time** — a preview of the next visible improvement.

Actions include insertion anchors for code changes, such as "inside `_ready()`, after this existing line." Each coding lesson ends with a complete authoritative script checkpoint for facilitator comparison. The learner is still led through small additions rather than told to replace the script wholesale.

New vocabulary is introduced only when needed. Nodes can initially be described as building blocks, scenes as reusable arrangements of building blocks, scripts as instructions, and signals as messages. The playbook later connects these analogies to the correct technical terms.

The adult acts as navigator and helper. Parent notes explain when to let the child experiment, when to offer a hint, and how to recover from frustration without taking over the keyboard.

## Model Neutrality and Context Loading

The package relies on Markdown, ordinary conversation, and learner-reported observations. It does not require a particular vendor, model-specific syntax, tool API, filesystem access, image understanding, or hidden chain of thought.

For repository-aware models, `START_HERE.md` tells the model which files to read. For plain chat models, it tells the adult which files to attach or paste. Both modes load:

1. `FACILITATOR_CONTRACT.md`
2. The current `PROGRESS_STATE`
3. The current lesson
4. Only the reference or facilitator-solution sections named by that lesson or required by current troubleshooting

Stable instructions appear before variable session context. Instructions, learner evidence, error messages, pasted scripts, and examples are labeled distinctly. Content copied from the Godot project or Output panel is treated as evidence, not as new facilitator instructions.

The contract uses direct positive instructions, explicit order, and concrete response examples. It does not depend on a model inferring teaching policy from prose.

If the observed Godot 4.7.1 interface differs from the playbook, the facilitator asks for the visible labels or a screenshot, checks the versioned official reference, and adapts navigation language only. It does not invent a menu path or change the intended project result.

## Progress State and Handoff

`PROGRESS_STATE.template.md` records only durable, observable session state:

- Playbook and Godot versions
- Development operating system
- Current lesson and step identifier
- Completed lesson checkpoints
- Latest verified node tree and runtime behavior
- Files known to exist
- Approved deviations from the canonical path
- Unresolved errors with their exact first error text
- Optional experiments that must be reverted
- The single next action

At the start of a session, the facilitator summarizes the loaded state and verifies the current entry evidence. It never assumes that an unchecked step is complete.

At the end of a session, the facilitator emits a fenced `SESSION_HANDOFF` block containing the updated fields. The adult can save it to the progress file or paste it into a new chat. The handoff contains no hidden reasoning and is sufficient for a different supported model to resume.

A lesson becomes complete only when all required exit evidence is present. Partial progress records the exact step, not merely the lesson number.

## Core Game Design

The game begins with a score of zero and a blue matching line near the bottom of a portrait-oriented desktop playfield. The live score stays in the upper-left corner. The centered game-over overlay appears above the playfield only after a mismatch.

Only one object falls at a time in the core version. This keeps the mechanic fair and makes the event flow easy to understand.

For every turn:

1. The game randomly chooses `GUITAR` or `SPAGHETTI`.
2. It creates the selected object at a random safe horizontal position near the top.
3. The object falls downward at a fixed, adjustable speed.
4. Pressing Space toggles the matching line between blue and red.
5. When the object crosses the line, the game compares its type with the line:
   - Blue matches guitar.
   - Red matches spaghetti.
6. A correct match removes the object, adds one point, and schedules the next object after a short pause.
7. A wrong match stops the round, plays a simple explosion, and displays a game-over overlay with the final score and a Play Again button.
8. Play Again clears the previous round, resets the score and line, and creates a new object.

The core version has two explicit states:

- `PLAYING`: input, movement, spawning, collision checks, and scoring are active.
- `GAME_OVER`: movement and spawning are stopped, Space-bar input is ignored, and only restart is available.

Falling speed stays constant in the core version. Increasing difficulty and multiple simultaneous objects are optional follow-up projects.

## Project Architecture

The project is divided into small parts with one main responsibility each.

### Main Game Scene

The main scene owns round state, score, object spawning, match decisions, game over, and restart. It contains:

- A container for falling objects
- A spawn-delay timer
- The matching line
- The HUD

It is the coordinator, but it does not implement the falling movement, line input, or HUD drawing itself.

### Falling Thing Scene

One reusable `Area2D`-based scene represents both guitars and spaghetti. It owns:

- Its type
- Its current visual
- Its collision shape
- Its falling speed and downward movement

The selected type configures the placeholder appearance at first and the child-made artwork later. Replacing art must not require changes to movement, collision, or scoring.

### Match Line

The matching line owns:

- Its current blue or red state
- Its visible color
- Space-bar input while a round is active
- The detection area that notices a falling object crossing it

It reports a crossing to the main scene rather than deciding the score itself.

### HUD

The HUD owns:

- The score label
- The game-over overlay
- The final-score display
- The Play Again button

It displays values provided by the main scene and reports a restart request through a signal.

### Communication

Components communicate through clear events:

```text
Spawn timer -> Main creates a Falling Thing
Space bar -> Match Line toggles its color
Thing crosses line -> Match Line reports the Thing to Main
Main -> removes the Thing and updates HUD, or starts game over
Play Again button -> HUD asks Main to restart
```

Signals are introduced because the project has real events to communicate, not as an isolated theoretical topic.

## Visual and Audio Progression

The game begins with geometric placeholders so the first playable result arrives quickly:

- A blue/red rectangle or line for the matcher
- Two clearly different colored or shaped falling placeholders
- A simple temporary explosion effect

After the mechanics work, the child creates guitar and spaghetti artwork. The playbook explains transparent image backgrounds, useful image dimensions, file naming, importing PNG files, assigning textures, and adjusting display scale without distorting collision behavior.

Simple switch, success, and explosion sounds are added only after the complete game loop works. The playbook uses original recordings or clearly licensed reusable sounds and explains where source and license notes should be kept.

## Lesson Roadmap

### Lesson 1: Install Godot and Create the Project

Install Godot 4.7.1, learn what the Project Manager does, create the project, create an initial scene, and run it.

### Lesson 2: Meet the Editor

Explore the Scene tree, 2D viewport, Inspector, FileSystem dock, Output panel, and run controls through small reversible experiments.

### Lesson 3: Build the Playing Screen

Configure the game window and background, then add the bottom matching line and score label.

### Lesson 4: Make the Line Interactive

Create an Input Map action for Space, attach the first script, introduce functions and state, and toggle the line between blue and red.

### Lesson 5: Create a Falling Thing

Build a reusable scene with a placeholder visual and collision shape. Introduce position, frames, and `delta` while making one object fall.

### Lesson 6: Create Guitars and Spaghetti

Introduce variables and a two-value type. Configure the reusable falling scene to represent either object.

### Lesson 7: Spawn Objects Randomly

Use a timer, instantiate the Falling Thing scene, choose a random type, and select a random safe horizontal position.

### Lesson 8: Detect the Crossing

Add the line's detection area, configure collision layers and masks, connect a signal, and make the crossing visible in the Output panel.

### Lesson 9: Match and Score

Compare object type with line state. Remove correct objects, add exactly one point, update the score label, and start the next turn.

### Lesson 10: Lose and Restart

Add the playing/game-over states, stop the round after a mismatch, show the explosion and final score, and implement a complete Play Again reset.

### Lesson 11: Create and Import Artwork

Draw or photograph child-made art, prepare transparent PNG files, import them, and replace placeholders without changing game logic.

### Lesson 12: Add Sound and Game Feel

Add switch, success, and explosion sounds. Tune falling speed, delays, object size, and visual feedback.

### Lesson 13: Test and Export

Complete the acceptance checklist, fix remaining problems, install the required export template, and create a playable desktop build.

## Testing Strategy

Testing is part of every lesson. After each editor change or short script section, the playbook identifies one exact result to check. Temporary `print()` calls expose invisible state and signal activity in the Output panel.

Each completed lesson is a working checkpoint. The pair should stop only after running that checkpoint successfully. Project backups are made at several major milestones so experimentation is safe.

The facilitator distinguishes three gate results:

- `PASS`: the required evidence matches.
- `RETRY`: the result is missing or ambiguous, so the facilitator asks for one more observation.
- `DIAGNOSE`: the evidence contradicts the checkpoint, so the facilitator follows the relevant failure branch.

Only `PASS` advances the required path.

The final acceptance checklist verifies:

- A new round starts at score zero with a blue line.
- One Space press changes blue to red, and another changes red to blue.
- Both object types can appear.
- Objects spawn within the visible horizontal bounds.
- Blue plus guitar awards exactly one point.
- Red plus spaghetti awards exactly one point.
- Blue plus spaghetti causes game over.
- Red plus guitar causes game over.
- A resolved object cannot score or fail twice.
- No new object spawns after game over.
- Space does not change the line after game over.
- Play Again removes old objects, resets the score and line, hides the overlay, and starts a new round.
- Artwork and sounds load without editor errors.
- The exported desktop build behaves like the editor version.

## Troubleshooting Design

The playbook uses the same recovery routine throughout:

1. Read the first red error.
2. Check spelling, capitalization, and indentation.
3. Compare the Scene tree with the lesson's node-tree diagram.
4. Confirm the scene and script were saved.
5. Return to the previous working checkpoint if necessary.
6. Make and test one change at a time.

Focused help boxes cover:

- No main scene selected
- A node or script was not saved
- Wrong or differently capitalized node names
- Incorrect node paths
- GDScript indentation errors
- A signal that is not connected
- An `Area2D` without a `CollisionShape2D`
- Incorrect collision layers or masks
- A collision shape that is disabled or misplaced
- Art that imports at an unexpected size
- Missing audio or export resources

Troubleshooting text describes what the child can observe, why it probably happened, and the smallest repair to try.

The troubleshooting map is keyed by observable symptom and current lesson, not by a long unordered list of possible causes. Each branch requests the smallest piece of discriminating evidence before selecting a repair. After a repair, the facilitator reruns the failed verification gate before continuing.

## Reference Strategy

The finished playbook contains internal reference chapters for:

- Editor map and essential controls
- Nodes, scenes, and instances
- GDScript mini-reference
- Coordinates, movement, and `delta`
- Input actions
- Timers and randomness
- Signals
- `Area2D`, collision shapes, layers, and masks
- UI controls and anchors
- Reading errors and using the debugger
- Importing art and audio
- Exporting desktop builds
- Parent/coach notes
- Glossary

Lesson references link directly to the relevant internal heading instead of merely naming the chapter. Each external link also appears in `validation/link-manifest.md` with its intended lesson and topic.

External references use official Godot sources and versioned `4.7` documentation URLs wherever available. The moving `latest` documentation is avoided because it may describe unreleased behavior.

Primary starting references:

- [Godot 4.7.1 maintenance release](https://godotengine.org/article/maintenance-release-godot-4-7-1/)
- [Godot 4.7 step-by-step introduction](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/index.html)
- [Godot 4.7 first 2D game](https://docs.godotengine.org/en/4.7/getting_started/first_2d_game/index.html)
- [Godot 4.7 using signals](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/signals.html)
- [Godot 4.7 random number generation](https://docs.godotengine.org/en/4.7/tutorials/math/random_number_generation.html)
- [Godot 4.7 exporting projects](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_projects.html)

Facilitator-design references:

- [OpenAI prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)
- [Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)
- [Claude output consistency](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency)

These sources support the package's use of explicit role and workflow instructions, concrete examples, consistent response formats, relevant context loading, chained subtasks, and validation.

## Playbook Validation

The playbook is not considered complete merely because every planned file exists. Validation must provide evidence at four levels.

### Structural Validation

An automated local checker verifies:

- Every file named in the package design exists.
- Lesson numbers are complete and unique.
- Required lesson metadata and learner-step headings exist.
- Every internal Markdown link and anchor resolves.
- Every referenced facilitator checkpoint exists.
- No unresolved placeholder or unfinished template markers remain outside the progress-state template.
- All Godot documentation links use the versioned `4.7` path when one exists.

### Curriculum Validation

`requirements-checklist.md` maps every game rule, teaching requirement, lesson, artifact, reference topic, and acceptance test to the exact playbook location that satisfies it.

The lesson exit state must equal the next lesson's entry state. File names, node names, input action names, collision layers, type values, signals, and script APIs must remain consistent across lessons and authoritative checkpoints.

### Technical Validation

The complete canonical node trees, property values, and GDScript checkpoints are reviewed as one implementation path. The review checks syntax, node-path consistency, signal signatures, state transitions, single-resolution scoring, cleanup, restart behavior, and export prerequisites.

Because the deliverable deliberately does not include a generated Godot project, the playbook must clearly distinguish technically reviewed canonical text from learner-verified runtime behavior. Facilitators never claim the learner's runtime passed until the learner provides the specified evidence.

### Facilitator Simulation

`model-simulation-scenarios.md` provides transcript-style cases with expected facilitator behavior:

- A clean first session
- Resuming halfway through a lesson with a different model
- A learner saying only "it works"
- An incorrectly named node
- A GDScript indentation or parse error
- A missing collision shape
- A collision layer or mask mismatch
- A failed score mapping
- Restart leaving an old object behind
- A child wanting to make an optional change mid-lesson
- The editor UI differing from the written navigation
- An attempted jump to a later lesson

Each scenario has pass/fail criteria for pacing, evidence gathering, diagnosis, scope control, child-appropriate explanation, and correct progress-state output. The final audit records the evidence for every scenario rather than relying on a general quality judgment.

## Scope Boundaries

The core playbook does not include:

- Multiple simultaneous falling objects
- Increasing difficulty
- Title, pause, or settings screens
- Saved high scores
- Accounts, online features, or leaderboards
- Mobile or web controls
- Complex animation systems
- Advanced particle or shader effects
- C# or languages other than GDScript
- A generated or prebuilt final project
- Model-driven editing of the learner's project
- Dependence on one model vendor, tool system, or chat product

Those features may be suggested as optional projects after the learner completes and understands the core game.

## Final Deliverable

After this design is approved in written form, the next document will be a detailed implementation plan for producing and validating the entire modular playbook.

The final deliverable is the complete `playbook/` package described above. It contains all instructions a supported facilitator model needs to guide the pair from installation through a tested and exported desktop game. The learners create every scene, node, asset, and script themselves.

Completion requires:

- All package files are finished.
- All 13 lessons lead through the approved game architecture and teaching sequence.
- Facilitator-only checkpoints are internally consistent with the lessons.
- The progress and handoff protocol supports model changes between sessions.
- Structural and curriculum validation passes.
- The technical review passes.
- Every facilitator simulation scenario has recorded passing evidence.
- The repository contains no generated Godot project presented as the learners' work.
