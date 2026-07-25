# Importing Artwork and Sound Assets

Lessons 11 and 12 replace the game's geometric placeholders with artwork and
sound made or chosen by the family. The mechanics, collision shapes, and names
of the game nodes stay the same. An asset is only a file Godot uses; it does
not change the game's matching rules.

For Godot 4.7 details, see [importing images](https://docs.godotengine.org/en/4.7/tutorials/assets_pipeline/importing_images.html) and [importing audio samples](https://docs.godotengine.org/en/4.7/tutorials/assets_pipeline/importing_audio_samples.html).

## Make two child-created picture files

The two falling things need art that is easy to tell apart at a glance. The
child may draw in a drawing app, draw on paper and photograph it, or arrange
simple original shapes. Do not download a copyrighted character, a logo, or an
image whose permission is unclear.

Prepare these exact final files:

| What it shows | Required project path |
|---|---|
| A guitar | `res://art/guitar.png` |
| Spaghetti | `res://art/spaghetti.png` |

Use lowercase names exactly as written. `Guitar.png`, `spaghetti.PNG`, and
`guitar (1).png` are different filenames on some computers and will not match
the lesson's `preload` paths.

Make the background **transparent** when the drawing app offers that option.
Transparent means the empty area around the picture lets the game background
show through; it is not a white-painted background. PNG is the required format
because it keeps that transparency. Aim for the longest side to be near 256
pixels. The picture may be wider or taller, and it does not need to be exactly
square. Keep an editable or full-size original outside the Godot project if
the child wants to revise it later.

## Put the pictures in the project and wait for import

1. In Godot's **FileSystem** dock, create an `art` folder at the project root
   if it is missing. Its path is `res://art`.
2. Copy the two final PNG files into that folder using Finder, File Explorer,
   or the file manager. Do not put them in the project's `.godot` folder;
   Godot owns that generated folder.
3. Return to Godot and wait for both files to appear in FileSystem. Godot
   imports project files automatically. Select each file and confirm that its
   preview is the expected drawing; the default import type is `Texture2D`.
4. Save the scene and run the Lesson 11 check for both kinds. The canonical
   script selects a texture, uses one scale value for both axes, and fits its
   longest side into a 96-pixel box. This preserves the drawing's aspect
   ratio, so do not squash it by setting different x and y scales in the
   `Sprite2D` Inspector.

The collision rectangle remains `(96, 64)` even if a drawing is narrow, tall,
or decorative. Artwork changes what the player sees; it does not change the
sensor that detects the crossing.

## Make or choose three short sounds

The safest choice is for the child and adult to record or make three short
original sounds: a switch, a success, and an explosion. A sound with a clear
reuse license is also acceptable. Never copy sound effects from a game, show,
video, or site unless its license specifically permits this use.

Use either WAV or OGG format. WAV is a simple choice for these short effects;
OGG is also supported. Keep one extension consistently for each intended
file, with these exact base names:

| Event | Required project filename | Later player node |
|---|---|---|
| Valid line switch | `res://audio/switch.wav` or `res://audio/switch.ogg` | `SwitchSound` |
| Correct match | `res://audio/success.wav` or `res://audio/success.ogg` | `SuccessSound` |
| Mismatch explosion | `res://audio/explosion.wav` or `res://audio/explosion.ogg` | `ExplosionSound` |

Create `res://audio` at the project root, copy the files into it, then wait
until each appears in FileSystem. Select a file and use its Import dock or
preview to confirm it is the intended sound before assigning its stream to the
matching `AudioStreamPlayer`. Keep Autoplay off: the lesson plays each sound
only when its named game event happens.

## Record source and license notes

Create `res://audio/SOURCES.md` alongside the audio files. This is a small
honesty record, not a legal test. For every sound, state whether it is original
or give the source, author/creator when known, license name or link, and the
date it was obtained. For example:

```text
# Sound sources

- switch.wav — recorded by Sam and Pat on 2026-07-25 — original work.
- success.ogg — "Small Bell" by Example Creator — CC0; source page saved
  with the project notes — obtained 2026-07-25.
- explosion.wav — created in our drawing-and-sound app — original work.
```

Do not invent a license note. If the source or permission cannot be confirmed,
choose or make a different sound. Keep the original downloaded page or source
file outside the project when practical.

## Asset check before moving on

Ask for these visible facts, not a guess that the files were copied:

1. FileSystem shows `guitar.png` and `spaghetti.png` under `res://art` with
   previews and the exact lowercase filenames.
2. Both kinds appear during the Lesson 11 run, are recognisable, and are not
   stretched.
3. FileSystem shows the three named audio files under `res://audio`, and
   `res://audio/SOURCES.md` identifies every source and license or says it is
   original.
4. During Lesson 12, one valid switch, one correct match, and one mismatch
   each play only their corresponding sound.

## Recovery branches

- [Imported art is missing, invisible, stretched, or huge — `SYM-ASSET-01`](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)
- [A named imported sound is silent — `SYM-AUDIO-01`](../facilitator-solutions/troubleshooting-map.md#sym-audio-01-stream-is-silent)
- [First red error or import message](debugging.md#the-required-recovery-order)

## Related concepts

- [Why art does not change collision detection](areas-and-collisions.md#collision-shapes-draw-the-invisible-sensor)
- [The final audio-player properties](../facilitator-solutions/property-checkpoints.md#lesson-12-prop-l12)
- [How the adult can keep creative choices child-led](parent-coach-notes.md#the-adults-useful-jobs)
