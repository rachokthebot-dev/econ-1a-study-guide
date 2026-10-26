/* =================================================================
 * MODEL 1 — accounting vs economic profit for a small business.
 * Implicit costs = the owner's forgone salary + forgone interest on
 * the capital they put in.
 * ================================================================= */
(function () {
  function compute(p) {
    var forgoneInt = p.k * p.r / 100, implicit = p.sal + forgoneInt;
    var acct = p.rev - p.exp, econ = acct - implicit;
    return { forgoneInt: forgoneInt, implicit: implicit, acct: acct, econ: econ };
  }
  function k(n) { return (n < 0 ? '−$' : '$') + Math.round(Math.abs(n)).toLocaleString('en-US') + 'k'; }

  function draw(p, m) {
    var bx = [], top = Math.max(p.rev, p.exp + m.implicit, 1) * 1.1;
    var y = scale(0, top, 200, 24);
    bx.push(line(40, 200, 344, 200, AX));
    // revenue bar
    bx.push(rect(70, y(p.rev), 80, 200 - y(p.rev), OLIVE, 0));
    bx.push(txt(110, 216, 'revenue', { a: 'middle', s: 9, f: '#5A6B45' }));
    bx.push(txt(110, y(p.rev) - 6, k(p.rev), { a: 'middle', s: 9, f: INK }));
    // stacked cost bar: explicit, then implicit
    bx.push(rect(210, y(p.exp), 80, 200 - y(p.exp), CLAY, 0));
    bx.push(rect(210, y(p.exp + m.implicit), 80, y(p.exp) - y(p.exp + m.implicit), OAT, 0));
    bx.push(txt(250, 216, 'costs', { a: 'middle', s: 9, f: CLAYD }));
    if (200 - y(p.exp) > 14) bx.push(txt(250, (200 + y(p.exp)) / 2 + 3, 'explicit', { a: 'middle', s: 8.5, f: '#fff' }));
    if (y(p.exp) - y(p.exp + m.implicit) > 14) bx.push(txt(250, (y(p.exp) + y(p.exp + m.implicit)) / 2 + 3, 'implicit', { a: 'middle', s: 8.5, f: INK }));
    // the two profit lines, measured from the revenue level
    bx.push(line(150, y(p.rev), 210, y(p.rev), INK, 1, '3 3'));
    bx.push(line(300, y(p.exp), 330, y(p.exp), FAINT, 1));
    bx.push(line(300, y(p.exp + m.implicit), 330, y(p.exp + m.implicit), FAINT, 1));
    bx.push(txt(48, 236, 'accounting profit ' + k(m.acct) + ' · economic profit ' + k(m.econ), { s: 9, f: INK }));
    return svg('0 0 360 246', bx.join(''));
  }

  function params() {
    return { rev: +el('pr-rev').value, exp: +el('pr-exp').value, sal: +el('pr-sal').value, k: +el('pr-k').value, r: +el('pr-r').value };
  }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('pr-rev-v').textContent = k(p.rev);
    el('pr-exp-v').textContent = k(p.exp);
    el('pr-sal-v').textContent = k(p.sal);
    el('pr-k-v').textContent = k(p.k);
    el('pr-r-v').textContent = p.r + '%';
    el('pr-fig').innerHTML = draw(p, m);
    el('pr-ro-acct').textContent = k(m.acct);
    el('pr-ro-int').textContent = k(m.forgoneInt);
    el('pr-ro-imp').textContent = k(m.implicit);
    el('pr-ro-econ').textContent = k(m.econ);
    var note;
    if (m.acct > 0 && m.econ < 0) {
      note = '<strong>Profitable on paper, losing in economic terms.</strong> The accountant reports ' + k(m.acct) +
        ', but the owner gives up ' + k(m.implicit) + ' by not taking the next-best job and not investing the capital elsewhere. ' +
        'They would be ' + k(-m.econ) + ' a year better off closing up. This gap between the two numbers is what the exam tests.';
    } else if (Math.abs(m.econ) < 0.5) {
      note = '<strong>Zero economic profit — and that is fine.</strong> The business earns exactly what the owner\'s time and money could earn elsewhere: a <em>normal</em> profit. The accounting profit of ' + k(m.acct) + ' is precisely the return on what the owner put in.';
    } else if (m.econ > 0) {
      note = '<strong>Economic profit of ' + k(m.econ) + '.</strong> Revenue covers the explicit costs <em>and</em> everything the owner gave up to run it. ' +
        'That is a signal: other people will want in, which is where Chapter 11 picks up.';
    } else {
      note = '<strong>Losing money by either measure.</strong> Revenue doesn\'t even cover the explicit costs, so accounting profit is ' + k(m.acct) + ' too.';
    }
    el('pr-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['rev', 'exp', 'sal', 'k', 'r'].forEach(function (n) { el('pr-' + n).addEventListener('input', render); });
  st = Stepper(el('ap-pr'), [
    { t: '<strong>Accounting profit</strong> = revenue − explicit costs. Only money actually paid out is subtracted.', lit: ['pr-ro-acct'], v: function (m) { return k(m.acct); } },
    { t: 'The capital the owner put in could have earned interest elsewhere. That is an implicit cost.', lit: ['pr-ro-int'], v: function (m) { return k(m.forgoneInt) + ' of interest forgone'; } },
    { t: 'Add the salary they gave up to get <strong>total implicit cost</strong>. These are opportunity costs: no cheque is written.', lit: ['pr-ro-imp'], v: function (m) { return k(m.implicit) + ' implicit'; } },
    { t: '<strong>Economic profit</strong> = accounting profit − implicit costs. It decides whether staying in business is worth it.', lit: ['pr-ro-econ'], v: function (m) { return k(m.econ); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — a bakery's production function and the cost curves it
 * generates. Output Q(L) = 30L + 6L^2 - L^3 (loaves/day), so the
 * marginal product rises, then diminishes. Every cost below is
 * computed from that table and the two prices.
 * ================================================================= */
var BKMAX = 6;
function bakeryQ(L) { return 30 * L + 6 * L * L - L * L * L; }
(function () {
  function table(fc, w) {
    var rows = [];
    for (var L = 0; L <= BKMAX; L++) {
      var q = bakeryQ(L), mp = L ? q - bakeryQ(L - 1) : null, tc = fc + w * L;
      rows.push({ L: L, q: q, mp: mp, vc: w * L, tc: tc,
        afc: q ? fc / q : null, avc: q ? w * L / q : null, atc: q ? tc / q : null, mc: mp ? w / mp : null });
    }
    return rows;
  }
  function compute(p) {
    var t = table(p.fc, p.w), r = t[p.L], minAtc = 1, minAvc = 1;
    for (var i = 2; i <= BKMAX; i++) {
      if (t[i].atc < t[minAtc].atc) minAtc = i;
      if (t[i].avc < t[minAvc].avc) minAvc = i;
    }
    return { t: t, r: r, minAtc: minAtc, minAvc: minAvc };
  }

  function draw(p, m) {
    var bx = [], t = m.t, qmax = 200, cmax = 0;
    for (var i = 1; i <= BKMAX; i++) cmax = Math.max(cmax, Math.min(t[i].atc, 8), t[i].mc);
    cmax = Math.min(cmax * 1.1, 9);
    var x = scale(0, qmax, 48, 340), y = scale(0, cmax, 210, 24);
    bx.push(line(48, 210, 344, 210, AX), line(48, 210, 48, 18, AX));
    bx.push(txt(48, 228, 'LOAVES PER DAY →', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(txt(52, 28, '$ PER LOAF', { s: 8, f: FAINT, ls: 0.8 }));
    function poly(key, col, dash, from) {
      var pts = [];
      for (var i = from; i <= BKMAX; i++) {
        var v = t[i][key];
        if (v !== null && v <= cmax) pts.push(x(t[i].q).toFixed(1) + ',' + y(v).toFixed(1));
      }
      bx.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>');
      pts.forEach(function (s) { var xy = s.split(','); bx.push('<circle cx="' + xy[0] + '" cy="' + xy[1] + '" r="2.6" fill="' + col + '"/>'); });
    }
    poly('atc', CLAYD, null, 1);
    poly('avc', '#5A6B45', '5 4', 1);
    poly('mc', INK, null, 1);
    bx.push(txt(x(t[BKMAX].q) + 6, y(Math.min(t[BKMAX].atc, cmax)) - 2, 'ATC', { s: 9, f: CLAYD }));
    bx.push(txt(x(t[BKMAX].q) + 6, y(t[BKMAX].avc) + 10, 'AVC', { s: 9, f: '#5A6B45' }));
    bx.push(txt(x(t[5].q) - 6, y(Math.min(t[5].mc, cmax)) - 6, 'MC', { a: 'end', s: 9, f: INK }));
    // the selected worker
    bx.push(line(x(m.r.q), 210, x(m.r.q), 24, CLAY, 1.4, '3 3'));
    bx.push(txt(x(m.r.q), 240, 'L = ' + p.L + ', Q = ' + m.r.q, { a: 'middle', s: 9, f: CLAYD }));
    return svg('0 0 360 250', bx.join(''));
  }

  function d2(v) { return v === null ? '—' : '$' + v.toFixed(2); }
  function params() { return { L: +el('bk-L').value, fc: +el('bk-fc').value, w: +el('bk-w').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p), r = m.r;
    el('bk-L-v').textContent = p.L;
    el('bk-fc-v').textContent = money(p.fc);
    el('bk-w-v').textContent = money(p.w);
    el('bk-fig').innerHTML = draw(p, m);
    el('bk-ro-q').textContent = r.q;
    el('bk-ro-mp').textContent = r.mp;
    el('bk-ro-mc').textContent = d2(r.mc);
    el('bk-ro-afc').textContent = d2(r.afc);
    el('bk-ro-avc').textContent = d2(r.avc);
    el('bk-ro-atc').textContent = d2(r.atc);
    el('bk-tbl').innerHTML = '<thead><tr><th>Workers</th><th>Loaves</th><th>MP</th><th>TC</th><th>AVC</th><th>ATC</th><th>MC</th></tr></thead><tbody>' +
      m.t.map(function (row) {
        var on = row.L === p.L ? ' style="background:#FCEEE3"' : '';
        return '<tr' + on + '><td>' + row.L + '</td><td>' + row.q + '</td><td>' + (row.mp === null ? '—' : row.mp) + '</td><td>' + money(row.tc) +
          '</td><td>' + d2(row.avc) + '</td><td>' + d2(row.atc) + (row.L === m.minAtc ? ' ◂ min' : '') + '</td><td>' + d2(row.mc) + '</td></tr>';
      }).join('') + '</tbody>';
    var note, rel = r.mc < r.atc ? 'below' : 'above';
    if (p.L === 1 || r.mp >= m.t[p.L - 1].mp) {
      note = '<strong>Increasing marginal product.</strong> Worker ' + p.L + ' adds ' + r.mp + ' loaves — at least as many as the worker before — because workers can specialise around the one oven. ' +
        'So each extra loaf costs less: marginal cost is ' + d2(r.mc) + ' and falling.';
    } else {
      note = '<strong>Diminishing marginal product.</strong> Worker ' + p.L + ' adds only ' + r.mp + ' loaves: the oven and the kitchen are fixed, so each extra worker has less to work with. ' +
        'Marginal cost climbs to ' + d2(r.mc) + ' per loaf. Diminishing returns are <em>why</em> the MC curve slopes up.';
    }
    note += ' MC is ' + rel + ' ATC (' + d2(r.atc) + '), so ATC is ' + (r.mc < r.atc ? 'still falling' : 'rising') + ' — it bottoms out at ' + m.minAtc + ' workers.';
    el('bk-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['L', 'fc', 'w'].forEach(function (k) { el('bk-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-bk'), [
    { t: '<strong>Marginal product</strong> = the extra output from one more worker. It rises at first, then diminishes because the oven is fixed.', lit: ['bk-ro-mp', 'bk-ro-q'], v: function (m) { return 'worker adds ' + m.r.mp + ' loaves'; } },
    { t: '<strong>Marginal cost</strong> = wage ÷ marginal product. When each worker adds less, each extra loaf costs more.', lit: ['bk-ro-mc'], v: function (m) { return d2(m.r.mc) + ' per extra loaf'; } },
    { t: '<strong>AFC</strong> = FC ÷ Q falls forever, because the fixed cost is spread over more loaves.', lit: ['bk-ro-afc'], v: function (m) { return d2(m.r.afc); } },
    { t: '<strong>ATC</strong> = AFC + AVC. Compare MC with it: if the marginal loaf costs less than the average, the average falls.', lit: ['bk-ro-avc', 'bk-ro-atc'], v: function (m) { return 'AVC ' + d2(m.r.avc) + ', ATC ' + d2(m.r.atc); } },
    { t: 'So <strong>MC crosses ATC (and AVC) at their minimum</strong>. Scrub the worker slider past the bottom and check.', lit: ['bk-ro-mc', 'bk-ro-atc'], v: function (m) { return 'ATC lowest at ' + m.minAtc + ' workers, AVC at ' + m.minAvc; } }
  ], function () { return compute(params()); });
  render();
})();
