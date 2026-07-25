# GDScript Mini-Reference

This is a small dictionary for the code used in *Guitar and Spaghetti*. Type
the code provided by the current lesson exactly, then use the matching section
to understand one piece. GDScript cares about spelling, capitals, and
indentation.

For the full language reference, use Godot's versioned [GDScript basics](https://docs.godotengine.org/en/4.7/tutorials/scripting/gdscript/gdscript_basics.html).

## Glossary

### Callback

A callback is a recipe Godot runs later when a particular event happens. More
precisely, it is a function connected to a signal or engine event, so Godot
calls it instead of the player calling it directly.

```gdscript
func _on_spawn_delay_timeout() -> void:
    _spawn_thing()
```

**Common mistake:** Calling `_on_spawn_delay_timeout()` yourself instead of
letting the `SpawnDelay.timeout` signal call it.

### Method

A method is a recipe that belongs to one particular object. More precisely, it
is a function defined by a node's script and called through that node.

```gdscript
match_line.reset_to_blue()
```

**Common mistake:** Writing `reset_to_blue()` in `Main` without saying which
object owns the method; the course calls it on `match_line`.

### Node2D

A Node2D is a game object with a 2D place, so it can have an `x` and `y`
position. More precisely, it is Godot's base scene-tree node for 2D
transforms, such as `position`, `rotation`, and `scale`.

```gdscript
extends Node2D # The Main scene's root uses a 2D game-space node.
```

**Common mistake:** Using `Control` for a falling game object when the lesson
needs its normal 2D position and movement behavior.

### PanelContainer

A PanelContainer is a box that can draw a panel behind its child. More
precisely, it is a Control container that uses its theme's panel style and
sizes its child within the panel.

```text
HUD/GameOverPanel (PanelContainer)
```

**Common mistake:** Putting the Game Over labels beside `GameOverPanel` rather
than inside it, so the panel cannot arrange them as one overlay.

### Property

A property is a named piece of information an object keeps, like a character
sheet fact. More precisely, it is a value exposed by a node or script that can
be read or changed with dot notation.

```gdscript
thing.resolved = true
```

**Common mistake:** Treating `resolved` like a function and writing
`thing.resolved()`; this course value is a property, not a method.

### RectangleShape2D

A RectangleShape2D is an invisible rectangle used for collision. More
precisely, it is the shape resource assigned to a `CollisionShape2D` child of
the falling thing or match line.

```text
MatchLine/CollisionShape2D (RectangleShape2D)
```

**Common mistake:** Resizing only the visible line while leaving its
`RectangleShape2D` at the old size, making the collision area disagree.

### Script

A script is a file of instructions that gives a Godot node its behavior. More
precisely, it is a GDScript resource attached to a node, such as the Main
scene's controller.

```text
res://scripts/main.gd attached to Main
```

**Common mistake:** Attaching `main.gd` to `HUD`; the course attaches it to the
`Main` root, where its node paths and game state belong.

### VBoxContainer

A VBoxContainer is a helper that stacks its child controls from top to bottom.
More precisely, it is a Control container that automatically lays out its
visible children vertically.

```text
HUD/GameOverPanel/VBoxContainer (VBoxContainer)
```

**Common mistake:** Moving the Game Over labels by hand after placing them in
the VBoxContainer; let the container keep their vertical layout.

## extends

`extends` says which Godot node type supplies this script's starting powers.

```gdscript
extends Area2D # FallingThing can detect areas and have a 2D position.
```

**Common mistake:** Writing `extends area2d`; type names are capitalized exactly
as Godot names them.

## class_name

`class_name` gives a script a reusable type name.

```gdscript
class_name FallingThing
```

**Common mistake:** Naming it `Fallingthing`; later code expects the exact
capital `T` in `FallingThing`.

## Variables

A variable is a named box whose value can change while the game runs.

```gdscript
var score = 0
```

**Common mistake:** Using `Score` in one place and `score` in another; capitals
make a different name.

## Typed variables

A typed variable says what kind of value belongs in its box.

```gdscript
@export var fall_speed: float = 180.0
```

**Common mistake:** Writing `180` where a lesson asks for `180.0` while learning
float values; the decimal makes the intended pixels-per-second value clear.

## enum

An `enum` gives names to a small, fixed menu of choices.

```gdscript
enum Kind { GUITAR, SPAGHETTI }
```

**Common mistake:** Comparing with the text `"GUITAR"` instead of
`Kind.GUITAR`; the enum choice is not a text string.

## Constants

A constant is a named value that the program should not change.

