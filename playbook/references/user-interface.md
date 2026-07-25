# User Interface and the HUD

The HUD is the part of the game that talks to the player: the live score and,
later, the game-over panel. It needs to stay in the same screen location even
while `FallingThing` nodes move down the playfield.

For official Godot details, see [CanvasLayer](https://docs.godotengine.org/en/4.7/classes/class_canvaslayer.html), [Control](https://docs.godotengine.org/en/4.7/classes/class_control.html), and [using containers](https://docs.godotengine.org/en/4.7/tutorials/ui/gui_containers.html).

## `CanvasLayer` keeps the HUD on the screen

`Main`, `MatchLine`, and each `FallingThing` are game-world nodes. Their
positions describe places in the 480 by 720 playfield. `HUD` is a
`CanvasLayer`, which draws its child interface above that world layer. It does
not travel with a falling object, so `ScoreLabel` stays at the top-left while
objects move underneath it.

Use one `HUD (CanvasLayer)` for every interface item in this game. Its
`hud.gd` script accepts values from `Main` and displays them; it does not own
the score or decide whether the round is over. The complete interface script
is in [`SCRIPT-L10`](../facilitator-solutions/script-checkpoints.md#lesson-10-script-l10).

## `Control` nodes make rectangles and text

`Control` is Godot's base node type for user-interface rectangles. A Control
node uses anchors and offsets to describe where it belongs in its parent
rectangle.

- `Label` is a Control that displays text. `ScoreLabel` shows `Score: 0` at
  the beginning of a game.
- `PanelContainer` is a Control with a panel background that also arranges one
  child inside its padded content area.
- `VBoxContainer` is a vertical box: it stacks its children from top to bottom
  and handles their vertical arrangement for us.
- `Button` is a Control the player can press. The HUD turns its `pressed`
  event into the `play_again_requested` signal for `Main`.

Do not manually position each label inside the vertical box. The
`VBoxContainer` owns that layout. Give it the three children in the exact
order shown below.

## Final HUD tree

This is the required HUD subtree after Lesson 10 and for the final game:

```text
HUD (CanvasLayer) [hud.gd]
├── ScoreLabel (Label)
└── GameOverPanel (PanelContainer)
    └── VBoxContainer
        ├── GameOverLabel (Label)
        ├── FinalScoreLabel (Label)
        └── PlayAgainButton (Button)
```

`GameOverPanel` is hidden before a game starts and after a reset. At game over,
`GameHUD.show_game_over(final_score)` fills in `FinalScoreLabel` and shows the
panel. Pressing `PlayAgainButton` makes the HUD ask `Main` to reset through a
signal; it does not reset game state directly. See [the required signal
connections](signals.md#the-five-required-connections).

## Exact layout values

The game uses a `480 × 720` portrait viewport. Set the values below exactly;
they are the visible layout checkpoint rather than suggestions for a different
screen size.

| Node | Exact value |
|---|---|
| `ScoreLabel` | Position `(16, 16)`; starting text `Score: 0` |
| `GameOverPanel` | Center anchor preset |
| `GameOverPanel` offsets | Left `-140`, top `-100`, right `140`, bottom `100` |
| `GameOverLabel` | Text `Game Over` |
| `FinalScoreLabel` | Initial text may be `Final score: 0`; the HUD updates its number at game over |
| `PlayAgainButton` | Text `Play Again` |

An **anchor** says which point or edge of the parent the Control follows. The
center anchor preset makes all four panel edges measure from the middle of the
viewport. Its offsets then make the panel 280 pixels wide (`140 - -140`) and
200 pixels high (`100 - -100`), centered over the playfield.

## UI setup checks

Use these checks before passing a HUD-related gate:

1. `HUD` is a `CanvasLayer`, not a child of `FallingThings` or `MatchLine`.
2. `ScoreLabel` is a direct child of `HUD` at `(16, 16)` and stays visible
   while a thing falls.
3. `GameOverPanel` has the exact nested `VBoxContainer` tree and the center
   anchors and offsets above.
4. The panel starts hidden, shows a final score only after a mismatch, and
   becomes hidden again after Play Again.
5. The button connection asks the HUD to emit its signal; `Main` owns the
   actual reset.

## Recovery branches

Use the matching branch after requesting its named evidence. Keep UI concepts
here and let the troubleshooting map select the smallest repair.

- [A script path cannot find a HUD child — `SYM-PATH-01`](../facilitator-solutions/troubleshooting-map.md#sym-path-01-null-node-path)
- [A HUD node has the wrong capitalization — `SYM-NAME-01`](../facilitator-solutions/troubleshooting-map.md#sym-name-01-wrong-node-capitalization)
- [The Play Again press does not reach its callback — `SYM-SIGNAL-01`](../facilitator-solutions/troubleshooting-map.md#sym-signal-01-expected-callback-never-runs)
- [An old object remains or two objects appear after Play Again — `SYM-RESET-01`](../facilitator-solutions/troubleshooting-map.md#sym-reset-01-old-object-remains-after-restart)

## Related concepts

- [Node parenting and paths](nodes-scenes-and-instances.md#scene-tree)
- [Final HUD properties](../facilitator-solutions/property-checkpoints.md#lesson-10-prop-l10)
- [Final authoritative HUD tree](../facilitator-solutions/authoritative-node-trees.md#lesson-10-node-l10)
