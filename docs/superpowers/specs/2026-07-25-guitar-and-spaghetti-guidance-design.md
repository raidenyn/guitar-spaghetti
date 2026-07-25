# Guitar and Spaghetti Learning Guide Design

- **Date:** 2026-07-25
- **Target engine:** Godot 4.7.1 stable
- **Language:** GDScript
- **Target platform:** Desktop, controlled with the Space bar
- **Audience:** An 11-year-old child and an adult, both new to Godot

## Purpose

Create a beginner-friendly, step-by-step learning guide that helps an adult and child build *Guitar and Spaghetti* themselves. The deliverable is guidance, not a generated Godot project.

The primary goal is to learn the Godot editor and the game-creation process. Finishing the game is the motivating thread through the lessons rather than the only measure of success.

## Success Criteria

The guide succeeds when:

- A pair with no Godot knowledge can begin with installation and a blank project.
- Lessons fit into 30–45 minute sessions and end with visible progress.
- The child normally controls the mouse and keyboard while the adult coaches.
- Every new Godot or programming concept is explained before it is used.
- The child types short GDScript sections and can describe their purpose afterward.
- Each lesson provides an observable checkpoint, a safe experiment, troubleshooting help, and references.
- The resulting game can be played repeatedly, restarted after a loss, and exported as a desktop build.

## Teaching Approach

The guide uses playable milestones. It introduces concepts just in time, when the game needs them, instead of teaching the engine as a long theoretical course first.

Every lesson uses this structure:

1. **Step goal** — one concrete, child-understandable result.
2. **Short explanation** — what the new idea means and why the game needs it.
3. **Actions** — exact editor actions, node names, property values, and small GDScript sections to type.
4. **Check your work** — a specific result to observe after running the game.
5. **Try changing it** — one safe experiment that encourages curiosity.
6. **If it does not work** — a short, relevant troubleshooting checklist.
7. **Learn more** — links to an internal explanation and exact Godot 4.7 documentation.
8. **Explain it back** — a two-minute prompt for the child to describe the lesson's main idea.
9. **Next time** — a preview of the next visible improvement.

New vocabulary is introduced only when needed. Nodes can initially be described as building blocks, scenes as reusable arrangements of building blocks, scripts as instructions, and signals as messages. The guide later connects these analogies to the correct technical terms.

The adult acts as navigator and helper. Parent notes explain when to let the child experiment, when to offer a hint, and how to recover from frustration without taking over the keyboard.

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

After the mechanics work, the child creates guitar and spaghetti artwork. The guide explains transparent image backgrounds, useful image dimensions, file naming, importing PNG files, assigning textures, and adjusting display scale without distorting collision behavior.

Simple switch, success, and explosion sounds are added only after the complete game loop works. The guide uses original recordings or clearly licensed reusable sounds and explains where source and license notes should be kept.

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

Testing is part of every lesson. After each editor change or short script section, the guide identifies one exact result to check. Temporary `print()` calls expose invisible state and signal activity in the Output panel.

Each completed lesson is a working checkpoint. The pair should stop only after running that checkpoint successfully. Project backups are made at several major milestones so experimentation is safe.

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

The guide uses the same recovery routine throughout:

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

## Reference Strategy

The finished guide contains internal reference chapters for:

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

Lesson references link directly to the relevant internal heading instead of merely naming the chapter.

External references use official Godot sources and versioned `4.7` documentation URLs wherever available. The moving `latest` documentation is avoided because it may describe unreleased behavior.

Primary starting references:

- [Godot 4.7.1 maintenance release](https://godotengine.org/article/maintenance-release-godot-4-7-1/)
- [Godot 4.7 step-by-step introduction](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/index.html)
- [Godot 4.7 first 2D game](https://docs.godotengine.org/en/4.7/getting_started/first_2d_game/index.html)
- [Godot 4.7 using signals](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/signals.html)
- [Godot 4.7 random number generation](https://docs.godotengine.org/en/4.7/tutorials/math/random_number_generation.html)
- [Godot 4.7 exporting projects](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_projects.html)

## Scope Boundaries

The core guide does not include:

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

Those features may be suggested as optional projects after the learner completes and understands the core game.

## Final Deliverable

After this design is approved in written form, the next document will be a detailed writing plan for producing the complete learning guide. The eventual guide will contain exact beginner actions and teaching explanations, but it will not create the Godot project on the learner's behalf.
