# ECN 1A — interactive study guide

Interactive study guide for **UC Davis ECN 1A (Principles of Microeconomics)**, built against
Mateer, Coppock & Nietfeld. One self-contained HTML file per chapter — no build step, no
dependencies, no network calls. Opens from `file://`, deploys to GitHub Pages as-is.

```
index.html                     chapter hub
ch01-five-foundations.html     Chapter 1 — complete (131 KB, everything inline)
smoke.mjs                      headless check: console errors + model arithmetic + every path
```

## What each chapter contains

- **Short reading chunks** rather than one long wall, so a checkpoint is never far away.
- **Live models.** Each applet computes the real arithmetic from the slider values — no lookup
  tables, no tweening between pre-baked answers. Every model publishes what it computes and what
  it simplifies in the chapter's fidelity ledger.
- **Retrieval checkpoints between chunks**, scheduled rather than merely listed: miss an item and
  it returns at the next checkpoint; get it right and it returns two later; two correct recalls
  retire it to the quiz.
- **A chapter quiz** with the five foundations interleaved rather than blocked, and a per-topic
  breakdown of where to revise.
- **Export** — copies your outstanding missed items as a ready-to-paste prompt.

The mastery bar counts the checkpoint items you have answered correctly, so answering every
checkpoint in a chapter reads 100%; an item you missed and have not yet re-earned holds it back
until it comes round again. Multiple-choice options are permuted on load, balanced across the four
positions, so no single letter is worth guessing.

Progress is saved in `localStorage`, so it survives a reload but does not follow you to another
device or browser.

## Why it's built this way

| Choice | Evidence |
|---|---|
| Retrieval checkpoints spaced through the chapter, not a quiz bolted on the end | Spaced retrieval practice vs massed, g ≈ 0.74 — the largest effect available |
| A deliberately plain schedule (miss → next, hit → two later, two hits → retire) | Expanding vs uniform intervals, g = 0.034 — indistinguishable. Number of successful retrievals is what matters, so the schedule only has to guarantee them |
| Quiz interleaved across topics, not blocked by topic | Interleaved quizzing, d ≈ 0.35 |
| Every distractor is a named misconception with its own rebuttal | Plausible, misconception-based distractors discriminate; implausible ones measure nothing. The usual failure mode of generated quizzes |
| Models compute rather than assert | Several traps (living expenses in opportunity cost, "keep going while total benefit rises") only land when you can watch the number move |

## Chapter 1 models

| Applet | Computed | Teaches |
|---|---|---|
| Plastic-bag fee | Switching share, bags, revenue, plastic avoided, bin-liner offset | Direct vs indirect incentives; why a tax that works collects less |
| Degree cost | Explicit, implicit, economic cost, break-even years | Implicit costs; why ordinary living expenses don't count |
| Marginal thinking | MB/MC per unit, totals by summation, net benefit at every quantity | MB = MC, and what the two wrong stopping rules actually cost |
| Trade surplus | Consumer surplus, producer surplus, total value, bargaining range | Trade is positive-sum; price splits the gain, it doesn't create it |

## Verify before claiming it works

A page like this fails silently — one thrown error gives you a clean-looking screen with dead
sliders. `smoke.mjs` loads the page in headless Chromium, fails on any console error, asserts the
model arithmetic against hand-computed values, exercises every question type, reloads to confirm
the spaced-recall queue actually brings items back, and submits the quiz against a known key.

```bash
python3 -m http.server 8777 &
npm i -D playwright && npx playwright install chromium
node smoke.mjs http://localhost:8777/ch01-five-foundations.html
```

## Deploy

Push to GitHub, then Settings → Pages → deploy from branch, root. There is nothing to build.

## Status

Chapter 1 complete. Chapters 2–7 (gains from trade, PPC, supply and demand, elasticity, market
outcomes, tax incidence) follow the same single-file pattern — copy `ch01-five-foundations.html`
and replace the content, models and item bank.

## Licence / scope

An independent study aid, not affiliated with UC Davis or the publisher. Concepts are paraphrased
and drilled; no textbook text, figures or problem sets are reproduced.
