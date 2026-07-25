# Child-Friendly Glossary

Each entry starts with a friendly meaning, then gives the precise game-making
meaning used by this playbook.

## Action

An action is a named button job, like “switch the line.” Technically,
`switch_line` is an Input Map action connected to the physical Space key.

## Anchor

An anchor is a way to jump to the right part of a page. Technically, it is the
`#heading-name` part of a Markdown link.

## Area2D

An Area2D is an invisible zone that can notice when something enters it.
Technically, it is a 2D collision-detection node used for `FallingThing` and
`MatchLine`.

## Array

An array is a list in a row. Technically, it is an ordered GDScript collection,
such as a list of possible falling-object kinds.

## AudioStreamPlayer

An AudioStreamPlayer is a sound speaker node. Technically, it plays an imported
audio stream when the switch, success, or explosion happens.

## CanvasLayer

A CanvasLayer is a drawing layer that stays on the screen. Technically, `HUD`
uses one so the score and game-over panel do not move with world objects.

## Checkpoint

A checkpoint is a known good stopping place. Technically, it is the verified
lesson state such as `L07_COMPLETE` recorded in progress state.

## Class

A class is a named kind of thing that code can describe. Technically,
`class_name FallingThing` lets other scripts use that script type by name.

## Collision layer

A collision layer is a badge saying what kind of collider something is.
Technically, `FallingThing` is on layer 1 and `MatchLine` is on layer 2.

## Collision mask

A collision mask is a list of collider badges to look for. Technically,
`MatchLine` has mask 1 so it watches falling things on layer 1.

## CollisionShape2D

A CollisionShape2D is an invisible outline used for bump checking. Technically,
it gives an `Area2D` a `RectangleShape2D` with a chosen size and position.

## ColorRect

A ColorRect is a simple coloured rectangle. Technically, this game uses one for
the background, a temporary falling-object picture, and the visible match line.

## Constant

A constant is a labelled value that should stay the same. Technically, GDScript
uses `const` for a value such as a preloaded texture.

## Container

A container is a node that arranges screen controls for you. Technically,
`VBoxContainer` stacks the game-over text and Play Again button vertically.

## Coordinates

Coordinates are map numbers that say where something is. Technically, this
2D game uses x across the screen and y down the screen.

## Debugger

The Debugger is a clue collector for problems while a game runs. Technically,
it is the Godot bottom-panel tool for runtime errors and debugging information.

## delta

Delta is the tiny amount of time since the last picture was drawn. Technically,
`_process(delta)` uses it so `180` pixels per second means the same speed on
different computers.

## Editor

The editor is the Godot workshop where we build the game. Technically, it
contains docks such as Scene, Inspector, FileSystem, Output, and Debugger.

## enum

An enum is a small menu of named choices. Technically, `Kind` contains
`GUITAR` and `SPAGHETTI`, while `LineColor` contains `BLUE` and `RED`.

## Evidence gate

An evidence gate is a check based on something you can actually see. Technically,
the facilitator advances only after the lesson's requested screenshot, exact
tree, first error, or visible behavior is reported.

## Export

Export means making a game file that can run outside the editor. Technically,
Godot combines the project with an export preset and installed export templates.

## Export template

An export template is Godot's platform-building helper. Technically, the editor
needs matching templates to create a desktop build.

## Function

A function is a named recipe of code steps. Technically, `func start_new_game()`
defines code that runs when a new round begins.

## Game state

A game state is the game's current mode. Technically, this game uses `PLAYING`
and `GAME_OVER` to decide whether objects may spawn or the line may switch.

## GDScript

GDScript is Godot's programming language. Technically, the `.gd` files in this
project use its indentation-based syntax to control nodes.

## HUD

HUD means the game information drawn over play. Technically, this `CanvasLayer`
contains `ScoreLabel` and the game-over panel.

## Input Map

The Input Map is Godot's list of named controls. Technically, it maps the Space
key to the action named `switch_line`.

