#!/usr/bin/env python3
"""Assemble each chapter into ONE self-contained HTML file.

Authoring-time only: the emitted files have no external CSS, JS, fonts or
network calls. They open from file://, work offline, and deploy to any static
host. Shared shell + engine live here and in src/, so a fix lands in all seven.
"""
import json, pathlib, re, subprocess, datetime

root = pathlib.Path(__file__).parent
src = root / 'src'
css = (src / 'guide.css').read_text()
helpers = (src / 'helpers.js').read_text()
engine = (src / 'engine.js').read_text()

SHELL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · ECN 1A study guide</title>
<meta name="description" content="{desc}">
<style>
{css}</style>
</head>
<body>

<noscript>
  <div style="background:#FCEEE3;border-bottom:1.5px solid #D97757;padding:16px 32px;font-family:system-ui,sans-serif;color:#141413">
    <strong>This page needs JavaScript.</strong> The questions, the quiz and the models are built in the
    browser — with scripts blocked you will see empty cards. Open it in a normal browser tab.
  </div>
</noscript>

<div class="rail">
  <div class="rail-in">
    <span class="rt">{num} mastery</span>
    <span class="bar"><i id="railbar"></i></span>
    <span class="rv" id="railval">0%</span>
  </div>
</div>

<div class="wrap">

<header class="masthead">
  <div class="hero-grid">
    <div>
      <div class="eyebrow">ECN 1A · UC Davis · {num}</div>
      <h1>{h1}</h1>
      <p class="intro">{intro}</p>
      <div class="meta">{stats}</div>
      <div class="meta" style="margin-top:4px">Updated {updated}</div>
      <nav class="toc">{toc}</nav>
    </div>
    <div class="hero-fig" aria-hidden="true">
      <span class="tag">{herotag}</span>
      <div class="fig-h">{herosub}</div>
      {hero}
    </div>
  </div>
</header>

{body}

<footer>
  <div class="foot-grid">
    <div>
      <div class="k">ECN 1A · {num} of {total:02d}</div>
      <div style="margin-top:6px">
        Built against Mateer, Coppock &amp; Nietfeld, <em>Principles of Microeconomics</em>. This guide
        paraphrases and drills the concepts — it reproduces none of the book's text, figures or problem sets.
      </div>
    </div>
    <div style="text-align:right">
      <div>{next}</div>
      <div style="margin-top:6px"><a href="index.html">← all chapters</a></div>
    </div>
  </div>
</footer>

</div><!-- /wrap -->

<script>
{helpers}
</script>
<script>
'use strict';
{models}
</script>
<script>
'use strict';
var CHAPTER = {config};
{bank}
</script>
<script>
'use strict';
{engine}
</script>
</body>
</html>
"""


def updated(d):
    """Last change to a chapter's source: the newest file mtime if the folder has
    uncommitted edits, otherwise the date of the last commit that touched it."""
    def git(*a):
        return subprocess.run(['git', *a], cwd=root, capture_output=True, text=True).stdout.strip()
    stamp = None
    if not git('status', '--porcelain', '--', str(d.relative_to(root))):
        iso = git('log', '-1', '--format=%cI', '--', str(d.relative_to(root)))
        if iso:
            stamp = datetime.datetime.fromisoformat(iso)
    if stamp is None:
        stamp = datetime.datetime.fromtimestamp(max(f.stat().st_mtime for f in d.iterdir()))
    return stamp.strftime('%b %-d, %Y')

built = []
stamps = {}
chapters = [d for d in sorted(src.glob('ch*')) if d.is_dir()]
for d in chapters:
    m = json.loads((d / 'meta.json').read_text())
    toc = ''.join(
        '<a href="#%s">%s <span class="n">%s</span></a>' % (a, t, n)
        for a, t, n in m['toc'])
    html = SHELL.format(
        title=m['title'], desc=m['desc'], css=css, num=m['num'], h1=m['h1'],
        intro=m['intro'], stats=m['stats'], toc=toc, hero=m['hero'],
        updated=stamps.setdefault(m['id'], updated(d)), herotag=m['herotag'], herosub=m['herosub'], next=m['next'], total=len(chapters),
        body=(d / 'body.html').read_text(), helpers=helpers,
        models=(d / 'models.js').read_text(),
        config=json.dumps({'id': m['id'], 'title': m['title'],
                           'anchors': m['anchors'], 'navTicks': m['navTicks']}),
        bank=(d / 'bank.js').read_text(), engine=engine)
    (root / m['file']).write_text(html)
    built.append((m['file'], len(html) // 1024))

# the hub carries the same stamps, in <span data-upd="chNN"> placeholders
hub = root / 'index.html'
html = hub.read_text()
html = re.sub(r'<span data-upd="(ch\d+)">[^<]*</span>',
              lambda mm: '<span data-upd="%s">updated %s</span>' % (mm.group(1), stamps.get(mm.group(1), '')), html)
hub.write_text(html)

for f, k in built:
    print('  %-38s %4d KB' % (f, k))
print('%d chapter(s) built' % len(built))
