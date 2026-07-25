# Input Actions

An input action is a game command with a name. This game has one named action:
`switch_line`. It means “ask the line to switch colours.” The current lesson
supplies the small action group; this reference explains why and where.

For the full Godot reference, see [InputEvent](https://docs.godotengine.org/en/4.7/classes/class_inputevent.html) and [InputMap](https://docs.godotengine.org/en/4.7/classes/class_inputmap.html).

## Create `switch_line` in Godot 4.7

1. In the editor menu, open **Project** then **Project Settings**.
2. Choose the **Input Map** tab.
3. In **Add New Action**, type the exact name `switch_line`, then choose
   **Add**.
4. Find `switch_line` in the action list and use its add-event control. In the
   event dialog, select or enable **Physical Keycode**, press Space, and
   confirm the event.
5. Close Project Settings and save the project when the lesson asks.

The action must be spelled `switch_line`, with the underscore and lower-case
letters. Its canonical binding is the physical Space key. See
[`PROP-L04`](../facilitator-solutions/property-checkpoints.md#lesson-04-prop-l04)
when comparing what is visible in Input Map: the event must visibly read
**Physical Space**.

## Read the named action in code

`MatchLine` receives an input event and asks whether that event pressed the
named action:

```gdscript
if input_enabled and event.is_action_pressed("switch_line"):
    # Switch the line colour here.
```

This is part of the complete Lesson 04 code in
[`SCRIPT-L04`](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04).
The `input_enabled` check lets later lessons turn off colour switching after
game over without deleting the action.

## Why use a name instead of checking Space directly?

The game asks “did the player use `switch_line`?” rather than “did they press
this particular key?” The Input Map keeps the game idea separate from the
keyboard choice. Later, the same action could be bound to another keyboard
key or a controller button without rewriting the line's game logic. For this
course, keep the required Space binding; changing it is an optional experiment
that must be reverted before the checkpoint.

## Check the visible result

At the Lesson 04 gate, pressing Space changes `MatchLine/Visual` from blue to
red or red to blue. If nothing changes, first verify the exact `switch_line`
entry and its Space binding in Input Map, then use the lesson's named recovery
path.

## Related concepts

- [Event callbacks and `if`](gdscript-mini-reference.md#callback)
- [Line script checkpoints](../facilitator-solutions/script-checkpoints.md#lesson-04-script-l04)
- [Final audio response to `color_switched`](signals.md#the-five-required-connections)
