/* Headless check: console errors, model arithmetic, every interaction path.
 * A page like this fails silently — one throw and you get a clean-looking
 * screen with dead sliders — so this asserts the numbers, not just the pixels. */
import { chromium } from 'playwright';

const url = process.argv[2];
const errs = [], fails = [];
function ok(cond, label, got) { cond ? console.log('  ok   ' + label) : (fails.push(label + (got !== undefined ? ' → got ' + got : '')), console.log('  FAIL ' + label + (got !== undefined ? ' → got ' + got : ''))); }

const b = await chromium.launch();
const p = await b.newPage();
p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
p.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
await p.goto(url, { waitUntil: 'load' });

const T = s => p.textContent(s);

console.log('\n— applets rendered —');
for (const id of ['bag-fig', 'oc-fig', 'mt-fig', 'tv-fig'])
  ok((await p.locator(`#${id} svg`).count()) === 1, `${id} has one svg`);

console.log('\n— model arithmetic at default params —');
ok(await T('#bag-ro-switch') === '40%', 'bag: 40% switch at fee 10 / hassle 25', await T('#bag-ro-switch'));
ok(await T('#bag-ro-bags') === '60,000', 'bag: 60,000 bags/wk', await T('#bag-ro-bags'));
ok(await T('#bag-ro-rev') === '$6,000', 'bag: $6,000 revenue', await T('#bag-ro-rev'));
ok(await T('#bag-ro-gross') === '220.0 kg', 'bag: 220 kg gross avoided', await T('#bag-ro-gross'));
ok(await T('#bag-ro-off') === '−64.0 kg', 'bag: 64 kg liner offset', await T('#bag-ro-off'));
ok(await T('#bag-ro-net') === '156.0 kg', 'bag: 156 kg net', await T('#bag-ro-net'));

ok(await T('#oc-ro-ex') === '$64,000', 'oc: explicit $64,000', await T('#oc-ro-ex'));
ok(await T('#oc-ro-im') === '$136,000', 'oc: implicit $136,000', await T('#oc-ro-im'));
ok(await T('#oc-ro-tot') === '$200,000', 'oc: total $200,000', await T('#oc-ro-tot'));
ok(await T('#oc-ro-be') === '9.1 yr', 'oc: break-even 9.1 yr', await T('#oc-ro-be'));

ok(await T('#mt-ro-mb') === '52', 'mt: MB(6)=52', await T('#mt-ro-mb'));
ok(await T('#mt-ro-mc') === '44', 'mt: MC(6)=44', await T('#mt-ro-mc'));
ok(await T('#mt-ro-opt') === '6 hr', 'mt: optimum 6 hr', await T('#mt-ro-opt'));
ok(await T('#mt-ro-best') === '228', 'mt: best net 228', await T('#mt-ro-best'));
ok(await T('#mt-ro-greedy') === '24', 'mt: overshoot net 24', await T('#mt-ro-greedy'));

ok(await T('#tv-ro-cs') === '$25', 'tv: CS $25', await T('#tv-ro-cs'));
ok(await T('#tv-ro-ps') === '$25', 'tv: PS $25', await T('#tv-ro-ps'));
ok(await T('#tv-ro-tot') === '$50', 'tv: total $50', await T('#tv-ro-tot'));

console.log('\n— sliders actually move the models —');
await p.locator('#mt-q').fill('11');
ok(await T('#mt-ro-mb') === '12', 'mt: MB(11)=12 after drag', await T('#mt-ro-mb'));
ok((await T('#mt-note')).includes('overshot'), 'mt: note detects overshoot');
await p.locator('#mt-q').fill('6');

await p.locator('#tv-p').fill('70');
ok(await T('#tv-ro-cs') === '$10' && await T('#tv-ro-ps') === '$40', 'tv: split moves with price');
ok(await T('#tv-ro-tot') === '$50', 'tv: TOTAL IS INVARIANT to price', await T('#tv-ro-tot'));
await p.locator('#tv-p').fill('95');
ok(await T('#tv-ro-tot') === '$0' && (await T('#tv-note')).includes('outside the bargaining range'), 'tv: no trade outside range');
await p.locator('#tv-p').fill('55');

await p.locator('#oc-live').check();
ok(await T('#oc-ro-tot') === '$256,000', 'oc: living-expense trap inflates to $256,000', await T('#oc-ro-tot'));
ok((await T('#oc-note')).includes('wrong answer'), 'oc: note calls out the trap');
await p.locator('#oc-live').uncheck();

await p.locator('#bag-l').fill('100');
ok(parseFloat(await T('#bag-ro-net')) < 100, 'bag: high liner share collapses the net saving', await T('#bag-ro-net'));
await p.locator('#bag-l').fill('40');

console.log('\n— step-through annotator —');
const stepNext = p.locator('#ap-mt .steps button[data-a=next]');
for (let i = 0; i < 3; i++) await stepNext.click();
ok((await p.locator('#ap-mt .step.on').count()) === 1, 'mt stepper: exactly one live step');
ok((await p.locator('#ap-mt .step.on .sv').textContent()).length > 0, 'mt stepper: live step shows a computed value');
ok((await p.locator('#ap-mt .ro.lit').count()) >= 1, 'mt stepper: lights the relevant readout');

