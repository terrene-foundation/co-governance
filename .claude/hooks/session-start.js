#!/usr/bin/env node
"use strict";

/**
 * session-start.js — minimal SessionStart harness for the trust-posture banner.
 *
 * co-governance ships no multi-purpose session-start, so this is the standalone
 * harness wrapping the posture banner (substrate/posture-banner-snippet.js).
 * It depends on `lib/posture.js` ONLY — none of the non-posture lib modules
 * (env/workspace/version) are pulled in.
 *
 * Mode: hooks-only / advisory (GATE-B). The banner SURFACES posture + the
 * unadjudicated violation count; it does NOT adjudicate or downgrade. There is
 * no `/cc-audit` step-15 adjudication wired in this repo (see rules/trust-posture.md
 * § Enforcement Status and LANDING § upgrade path).
 *
 * Fail-open contract: any error, missing state, or timeout degrades to a clean
 * "continue" with no injected context (lib/runtime.js withFailOpen, 10s ceiling).
 */

const path = require("path");
const runtime = require(path.join(__dirname, "lib", "runtime.js"));
const posture = require(path.join(__dirname, "lib", "posture.js"));

function buildPostureBanner(cwd) {
  posture.pruneViolations(cwd);
  const p = posture.readPosture(cwd);
  const counts = posture.countRecent(cwd);
  const graceActive = p.grace
    .map(
      (g) =>
        `${g.type} (rule ${g.rule}, until ${String(g.until || "").slice(0, 10)})`,
    )
    .join("; ");
  const banner =
    `[TRUST-POSTURE] ${p.level}` +
    (p.since ? ` since ${p.since.slice(0, 10)}` : "") +
    ` — ${counts.total} violation(s) in last ${posture.WINDOW_DAYS}d` +
    ` (${counts.unadjudicated} awaiting probe adjudication,` +
    ` ${counts.confirmed} confirmed, ${counts.retired} retired)` +
    (graceActive ? ` | grace windows: ${graceActive}` : "");
  const additionalContext =
    banner +
    "\nPosture ladder: L1 (observed) … L5 (delegated); rules/trust-posture.md " +
    "defines the ceiling. Downgrades are automatic; only a human may upgrade. " +
    (counts.unadjudicated > 0
      ? `${counts.unadjudicated} recorded violation(s) await probe adjudication at the next /cc-audit (step 15, where wired).`
      : "No violations awaiting adjudication.");
  return { banner, additionalContext };
}

runtime.withFailOpen((input) => {
  const cwd = runtime.projectDir();
  const { banner, additionalContext } = buildPostureBanner(cwd);
  try {
    process.stderr.write(banner + "\n");
  } catch {
    // stderr unavailable — the additionalContext below still primes the agent.
  }
  runtime.addContext(additionalContext, input);
}, 10000);