```gdscript
const BLUE_COLOR := Color("2684ff")
```

**Common mistake:** Trying to assign a new colour to `BLUE_COLOR` later; use a
variable when the value is supposed to change.

## Functions

A function is a named recipe of instructions that runs when called.

```gdscript
func start_falling() -> void:
    falling = true
```

**Common mistake:** Forgetting the colon at the end of the `func` line.

## Indentation

Indentation is the spaces or tabs that show which lines belong inside a
function, `if`, or loop.

```gdscript
if falling:
    position.y += fall_speed * delta
```

**Common mistake:** Leaving `position.y` at the left edge; Godot reports that
the `if` statement has no indented block.

## if

`if` runs its indented instructions only when its question is true.

```gdscript
if matches(thing.kind):
    score += 1
```

**Common mistake:** Using one equals sign (`=`) to ask a comparison question;
use `==` for comparison when a lesson requires it.

## and-or

`and` requires both questions to be true; `or` accepts either true question.

```gdscript
return (
    kind == FallingThing.Kind.GUITAR
    and current_color == LineColor.BLUE
) or (
    kind == FallingThing.Kind.SPAGHETTI
    and current_color == LineColor.RED
)
```

**Common mistake:** Changing either `and` to `or`; then a guitar could match
just because the line is blue, even when the kind check is false.

## Signals

A signal is a message a node sends to say that something happened.

```gdscript
signal thing_crossed(thing: FallingThing)
```

**Common mistake:** Declaring the signal but never emitting it with
`thing_crossed.emit(thing)` when the line is crossed.

## export

`@export` makes a script variable visible and editable in the Inspector.

```gdscript
@export var fall_speed: float = 180.0
```

**Common mistake:** Changing an Inspector value while a lesson asks to change a
constant in the script; change only the location named by the current step.

## onready

`@onready` waits until the node and its children exist, then finds a child once.

```gdscript
@onready var visual: ColorRect = $Visual
```

**Common mistake:** Writing `$Visual` in a normal top-level `var` line; the
child may not exist yet when that line runs.

## Node paths

A node path is a route through the Scene tree, and `$` is a short way to get a
node at that route.

```gdscript
@onready var score_label: Label = $HUD/ScoreLabel
```

**Common mistake:** Writing `$ScoreLabel` from `Main`; the label is inside
`HUD`, so the path must include `HUD/`.

## _ready

`_ready()` is a special function Godot calls once after a node enters the
scene tree and its children are ready.

```gdscript
func _ready() -> void:
    reset_to_blue()
```

**Common mistake:** Calling `_ready()` yourself to reset a game; call the
lesson's named reset function instead.

## _process(delta)

`_process(delta)` is a special function Godot calls every frame; `delta` is
the time since the previous frame.

```gdscript
func _process(delta: float) -> void:
    position.y += fall_speed * delta
```

**Common mistake:** Moving by `fall_speed` without multiplying by `delta`; that
makes speed depend on the computer's frame rate.

## await

`await` pauses one function until a signal or other awaitable event finishes.

```gdscript
await tween.finished
```

**Common mistake:** Expecting the whole game to freeze; the course's explosion
function waits for its tween while other game processing can continue.

## preload

`preload` loads a resource when the script is prepared, so it is ready to use.

```gdscript
const GUITAR_TEXTURE = preload("res://art/guitar.png")
```

**Common mistake:** Misspelling the file path or using `res:/` with one slash;
Godot paths begin with `res://`.

## Arrays

An array is an ordered list of values.

```gdscript
var available_kinds: Array[FallingThing.Kind] = [FallingThing.Kind.GUITAR, FallingThing.Kind.SPAGHETTI]
```

**Common mistake:** Using parentheses instead of square brackets for the list.

## Loops

A loop repeats an instruction for each item in a collection.

```gdscript
for child in falling_things.get_children():
    child.queue_free()
```

**Common mistake:** Forgetting the colon after `for`, or forgetting to indent
the line that should repeat.

## queue_free

`queue_free()` asks Godot to remove a node safely after the current work is
finished.

```gdscript
thing.queue_free() # Remove a correctly matched guitar or spaghetti.
```

**Common mistake:** Removing only the picture but leaving the `Area2D`; free the
whole `FallingThing` node.

## call_deferred

`call_deferred` schedules a method call for a safe moment after the current
engine work finishes.

```gdscript
call_deferred("_spawn_thing")
```

**Common mistake:** Calling `_spawn_thing()` directly from `start_new_game()`;
the course defers it until the scene reset work has finished.
