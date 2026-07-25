# Progress State Template

Copy this state into the session record before the first lesson and update it only from learner-observed evidence. Only observed facts may be recorded: do not infer completion, invent files, or add hidden reasoning.

```yaml
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[record at first session]"
current_lesson: "01"
current_step: "L01.S01"
last_exit_checkpoint: "START"
completed_checkpoints: []
verified_node_tree: "[none yet]"
verified_runtime_behavior: "[none yet]"
known_project_files: []
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L01.S01"
```

## Field meaning

- `playbook_version`: version of this playbook.
- `godot_version`: verified Godot version used by the learner.
- `development_os`: operating system observed in the first session.
- `current_lesson`: two-digit lesson number containing the next action.
- `current_step`: exact unfinished step identifier within the current lesson.
- `last_exit_checkpoint`: latest completed lesson checkpoint, beginning with `START`.
- `completed_checkpoints`: completed checkpoint IDs in order.
- `verified_node_tree`: exact observed relevant node-tree state.
- `verified_runtime_behavior`: exact observed run-time behavior.
- `known_project_files`: learner-observed project paths that exist.
- `approved_deviations`: deliberately approved deviations from the canonical path and their restoration status.
- `unresolved_error`: exact first error text that remains unresolved, or `[none]`.
- `experiment_to_revert`: optional experiment that must be restored before returning to the required path, or `[none]`.
- `next_action`: the single action the facilitator may begin after acknowledging the loaded checkpoint.

## SESSION_HANDOFF

At a pause or lesson boundary, emit this exact fenced `SESSION_HANDOFF` block. Keep all fields even when a value remains unchecked. Only observed facts may be recorded.

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[record at first session]"
current_lesson: "01"
current_step: "L01.S01"
last_exit_checkpoint: "START"
completed_checkpoints: []
verified_node_tree: "[none yet]"
verified_runtime_behavior: "[none yet]"
known_project_files: []
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L01.S01"
```

Save the updated block as the current progress state or paste it into the next chat. A facilitator resumes by acknowledging `last_exit_checkpoint`, checking the current lesson's entry evidence, and beginning only `next_action`.
