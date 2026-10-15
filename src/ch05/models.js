/* =================================================================
 * MODEL 1 — elasticity between two points, by the midpoint method,
 * with the naive from-the-start figure alongside so the difference
 * is visible rather than asserted.
 * ================================================================= */
(function () {
  function compute(p) {
    var dq = p.q2 - p.q1, dp = p.p2 - p.p1;
    var mq = (p.q1 + p.q2) / 2, mp = (p.p1 + p.p2) / 2;
    var pcq = dq / mq, pcp = dp / mp;
    var e = pcp === 0 ? Infinity : Math.abs(pcq / pcp);
    var naive = p.p1 === 0 || dp === 0 ? Infinity : Math.abs((dq / p.q1) / (dp / p.p1));
    var tr1 = p.p1 * p.q1, tr2 = p.p2 * p.q2;
    return {
      pcq: pcq, pcp: pcp, e: e, naive: naive, tr1: tr1, tr2: tr2, dtr: tr2 - tr1,
      cls: !isFinite(e) ? 'no price change' : e > 1.001 ? 'elastic' : e < 0.999 ? 'inelastic' : 'unit elastic',
      wrongWay: dq !== 0 && dp !== 0 && (dq > 0) === (dp > 0)
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, 220, 48, 338), y = scale(0, 44, 196, 24);
    b.push(line(48, 196, 344, 196, AX), line(48, 196, 48, 20, AX));
    b.push(txt(48, 214, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(txt(44, 18, 'PRICE', { a: 'end', s: 8, f: FAINT, ls: 0.8 }));
    b.push(line(x(p.q1), y(p.p1), x(p.q2), y(p.p2), m.wrongWay ? FAINT : CLAY, 2.5));
    // the midpoint the formula divides by
    b.push('<circle cx="' + x((p.q1 + p.q2) / 2) + '" cy="' + y((p.p1 + p.p2) / 2) + '" r="3.5" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="2 2"/>');
    [[p.q1, p.p1, 'A', OLIVE], [p.q2, p.p2, 'B', CLAYD]].forEach(function (pt) {
      b.push('<circle cx="' + x(pt[0]) + '" cy="' + y(pt[1]) + '" r="5" fill="' + pt[3] + '"/>');
      b.push(txt(x(pt[0]) + 9, y(pt[1]) - 6, pt[2] + ' ($' + pt[1] + ', ' + pt[0] + ')', { s: 9, f: pt[3] }));
    });
    // revenue rectangles, drawn to scale under each point
    b.push(txt(48, 240, 'TOTAL REVENUE = PRICE × QUANTITY', { s: 8, f: FAINT, ls: 0.8 }));
    var mx = Math.max(m.tr1, m.tr2, 1), rx = scale(0, mx, 96, 338);
    [['at A', m.tr1, OLIVE], ['at B', m.tr2, CLAYD]].forEach(function (r, i) {
      var yy = 250 + i * 26;
      b.push(txt(92, yy + 13, r[0], { a: 'end', s: 8.5, f: INK }));
      b.push(rect(96, yy, 242, 17, G100, 3));
      b.push(rect(96, yy, rx(r[1]) - 96, 17, r[2], 3));
      b.push(txt(334, yy + 13, '$' + Math.round(r[1]).toLocaleString('en-US'), { a: 'end', s: 9, f: '#fff' }));
    });
    return svg('0 0 360 306', b.join(''));
  }

  function params() {
    return { p1: +el('mid-p1').value, q1: +el('mid-q1').value, p2: +el('mid-p2').value, q2: +el('mid-q2').value };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('mid-p1-v').textContent = '$' + p.p1;
    el('mid-q1-v').textContent = p.q1;
    el('mid-p2-v').textContent = '$' + p.p2;
    el('mid-q2-v').textContent = p.q2;
    el('mid-fig').innerHTML = draw(p, m);
    el('mid-ro-dq').textContent = (m.pcq * 100).toFixed(1) + '%';
    el('mid-ro-dp').textContent = (m.pcp * 100).toFixed(1) + '%';
    el('mid-ro-e').textContent = isFinite(m.e) ? m.e.toFixed(2) : '—';
    el('mid-ro-cls').textContent = m.cls;
    el('mid-ro-naive').textContent = isFinite(m.naive) ? m.naive.toFixed(2) : '—';
    el('mid-ro-tr').textContent = (m.dtr >= 0 ? '+$' : '−$') + Math.abs(Math.round(m.dtr)).toLocaleString('en-US');
    var note;
    if (!isFinite(m.e)) {
      note = '<strong>No price change, so elasticity is undefined.</strong> You cannot divide by a zero percentage change in price. Move one of the price sliders.';
    } else if (m.wrongWay) {
      note = '<strong>Price and quantity moved the same way.</strong> That is not a demand curve — along a demand curve they always move in opposite directions. The arithmetic still runs, but what you have drawn is two points on two <em>different</em> demand curves, which is how a shift gets mistaken for a slope.';
    } else {
      var gap = Math.abs(m.naive - m.e);
      note = '<strong>|Ed| = ' + m.e.toFixed(2) + ' — ' + m.cls + '.</strong> ' +
        (m.cls === 'elastic'
          ? 'Quantity moved proportionally more than price, so revenue follows <em>quantity</em>: it ' + (m.dtr >= 0 ? 'rose' : 'fell') + ' by $' + Math.abs(Math.round(m.dtr)).toLocaleString('en-US') + '.'
          : m.cls === 'inelastic'
            ? 'Quantity barely budged, so revenue follows <em>price</em>: it ' + (m.dtr >= 0 ? 'rose' : 'fell') + ' by $' + Math.abs(Math.round(m.dtr)).toLocaleString('en-US') + '.'
            : 'The two percentage changes cancel exactly, so revenue is essentially unchanged — this is the knife edge.') +
        ' The naïve calculation gives ' + m.naive.toFixed(2) + (gap > 0.08 ? ', which is ' + gap.toFixed(2) + ' away — large enough to flip a verdict near 1.' : ', close here because the change is small.');
    }
    el('mid-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['p1', 'q1', 'p2', 'q2'].forEach(function (k) { el('mid-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-mid'), [
    { t: 'Percentage change in quantity, divided by the <strong>average</strong> of the two quantities — not by the starting one.', lit: ['mid-ro-dq'], v: function (m) { return (m.pcq * 100).toFixed(1) + '%'; } },
    { t: 'Same again for price. Using the average at both ends is what makes the answer identical whichever direction you travel.', lit: ['mid-ro-dp'], v: function (m) { return (m.pcp * 100).toFixed(1) + '%'; } },
    { t: 'Divide one by the other and take the absolute value. Above 1 is elastic, below 1 inelastic.', lit: ['mid-ro-e', 'mid-ro-cls'], v: function (m) { return isFinite(m.e) ? '|Ed| = ' + m.e.toFixed(2) + ' — ' + m.cls : 'undefined'; } },
    { t: 'Compare against dividing by the <em>starting</em> values instead. The gap is why the midpoint method exists.', lit: ['mid-ro-naive'], v: function (m) { return isFinite(m.naive) ? 'naïve gives ' + m.naive.toFixed(2) : '—'; } },
    { t: 'Now check revenue. Elastic demand means a price rise loses money; inelastic means it makes money. The elasticity predicted this before you multiplied.', lit: ['mid-ro-tr'], v: function (m) { return (m.dtr >= 0 ? '+$' : '−$') + Math.abs(Math.round(m.dtr)).toLocaleString('en-US'); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — along a linear demand curve. Point elasticity is
 * (1/slope)(P/Q); revenue is computed at every quantity and its peak
 * is found from the curve, not asserted to be the midpoint.
 * ================================================================= */
(function () {
  var B = 0.5;                                    // P = a - B*Q

  function priceAt(q, a) { return a - B * q; }
  function compute(p) {
    var price = priceAt(p.q, p.a);
    var e = price <= 0 ? 0 : (1 / B) * (price / p.q);
    var tr = price * p.q;
    // revenue-maximising quantity, found by scanning the curve
    var best = 0, bestTr = -1;
    for (var q = 1; q <= p.a / B - 1; q++) {
      var t = priceAt(q, p.a) * q;
      if (t > bestTr) { bestTr = t; best = q; }
    }
    return {
      price: price, e: e, tr: tr, best: best, bestTr: bestTr,
      cls: e > 1.02 ? 'elastic' : e < 0.98 ? 'inelastic' : 'unit elastic',
      advice: e > 1.02 ? 'cut the price' : e < 0.98 ? 'raise the price' : 'already at the peak'
    };
  }

  function draw(p, m) {
    var b = [], qmax = p.a / B, x = scale(0, qmax * 1.08, 46, 340), y = scale(0, p.a * 1.1, 160, 24);
    b.push(line(46, 160, 344, 160, AX), line(46, 160, 46, 20, AX));
    b.push(txt(44, 18, 'PRICE', { a: 'end', s: 8, f: FAINT, ls: 0.8 }));
    // demand, coloured by region
    var mid = qmax / 2;
    b.push(line(x(0), y(p.a), x(mid), y(priceAt(mid, p.a)), OLIVE, 3));
    b.push(line(x(mid), y(priceAt(mid, p.a)), x(qmax), y(0), CLAY, 3));
    b.push(txt(x(mid * 0.45), y(priceAt(mid * 0.45, p.a)) - 9, 'elastic', { s: 8.5, f: '#5A6B45' }));
    b.push(txt(x(mid * 1.55), y(priceAt(mid * 1.55, p.a)) - 9, 'inelastic', { s: 8.5, f: CLAYD }));
    b.push('<circle cx="' + x(mid) + '" cy="' + y(priceAt(mid, p.a)) + '" r="4" fill="' + INK + '"/>');
    b.push(txt(x(mid) + 8, y(priceAt(mid, p.a)) - 6, '|E| = 1', { s: 8.5, f: INK }));
    // the reader's point, with its revenue rectangle
    b.push(rect(x(0), y(m.price), x(p.q) - x(0), 160 - y(m.price), '#FBF0E9', 0));
    b.push(line(x(p.q), 160, x(p.q), y(m.price), INK, 1.5, '3 3'));
    b.push('<circle cx="' + x(p.q) + '" cy="' + y(m.price) + '" r="5.5" fill="' + INK + '"/>');
    b.push(txt(clamp(x(p.q) + 9, 0, 280), y(m.price) - 8, '$' + m.price.toFixed(1), { s: 9.5, f: INK }));
    // revenue curve underneath
    b.push(txt(46, 186, 'TOTAL REVENUE AT EACH QUANTITY', { s: 8, f: FAINT, ls: 0.8 }));
    var ry = scale(0, m.bestTr * 1.12, 272, 198), pts = [];
    for (var q = 0; q <= qmax; q += 1) pts.push(x(q).toFixed(1) + ',' + ry(priceAt(q, p.a) * q).toFixed(1));
    b.push(line(46, 272, 344, 272, AX));
    b.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + CLAY + '" stroke-width="2.5"/>');
    b.push(line(x(m.best), 272, x(m.best), ry(m.bestTr), OLIVE, 1.5, '3 3'));
    b.push(txt(clamp(x(m.best), 60, 300), ry(m.bestTr) - 7, 'peak $' + Math.round(m.bestTr), { a: 'middle', s: 9, f: '#5A6B45' }));
    b.push('<circle cx="' + x(p.q) + '" cy="' + ry(m.tr) + '" r="4.5" fill="' + INK + '"/>');
    b.push(txt(46, 288, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    return svg('0 0 360 296', b.join(''));
  }

  function params() { return { q: +el('tr-q').value, a: +el('tr-a').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('tr-q-v').textContent = p.q;
    el('tr-a-v').textContent = '$' + p.a;
    el('tr-fig').innerHTML = draw(p, m);
    el('tr-ro-p').textContent = '$' + m.price.toFixed(1);
    el('tr-ro-e').textContent = m.e.toFixed(2);
    el('tr-ro-cls').textContent = m.cls;
    el('tr-ro-tr').textContent = '$' + Math.round(m.tr).toLocaleString('en-US');
    el('tr-ro-peak').textContent = 'Q = ' + m.best;
    el('tr-ro-advice').textContent = m.advice;
    var note;
    if (m.cls === 'unit elastic') {
      note = '<strong>Unit elastic, and revenue is at its maximum ($' + Math.round(m.bestTr).toLocaleString('en-US') +
        ').</strong> Moving either way costs you money: the percentage gain on one side exactly offsets the loss on the other. ' +
        'Note this sits at the <em>midpoint</em> of the curve — half the choke price, half the maximum quantity — which is true of every linear demand curve.';
    } else if (m.cls === 'elastic') {
      note = '<strong>Elastic (|Ed| = ' + m.e.toFixed(2) + ').</strong> Buyers are responsive here, so a price <em>cut</em> raises revenue — ' +
        'the extra units more than pay for the lower margin. You are on the upper half of the curve, and revenue is still climbing toward its peak at Q = ' + m.best + '.';
    } else {
      note = '<strong>Inelastic (|Ed| = ' + m.e.toFixed(2) + ').</strong> Buyers are stuck, so a price <em>rise</em> raises revenue — ' +
        'you lose few sales and gain on every remaining one. You are past the peak at Q = ' + m.best +
        ', which means you are selling too many units too cheaply. Notice the slope never changed: only the elasticity did.';
    }
    el('tr-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['q', 'a'].forEach(function (k) { el('tr-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-tr'), [
    { t: 'Pick a quantity and the curve gives you the price. The <strong>slope is the same everywhere</strong> on this line — hold on to that.', lit: ['tr-ro-p'], v: function (m) { return '$' + m.price.toFixed(1); } },
    { t: 'Elasticity is <em>not</em> the slope: it is (1/slope) × (P/Q). High up, P is big and Q small, so the ratio is large.', lit: ['tr-ro-e', 'tr-ro-cls'], v: function (m) { return '|Ed| = ' + m.e.toFixed(2) + ' — ' + m.cls; } },
    { t: 'Total revenue is the shaded rectangle: price times quantity. Watch its area as you drag.', lit: ['tr-ro-tr'], v: function (m) { return '$' + Math.round(m.tr).toLocaleString('en-US'); } },
    { t: 'Revenue peaks exactly where |Ed| = 1 — found here by scanning the curve, not assumed. Above it demand is elastic, below it inelastic.', lit: ['tr-ro-peak'], v: function (m) { return 'Q = ' + m.best + ', revenue $' + Math.round(m.bestTr).toLocaleString('en-US'); } },
    { t: 'So the advice follows from the number alone: elastic → cut, inelastic → raise. You never need to guess which way revenue moves.', lit: ['tr-ro-advice'], v: function (m) { return m.advice; } }
  ], function () { return compute(params()); });
  render();
})();
