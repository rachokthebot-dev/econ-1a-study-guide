/* Both curves pivot around the same no-control equilibrium, P* = $40,
 * Q* = 60, so switching to the long run changes elasticity and nothing
 * else. Short run: demand P = 100 - Q, supply P = 10 + 0.5Q. */
var PCP = 40, PCQ = 60, PCB = 1, PCD = 0.5, PCLR = 2.5;

/* =================================================================
 * MODEL 1 — a price control, ceiling or floor, short run or long run.
 * Rationing is assumed efficient (the units that trade go to the
 * highest-value buyers and come from the lowest-cost sellers), so the
 * deadweight loss shown is the smallest the control can cause.
 * ================================================================= */
(function () {
  function compute(p) {
    var k = p.lr ? PCLR : 1, b = PCB / k, d = PCD / k;
    function D(q) { return PCP - b * (q - PCQ); }
    function S(q) { return PCP + d * (q - PCQ); }
    var cs0 = 0.5 * (D(0) - PCP) * PCQ, ps0 = 0.5 * (PCP - S(0)) * PCQ;
    var binding = p.floor ? p.price > PCP : p.price < PCP;
    var pr = binding ? p.price : PCP;
    var qd = Math.max(0, PCQ + (PCP - pr) / b), qs = Math.max(0, PCQ + (pr - PCP) / d);
    var q = Math.min(qd, qs);
    // areas under linear curves over [0, q]: trapezoids
    var cs = q * (D(0) + D(q)) / 2 - pr * q;
    var ps = pr * q - q * (S(0) + S(q)) / 2;
    return {
      b: b, d: d, D0: D(0), S0: S(0), binding: binding, pr: pr,
      qd: qd, qs: qs, q: q, gap: Math.abs(qd - qs), short: qd > qs,
      bm: !p.floor && binding ? D(q) : null, Dq: D(q), Sq: S(q),
      cs: cs, ps: ps, cs0: cs0, ps0: ps0, dwl: cs0 + ps0 - cs - ps
    };
  }

  function draw(p, m) {
    var bx = [], qm = Math.max(m.qd, m.qs, 120) * 1.08, pm = 105;
    var x = scale(0, qm, 48, 340), y = scale(0, pm, 230, 20);
    bx.push(line(48, 230, 344, 230, AX), line(48, 230, 48, 16, AX));
    bx.push(txt(48, 248, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(txt(52, 26, 'PRICE', { s: 8, f: FAINT, ls: 0.8 }));
    var dEnd = Math.min(qm, m.D0 / m.b);
    // surplus areas, from the computed corner points
    if (m.q > 0) {
      bx.push('<polygon points="' + x(0) + ',' + y(m.D0) + ' ' + x(m.q) + ',' + y(m.Dq) + ' ' + x(m.q) + ',' + y(m.pr) + ' ' + x(0) + ',' + y(m.pr) + '" fill="' + CLAY + '" opacity="0.22"/>');
      bx.push('<polygon points="' + x(0) + ',' + y(m.pr) + ' ' + x(m.q) + ',' + y(m.pr) + ' ' + x(m.q) + ',' + y(m.Sq) + ' ' + x(0) + ',' + y(Math.max(0, m.S0)) + '" fill="' + OLIVE + '" opacity="0.25"/>');
    }
    if (m.binding) {
      bx.push('<polygon points="' + x(m.q) + ',' + y(m.Dq) + ' ' + x(PCQ) + ',' + y(PCP) + ' ' + x(m.q) + ',' + y(m.Sq) + '" fill="' + INK + '" opacity="0.5"/>');
      if (x(PCQ) - x(m.q) > 30)   // label at the centroid, only when it fits
        bx.push(txt((2 * x(m.q) + x(PCQ)) / 3, (y(m.Dq) + y(PCP) + y(m.Sq)) / 3 + 3, 'DWL', { a: 'middle', s: 8.5, f: '#fff' }));
    }
    bx.push(line(x(0), y(m.D0), x(dEnd), y(m.D0 - m.b * dEnd), CLAYD, 2.2));
    var sEnd = Math.min(qm, (pm - m.S0) / m.d);
    bx.push(line(x(0), y(m.S0), x(sEnd), y(m.S0 + m.d * sEnd), '#5A6B45', 2.2));
    bx.push(txt(x(dEnd) - 4, y(m.D0 - m.b * dEnd) - 6, 'D', { a: 'end', s: 10, f: CLAYD }));
    bx.push(txt(x(sEnd) - 4, y(m.S0 + m.d * sEnd) + 14, 'S', { a: 'end', s: 10, f: '#5A6B45' }));
    // the control line
    bx.push(line(48, y(p.price), 344, y(p.price), m.binding ? INK : FAINT, m.binding ? 2 : 1.3, '5 4'));
    bx.push(txt(44, y(p.price) + 4, '$' + p.price, { a: 'end', s: 9, f: INK }));
    bx.push(txt(340, y(p.price) - 6, (p.floor ? 'floor' : 'ceiling') + (m.binding ? '' : ' (not binding)'), { a: 'end', s: 8.5, f: m.binding ? INK : FAINT }));
    bx.push('<circle cx="' + x(PCQ) + '" cy="' + y(PCP) + '" r="4" fill="none" stroke="' + FAINT + '" stroke-width="1.5"/>');
    if (m.binding) {
      [m.qd, m.qs].forEach(function (v) { bx.push(line(x(v), 230, x(v), y(m.pr), AX, 1.2, '3 3')); });
      bx.push(txt(x(m.qd), 242, 'Qd ' + Math.round(m.qd), { a: 'middle', s: 8.5, f: CLAYD }));
      bx.push(txt(x(m.qs), 242, 'Qs ' + Math.round(m.qs), { a: 'middle', s: 8.5, f: '#5A6B45' }));
      // the gap, drawn along the control line
      var gy = y(m.pr) + (p.floor ? -12 : 12);
      bx.push(line(x(Math.min(m.qd, m.qs)), gy, x(Math.max(m.qd, m.qs)), gy, CLAY, 3));
      bx.push(txt((x(m.qd) + x(m.qs)) / 2, gy + (p.floor ? -6 : 14), (m.short ? 'shortage ' : 'surplus ') + fq(m.gap), { a: 'middle', s: 9, f: CLAYD }));
    }
    return svg('0 0 360 256', bx.join(''));
  }

  function fq(v) { return String(+v.toFixed(1)); }
  function usd(v) { return '$' + Math.round(v).toLocaleString('en-US'); }
  function params() { return { price: +el('pc-p').value, floor: el('pc-floor').checked, lr: el('pc-lr').checked }; }

  var st;
  function render() {
    var p = params(), m = compute(p);
    el('pc-p-v').textContent = '$' + p.price;
    el('pc-fig').innerHTML = draw(p, m);
    el('pc-ro-qd').textContent = fq(m.qd);
    el('pc-ro-qs').textContent = fq(m.qs);
    el('pc-rl-gap').textContent = !m.binding ? 'Shortage / surplus' : m.short ? 'Shortage' : 'Surplus';
    el('pc-ro-gap').textContent = fq(m.gap);
    el('pc-ro-q').textContent = fq(m.q);
    el('pc-ro-bm').textContent = m.bm === null ? '—' : '$' + fq(m.bm);
    el('pc-ro-cs').textContent = usd(m.cs);
    el('pc-ro-ps').textContent = usd(m.ps);
    el('pc-ro-dwl').textContent = usd(m.dwl);
    var kind = p.floor ? 'floor' : 'ceiling', note;
    if (!m.binding) {
      note = '<strong>Not binding.</strong> A ' + kind + ' at $' + p.price + ' sits ' + (p.floor ? 'below' : 'above') +
        ' the $' + PCP + ' equilibrium, so the market clears at $' + PCP + ' exactly as if the law did not exist. A ' + kind +
        ' only bites when it is set ' + (p.floor ? '<em>above</em>' : '<em>below</em>') + ' equilibrium.';
    } else if (!p.floor) {
      note = '<strong>A shortage of ' + fq(m.gap) + ' units.</strong> At $' + p.price + ' buyers want ' + fq(m.qd) +
        ' but sellers offer only ' + fq(m.qs) + ' — and the short side always wins, so only ' + fq(m.q) +
        ' change hands. Someone holding one of them could resell it for $' + fq(m.bm) +
        ', which is why black markets appear. ' + (p.lr
          ? 'This is the <em>long run</em>: both curves are flatter, so the same ceiling produces a far bigger shortage and a $' + Math.round(m.dwl).toLocaleString('en-US') + ' deadweight loss.'
          : 'Now tick <em>long run</em> and watch the same ceiling do much more damage.');
    } else {
      note = '<strong>A surplus of ' + fq(m.gap) + ' units.</strong> At $' + p.price + ' sellers offer ' + fq(m.qs) +
        ' but buyers take only ' + fq(m.qd) + ', so ' + fq(m.q) + ' trade and the rest go unsold — unless a government buys them, at a cost of $' +
        Math.round(m.gap * p.price).toLocaleString('en-US') + '. Sellers who still sell are better off; the ' + fq(PCQ - m.q) +
        ' trades that vanished are the $' + Math.round(m.dwl).toLocaleString('en-US') + ' deadweight loss.' +
        (p.lr ? ' In the long run the surplus is larger, because supply has had time to expand.' : '');
    }
    el('pc-note').innerHTML = note;
    if (st) st.refresh();
  }
  el('pc-p').addEventListener('input', render);
  el('pc-floor').addEventListener('change', render);
  el('pc-lr').addEventListener('change', render);
  st = Stepper(el('ap-pc'), [
    { t: 'First question, always: is it binding? A ceiling binds only <strong>below</strong> equilibrium; a floor only <strong>above</strong>.', lit: [], v: function (m) { return m.binding ? 'binding at $' + m.pr : 'not binding — market clears at $' + PCP; } },
    { t: 'At the controlled price, read quantity demanded and quantity supplied off the two curves. They no longer match.', lit: ['pc-ro-qd', 'pc-ro-qs'], v: function (m) { return 'Qd ' + fq(m.qd) + ', Qs ' + fq(m.qs); } },
    { t: 'The gap is the shortage (ceiling) or surplus (floor). The quantity that actually trades is the <strong>smaller</strong> of the two — nobody can be forced to buy or sell.', lit: ['pc-ro-gap', 'pc-ro-q'], v: function (m) { return 'gap ' + fq(m.gap) + ', traded ' + fq(m.q); } },
    { t: 'Under a ceiling, the last unit supplied is worth more to buyers than the legal price. That gap is the black-market price.', lit: ['pc-ro-bm'], v: function (m) { return m.bm === null ? 'no black-market premium here' : 'buyers would pay $' + fq(m.bm); } },
    { t: 'Surplus is re-split, and the trades that stopped are lost to everyone: that triangle is the deadweight loss.', lit: ['pc-ro-cs', 'pc-ro-ps', 'pc-ro-dwl'], v: function (m) { return 'CS ' + usd(m.cs) + ', PS ' + usd(m.ps) + ', DWL ' + usd(m.dwl); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — a minimum wage. Labour supply W = 4 + 0.08L is fixed;
 * labour demand pivots around the equilibrium (L* = 100k workers,
 * W* = $12) so its elasticity is the one thing the learner changes.
 * ================================================================= */
var MWW = 12, MWL = 100, MWC = 4, MWD = 0.08;
(function () {
  function compute(p) {
    var binding = p.w > MWW, w = binding ? p.w : MWW;
    var ld = binding ? Math.max(0, MWL - (w - MWW) / p.b) : MWL;
    var ls = binding ? (w - MWC) / MWD : MWL;
    return {
      binding: binding, w: w, ld: ld, ls: ls, unemp: ls - ld, lost: MWL - ld, entrants: ls - MWL,
      bill: w * ld, bill0: MWW * MWL, el: (1 / p.b) * (MWW / MWL)
    };
  }

  function draw(p, m) {
    var bx = [], lm = 210, wm = 25;
    var x = scale(0, lm, 48, 340), y = scale(0, wm, 230, 20);
    bx.push(line(48, 230, 344, 230, AX), line(48, 230, 48, 16, AX));
    bx.push(txt(48, 248, 'WORKERS (THOUSANDS) →', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(txt(52, 26, 'WAGE $/HR', { s: 8, f: FAINT, ls: 0.8 }));
    // wage bill rectangle for the employed
    bx.push('<rect x="' + x(0) + '" y="' + y(m.w) + '" width="' + (x(m.ld) - x(0)) + '" height="' + (230 - y(m.w)) + '" fill="' + OLIVE + '" opacity="0.18"/>');
    var d0 = MWW + p.b * MWL, dEnd = Math.min(lm, d0 / p.b), dStart = Math.max(0, (d0 - wm) / p.b);
    bx.push(line(x(dStart), y(d0 - p.b * dStart), x(dEnd), y(d0 - p.b * dEnd), CLAYD, 2.2));
    var sEnd = Math.min(lm, (wm - MWC) / MWD);
    bx.push(line(x(0), y(MWC), x(sEnd), y(MWC + MWD * sEnd), '#5A6B45', 2.2));
    bx.push(txt(x(dEnd) - 4, y(d0 - p.b * dEnd) - 6, 'labour demand', { a: 'end', s: 8.5, f: CLAYD }));
    bx.push(txt(x(sEnd) - 4, y(MWC + MWD * sEnd) + 14, 'labour supply', { a: 'end', s: 8.5, f: '#5A6B45' }));
    bx.push(line(48, y(p.w), 344, y(p.w), m.binding ? INK : FAINT, m.binding ? 2 : 1.3, '5 4'));
    bx.push(txt(44, y(p.w) + 4, '$' + p.w, { a: 'end', s: 9, f: INK }));
    bx.push('<circle cx="' + x(MWL) + '" cy="' + y(MWW) + '" r="4" fill="none" stroke="' + FAINT + '" stroke-width="1.5"/>');
    if (m.binding) {
      bx.push(line(x(m.ld), y(m.w) - 12, x(m.ls), y(m.w) - 12, CLAY, 3));
      bx.push(txt((x(m.ld) + x(m.ls)) / 2, y(m.w) - 18, 'unemployed ' + m.unemp.toFixed(1) + 'k', { a: 'middle', s: 9, f: CLAYD }));
      [m.ld, m.ls].forEach(function (v) { bx.push(line(x(v), 230, x(v), y(m.w), AX, 1.2, '3 3')); });
    }
    bx.push(txt(x(m.ld / 2), 222, 'wage bill', { a: 'middle', s: 8.5, f: '#5A6B45' }));
    return svg('0 0 360 256', bx.join(''));
  }

  function params() { return { w: +el('mw-w').value, b: +el('mw-b').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('mw-w-v').textContent = '$' + p.w.toFixed(2);
    el('mw-b-v').textContent = m.el.toFixed(2);
    el('mw-fig').innerHTML = draw(p, m);
    el('mw-ro-ld').textContent = m.ld.toFixed(1);
    el('mw-ro-ls').textContent = m.ls.toFixed(1);
    el('mw-ro-un').textContent = m.unemp.toFixed(1);
    el('mw-ro-lost').textContent = m.lost.toFixed(1);
    el('mw-ro-bill').textContent = money(m.bill);
    el('mw-ro-el').textContent = m.el.toFixed(2);
    var note;
    if (!m.binding) {
      note = '<strong>Not binding.</strong> A minimum of $' + p.w.toFixed(2) + ' is below the $' + MWW +
        ' market wage, so employers already pay more than the law requires and nothing changes.';
    } else {
      note = '<strong>' + m.unemp.toFixed(1) + 'k unemployed</strong> — but only ' + m.lost.toFixed(1) +
        'k of them lost a job. The other ' + m.entrants.toFixed(1) + 'k were drawn <em>into</em> the labour market by the higher wage and found no job. ' +
        (m.bill > m.bill0
          ? 'Labour demand is inelastic here (' + m.el.toFixed(2) + '), so the wage bill <em>rose</em> from ' + money(m.bill0) + ' to ' + money(m.bill) + ': workers as a group gain, even though some lose their jobs entirely.'
          : 'Labour demand is elastic here (' + m.el.toFixed(2) + '), so the wage bill <em>fell</em> from ' + money(m.bill0) + ' to ' + money(m.bill) + ': the jobs lost outweigh the raise for those who kept theirs.');
    }
    el('mw-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['w', 'b'].forEach(function (k) { el('mw-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-mw'), [
    { t: 'A minimum wage is a <strong>price floor</strong> on labour. Workers are the sellers here, firms the buyers.', lit: [], v: function (m) { return m.binding ? 'binding: $' + m.w.toFixed(2) + ' > $' + MWW : 'not binding'; } },
    { t: 'Firms hire along labour demand, so employment falls to quantity demanded.', lit: ['mw-ro-ld', 'mw-ro-lost'], v: function (m) { return m.ld.toFixed(1) + 'k employed, ' + m.lost.toFixed(1) + 'k jobs gone'; } },
    { t: 'Meanwhile more people want to work at the higher wage. Unemployment counts both groups: Ls − Ld.', lit: ['mw-ro-ls', 'mw-ro-un'], v: function (m) { return m.ls.toFixed(1) + 'k − ' + m.ld.toFixed(1) + 'k = ' + m.unemp.toFixed(1) + 'k'; } },
    { t: 'Whether workers <em>as a group</em> earn more depends on the elasticity of labour demand — the same total-revenue test as Chapter 5.', lit: ['mw-ro-bill', 'mw-ro-el'], v: function (m) { return money(m.bill0) + ' → ' + money(m.bill) + ' at elasticity ' + m.el.toFixed(2); } }
  ], function () { return compute(params()); });
  render();
})();
