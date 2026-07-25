# Coordinates, Movement, and `delta`

This reference explains how falling objects travel through the game's 480 by
720 playfield. It supports Lessons 05--07. Use the current lesson for actions
and the [script checkpoints](../facilitator-solutions/script-checkpoints.md)
for complete code at each checkpoint.

For a visual tour, see Godot's official [2D introduction](https://docs.godotengine.org/en/4.7/tutorials/2d/introduction_to_2d.html).

## The game screen is a map

Godot measures 2D positions in pixels. A position has two numbers:

- `x` says how far across an object is.
- `y` says how far down an object is.

The top-left corner is `(0, 0)`. Moving right makes `x` bigger; moving left
makes `x` smaller. Moving down makes `y` bigger; moving up makes `y` smaller.
That downward-positive `y` direction is worth remembering: a falling object
needs its `y` value to grow.

In this game, the line is at y `640`, and a spawned object begins at y `-40`.
Starting a little above the visible screen lets it enter from the top instead
of suddenly appearing inside the playfield.

## `position` belongs to the object

`FallingThing` is an `Area2D`, which has a `position`. Its `position` is the
place of that object in its parent `FallingThings` node. The canonical movement
line is:

```gdscript
position.y += fall_speed * delta
```

Read it as: “move this object down by its speed for this tiny moment of game
time.” The full Lesson 05 version is in
[`SCRIPT-L05`](../facilitator-solutions/script-checkpoints.md#lesson-05-script-l05).

## Speed is pixels per second

The canonical `fall_speed` is `180.0`, meaning **180 pixels in one second**.
It is not “180 pixels every picture the computer draws.” Computers can draw a
different number of pictures each second, so a fixed movement-per-picture
would make the game faster on some computers and slower on others.

Godot calls `_process(delta)` repeatedly. A **frame** is one tiny moment when
the game updates and draws. `delta` means how much time passed since the
previous frame, measured in seconds. Multiplying by `delta` makes the same
speed work at different frame rates.

### A no-algebra example

Imagine the game updates sixty times during one second. Each tiny moment is
about one sixtieth of a second. At `180` pixels per second, the object moves
about 3 pixels on each of those sixty moments. Sixty little moves of about 3
pixels make about 180 pixels after one second.

If another computer updates thirty times in that second, each tiny moment is
about twice as long. The same line moves about 6 pixels each time, and thirty
little moves still make about 180 pixels. That is why `fall_speed * delta` is
frame-rate independent.

## Check the visible result

At the Lesson 05 gate, a temporary `FallingThing` starts near `(240, -40)` and
moves down smoothly. Its Inspector value is `fall_speed: 180.0`. If it moves
sideways, does not move, or moves much too fast, use the current lesson's
troubleshooting branch before changing a later system.

## Related concepts

- [Nodes and 2D position](nodes-scenes-and-instances.md#node)
- [`_process`, variables, and indentation](gdscript-mini-reference.md#functions)
- [Canonical geometry and speed](../facilitator-solutions/property-checkpoints.md#lesson-05-prop-l05)
