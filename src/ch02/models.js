/* =================================================================
 * MODEL 1 — who should make what. Four output numbers in; both
 * opportunity costs, both advantages and the terms-of-trade band out.
 * ================================================================= */
(function () {
  function compute(p) {
    var aCostL = p.aa / p.al, bCostL = p.ba / p.bl;   // avocados given up per laptop
    var aCostA = p.al / p.aa, bCostA = p.bl / p.ba;   // laptops given up per avocado
    var tie = Math.abs(aCostL - bCostL) < 1e-9;
    return {
      aCostL: aCostL, bCostL: bCostL, aCostA: aCostA, bCostA: bCostA, tie: tie,
      lapBy: tie ? null : (aCostL < bCostL ? 'Ridge' : 'Vale'),
      avoBy: tie ? null : (aCostA < bCostA ? 'Ridge' : 'Vale'),
      absL: p.al > p.bl ? 'Ridge' : p.al < p.bl ? 'Vale' : 'tie',
      absA: p.aa > p.ba ? 'Ridge' : p.aa < p.ba ? 'Vale' : 'tie',
      lo: Math.min(aCostL, bCostL), hi: Math.max(aCostL, bCostL)
    };
  }

  function draw(p, m) {
    var b = [], hi = Math.max(m.aCostL, m.bCostL) * 1.25, x = scale(0, hi, 92, 330);
    b.push(txt(16, 20, 'COST OF ONE LAPTOP, IN AVOCADOS GIVEN UP', { s: 8, f: FAINT, ls: 0.8 }));
    [['Ridge', m.aCostL], ['Vale', m.bCostL]].forEach(function (r, i) {
      var y = 34 + i * 34, win = !m.tie && r[1] === m.lo;
      b.push(txt(88, y + 15, r[0], { a: 'end', s: 10, f: INK }));
      b.push(rect(92, y, 238, 21, G100, 3));
      b.push(rect(92, y, x(r[1]) - 92, 21, win ? CLAY : OAT, 3));
      b.push(txt(x(r[1]) + 6, y + 15, r[1].toFixed(2), { s: 10, f: win ? CLAYD : INK }));
    });
    // the terms-of-trade band
    b.push(txt(16, 124, 'ACCEPTABLE TERMS OF TRADE', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(line(92, 150, 330, 150, AX));
    if (!m.tie) {
      b.push(rect(x(m.lo), 134, x(m.hi) - x(m.lo), 32, '#F5EFE6', 3));
      b.push(line(x(m.lo), 132, x(m.lo), 168, OLIVE, 2));
      b.push(line(x(m.hi), 132, x(m.hi), 168, CLAY, 2));
      b.push(txt((x(m.lo) + x(m.hi)) / 2, 154, m.lo.toFixed(2) + ' – ' + m.hi.toFixed(2),
        { a: 'middle', s: 10, f: CLAYD }));
      b.push(txt(x(m.lo), 180, 'floor', { a: 'middle', s: 8, f: '#5A6B45' }));
      b.push(txt(x(m.hi), 180, 'ceiling', { a: 'middle', s: 8, f: CLAYD }));
    } else {
      b.push(txt(211, 154, 'NONE — COSTS ARE IDENTICAL', { a: 'middle', s: 9.5, f: CLAYD, ls: 0.6 }));
    }
    // the reciprocal, to make "can't win both" visible
    b.push(txt(16, 208, 'COST OF ONE AVOCADO, IN LAPTOPS', { s: 8, f: FAINT, ls: 0.8 }));
    var hi2 = Math.max(m.aCostA, m.bCostA) * 1.25, x2 = scale(0, hi2, 92, 330);
    [['Ridge', m.aCostA], ['Vale', m.bCostA]].forEach(function (r, i) {
      var y = 220 + i * 30, win = !m.tie && r[1] === Math.min(m.aCostA, m.bCostA);
      b.push(txt(88, y + 14, r[0], { a: 'end', s: 10, f: INK }));
      b.push(rect(92, y, 238, 19, G100, 3));
      b.push(rect(92, y, x2(r[1]) - 92, 19, win ? OLIVE : OAT, 3));
      b.push(txt(x2(r[1]) + 6, y + 14, r[1].toFixed(3), { s: 9.5, f: win ? '#5A6B45' : INK }));
    });
    return svg('0 0 360 290', b.join(''));
  }

  function params() {
    return { al: +el('ca-al').value, aa: +el('ca-aa').value, bl: +el('ca-bl').value, ba: +el('ca-ba').value };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    ['al', 'aa', 'bl', 'ba'].forEach(function (k) { el('ca-' + k + '-v').textContent = p[k]; });
    el('ca-fig').innerHTML = draw(p, m);
    el('ca-ro-a1').textContent = m.aCostL.toFixed(2) + ' avo';
    el('ca-ro-b1').textContent = m.bCostL.toFixed(2) + ' avo';
    el('ca-ro-abs').textContent = m.absL === m.absA ? (m.absL === 'tie' ? 'neither' : m.absL + ' (both)')
      : 'L:' + m.absL + ' A:' + m.absA;
    el('ca-ro-cmp').textContent = m.lapBy || 'neither';
    el('ca-ro-cmp2').textContent = m.avoBy || 'neither';
    el('ca-ro-tot').textContent = m.tie ? 'none' : m.lo.toFixed(2) + '–' + m.hi.toFixed(2);
    var note;
    if (m.tie) {
      note = '<strong>No comparative advantage, so no gains from trade.</strong> Both give up exactly ' +
        m.aCostL.toFixed(2) + ' avocados per laptop, so neither can supply the other more cheaply than it ' +
        'can supply itself. There is no rate both would accept, and the band disappears. Exams include this ' +
        'case on purpose.';
    } else if (m.absL === m.absA && m.absL !== 'tie') {
      note = '<strong>' + m.absL + ' has absolute advantage in both goods — and it changes nothing.</strong> ' +
        m.lapBy + ' still makes the laptops because it gives up fewer avocados to do it (' +
        m.lo.toFixed(2) + ' vs ' + m.hi.toFixed(2) + '), and ' + m.avoBy + ' still makes the avocados. ' +
        'Notice the bottom pair: whoever wins the top chart necessarily loses the bottom one. That is the ' +
        'reciprocal at work, and it is why no one can hold comparative advantage in everything.';
    } else {
      note = '<strong>' + m.lapBy + ' makes the laptops, ' + m.avoBy + ' makes the avocados.</strong> ' +
        'Any terms of trade strictly between ' + m.lo.toFixed(2) + ' and ' + m.hi.toFixed(2) +
        ' avocados per laptop leaves both better off than self-sufficiency.';
    }
    el('ca-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['al', 'aa', 'bl', 'ba'].forEach(function (k) { el('ca-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-ca'), [
    { t: 'Start with <strong>absolute</strong> advantage — just compare raw output. No division, and it tells you almost nothing about who should do what.', lit: ['ca-ro-abs'], v: function (m) { return 'laptops: ' + m.absL + ' · avocados: ' + m.absA; } },
    { t: 'Now the cost of a laptop, <em>in avocados</em>. Laptops are what we are pricing, so laptops go on the bottom: <code>avocados ÷ laptops</code>.', lit: ['ca-ro-a1', 'ca-ro-b1'], v: function (m) { return 'Ridge ' + m.aCostL.toFixed(2) + ' vs Vale ' + m.bCostL.toFixed(2); } },
    { t: 'Lower cost wins. That producer has <strong>comparative advantage</strong> in laptops and should specialise there.', lit: ['ca-ro-cmp'], v: function (m) { return m.lapBy ? m.lapBy + ' makes the laptops' : 'tied — nobody'; } },
    { t: 'Flip the ratio for avocados. Whoever won above must lose here — opportunity costs are reciprocals, so comparative advantage in both is impossible.', lit: ['ca-ro-cmp2'], v: function (m) { return m.avoBy ? m.avoBy + ' makes the avocados' : 'tied — nobody'; } },
    { t: 'The two laptop costs are the floor and ceiling of the deal. Below the floor the low-cost producer would rather keep making them; above the ceiling the buyer would rather make its own.', lit: ['ca-ro-tot'], v: function (m) { return m.tie ? 'no band exists' : m.lo.toFixed(2) + ' to ' + m.hi.toFixed(2) + ' avocados per laptop'; } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — the deal. Specialise, swap at your terms of trade, and
 * compare what each side ends up holding against going it alone.
 * ================================================================= */
(function () {
  var A_L = 100, A_A = 200, B_L = 40, B_A = 160;      // full-specialisation capacity
  var A0_L = 70, A0_A = 60, B0_L = 20, B0_A = 80;     // self-sufficiency baseline

  function compute(p) {
    var aL = A_L - p.e, aA = p.e * p.t;                // Ridge: keeps laptops, imports avocados
    var bL = p.e, bA = B_A - p.e * p.t;                // Vale: keeps avocados, imports laptops
    var aGain = aL >= A0_L && aA >= A0_A;
    var bGain = bL >= B0_L && bA >= B0_A;
    return {
      aL: aL, aA: aA, bL: bL, bA: bA, aGain: aGain, bGain: bGain,
      feasible: bA >= 0 && aL >= 0,
      inBand: p.t > 2 && p.t < 4,
      dL: (A_L) - (A0_L + B0_L), dA: (B_A) - (A0_A + B0_A)
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, 220, 96, 340);
    function pair(label, y, nowL, nowA, wasL, wasA, gain) {
      b.push(txt(16, y - 6, label, { s: 8, f: FAINT, ls: 0.8 }));
      [['laptops', wasL, nowL, CLAY], ['avocados', wasA, nowA, OLIVE]].forEach(function (r, i) {
        var yy = y + i * 24;
        b.push(txt(92, yy + 13, r[0], { a: 'end', s: 8.5, f: INK }));
        b.push(rect(96, yy, 244, 17, G100, 3));
        b.push(rect(96, yy, clamp(x(r[1]) - 96, 0, 244), 17, '#E8E4DA', 3));   // before
        b.push(rect(96, yy, clamp(x(r[2]) - 96, 0, 244), 9, r[3], 2));          // after
        b.push(txt(344, yy + 13, Math.round(r[2]), { a: 'end', s: 9, f: INK }));
      });
      b.push(txt(16, y + 42, gain ? '✓ better off' : '✗ worse off', { s: 9, f: gain ? '#5A6B45' : CLAYD }));
    }
    pair('RIDGE — AFTER THE DEAL vs ALONE', 24, m.aL, m.aA, A0_L, A0_A, m.aGain);
    pair('VALE — AFTER THE DEAL vs ALONE', 112, m.bL, m.bA, B0_L, B0_A, m.bGain);
    // terms-of-trade band
    b.push(txt(16, 196, 'YOUR TERMS OF TRADE AGAINST THE BAND', { s: 8, f: FAINT, ls: 0.8 }));
    var tx = scale(1, 5, 96, 340);
    b.push(line(96, 222, 340, 222, AX));
    b.push(rect(tx(2), 206, tx(4) - tx(2), 32, '#F5EFE6', 3));
    b.push(txt(tx(2), 250, '2', { a: 'middle', s: 8.5, f: '#5A6B45' }));
    b.push(txt(tx(4), 250, '4', { a: 'middle', s: 8.5, f: CLAYD }));
    b.push(line(tx(p.t), 204, tx(p.t), 240, INK, 2));
    b.push(txt(clamp(tx(p.t), 104, 332), 200, p.t.toFixed(1), { a: 'middle', s: 10, f: INK }));
    return svg('0 0 360 262', b.join(''));
  }

  function params() { return { t: +el('tot-t').value, e: +el('tot-e').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('tot-t-v').textContent = p.t.toFixed(1);
    el('tot-e-v').textContent = p.e;
    el('tot-fig').innerHTML = draw(p, m);
    el('tot-ro-a').textContent = Math.round(m.aL) + 'L ' + Math.round(m.aA) + 'A';
    el('tot-ro-b').textContent = Math.round(m.bL) + 'L ' + Math.round(m.bA) + 'A';
    el('tot-ro-v').textContent = m.aGain && m.bGain ? 'both gain' : m.aGain ? 'Vale refuses' : m.bGain ? 'Ridge refuses' : 'both refuse';
    el('tot-ro-w').textContent = '+' + m.dL + 'L +' + m.dA + 'A';
    var note;
    if (!m.inBand) {
      note = '<strong>' + p.t.toFixed(1) + ' is outside the 2–4 band.</strong> ' +
        (p.t <= 2 ? 'Ridge gives up 2 avocados to make a laptop itself, so it will not sell one for ' + p.t.toFixed(1) + '.'
                  : 'Vale gives up only 4 avocados to make its own laptop, so it will not pay ' + p.t.toFixed(1) + '.') +
        ' No rate outside the two opportunity costs is ever accepted.';
    } else if (m.aGain && m.bGain) {
      note = '<strong>A real deal.</strong> Both sides hold more of both goods than they could produce alone — ' +
        'not because anyone worked harder, but because production moved to whoever gave up less. World output ' +
        'is up ' + m.dL + ' laptops and ' + m.dA + ' avocados.';
    } else {
      note = '<strong>The rate is inside the band, but the volume breaks it.</strong> ' +
        (!m.aGain ? 'Ridge ends with ' + Math.round(m.aA) + ' avocados against the 60 it had alone — it exported too many laptops for too few avocados back.'
                  : 'Vale ends with ' + Math.round(m.bA) + ' avocados against the 80 it had alone — it is paying away more than the laptops are worth to it.') +
        ' A fair exchange rate on the wrong volume still fails someone, which is why both sliders matter.';
    }
    el('tot-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['t', 'e'].forEach(function (k) { el('tot-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-tot'), [
    { t: 'Each side drops the good it is <em>relatively</em> bad at. Ridge makes 100 laptops and no avocados; Vale makes 160 avocados and no laptops.', lit: ['tot-ro-w'], v: function (m) { return 'world output +' + m.dL + 'L +' + m.dA + 'A'; } },
    { t: 'Now swap. Ridge ships laptops out and avocados come back at your chosen rate.', lit: ['tot-ro-a'], v: function (m) { return 'Ridge ends with ' + Math.round(m.aL) + 'L ' + Math.round(m.aA) + 'A'; } },
    { t: 'Vale ends up holding the mirror image of that trade.', lit: ['tot-ro-b'], v: function (m) { return 'Vale ends with ' + Math.round(m.bL) + 'L ' + Math.round(m.bA) + 'A'; } },
    { t: 'Compare each against self-sufficiency. A deal only counts if <strong>both</strong> beat their own baseline — either side can simply refuse.', lit: ['tot-ro-v'], v: function (m) { return m.aGain && m.bGain ? 'both beat going it alone' : 'someone is worse off'; } }
  ], function () { return compute(params()); });
  render();
})();
