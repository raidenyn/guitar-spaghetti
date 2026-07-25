# Exporting a Desktop Test Build

An export is a playable copy of *Guitar and Spaghetti* that runs outside the
Godot editor. This course exports one **debug test build** for the same desktop
operating system used to make the game. It does not cover store submission,
code signing, notarization, or public distribution.

Use the Godot **4.7.1** editor and matching 4.7.1 export templates. The
versioned official instructions are [exporting projects](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_projects.html), [exporting for macOS](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_macos.html), [exporting for Windows](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_windows.html), and [exporting for Linux](https://docs.godotengine.org/en/4.7/tutorials/export/exporting_for_linux.html).

## Before opening the Export menu

Do this preflight first:

1. Save every scene and script. The FileSystem dock should show the expected
   `scenes`, `scripts`, `art`, and `audio` resources, with no red errors in
   Output.
2. Run the game in the editor once. Fix the first red error before exporting;
   export is not a way to bypass an editor problem.
3. Make a backup copy of the project folder or use the agreed project backup
   method. Do not copy the generated `.godot` folder as a source of truth.
4. Choose an export destination outside imported game assets. In this course,
   use an `exports/` folder beside the project folder, not `res://art`,
   `res://audio`, or `.godot`. For example, if the project folder is
   `GuitarAndSpaghetti`, use a neighboring folder named `exports`.

An exported build must be tested after the editor build passes. A green editor
run is evidence for the editor only, not for the exported game.

## Install matching export templates

Godot needs export templates to make a playable desktop build. They must match
the running editor version.

1. In Godot, choose **Editor → Manage Export Templates**.
2. Confirm the editor is version 4.7.1, then use **Download and Install** or
   choose the matching 4.7.1 template package already obtained from the
   official Godot download page.
3. Wait for the manager to report the required desktop template as installed.
   If it reports a version mismatch, do not continue with a near-match: install
   the 4.7.1 templates for this editor instead.

If Godot says templates are missing, collect the exact message and use
[`SYM-EXPORT-01`](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing) before changing export settings.

## Add a preset for this computer

1. In the Godot editor, open **Project → Export…** (or the Export button).
2. Click **Add…** and select the desktop platform that matches the development
   computer: **macOS** for this primary workflow, **Windows Desktop** on
   Windows, or **Linux/X11** on Linux.
3. Leave ordinary resource options at their defaults for this course so the
   project resources, including art and audio, remain available. Do not choose
   *Export PCK/ZIP* for this test: it contains project data but is not a
   playable build by itself.
4. For a **macOS** preset, set **Application → Bundle Identifier** to a valid,
   unique identifier for this local test build, such as
   `com.example.guitarandspaghetti` (adapt it with the learner's own unique
   name if needed). This local identifier does not require an Apple Developer
   account, signing certificate, or any Apple signing setup.
5. Select the new preset and give it an export path in the outside `exports/`
   folder. Examples are `exports/GuitarAndSpaghetti.app` on macOS,
   `exports/GuitarAndSpaghetti.exe` on Windows, and
   `exports/GuitarAndSpaghetti.x86_64` on a typical 64-bit Linux computer.
6. Choose **Export Project**, select **Debug**, and wait for the completed
   build. Record the exact path you selected.

The preset records the build settings in the project. A future lesson can use
the same preset, but it must still rerun the exported-build check after game
changes.

## macOS: primary path

On the macOS computer used for this playbook, choose the **macOS** preset and
export to `exports/GuitarAndSpaghetti.app`. Double-click that `.app` bundle in
Finder to run the test build outside Godot. Godot's macOS templates create a
Universal 2 app that supports Intel and Apple Silicon Macs.

This is a local learning build. Do not set up an Apple Developer account, code
signing, notarization, a DMG, or store distribution for this course. macOS may
show a security warning for an unsigned app, especially after it has been
copied or downloaded. Ask the adult to read the warning and decide whether to
open the build they just made; do not bypass system security settings or run
unrelated terminal commands. If the app will not open, capture the exact
warning and return to the export recovery branch.

## Windows and Linux differences

These notes change the target preset, not the game's acceptance tests.

- **Windows:** choose **Windows Desktop** and normally keep the `x86_64`
  architecture for an ordinary modern Intel or AMD computer. Run the exported
  `.exe` from the chosen `exports/` location. Code signing is outside this
  course; record any Windows warning rather than installing signing tools.
- **Linux:** choose **Linux/X11** and normally keep `x86_64` for a typical
  modern Intel or AMD computer. Run the exported executable from the
  `exports/` location. If the file is not allowed to run, ask the adult for
  the exact permission message; do not change unrelated permissions. Linux
  architecture and desktop-environment differences are reasons to test on the
  intended Linux computer.
- **Cross-platform reminder:** build for the platform that will run the test.
  In particular, an `.app` exported on Windows can lack the executable
  permission required by macOS. For this course, export the macOS test build
  on macOS instead of trying to repair a cross-platform bundle.

## Compare editor and exported behavior

Run the exported game without the editor, then repeat the final acceptance
checks. Mark each row with what the learner actually observed.

| Case | Editor result | Exported result | PASS only when both match |
|---|---|---|---|
| New game | Score is `0`; line is blue | Score is `0`; line is blue | Yes / no |
| Toggle | One Space press makes blue red; a second makes red blue | Same | Yes / no |
| Correct mappings | Blue + guitar and red + spaghetti add exactly one point | Same | Yes / no |
| Mismatch mappings | Blue + spaghetti and red + guitar end the round once | Same | Yes / no |
| Locked game over | No extra spawn or line toggle after loss | Same | Yes / no |
| Restart | Play Again clears old objects, resets score and line, hides the panel, and starts one new round | Same | Yes / no |
| Assets | Both artworks and the named sounds load without errors | Same | Yes / no |

If any exported result differs, mark it `DIAGNOSE`, keep the evidence (first
error text, exact warning, or screenshot), and fix one supported difference
before re-exporting. Do not mark the course complete from editor-only evidence.

## Recovery branches

- [Export templates are missing or version-mismatched — `SYM-EXPORT-01`](../facilitator-solutions/troubleshooting-map.md#sym-export-01-export-template-missing)
- [Missing art or audio in the exported result — `SYM-ASSET-01`](../facilitator-solutions/troubleshooting-map.md#sym-asset-01-imported-art-is-missing-or-huge)
- [First export or run error](debugging.md#the-required-recovery-order)

## Related concepts

- [The meaning of export and export template](glossary.md#export)
- [Final game acceptance behavior](signals.md#check-the-visible-result)
- [Small, evidence-led debugging](debugging.md#debugging-one-small-problem-at-a-time)
