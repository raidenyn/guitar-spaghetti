# Debugging One Small Problem at a Time

Debugging means using evidence to find one small difference between the game
you expected and the game Godot actually ran. It is not guessing, replacing a
whole script, or changing several settings in hope that one works.

For the official Godot overview, see [debugging tools](https://docs.godotengine.org/en/4.7/tutorials/scripting/debug/overview_of_debugging_tools.html).

## The required recovery order

When a lesson gate fails, follow this order exactly. Stop as soon as the
evidence identifies the next small correction.

1. **First red error:** Run the same scene or project again and read the first
   red error, including its line number. Earlier errors often cause later
   messages, so do not start with the last one.
2. **Spelling, case, and indentation:** Compare the named word, node path,
   punctuation, and leading spaces with the current checkpoint. Godot treats
   `MatchLine` and `matchline` as different names.
3. **Node tree:** Compare the visible parent/child tree, node types, and script
   attachments with the authoritative tree for the current lesson.
4. **Saved resources:** Save the scene and script. Confirm that the expected
   `.tscn` and `.gd` files are in `res://` and that no unsaved-change marker
   remains.
5. **Previous checkpoint:** If the current setup is too unclear to compare,
   restore only the last verified checkpoint before trying the current small
   action group again.
6. **One change:** Make one correction that the evidence supports. Do not also
   rewrite code, rename several nodes, and change collision layers.
7. **Rerun the gate:** Run the exact same visible check from the lesson. Only
   `PASS` advances; `RETRY` asks for clearer evidence; `DIAGNOSE` follows one
   symptom-specific branch.

This order helps the child learn that an error is a useful clue, not a reason
to start over.

## Output and Debugger have different jobs

**Output** is the bottom-panel message list. Use it first after a run to find
printed messages, warnings, and the first red script error. Copy the exact
first red text rather than summarizing it as “it is broken.”

**Debugger** is also in the bottom panel. It organizes runtime errors,
breakpoints, stack details, and other information while a project runs. Open
it when the game starts but an expected event, collision, or callback appears
to be missing. It can add context after Output identifies the first problem;
it is not a reason to skip the first-red-error check.

The [editor map](editor-map.md#output) shows where both panels are found.

## What evidence to request

Ask for exact text when the problem is a red error, a node path, a callback
name, or a filename. Exact capitalization and punctuation matter, and text is
faster to compare than a description.

Ask for one screenshot when the evidence is visual: the Scene tree with the
relevant branch open, an Inspector section with a selected property, a Signals
dock connection, or the visible game result. Ask for a screenshot that shows
the requested evidence rather than a full desktop image. If a screenshot is
not possible, request the exact visible node names and values instead.

Useful evidence requests include:

- “Copy the first red error, its line number, and the line above it.”
- “Show the Scene tree with `MatchLine` and its two children expanded.”
- “Show the `CollisionShape2D` Inspector with Shape, Disabled, and Size.”
- “Show the sender's Signals dock with the receiver and callback name.”

## Keep a recovery small

Use the current lesson, property checkpoint, and script checkpoint to compare
only the part named by the evidence. After that one change, save, rerun the
same gate, and record only what was observed in the session handoff. The
facilitator does not edit, generate, or replace the learner's project.

Warnings are not automatically errors. For example, a yellow
`CollisionShape2D` warning is a reason to inspect its Shape resource; a red
parse error prevents the script from running. Read the message before choosing
a branch.

## Symptom routing

The troubleshooting map owns the exact evidence request, smallest fix, and
recheck. Follow one matching link rather than combining several repairs.

- [Wrong node capitalization — `SYM-NAME-01`](../facilitator-solutions/troubleshooting-map.md#sym-name-01-wrong-node-capitalization)
- [Null node path — `SYM-PATH-01`](../facilitator-solutions/troubleshooting-map.md#sym-path-01-null-node-path)
- [First parse or indentation error — `SYM-GD-01`](../facilitator-solutions/troubleshooting-map.md#sym-gd-01-first-parse-or-indentation-error)
- [Expected callback never runs — `SYM-SIGNAL-01`](../facilitator-solutions/troubleshooting-map.md#sym-signal-01-expected-callback-never-runs)
- [Missing or disabled collision shape — `SYM-SHAPE-01`](../facilitator-solutions/troubleshooting-map.md#sym-shape-01-missing-or-disabled-collision-shape)
- [Areas overlap but the signal does not fire — `SYM-LAYER-01`](../facilitator-solutions/troubleshooting-map.md#sym-layer-01-areas-overlap-but-the-signal-does-not-fire)
- [One object scores twice — `SYM-SCORE-01`](../facilitator-solutions/troubleshooting-map.md#sym-score-01-one-object-scores-twice)
- [Guitar/spaghetti color mapping reversed — `SYM-MAP-01`](../facilitator-solutions/troubleshooting-map.md#sym-map-01-guitarspaghetti-color-mapping-reversed)
- [Old object remains after restart — `SYM-RESET-01`](../facilitator-solutions/troubleshooting-map.md#sym-reset-01-old-object-remains-after-restart)
- [Imported art is missing or huge — `SYM-ASSET-01`](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)
- [A named stream is silent — `SYM-AUDIO-01`](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent)
- [Export template missing — `SYM-EXPORT-01`](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing)

## Related concepts

- [GDScript syntax and indentation](gdscript-mini-reference.md#indentation)
- [Collision evidence](areas-and-collisions.md#crossing-checklist)
- [Signals and visible connection checks](signals.md#connect-a-signal-in-the-editor)
