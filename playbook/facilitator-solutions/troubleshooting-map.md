# Troubleshooting Map

Choose a branch from the learner’s observable symptom. Ask the single evidence
request before suggesting the smallest fix. After the fix, always rerun the
same lesson step gate that originally failed.

## `SYM-NAME-01` — Wrong node capitalization

- **Symptom:** A node looks present, but a later script path or signal target
  behaves as though it is missing.
- **Evidence request:** Ask for the exact node names, including capitalization,
  copied from the Scene tree.
- **Smallest fix:** Rename only the differing node to the authoritative
  `NODE-Lxx` spelling; do not alter its type or parent.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-PATH-01` — Null node path

- **Symptom:** The first error says a cached node is `null`, or a `$Path`
  cannot be found.
- **Evidence request:** Ask for the first error’s full node path and a Scene
  tree screenshot with that path expanded.
- **Smallest fix:** Make the Scene tree’s exact case-sensitive parent/child path
  match the script path, changing only the segment that differs.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-GD-01` — First parse or indentation error

- **Symptom:** The script editor shows a red parse/indentation error and the
  game cannot start.
- **Evidence request:** Ask for the first red error’s exact text, line number,
  and that line with the line immediately above it.
- **Smallest fix:** Correct only the named spelling, punctuation, or indentation
  difference by comparing that small code group with the current `SCRIPT-Lxx`
  checkpoint.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-SIGNAL-01` — Expected callback never runs

- **Symptom:** The source event occurs, but the expected callback print or
  behavior never appears.
- **Evidence request:** Ask for one screenshot of the source node’s Signals
  dock showing the expected connection and receiver method.
- **Smallest fix:** Connect that one signal to the canonical receiver and exact
  callback name; remove no other connections.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-SHAPE-01` — Missing or disabled collision shape

- **Symptom:** An Area2D has a warning icon, or crossing detection never occurs.
- **Evidence request:** Ask for the selected `CollisionShape2D` Inspector
  showing its Shape resource, Disabled value, and rectangle size.
- **Smallest fix:** Assign or enable the one missing `RectangleShape2D` and set
  its canonical size from `PROP-L08`.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-LAYER-01` — Areas overlap but the signal does not fire

- **Symptom:** Visible/debug collision rectangles overlap, yet
  `area_entered` produces no callback.
- **Evidence request:** Ask for the collision layer and mask bit values of both
  `FallingThing` and `MatchLine` in one report.
- **Smallest fix:** Set `FallingThing` to layer/mask `1/0` and `MatchLine` to
  `2/1`, changing only values that differ.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-SCORE-01` — One object scores twice

- **Symptom:** One crossing increments the score by two or resolves twice.
- **Evidence request:** Ask for the complete current
  `_on_match_line_thing_crossed` function and the number of
  `thing_crossed` connections shown in the Signals dock.
- **Smallest fix:** Keep one connection and restore the identity/resolved guard
  plus `thing.resolved = true` before any score change.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-MAP-01` — Guitar/spaghetti color mapping reversed

- **Symptom:** Blue accepts spaghetti or red accepts guitar.
- **Evidence request:** Ask for the complete current `matches(kind)` function.
- **Smallest fix:** Restore only the mapping: blue with `GUITAR`, red with
  `SPAGHETTI`.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-RESET-01` — Old object remains after restart

- **Symptom:** A pre-loss object remains, or more than one object appears after
  Play Again.
- **Evidence request:** Ask for the complete current `start_new_game()` function
  and the `FallingThings` child count immediately after one restart.
- **Smallest fix:** Restore the loop that queues every `FallingThings` child for
  deletion, clear `current_thing`, stop the timer, and defer exactly one spawn.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-ASSET-01` — Imported art is missing or huge

- **Symptom:** The placeholder remains, the sprite is invisible, or the art is
  far larger than the object.
- **Evidence request:** Ask for the exact imported filename as shown in
  FileSystem and the selected `Sprite2D` Inspector during a running test.
- **Smallest fix:** Correct the one path/case or visibility difference, then
  restore the uniform longest-side scale calculation for a `96.0`-pixel box.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-AUDIO-01` — Stream is silent

- **Symptom:** A named game event occurs without its expected sound.
- **Evidence request:** Ask for the named `AudioStreamPlayer` Inspector showing
  Stream, Autoplay, Volume dB, and its playing state immediately after the
  event.
- **Smallest fix:** Assign the intended imported stream or correct the one
  muted/inaudible setting; keep Autoplay off and call `play()` only at the
  named event.
- **Recheck:** Rerun the original lesson step gate.

## `SYM-EXPORT-01` — Export template missing

- **Symptom:** Godot reports that templates are missing when adding or running
  an export preset.
- **Evidence request:** Ask for the exact export error text and the editor
  version shown in Help → About.
- **Smallest fix:** Install the standard export templates matching Godot 4.7.1,
  then reopen the desktop export preset.
- **Recheck:** Rerun the original lesson step gate.
