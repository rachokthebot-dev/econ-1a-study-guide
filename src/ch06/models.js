/* Inverse curves: demand P = a - Q/2, supply P = c + Q/4.
 * Defaults a = 60, c = 7.5 give P* = 25, Q* = 70 — the same market as Ch4. */
function eqOf(a, c) {
  var q = (a - c) / 0.75;
  return { q: q, p: a - q / 2 };
}
function csOf(a, price, q) { return (a - price) * q / 2; }         // triangle under demand
function psOf(c, price, q) { return (price - c) * q / 2; }         // triangle above supply

/* =================================================================
 * MODEL 1 — the two triangles at equilibrium.
 * ================================================================= */
(function () {
  function compute(p) {
    var e = eqOf(p.a, p.c);
    var cs = csOf(p.a, e.p, e.q), ps = psOf(p.c, e.p, e.q);
    return { p: e.p, q: e.q, cs: cs, ps: ps, ts: cs + ps, share: cs / (cs + ps) };
  }

  function draw(p, m) {
    var b = [], qm = Math.max(m.q * 1.5, 110), pm = p.a * 1.12;
    var x = scale(0, qm, 48, 340), y = scale(0, pm, 230, 24);
    b.push(line(48, 230, 344, 230, AX), line(48, 230, 48, 20, AX));
    b.push(txt(48, 248, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(txt(44, 18, 'PRICE', { a: 'end', s: 8, f: FAINT, ls: 0.8 }));
    // CS and PS as filled triangles
    b.push('<polygon points="' + x(0) + ',' + y(p.a) + ' ' + x(0) + ',' + y(m.p) + ' ' + x(m.q) + ',' + y(m.p) + '" fill="' + CLAY + '" opacity="0.72"/>');
    b.push('<polygon points="' + x(0) + ',' + y(p.c) + ' ' + x(0) + ',' + y(m.p) + ' ' + x(m.q) + ',' + y(m.p) + '" fill="' + OLIVE + '" opacity="0.68"/>');
    b.push(line(x(0), y(p.a), x(2 * p.a), y(0), CLAYD, 2.2));
    b.push(line(x(0), y(p.c), x(qm), y(p.c + qm / 4), '#5A6B45', 2.2));
    b.push(line(48, y(m.p), x(m.q), y(m.p), INK, 1.5, '3 3'));
    b.push(line(x(m.q), 230, x(m.q), y(m.p), INK, 1.5, '3 3'));
    b.push('<circle cx="' + x(m.q) + '" cy="' + y(m.p) + '" r="5" fill="' + INK + '"/>');
    b.push(txt(x(m.q * 0.26), y((p.a + m.p) / 2) + 4, 'CS', { a: 'middle', s: 11, f: '#fff' }));
    b.push(txt(x(m.q * 0.26), y((p.c + m.p) / 2) + 4, 'PS', { a: 'middle', s: 11, f: '#fff' }));
    b.push(txt(44, y(m.p) + 4, '$' + m.p.toFixed(0), { a: 'end', s: 9, f: INK }));
    b.push(txt(x(m.q), 244, m.q.toFixed(0), { a: 'middle', s: 9, f: INK }));
    // the split as one stacked bar
    b.push(txt(48, 272, 'HOW THE TOTAL SPLITS', { s: 8, f: FAINT, ls: 0.8 }));
    var w = 292, cw = w * m.share;
    b.push(rect(48, 280, cw, 18, CLAY, 0));
    b.push(rect(48 + cw, 280, w - cw, 18, OLIVE, 0));
    b.push(txt(48 + cw / 2, 293, Math.round(m.share * 100) + '%', { a: 'middle', s: 9.5, f: '#fff' }));
    b.push(txt(48 + cw + (w - cw) / 2, 293, Math.round((1 - m.share) * 100) + '%', { a: 'middle', s: 9.5, f: '#fff' }));
    return svg('0 0 360 306', b.join(''));
  }

  function params() { return { a: +el('sur-a').value, c: +el('sur-c').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('sur-a-v').textContent = '$' + p.a;
    el('sur-c-v').textContent = '$' + p.c;
    el('sur-fig').innerHTML = draw(p, m);
    el('sur-ro-p').textContent = '$' + m.p.toFixed(1);
    el('sur-ro-q').textContent = m.q.toFixed(0);
    el('sur-ro-cs').textContent = '$' + Math.round(m.cs).toLocaleString('en-US');
    el('sur-ro-ps').textContent = '$' + Math.round(m.ps).toLocaleString('en-US');
    el('sur-ro-ts').textContent = '$' + Math.round(m.ts).toLocaleString('en-US');
    el('sur-ro-sh').textContent = Math.round(m.share * 100) + '%';
    el('sur-note').innerHTML = '<strong>Total surplus $' + Math.round(m.ts).toLocaleString('en-US') +
      ', split ' + Math.round(m.share * 100) + '/' + Math.round((1 - m.share) * 100) + ' between buyers and sellers.</strong> ' +
      'Buyers capture the gap between what they would have paid and the $' + m.p.toFixed(0) + ' they did pay; ' +
      'sellers capture the gap between that price and their costs. Raise the choke price and the demand curve ' +
      'steepens away from the price line, so the buyers\' triangle grows — the market creates more value and ' +
      'buyers take more of it. Note that no unit past ' + m.q.toFixed(0) + ' is worth making: beyond there, cost exceeds what anyone will pay.';
    if (st) st.refresh();
  }
  ['a', 'c'].forEach(function (k) { el('sur-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-sur'), [
    { t: 'The demand curve is a <strong>sorted list of valuations</strong> — keenest buyer first. Everyone above the price line pays less than the unit was worth to them.', lit: ['sur-ro-cs'], v: function (m) { return '$' + Math.round(m.cs).toLocaleString('en-US') + ' of consumer surplus'; } },
    { t: 'Supply is the same list for sellers, cheapest first. Everyone below the price line is paid more than the unit cost them.', lit: ['sur-ro-ps'], v: function (m) { return '$' + Math.round(m.ps).toLocaleString('en-US') + ' of producer surplus'; } },
    { t: 'Add them for <strong>total surplus</strong> — the value this market created out of differences in valuation, exactly as in Chapter 1 but with many traders.', lit: ['sur-ro-ts'], v: function (m) { return '$' + Math.round(m.ts).toLocaleString('en-US') + ' in total'; } },
    { t: 'The equilibrium quantity maximises it. Every unit before it has value above cost; every unit after costs more than it is worth. That is MB = MC at market scale.', lit: ['sur-ro-q'], v: function (m) { return 'maximised at Q = ' + m.q.toFixed(0); } },
    { t: 'Efficiency says nothing about the <strong>split</strong>. Move the sliders: the total can grow while one side takes a smaller share. Fairness is a separate, normative question.', lit: ['sur-ro-sh'], v: function (m) { return 'buyers take ' + Math.round(m.share * 100) + '%'; } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — a legal price. Binding or not, the short side, both
 * surpluses by integration, and deadweight loss as the surplus that
 * is simply never created.
 * ================================================================= */
(function () {
  var A = 60, C = 7.5, E = eqOf(A, C), TS0 = csOf(A, E.p, E.q) + psOf(C, E.p, E.q);

  function compute(p) {
    var binds = p.floor ? p.p > E.p : p.p < E.p;
    if (!binds) {
      return { binds: false, price: E.p, q: E.q, gap: 0,
               cs: csOf(A, E.p, E.q), ps: psOf(C, E.p, E.q), dwl: 0 };
    }
    var qd = 2 * (A - p.p), qs = 4 * (p.p - C);      // from the inverse curves
    var q = Math.min(qd, qs);
    // areas between each curve and the controlled price, over the units traded
    var cs = (A - p.p) * q - q * q / 4;
    var ps = (p.p - C) * q - q * q / 8;
    return { binds: true, price: p.p, q: q, gap: qd - qs, cs: cs, ps: ps, dwl: TS0 - cs - ps };
  }

  function draw(p, m) {
    var b = [], x = scale(0, 110, 48, 340), y = scale(0, 66, 232, 24);
    b.push(line(48, 232, 344, 232, AX), line(48, 232, 48, 20, AX));
    b.push(txt(48, 250, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    if (m.binds) {
      b.push('<polygon points="' + x(0) + ',' + y(A) + ' ' + x(0) + ',' + y(m.price) + ' ' + x(m.q) + ',' + y(m.price) + ' ' + x(m.q) + ',' + y(A - m.q / 2) + '" fill="' + CLAY + '" opacity="0.72"/>');
      b.push('<polygon points="' + x(0) + ',' + y(C) + ' ' + x(0) + ',' + y(m.price) + ' ' + x(m.q) + ',' + y(m.price) + ' ' + x(m.q) + ',' + y(C + m.q / 4) + '" fill="' + OLIVE + '" opacity="0.68"/>');
      // the deadweight-loss triangle, between the curves from q to q*
      b.push('<polygon points="' + x(m.q) + ',' + y(A - m.q / 2) + ' ' + x(m.q) + ',' + y(C + m.q / 4) + ' ' + x(E.q) + ',' + y(E.p) + '" fill="#141413" opacity="0.5"/>');
      b.push(txt(x((m.q + E.q) / 2) + 14, y(E.p) + 2, 'DWL', { s: 9.5, f: INK }));
    } else {
      b.push('<polygon points="' + x(0) + ',' + y(A) + ' ' + x(0) + ',' + y(E.p) + ' ' + x(E.q) + ',' + y(E.p) + '" fill="' + CLAY + '" opacity="0.72"/>');
      b.push('<polygon points="' + x(0) + ',' + y(C) + ' ' + x(0) + ',' + y(E.p) + ' ' + x(E.q) + ',' + y(E.p) + '" fill="' + OLIVE + '" opacity="0.68"/>');
    }
    b.push(line(x(0), y(A), x(110), y(A - 55), CLAYD, 2.2));
    b.push(line(x(0), y(C), x(110), y(C + 27.5), '#5A6B45', 2.2));
    b.push(line(48, y(E.p), 340, y(E.p), AX, 1.5, '3 3'));
    b.push(txt(344, y(E.p) - 4, 'P* $25', { a: 'end', s: 8.5, f: FAINT }));
    b.push(line(48, y(p.p), 340, y(p.p), m.binds ? INK : FAINT, m.binds ? 2.5 : 1.5, m.binds ? '' : '2 3'));
    b.push(txt(52, y(p.p) - 6, (p.floor ? 'floor' : 'ceiling') + ' $' + p.p, { s: 9.5, f: m.binds ? INK : FAINT }));
    b.push(line(x(m.q), 232, x(m.q), y(m.price), INK, 1.5, '3 3'));
    b.push(txt(x(m.q), 246, m.q.toFixed(0), { a: 'middle', s: 9, f: INK }));
    return svg('0 0 360 258', b.join(''));
  }

  function params() { return { p: +el('pc-p').value, floor: el('pc-floor').checked }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('pc-p-v').textContent = '$' + p.p;
    el('pc-fig').innerHTML = draw(p, m);
    el('pc-ro-bind').textContent = m.binds ? 'binding' : 'not binding';
    el('pc-ro-q').textContent = m.q.toFixed(0);
    el('pc-ro-gap').textContent = !m.binds ? 'none'
      : (m.gap > 0 ? 'shortage ' : 'surplus ') + Math.abs(m.gap).toFixed(0);
    el('pc-ro-cs').textContent = '$' + Math.round(m.cs).toLocaleString('en-US');
    el('pc-ro-ps').textContent = '$' + Math.round(m.ps).toLocaleString('en-US');
    el('pc-ro-dwl').textContent = '$' + Math.round(m.dwl).toLocaleString('en-US');
    var note;
    if (!m.binds) {
      note = '<strong>Not binding — the market ignores it.</strong> A ' + (p.floor ? 'floor' : 'ceiling') +
        ' at $' + p.p + ' sits ' + (p.floor ? 'below' : 'above') + ' the $25 equilibrium, so the price the market ' +
        'wanted is already legal. Nothing changes: same quantity, same surpluses, no deadweight loss. Half the marks on ' +
        'control questions come from spotting this case rather than reflexively drawing a shortage.';
    } else if (p.floor) {
      note = '<strong>Binding floor: a surplus of ' + Math.abs(m.gap).toFixed(0) + ' units.</strong> ' +
        'Sellers would supply far more at $' + p.p + ' than buyers will take, so only ' + m.q.toFixed(0) +
        ' units trade — limited by <em>buyers</em> now. Sellers who still sell get a better price, but ' +
        '$' + Math.round(m.dwl).toLocaleString('en-US') + ' of surplus is destroyed outright on the trades that no longer happen. ' +
        'This is the minimum-wage diagram, with hours on the horizontal axis.';
    } else {
      note = '<strong>Binding ceiling: a shortage of ' + Math.abs(m.gap).toFixed(0) + ' units.</strong> ' +
        'Only ' + m.q.toFixed(0) + ' units get made, against 70 before. Two separate things happened: surplus was ' +
        '<em>transferred</em> from sellers to the buyers lucky enough to still buy, and $' +
        Math.round(m.dwl).toLocaleString('en-US') + ' was <em>destroyed</em> — the dark triangle, which nobody receives. ' +
        'Only that second part is the loss to society, and keeping the two apart is where the marks are.';
    }
    el('pc-note').innerHTML = note;
    if (st) st.refresh();
  }
  el('pc-p').addEventListener('input', render);
  el('pc-floor').addEventListener('change', render);
  st = Stepper(el('ap-pc'), [
    { t: 'First: does it <strong>bind</strong>? A ceiling only bites below the equilibrium price; a floor only bites above it.', lit: ['pc-ro-bind'], v: function (m) { return m.binds ? 'yes — the market cannot reach $25' : 'no — $25 is still legal'; } },
    { t: 'If it binds, trade is capped by the <strong>short side</strong>: whichever of quantity demanded and quantity supplied is smaller at the legal price.', lit: ['pc-ro-q', 'pc-ro-gap'], v: function (m) { return m.q.toFixed(0) + ' units trade'; } },
    { t: 'Recompute both surpluses over just those units. Some surplus has <em>moved</em> between buyers and sellers — a transfer, not a loss.', lit: ['pc-ro-cs', 'pc-ro-ps'], v: function (m) { return 'CS $' + Math.round(m.cs).toLocaleString('en-US') + ' · PS $' + Math.round(m.ps).toLocaleString('en-US'); } },
    { t: 'What is left over is <strong>deadweight loss</strong>: surplus that used to exist and now exists nowhere, because trades worth making were blocked.', lit: ['pc-ro-dwl'], v: function (m) { return '$' + Math.round(m.dwl).toLocaleString('en-US') + ' destroyed'; } }
  ], function () { return compute(params()); });
  render();
})();