console.log('\n— checkpoint: right answer, wrong answer, settle —');
const ck1 = p.locator('#ck1');
ok((await ck1.locator('.q').count()) === 4, 'ck1 has 4 questions', await ck1.locator('.q').count());
// sc1: correct option is index 0
await ck1.locator('.q[data-id=sc1] .opt').nth(0).click();
ok((await ck1.locator('.q[data-id=sc1] .fb.ok').count()) === 1, 'sc1 correct → ok feedback');
ok((await ck1.locator('.q[data-id=sc1] .tick:not(.no)').count()) === 1, 'sc1 correct → drawn checkmark');
// pn1: pick a wrong option (index 1)
await ck1.locator('.q[data-id=pn1] .opt').nth(1).click();
ok((await ck1.locator('.q[data-id=pn1] .fb.no').count()) === 1, 'pn1 wrong → corrective feedback');
ok((await ck1.locator('.q[data-id=pn1] .opt.right').count()) === 1, 'pn1 wrong → correct option marked');
ok((await ck1.locator('.q[data-id=pn1] .fb.no').textContent()).includes('Ought'), 'pn1 feedback explains THIS distractor');
await p.waitForTimeout(1700);
ok(await ck1.locator('.q[data-id=sc1]').evaluate(n => n.classList.contains('settled')), 'correct question collapses');
ok(!(await ck1.locator('.q[data-id=pn1]').evaluate(n => n.classList.contains('settled'))), 'wrong question stays open');

console.log('\n— classify + numeric —');
const cls = ck1.locator('.q[data-id=in2]');
for (const [i, v] of [[0,'Positive incentive'],[1,'Negative incentive'],[2,'Negative incentive'],[3,'Positive incentive']])
  await cls.locator(`.clsrow[data-i="${i}"] select`).selectOption(v);
await cls.locator('button[data-a=check]').click();
ok((await cls.locator('.fb.ok').count()) === 1, 'in2 classify all-correct → ok');

console.log('\n— spaced recall actually brings items back —');
await p.locator('#ck2 .q[data-id=to1] .opt').nth(0).click();   // correct
await p.locator('#ck2 .q[data-id=to2] .opt').nth(1).click();   // wrong on purpose
await p.reload({ waitUntil: 'load' });
ok((await p.locator('#ck3 .q[data-id=to2]').count()) === 1, 'missed to2 returns at the NEXT checkpoint');
ok((await p.locator('#ck3 .q[data-id=to2] .pill.recall').count()) === 1, 'returning item is badged as recall');
ok((await p.locator('#ck4 .q[data-id=to1]').count()) === 1, 'correct to1 returns TWO checkpoints later');
ok((await p.locator('#ck2 .q[data-id=to1] .opt:not([disabled])').count()) === 0, 'answered item not re-asked in its own checkpoint');
const rail = await T('#railval');
ok(parseInt(rail) > 0, 'rail reflects progress after reload (localStorage)', rail);

console.log('\n— chapter quiz —');
const qz = p.locator('#bigquiz');
ok((await qz.locator('.q').count()) === 15, 'quiz has 15 questions', await qz.locator('.q').count());
// answer every mcq with option 0, numerics with the right answer
for (const id of ['q1','q2','q3','q5','q6','q7','q8','q11','q12','q13','q14'])
  await qz.locator(`.q[data-id=${id}] .opt`).nth(0).click();
for (const [id, v] of [['q4','5'],['q10','90'],['q15','650']])
  await qz.locator(`.q[data-id=${id}] input`).fill(v);
for (const [i, v] of [[0,'Direct effect'],[1,'Indirect effect'],[2,'Indirect effect'],[3,'Direct effect']])
  await qz.locator(`.q[data-id=q9] .clsrow[data-i="${i}"] select`).selectOption(v);
await qz.locator('button[data-a=submit]').click();
await p.waitForTimeout(400);
ok(!(await p.locator('#qresult').isHidden()), 'result panel shows');
const rh = await T('#qresult .rh');
ok(rh.startsWith('15 of 15'), 'all-correct key verifies: ' + rh, rh);
ok((await p.locator('#qresult .ch-row').count()) === 6, 'breakdown covers all 6 foundations', await p.locator('#qresult .ch-row').count());

console.log('\n— export —');
await p.context().grantPermissions(['clipboard-read','clipboard-write']);
await p.locator('#btn-export').click();
await p.waitForTimeout(250);
ok((await T('#export-note')).length > 0, 'export reports a result: ' + await T('#export-note'));

await p.setViewportSize({ width: 1280, height: 1000 });
await p.screenshot({ path: 'shot-top.png' });
await p.locator('#ap-mt').scrollIntoViewIfNeeded();
await p.waitForTimeout(300);
await p.screenshot({ path: 'shot-applet.png' });
await p.setViewportSize({ width: 430, height: 900 });
await p.locator('#ap-tv').scrollIntoViewIfNeeded();
await p.screenshot({ path: 'shot-mobile.png' });

await b.close();
console.log('\n' + '='.repeat(52));
console.log(errs.length ? 'CONSOLE ERRORS:\n' + errs.join('\n') : 'no console errors');
console.log(fails.length ? fails.length + ' ASSERTION FAILURE(S)' : 'all assertions passed');
process.exit(errs.length || fails.length ? 1 : 0);
