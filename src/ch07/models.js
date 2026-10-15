/* Inverse demand P = A - bQ, inverse supply P = C + dQ.
 * A = 60, C = 7.5, b = 0.5, d = 0.25 give P* = 25, Q* = 70. */
var TAXA = 60, TAXC = 7.5;

/* =================================================================
 * MODEL 1 — the wedge. The buyer-levied case is solved as a SEPARATE
 * system rather than copied, so the equivalence is a computed result.
 * ================================================================= */
(function () {
  function solve(p) {
    var q0 = (TAXA - TAXC) / (p.b + p.d), p0 = TAXA - p.b * q0;
    var q, pb, ps;
    if (p.onBuyer) {
      // buyers pay the tax: demand net of tax meets supply
      q = (TAXA - p.t - TAXC) / (p.b + p.d);
      ps = TAXC + p.d * q;
      pb = ps + p.t;
    } else {
      // sellers remit it: supply curve shifts up by t
      q = (TAXA - TAXC - p.t) / (p.b + p.d);
      pb = TAXA - p.b * q;
      ps = pb - p.t;
    }
    q = Math.max(0, q);
    return { q0: q0, p0: p0, q: q, pb: pb, ps: ps };
  }
  function compute(p) {
    var s = solve(p);
    var bb = s.pb - s.p0, sb = s.p0 - s.ps;
    return {
      q0: s.q0, p0: s.p0, q: s.q, pb: s.pb, ps: s.ps, bb: bb, sb: sb,
      share: p.t > 0 ? bb / p.t : 0,
      rev: p.t * s.q, dwl: 0.5 * p.t * (s.q0 - s.q)
    };
  }

  function draw(p, m) {
    var b = [], qm = Math.max(m.q0 * 1.45, 60), pm = TAXA * 1.1;
    var x = scale(0, qm, 48, 340), y = scale(0, pm, 230, 24);
    b.push(line(48, 230, 344, 230, AX), line(48, 230, 48, 20, AX));
    b.push(txt(48, 248, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    b.push(line(x(0), y(TAXA), x(qm), y(TAXA - p.b * qm), CLAYD, 2.2));
    b.push(line(x(0), y(TAXC), x(qm), y(TAXC + p.d * qm), '#5A6B45', 2.2));
    if (p.t > 0) {
      // the wedge: revenue block plus the deadweight triangle
      b.push(rect(x(0), y(m.pb), x(m.q) - x(0), y(m.ps) - y(m.pb), CLAY, 0));
      b.push('<rect x="' + x(0) + '" y="' + y(m.pb) + '" width="' + (x(m.q) - x(0)) + '" height="' + (y(m.ps) - y(m.pb)) + '" fill="' + CLAY + '" opacity="0.3"/>');
      b.push('<polygon points="' + x(m.q) + ',' + y(m.pb) + ' ' + x(m.q) + ',' + y(m.ps) + ' ' + x(m.q0) + ',' + y(m.p0) + '" fill="' + INK + '" opacity="0.45"/>');
      b.push(line(x(0), y(m.pb), x(m.q), y(m.pb), INK, 2));
      b.push(line(x(0), y(m.ps), x(m.q), y(m.ps), INK, 2));
      b.push(txt(44, y(m.pb) + 4, '$' + m.pb.toFixed(1), { a: 'end', s: 9, f: CLAYD }));
      b.push(txt(44, y(m.ps) + 4, '$' + m.ps.toFixed(1), { a: 'end', s: 9, f: '#5A6B45' }));
      b.push(txt(x(m.q / 2), (y(m.pb) + y(m.ps)) / 2 + 3, 'tax $' + p.t, { a: 'middle', s: 9.5, f: INK }));
      b.push(txt(x(m.q0) + 8, y(m.p0) + 4, 'DWL', { s: 9, f: INK }));
    }
    b.push('<circle cx="' + x(m.q0) + '" cy="' + y(m.p0) + '" r="4" fill="none" stroke="' + FAINT + '" stroke-width="1.5"/>');
    b.push(line(x(m.q), 230, x(m.q), y(m.pb), AX, 1.2, '3 3'));
    b.push(txt(x(m.q), 244, m.q.toFixed(0), { a: 'middle', s: 9, f: INK }));
    // burden split bar
    b.push(txt(48, 272, 'WHO BEARS THE TAX', { s: 8, f: FAINT, ls: 0.8 }));
    var w = 292, bw = p.t > 0 ? w * clamp(m.share, 0, 1) : w / 2;
    b.push(rect(48, 280, bw, 18, CLAY, 0));
    b.push(rect(48 + bw, 280, w - bw, 18, OLIVE, 0));
    if (p.t > 0) {
      if (bw > 40) b.push(txt(48 + bw / 2, 293, 'buyers ' + Math.round(m.share * 100) + '%', { a: 'middle', s: 9, f: '#fff' }));
      if (w - bw > 40) b.push(txt(48 + bw + (w - bw) / 2, 293, 'sellers ' + Math.round((1 - m.share) * 100) + '%', { a: 'middle', s: 9, f: '#fff' }));
    } else {
      b.push(txt(48 + w / 2, 293, 'no tax', { a: 'middle', s: 9, f: '#fff' }));
    }
    return svg('0 0 360 306', b.join(''));
  }

  function params() {
    return { t: +el('tax-t').value, b: +el('tax-b').value, d: +el('tax-d').value, onBuyer: el('tax-onbuyer').checked };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('tax-t-v').textContent = '$' + p.t;
    el('tax-b-v').textContent = p.b.toFixed(2);
    el('tax-d-v').textContent = p.d.toFixed(2);
    el('tax-fig').innerHTML = draw(p, m);
    el('tax-ro-pb').textContent = '$' + m.pb.toFixed(2);
    el('tax-ro-ps').textContent = '$' + m.ps.toFixed(2);
    el('tax-ro-q').textContent = m.q.toFixed(1);
    el('tax-ro-share').textContent = p.t > 0 ? Math.round(m.share * 100) + '%' : '—';
    el('tax-ro-bb').textContent = '$' + m.bb.toFixed(2);
    el('tax-ro-sb').textContent = '$' + m.sb.toFixed(2);
    var note;
    if (p.t === 0) {
      note = 'No tax: one price, $' + m.p0.toFixed(2) + ', and ' + m.q0.toFixed(0) +
        ' units. Add a tax and this single price splits into two.';
    } else if (p.onBuyer) {
      note = '<strong>The tax is now levied on buyers — and nothing moved.</strong> This case was solved as a ' +
        'separate system (demand net of tax meeting the original supply), and it lands on the same $' + m.pb.toFixed(2) +
        ', the same $' + m.ps.toFixed(2) + ' and the same ' + m.q.toFixed(1) + ' units. <em>Statutory</em> incidence ' +
        'changed; <em>economic</em> incidence did not. This is why "tax the corporations, not the consumers" is not an ' +
        'economic statement — the law cannot assign the burden.';
    } else {
      var steeper = p.b > p.d ? 'Demand' : p.d > p.b ? 'Supply' : 'Neither curve';
      note = '<strong>Buyers bear ' + Math.round(m.share * 100) + '%, sellers ' + Math.round((1 - m.share) * 100) + '%.</strong> ' +
        (steeper === 'Neither curve'
          ? 'The two curves are equally steep, so the tax splits exactly in half.'
          : steeper + ' is the steeper — the less elastic — side, so it absorbs more. The burdens, $' +
            m.bb.toFixed(2) + ' and $' + m.sb.toFixed(2) + ', always sum to the $' + p.t + ' tax.') +
        ' Quantity fell from ' + m.q0.toFixed(0) + ' to ' + m.q.toFixed(1) + ', and the dark triangle is the surplus ' +
        'that fall destroyed — $' + m.dwl.toFixed(0) + ', which nobody collects.';
    }
    el('tax-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['t', 'b', 'd'].forEach(function (k) { el('tax-' + k).addEventListener('input', render); });
  el('tax-onbuyer').addEventListener('change', render);
  st = Stepper(el('ap-tax'), [
    { t: 'The tax opens a gap between the two prices. Buyers pay the top line, sellers keep the bottom one, and the difference is exactly the tax.', lit: ['tax-ro-pb', 'tax-ro-ps'], v: function (m) { return '$' + m.pb.toFixed(2) + ' paid, $' + m.ps.toFixed(2) + ' kept'; } },
    { t: 'Quantity falls, because trades that cleared at the old price no longer clear the wedge. That fall is where the damage comes from.', lit: ['tax-ro-q'], v: function (m) { return m.q0.toFixed(0) + ' → ' + m.q.toFixed(1) + ' units'; } },
    { t: 'Measure each burden against the <strong>original</strong> equilibrium price, not against each other. The two always sum to the tax.', lit: ['tax-ro-bb', 'tax-ro-sb'], v: function (m) { return '$' + m.bb.toFixed(2) + ' + $' + m.sb.toFixed(2) + ' = the tax'; } },
    { t: 'The split is decided by <strong>relative elasticity</strong>: the steeper, less elastic side cannot walk away, so it absorbs more.', lit: ['tax-ro-share'], v: function (m) { return 'buyers bear ' + Math.round(m.share * 100) + '%'; } },
    { t: 'Now flip the levy onto buyers. Every number holds. Who writes the cheque is a legal fact with no economic content.', lit: [], v: function () { return 'statutory ≠ economic incidence'; } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — revenue against damage, across every tax rate.
 * ================================================================= */
(function () {
  var B = 0.5, D = 0.25, Q0 = (TAXA - TAXC) / (B + D), TS0 = 0.5 * (TAXA - TAXC) * Q0;

  function at(t) {
    var q = Math.max(0, (TAXA - TAXC - t) / (B + D));
    return { q: q, rev: t * q, dwl: 0.5 * t * (Q0 - q) };
  }
  function compute(p) {
    var a = at(p.t), best = 0, bestRev = -1;
    for (var t = 0; t <= TAXA - TAXC; t += 0.25) {
      var r = at(t).rev;
      if (r > bestRev) { bestRev = r; best = t; }
    }
    return {
      q: a.q, rev: a.rev, dwl: a.dwl, best: best, bestRev: bestRev,
      ratio: a.rev > 0 ? a.dwl / a.rev : 0, ts: TS0 - a.dwl, maxT: TAXA - TAXC
    };
  }

  function draw(p, m) {
    var b = [], x = scale(0, m.maxT, 48, 340);
    var top = Math.max(m.bestRev, 1) * 1.15, y = scale(0, top, 196, 26);
    b.push(line(48, 196, 344, 196, AX), line(48, 196, 48, 20, AX));
    b.push(txt(48, 214, 'TAX PER UNIT →', { s: 8, f: FAINT, ls: 0.8 }));
    var rp = [], dp = [];
    for (var t = 0; t <= m.maxT; t += 0.5) {
      var a = at(t);
      rp.push(x(t).toFixed(1) + ',' + y(a.rev).toFixed(1));
      dp.push(x(t).toFixed(1) + ',' + y(a.dwl).toFixed(1));
    }
    b.push('<polyline points="' + rp.join(' ') + '" fill="none" stroke="' + OLIVE + '" stroke-width="2.5"/>');
    b.push('<polyline points="' + dp.join(' ') + '" fill="none" stroke="' + CLAY + '" stroke-width="2.5"/>');
    b.push(txt(x(m.maxT * 0.3), y(at(m.maxT * 0.3).rev) - 9, 'revenue', { s: 9, f: '#5A6B45' }));
    b.push(txt(x(m.maxT * 0.78), y(at(m.maxT * 0.78).dwl) - 9, 'deadweight loss', { a: 'middle', s: 9, f: CLAYD }));
    b.push(line(x(m.best), 196, x(m.best), y(m.bestRev), OLIVE, 1.5, '3 3'));
    b.push(txt(clamp(x(m.best), 60, 290), y(m.bestRev) - 8, 'peak $' + Math.round(m.bestRev), { a: 'middle', s: 9, f: '#5A6B45' }));
    b.push(line(x(p.t), 196, x(p.t), 24, INK, 2));
    b.push('<circle cx="' + x(p.t) + '" cy="' + y(m.rev) + '" r="4.5" fill="' + OLIVE + '"/>');
    b.push('<circle cx="' + x(p.t) + '" cy="' + y(m.dwl) + '" r="4.5" fill="' + CLAY + '"/>');
    b.push(txt(clamp(x(p.t) + 7, 0, 300), 34, '$' + p.t, { s: 9.5, f: INK }));
    return svg('0 0 360 222', b.join(''));
  }

  function params() { return { t: +el('rev-t').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('rev-t-v').textContent = '$' + p.t;
    el('rev-fig').innerHTML = draw(p, m);
    el('rev-ro-q').textContent = m.q.toFixed(1);
    el('rev-ro-rev').textContent = '$' + Math.round(m.rev).toLocaleString('en-US');
    el('rev-ro-dwl').textContent = '$' + Math.round(m.dwl).toLocaleString('en-US');
    el('rev-ro-ratio').textContent = m.rev > 0 ? '$' + m.ratio.toFixed(2) : '—';
    el('rev-ro-peak').textContent = '$' + m.best.toFixed(2);
    el('rev-ro-ts').textContent = '$' + Math.round(m.ts).toLocaleString('en-US');
    var note;
    if (p.t === 0) {
      note = 'No tax, no revenue, no deadweight loss, and the full $' + Math.round(TS0).toLocaleString('en-US') +
        ' of surplus intact. Raise the tax and watch the two curves separate.';
    } else if (p.t < m.best) {
      note = '<strong>$' + Math.round(m.rev).toLocaleString('en-US') + ' raised, $' + Math.round(m.dwl).toLocaleString('en-US') +
        ' destroyed</strong> — ' + m.ratio.toFixed(2) + ' of damage per dollar collected. Revenue is still climbing toward its peak at $' +
        m.best.toFixed(2) + '. Notice how differently the two curves grow: revenue is close to linear here, while the loss ' +
        'is bending upward, because the lost quantity itself grows with the tax.';
    } else {
      note = '<strong>Past the peak.</strong> The tax is above $' + m.best.toFixed(2) +
        ', so raising it further now <em>reduces</em> revenue — the market has shrunk to ' + m.q.toFixed(1) +
        ' units — while deadweight loss keeps climbing. Every dollar collected here costs $' + m.ratio.toFixed(2) +
        ' of destroyed surplus. This is the argument for broad, low taxes rather than narrow, high ones.';
    }
    el('rev-note').innerHTML = note;
    if (st) st.refresh();
  }
  el('rev-t').addEventListener('input', render);
  st = Stepper(el('ap-rev'), [
    { t: 'Revenue is <strong>tax × quantity</strong>. Raising the tax lifts one factor and shrinks the other, so revenue cannot climb forever.', lit: ['rev-ro-rev', 'rev-ro-q'], v: function (m) { return '$' + Math.round(m.rev).toLocaleString('en-US') + ' from ' + m.q.toFixed(1) + ' units'; } },
    { t: 'There is a tax rate that collects the most. Beyond it the shrinking market outweighs the higher rate.', lit: ['rev-ro-peak'], v: function (m) { return 'peak revenue at a $' + m.best.toFixed(2) + ' tax'; } },
    { t: 'Deadweight loss is <strong>½ × tax × units lost</strong>. Since the units lost also grow with the tax, the loss grows roughly with its <em>square</em>.', lit: ['rev-ro-dwl'], v: function (m) { return '$' + Math.round(m.dwl).toLocaleString('en-US') + ' destroyed'; } },
    { t: 'So the real cost of revenue rises as you lean harder on one market. Watch the damage per dollar climb.', lit: ['rev-ro-ratio'], v: function (m) { return '$' + m.ratio.toFixed(2) + ' lost per $1 raised'; } },
    { t: 'What remains of the original surplus is what the market still delivers. Revenue is a <strong>transfer</strong> out of it — the deadweight loss is the part nobody gets.', lit: ['rev-ro-ts'], v: function (m) { return '$' + Math.round(m.ts).toLocaleString('en-US') + ' of surplus survives'; } }
  ], function () { return compute(params()); });
  render();
})();
