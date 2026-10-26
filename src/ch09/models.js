/* Private curves are the Chapter 8 market: demand (private benefit)
 * P = 100 - Q, supply (private cost) P = 10 + 0.5Q, so the unregulated
 * market sits at Q = 60, P = $40. The externality adds a constant
 * per-unit gap between private and social. */
var EXA = 100, EXB = 1, EXC = 10, EXD = 0.5;

/* =================================================================
 * MODEL 1 — an externality, and a corrective tax or subsidy.
 * ================================================================= */
(function () {
  function compute(p) {
    var neg = !p.pos, sgn = neg ? -1 : 1;
    // market with the policy: a tax shifts private cost up, a subsidy down
    var qm = (EXA - EXC - sgn * p.t) / (EXB + EXD);
    // social optimum: social benefit = social cost
    var qs = (EXA - EXC + sgn * p.e) / (EXB + EXD);
    var q0 = (EXA - EXC) / (EXB + EXD);
    qm = Math.max(0, qm); qs = Math.max(0, qs);
    var pb = EXA - EXB * qm;                       // price buyers pay
    // the gap between social cost and social benefit is linear in Q with slope (b + d)
    var dwl = 0.5 * (EXB + EXD) * Math.pow(qm - qs, 2);
    var dwl0 = 0.5 * (EXB + EXD) * Math.pow(q0 - qs, 2);
    return { neg: neg, qm: qm, qs: qs, q0: q0, pb: pb, gap: qm - qs, dwl: dwl, dwl0: dwl0, money: p.t * qm };
  }

  function draw(p, m) {
    var bx = [], qm = 120, pm = 105;
    var x = scale(0, qm, 48, 340), y = scale(0, pm, 230, 20);
    bx.push(line(48, 230, 344, 230, AX), line(48, 230, 48, 16, AX));
    bx.push(txt(48, 248, 'QUANTITY →', { s: 8, f: FAINT, ls: 0.8 }));
    var dE = EXA / EXB, sE = Math.min(qm, (pm - EXC) / EXD);
    bx.push(line(x(0), y(EXA), x(dE), y(0), CLAYD, 2.2));
    bx.push(line(x(0), y(EXC), x(sE), y(EXC + EXD * sE), '#5A6B45', 2.2));
    bx.push(txt(x(dE - 22) - 6, y(22) + 4, m.neg ? 'D' : 'private benefit', { a: 'end', s: 8.5, f: CLAYD }));
    bx.push(txt(x(sE) - 4, y(EXC + EXD * sE) + 14, m.neg ? 'private cost' : 'S', { a: 'end', s: 8.5, f: '#5A6B45' }));
    if (p.e > 0) {
      if (m.neg) {
        var sE2 = Math.min(qm, (pm - EXC - p.e) / EXD);
        bx.push(line(x(0), y(EXC + p.e), x(sE2), y(EXC + p.e + EXD * sE2), INK, 1.8, '5 4'));
        bx.push(txt(x(sE2) - 4, y(EXC + p.e + EXD * sE2) - 6, 'social cost', { a: 'end', s: 8.5, f: INK }));
      } else {
        var sb0 = Math.max(0, (EXA + p.e - pm) / EXB), sbE = Math.min(qm, (EXA + p.e) / EXB);
        bx.push(line(x(sb0), y(EXA + p.e - EXB * sb0), x(sbE), y(EXA + p.e - EXB * sbE), INK, 1.8, '5 4'));
        bx.push(txt(x(sb0 + 6) + 8, y(EXA + p.e - EXB * (sb0 + 6)), 'social benefit', { s: 8.5, f: INK }));
      }
    }
    // deadweight triangle between market and optimum, bounded by the social curves
    if (Math.abs(m.gap) > 0.05) {
      var SB = function (q) { return EXA - EXB * q + (m.neg ? 0 : p.e); };
      var SC = function (q) { return EXC + EXD * q + (m.neg ? p.e : 0); };
      bx.push('<polygon points="' + x(m.qs) + ',' + y(SB(m.qs)) + ' ' + x(m.qm) + ',' + y(SB(m.qm)) + ' ' +
        x(m.qm) + ',' + y(SC(m.qm)) + '" fill="' + CLAY + '" opacity="0.55"/>');
    }
    bx.push(line(x(m.qs), 230, x(m.qs), 30, OLIVE, 1.4, '2 3'));
    bx.push(txt(x(m.qs), 242, 'optimum ' + Math.round(m.qs), { a: 'middle', s: 8.5, f: '#5A6B45' }));
    bx.push(line(x(m.qm), 230, x(m.qm), y(m.pb), CLAYD, 1.4));
    bx.push(txt(x(m.qm), 254, 'market ' + Math.round(m.qm), { a: 'middle', s: 8.5, f: CLAYD }));
    return svg('0 0 360 262', bx.join(''));
  }

  function fq(v) { return String(+v.toFixed(1)); }
  function params() { return { pos: el('ex-pos').checked, e: +el('ex-e').value, t: +el('ex-t').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('ex-e-v').textContent = '$' + p.e;
    el('ex-t-v').textContent = '$' + p.t;
    el('ex-tl').textContent = m.neg ? 'Corrective tax per unit' : 'Corrective subsidy per unit';
    el('ex-el').textContent = m.neg ? 'External cost per unit (borne by bystanders)' : 'External benefit per unit (enjoyed by bystanders)';
    el('ex-fig').innerHTML = draw(p, m);
    el('ex-ro-qm').textContent = fq(m.qm);
    el('ex-ro-qs').textContent = fq(m.qs);
    el('ex-rl-gap').textContent = m.gap >= 0 ? 'Overproduction' : 'Underproduction';
    el('ex-ro-gap').textContent = fq(Math.abs(m.gap));
    el('ex-ro-dwl').textContent = money(m.dwl);
    el('ex-ro-pb').textContent = '$' + m.pb.toFixed(2);
    el('ex-rl-money').textContent = m.neg ? 'Tax revenue' : 'Subsidy cost';
    el('ex-ro-money').textContent = money(m.money);
    var note, what = m.neg ? 'tax' : 'subsidy';
    if (p.e === 0) {
      note = 'No externality: private and social curves coincide, and the market\'s ' + fq(m.q0) + ' units are already efficient.' +
        (p.t > 0 ? ' Adding a ' + what + ' here only <em>creates</em> a deadweight loss — of ' + money(m.dwl) + '.' : '');
    } else if (p.t === 0) {
      note = m.neg
        ? '<strong>The market overproduces by ' + fq(m.gap) + ' units.</strong> Sellers ignore the $' + p.e + ' each unit costs bystanders, so they produce every unit whose <em>private</em> cost is covered — including ones whose full social cost is not. Deadweight loss: ' + money(m.dwl) + '. Now set the tax to $' + p.e + '.'
        : '<strong>The market underproduces by ' + fq(-m.gap) + ' units.</strong> Buyers ignore the $' + p.e + ' of benefit each unit gives others, so units worth more to society than they cost go unmade. Deadweight loss: ' + money(m.dwl) + '. Now set the subsidy to $' + p.e + '.';
    } else if (Math.abs(p.t - p.e) < 0.001) {
      note = '<strong>Internalised.</strong> A ' + what + ' equal to the external ' + (m.neg ? 'cost' : 'benefit') + ' — $' + p.e +
        ' — makes market participants face the full social ' + (m.neg ? 'cost' : 'benefit') + ', so the market lands exactly on the optimum of ' + fq(m.qs) + ' units and the deadweight loss is gone. That is a Pigouvian ' + what + '.';
    } else {
      note = (p.t < p.e ? 'Too small' : 'Too large') + ': a $' + p.t + ' ' + what + ' against a $' + p.e + ' externality leaves the market at ' + fq(m.qm) +
        ' instead of ' + fq(m.qs) + ', with ' + money(m.dwl) + ' of deadweight loss (it was ' + money(m.dwl0) + ' with no policy). ' +
        (p.t > p.e ? 'Overcorrecting is a mistake too — it swaps one inefficiency for another.' : 'Closer — keep going until the ' + what + ' matches the externality.');
    }
    el('ex-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['e', 't'].forEach(function (k) { el('ex-' + k).addEventListener('input', render); });
  el('ex-pos').addEventListener('change', render);
  st = Stepper(el('ap-ex'), [
    { t: 'The market finds where <strong>private</strong> benefit meets <strong>private</strong> cost. That is all buyers and sellers see.', lit: ['ex-ro-qm'], v: function (m) { return fq(m.qm) + ' units traded'; } },
    { t: 'Society wants the quantity where <strong>social</strong> benefit meets <strong>social</strong> cost — counting the bystanders.', lit: ['ex-ro-qs'], v: function (m) { return fq(m.qs) + ' units is efficient'; } },
    { t: 'Negative externality → too much. Positive → too little. The gap is the misallocation.', lit: ['ex-ro-gap'], v: function (m) { return fq(Math.abs(m.gap)) + (m.gap >= 0 ? ' too many' : ' too few'); } },
    { t: 'Each unit in the gap is worth less to society than it costs (or vice versa). Those losses add up to the triangle.', lit: ['ex-ro-dwl'], v: function (m) { return money(m.dwl) + ' deadweight loss'; } },
    { t: 'Set the tax or subsidy equal to the external cost or benefit per unit and the market finds the optimum on its own.', lit: ['ex-ro-money'], v: function (m) { return m.neg ? 'tax revenue ' + money(m.money) : 'subsidy cost ' + money(m.money); } }
  ], function () { return compute(params()); });
  render();
})();

/* =================================================================
 * MODEL 2 — a public good and the free-rider problem. N identical
 * households each value the good at v; it costs C to provide once.
 * Efficiency compares the SUM of values with C; private provision
 * happens only if a single household values it at C or more.
 * ================================================================= */
(function () {
  function compute(p) {
    var total = p.n * p.v, share = p.c / p.n;
    var efficient = total >= p.c, privately = p.v >= p.c;
    return {
      total: total, share: share, efficient: efficient, privately: privately,
      net: p.v - share, lost: efficient && !privately ? total - p.c : 0,
      minN: Math.ceil(p.c / p.v)
    };
  }

  function draw(p, m) {
    var bx = [], top = Math.max(m.total, p.c) * 1.15;
    var y = scale(0, top, 200, 30);
    bx.push(line(48, 200, 344, 200, AX));
    // stacked household values, drawn as N slices of one bar
    var bw = 70, x1 = 90;
    var slices = Math.min(p.n, 60);
    for (var i = 0; i < slices; i++) {
      var y0 = y(m.total * i / slices), y1 = y(m.total * (i + 1) / slices);
      bx.push('<rect x="' + x1 + '" y="' + y1 + '" width="' + bw + '" height="' + Math.max(0.5, y0 - y1 - (slices < 25 ? 1 : 0)) + '" fill="' + (i % 2 ? OLIVE : '#8FA274') + '"/>');
    }
    bx.push(txt(x1 + bw / 2, 216, 'total value', { a: 'middle', s: 9, f: '#5A6B45' }));
    bx.push(txt(x1 + bw / 2, y(m.total) - 6, money(m.total), { a: 'middle', s: 9.5, f: INK }));
    bx.push(rect(220, y(p.c), bw, 200 - y(p.c), CLAY, 0));
    bx.push(txt(220 + bw / 2, 216, 'cost', { a: 'middle', s: 9, f: CLAYD }));
    bx.push(txt(220 + bw / 2, y(p.c) - 6, money(p.c), { a: 'middle', s: 9.5, f: INK }));
    // one household's own value against the cost
    bx.push(line(56, y(p.v), 344, y(p.v), INK, 1.2, '3 3'));
    bx.push(txt(340, y(p.v) - 4, 'one household: ' + money(p.v), { a: 'end', s: 8.5, f: INK }));
    bx.push(txt(48, 236, p.n + ' households, each one slice of the green bar', { s: 8.5, f: FAINT }));
    return svg('0 0 360 246', bx.join(''));
  }

  function params() { return { n: +el('pg-n').value, v: +el('pg-v').value, c: +el('pg-c').value }; }
  var st;
  function render() {
    var p = params(), m = compute(p);
    el('pg-n-v').textContent = p.n;
    el('pg-v-v').textContent = money(p.v);
    el('pg-c-v').textContent = money(p.c);
    el('pg-fig').innerHTML = draw(p, m);
    el('pg-ro-total').textContent = money(m.total);
    el('pg-ro-eff').textContent = m.efficient ? 'Yes' : 'No';
    el('pg-ro-mkt').textContent = m.privately ? 'Yes' : 'No';
    el('pg-ro-lost').textContent = money(m.lost);
    el('pg-ro-share').textContent = money(m.share);
    el('pg-ro-net').textContent = (m.net < 0 ? '−' : '') + money(Math.abs(m.net));
    var note;
    if (!m.efficient) {
      note = '<strong>Not worth building.</strong> Even added up across all ' + p.n + ' households, the good is worth ' + money(m.total) +
        ', less than its ' + money(p.c) + ' cost. Here nobody providing it is the right outcome — public goods are not automatically worth funding. It would take ' + m.minN + ' households to justify it.';
    } else if (m.privately) {
      note = '<strong>Provided anyway.</strong> One household values it at ' + money(p.v) + ' — enough to pay the whole ' + money(p.c) +
        ' alone — so it gets built and everyone else rides free. Free riding still happens; it just doesn\'t stop provision.';
    } else {
      note = '<strong>The free-rider problem.</strong> Together the households value it at ' + money(m.total) + ', more than the ' + money(p.c) +
        ' cost, so building it creates ' + money(m.lost) + ' of surplus. But no single household will pay ' + money(p.c) + ' for something worth ' +
        money(p.v) + ' to them, and none can be excluded from enjoying it if someone else pays — so each waits for the others, and it never gets built. ' +
        'A tax of ' + money(m.share) + ' each funds it and leaves every household ' + money(m.net) + ' better off.';
    }
    el('pg-note').innerHTML = note;
    if (st) st.refresh();
  }
  ['n', 'v', 'c'].forEach(function (k) { el('pg-' + k).addEventListener('input', render); });
  st = Stepper(el('ap-pg'), [
    { t: 'A public good is non-rival: everyone enjoys the same unit. So its value to society is the <strong>sum</strong> of every household\'s value.', lit: ['pg-ro-total'], v: function (m) { return money(m.total) + ' in total'; } },
    { t: 'It is worth providing when that total covers the cost.', lit: ['pg-ro-eff'], v: function (m) { return m.efficient ? 'worth it' : 'not worth it'; } },
    { t: 'But it is non-excludable too, so each household can enjoy it without paying. A household pays only if the good is worth the <em>whole</em> cost to it alone.', lit: ['pg-ro-mkt'], v: function (m) { return m.privately ? 'someone builds it alone' : 'nobody builds it alone'; } },
    { t: 'When it is worth it but nobody provides it, the surplus is lost: that is the free-rider problem in dollars.', lit: ['pg-ro-lost'], v: function (m) { return money(m.lost) + ' never created'; } },
    { t: 'Compulsory funding fixes it: split the cost through taxes and compare each share with each household\'s value.', lit: ['pg-ro-share', 'pg-ro-net'], v: function (m) { return money(m.share) + ' tax each, net ' + (m.net < 0 ? '−' : '') + money(Math.abs(m.net)); } }
  ], function () { return compute(params()); });
  render();
})();
