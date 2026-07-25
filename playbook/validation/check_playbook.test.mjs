import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { validatePlaybook } from "./check_playbook.mjs";

const LESSONS = [
  "01-install-and-create.md",
  "02-meet-the-editor.md",
  "03-build-the-screen.md",
  "04-make-the-line-interactive.md",
  "05-create-a-falling-thing.md",
  "06-create-guitars-and-spaghetti.md",
  "07-spawn-objects-randomly.md",
  "08-detect-the-crossing.md",
  "09-match-and-score.md",
  "10-lose-and-restart.md",
  "11-create-and-import-artwork.md",
  "12-add-sound-and-game-feel.md",
  "13-test-and-export.md",
];

const OTHER_FILES = [
  "START_HERE.md",
  "FACILITATOR_CONTRACT.md",
  "PROGRESS_STATE.template.md",
  "references/editor-map.md",
  "references/nodes-scenes-and-instances.md",
  "references/gdscript-mini-reference.md",
  "references/coordinates-movement-and-delta.md",
  "references/input-actions.md",
  "references/timers-and-randomness.md",
  "references/signals.md",
  "references/areas-and-collisions.md",
  "references/user-interface.md",
  "references/debugging.md",
  "references/importing-assets.md",
  "references/exporting.md",
  "references/parent-coach-notes.md",
  "references/glossary.md",
  "facilitator-solutions/authoritative-node-trees.md",
  "facilitator-solutions/property-checkpoints.md",
  "facilitator-solutions/script-checkpoints.md",
  "facilitator-solutions/troubleshooting-map.md",
  "validation/check_playbook.mjs",
  "validation/check_playbook.test.mjs",
  "validation/requirements-checklist.md",
  "validation/link-manifest.md",
  "validation/model-simulation-scenarios.md",
];

const REQUIRED_LESSON_HEADINGS = [
  "Facilitator contract",
  "Entry evidence",
  "Lesson steps",
  "Lesson checkpoint",
  "Explain it back",
  "Safe experiment",
  "If you stop here",
  "Next lesson",
];

const REQUIRED_STEP_HEADINGS = [
  "Step goal",
  "Short explanation",
  "Actions",
  "Check your work",
  "If it does not work",
  "References",
];

const UNFINISHED_MARKERS = [
  "T" + "BD",
  "T" + "ODO",
  "FIX" + "ME",
  "X" + "XX",
  "implement" + " later",
];

async function makeFixture(t) {
  const root = await mkdtemp(join(tmpdir(), "playbook-validator-"));
  t.after(() => rm(root, { force: true, recursive: true }));

  await Promise.all(OTHER_FILES.map((file) => writeFixtureFile(root, file, "")));
  await writeFixtureFile(root, "references/editor-map.md", "## Editor map\n");

  await Promise.all(LESSONS.map((lesson, index) => writeFixtureFile(
    root,
    `lessons/${lesson}`,
    completeLesson(index + 1),
  )));
  return root;
}

function completeLesson(number) {
  const entry = number === 1 ? "START" : `L${String(number - 1).padStart(2, "0")}_COMPLETE`;
  const exit = `L${String(number).padStart(2, "0")}_COMPLETE`;
  const sections = REQUIRED_LESSON_HEADINGS.map((heading) => `## ${heading}\n`);
  const stepSections = REQUIRED_STEP_HEADINGS.map((heading) => `#### ${heading}\n`);
  const firstLessonLink = number === 1
    ? "[Editor map](../references/editor-map.md#editor-map)\n"
    : "";
  return [
    `# Lesson ${number}\n`,
    ...sections.slice(0, 1),
    `- **Entry checkpoint:** ${entry}\n`,
    `- **Exit checkpoint:** ${exit}\n`,
    ...sections.slice(1, 3),
    ...stepSections,
    firstLessonLink,
    ...sections.slice(3),
  ].join("\n");
}

async function writeFixtureFile(root, relativePath, content) {
  const path = join(root, relativePath);
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, content);
}

async function replaceIn(root, relativePath, from, to) {
  const path = join(root, relativePath);
  const content = await readFile(path, "utf8");
  assert.ok(content.includes(from), `fixture text not found: ${from}`);
  await writeFile(path, content.replace(from, to));
}

async function issuesFor(root) {
  return validatePlaybook(root);
}

test("accepts a structurally complete playbook", async (t) => {
  const root = await makeFixture(t);
  assert.deepEqual(await validatePlaybook(root), []);
});

test("rejects a missing required file", async (t) => {
  const root = await makeFixture(t);
  await rm(join(root, "references", "debugging.md"));
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "MISSING_FILE"));
});