## Instance

An instance is one usable copy of a saved model. Technically, `Main` creates a
fresh `FallingThing` from its PackedScene when spawning an object.

## Inspector

The Inspector is the panel for changing a selected node's settings. Technically,
it exposes properties such as position, size, color, collision layers, and
exported script values.

## Label

A Label is text drawn in the game. Technically, `ScoreLabel` shows points and
other labels show the game-over message and final score.

## Main scene

The main scene is the first scene the project starts. Technically, it is
`res://scenes/main.tscn`, whose root node is `Main`.

## MatchLine

The MatchLine is the color-changing bar near the bottom of the game. Technically,
it is an `Area2D` at y `640` that detects a falling object's crossing.

## Node

A node is one game building block with a job. Technically, it is a Godot object
in a scene tree, such as a `Node2D`, `Timer`, `Label`, or `Area2D`.

## Node path

A node path is directions to a node in a scene tree. Technically, `$HUD/ScoreLabel`
starts at the current node and follows its `HUD` child to `ScoreLabel`.

## Output

Output is where Godot prints important run messages. Technically, read its first
red error after a run before attempting a correction.

## PackedScene

A PackedScene is a saved scene ready to make copies. Technically, preloading
`falling_thing.tscn` produces a resource whose `instantiate()` method creates a
new node tree.

## Pixels per second

Pixels per second is a way to measure steady movement. Technically,
`fall_speed` is `180.0`, and code multiplies it by `delta` each frame.

## Play Again

Play Again is the button that starts another round. Technically, it emits a
signal through `HUD` so `Main` can reset score, objects, color, and state.

## Project

A project is one game's home folder. Technically, `GuitarAndSpaghetti` contains
`project.godot` and files under the virtual root `res://`.

## Project Manager

The Project Manager is Godot's project chooser. Technically, it creates and
opens the folder and renderer setup for `GuitarAndSpaghetti`.

## queue_free

`queue_free` is a safe goodbye request for a node. Technically,
`queue_free()` removes a matched or exploded `FallingThing` after the engine's
current work.

## Renderer

A renderer is the part of Godot that draws the game. Technically, this beginner
desktop project uses the Compatibility renderer selected during project creation.

## Resolution

Resolution is the playfield's width and height in pixels. Technically, this
game's viewport is 480 by 720 for a portrait screen.

## Scene

A scene is a saved group of nodes that belongs together. Technically,
`main.tscn` is the whole game screen and `falling_thing.tscn` is reusable.

## Scene tree

A scene tree is a family map of parent and child nodes. Technically, Godot's
Scene dock shows ownership and paths within the open scene.

## Signal

A signal is a message saying an event happened. Technically, nodes connect
signals such as `thing_crossed` and `play_again_requested` to functions.

## Sprite2D

A Sprite2D is a node that draws a 2D image. Technically, it displays the guitar
or spaghetti PNG after the temporary colored placeholder is hidden.

## Stretch mode

Stretch mode is the rule for fitting a game viewport into a window. Technically,
this project uses `canvas_items` and aspect `keep`.

## Texture

A texture is an image resource a game can draw. Technically, `guitar.png` and
`spaghetti.png` become textures used by `Sprite2D`.

## Timer

A Timer is a node that waits and then sends a message. Technically,
`SpawnDelay` waits `0.5` seconds before the next falling object appears.

## Undo

Undo is a safe way to reverse the last edit. Technically, Godot's Edit menu can
undo one change so an optional experiment can return to its checkpoint.

## Variable

A variable is a labelled box that can change. Technically, `score`, `falling`,
and `current_color` are GDScript variables.

## Viewport

A viewport is the rectangular game area Godot draws. Technically, its width is
480 and height is 720 before window stretching is applied.

## WAV

WAV is a common uncompressed sound-file format. Technically, a WAV placed in
`res://audio` can be imported and assigned to an `AudioStreamPlayer`.
