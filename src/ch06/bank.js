var FND = ['Consumer surplus', 'Producer surplus', 'Efficiency', 'Price controls', 'Deadweight loss'];

var BANK = [
  { id: 'cs1', home: 1, fnd: 1, type: 'mcq', short: 'What CS measures',
    stem: 'You would have paid $40 for a concert ticket. You bought one for $25. Your consumer surplus is:',
    opts: [
      { t: '$15', ok: true },
      { t: '$25, the price you paid', why: 'The price is what you gave up, not what you gained. Surplus is the gap between value and price.' },
      { t: '$40, what it was worth to you', why: 'That is your willingness to pay. You had to hand over $25 to get it, so only the $15 difference is surplus.' },
      { t: '$65, the two added together', why: 'Adding value to price double counts. Surplus is always a difference.' }
    ] },
  { id: 'cs2', home: 1, fnd: 2, type: 'numeric', short: 'Computing CS',
    stem: 'Demand is P = 60 − Q/2. At a price of $20, quantity demanded is 80. What is consumer surplus?',
    pre: '$', answer: 1600, tol: 0,
    why: 'The triangle is ½ × base × height = ½ × 80 × (60 − 20) = ½ × 80 × 40 = <strong>$1,600</strong>. The height is the <em>distance</em> from the price to the choke price, not the price itself — using 20 as the height gives $800, the standard wrong answer.' },
  { id: 'cs3', home: 1, fnd: 3, type: 'mcq', short: 'Efficiency vs fairness',
    stem: 'A market reaches its competitive equilibrium. Which claim is justified?',
    opts: [
      { t: 'Total surplus is maximised, which says nothing about how it is divided', ok: true },
      { t: 'The outcome is fair to everyone involved', why: 'Fairness is a normative judgement. Efficiency only says that no reallocation of production could create more total value.' },
      { t: 'Consumer and producer surplus are equal', why: 'The split depends on the relative slopes of the two curves and is usually unequal. Only the total is maximised.' },
      { t: 'Everyone who wants the good can afford it', why: 'Buyers whose willingness to pay is below the price are shut out, and the outcome is still efficient — those units were not worth producing.' }
    ] },

  { id: 'pc1', home: 2, fnd: 4, type: 'mcq', short: 'When a ceiling binds',
    stem: 'The equilibrium rent is $1,800. A city sets a rent ceiling of $2,200. What happens?',
    opts: [
      { t: 'Nothing — the ceiling is above equilibrium, so it does not bind', ok: true },
      { t: 'A shortage, since rents are capped', why: 'A cap only matters if it stops the price reaching where it wanted to go. $1,800 is already legal under a $2,200 ceiling.' },
      { t: 'Rents rise to $2,200', why: 'A ceiling is a maximum, not a target. Nothing pushes the market price up to it.' },
      { t: 'A surplus of apartments', why: 'Surpluses come from binding <em>floors</em>. This control does nothing at all.' }
    ] },
  { id: 'pc2', home: 2, fnd: 4, type: 'mcq', short: 'Minimum wage shape',
    stem: 'A minimum wage set above the equilibrium wage is an example of:',
    opts: [
      { t: 'A binding price floor, producing a surplus of labour — unemployment', ok: true },
      { t: 'A binding price ceiling, producing a shortage of labour', why: 'A minimum is a floor, and it binds from above. Workers supply more hours than firms want at the higher wage, so the gap is a surplus.' },
      { t: 'A non-binding floor', why: 'Set <em>above</em> equilibrium is exactly when a floor binds. Below equilibrium it would do nothing.' },
      { t: 'A tax on employers', why: 'A tax drives a wedge between what one side pays and the other receives. A floor sets a single legal price.' }
    ] },
  { id: 'pc3', home: 2, fnd: 5, type: 'mcq', short: 'Where DWL comes from',
    stem: 'Deadweight loss from a binding price ceiling represents:',
    opts: [
      { t: 'Surplus from mutually beneficial trades that no longer happen', ok: true },
      { t: 'Surplus transferred from sellers to buyers', why: 'That transfer is real but it is not a loss — the surplus still exists, in different hands. Deadweight loss is surplus that exists nowhere.' },
      { t: 'The money the government collects', why: 'A price control collects nothing. Even with a tax, revenue is a transfer rather than a deadweight loss.' },
      { t: 'The higher prices buyers now pay', why: 'A binding ceiling lowers the price buyers pay. And in any case a price change moves surplus around rather than destroying it.' }
    ] },

  { id: 'dw1', home: 3, fnd: 5, type: 'numeric', short: 'Computing DWL',
    stem: 'A control cuts quantity from 70 to 50. At 50 units, buyers value the good at $35 and sellers\' cost is $20. What is the deadweight loss?',
    pre: '$', answer: 150, tol: 0,
    why: 'The triangle is ½ × (70 − 50) × ($35 − $20) = ½ × 20 × 15 = <strong>$150</strong>. The base is the units <em>lost</em> and the height is the vertical gap between the curves at the new quantity.' },
  { id: 'dw2', home: 3, fnd: 3, type: 'mcq', short: 'Transfer or loss',
    stem: 'A binding rent ceiling leaves tenants who keep their flats paying $400 less per month. That $400 is:',
    opts: [
      { t: 'A transfer from landlords to those tenants, not a deadweight loss', ok: true },
      { t: 'Deadweight loss, since landlords lost it', why: 'Deadweight loss is surplus nobody holds. This $400 is held by the tenant every month — it moved rather than vanished.' },
      { t: 'A gain to society, since tenants need it more', why: 'Who needs it more is a normative judgement. In surplus accounting a dollar moved is a dollar moved.' },
      { t: 'Neither — surplus is unchanged by price changes', why: 'The <em>total</em> is unchanged by a pure transfer, but each side\'s share certainly changes, which is what this question is about.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'numeric', short: 'CS from a diagram',
    stem: 'Demand is P = 100 − 2Q. The market price is $40 and 30 units are sold. What is consumer surplus?',
    pre: '$', answer: 900, tol: 0,
    why: '½ × 30 × (100 − 40) = ½ × 30 × 60 = <strong>$900</strong>. Check the quantity is consistent: at P = 40, 40 = 100 − 2Q gives Q = 30 ✓.' },
  { id: 'q2', fnd: 4, type: 'classify', short: 'Binding or not',
    stem: 'Equilibrium price is $50. Classify each control.',
    cats: ['Binding', 'Not binding'],
    rows: [
      { t: 'A price ceiling of $35', cat: 'Binding' },
      { t: 'A price ceiling of $70', cat: 'Not binding' },
      { t: 'A price floor of $65', cat: 'Binding' },
      { t: 'A price floor of $40', cat: 'Not binding' }
    ],
    why: 'A ceiling is a maximum, so it binds only <em>below</em> equilibrium. A floor is a minimum, so it binds only <em>above</em> it. Anything on the other side leaves the equilibrium price perfectly legal, so nothing happens.' },
  { id: 'q3', fnd: 2, type: 'mcq', short: 'Producer surplus',
    stem: 'A farmer would accept $3 per kilo. The market price is $8 and she sells 200 kilos. Her producer surplus is:',
    opts: [
      { t: '$1,000', ok: true },
      { t: '$1,600, her total revenue', why: 'Revenue is price × quantity. Surplus is what is left after the cost of supplying those units — here $5 per kilo.' },
      { t: '$600, her total cost', why: 'That is the cost side alone. Surplus is the gap between what she received and that cost.' },
      { t: '$5, the gap per kilo', why: 'That is the per-unit surplus. The question asks for her total, so multiply by the 200 kilos.' }
    ] },
  { id: 'q4', fnd: 3, type: 'mcq', short: 'Why Q* is efficient',
    stem: 'Why does the competitive equilibrium quantity maximise total surplus?',
    opts: [
      { t: 'Every unit before it is worth more than it costs, and every unit after costs more than it is worth', ok: true },
      { t: 'Because consumer and producer surplus are equalised there', why: 'They are generally unequal at equilibrium. What is maximised is the sum, not the balance.' },
      { t: 'Because the price is as low as possible', why: 'The equilibrium price is not the lowest possible — a binding ceiling is lower, and it destroys surplus.' },
      { t: 'Because quantity is as large as possible', why: 'More units can be produced, but they would cost more than buyers value them, which reduces total surplus.' }
    ] },
  { id: 'q5', fnd: 5, type: 'mcq', short: 'Elasticity and DWL',
    stem: 'A binding price ceiling causes a larger deadweight loss when:',
    opts: [
      { t: 'Supply and demand are more elastic, so quantity falls further', ok: true },
      { t: 'Supply and demand are more inelastic', why: 'Inelastic curves mean quantity barely moves, so few trades are lost and the triangle is small. Deadweight loss comes from <em>lost trades</em>.' },
      { t: 'The good is a necessity', why: 'Necessities tend to be inelastic, which makes the loss smaller, not larger.' },
      { t: 'Elasticity has no effect on deadweight loss', why: 'Elasticity determines how much quantity responds, and the lost quantity is the base of the triangle.' }
    ] },
  { id: 'q6', fnd: 4, type: 'mcq', short: 'Who loses from a ceiling',
    stem: 'Rent control binds in a city. Which group is unambiguously worse off?',
    opts: [
      { t: 'Landlords, and renters who can no longer find a flat at all', ok: true },
      { t: 'All renters, since quality falls', why: 'Quality effects are real but off this diagram. Renters who keep a flat pay less and are better off in surplus terms.' },
      { t: 'Nobody — a ceiling only transfers surplus', why: 'It transfers <em>and</em> destroys. The deadweight loss triangle falls on would-be traders who are shut out.' },
      { t: 'Only the government', why: 'The government neither pays nor collects under a price control.' }
    ] },
  { id: 'q7', fnd: 1, type: 'mcq', short: 'What the demand curve height is',
    stem: 'The height of the demand curve at a given unit tells you:',
    opts: [
      { t: 'The most some buyer would pay for that unit', ok: true },
      { t: 'The price everyone pays', why: 'Everyone pays the single market price. The curve\'s height is each buyer\'s <em>maximum</em>, which is why surplus exists at all.' },
      { t: 'The cost of producing that unit', why: 'That is the height of the <em>supply</em> curve. Demand describes buyers, supply describes costs.' },
      { t: 'The quantity demanded at that price', why: 'Quantity is read off the horizontal axis. The height is a valuation.' }
    ] },
  { id: 'q8', fnd: 5, type: 'mcq', short: 'DWL from a floor',
    stem: 'A binding price floor is imposed. Compared with the free market, the quantity traded:',
    opts: [
      { t: 'Falls, because buyers demand less at the higher price', ok: true },
      { t: 'Rises, because sellers supply more', why: 'Sellers do want to supply more, but nobody can sell what buyers will not buy. Trade is capped by the short side, which is now demand.' },
      { t: 'Is unchanged, since the quantity is set by equilibrium', why: 'The equilibrium is exactly what the floor prevents. Quantity is determined by whichever side is smaller at the legal price.' },
      { t: 'Depends on whether the good is normal or inferior', why: 'Normal versus inferior concerns income effects, not the mechanics of a binding floor.' }
    ] },
  { id: 'q9', fnd: 2, type: 'mcq', short: 'Surplus and the price',
    stem: 'The market price falls while quantity traded rises along a fixed demand curve. Consumer surplus:',
    opts: [
      { t: 'Rises — buyers pay less and more of them buy', ok: true },
      { t: 'Falls, because sellers receive less', why: 'Sellers receiving less reduces <em>producer</em> surplus. The question asks about buyers, who are better off.' },
      { t: 'Is unchanged, because it is a transfer', why: 'Some of it is a transfer from sellers, but the consumer surplus triangle unambiguously grows when the price falls along a fixed demand curve.' },
      { t: 'Cannot be determined without elasticity', why: 'Elasticity affects how much it rises, not whether. A lower price on a fixed demand curve always raises consumer surplus.' }
    ] },
  { id: 'q10', fnd: 3, type: 'mcq', short: 'Linking back to Chapter 1',
    stem: 'Total surplus in a market is the many-trader version of which Chapter 1 idea?',
    opts: [
      { t: 'Trade creates value, because buyers and sellers value the good differently', ok: true },
      { t: 'Scarcity, because resources are limited', why: 'Scarcity is why the curves slope at all, but surplus specifically measures the <em>gains from exchange</em>.' },
      { t: 'Incentives, because prices change behaviour', why: 'Prices do give incentives, but surplus measures value created rather than behaviour changed.' },
      { t: 'Trade-offs, because buying one thing means not buying another', why: 'Trade-offs shape the demand curve\'s position. Surplus is the gap between valuation and price, which is the trade-creates-value idea.' }
    ] }
];
