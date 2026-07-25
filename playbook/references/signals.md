# Signals

A signal is a message that says “something happened.” The node that sends the
message is the **sender**; the node whose callback reacts is the **receiver**.
Signals let the line, timer, HUD, and main game controller cooperate without
one node needing to control every detail.

For the official explanation, see Godot's [signals tutorial](https://docs.godotengine.org/en/4.7/getting_started/step_by_step/signals.html).

## Built-in and custom signals

Godot nodes already have useful built-in signals. For example, `SpawnDelay`
sends `timeout`, an `Area2D` sends `area_entered`, and a button sends `pressed`.

This game also defines custom signals when a game-specific event deserves a
clear name:

```gdscript
signal thing_crossed(thing: FallingThing)
signal color_switched
signal play_again_requested
```

The sender declares a custom signal with `signal`, then sends it with `.emit()`:

```gdscript
thing_crossed.emit(thing)
color_switched.emit()
play_again_requested.emit()
```

The first custom signal carries the falling object as useful information. The
other two merely announce that the event happened. Complete versions appear in
the [canonical script checkpoints](../facilitator-solutions/script-checkpoints.md).

## Connect a signal in the editor

For each connection the lesson asks for:

1. Select the sender node in the Scene tree.
2. Open the **Node** dock beside the Inspector and select the named signal.
3. Choose **Connect**, select the receiver node in the dialog, and confirm the
   exact callback name shown in the connection dialog.

Godot adds a callback stub to the receiver's attached script when appropriate.
Keep the canonical callback name rather than inventing a different one. After
connecting, a connection icon appears beside the sender in the Scene tree;
selecting the signal in the Node dock also lists its receiver. Use one of those
visible checks at the lesson gate.

## The five required connections

These are the complete final connections in Lesson 12. Their exact names,
capital letters, and receiver paths matter.

| Sender signal | Receiver callback | Why it exists |
|---|---|---|
| `MatchLine.thing_crossed` | `Main._on_match_line_thing_crossed` | Main decides match, score, or game over. |
| `MatchLine.color_switched` | `Main._on_match_line_color_switched` | Main plays the switch sound while playing. |
| `SpawnDelay.timeout` | `Main._on_spawn_delay_timeout` | Main spawns the next object after `0.5` seconds. |
| `HUD.play_again_requested` | `Main._on_hud_play_again_requested` | Main resets the game after the HUD asks. |
| `PlayAgainButton.pressed` | `HUD._on_play_again_button_pressed` | HUD turns the button press into its custom request. |

The first two connections use `MatchLine` as sender. The third uses the
`SpawnDelay` timer. The last two keep the HUD responsible for its button while
letting `Main` own overall game state. Compare the final list with
[`SCRIPT-L12`](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12).

## Callback naming convention

Godot's generated callback convention is
`_on_<sender_name>_<signal_name>`. The exact callbacks used here are:

```gdscript
func _on_match_line_thing_crossed(thing: FallingThing) -> void:
    pass

func _on_match_line_color_switched() -> void:
    pass

func _on_spawn_delay_timeout() -> void:
    pass

func _on_hud_play_again_requested() -> void:
    pass

func _on_play_again_button_pressed() -> void:
    pass
```

`pass` above means “leave this short example empty.” Learners should use the
complete checkpoint code rather than replacing a current script with this
example. Godot needs the callback spelling to match the connection.

## Check the visible result

At each signal lesson, verify one visible connection icon or Node-dock receiver
entry and then run the stated behavior gate. If the code runs but a message
seems absent, report the first Output or Debugger message and check the sender,
signal name, receiver, and callback spelling in that order.

## Related concepts

- [Callbacks and signal syntax](gdscript-mini-reference.md#signals)
- [Timer timing](timers-and-randomness.md#spawndelay-waits-then-announces-timeout)
- [Collision message source](../facilitator-solutions/script-checkpoints.md#lesson-08-script-l08)
