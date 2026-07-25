# GDScript Mini-Reference

This is a small dictionary for the code used in *Guitar and Spaghetti*. Type
the code provided by the current lesson exactly, then use the matching section
to understand one piece. GDScript cares about spelling, capitals, and
indentation.

For the full language reference, use Godot's versioned [GDScript basics](https://docs.godotengine.org/en/4.7/tutorials/scripting/gdscript/gdscript_basics.html).

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
if falling and not resolved:
    position.y += fall_speed * delta
```

**Common mistake:** Using `or` here would let a resolved object keep falling
whenever one half of the condition remains true.

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

## _processdelta

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
await get_tree().create_timer(0.35).timeout
```

**Common mistake:** Expecting the whole game to freeze; only this function waits
while other game processing can continue.

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
thing.call_deferred("queue_free")
```

**Common mistake:** Freeing a collision object immediately inside an overlap
callback when the lesson calls for deferred cleanup; use the prescribed call.
