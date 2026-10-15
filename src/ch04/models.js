/* Shared market: Qd = A - 2P, Qs = -30 + 4P + C. Baseline A = 120, C = 0
 * gives P* = 25, Q* = 70. Both models below solve the same linear system. */
var MKT = { A: 120, B: 2, C: -30, D: 4 };
function mktEq(a, c) {
  var p = (a - c) / (MKT.B + MKT.D);
  return { p: p, q: a - MKT.B * p };
}

/* =================================================================
 * MODEL 1 — one shifter at a time, and the new crossing.
 * ================================================================= */
(function () {
  var BASE = mktEq(MKT.A, MKT.C);

  function compute(p) {
    var dShift = p.inc + p.sub;            // demand shifters, net
    var sShift = p.tec - p.in;             // supply shifters, net
    var a = MKT.A + dShift, c = MKT.C + sShift;
    var e = mktEq(a, c);
    return {
      a: a, c: c, dShift: dShift, sShift: sShift, p: e.p, q: e.q,
      dp: e.p - BASE.p, dq: e.q - BASE.q,
      dLab: dShift === 0 ? 'unmoved' : dShift > 0 ? 'shifted right' : 'shifted left',
      sLab: sShift === 0 ? 'unmoved' : sShift > 0 ? 'shifted right' : 'shifted left',
      both: dShift !== 0 && sShift !== 0
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, 150, 46, 338), y = scale(0, 50, 228, 24);
    b.push(line(46, 228, 344, 228, AX), line(46, 228, 46, 20, AX));
    b.push(txt(46, 246, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(txt(42, 18, 'PRICE', { a: 'end', s: 8, f: FAINT, ls: 0.8 }));
    function dline(a, c, dash, col, w) {
      // demand: Q = a - BP  -> P from 0..50 ; supply: Q = c + DP
      var p0 = 0, p1 = 50;
      var d = [x(a - MKT.B * p0) + ',' + y(p0), x(a - MKT.B * p1) + ',' + y(p1)];
      var s = [x(c + MKT.D * p0) + ',' + y(p0), x(c + MKT.D * p1) + ',' + y(p1)];
      return '<polyline points="' + d.join(' ') + '" fill="none" stroke="' + col[0] + '" stroke-width="' + w + '"' + dash + '/>' +
             '<polyline points="' + s.join(' ') + '" fill="none" stroke="' + col[1] + '" stroke-width="' + w + '"' + dash + '/>';
    }
    if (m.dShift || m.sShift) b.push(dline(MKT.A, MKT.C, ' stroke-dasharray="4 3"', [AX, AX], 1.8));
    b.push(dline(m.a, m.c, '', [CLAY, OLIVE], 2.5));
    b.push(line(46, y(m.p), x(m.q), y(m.p), INK, 1.2, '3 3'));
    b.push(line(x(m.q), 228, x(m.q), y(m.p), INK, 1.2, '3 3'));
    b.push('<circle cx="' + x(m.q) + '" cy="' + y(m.p) + '" r="5" fill="' + INK + '"/>');
    b.push(txt(x(m.q) + 9, y(m.p) - 7, '$' + m.p.toFixed(1) + ', ' + m.q.toFixed(0), { s: 9.5, f: INK }));
    if (m.dShift || m.sShift) {
      b.push('<circle cx="' + x(BASE.q) + '" cy="' + y(BASE.p) + '" r="4" fill="none" stroke="' + FAINT + '" stroke-width="1.5"/>');
      b.push(txt(x(BASE.q) - 8, y(BASE.p) + 14, 'was', { a: 'end', s: 8.5, f: FAINT }));
    }
    b.push(txt(338, y(48), 'D', { a: 'end', s: 10, f: CLAYD }));
    b.push(txt(338, y(2) - 4, 'S', { a: 'end', s: 10, f: '#5A6B45' }));
    return svg('0 0 360 254', b.join(''));
  }

  function params() {
    return { inc: +el('sd-inc').value, sub: +el('sd-sub').value, in: +el('sd-in').value, tec: +el('sd-tec').value };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    ['inc', 'sub', 'in', 'tec'].forEach(function (k) {
      el('sd-' + k + '-v').textContent = (p[k] > 0 ? '+' : '') + p[k];
    });
    el('sd-fig').innerHTML = draw(p, m);
    el('sd-ro-p').textContent = '$' + m.p.toFixed(1);
    el('sd-ro-q').textContent = m.q.toFixed(0);
    el('sd-ro-d').textContent = m.dLab;
    el('sd-ro-s').textContent = m.sLab;
    el('sd-ro-dp').textContent = (m.dp >= 0 ? '+' : '') + m.dp.toFixed(1);
    el('sd-ro-dq').textContent = (m.dq >= 0 ? '+' : '') + m.dq.toFixed(0);
    var note;
    if (!m.dShift && !m.sShift) {
      note = 'Baseline: <strong>$25 and 70 units</strong>. Move one slider at a time first — the point is to see which curve answers and which one merely slides along itself.';
    } else if (!m.both) {
      var moved = m.dShift ? 'Demand' : 'Supply', still = m.dShift ? 'supply' : 'demand';
      note = '<strong>' + moved + ' ' + (m.dShift ? m.dLab : m.sLab) + ' — and only that curve moved.</strong> ' +
        'The ' + still + ' curve is exactly where it was, yet the quantity ' + (m.dq >= 0 ? 'supplied rose' : 'supplied fell') +
        ' anyway. That is a <em>movement along</em> the ' + still + ' curve, caused by the new price. Name it that way in an answer: one curve shifted, the other was travelled along.';
    } else {
      var sameDir = (m.dShift > 0) === (m.sShift > 0);
      note = '<strong>Both curves moved.</strong> ' + (sameDir
        ? 'They shifted the same way, so <em>quantity</em> is determinate and the price change depends on which shift was bigger.'
        : 'They shifted opposite ways, so <em>price</em> is determinate and the quantity change depends on which shift was bigger.') +
        ' This model happens to know both magnitudes, so it can show you an answer — an exam question usually will not, and the correct response there is to name which variable is ambiguous.';
    }
    el('sd-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['inc', 'sub', 'in', 'tec'].forEach(function (k) { el('sd-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-sd'), [
    { t: 'First ask <strong>which curve</strong>. Income and the price of a substitute reach buyers, so they move demand. Input costs and technology reach sellers, so they move supply.', lit: ['sd-ro-d', 'sd-ro-s'], v: function (m) { return 'D ' + m.dLab + ' · S ' + m.sLab; } },
    { t: 'Then <strong>which direction</strong> — more or less at every price. Watch the dashed original stay put for comparison.', lit: [], v: function (m) { return 'demand ' + (m.dShift > 0 ? '+' : '') + m.dShift + ' · supply ' + (m.sShift > 0 ? '+' : '') + m.sShift; } },
    { t: 'Now read the <strong>new crossing</strong>. Solve Qd = Qs rather than eyeballing it: the price that clears the market is where the two expressions are equal.', lit: ['sd-ro-p', 'sd-ro-q'], v: function (m) { return '$' + m.p.toFixed(1) + ' and ' + m.q.toFixed(0) + ' units'; } },
    { t: 'Finally state <strong>both</strong> changes. An answer that gives the new price and forgets the quantity throws away half the marks.', lit: ['sd-ro-dp', 'sd-ro-dq'], v: function (m) { return 'price ' + (m.dp >= 0 ? '+' : '') + m.dp.toFixed(1) + ', quantity ' + (m.dq >= 0 ? '+' : '') + m.dq.toFixed(0); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — away from equilibrium. The gap is computed in units, and
 * trade is capped by the short side of the market.
 * ================================================================= */
(function () {
  var E = mktEq(MKT.A, MKT.C);

  function compute(p) {
    var qd = MKT.A - MKT.B * p.p, qs = MKT.C + MKT.D * p.p;
    var gap = qd - qs;
    return {
      qd: qd, qs: qs, gap: gap,
      kind: Math.abs(gap) < 0.5 ? 'equilibrium' : gap > 0 ? 'shortage' : 'surplus',
      traded: Math.min(qd, qs), off: p.p - E.p
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, 150, 46, 338), y = scale(0, 50, 228, 24);
    b.push(line(46, 228, 344, 228, AX), line(46, 228, 46, 20, AX));
    b.push(txt(46, 246, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    var d0 = x(MKT.A), d1 = x(MKT.A - MKT.B * 50);
    b.push('<polyline points="' + d0 + ',' + y(0) + ' ' + d1 + ',' + y(50) + '" fill="none" stroke="' + CLAY + '" stroke-width="2.5"/>');
    b.push('<polyline points="' + x(MKT.C) + ',' + y(0) + ' ' + x(MKT.C + MKT.D * 50) + ',' + y(50) + '" fill="none" stroke="' + OLIVE + '" stroke-width="2.5"/>');
    b.push('<circle cx="' + x(E.q) + '" cy="' + y(E.p) + '" r="4" fill="none" stroke="' + FAINT + '" stroke-width="1.5"/>');
    // the price line and the gap it opens
    b.push(line(46, y(p.p), 338, y(p.p), INK, 2));
    b.push(txt(50, y(p.p) - 6, '$' + p.p, { s: 9.5, f: INK }));
    if (m.kind !== 'equilibrium') {
      var lo = Math.min(x(m.qd), x(m.qs)), hi = Math.max(x(m.qd), x(m.qs));
      b.push(rect(lo, y(p.p) - 7, hi - lo, 14, m.gap > 0 ? '#FCEEE3' : '#F2F5EE', 2));
      b.push(line(lo, y(p.p), hi, y(p.p), m.gap > 0 ? CLAY : OLIVE, 3));
      b.push(txt((lo + hi) / 2, y(p.p) - 12, m.kind + ' ' + Math.abs(m.gap).toFixed(0),
        { a: 'middle', s: 9.5, f: m.gap > 0 ? CLAYD : '#5A6B45' }));
      // which way price is pushed
      var ay = y(p.p), dir = m.gap > 0 ? -1 : 1;
      b.push(line(320, ay, 320, ay + dir * 22, INK, 2));
      b.push('<polygon points="320,' + (ay + dir * 28) + ' 315,' + (ay + dir * 20) + ' 325,' + (ay + dir * 20) + '" fill="' + INK + '"/>');
    }
    b.push('<circle cx="' + x(m.qd) + '" cy="' + y(p.p) + '" r="4" fill="' + CLAYD + '"/>');
    b.push('<circle cx="' + x(m.qs) + '" cy="' + y(p.p) + '" r="4" fill="#5A6B45"/>');
    b.push(txt(338, y(48), 'D', { a: 'end', s: 10, f: CLAYD }));
    b.push(txt(338, y(2) - 4, 'S', { a: 'end', s: 10, f: '#5A6B45' }));
    return svg('0 0 360 254', b.join(''));
  }

  function params() { return { p: +el('eq-p').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('eq-p-v').textContent = '$' + p.p;
    el('eq-fig').innerHTML = draw(p, m);
    el('eq-ro-qd').textContent = m.qd.toFixed(0);
    el('eq-ro-qs').textContent = m.qs.toFixed(0);
    el('eq-ro-gap').textContent = m.kind === 'equilibrium' ? 'none' : m.kind + ' ' + Math.abs(m.gap).toFixed(0);
    el('eq-ro-tr').textContent = m.traded.toFixed(0);
    el('eq-ro-dir').textContent = m.kind === 'equilibrium' ? 'at rest' : m.gap > 0 ? 'upward' : 'downward';
    el('eq-ro-off').textContent = (m.off >= 0 ? '+$' : '−$') + Math.abs(m.off).toFixed(0);
    var note;
    if (m.kind === 'equilibrium') {
      note = '<strong>The market clears.</strong> Every buyer willing to pay $25 finds a seller and every seller willing to accept $25 finds a buyer, so nothing pushes the price either way. Quantity demanded equals quantity supplied — that equality <em>is</em> the definition.';
    } else if (m.gap > 0) {
      note = '<strong>Shortage of ' + m.gap.toFixed(0) + ' units.</strong> At $' + p.p + ' buyers want ' +
        m.qd.toFixed(0) + ' but sellers offer only ' + m.qs.toFixed(0) + ', so just ' + m.traded.toFixed(0) +
        ' units change hands — trade is capped by the <em>short</em> side. Disappointed buyers bid the price up, and the gap closes as the price climbs toward $25.';
    } else {
      note = '<strong>Surplus of ' + (-m.gap).toFixed(0) + ' units.</strong> At $' + p.p + ' sellers offer ' +
        m.qs.toFixed(0) + ' but buyers take only ' + m.qd.toFixed(0) + ', so ' + m.traded.toFixed(0) +
        ' units sell and the rest sits unsold. Sellers cut the price, and the gap closes as the price falls toward $25.';
    }
    el('eq-note').innerHTML = note;
    if (st) st.refresh();
  }
  el('eq-p').addEventListener('input', render);
  st = Stepper(el('ap-eq'), [
    { t: 'Pick any price and read <strong>both</strong> curves at it. These are quantity demanded and quantity supplied — two different numbers unless you are at equilibrium.', lit: ['eq-ro-qd', 'eq-ro-qs'], v: function (m) { return m.qd.toFixed(0) + ' wanted vs ' + m.qs.toFixed(0) + ' offered'; } },
    { t: 'The difference is the shortage or surplus, <strong>measured in units at that price</strong>. A gap with no price attached is not an answer.', lit: ['eq-ro-gap'], v: function (m) { return m.kind === 'equilibrium' ? 'no gap' : Math.abs(m.gap).toFixed(0) + ' units of ' + m.kind; } },
    { t: 'Trade is limited by whichever side is smaller — nobody can buy what is not offered, and nobody can sell what is not wanted.', lit: ['eq-ro-tr'], v: function (m) { return m.traded.toFixed(0) + ' units actually trade'; } },
    { t: 'The disappointed side pushes the price. Shortage pushes it <strong>up</strong>, surplus pushes it <strong>down</strong>, and both move toward the crossing.', lit: ['eq-ro-dir'], v: function (m) { return m.kind === 'equilibrium' ? 'no pressure' : 'price pushed ' + (m.gap > 0 ? 'up' : 'down'); } }
  ], function () { return compute(params()); });
  render();
})();
