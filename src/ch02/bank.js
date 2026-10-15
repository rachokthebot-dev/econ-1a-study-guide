/* Every distractor below is a mistake students actually make: inverting the
 * ratio, answering the absolute question when asked the comparative one,
 * quoting a rate on the boundary, or concluding that the better producer
 * should do everything. */
var FND = ['Absolute advantage', 'Comparative advantage', 'Specialisation', 'Terms of trade', 'Gains from trade'];

var BANK = [
  { id: 'aa1', home: 1, fnd: 1, type: 'mcq', short: 'Absolute vs comparative',
    stem: 'Alta makes 60 shirts or 30 loaves a day. Bram makes 20 shirts or 20 loaves. Who has the <em>absolute</em> advantage?',
    opts: [
      { t: 'Alta, in both goods', ok: true },
      { t: 'Alta in shirts, Bram in bread', why: 'That is the answer to the <em>comparative</em> question. Absolute advantage is a raw output comparison: 60 &gt; 20 and 30 &gt; 20, so Alta wins both.' },
      { t: 'Neither — you need opportunity costs first', why: 'Opportunity costs are for comparative advantage. Absolute advantage needs no division at all, just the four numbers as given.' },
      { t: 'Bram, because it is more balanced', why: 'Balance is irrelevant. Absolute advantage asks only who produces more, and Bram produces less of both.' }
    ] },
  { id: 'ca1', home: 1, fnd: 2, type: 'numeric', short: 'Opportunity cost of a shirt',
    stem: 'Same table — Alta: 60 shirts or 30 loaves. For Alta, what is the opportunity cost of <em>one shirt</em>, in loaves?',
    pre: '', answer: 0.5, tol: 0.01,
    why: 'You are pricing shirts, so shirts go on the bottom: 30 loaves ÷ 60 shirts = <strong>0.5</strong> loaves per shirt. Answering 2 inverts the ratio — that is the cost of one <em>loaf</em>, and the inversion flips which country should specialise where.' },
  { id: 'ca2', home: 1, fnd: 2, type: 'mcq', short: 'Comparative advantage in both',
    stem: 'Can one country hold comparative advantage in <em>both</em> goods?',
    opts: [
      { t: 'No — opportunity costs are reciprocals, so winning one means losing the other', ok: true },
      { t: 'Yes, if it is far more productive in both', why: 'That gives absolute advantage in both, which is common. Comparative advantage in both is arithmetically impossible however large the productivity gap.' },
      { t: 'Yes, but only if the two goods are unrelated', why: 'Relatedness plays no part. The impossibility is pure arithmetic: if your cost of A in terms of B is lower, your cost of B in terms of A must be higher.' },
      { t: 'Only when opportunity costs are identical', why: 'Identical costs mean <em>neither</em> side has comparative advantage in either good — the opposite of one side holding both.' }
    ] },

  { id: 'sp1', home: 2, fnd: 3, type: 'mcq', short: 'Who specialises where',
    stem: 'Alta: 60 shirts or 30 loaves. Bram: 20 shirts or 20 loaves. Who should make the bread?',
    opts: [
      { t: 'Bram — it gives up 1 shirt per loaf against Alta\'s 2', ok: true },
      { t: 'Alta — it produces more bread per day', why: 'That is absolute advantage. Alta makes more bread, but each loaf costs it 2 shirts; Bram gives up only 1. Specialisation follows opportunity cost.' },
      { t: 'Both should make some of each', why: 'With constant opportunity costs the gains are maximised by complete specialisation along comparative advantage.' },
      { t: 'Alta, because it has absolute advantage in both', why: 'Absolute advantage in both changes nothing. Alta cannot do everything without giving up the shirts it is relatively far better at.' }
    ] },
  { id: 'tt1', home: 2, fnd: 4, type: 'mcq', short: 'An acceptable rate',
    stem: 'Alta gives up 0.5 loaves per shirt; Bram gives up 1. Which terms of trade would <em>both</em> accept?',
    opts: [
      { t: '0.75 loaves per shirt', ok: true },
      { t: '0.5 loaves per shirt', why: 'Exactly on the floor. At 0.5 Alta is indifferent — it gains nothing over making its own — so this is not a rate that makes both better off. Exam answers must be strictly inside the band.' },
      { t: '1.2 loaves per shirt', why: 'Above the ceiling. Bram can make a shirt itself for 1 loaf, so it will never pay 1.2.' },
      { t: '0.3 loaves per shirt', why: 'Below the floor. Alta gives up 0.5 loaves to make a shirt, so selling at 0.3 would lose it value.' }
    ] },
  { id: 'tt2', home: 2, fnd: 4, type: 'mcq', short: 'Where the band comes from',
    stem: 'Why is the terms-of-trade band bounded by the two opportunity costs?',
    opts: [
      { t: 'Because outside it, one side can produce the good more cheaply itself and refuses to trade', ok: true },
      { t: 'Because governments set tariffs at those points', why: 'Nothing institutional is involved. The band falls straight out of the two producers\' own costs.' },
      { t: 'Because prices always settle at the midpoint of the band', why: 'Where inside the band the rate lands depends on bargaining power. The <em>bounds</em> are what the opportunity costs fix.' },
      { t: 'Because beyond it world output would fall', why: 'World output depends on who produces what, not on the exchange rate. The rate only splits the gains.' }
    ] },

  { id: 'gt1', home: 3, fnd: 5, type: 'mcq', short: 'Better at everything',
    stem: 'A surgeon types faster than her assistant. Why does she still hand over the typing?',
    opts: [
      { t: 'An hour of her typing costs an hour of surgery; the assistant gives up far less', ok: true },
      { t: 'Because typing is beneath her job description', why: 'Status plays no part in the economics. The argument is entirely about what each person forgoes.' },
      { t: 'Because the assistant has absolute advantage in typing', why: 'The assistant is explicitly slower, so has no absolute advantage. The assistant has comparative advantage — a lower opportunity cost.' },
      { t: 'Because she would be slower overall at both tasks together', why: 'She is faster at both. Specialisation is still right, because speed is not the measure — forgone alternatives are.' }
    ] },
  { id: 'gt2', home: 3, fnd: 5, type: 'mcq', short: 'When trade has nothing to offer',
    stem: 'Two countries each give up exactly 2 bushels per machine. What are the gains from specialising and trading?',
    opts: [
      { t: 'Zero — with identical opportunity costs neither can supply the other more cheaply', ok: true },
      { t: 'Positive, as long as one country is larger', why: 'Size affects how much is produced, not the cost ratios. With equal opportunity costs there is no cheaper producer to shift production toward.' },
      { t: 'Positive, because specialising always raises output', why: 'Specialisation raises output only when it moves production to a lower-cost producer. Here there isn\'t one.' },
      { t: 'Negative, because trade has transport costs', why: 'The gains are zero before any transport cost is considered. The point is that no comparative advantage exists.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 2, type: 'numeric', short: 'Opportunity cost of bread',
    stem: 'Alta makes 60 shirts or 30 loaves a day. For Alta, the opportunity cost of <em>one loaf</em> is how many shirts?',
    pre: '', answer: 2, tol: 0.01,
    why: 'Pricing loaves, so loaves on the bottom: 60 shirts ÷ 30 loaves = <strong>2</strong> shirts per loaf. Answering 0.5 prices a shirt instead.' },
  { id: 'q2', fnd: 1, type: 'mcq', short: 'What absolute advantage decides',
    stem: 'A country has absolute advantage in every good it can make. What does this tell you about what it should produce?',
    opts: [
      { t: 'Nothing on its own — the pattern of production follows comparative advantage', ok: true },
      { t: 'It should produce everything itself', why: 'This is the chapter\'s central error. Producing everything means giving up the goods it is relatively best at, which costs it more than importing.' },
      { t: 'It should produce whichever good it leads by the widest margin', why: 'Warm, but not the rule as stated — and "widest margin" in raw output is not the same as lowest opportunity cost unless you do the division.' },
      { t: 'It should not trade at all', why: 'It gains from trade exactly as the less productive country does, because comparative advantage still differs.' }
    ] },
  { id: 'q3', fnd: 3, type: 'mcq', short: 'Specialisation direction',
    stem: 'Bram gives up 1 shirt per loaf; Alta gives up 2. Alta produces more of both goods. Who makes the shirts?',
    opts: [
      { t: 'Alta — its cost per shirt is 0.5 loaves against Bram\'s 1', ok: true },
      { t: 'Bram, to balance the gains', why: 'Gains are balanced by the terms of trade, not by assigning production to the weaker party. Bram giving up 1 shirt per loaf means its cost per shirt is 1 loaf — higher than Alta\'s.' },
      { t: 'Both equally, since Alta is better at everything', why: 'Alta being better at everything is exactly when specialisation matters most. Splitting production wastes the cost difference.' },
      { t: 'Cannot be determined without the terms of trade', why: 'Who specialises where is fixed by opportunity costs alone. The terms of trade only divide the resulting gains.' }
    ] },
  { id: 'q4', fnd: 4, type: 'numeric', short: 'Band floor',
    stem: 'Producer X gives up 3 tonnes of wheat per tractor; producer Y gives up 7. In wheat per tractor, what is the <em>lowest</em> rate at which a trade could make both strictly better off? Give the boundary value.',
    pre: '', answer: 3, tol: 0.01,
    why: 'X is the low-cost tractor producer, and it will not sell below its own cost of <strong>3</strong>. The acceptable rates are those strictly above 3 and strictly below 7; 3 itself is the floor, where X is exactly indifferent.' },
  { id: 'q5', fnd: 5, type: 'mcq', short: 'Source of the gains',
    stem: 'Two countries specialise and trade, and both consume more than before. Where did the extra output come from?',
    opts: [
      { t: 'Production shifted toward whoever gives up less to make each good', ok: true },
      { t: 'Both countries increased their total hours worked', why: 'No extra effort is assumed anywhere in the model. The same resources produce more because they are better matched to tasks.' },
      { t: 'Trade created new resources', why: 'No resources are created. The same inputs are simply allocated to their lower-opportunity-cost uses.' },
      { t: 'One country gained at the other\'s expense', why: 'Both consume more than before — that is the premise. Voluntary trade inside the band is positive-sum.' }
    ] },
  { id: 'q6', fnd: 2, type: 'classify', short: 'Which advantage',
    stem: 'Each statement describes one of the two advantages. Which?',
    cats: ['Absolute advantage', 'Comparative advantage'],
    rows: [
      { t: 'Vietnam produces 400 shirts per worker-day; Portugal produces 250', cat: 'Absolute advantage' },
      { t: 'Portugal gives up less wine per shirt than Vietnam does', cat: 'Comparative advantage' },
      { t: 'A paralegal drafts briefs more slowly than the partner does', cat: 'Absolute advantage' },
      { t: 'An hour of the partner\'s drafting costs three hours of client meetings', cat: 'Comparative advantage' }
    ],
    why: 'Any statement that compares raw output or speed is about absolute advantage. Any statement phrased as "gives up", "costs", or "per" with the other good as the unit is about opportunity cost, and therefore comparative advantage.' },
  { id: 'q7', fnd: 4, type: 'mcq', short: 'Rate inside, deal still bad',
    stem: 'The terms of trade sit comfortably inside the acceptable band, yet one country ends up worse off than self-sufficiency. How?',
    opts: [
      { t: 'The volume traded was wrong — a good rate on too many units can still leave a side short', ok: true },
      { t: 'Impossible — a rate inside the band guarantees both gain', why: 'The band guarantees each unit traded is worth doing at that rate, not that any quantity leaves both above their baseline. The model in this chapter shows the failure directly.' },
      { t: 'The country lacked absolute advantage', why: 'Absolute advantage never determines who gains. Gains depend on costs and on the deal\'s terms and size.' },
      { t: 'Opportunity costs must have been identical', why: 'Identical costs would mean no band at all, but the question states the rate is comfortably inside one.' }
    ] },
  { id: 'q8', fnd: 5, type: 'mcq', short: 'No gains available',
    stem: 'Which situation leaves <em>no</em> gains from trade on the table?',
    opts: [
      { t: 'Both parties face exactly the same opportunity costs', ok: true },
      { t: 'One party is more productive in both goods', why: 'This is the standard case where trade still pays. Comparative advantage differs even when absolute advantage does not.' },
      { t: 'One party is much larger than the other', why: 'Size changes the volume traded, not whether gains exist.' },
      { t: 'Both parties want the same good', why: 'Wanting the same goods is normal and does not remove the cost differences that generate gains.' }
    ] },
  { id: 'q9', fnd: 3, type: 'mcq', short: 'Units discipline',
    stem: '"The opportunity cost is 2." Why is this unmarkable as it stands?',
    opts: [
      { t: 'It does not say which good is being priced or in what units', ok: true },
      { t: 'Opportunity cost must always be given in money', why: 'Opportunity cost is measured in forgone goods here; money is not required. What is required is naming the goods.' },
      { t: 'Opportunity cost cannot exceed 1', why: 'It can take any positive value — it is a ratio of two outputs.' },
      { t: 'It should have been rounded', why: 'Precision is not the problem. "2 what, per what?" is.' }
    ] },
  { id: 'q10', fnd: 1, type: 'mcq', short: 'Trade with a weaker partner',
    stem: 'A politician argues the country should not trade with a far less productive nation because "they can\'t make anything better than we can." The best economic reply is:',
    opts: [
      { t: 'Productivity is not the test — they will still be the cheaper producer of something in opportunity-cost terms', ok: true },
      { t: 'They will catch up on productivity eventually', why: 'True or not, it concedes the premise. The gains exist right now, at today\'s productivity levels.' },
      { t: 'Trade should be restricted to equally productive partners', why: 'This is the error restated. Differences in comparative advantage are exactly what make trade worth doing.' },
      { t: 'We gain only if we have absolute advantage in both goods', why: 'Absolute advantage never determines the gains. Reverse the claim and it is still wrong.' }
    ] }
];
