import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const LESSON_FILES = [
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

const REQUIRED_FILES = [
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
  "## Facilitator contract",
  "## Entry evidence",
  "## Lesson steps",
  "## Lesson checkpoint",
  "## Explain it back",
  "## Safe experiment",
  "## If you stop here",
  "## Next lesson",
];

const REQUIRED_STEP_HEADINGS = [
  "#### Step goal",
  "#### Short explanation",
  "#### Actions",
  "#### Check your work",
  "#### If it does not work",
  "#### References",
];

const UNFINISHED_MARKERS = [
  "T" + "BD",
  "T" + "ODO",
  "FIX" + "ME",
  "X" + "XX",
  "implement" + " later",
];

const DOCUMENTATION_LATEST_URL = "docs.godotengine.org/en/latest/";

function issue(code, path, message) {
  return { code, path, message };
}

function lessonPath(filename) {
  return `lessons/${filename}`;
}

function checkpointFor(number) {
  return `L${String(number).padStart(2, "0")}_COMPLETE`;
}

function headingsIn(content) {
  const headings = [];
  for (const line of content.split(/\r?\n/)) {
    const match = /^(#{1,6})(?:[ \t]+(.*))?$/.exec(line);
    if (match) headings.push({ line, text: (match[2] ?? "").trim() });
  }
  return headings;
}

function anchorFor(heading) {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_-]/gu, "")
    .replace(/\s+/g, "-");
}

/**
 * GitHub disambiguates repeated headings by appending -1, -2, ... in document
 * order. A plain Set of anchorFor(text) would collapse every "Actions" or
 * "Check your work" heading in a lesson into one slug, certifying links that
 * GitHub actually resolves to the first occurrence only (or not at all).
 */
function anchorsIn(content) {
  const seenCounts = new Map();
  const anchors = [];
  for (const { text } of headingsIn(content)) {
    const base = anchorFor(text);
    const priorCount = seenCounts.get(base) ?? 0;
    seenCounts.set(base, priorCount + 1);
    anchors.push(priorCount === 0 ? base : `${base}-${priorCount}`);
  }
  return anchors;
}

function progressMarkerIsBracketed(content, markerIndex, marker) {
  const lineStart = content.lastIndexOf("\n", markerIndex) + 1;
  const lineEnd = content.indexOf("\n", markerIndex);
  const line = content.slice(lineStart, lineEnd === -1 ? content.length : lineEnd);
  const positionInLine = markerIndex - lineStart;
  const beforeMarker = line.slice(0, positionInLine);
  const afterMarker = line.slice(positionInLine + marker.length);
  return beforeMarker.lastIndexOf("[") > beforeMarker.lastIndexOf("]")
    && afterMarker.includes("]");
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

async function markdownFiles(root, directory = root) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await markdownFiles(root, fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function relativePath(root, path) {
  return relative(root, path).replaceAll("\\", "/");
}

function isInside(root, path) {
  const pathFromRoot = relative(root, path);
  return pathFromRoot === "" || (!pathFromRoot.startsWith("..") && !pathFromRoot.includes("../"));
}

function stripInlineCode(line) {
  let visibleText = "";
  let cursor = 0;

  while (cursor < line.length) {
    const openingIndex = line.indexOf("`", cursor);
    if (openingIndex === -1) return visibleText + line.slice(cursor);

    const delimiter = /^`+/.exec(line.slice(openingIndex))[0];
    const closingIndex = line.indexOf(delimiter, openingIndex + delimiter.length);
    if (closingIndex === -1) return visibleText + line.slice(cursor);

    visibleText += line.slice(cursor, openingIndex);
    cursor = closingIndex + delimiter.length;
  }

  return visibleText;
}

function markdownTextWithoutCode(content) {
  const visibleLines = [];
  let fenceDelimiter = "";

  for (const line of content.split(/\r?\n/)) {
    const fence = /^[ \t]{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fenceDelimiter) {
      const closingFence = /^[ \t]{0,3}(`{3,}|~{3,})[ \t]*$/.exec(line)?.[1];
      if (closingFence && closingFence[0] === fenceDelimiter[0]
        && closingFence.length >= fenceDelimiter.length) {
        fenceDelimiter = "";
      }
      continue;
    }
    if (fence) {
      fenceDelimiter = fence;
      continue;
    }
    visibleLines.push(stripInlineCode(line));
  }

  return visibleLines.join("\n");
}

function markdownTargets(content) {
  const targets = [];
  const expression = /!?\[[^\]]*\]\(([^\s)]+)(?:\s+[^)]*)?\)/g;
  for (const match of markdownTextWithoutCode(content).matchAll(expression)) {
    targets.push(match[1].replace(/^<|>$/g, ""));
  }
  return targets;
}

