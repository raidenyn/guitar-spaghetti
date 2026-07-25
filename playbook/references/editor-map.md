# Godot Editor Map

Godot is a workshop with several panels. You do not need to memorize every
button: use this map when a lesson names a panel.

For a visual introduction, see Godot's official [Introduction to 2D](https://docs.godotengine.org/en/4.7/tutorials/2d/introduction_to_2d.html).

## Project Manager

**What it is:** The Project Manager is Godot's start screen, where a game
project has its name and folder.

**Where to find it:** It opens before a project, and is available again after
closing the editor window.

**When this game uses it:** In Lesson 01, create `GuitarAndSpaghetti` with the
Compatibility renderer, then open it.

## Scene tree

**What it is:** The Scene tree is the left-hand list that shows the nodes in
the scene and which node is inside which parent.

**Where to find it:** The **Scene** dock is normally at the upper left of the
editor.

**When this game uses it:** Build `Main`, add `Background`, `MatchLine`, and
`HUD`, then later compare the visible tree with the lesson checkpoints.

## 2D viewport

**What it is:** The 2D viewport is the central canvas where you can see and
move 2D nodes.

**Where to find it:** Select the **2D** workspace near the top of the editor.

**When this game uses it:** Position the line at y `640`, place the score at
the top-left, and check that objects fall through the 480 by 720 playfield.

## Inspector

**What it is:** The Inspector shows editable properties for the node currently
selected in the Scene tree.

**Where to find it:** The **Inspector** dock is normally at the right.

**When this game uses it:** Set a `ColorRect` colour and size, a Timer's wait
time, collision layers, and a node's script or exported property.

## FileSystem

**What it is:** The FileSystem dock is the project's file browser. `res://`
means the top folder of this particular Godot project.

**Where to find it:** The **FileSystem** dock is normally at the lower left.

**When this game uses it:** Make the `scenes`, `scripts`, `art`, and `audio`
folders and save `main.tscn`, `falling_thing.tscn`, and their scripts.

## Output

**What it is:** Output is the message panel where Godot reports printed
messages, warnings, and many script errors after a run.

**Where to find it:** Click **Output** in the bottom panel.

**When this game uses it:** Read the *first red error* after running a scene;
that first message is usually the best clue for the current mistake.

## Debugger

**What it is:** The Debugger gathers errors, breakpoints, and runtime details
while the game runs.

**Where to find it:** Click **Debugger** in the bottom panel after starting a
scene or project.

**When this game uses it:** Later lessons use it to investigate a collision or
signal that did not happen. Start with the first reported error rather than
changing several things at once.

## Run project and run current scene

**What it is:** **Run Project** starts the game's configured main scene.
**Run Current Scene** starts only the scene currently open in the editor.

**Where to find it:** Use the play buttons near the top right. Their usual
shortcuts are F6 for the current scene and F5 for the project; confirm the
visible tooltips if a computer uses different shortcuts.

**When this game uses it:** Use Run Current Scene to check `FallingThing` on
its own, and Run Project to play the completed game from `main.tscn`.

## Save

**What it is:** Save writes the current scene or script to the project folder.
A small change marker beside a scene name means there are edits not yet saved.

**Where to find it:** Choose **Scene > Save Scene**, **File > Save**, or the
save icon. The usual shortcut is Ctrl+S on Windows/Linux and Cmd+S on macOS.

**When this game uses it:** Save before running a scene and whenever a lesson's
evidence gate asks for a saved node tree.

## Undo

**What it is:** Undo reverses the latest editor action. Redo brings back an
undone action.

**Where to find it:** Use **Edit > Undo** and **Edit > Redo**. The common
shortcuts are Ctrl+Z / Ctrl+Shift+Z on Windows/Linux and Cmd+Z / Cmd+Shift+Z on
macOS.

**When this game uses it:** It makes small, safe experiments reversible. Undo
one accidental move or property edit, then check the scene again.

## Warning icons

**What it is:** A yellow triangle is a warning: Godot noticed a setup that may
cause trouble but can sometimes still run. A red error means the game cannot
continue correctly.

**Where to find it:** Warnings can appear beside nodes in the Scene tree, in
the Output panel, or in the Inspector.

**When this game uses it:** A `CollisionShape2D` warning is a useful reminder
to check that it has a rectangle shape. Read the warning text before changing
anything; do not treat yellow and red messages as the same thing.
