# Cumulative Script Checkpoints

Each lesson section contains the complete script bodies that should exist at
that checkpoint. There are no omitted regions: compare a learner script with
the whole matching block. Scripts not yet created do not appear. Private helper
names can evolve when a later lesson expands their responsibility; the public
interfaces converge on the Canonical Game Contract.

## Lesson 04 — `SCRIPT-L04`

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

@onready var visual: ColorRect = $Visual

func _ready() -> void:
    reset_to_blue()

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR
```

At this checkpoint input is temporarily enabled by default so Space can be
tested before game states exist.

## Lesson 05 — `SCRIPT-L05`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

@export var fall_speed: float = 180.0

var falling := false

func _ready() -> void:
    start_falling()

func start_falling() -> void:
    falling = true

func _process(delta: float) -> void:
    if falling:
        position.y += fall_speed * delta
```

The temporary `_ready()` call starts the manually placed Lesson 05 instance.

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

@onready var visual: ColorRect = $Visual

func _ready() -> void:
    reset_to_blue()

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR
```

## Lesson 06 — `SCRIPT-L06`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")

@export var fall_speed: float = 180.0
@export var kind: Kind = Kind.GUITAR

var falling := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel

func _ready() -> void:
    _apply_placeholder()
    start_falling()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()

func start_falling() -> void:
    falling = true

func _process(delta: float) -> void:
    if falling:
        position.y += fall_speed * delta

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
```

`kind` is temporarily exported so the learner can select both values on the
manual instance. Lesson 07 removes the Inspector-only test path when `Main`
owns setup.

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

@onready var visual: ColorRect = $Visual

func _ready() -> void:
    reset_to_blue()

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR
```

## Lesson 07 — `SCRIPT-L07`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")

@export var fall_speed: float = 180.0

var kind: Kind = Kind.GUITAR
var falling := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel

func _ready() -> void:
    _apply_placeholder()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()

func start_falling() -> void:
    falling = true

func _process(delta: float) -> void:
    if falling:
        position.y += fall_speed * delta

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
```

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

@onready var visual: ColorRect = $Visual

func _ready() -> void:
    reset_to_blue()

func _unhandled_input(event: InputEvent) -> void:
    if input_enabled and event.is_action_pressed("switch_line"):
        current_color = (
            LineColor.RED
            if current_color == LineColor.BLUE
            else LineColor.BLUE
        )
        _apply_color()
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR
```

### `res://scripts/main.gd`

```gdscript
extends Node2D

const FALLING_THING_SCENE: PackedScene = preload("res://scenes/falling_thing.tscn")
const WINDOW_WIDTH := 480.0
const SPAWN_Y := -40.0
const HORIZONTAL_MARGIN := 60.0

var current_thing: FallingThing

@onready var falling_things: Node2D = $FallingThings
@onready var spawn_delay: Timer = $SpawnDelay

func _ready() -> void:
    _spawn_thing()

func _spawn_thing() -> void:
    if is_instance_valid(current_thing):
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
```

`SpawnDelay` is cached because the node is present, but the timer loop is
introduced in Lesson 08.

## Lesson 08 — `SCRIPT-L08`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")

@export var fall_speed: float = 180.0

var kind: Kind = Kind.GUITAR
var falling := false
var resolved := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel

func _ready() -> void:
    _apply_placeholder()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()

func start_falling() -> void:
    falling = true

func _process(delta: float) -> void:
    if falling:
        position.y += fall_speed * delta

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
```

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

signal thing_crossed(thing: FallingThing)

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

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
        get_viewport().set_input_as_handled()

func reset_to_blue() -> void:
    current_color = LineColor.BLUE
    _apply_color()

func set_input_enabled(value: bool) -> void:
    input_enabled = value

func _apply_color() -> void:
    visual.color = BLUE_COLOR if current_color == LineColor.BLUE else RED_COLOR

func _on_area_entered(area: Area2D) -> void:
    var thing := area as FallingThing
    if input_enabled and thing != null:
        thing_crossed.emit(thing)
```

### `res://scripts/main.gd`

```gdscript
extends Node2D

const FALLING_THING_SCENE: PackedScene = preload("res://scenes/falling_thing.tscn")
const WINDOW_WIDTH := 480.0
const SPAWN_Y := -40.0
const HORIZONTAL_MARGIN := 60.0

var current_thing: FallingThing

@onready var falling_things: Node2D = $FallingThings
@onready var match_line: MatchLine = $MatchLine
@onready var spawn_delay: Timer = $SpawnDelay

func _ready() -> void:
    _spawn_thing()

func _spawn_thing() -> void:
    if is_instance_valid(current_thing):
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
    if thing != current_thing or thing.resolved:
        return
    thing.resolved = true
    current_thing = null
    thing.queue_free()
    spawn_delay.start()

func _on_spawn_delay_timeout() -> void:
    _spawn_thing()
```

Required connections at this checkpoint:

```text
MatchLine.thing_crossed -> Main._on_match_line_thing_crossed
SpawnDelay.timeout -> Main._on_spawn_delay_timeout
```

## Lesson 09 — `SCRIPT-L09`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")

@export var fall_speed: float = 180.0

