/* One representative firm, used by both models:
 *   TC = 50 + 10q - 1.5q^2 + 0.1q^3
 *   MC = 10 - 3q + 0.3q^2,  AVC = 10 - 1.5q + 0.1q^2
 * so min AVC = $4.375 at q = 7.5 (shutdown price) and
 *    min ATC = $10     at q = 10  (long-run price). */
var FFC = 50;
function fTC(q) { return FFC + 10 * q - 1.5 * q * q + 0.1 * q * q * q; }
function fMC(q) { return 10 - 3 * q + 0.3 * q * q; }
function fAVC(q) { return 10 - 1.5 * q + 0.1 * q * q; }
function fATC(q) { return fTC(q) / q; }
/* The firm's supply: output where P = MC on the rising branch,
 * or zero below the minimum of AVC. */
function fSupply(P) {
  var minAvc = fAVC(7.5);
  if (P < minAvc) return 0;
  return (3 + Math.sqrt(9 - 1.2 * (10 - P))) / 0.6;
}

/* =================================================================
 * MODEL 1 — one price-taking firm. Profit is maximised by SCANNING
 * every output (including zero), not by assuming P = MC, so the
 * shutdown rule falls out of the arithmetic rather than being coded in.
 * ================================================================= */
(function () {
  function compute(p) {
    var best = 0, bestPi = -FFC;              // q = 0: revenue 0, pay fixed cost
    for (var q = 0.01; q <= 20; q += 0.01) {
      var pi = p.P * q - fTC(q);
      if (pi > bestPi + 1e-9) { bestPi = pi; best = q; }
    }
    var q = Math.round(best * 100) / 100, prod = q > 0;
    return {
      q: q, pi: bestPi, prod: prod,
      mc: prod ? fMC(q) : null, atc: prod ? fATC(q) : null, avc: prod ? fAVC(q) : null,
      minAvc: fAVC(7.5), minAtc: fATC(10),
      sr: !prod ? 'Shut down' : bestPi > 0.005 ? 'Profit' : bestPi < -0.005 ? 'Operate at a loss' : 'Break even',
      lr: bestPi > 0.005 ? 'Firms enter' : bestPi < -0.005 ? 'Firms exit' : 'No entry or exit'
    };
  }

  function draw(p, m) {
    var bx = [], qm = 18, pm = 24;
    var x = scale(0, qm, 48, 340), y = scale(0, pm, 220, 20);
    bx.push(line(48, 220, 344, 220, AX), line(48, 220, 48, 16, AX));
    bx.push(txt(48, 238, 'FIRM OUTPUT →', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(txt(52, 26, '$', { s: 8, f: FAINT }));
    // profit or loss rectangle
    if (m.prod && Math.abs(m.pi) > 0.005) {
      var top = Math.max(p.P, m.atc), bot = Math.min(p.P, m.atc);
      bx.push('<rect x="' + x(0) + '" y="' + y(top) + '" width="' + (x(m.q) - x(0)) + '" height="' + (y(bot) - y(top)) + '" fill="' + (m.pi > 0 ? OLIVE : CLAY) + '" opacity="0.3"/>');
      bx.push(txt(x(m.q / 2), (y(top) + y(bot)) / 2 + 3, m.pi > 0 ? 'profit' : 'loss', { a: 'middle', s: 9, f: INK }));
    }
    function curve(f, col, dash, q0) {
      var pts = [];
      for (var q = q0; q <= qm; q += 0.1) { var v = f(q); if (v <= pm && v >= 0) pts.push(x(q).toFixed(1) + ',' + y(v).toFixed(1)); }
      bx.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.2"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>');
    }
    curve(fATC, CLAYD, null, 2.5);
    curve(fAVC, '#5A6B45', '5 4', 0.5);
    curve(fMC, INK, null, 0.5);
    bx.push(txt(x(16.5), y(fATC(16.5)) - 6, 'ATC', { a: 'end', s: 9, f: CLAYD }));
    bx.push(txt(x(17.2), y(fAVC(17.2)) + 13, 'AVC', { a: 'end', s: 9, f: '#5A6B45' }));
    bx.push(txt(x(13.3), y(fMC(13.3)), 'MC', { a: 'end', s: 9, f: INK }));
    // the price line is also MR and AR for a price taker
    bx.push(line(48, y(p.P), 344, y(p.P), CLAY, 2));
    bx.push(txt(340, y(p.P) - 5, 'P = MR', { a: 'end', s: 9, f: CLAYD }));
    bx.push(txt(44, y(p.P) + 4, '$' + p.P.toFixed(2), { a: 'end', s: 9, f: INK }));
    if (m.prod) {
      bx.push(line(x(m.q), 220, x(m.q), y(p.P), AX, 1.2, '3 3'));
      bx.push('<circle cx="' + x(m.q) + '" cy="' + y(p.P) + '" r="4" fill="' + CLAY + '"/>');
      bx.push(txt(x(m.q), 232, 'q* ' + m.q.toFixed(1), { a: 'middle', s: 8.5, f: CLAYD }));
    }
    return svg('0 0 360 246', bx.join(''));
  }

  function d2(v) { return v === null ? '—' : '$' + v.toFixed(2); }
  function sgn(v) { return (v < -0.005 ? '−$' : '$') + Math.abs(v).toFixed(2); }
  function params() { return { P: +el('cf-p').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('cf-p-v').textContent = '$' + p.P.toFixed(2);
    el('cf-fig').innerHTML = draw(p, m);
    el('cf-ro-q').textContent = m.q.toFixed(2);
    el('cf-ro-mc').textContent = d2(m.mc);
    el('cf-ro-atc').textContent = d2(m.atc);
    el('cf-ro-avc').textContent = d2(m.avc);
    el('cf-ro-pi').textContent = sgn(m.pi);
    el('cf-ro-sr').textContent = m.sr;
    el('cf-ro-lr').textContent = m.lr;
    var note;
    if (!m.prod) {
      note = '<strong>Shut down.</strong> At $' + p.P.toFixed(2) + ' the price is below the lowest possible average variable cost ($' + m.minAvc.toFixed(2) +
        '), so every unit loses money even before the rent. Producing nothing loses only the $' + FFC + ' fixed cost — the least bad option.';
    } else if (m.pi > 0.005) {
      note = '<strong>Profit of ' + sgn(m.pi) + '.</strong> Price is above ATC at the output where P = MC. That economic profit is a signal to outsiders: in the long run, firms <em>enter</em>, market supply rises, and the price is pushed down toward $' + m.minAtc.toFixed(2) + '.';
    } else if (m.pi < -0.005) {
      note = '<strong>Losing ' + sgn(-m.pi).replace('−', '') + ' — but keep producing.</strong> Price is below ATC but above AVC ($' + m.avc.toFixed(2) +
        '), so each unit covers its variable cost and contributes something toward the fixed $' + FFC + '. Shutting down would lose the full $' + FFC + '. In the long run, though, firms like this one <em>exit</em>.';
    } else {
      note = '<strong>Break even.</strong> Price equals minimum ATC, $' + m.minAtc.toFixed(2) + ': zero economic profit, which is a normal return. Nobody enters and nobody leaves — this is the long-run equilibrium.';
    }
    el('cf-note').innerHTML = note;
    if (st) st.refresh();
  }
  el('cf-p').addEventListener('input', render);
  st = Stepper(el('ap-cf'), [
    { t: 'A price taker can sell any amount at the market price, so each extra unit adds exactly P to revenue: <strong>P = MR</strong>.', lit: [], v: function () { return 'MR = $' + params().P.toFixed(2) + ' on every unit'; } },
    { t: 'Produce where <strong>MR = MC</strong> on the rising part of MC. Below that, an extra unit adds more revenue than cost; above it, less.', lit: ['cf-ro-q', 'cf-ro-mc'], v: function (m) { return m.prod ? 'q* = ' + m.q.toFixed(2) + ', where MC = ' + d2(m.mc) : 'no output covers AVC'; } },
    { t: 'Profit = (P − ATC) × q. Read ATC at q*, not at its minimum.', lit: ['cf-ro-atc', 'cf-ro-pi'], v: function (m) { return m.prod ? '($' + params().P.toFixed(2) + ' − ' + d2(m.atc) + ') × ' + m.q.toFixed(2) + ' = ' + sgn(m.pi) : 'profit = −fixed cost = ' + sgn(m.pi); } },
    { t: 'Short run: produce if P ≥ AVC, even at a loss. Fixed cost is owed either way.', lit: ['cf-ro-avc', 'cf-ro-sr'], v: function (m) { return m.sr; } },
    { t: 'Long run: profit pulls firms in, losses push them out, until P = minimum ATC.', lit: ['cf-ro-lr'], v: function (m) { return m.lr; } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — entry and exit after a demand shock. Market demand
 * Qd = A - 50P; market supply = n firms x fSupply(P). Each year the
 * market clears (bisection), then firms enter or exit in proportion
 * to profit per firm. Starts at A = 1500, n = 100, P = $10.
 * ================================================================= */
(function () {
  var N0 = 100, A0 = 1500, YEARS = 12;
  function clear(A, n) {
    var lo = 0, hi = A / 50;
    for (var i = 0; i < 60; i++) {
      var mid = (lo + hi) / 2;
      if (A - 50 * mid > n * fSupply(mid)) lo = mid; else hi = mid;
    }
    var P = (lo + hi) / 2, q = fSupply(P);
    return { P: P, q: q, pi: q > 0 ? P * q - fTC(q) : -FFC, Q: n * q };
  }
  function compute(p) {
    var path = [], n = N0;
    for (var t = 0; t <= YEARS; t++) {
      var s = clear(p.A, n);
      // entry/exit: half a firm per dollar of profit, at least one while profit isn't ~zero
      var d = Math.abs(s.pi) < 0.05 ? 0 : (s.pi > 0 ? 1 : -1) * Math.max(1, Math.round(0.5 * Math.abs(s.pi)));
      path.push({ t: t, n: n, P: s.P, q: s.q, pi: s.pi, Q: s.Q, d: d });
      n = Math.max(1, n + d);
    }
    return { path: path, now: path[p.yr], longN: (p.A - 50 * 10) / 10 };
  }

  function draw(p, m) {
    var bx = [], pmax = 20;
    var x = scale(0, YEARS, 56, 336), y = scale(0, pmax, 200, 24);
    bx.push(line(56, 200, 344, 200, AX), line(56, 200, 56, 18, AX));
    bx.push(txt(56, 228, 'YEARS AFTER THE DEMAND CHANGE →', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(txt(60, 28, 'MARKET PRICE', { s: 8, f: FAINT, ls: 0.8 }));
    bx.push(line(56, y(10), 344, y(10), OLIVE, 1.4, '5 4'));
    bx.push(txt(340, y(10) - 5, 'min ATC $10', { a: 'end', s: 8.5, f: '#5A6B45' }));
    var pts = m.path.map(function (r) { return x(r.t).toFixed(1) + ',' + y(Math.min(r.P, pmax)).toFixed(1); });
    bx.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="' + CLAYD + '" stroke-width="2.2"/>');
    m.path.forEach(function (r) {
      bx.push('<circle cx="' + x(r.t) + '" cy="' + y(Math.min(r.P, pmax)) + '" r="' + (r.t === p.yr ? 5 : 2.5) + '" fill="' + (r.t === p.yr ? CLAY : CLAYD) + '"/>');
    });
    var la = p.yr < 3 ? 'start' : p.yr > 9 ? 'end' : 'middle', lx = x(p.yr) + (la === 'start' ? 8 : la === 'end' ? -8 : 0);
    bx.push(txt(lx, y(Math.min(m.now.P, pmax)) + (m.now.P >= 10 ? -10 : 16), '$' + m.now.P.toFixed(2) + ' · ' + m.now.n + ' firms', { a: la, s: 9, f: INK }));
    for (var t = 0; t <= YEARS; t += 2) bx.push(txt(x(t), 212, String(t), { a: 'middle', s: 8, f: FAINT }));
    return svg('0 0 360 236', bx.join(''));
  }

  function params() { return { A: +el('lr-a').value, yr: +el('lr-yr').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p), r = m.now;
    el('lr-a-v').textContent = (p.A > A0 ? '+' : p.A < A0 ? '−' : '') + Math.abs(Math.round((p.A - A0) / A0 * 100)) + '%';
    el('lr-yr-v').textContent = p.yr;
    el('lr-fig').innerHTML = draw(p, m);
    el('lr-ro-n').textContent = r.n;
    el('lr-ro-p').textContent = '$' + r.P.toFixed(2);
    el('lr-ro-q').textContent = r.q.toFixed(2);
    el('lr-ro-pi').textContent = (r.pi < -0.005 ? '−$' : '$') + Math.abs(r.pi).toFixed(2);
    el('lr-ro-mq').textContent = Math.round(r.Q);
    el('lr-ro-d').textContent = (r.d > 0 ? '+' : '') + r.d;
    var note;
    if (p.A === A0) {
      note = 'No demand change: ' + N0 + ' firms each make 10 units at $10 — minimum ATC — and earn zero economic profit. Nothing moves. Shift demand to start the story.';
    } else if (p.yr === 0) {
      note = '<strong>Year 0, the short run.</strong> Demand ' + (p.A > A0 ? 'rose' : 'fell') + ' but the number of firms is still ' + N0 + ', so the price jumps to $' + r.P.toFixed(2) +
        ' and each firm ' + (r.pi > 0 ? 'earns a profit of $' + r.pi.toFixed(2) : 'loses $' + Math.abs(r.pi).toFixed(2)) + '. Now drag the years forward.';
    } else if (Math.abs(r.pi) < 0.05) {
      note = '<strong>Back to the long run.</strong> ' + r.n + ' firms, price back at $' + r.P.toFixed(2) + ', zero economic profit. ' +
        'Demand changed by ' + Math.round(Math.abs(p.A - A0) / A0 * 100) + '% and the long-run price did not move at all — the whole adjustment came through the <em>number of firms</em>. ' +
        'That is why the long-run supply curve in a constant-cost industry is flat at minimum ATC.';
    } else {
      note = 'Year ' + p.yr + ': ' + (r.pi > 0 ? 'profit is still positive, so firms keep entering' : 'losses persist, so firms keep exiting') + ' (' + (r.d > 0 ? '+' : '') + r.d +
        ' this year). Each move in the number of firms shifts market supply and nudges the price toward $10.';
    }
    el('lr-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['a', 'yr'].forEach(function (k) { el('lr-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-lr'), [
    { t: 'Start in long-run equilibrium: P = min ATC = $10, zero profit. Then demand shifts.', lit: [], v: function () { return 'demand change ' + el('lr-a-v').textContent; } },
    { t: 'In the short run the number of firms is fixed, so price moves and existing firms earn a profit or a loss.', lit: ['lr-ro-p', 'lr-ro-pi'], v: function (m) { return 'year 0: $' + m.path[0].P.toFixed(2) + ', profit $' + m.path[0].pi.toFixed(2); } },
    { t: 'Profit attracts entrants (losses drive exits). Each change in firm numbers shifts market supply.', lit: ['lr-ro-n', 'lr-ro-d'], v: function (m) { return m.now.n + ' firms, ' + (m.now.d > 0 ? '+' : '') + m.now.d + ' this year'; } },
    { t: 'Entry stops only when profit is gone: price is back at minimum ATC, and market quantity has absorbed the whole demand change.', lit: ['lr-ro-mq', 'lr-ro-q'], v: function (m) { return 'long-run firms = ' + m.longN.toFixed(0) + ', each making 10'; } }
  ], function () { return compute(params()); });
  render();
})();
