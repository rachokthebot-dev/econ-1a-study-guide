#!/usr/bin/env python3
"""Mark a chapter live on the hub page."""
import re, sys, json, pathlib
num, href, badge = sys.argv[1], sys.argv[2], sys.argv[3]
p = pathlib.Path('index.html'); s = p.read_text()
pat = r'<div class="ch soon"><span class="n">%s</span>(<span>.*?</span>)<span class="k">[^<]*</span></div>' % num
new, n = re.subn(pat, lambda m: '<a class="ch live" href="%s"><span class="n">%s</span>%s<span class="k">%s</span></a>' % (href, num, m.group(1), badge), s, flags=re.S)
p.write_text(new)
print('ch%s -> live (%d replaced); live now: %d' % (num, n, new.count('class="ch live"')))