test("rejects a lesson without entry evidence", async (t) => {
  const root = await makeFixture(t);
  await replaceIn(root, "lessons/01-install-and-create.md", "## Entry evidence\n", "");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "LESSON_SCHEMA"));
});

test("rejects a broken relative link", async (t) => {
  const root = await makeFixture(t);
  await replaceIn(root, "lessons/01-install-and-create.md",
    "../references/editor-map.md#editor-map",
    "../references/missing.md#editor-map");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "BROKEN_LINK"));
});

test("rejects a missing relative-link anchor", async (t) => {
  const root = await makeFixture(t);
  await replaceIn(root, "lessons/01-install-and-create.md",
    "../references/editor-map.md#editor-map",
    "../references/editor-map.md#missing-anchor");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "BROKEN_LINK"));
});

test("ignores a link-shaped inline-code example", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md",
    "## Editor map\n\nType `[sample](missing.md)` as an example.\n");
  assert.deepEqual(await validatePlaybook(root), []);
});

test("ignores a link-shaped fenced-code example", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "",
    "```markdown",
    "[sample](missing.md)",
    "```",
    "",
  ].join("\n"));
  assert.deepEqual(await validatePlaybook(root), []);
});

test("keeps code examples after a fence-like line with trailing text ignored", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "",
    "```markdown",
    "```not-a-close",
    "[sample](missing.md)",
    "```",
    "",
  ].join("\n"));
  assert.deepEqual(await validatePlaybook(root), []);
});

test("recognizes a closing fence longer than its opening fence", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "",
    "```markdown",
    "[code sample](ignored.md)",
    "````",
    "[outside link](missing.md)",
    "",
  ].join("\n"));
  assert.deepEqual(await validatePlaybook(root), [{
    code: "BROKEN_LINK",
    path: "references/editor-map.md",
    message: "Link target does not exist: missing.md",
  }]);
});

test("does not close a fenced block with a shorter fence", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "",
    "````markdown",
    "[first code sample](ignored.md)",
    "```",
    "[second code sample](also-ignored.md)",
    "````",
    "",
  ].join("\n"));
  assert.deepEqual(await validatePlaybook(root), []);
});

test("preserves tilde fenced-code support", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "",
    "~~~markdown",
    "[sample](missing.md)",
    "~~~",
    "",
  ].join("\n"));
  assert.deepEqual(await validatePlaybook(root), []);
});

test("rejects an unfinished marker", async (t) => {
  const root = await makeFixture(t);
  const marker = "T" + "BD";
  await writeFixtureFile(root, "START_HERE.md", marker);
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "PLACEHOLDER"));
});

test("allows bracketed progress-state placeholders", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "PROGRESS_STATE.template.md",
    UNFINISHED_MARKERS.map((marker) => `[${marker}]`).join(" "));
  assert.deepEqual(await validatePlaybook(root), []);
});

test("rejects an unbracketed progress-state placeholder", async (t) => {
  const root = await makeFixture(t);
  const marker = "T" + "BD";
  await writeFixtureFile(root, "PROGRESS_STATE.template.md", `[captured] ${marker} [other]`);
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "PLACEHOLDER"));
});

test("rejects the latest Godot documentation URL", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md",
    "https://docs.godotengine.org/en/latest/tutorials/\n");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "DOC_VERSION"));
});

test("rejects a broken checkpoint chain", async (t) => {
  const root = await makeFixture(t);
  await replaceIn(root, "lessons/02-meet-the-editor.md",
    "- **Entry checkpoint:** L01_COMPLETE",
    "- **Entry checkpoint:** START");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "CHECKPOINT_CHAIN"));
});

test("rejects an empty heading", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", "## \n");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "PLACEHOLDER"));
});

test("disambiguates repeated headings like GitHub before validating anchors", async (t) => {
  const root = await makeFixture(t);
  await writeFixtureFile(root, "references/editor-map.md", [
    "## Editor map",
    "## Repeat",
    "## Repeat",
    "## Repeat",
    "",
  ].join("\n"));

  await replaceIn(root, "lessons/01-install-and-create.md",
    "../references/editor-map.md#editor-map",
    "../references/editor-map.md#repeat-2");
  assert.deepEqual(await issuesFor(root), []);

  await replaceIn(root, "lessons/01-install-and-create.md",
    "../references/editor-map.md#repeat-2",
    "../references/editor-map.md#repeat-3");
  assert.ok((await issuesFor(root)).some((issue) => issue.code === "BROKEN_LINK"));
});
