var FND = ['What elasticity is', 'Midpoint method', 'Revenue test', 'Along the curve', 'Income & cross-price'];

var BANK = [
  { id: 'el1', home: 1, fnd: 1, type: 'mcq', short: 'What elastic means',
    stem: 'Demand for a good is described as "highly elastic." This means:',
    opts: [
      { t: 'Quantity demanded responds strongly to a change in price', ok: true },
      { t: 'A great many units are sold', why: 'Elasticity is about <em>responsiveness</em>, not volume. A niche product with many close substitutes can be highly elastic while selling very little.' },
      { t: 'The demand curve is steep', why: 'Backwards, and the link is unreliable anyway: elastic regions are the <em>flatter</em> ones, and on a straight line elasticity changes while slope does not.' },
      { t: 'Buyers will pay almost anything for it', why: 'That describes <em>inelastic</em> demand — buyers who cannot walk away.' }
    ] },
  { id: 'el2', home: 1, fnd: 2, type: 'numeric', short: 'Midpoint elasticity',
    stem: 'Price rises from $8 to $12 and quantity falls from 120 to 80. Using the midpoint method, what is |Ed|? Give two decimal places.',
    pre: '', answer: 1, tol: 0.01,
    why: '%ΔQ = −40 ÷ 100 = −40%. %ΔP = 4 ÷ 10 = +40%. |Ed| = 40/40 = <strong>1.00</strong> — unit elastic. The naïve method from the starting values gives (−40/120)/(4/8) = 0.67, a different verdict entirely, which is exactly why the midpoint formula exists.' },
  { id: 'el3', home: 1, fnd: 2, type: 'mcq', short: 'Why midpoint',
    stem: 'Why does the midpoint method divide by the average of the two values?',
    opts: [
      { t: 'So the elasticity is the same whether the price rose or fell', ok: true },
      { t: 'Because averages are more accurate than endpoints', why: 'Accuracy is not the issue — the problem is <em>consistency</em>. Starting values give one answer going up and a different one coming back down between the same two points.' },
      { t: 'To make the result positive', why: 'The sign comes from the curve sloping down, and we take absolute value separately. Averaging does nothing to the sign.' },
      { t: 'To correct for inflation', why: 'Nothing here involves the price level over time. Both points are observed in the same market at the same moment.' }
    ] },

  { id: 'rv1', home: 2, fnd: 3, type: 'mcq', short: 'Revenue test',
    stem: 'A cinema raises ticket prices and total revenue <em>falls</em>. Demand must be:',
    opts: [
      { t: 'Elastic — the drop in attendance outweighed the higher price', ok: true },
      { t: 'Inelastic, since people still came', why: 'If demand were inelastic, a price rise would have <em>raised</em> revenue. Falling revenue is the signature of elastic demand.' },
      { t: 'Unit elastic', why: 'Unit elastic means revenue does not change. Here it fell.' },
      { t: 'Perfectly inelastic', why: 'Then quantity would not have moved at all and revenue would have risen in proportion to the price.' }
    ] },
  { id: 'rv2', home: 2, fnd: 4, type: 'mcq', short: 'Slope vs elasticity',
    stem: 'On a single straight-line demand curve, as you move down and to the right, elasticity:',
    opts: [
      { t: 'Falls continuously, from very elastic to very inelastic', ok: true },
      { t: 'Stays constant, because the slope is constant', why: 'This is the chapter\'s headline trap. Slope is Δ P over Δ Q in units; elasticity is a ratio of <em>percentages</em>, and it depends on P/Q, which changes at every point.' },
      { t: 'Rises, because quantity is getting larger', why: 'A larger Q with a smaller P makes P/Q smaller, so elasticity falls. The direction is the other way.' },
      { t: 'Stays at 1 throughout', why: 'Unit elasticity holds at exactly one point — the midpoint — not along the whole line.' }
    ] },
  { id: 'rv3', home: 2, fnd: 3, type: 'mcq', short: 'Raising revenue',
    stem: 'A bus company finds |Ed| = 0.4 for its fares. To raise total revenue it should:',
    opts: [
      { t: 'Raise fares — few riders will leave', ok: true },
      { t: 'Cut fares to attract more riders', why: 'Cutting works when demand is <em>elastic</em>. At 0.4 a 10% fare cut gains only about 4% more riders, so revenue falls.' },
      { t: 'Leave fares unchanged; revenue is already maximised', why: 'Revenue is maximised only where |Ed| = 1. At 0.4 the company is on the inelastic stretch and has room to raise fares.' },
      { t: 'It cannot be determined without knowing costs', why: 'Costs matter for <em>profit</em>. The question asks about revenue, which elasticity alone settles.' }
    ] },

  { id: 'ic1', home: 3, fnd: 5, type: 'mcq', short: 'Income elasticity sign',
    stem: 'A good has income elasticity of −0.6. The good is:',
    opts: [
      { t: 'Inferior — demand falls as income rises', ok: true },
      { t: 'Normal but inelastic', why: 'Normal goods have <em>positive</em> income elasticity. The minus sign is the whole answer here, which is why you must not discard it.' },
      { t: 'A luxury', why: 'Luxuries have income elasticity above +1. This is the opposite end of the scale.' },
      { t: 'A complement to another good', why: 'Complements are identified by <em>cross-price</em> elasticity, a different formula. Income elasticity says nothing about other goods.' }
    ] },
  { id: 'ic2', home: 3, fnd: 5, type: 'mcq', short: 'Cross-price sign',
    stem: 'The cross-price elasticity between tea and coffee is +1.4. They are:',
    opts: [
      { t: 'Substitutes — a dearer coffee sends buyers to tea', ok: true },
      { t: 'Complements', why: 'Complements give a <em>negative</em> cross-price elasticity: dearer printers mean less ink demanded. Positive means substitutes.' },
      { t: 'Unrelated goods', why: 'Unrelated goods give a cross-price elasticity near zero. +1.4 is a strong relationship.' },
      { t: 'Both inferior goods', why: 'Inferior and normal are about <em>income</em> elasticity. Cross-price elasticity identifies substitutes and complements.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 2, type: 'numeric', short: 'Midpoint elasticity',
    stem: 'Price falls from $20 to $16 and quantity rises from 50 to 70. Using the midpoint method, what is |Ed|? Two decimal places.',
    pre: '', answer: 1.5, tol: 0.02,
    why: '%ΔQ = 20 ÷ 60 = 33.3%. %ΔP = −4 ÷ 18 = −22.2%. |Ed| = 33.3 / 22.2 = <strong>1.50</strong> — elastic, so the price cut should have raised revenue. Check: $1,000 → $1,120 ✓.' },
  { id: 'q2', fnd: 3, type: 'mcq', short: 'Revenue direction',
    stem: 'Demand for a product is inelastic. The firm cuts its price. Total revenue:',
    opts: [
      { t: 'Falls', ok: true },
      { t: 'Rises', why: 'Rising revenue from a price cut is the <em>elastic</em> case. With inelastic demand the extra units gained are too few to cover the lower price.' },
      { t: 'Stays the same', why: 'Revenue is unchanged only at unit elasticity.' },
      { t: 'Cannot be determined without the costs', why: 'Revenue needs only price and quantity. Costs would matter if the question asked about profit.' }
    ] },
  { id: 'q3', fnd: 1, type: 'classify', short: 'Elastic or inelastic',
    stem: 'Classify the likely price elasticity of demand for each.',
    cats: ['Relatively elastic', 'Relatively inelastic'],
    rows: [
      { t: 'Insulin for a diabetic patient', cat: 'Relatively inelastic' },
      { t: 'One particular brand of bottled water', cat: 'Relatively elastic' },
      { t: 'Petrol, measured over the next week', cat: 'Relatively inelastic' },
      { t: 'Overseas holidays', cat: 'Relatively elastic' }
    ],
    why: 'Run the checklist: close substitutes available (a single water brand has many; insulin has none), necessity versus luxury (holidays are postponable, insulin is not), and time to adjust (petrol is inelastic this week and far more elastic over years, once people can change car or move).' },
  { id: 'q4', fnd: 4, type: 'mcq', short: 'Where revenue peaks',
    stem: 'On a linear demand curve, total revenue is maximised:',
    opts: [
      { t: 'At the midpoint, where |Ed| = 1', ok: true },
      { t: 'At the highest price on the curve', why: 'At the top of the curve quantity approaches zero, so revenue does too. Revenue is a product, not a price.' },
      { t: 'At the largest quantity', why: 'At the bottom price approaches zero, so revenue approaches zero again. The maximum sits between the two extremes.' },
      { t: 'Wherever the curve is steepest', why: 'A straight line has the same steepness everywhere, yet revenue clearly varies along it — which is the point of the distinction.' }
    ] },
  { id: 'q5', fnd: 5, type: 'numeric', short: 'Income elasticity',
    stem: 'Income rises 10% and a household\'s quantity demanded of a good rises 25%. What is the income elasticity? One decimal place, with the sign if negative.',
    pre: '', answer: 2.5, tol: 0.05,
    why: '25% ÷ 10% = <strong>2.5</strong>. Positive, so a normal good; above +1, so a luxury. This is one of the three elasticities where the sign carries meaning — do not take an absolute value here.' },
  { id: 'q6', fnd: 1, type: 'mcq', short: 'Market definition',
    stem: 'Which has the <em>most</em> elastic demand?',
    opts: [
      { t: 'Kellogg\'s Corn Flakes', ok: true },
      { t: 'Breakfast cereal', why: 'Broader than one brand, so fewer substitutes and less elastic. Narrower market definitions are always more elastic.' },
      { t: 'Food', why: 'The broadest category here, with essentially no substitute. Food in general is highly inelastic.' },
      { t: 'Groceries', why: 'Still a broad category. The narrower the definition, the easier it is to switch away, and the more elastic demand becomes.' }
    ] },
  { id: 'q7', fnd: 5, type: 'mcq', short: 'Reading a cross-price number',
    stem: 'The cross-price elasticity of demand between tennis rackets and tennis balls is −0.8. This means:',
    opts: [
      { t: 'They are complements — dearer rackets reduce demand for balls', ok: true },
      { t: 'They are substitutes with weak demand', why: 'Substitutes give a positive number. The negative sign is the identification.' },
      { t: 'Balls are an inferior good', why: 'Inferior is about income elasticity. Cross-price elasticity concerns another good\'s price.' },
      { t: 'Demand for balls is inelastic', why: 'That would be a statement about the balls\' <em>own</em> price. This figure is a cross-price elasticity.' }
    ] },
  { id: 'q8', fnd: 4, type: 'mcq', short: 'Steep is not inelastic',
    stem: 'Two demand curves cross at a point. At that exact point, which is more elastic?',
    opts: [
      { t: 'The flatter one, since the same price change moves quantity further', ok: true },
      { t: 'The steeper one', why: 'Steeper means quantity responds <em>less</em> to price, which is inelastic. The comparison works only at a shared point, because there P and Q are equal for both.' },
      { t: 'They are equally elastic, since they share a point', why: 'Sharing P and Q fixes the P/Q part of the formula, so the remaining difference is the slope — and the two slopes differ.' },
      { t: 'It depends on total revenue at that point', why: 'Revenue is identical at a shared point (same P, same Q), so it cannot distinguish them.' }
    ] },
  { id: 'q9', fnd: 3, type: 'mcq', short: 'Unit elastic revenue',
    stem: 'Demand is exactly unit elastic over a range. A firm raises its price within that range. Total revenue:',
    opts: [
      { t: 'Does not change', ok: true },
      { t: 'Rises slightly', why: 'At unit elasticity the percentage fall in quantity exactly matches the percentage rise in price, so the product is unchanged.' },
      { t: 'Falls slightly', why: 'Same reasoning — the two percentage changes cancel exactly, in both directions.' },
      { t: 'Doubles', why: 'Nothing in the revenue test produces a doubling. Unit elasticity is the no-change case.' }
    ] },
  { id: 'q10', fnd: 1, type: 'mcq', short: 'Time and elasticity',
    stem: 'Why is demand for electricity more elastic over five years than over one month?',
    opts: [
      { t: 'Given time, households can switch appliances, insulate, or change supplier', ok: true },
      { t: 'Because prices change more over five years', why: 'How much price moves is separate from how responsive quantity is. Elasticity is the ratio, not the size of either change.' },
      { t: 'Because electricity becomes a luxury over time', why: 'It stays a necessity. What changes is the number of available adjustments, not the good\'s character.' },
      { t: 'Because incomes rise over five years', why: 'Income affects the position of demand, not its price responsiveness. The driver here is time to substitute.' }
    ] }
];
