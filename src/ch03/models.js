/* =================================================================
 * MODEL 1 — the frontier. A quarter-ellipse gives genuine increasing
 * opportunity cost; the cost of the next laptop is computed by
 * differencing the frontier, not asserted.
 * ================================================================= */
(function () {
  var LMAX = 100, BMAX = 200;

  function frontier(a, linear) {
    if (a >= LMAX) return 0;
    if (linear) return BMAX * (1 - a / LMAX);
    return BMAX * Math.sqrt(Math.max(0, 1 - (a / LMAX) * (a / LMAX)));
  }
  function compute(p) {
    var max = frontier(p.a, p.linear);
    var next = p.a < LMAX ? max - frontier(p.a + 1, p.linear) : Infinity;
    var actual = p.b < 0 ? max : p.b;          // -1 means "sit on the curve"
    var cls = Math.abs(actual - max) < 1.5 ? 'efficient'
            : actual < max ? 'inefficient' : 'unattainable';
    return {
      max: max, next: next, actual: actual, cls: cls,
      idle: cls === 'inefficient' ? max - actual : 0,
      first: frontier(0, p.linear) - frontier(1, p.linear),
      last: frontier(LMAX - 1, p.linear) - frontier(LMAX, p.linear)
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, LMAX * 1.12, 44, 340), y = scale(0, BMAX * 1.12, 232, 24);
    b.push(line(44, 232, 344, 232, AX), line(44, 232, 44, 20, AX));
    b.push(txt(44, 250, 'LAPTOPS →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(txt(40, 18, 'BREAD', { a: 'end', s: 8, f: FAINT, ls: 0.8 }));
    var pts = [], a;
    for (a = 0; a <= LMAX; a += 1) pts.push(x(a).toFixed(1) + ',' + y(frontier(a, p.linear)).toFixed(1));
    b.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + CLAY + '" stroke-width="2.5"/>');
    // the tangent-ish slope at the chosen point, drawn as the actual next-unit step
    if (p.a < LMAX) {
      var x0 = x(p.a), y0 = y(m.max), x1 = x(p.a + 1), y1 = y(frontier(p.a + 1, p.linear));
      b.push(line(x0, y0, x1, y0, INK, 1.5));
      b.push(line(x1, y0, x1, y1, OLIVE, 2.5));
      b.push(txt(Math.min(x1 + 7, 300), (y0 + y1) / 2 + 3, '−' + m.next.toFixed(1) + ' bread', { s: 9, f: '#5A6B45' }));
    }
    b.push(line(x(p.a), 232, x(p.a), y(m.max), AX, 1.5, '3 3'));
    // the reader's actual point
    var col = m.cls === 'efficient' ? INK : m.cls === 'inefficient' ? FAINT : OLIVE;
    b.push('<circle cx="' + x(p.a) + '" cy="' + y(m.actual) + '" r="5.5" fill="' + col + '"/>');
    b.push(txt(clamp(x(p.a) + 10, 0, 250), y(m.actual) - 8, m.cls, { s: 9.5, f: col }));
    if (m.idle > 1) {
      b.push(line(x(p.a), y(m.actual), x(p.a), y(m.max), FAINT, 1.5, '2 3'));
      b.push(txt(clamp(x(p.a) + 10, 0, 240), (y(m.actual) + y(m.max)) / 2 + 3,
        Math.round(m.idle) + ' bread wasted', { s: 8.5, f: FAINT }));
    }
    return svg('0 0 360 258', b.join(''));
  }

  function params() {
    return { a: +el('ppc-a').value, b: +el('ppc-b').value, linear: el('ppc-lin').checked };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('ppc-a-v').textContent = p.a;
    el('ppc-b-v').textContent = p.b < 0 ? 'on the curve' : p.b;
    el('ppc-fig').innerHTML = draw(p, m);
    el('ppc-ro-max').textContent = m.max.toFixed(0) + ' bread';
    el('ppc-ro-oc').textContent = isFinite(m.next) ? m.next.toFixed(1) + ' bread' : '—';
    el('ppc-ro-first').textContent = m.first.toFixed(2) + ' bread';
    el('ppc-ro-last').textContent = m.last.toFixed(1) + ' bread';
    el('ppc-ro-cls').textContent = m.cls;
    el('ppc-ro-idle').textContent = m.idle > 0 ? Math.round(m.idle) : '0';
    var note;
    if (p.linear) {
      note = '<strong>Straight line, constant opportunity cost.</strong> Every laptop costs exactly ' +
        m.first.toFixed(1) + ' bread, the first and the hundredth alike. That is what "resources are ' +
        'perfectly interchangeable" means — and it is the assumption behind Chapter 2\'s comparative-advantage ' +
        'tables. Switch it off and the cost starts to climb.';
    } else if (m.cls === 'inefficient') {
      note = '<strong>Inside the curve — attainable, but wasteful.</strong> ' + Math.round(m.idle) +
        ' loaves of bread are simply not being made, with no gain in laptops to show for it. From here you ' +
        'can have more of <em>both</em> goods, which is never true on the frontier. This is what unemployment ' +
        'looks like on the diagram.';
    } else if (m.cls === 'unattainable') {
      note = '<strong>Outside the curve — not reachable today.</strong> No allocation of current resources ' +
        'gets you here. Only growth moves the frontier, which is the next chunk. (Trade can let you ' +
        '<em>consume</em> outside it — but that is consumption, not production.)';
    } else {
      note = '<strong>Efficient.</strong> The next laptop costs ' + m.next.toFixed(1) +
        ' bread. Compare the ends: the first laptop costs just ' + m.first.toFixed(2) +
        ' bread, the hundredth costs ' + m.last.toFixed(1) +
        '. The resources good at baking get conscripted last, and that rising cost <em>is</em> the bow in the curve.';
    }
    el('ppc-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['a', 'b'].forEach(function (k) { el('ppc-' + k).addEventListener('input', render); });
  el('ppc-lin').addEventListener('change', render);
  st = Stepper(el('ap-ppc'), [
    { t: 'The curve is every combination you could make using <strong>all</strong> your resources. Pick a number of laptops and it tells you the most bread still possible.', lit: ['ppc-ro-max'], v: function (m) { return m.max.toFixed(0) + ' bread alongside them'; } },
    { t: 'Now ask for <em>one more</em> laptop. The bread you lose to get it is the opportunity cost — the green step on the figure.', lit: ['ppc-ro-oc'], v: function (m) { return isFinite(m.next) ? m.next.toFixed(1) + ' bread for the next laptop' : 'no laptops left to add'; } },
    { t: 'Compare the two ends of the curve. The cost of a laptop is tiny at the start and brutal at the finish — that <strong>rise</strong> is what bends the line.', lit: ['ppc-ro-first', 'ppc-ro-last'], v: function (m) { return m.first.toFixed(2) + ' → ' + m.last.toFixed(1) + ' bread'; } },
    { t: 'Finally, where does your actual output sit? On the curve is efficient; inside wastes resources; outside is simply not available today.', lit: ['ppc-ro-cls', 'ppc-ro-idle'], v: function (m) { return m.cls + (m.idle > 1 ? ' — ' + Math.round(m.idle) + ' bread wasted' : ''); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — growth. Resources scale both intercepts; technology here
 * scales one. The test point is fixed so "now reachable" is a real
 * computed verdict, not a label.
 * ================================================================= */
(function () {
  var LMAX = 100, BMAX = 200, TEST_L = 85, TEST_B = 130;

  function compute(p) {
    var l = LMAX * (1 + p.r / 100) * (1 + p.t / 100);
    var b = BMAX * (1 + p.r / 100);
    var onNew = (TEST_L / l) * (TEST_L / l) + (TEST_B / b) * (TEST_B / b);
    return {
      l: l, b: b,
      reach: onNew <= 1,
      kind: p.r === 0 && p.t === 0 ? 'no change'
        : p.r < 0 ? 'contraction'
        : p.t > 0 && p.r > 0 ? 'both, laptop-biased'
        : p.t > 0 ? 'laptops only'
        : 'balanced growth'
    };
  }
  function curve(l, b, x, y) {
    var pts = [];
    for (var i = 0; i <= 60; i++) {
      var a = l * i / 60;
      pts.push(x(a).toFixed(1) + ',' + y(b * Math.sqrt(Math.max(0, 1 - (a / l) * (a / l)))).toFixed(1));
    }
    return pts.join(' ');
  }

  function draw(p, m) {
    var b = [], xm = Math.max(LMAX, m.l) * 1.12, ym = Math.max(BMAX, m.b) * 1.12;
    var x = scale(0, xm, 44, 340), y = scale(0, ym, 222, 24);
    b.push(line(44, 222, 344, 222, AX), line(44, 222, 44, 20, AX));
    b.push(txt(44, 240, 'LAPTOPS →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push('<polyline points="' + curve(LMAX, BMAX, x, y) + '" fill="none" stroke="' + AX + '" stroke-width="2" stroke-dasharray="4 3"/>');
    b.push('<polyline points="' + curve(m.l, m.b, x, y) + '" fill="none" stroke="' + CLAY + '" stroke-width="2.5"/>');
    b.push(txt(x(LMAX) + 2, y(0) - 6, 'before', { s: 8.5, f: FAINT }));
    b.push(txt(x(m.l) + 2, y(0) - 20, 'after', { s: 8.5, f: CLAYD }));
    b.push('<circle cx="' + x(TEST_L) + '" cy="' + y(TEST_B) + '" r="5" fill="' + (m.reach ? OLIVE : FAINT) + '"/>');
    b.push(txt(x(TEST_L) - 8, y(TEST_B) - 8, m.reach ? 'now reachable' : 'still out of reach',
      { a: 'end', s: 9, f: m.reach ? '#5A6B45' : FAINT }));
    return svg('0 0 360 248', b.join(''));
  }

  function params() { return { r: +el('grow-r').value, t: +el('grow-t').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('grow-r-v').textContent = p.r + '%';
    el('grow-t-v').textContent = p.t + '%';
    el('grow-fig').innerHTML = draw(p, m);
    el('grow-ro-l').textContent = m.l.toFixed(0);
    el('grow-ro-b').textContent = m.b.toFixed(0);
    el('grow-ro-k').textContent = m.kind;
    el('grow-ro-p').textContent = m.reach ? 'reachable' : 'out of reach';
    var note;
    if (p.r === 0 && p.t === 0) note = 'Move a slider. Nothing shifts a frontier except more resources or better technology — <em>choosing</em> a different point only moves you along it.';
    else if (p.r < 0) note = '<strong>The frontier moved inward.</strong> Fewer resources means combinations that were efficient yesterday are now impossible. Points do not become inefficient — they become unattainable.';
    else if (p.t > 0 && p.r === 0) note = '<strong>One-sided growth.</strong> Laptop technology moved the laptop intercept to ' + m.l.toFixed(0) + ' and left bread at ' + m.b.toFixed(0) + ' — exactly where it was. The economy can make more laptops, and not one more loaf if it makes no laptops at all. Exams love this asymmetry.';
    else note = '<strong>' + (p.t > 0 ? 'Growth in both, tilted toward laptops.' : 'Balanced growth.') + '</strong> More resources push both intercepts out together; the laptop-only slider then tilts the curve. Either way, points that were out of reach can become attainable — check the dot.';
    el('grow-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['r', 't'].forEach(function (k) { el('grow-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-grow'), [
    { t: 'More resources scale <strong>both</strong> intercepts. The whole curve moves out and keeps its shape.', lit: ['grow-ro-l', 'grow-ro-b'], v: function (m) { return m.l.toFixed(0) + ' laptops / ' + m.b.toFixed(0) + ' bread'; } },
    { t: 'Technology need not be even-handed. A laptop-only improvement moves one intercept and leaves the other untouched — the curve tilts rather than expanding.', lit: ['grow-ro-k'], v: function (m) { return m.kind; } },
    { t: 'The test is whether a specific out-of-reach combination has come inside the new frontier. That is what growth buys you.', lit: ['grow-ro-p'], v: function (m) { return m.reach ? '85 laptops + 130 bread is now possible' : 'still beyond the frontier'; } },
    { t: 'Trade belongs to neither slider. It never shifts your production frontier — it lets you <strong>consume</strong> outside it, which is a different sentence and a graded distinction.', lit: [], v: function () { return 'trade shifts consumption, not production'; } }
  ], function () { return compute(params()); });
  render();
})();
