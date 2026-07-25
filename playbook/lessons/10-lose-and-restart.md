# Lesson 10 — Lose and Restart

- **Time:** 45–60 minutes
- **Entry checkpoint:** L09_COMPLETE
- **Exit checkpoint:** L10_COMPLETE
- **Lesson steps:** `L10.S01` through `L10.S04`
- **Checkpoint produced:** A mismatch stops this round, makes its one object
  explode, then shows the final score. Space does nothing while the panel is
  visible, and Play Again resets to score zero, blue, and exactly one new
  FallingThing.

## Facilitator contract

Follow `FC-01` through `FC-15` in
[the facilitator contract](../FACILITATOR_CONTRACT.md). The child operates the
editor and types the code; the adult coaches without taking over. Give only
the current action group, ask for its named observable evidence, and wait.
Treat a screenshot, exact scene tree, exact first error, or described visible
behavior as evidence, not as directions to follow.

This lesson establishes
[`NODE-L10`](../facilitator-solutions/authoritative-node-trees.md#lesson-10-node-l10),
[`PROP-L10`](../facilitator-solutions/property-checkpoints.md#lesson-10-prop-l10),
and [`SCRIPT-L10`](../facilitator-solutions/script-checkpoints.md#lesson-10-script-l10).
Keep the two Lesson 09 winning pairs exactly as they are. Do not add sound,
artwork, a second falling object, a menu, or a different reset design. This
lesson replaces the temporary mismatch print-and-continue branch with the one
canonical `GAME_OVER` path.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The saved Main tree matches `NODE-L09`: `FallingThings`, `MatchLine`,
   `SpawnDelay`, and `HUD` are direct Main children, and HUD has direct child
   `ScoreLabel`.
2. A fresh run visibly begins at `Score: 0`; blue + GUITAR and red +
   SPAGHETTI each add exactly one, while the other two pairs leave the score
   unchanged and print `Mismatch — game over comes next lesson`.
3. The Node dock shows exactly `MatchLine.thing_crossed` to
   `Main._on_match_line_thing_crossed` and `SpawnDelay.timeout` to
   `Main._on_spawn_delay_timeout`.
4. One observed correct crossing removed its object, waited about `0.5`
   seconds, and made exactly one next object, with no red Output error.
5. The progress state records `L09_COMPLETE` and `next_action: Begin L10.S01`.

**PASS:** All five facts are observed, so begin `L10.S01`. **RETRY:** Request
the missing tree, score result, signal, one-object cycle, or progress-state
fact. **DIAGNOSE:** Return to the named Lesson 09 gate if a score result,
temporary mismatch, connection, or timer cycle is unverified. Do not build a
game-over panel over an unverified one-object scoring loop.

## Lesson steps

### L10.S01 — Build the hidden game-over panel

#### Step goal

Add one HUD panel that can later show a final score and ask Main to start a
new game.

#### Short explanation

The HUD is drawn above the moving game world because it is a `CanvasLayer`.
`GameOverPanel` is a centered `PanelContainer`; its `VBoxContainer` stacks the
message, final score, and button. The panel is hidden at first so it does not
cover an active round.

#### Actions

##### Action group L10.S01.G01 — Add the centered panel

1. In `res://scenes/main.tscn`, right-click `HUD (CanvasLayer)` and add a
   `PanelContainer` named exactly `GameOverPanel`.
2. In the Layout menu, choose the **Center** anchor preset.
3. In the Inspector, set offsets Left `-140`, Top `-100`, Right `140`, and
   Bottom `100`; turn its Visible property off, then save.

**Observable gate — `L10.S01.G01 panel layout`:** What exact parent and node
name do you see, what anchor preset is selected, what four offsets are shown,
and is Visible off?

**PASS:** The learner reports `HUD/GameOverPanel`, center anchors,
`-140, -100, 140, 100`, and Visible off; continue to `L10.S01.G02`.
**RETRY:** Request the missing parent, value, or visibility fact.
**DIAGNOSE:** If the panel is off-screen or behind FallingThings, compare its
parent with `HUD (CanvasLayer)` and restore only the differing parent or
offset. Do not move ScoreLabel or change the viewport.

##### Action group L10.S01.G02 — Make the vertical panel tree

1. Add a `VBoxContainer` as the direct child of GameOverPanel.
2. Add a `Label` under VBoxContainer named `GameOverLabel`, then set its Text
   to exactly `Game Over`.
3. Save and confirm the first two visible tree levels read
   `HUD → GameOverPanel → VBoxContainer → GameOverLabel`.

**Observable gate — `L10.S01.G02 first panel child`:** What exact four node
names and types appear from HUD through GameOverLabel, and what text is shown?

**PASS:** The learner reports the requested tree and `Game Over`; continue to
`L10.S01.G03`. **RETRY:** Request the missing name, type, or text.
**DIAGNOSE:** If a label is a direct child of GameOverPanel, reparent only that
label below VBoxContainer. If a name differs in capitalization, use
[`SYM-NAME-01`](../facilitator-solutions/troubleshooting-map.md#sym-name-01-wrong-node-capitalization).

##### Action group L10.S01.G03 — Add the final score and button

1. Add a second `Label` under VBoxContainer named exactly `FinalScoreLabel`;
   set its starting text to `Final score: 0`.
2. Add a `Button` under VBoxContainer named exactly `PlayAgainButton`; set its
   Text to `Play Again`.
3. Save and compare the expanded HUD tree with `NODE-L10`.

**Observable gate — `L10.S01.G03 complete panel tree`:** State the three
VBoxContainer children in order, including their types and visible text.

**PASS:** The learner reports `GameOverLabel (Label): Game Over`,
`FinalScoreLabel (Label): Final score: 0`, then `PlayAgainButton (Button):
Play Again`; continue to `L10.S02`. **RETRY:** Request the missing ordered
child or text. **DIAGNOSE:** If the labels overlap or appear in a different
order, keep the three nodes under the one VBoxContainer and reparent only the
misplaced node; do not manually position the labels.

#### Check your work

Ask: “Why is the panel inside HUD instead of inside FallingThings?” **PASS**
requires the idea that the HUD stays on the screen while game objects move.

#### If it does not work

- **The panel stays visible during this setup:** Confirm GameOverPanel's
  Inspector Visible property is off. The HUD script will also hide it whenever
  the game starts or resets.
- **The panel is not centered:** Recheck the Center anchor preset and all four
  offsets before changing any child controls.
- **The button or a label is missing from the expected path:** Request the
  expanded HUD tree and use `SYM-NAME-01` or `SYM-PATH-01` for the one differing
  segment.

#### References

- [HUD layout and exact values](../references/user-interface.md#exact-layout-values)
- [Final HUD tree](../references/user-interface.md#final-hud-tree)
- [Lesson 10 properties](../facilitator-solutions/property-checkpoints.md#lesson-10-prop-l10)

### L10.S02 — Let HUD ask for Play Again

#### Step goal

Give GameHUD a small, clear way to show and hide its panel, then turn the
button press into a message Main can answer.

#### Short explanation

HUD owns display work, not the game state. It receives a final number from
Main, shows that number, and emits `play_again_requested` when its button is
pressed. Main will remain the only script that resets score, objects, timer,
and line color.

#### Actions

##### Action group L10.S02.G01 — Give HUD the panel paths and signal

In `res://scripts/hud.gd`, add the signal directly below `extends CanvasLayer`.
Then add the two paths directly below the existing `score_label` path:

~~~gdscript

signal play_again_requested

@onready var game_over_panel: PanelContainer = $GameOverPanel
@onready var final_score_label: Label = $GameOverPanel/VBoxContainer/FinalScoreLabel
~~~

Save and check for the first red error.

**Observable gate — `L10.S02.G01 HUD paths`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L10.S02.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a path is null, show the expanded HUD tree and use
[`SYM-PATH-01`](../facilitator-solutions/troubleshooting-map.md#sym-path-01-null-node-path)
to correct only the path segment that differs.

##### Action group L10.S02.G02 — Hide the panel whenever HUD starts

At the end of `hud.gd`, add this one short function. Keep `set_score`
unchanged.

~~~gdscript

func _ready() -> void:
    hide_game_over()
~~~

Save and check for the first red error.

**Observable gate — `L10.S02.G02 HUD ready`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L10.S02.G03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the panel does not hide on a new run, compare only the
`hide_game_over()` spelling and GameOverPanel path before continuing.

##### Action group L10.S02.G03 — Show the final score

Directly below `_ready()`, add this one display function:

~~~gdscript

func show_game_over(final_score: int) -> void:
    final_score_label.text = "Final score: %d" % final_score
    game_over_panel.show()
~~~

Save and check for the first red error.

**Observable gate — `L10.S02.G03 show final score`:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S02.G04`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the label path is null, show the expanded HUD tree and correct
only its differing segment with `SYM-PATH-01`.

##### Action group L10.S02.G04 — Give HUD a hide function

Directly below `show_game_over`, add this one function:

~~~gdscript

func hide_game_over() -> void:
    game_over_panel.hide()
~~~

Save and check for the first red error.

**Observable gate — `L10.S02.G04 hide function`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S02.G05`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the body is red, compare only the four spaces before
`game_over_panel.hide()`.

##### Action group L10.S02.G05 — Let the button ask for a reset

At the end of `hud.gd`, add this one callback:

~~~gdscript

func _on_play_again_button_pressed() -> void:
    play_again_requested.emit()
~~~

Save and check for the first red error.

**Observable gate — `L10.S02.G05 button callback`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L10.S02.G06`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the function body is red, compare only the four spaces before
its one body line. If the button callback name differs, restore exactly
`_on_play_again_button_pressed`; do not reset the game from HUD.

##### Action group L10.S02.G06 — Connect the button to HUD

1. Select `HUD/GameOverPanel/VBoxContainer/PlayAgainButton` and open the Node
   dock.
2. Connect its `pressed` signal to the `HUD` node, accepting the callback name
   `HUD._on_play_again_button_pressed`.
3. Save, then show the connection in the Node dock or its connection icon.

**Observable gate — `L10.S02.G06 button connection`:** What sender signal,
receiver, and exact callback name does the Node dock show?

**PASS:** The learner reports `PlayAgainButton.pressed` to
`HUD._on_play_again_button_pressed`; continue to `L10.S03`. **RETRY:** Request
all three connection facts. **DIAGNOSE:** If pressing later does nothing, use
[`SYM-SIGNAL-01`](../facilitator-solutions/troubleshooting-map.md#sym-signal-01-expected-callback-never-runs)
and connect only this missing signal.

#### Check your work

Ask: “When the button is pressed, which script asks and which script will do
the reset?” **PASS** requires HUD asks by emitting its signal and Main resets.

#### If it does not work

- **The panel is visible when a new run starts:** Confirm `_ready()` calls
  `hide_game_over()` and the `GameOverPanel` path is exact.
- **The final score label does not update later:** Compare only
  `$GameOverPanel/VBoxContainer/FinalScoreLabel` with the tree before editing
  the score format string.
- **The button callback is attached to Main:** Disconnect only that incorrect
  button connection and reconnect `pressed` to HUD; the HUD signal will reach
  Main in the next step.

#### References

- [HUD display responsibilities](../references/user-interface.md#canvaslayer-keeps-the-hud-on-the-screen)
- [connecting a signal](../references/signals.md#connect-a-signal-in-the-editor)
- [Lesson 10 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-10-script-l10)

### L10.S03 — Stop a mismatch and reset the game

#### Step goal

Give Main two explicit game states so it can stop the whole round on a
mismatch, wait for an explosion, and safely start one clean new round.

#### Short explanation

`PLAYING` means the line may accept Space, objects may spawn, and crossings
may score. `GAME_OVER` means the active object is being finished or the panel
is waiting for Play Again. Every path that could create, resolve, or switch
the line checks that state. `start_new_game()` is one reset button for all
round state, rather than a scattered collection of partial resets.

#### Actions

##### Action group L10.S03.G01 — Name the two states

In `res://scripts/main.gd`:

1. Directly below `extends Node2D`, add `enum GameState { PLAYING, GAME_OVER }`.
2. Directly above `var score := 0`, add `var state: GameState = GameState.GAME_OVER`.
3. Save and check for the first red error.

**Observable gate — `L10.S03.G01 game states`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If `GameState` is unknown, compare the enum spelling and its
placement directly below `extends Node2D`; do not make a second enum.

##### Action group L10.S03.G02 — Create a named reset starting point

Replace the body of `_ready()` with this one line, then add the small empty
function directly below `_ready()`:

~~~gdscript
func _ready() -> void:
    start_new_game()

func start_new_game() -> void:
    pass
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G02 reset starting point`:** Is there a red
error? If yes, copy its first line and line number; if no, state that there is
no red error.

**PASS:** The learner observes no red error; continue to `L10.S03.G03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If `start_new_game` is called before the onready paths exist,
compare only `_ready()` with `SCRIPT-L10` and keep it below all onready paths.

##### Action group L10.S03.G03 — Clear the old round and reset score

Replace only `pass` inside `start_new_game()` with these first reset lines:

~~~gdscript
    for child in falling_things.get_children():
        child.queue_free()
    current_thing = null
    score = 0
    state = GameState.PLAYING
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G03 clear state`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G04`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the loop is red, inspect only its four-space nested
indentation. Do not remove the loop that queues every old child.

##### Action group L10.S03.G04 — Finish the reset details

Directly below `state = GameState.PLAYING`, add these reset lines:

~~~gdscript
    spawn_delay.stop()
    hud.set_score(score)
    hud.hide_game_over()
    match_line.reset_to_blue()
    match_line.set_input_enabled(true)
    call_deferred("_spawn_thing")
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G04 complete reset`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G05`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the panel stays visible or no object appears later, compare
only the named HUD, line, timer, and deferred-spawn lines with `SCRIPT-L10`.

##### Action group L10.S03.G05 — Guard spawning

In `_spawn_thing()`, replace the first `if` line with:

~~~gdscript
    if state != GameState.PLAYING or is_instance_valid(current_thing):
        return
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G05 spawn guard`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G06`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a new object does not appear at startup, compare only this
condition and confirm state becomes `GameState.PLAYING` in the reset function.

##### Action group L10.S03.G06 — Guard scoring after game over

At the very start of `_on_match_line_thing_crossed`, expand the existing guard
so it reads:

~~~gdscript
    if (
        state != GameState.PLAYING
        or thing != current_thing
        or thing.resolved
    ):
        return
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G06 crossing guard`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G07`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a correct crossing no longer scores, ensure the new state
guard is before the old identity/resolved checks, while the existing score
branch remains below `thing.resolved = true`. Use `SYM-SCORE-01` for a double
resolution.

##### Action group L10.S03.G07 — Teach a FallingThing its explosion

At the end of `res://scripts/falling_thing.gd`, directly above
`_apply_placeholder()`, add this function:

~~~gdscript

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
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G07 explosion function`:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G08`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If Godot reports a tween or `await` error, compare only the two
`tween_property` lines and `await tween.finished` with `SCRIPT-L10`. Keep the
duration `0.35`, target scale `Vector2(2.2, 2.2)`, and alpha target `0.0`.

##### Action group L10.S03.G08 — Add the game-over helper

In `main.gd`, directly above the existing `_on_spawn_delay_timeout()` function,
add this one helper. The temporary mismatch branch stays in place for this
small group.

~~~gdscript

func _finish_game(thing: FallingThing) -> void:
    state = GameState.GAME_OVER
    spawn_delay.stop()
    match_line.set_input_enabled(false)
    await thing.explode()
    hud.show_game_over(score)
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G08 game-over helper`:** Is there a red error?
If yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G09`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the panel path is null, use `SYM-PATH-01`; if a tween or
`await` error is red, compare only the named line with `SCRIPT-L10`.

##### Action group L10.S03.G09 — Replace only the temporary mismatch branch

In Main's crossing callback, replace only the current `else` branch and delete
the `spawn_delay.start()` directly below the whole branch. Keep the correct
match branch unchanged. The callback ending must now be:

~~~gdscript
    else:
        await _finish_game(thing)
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G09 mismatch replacement`:** Is there a red
error? If yes, copy its first line and line number; if no, state that there is
no red error.

**PASS:** The learner observes no red error; continue to `L10.S03.G10`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the panel appears before the object finishes, make sure only
`await thing.explode()` is directly above `hud.show_game_over(score)`. If an
object appears after loss, inspect only `state = GameState.GAME_OVER`,
`spawn_delay.stop()`, and the `_spawn_thing` guard.

##### Action group L10.S03.G10 — Give Main its restart callback

At the end of `main.gd`, add this one short callback:

~~~gdscript

func _on_hud_play_again_requested() -> void:
    start_new_game()
~~~

Save and check for the first red error.

**Observable gate — `L10.S03.G10 restart callback`:** Is there a red error? If
yes, copy its first line and line number; if no, state that there is no red
error.

**PASS:** The learner observes no red error; continue to `L10.S03.G11`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the function is outside Main's script or red, compare only
its `func` line and its four-space body indentation.

##### Action group L10.S03.G11 — Connect HUD's request to Main

1. Select `HUD (CanvasLayer)` and open the Node dock.
2. Connect `play_again_requested` to Main, accepting
   `Main._on_hud_play_again_requested`.
3. Save and show this new connection alongside the existing MatchLine and
   SpawnDelay connections.

**Observable gate — `L10.S03.G11 restart connection`:** What sender signal,
receiver, and callback does the Node dock show?

**PASS:** The learner reports `HUD.play_again_requested` to
`Main._on_hud_play_again_requested`; continue to `L10.S04`. **RETRY:** Request
all three facts. **DIAGNOSE:** If the callback is missing, restore just the
function at the end of `main.gd`, save, then connect this one signal. If a
button press still does nothing, use `SYM-SIGNAL-01` and inspect both required
connections one at a time.

#### Check your work

Ask: “Name the three things that happen before the Game Over panel shows.”
**PASS** requires state becomes `GAME_OVER`, the timer stops and line input is
disabled, then the object finishes its explosion; the panel is shown after
that wait.

#### If it does not work

- **Space still switches blue and red after loss:** Confirm both
  `state = GameState.GAME_OVER` and `match_line.set_input_enabled(false)` are
  inside `_finish_game` before the `await`.
- **A new object arrives behind the panel:** Confirm `spawn_delay.stop()` is
  in `_finish_game` and the `_spawn_thing` state guard is exactly present.
- **The old object remains after Play Again or two objects appear:** Use
  [`SYM-RESET-01`](../facilitator-solutions/troubleshooting-map.md#sym-reset-01-old-object-remains-after-restart)
  and request the full reset function plus the child count after restart.
- **The panel is behind the game:** Confirm the entire panel remains under
  `HUD (CanvasLayer)`, not under Main or FallingThings.
- **The explosion produces a red error:** Use `SYM-GD-01` with the first red
  line and compare only the named tween or `await` line.

#### References

- [game states](../references/glossary.md#game-state)
- [`await`, loops, and deferred calls](../references/gdscript-mini-reference.md#await)
- [Play Again signal roles](../references/signals.md#the-five-required-connections)
- [reset recovery](../facilitator-solutions/troubleshooting-map.md#sym-reset-01-old-object-remains-after-restart)
- [Lesson 10 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-10-script-l10)

### L10.S04 — Prove two losses and two clean restarts

#### Step goal

Observe that each mismatch locks the round, reports the score it earned,
and that two consecutive Play Again cycles both return to one clean object.

#### Short explanation

The state rules matter most when events happen near each other. This matrix
checks the two mismatch combinations, then checks the reset twice. Seeing one
FallingThings child after each reset proves the old round was cleared and the
deferred spawn produced only one new active object.

#### Actions

##### Action group L10.S04.G01 — Record a blue mismatch

1. Run the project, let a `SPAGHETTI` fall, and leave the line blue.
2. Before it crosses, note the visible score; after it crosses, wait for the
   explosion and panel.
3. While the panel is visible, press Space once and note whether the line
   color changes.

**Observable gate — `L10.S04.G01 blue mismatch`:** Report the object kind,
line color, score before and final score, whether the object exploded before
the panel, and whether Space changed the line.

**PASS:** The learner reports blue + SPAGHETTI, unchanged score, explosion
before the panel, the exact final score, and no line change from Space;
continue to `L10.S04.G02`. **RETRY:** Request the missing observation.
**DIAGNOSE:** If the score changes, use `SYM-MAP-01`. If Space changes the
line, return to `L10.S03.G04`; if an object arrives after loss, inspect the
same group’s timer stop and spawn guard.

##### Action group L10.S04.G02 — Restart once and count children

1. Click Play Again once.
2. Confirm ScoreLabel reads `Score: 0`, the line is blue, and GameOverPanel is
   hidden.
3. In the remote running Scene tree, expand FallingThings and count its direct
   children after the deferred spawn has appeared.

**Observable gate — `L10.S04.G02 first restart`:** What score text, line
color, panel visibility, and FallingThings child count do you observe?

**PASS:** The learner reports `Score: 0`, blue, hidden panel, and exactly one
child; continue to `L10.S04.G03`. **RETRY:** Request the missing result.
**DIAGNOSE:** If an old object remains or count is not one, use `SYM-RESET-01`.
If the panel remains visible, inspect only `hud.hide_game_over()` in
`start_new_game()` and the exact GameOverPanel path.

##### Action group L10.S04.G03 — Repeat with the red mismatch

1. On the new object, use Space before the crossing so a `GUITAR` reaches a
   red line; wait for a later random GUITAR if necessary.
2. Record score before and the final-score text after the mismatch.
3. Confirm no next object appears while the panel is visible.

**Observable gate — `L10.S04.G03 red mismatch`:** Report red + GUITAR, score
before and final-score text, whether it exploded before the panel, and whether
another object appeared after loss.

**PASS:** The learner reports red + GUITAR, unchanged score, explosion before
the panel, matching final score, and no next object; continue to
`L10.S04.G04`. **RETRY:** Request the missing observation. **DIAGNOSE:** If
another object appears, repeat the `_finish_game` timer and `_spawn_thing`
state-guard comparison; do not change collision settings or the matching map.

##### Action group L10.S04.G04 — Restart a second time

1. Click Play Again a second time.
2. Confirm ScoreLabel is `Score: 0`, the line is blue, and the panel is hidden.
3. Count the direct FallingThings children after the new object appears and
check the Output panel for a red error.

**Observable gate — `L10.S04.G04 second restart`:** What exact score text,
line color, panel visibility, child count, and first red Output result do you
observe?

**PASS:** The learner reports `Score: 0`, blue, hidden panel, exactly one
child, and no red Output error. Continue to the lesson checkpoint.
**RETRY:** Request the missing exact value or error result. **DIAGNOSE:** A
button that does nothing uses `SYM-SIGNAL-01`; an old or doubled object uses
`SYM-RESET-01`; a red tween error uses `SYM-GD-01`. Rerun this same restart
gate after one smallest correction.

#### Check your work

Ask: “Why does Play Again call one reset function instead of creating only a
new object?” **PASS** requires the idea that score, panel, line color/input,
timer, old objects, and `current_thing` must all reset together.

#### If it does not work

- **Play Again does nothing:** Check the button-to-HUD connection, then the
  HUD-to-Main connection, in that order; use `SYM-SIGNAL-01` for the exact
  evidence request.
- **Score does not become zero:** Keep `score = 0` before `hud.set_score(score)`
  in `start_new_game()`; do not edit ScoreLabel directly.
- **Space toggles after a mismatch:** Restore `match_line.set_input_enabled(false)`
  before `await thing.explode()` and rerun the blue mismatch gate.
- **The overlay appears behind a falling object:** Compare the panel's parent
  with `HUD (CanvasLayer)`; do not raise a world-node z index as a substitute.
- **A third object appears on restart:** Use `SYM-RESET-01`; the canonical
  child-clearing loop, `current_thing = null`, timer stop, and deferred spawn
  must all be present.

#### References

- [HUD setup checks](../references/user-interface.md#ui-setup-checks)
- [checking visible connections](../references/signals.md#check-the-visible-result)
- [small-problem recovery order](../references/debugging.md#the-required-recovery-order)
- [Lesson 10 properties](../facilitator-solutions/property-checkpoints.md#lesson-10-prop-l10)

## Lesson checkpoint

Before recording L10_COMPLETE, require this observable evidence:

1. The saved trees exactly match `NODE-L10`, including HUD's
   `GameOverPanel → VBoxContainer → GameOverLabel, FinalScoreLabel,
   PlayAgainButton` order.
2. GameOverPanel has center anchors, offsets `(-140, -100, 140, 100)`, is
   hidden before a run and after reset, and has the exact required three texts.
3. The saved scripts compare with `SCRIPT-L10`: `GameHUD` declares and emits
   `play_again_requested`; Main has exactly `PLAYING` and `GAME_OVER`;
   `start_new_game()` clears every old child, clears `current_thing`, resets
   score/HUD/line/panel/input, stops the timer, and defers the spawn; and
   `explode()` uses the canonical scale, alpha, and `0.35` seconds.
4. The Node dock shows all four current connections: MatchLine crossing to
   Main, SpawnDelay timeout to Main, PlayAgainButton pressed to HUD, and HUD
   play-again request to Main.
5. Observed blue + SPAGHETTI and red + GUITAR mismatches each left the score
   unchanged, stopped later spawns, ignored Space, exploded before showing a
   final score panel, and had no red Output error.
6. Two consecutive observed Play Again presses each reset to `Score: 0`, blue,
   hidden panel, and exactly one direct FallingThings child.

**PASS:** Record L10_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing tree, property, script, connection,
mismatch, or restart observation. **DIAGNOSE:** Follow the named signal,
reset, mapping, or GDScript branch and repeat only its failed gate. Do not
claim a reset works after merely clicking the button once without the child
count and visible-state evidence.

## Explain it back

Ask the child: “What is different about `PLAYING` and `GAME_OVER`, and why
does the panel wait for `await thing.explode()`?” A good answer says PLAYING
allows input, scoring, and spawning; GAME_OVER locks the round; waiting lets
the one mismatch object finish before the final score covers it. Accept the
child's own wording.

## Safe experiment

After L10_COMPLETE is fully observed, an optional experiment may temporarily
change the Game Over label to another short phrase such as `Try again!`.
Record `GameOverLabel temporary text` in `experiment_to_revert`, make one
observed mismatch, then restore exactly `Game Over`, save, and confirm the
panel tree and reset matrix still pass. Do not change the two states, tween
duration, spawn guard, HUD signal, offsets, or reset behavior.

## If you stop here

Update the progress state with only observed facts. If L10_COMPLETE has not
passed, keep the current `L10.S##.G##` gate as `next_action` and record the
last panel tree, first red error, signal entry, mismatch observation, or child
count. If it has passed, record L10_COMPLETE, set `next_action` to Begin
L11.S01, and use this handoff format:

~~~text
SESSION_HANDOFF
checkpoint: L10_COMPLETE
next_action: Begin L11.S01
observed: blue + SPAGHETTI and red + GUITAR each ended the round without changing score
observed: each loss exploded before its final-score panel, ignored Space, and spawned no next object
observed: two Play Again cycles each restored Score: 0, blue, hidden panel, and one FallingThings child
experiment_to_revert: none
~~~

Do not claim the loss order, final score, input lock, absence of a later spawn,
or two clean restarts unless the learner supplied that exact evidence.

## Next lesson

Continue with Lesson 11 — Create and Import Artwork after the handoff says
L10_COMPLETE. Lesson 11 keeps this state and reset behavior unchanged while it
replaces the temporary ColoredRects with child-created guitar and spaghetti
art.
