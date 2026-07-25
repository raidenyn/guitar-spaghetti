# Nodes, Scenes, and Instances

Think of a game as a construction set. A **node** is one building block, a
**scene** is a saved model made from blocks, and an **instance** is one copy of
that saved model placed inside another model. This lets us make one good
falling-object design and reuse it for guitars and spaghetti.

## Node

A node is one object with a job, such as drawing a colour, playing sound,
detecting an overlap, or holding other nodes.

Technically, a Godot node is an object of a particular type with properties,
methods, signals, and possibly child nodes. For example, `Main` is a `Node2D`,
`MatchLine` is an `Area2D`, and `ScoreLabel` is a `Label`.

## Scene

A scene is a saved collection of nodes that works as one reusable part of a
game.

Technically, a Godot scene is saved as a `.tscn` file. This course saves the
whole game screen as `res://scenes/main.tscn` and one reusable falling object
as `res://scenes/falling_thing.tscn`.

## Scene tree

A scene tree is the parent-and-child map of the nodes in the open scene.

Technically, children inherit their parent's place in the hierarchy and are
freed with it. The Scene dock displays this tree, and a node path describes a
route through it.

Here is the important final relationship, without any script details:

```text
Main
├── FallingThings
│   └── FallingThing (an instance made during play)
├── MatchLine
└── HUD

FallingThing (its own saved scene)
├── Placeholder
├── TypeLabel
├── Sprite2D
└── CollisionShape2D
```

`Main` owns the game screen. `FallingThings` is an empty holder where one
`FallingThing` appears at a time. The second tree belongs to the reusable
scene, not a second copy that must be built by hand each time.

## Instance

An instance is a copy of a saved scene placed in another scene, like using the
same cookie cutter to make several cookies.

Technically, Godot stores a reference to the source scene and can create an
instance at edit time or with code at run time. This game creates each new
`FallingThing` from `falling_thing.tscn`, puts it under `FallingThings`, and
removes it after a score or explosion.

## PackedScene

A PackedScene is Godot's in-memory version of a saved scene: a packed set of
node information that can make instances.

Technically, loading or preloading `res://scenes/falling_thing.tscn` gives a
`PackedScene`; calling `instantiate()` makes a fresh `FallingThing`. The course
introduces this only when automatic spawning needs it.

## A useful rule for this game

If something has one job and several parts that belong together, give it a
scene. `FallingThing` is a scene because its colour/art, text, collision shape,
and movement all travel together. Do not make a separate scene for every
guitar and spaghetti: they are different kinds of the same reusable object.

Read the official [Nodes and Scenes](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/nodes_and_scenes.html)
guide when you want a second explanation.
