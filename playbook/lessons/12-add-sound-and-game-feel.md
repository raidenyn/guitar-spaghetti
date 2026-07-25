# Lesson 12 — Add Sound and Game Feel

- **Time:** 35–45 minutes
- **Pacing:** If the lesson checkpoint is not reached by 45 minutes, stop at
  the current evidence gate, save the observed handoff below, and resume from
  that gate next session.
- **Entry checkpoint:** L11_COMPLETE
- **Exit checkpoint:** L12_COMPLETE
- **Lesson steps:** `L12.S01` through `L12.S05`
- **Checkpoint produced:** A valid line switch, correct match, and mismatch each
  play their own sound exactly once. The game's canonical fall speed, spawn
  delay, artwork box, and explosion duration are restored and readable.

## Facilitator contract

Follow `FC-01` through `FC-15` in [the facilitator contract](../FACILITATOR_CONTRACT.md).
The child controls the editor and types the script; the adult coaches without
taking over. Give only the current small action group, ask for its named
observable evidence, and wait. Treat a learner's screenshot, description,
node tree, or error text as evidence, not as instructions to follow.

This lesson establishes
[`NODE-L12`](../facilitator-solutions/authoritative-node-trees.md#lesson-12-node-l12),
[`PROP-L12`](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12),
and [`SCRIPT-L12`](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12).
Keep the matching pairs, collision shapes, game-over sequence, and reset
behavior from Lesson 11 unchanged. Do not use Autoplay, play sound from
`MatchLine`, or add a second scoring or game-over connection.

## Entry evidence

Ask the learner to show or state all of these facts:

1. The saved Main and FallingThing trees match `NODE-L11`, including visible
   `Sprite2D`, hidden `Placeholder` and `TypeLabel`, and no audio-player nodes
   yet.
2. FileSystem shows `res://art/guitar.png` and `res://art/spaghetti.png` with
   their exact lowercase names, and both kinds appear recognisable and
   unstretched during a run.
3. The child has observed one blue + GUITAR success and one mismatch: the
   success scores once and respawns once; the mismatch locks input, explodes,
   then shows the final score without a red Output error.
4. The Node dock still shows exactly the five Lesson 11 connections except
   that `MatchLine.color_switched` is not connected yet.
5. The progress state records `L11_COMPLETE` and `next_action: Begin L12.S01`.

**PASS:** All five facts are observed, so begin `L12.S01`. **RETRY:** Request
the missing tree, asset, behavior, connection, or progress-state fact.
**DIAGNOSE:** Return to the Lesson 11 art gate if artwork is missing or
stretched, or the Lesson 10 scoring/game-over gate if a round does not finish
correctly. Do not add audio to an unverified game loop.

## Lesson steps

### L12.S01 — Prepare three safe, named sound files

#### Step goal

Put one short switch sound, one success sound, and one explosion sound where
Godot can import and inspect them.

#### Short explanation

Sound is feedback: it tells the player which game event just happened. The
safest sounds are ones the child and adult record or make themselves. A sound
from somewhere else needs a clear reuse license; an unknown game, video, or
website sound is not safe to copy.

#### Actions

##### Action group L12.S01.G01 — Choose the three sounds

1. With the child, make or choose three short, clearly different sounds: a
   switch, a success, and an explosion.
2. Use WAV or OGG for each file; keep the source file outside the Godot project
   if the child wants to edit it later.
3. Before copying anything, say which sound will mean each of the three events.

**Observable gate — `L12.S01.G01 sound plan`:** What three sounds did you
choose, and which one means switch, success, and explosion?

**PASS:** The learner names three distinguishable intended sounds; continue to
`L12.S01.G02`. **RETRY:** Ask for the missing event-to-sound choice.
**DIAGNOSE:** If a sound came from a game, show, video, or source with unclear
permission, choose a child-made sound or another source with a confirmed reuse
license before copying it.

##### Action group L12.S01.G02 — Copy and inspect the files

1. In FileSystem, create `audio` at the project root if it is missing.
2. Copy the three files into `res://audio` with exact base names `switch`,
   `success`, and `explosion`; use the WAV or OGG extension you chose.
3. Return to Godot, wait for import, then select each file and use its preview
   or Import dock to confirm it is the intended sound.

**Observable gate — `L12.S01.G02 imported audio`:** What exact three filenames
does FileSystem show under `res://audio`, and which sound does each preview
play?

**PASS:** The learner reports all three imported names and intended previews;
continue to `L12.S01.G03`. **RETRY:** Request the exact missing filename or
preview observation. **DIAGNOSE:** If a file does not appear, check only that
it is inside `res://audio`, has a `.wav` or `.ogg` extension, and Godot has
finished importing it; then repeat the gate.

##### Action group L12.S01.G03 — Record where the sounds came from

1. Create `res://audio/SOURCES.md`.
2. Add one line for each imported sound: say it is original, or record its
   creator, source, license, and date obtained.
3. Save it and show the three lines in FileSystem or the script editor.

**Observable gate — `L12.S01.G03 source notes`:** What does the source note
say for each of the three files?

**PASS:** The learner supplies an honest note for every file; continue to
`L12.S02`. **RETRY:** Request the missing file's note. **DIAGNOSE:** If a
license cannot be confirmed, replace only that sound with an original or
clearly licensed one and update its one source line.

#### Check your work

Ask: “Why do these sounds need different jobs instead of all playing whenever
something happens?” **PASS** requires the idea that each sound tells the
player about one specific event.

#### If it does not work

- **A sound file is not in FileSystem:** Check the exact `res://audio` folder
  and filename before changing an import option.
- **The preview is the wrong sound:** Rename or replace only that file, then
  wait for Godot to import it again.
- **The source is uncertain:** Do not guess at a license. Use a child-made
  sound or a source whose reuse permission is clear.

#### References

- [Make or choose three short sounds](../references/importing-assets.md#make-or-choose-three-short-sounds)
- [Record source and license notes](../references/importing-assets.md#record-source-and-license-notes)
- [A named imported sound is silent — `SYM-AUDIO-01`](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent)

### L12.S02 — Add the three sound players

#### Step goal

Give Main three named AudioStreamPlayers and assign the matching imported
stream to each one.

#### Short explanation

`Main` is where the game decides a score or game over, so it owns the players
that make those decisions audible. The player node holds a stream but does not
start it itself: Autoplay stays off until the correct event calls `play()`.

#### Actions

##### Action group L12.S02.G01 — Add the switch and success players

1. Select `Main` in `res://scenes/main.tscn` and add an `AudioStreamPlayer`
   child named exactly `SwitchSound`.
2. Add a second `AudioStreamPlayer` child named exactly `SuccessSound`.
3. Save, then show both names as direct children of Main.

**Observable gate — `L12.S02.G01 first audio nodes`:** What exact two new
node names and types appear directly below Main?

**PASS:** The learner reports `SwitchSound (AudioStreamPlayer)` and
`SuccessSound (AudioStreamPlayer)`; continue to `L12.S02.G02`. **RETRY:**
Request the missing exact name or type. **DIAGNOSE:** If a player is below
`FallingThings` or named with different capitals, reparent or rename only that
one player, then repeat this gate.

##### Action group L12.S02.G02 — Add and assign the explosion player

1. Add one `AudioStreamPlayer` child of Main named exactly `ExplosionSound`.
2. Select `SwitchSound` and assign `res://audio/switch.wav` or
   `res://audio/switch.ogg` to its Stream, matching the imported extension.
3. Select `SuccessSound` and assign the matching `success` stream.

**Observable gate — `L12.S02.G02 three player names and streams`:** What are
the three direct Main player names, and which file is assigned to SwitchSound
and SuccessSound?

**PASS:** The learner reports all three exact names and the two matching
streams; continue to `L12.S02.G03`. **RETRY:** Request the missing player or
stream fact. **DIAGNOSE:** If a Stream field is empty, drag only the matching
imported file from FileSystem to that player's Stream field, then repeat the
gate.

##### Action group L12.S02.G03 — Finish stream settings without startup sound

1. Select `ExplosionSound` and assign the matching `explosion` stream.
2. For each of the three players, make sure Autoplay is off.
3. Choose a comfortable non-clipping Volume dB for each player, save, and run
   the scene once without pressing Space or resolving an object.

**Observable gate — `L12.S02.G03 player settings`:** What stream, Autoplay
state, and Volume dB does the Inspector show for each player, and did the fresh
run begin silently?

**PASS:** All three streams are assigned, Autoplay is off, volumes are
comfortable, and the run begins silently; continue to `L12.S03`. **RETRY:**
Request the missing Inspector or fresh-run observation. **DIAGNOSE:** If a
sound starts immediately, turn off Autoplay on that one named player and rerun
the same fresh-start gate.

#### Check your work

Ask: “Why are these three players direct children of Main?” **PASS** requires
that Main decides which game event happened and can play the matching sound.

#### If it does not work

- **A stream is silent later:** Use `SYM-AUDIO-01` and ask for that named
  player's Stream, Autoplay, Volume dB, and playing state immediately after
  its event.
- **A sound plays at the beginning:** Find the one player with Autoplay on;
  turn off only that property.
- **The player is not found by a later `$` path:** Compare its visible name,
  including capitals, with `SwitchSound`, `SuccessSound`, or `ExplosionSound`.

#### References

- [Audio file names and players](../references/importing-assets.md#make-or-choose-three-short-sounds)
- [Lesson 12 properties](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12)
- [Lesson 12 Main tree](../facilitator-solutions/authoritative-node-trees.md#lesson-12-node-l12)

### L12.S03 — Play each sound at one named event

#### Step goal

Make Main play the switch sound after a valid toggle, the success sound after a
correct crossing, and the explosion sound once before the mismatch tween.

#### Short explanation

`MatchLine` reports that its color changed; it should not own an audio player.
Main already knows whether the round is playing, whether a crossing matched,
and when a mismatch begins. That lets the sound happen once in the same safe
place as each game decision.

#### Actions

##### Action group L12.S03.G01 — Let MatchLine announce a valid color switch

In `res://scripts/match_line.gd`, make these two local additions only. Add the
first line directly below `signal thing_crossed(thing: FallingThing)`. Add the
second line directly after `_apply_color()` in the valid input branch:

~~~gdscript
signal color_switched

        color_switched.emit()
~~~

Save and check for the first red error.

**Observable gate — `L12.S03.G01 color-switched signal`:** Is there a red
error? If yes, copy its first line and line number; if no, state that there is
no red error.

**PASS:** The learner observes no red error; continue to `L12.S03.G02`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If the signal emits before `_apply_color()` or outside the valid
input branch, move only the `color_switched.emit()` line directly after
`_apply_color()`, then repeat the gate.

##### Action group L12.S03.G02 — Give Main paths to the players

In `res://scripts/main.gd`, directly below the existing HUD onready line, add:

~~~gdscript
@onready var switch_sound: AudioStreamPlayer = $SwitchSound
@onready var success_sound: AudioStreamPlayer = $SuccessSound
@onready var explosion_sound: AudioStreamPlayer = $ExplosionSound
~~~

Save and check for the first red error.

**Observable gate — `L12.S03.G02 sound paths`:** Is there a red error? If yes,
copy its first line and line number; if no, state that there is no red error.

**PASS:** The learner observes no red error; continue to `L12.S03.G03`.
**RETRY:** Request the first red line or an explicit no-red-error observation.
**DIAGNOSE:** If a path is null, show the direct Main children and correct only
the path segment or visible player name that differs.

##### Action group L12.S03.G03 — Play success at the correct crossing

In `_on_match_line_thing_crossed`, add this one line directly after
`hud.set_score(score)` inside the matching branch:

~~~gdscript
        success_sound.play()
~~~

Save, then run one correct pair.

**Observable gate — `L12.S03.G03 success sound`:** On one blue + GUITAR or
red + SPAGHETTI crossing, did the score increase once, did SuccessSound play
once, and was there a red Output error?

**PASS:** The learner observes one point, one success sound, and no red error;
continue to `L12.S03.G04`. **RETRY:** Request the score, sound count, or first
red line. **DIAGNOSE:** If the sound plays on a mismatch, move only this line
back inside the matching branch after `hud.set_score(score)`.

##### Action group L12.S03.G04 — Play explosion before the tween

In `_finish_game`, add this one line directly after
`match_line.set_input_enabled(false)` and directly before `await thing.explode()`:

~~~gdscript
    explosion_sound.play()
~~~

Save, then run one mismatch.

**Observable gate — `L12.S03.G04 explosion sound`:** On one blue + SPAGHETTI
or red + GUITAR mismatch, did ExplosionSound play once before the object
finishes exploding and the final-score panel appears?

**PASS:** The learner observes exactly that order; continue to `L12.S03.G05`.
**RETRY:** Request the sound count and visible order. **DIAGNOSE:** If sound
comes after the panel, move only the line to immediately before
`await thing.explode()`. If it is silent, use `SYM-AUDIO-01` for
ExplosionSound.

##### Action group L12.S03.G05 — Connect and play the switch sound

1. Select `MatchLine`, open the Node dock, and connect `color_switched` to
   `Main`, accepting `Main._on_match_line_color_switched`.
2. In that callback, add this short guarded body:

~~~gdscript
func _on_match_line_color_switched() -> void:
    if state == GameState.PLAYING:
        switch_sound.play()
~~~

3. Save and press Space once while a round is playing.

**Observable gate — `L12.S03.G05 switch sound`:** What sender signal,
receiver, and callback does the Node dock show, and did one valid Space press
switch the line and play SwitchSound exactly once?

**PASS:** The learner reports `MatchLine.color_switched` to
`Main._on_match_line_color_switched` and one switch sound; continue to
`L12.S04`. **RETRY:** Request the connection facts and one-press observation.
**DIAGNOSE:** If two sounds play, inspect the Node dock for a duplicated
`color_switched` connection and remove only the extra one. If an invalid or
locked input plays sound, keep the exact `state == GameState.PLAYING` guard and
recheck `MatchLine` input is disabled after a mismatch.

#### Check your work

Ask: “Which script announces a color change, and which script chooses to play
the sound?” **PASS** requires MatchLine emits `color_switched`; Main plays a
sound only while the state is PLAYING.

#### If it does not work

- **A named event is silent:** Use
  [`SYM-AUDIO-01`](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent)
  and request the named player's Inspector immediately after that event.
- **Two sounds play for one event:** Check for one duplicate connection or a
  second local `play()` call; remove only the duplicate.
- **A switch sound plays while the game-over panel is visible:** Check the
  `state == GameState.PLAYING` guard and the existing input lock before changing
  any other code.

#### References

- [Custom signals and their owners](../references/signals.md#built-in-and-custom-signals)
- [Connect a signal in the editor](../references/signals.md#connect-a-signal-in-the-editor)
- [Lesson 12 complete scripts and connections](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12)

### L12.S04 — Prove the event and sound matrix

#### Step goal

Observe each sound once at its correct event and prove that locked input makes
no extra sound.

#### Short explanation

Listening is a real game test. We need to check both that a wanted sound plays
and that an unwanted sound does not play. One test at a time makes it clear
which event caused what we heard.

#### Actions

##### Action group L12.S04.G01 — Check the two positive events

1. Start a fresh game and press Space once while the round is playing.
2. Make one correct pair and wait for the next object.
3. Record how many switch and success sounds you heard, and the score change.

**Observable gate — `L12.S04.G01 switch and success`:** Did one valid press
make one SwitchSound, and did one correct object make one SuccessSound and add
exactly one point?

**PASS:** Both observations are exact; continue to `L12.S04.G02`. **RETRY:**
Request the missing count or score observation. **DIAGNOSE:** If a count is
two, use the duplicate-connection branch in `L12.S03`; if a count is zero, use
`SYM-AUDIO-01` for the named player.

##### Action group L12.S04.G02 — Check loss and locked input

1. Make one mismatch and wait for the explosion and final-score panel.
2. While that panel is visible, press Space once.
3. Record the explosion sound count and whether the locked Space press changed
   color or played any sound.

**Observable gate — `L12.S04.G02 mismatch and lock`:** Did one mismatch play
ExplosionSound once before the panel, and did Space after the lock make no
sound and no color change?

**PASS:** Both observations are exact; continue to `L12.S05`. **RETRY:** Ask
for the missing sound count or locked-input observation. **DIAGNOSE:** If a
locked press causes a sound, recheck only `match_line.set_input_enabled(false)`
in `_finish_game`, the input branch in MatchLine, and the callback's PLAYING
guard; then repeat this gate.

#### Check your work

Ask: “What test proved that silence is correct after game over?” **PASS**
requires the child to identify the locked Space press while the panel was
visible.

#### If it does not work

- **The sound is too quiet or clipped:** Change only that player's Volume dB,
  rerun its one event, and record the new comfortable value.
- **The wrong sound plays:** Compare that player's assigned stream with its
  exact `res://audio` filename before changing code.
- **No next object follows a success:** This is not an audio fix; return to
  the Lesson 10 success/spawn gate and preserve the single `success_sound.play()`
  line.

#### References

- [Asset check before moving on](../references/importing-assets.md#asset-check-before-moving-on)
- [Required final connections](../references/signals.md#the-five-required-connections)
- [Lesson 12 properties](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12)

### L12.S05 — Try one feel adjustment, then restore it

#### Step goal

Explore one small game-feel change without accidentally changing the required
checkpoint.

#### Short explanation

Speed, delay, object display size, and explosion time all change how fair a
game feels. Changing one at a time lets the child notice cause and effect. The
playbook's values are the shared checkpoint, so an experiment must be recorded
and restored unless the adult deliberately records an approved deviation.

#### Actions

##### Action group L12.S05.G01 — Pick one safe experiment

1. Choose exactly one value to try: fall speed, spawn delay, art box size, or
   explosion duration.
2. Record its original canonical value in `experiment_to_revert` before
   changing it: `180.0`, `0.5`, `96.0`, or `0.35` respectively.
3. Change only that one value, run one round, and describe what felt different.

**Observable gate — `L12.S05.G01 one-variable experiment`:** Which one value
changed, what was its original value, and what difference did you observe?

**PASS:** The learner identifies one changed value, its original value, and an
observation; continue to `L12.S05.G02`. **RETRY:** Request the missing value
or observation. **DIAGNOSE:** If more than one value changed, restore all but
one before repeating this gate.

##### Action group L12.S05.G02 — Restore the shared checkpoint

1. Restore the experimented value to its canonical value.
2. Save the scene or script that owns it.
3. Run one round and confirm the game still has one-object play, correct sound
events, and no red Output error.

**Observable gate — `L12.S05.G02 restored tuning`:** What canonical value is
now restored, and did the run still show one object, correct sound events, and
no red Output error?

**PASS:** The learner observes restoration and the clean run; continue to the
lesson checkpoint. **RETRY:** Request the missing restoration or run fact.
**DIAGNOSE:** If the value is not one of `180.0`, `0.5`, `96.0`, or `0.35`,
compare only the edited line or Inspector field with `PROP-L12` and restore
it. An adult-approved deviation must be written in the progress state rather
than silently replacing the checkpoint.

#### Check your work

Ask: “Why did we change only one value and then put it back?” **PASS**
requires the idea that one change makes its effect clear and restoration keeps
the shared game checkpoint consistent.

#### If it does not work

- **The game feels impossible after an experiment:** Restore the one recorded
  value before investigating any other setting.
- **The picture is stretched:** Restore the single uniform longest-side art
  scale for the `96.0` box; do not set separate x and y scales.
- **The explosion timing changed unexpectedly:** Restore only the `0.35`
  tween duration before rerunning the mismatch gate.

#### References

- [Lesson 12 properties](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12)
- [Artwork scaling and collision shape](../references/importing-assets.md#put-the-pictures-in-the-project-and-wait-for-import)
- [Lesson 12 complete scripts](../facilitator-solutions/script-checkpoints.md#lesson-12-script-l12)

## Lesson checkpoint

Before recording L12_COMPLETE, require this observable evidence:

1. The saved Main tree exactly matches `NODE-L12`, including direct Main
   children `SwitchSound`, `SuccessSound`, and `ExplosionSound`, each an
   `AudioStreamPlayer`.
2. Each player Inspector shows its intended imported stream, Autoplay off, and
   a comfortable non-clipping volume; `res://audio/SOURCES.md` honestly records
   an origin and license or original-work note for every sound.
3. The saved scripts compare with `SCRIPT-L12`: MatchLine declares and emits
   `color_switched` after a valid color application; Main has the three typed
   player paths, plays success after a correct score, plays explosion before
   the mismatch tween, and has the guarded switch callback.
4. The Node dock shows all five required connections, including exactly
   `MatchLine.color_switched -> Main._on_match_line_color_switched` once.
5. In one observed fresh round, one valid Space press played SwitchSound once;
   one correct object increased score once and played SuccessSound once; one
   mismatch played ExplosionSound once before the panel; and Space while input
   was locked made neither a sound nor a color change.
6. The canonical tuning is restored: fall speed `180.0`, SpawnDelay `0.5`, art
   box `96.0`, and explosion duration `0.35`; the final observation has no red
   Output error.

**PASS:** Record L12_COMPLETE only when every observation is supplied.
**RETRY:** Request the one missing tree, Inspector, source note, code,
connection, event-matrix, or tuning observation. **DIAGNOSE:** Use
`SYM-AUDIO-01` for silence, the duplicate-connection branch for doubled sound,
or the existing Lesson 10 gate for an input-lock or game-over failure. Do not
claim a sound event passed after hearing an unspecified sound.

## Explain it back

Ask the child: “Why does MatchLine send `color_switched`, but Main decides
whether to call `switch_sound.play()`?” A good answer says MatchLine reports
its own color change while Main knows whether the game is still PLAYING and
owns the sound player. Accept the child's own wording.

## Safe experiment

After L12_COMPLETE is fully observed, the child may try one of these at a
time: `fall_speed` `180.0` to `150.0`, SpawnDelay `0.5` to `0.75`,
`ART_BOX_SIZE` `96.0` to `80.0`, or the explosion tween duration `0.35` to
`0.5`. Record the exact field and temporary value in `experiment_to_revert`,
observe one round, then restore `180.0`, `0.5`, `96.0`, or `0.35` and rerun the
event/audio matrix. Do not change collision rectangles, matching pairs,
Autoplay, signal ownership, or more than one value at once.

## If you stop here

Update the progress state with only observed facts. If L12_COMPLETE has not
passed, keep the current `L12.S##.G##` gate as `next_action` and record the
last FileSystem names, player Inspector, first red error, Node-dock connection,
event count, or experiment restoration. If it has passed, record L12_COMPLETE,
set `next_action` to Begin L13.S01, and use this handoff format:

```SESSION_HANDOFF
playbook_version: "1.0"
godot_version: "4.7.1"
development_os: "[macOS, Windows, or Linux observed]"
current_lesson: "13"
current_step: "L13.S01"
last_exit_checkpoint: "L12_COMPLETE"
completed_checkpoints: ["L01_COMPLETE", "L02_COMPLETE", "L03_COMPLETE", "L04_COMPLETE", "L05_COMPLETE", "L06_COMPLETE", "L07_COMPLETE", "L08_COMPLETE", "L09_COMPLETE", "L10_COMPLETE", "L11_COMPLETE", "L12_COMPLETE"]
verified_node_tree: "Main matches NODE-L12, including SwitchSound, SuccessSound, and ExplosionSound as direct AudioStreamPlayer children with intended streams and Autoplay off; FallingThing retains its four canonical children."
verified_runtime_behavior: "One valid Space press, one correct match, and one mismatch each played its named sound exactly once; locked Space made no sound or color change. Fall speed 180.0, SpawnDelay 0.5, art box 96.0, and explosion duration 0.35 were restored, with no red Output error."
known_project_files: ["res://scenes/main.tscn", "res://scenes/falling_thing.tscn", "res://scripts/match_line.gd", "res://scripts/falling_thing.gd", "res://scripts/main.gd", "res://scripts/hud.gd", "res://art/guitar.png", "res://art/spaghetti.png", "res://audio/SOURCES.md"]
approved_deviations: []
unresolved_error: "[none]"
experiment_to_revert: "[none]"
next_action: "Begin L13.S01"
```

Do not claim the sound count, event order, input lock, source note, or restored
tuning unless the learner supplied that exact observation.

## Next lesson

Continue with Lesson 13 — Test and Export after the handoff says L12_COMPLETE.
Lesson 13 uses this complete game to collect final evidence, resolve only
observed problems, and create a desktop export.