var kind: Kind = Kind.GUITAR
var falling := false
var resolved := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel

func _ready() -> void:
    _apply_placeholder()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()

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

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
```

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

signal thing_crossed(thing: FallingThing)

enum LineColor { BLUE, RED }

const BLUE_COLOR := Color("#2684ff")
const RED_COLOR := Color("#ef4444")

var current_color: LineColor = LineColor.BLUE
var input_enabled := true

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

### `res://scripts/hud.gd`

```gdscript
class_name GameHUD
extends CanvasLayer

@onready var score_label: Label = $ScoreLabel

func set_score(value: int) -> void:
    score_label.text = "Score: %d" % value
```

### `res://scripts/main.gd`

```gdscript
extends Node2D

const FALLING_THING_SCENE: PackedScene = preload("res://scenes/falling_thing.tscn")
const WINDOW_WIDTH := 480.0
const SPAWN_Y := -40.0
const HORIZONTAL_MARGIN := 60.0

var score := 0
var current_thing: FallingThing

@onready var falling_things: Node2D = $FallingThings
@onready var match_line: MatchLine = $MatchLine
@onready var spawn_delay: Timer = $SpawnDelay
@onready var hud: GameHUD = $HUD

func _ready() -> void:
    score = 0
    hud.set_score(score)
    _spawn_thing()

func _spawn_thing() -> void:
    if is_instance_valid(current_thing):
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
    if thing != current_thing or thing.resolved:
        return
    thing.resolved = true
    current_thing = null
    if match_line.matches(thing.kind):
        score += 1
        hud.set_score(score)
        thing.resolve_success()
    else:
        print("Mismatch — game over comes next lesson")
        thing.stop_falling()
        thing.queue_free()
    spawn_delay.start()

func _on_spawn_delay_timeout() -> void:
    _spawn_thing()
```

The mismatch print and continuing spawn are intentionally temporary Lesson 09
behavior. Lesson 10 replaces only that branch with game over.

## Lesson 10 — `SCRIPT-L10`

### `res://scripts/falling_thing.gd`

```gdscript
class_name FallingThing
extends Area2D

enum Kind { GUITAR, SPAGHETTI }

const GUITAR_COLOR := Color("#3b82f6")
const SPAGHETTI_COLOR := Color("#ef4444")

@export var fall_speed: float = 180.0

var kind: Kind = Kind.GUITAR
var falling := false
var resolved := false

@onready var placeholder: ColorRect = $Placeholder
@onready var type_label: Label = $TypeLabel

func _ready() -> void:
    _apply_placeholder()

func setup(new_kind: Kind) -> void:
    kind = new_kind
    if is_node_ready():
        _apply_placeholder()

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

func _apply_placeholder() -> void:
    placeholder.color = GUITAR_COLOR if kind == Kind.GUITAR else SPAGHETTI_COLOR
    type_label.text = "GUITAR" if kind == Kind.GUITAR else "SPAGHETTI"
```

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

signal thing_crossed(thing: FallingThing)

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

### `res://scripts/hud.gd`

```gdscript
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

### `res://scripts/main.gd`

```gdscript
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
        thing.resolve_success()
        spawn_delay.start()
    else:
        await _finish_game(thing)

func _finish_game(thing: FallingThing) -> void:
    state = GameState.GAME_OVER
    spawn_delay.stop()
    match_line.set_input_enabled(false)
    await thing.explode()
    hud.show_game_over(score)

func _on_spawn_delay_timeout() -> void:
    _spawn_thing()

func _on_hud_play_again_requested() -> void:
    start_new_game()
```

Required connections at this checkpoint:

```text
MatchLine.thing_crossed -> Main._on_match_line_thing_crossed
SpawnDelay.timeout -> Main._on_spawn_delay_timeout
HUD.play_again_requested -> Main._on_hud_play_again_requested
PlayAgainButton.pressed -> HUD._on_play_again_button_pressed
```

## Lesson 11 — `SCRIPT-L11`

Lesson 11 replaces the placeholder art with imported textures. It does not add
audio behavior yet.

### `res://scripts/falling_thing.gd`

```gdscript
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

### `res://scripts/match_line.gd`

```gdscript
class_name MatchLine
extends Area2D

signal thing_crossed(thing: FallingThing)

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

### `res://scripts/hud.gd`

```gdscript
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

### `res://scripts/main.gd`

```gdscript
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
        thing.resolve_success()
        spawn_delay.start()
    else:
        await _finish_game(thing)

func _finish_game(thing: FallingThing) -> void:
    state = GameState.GAME_OVER
    spawn_delay.stop()
    match_line.set_input_enabled(false)
    await thing.explode()
    hud.show_game_over(score)

func _on_spawn_delay_timeout() -> void:
    _spawn_thing()

func _on_hud_play_again_requested() -> void:
    start_new_game()
```

Required connections at this checkpoint:

```text
MatchLine.thing_crossed -> Main._on_match_line_thing_crossed
SpawnDelay.timeout -> Main._on_spawn_delay_timeout
HUD.play_again_requested -> Main._on_hud_play_again_requested
PlayAgainButton.pressed -> HUD._on_play_again_button_pressed
```

## Lesson 12 — `SCRIPT-L12`

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