async function validateLinks(root, sourcePath, content, issues) {
  for (const target of markdownTargets(content)) {
    if (/^(?:https?|[a-z][a-z0-9+.-]*):/i.test(target) || target.startsWith("//")) continue;

    const hashIndex = target.indexOf("#");
    const filePart = hashIndex === -1 ? target : target.slice(0, hashIndex);
    const fragment = hashIndex === -1 ? "" : target.slice(hashIndex + 1);
    const targetPath = resolve(dirname(sourcePath), filePart || ".");
    const source = relativePath(root, sourcePath);

    if (!isInside(root, targetPath) || !(await isFile(targetPath))) {
      issues.push(issue("BROKEN_LINK", source, `Link target does not exist: ${target}`));
      continue;
    }

    if (!fragment) continue;

    const targetContent = await readFile(targetPath, "utf8");
    const anchors = new Set(anchorsIn(targetContent));
    if (!anchors.has(fragment.toLowerCase())) {
      issues.push(issue("BROKEN_LINK", source, `Link anchor does not exist: ${target}`));
    }
  }
}

function validateLessonSchema(path, content, issues) {
  const lines = new Set(content.split(/\r?\n/).map((line) => line.trimEnd()));
  const missingHeadings = [...REQUIRED_LESSON_HEADINGS, ...REQUIRED_STEP_HEADINGS]
    .filter((heading) => !lines.has(heading));
  if (missingHeadings.length > 0) {
    issues.push(issue("LESSON_SCHEMA", path,
      `Missing lesson headings: ${missingHeadings.join(", ")}`));
  }
}

function checkpointValue(content, name) {
  const match = new RegExp(`^- \\*\\*${name} checkpoint:\\*\\*\\s*(.*?)\\s*$`, "m").exec(content);
  return match?.[1] ?? "";
}

function validateCheckpointChain(path, content, lessonNumber, issues) {
  const expectedEntry = lessonNumber === 1 ? "START" : checkpointFor(lessonNumber - 1);
  const expectedExit = checkpointFor(lessonNumber);
  const entry = checkpointValue(content, "Entry");
  const exit = checkpointValue(content, "Exit");
  if (entry !== expectedEntry || exit !== expectedExit) {
    issues.push(issue("CHECKPOINT_CHAIN", path,
      `Expected ${expectedEntry} -> ${expectedExit}, found ${entry || "(missing)"} -> ${exit || "(missing)"}`));
  }
}

/**
 * Validate the structural, link, and checkpoint rules for a playbook directory.
 *
 * @param {string} rootDir directory containing the playbook files
 * @returns {Promise<Array<{code: string, path: string, message: string}>>}
 */
export async function validatePlaybook(rootDir) {
  const root = resolve(rootDir);
  const issues = [];

  for (const requiredPath of [...REQUIRED_FILES, ...LESSON_FILES.map(lessonPath)]) {
    if (!(await isFile(resolve(root, requiredPath)))) {
      issues.push(issue("MISSING_FILE", requiredPath, "Required file is missing"));
    }
  }

  for (let index = 0; index < LESSON_FILES.length; index += 1) {
    const path = lessonPath(LESSON_FILES[index]);
    const fullPath = resolve(root, path);
    if (!(await isFile(fullPath))) continue;
    const content = await readFile(fullPath, "utf8");
    validateLessonSchema(path, content, issues);
    validateCheckpointChain(path, content, index + 1, issues);
  }

  for (const fullPath of await markdownFiles(root)) {
    const path = relativePath(root, fullPath);
    const content = await readFile(fullPath, "utf8");

    for (const { line, text } of headingsIn(content)) {
      if (!text) issues.push(issue("PLACEHOLDER", path, `Empty heading: ${line}`));
    }

    for (const marker of UNFINISHED_MARKERS) {
      let markerIndex = content.indexOf(marker);
      while (markerIndex !== -1) {
        const exempt = path === "PROGRESS_STATE.template.md"
          && progressMarkerIsBracketed(content, markerIndex, marker);
        if (!exempt) issues.push(issue("PLACEHOLDER", path, `Unfinished marker: ${marker}`));
        markerIndex = content.indexOf(marker, markerIndex + marker.length);
      }
    }

    if (content.includes(DOCUMENTATION_LATEST_URL)) {
      issues.push(issue("DOC_VERSION", path,
        "Use a versioned Godot documentation URL instead of /en/latest/"));
    }

    await validateLinks(root, fullPath, content, issues);
  }

  return issues;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const issues = await validatePlaybook(process.argv[2] ?? ".");
  for (const foundIssue of issues) console.error(`${foundIssue.code} ${foundIssue.path}: ${foundIssue.message}`);
  if (issues.length > 0) {
    process.exitCode = 1;
  } else {
    console.log("Playbook validation passed");
  }
}
