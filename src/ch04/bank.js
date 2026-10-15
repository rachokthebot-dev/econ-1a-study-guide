var FND = ['Shift vs movement', 'Demand shifters', 'Supply shifters', 'Equilibrium', 'Disequilibrium'];

var BANK = [
  { id: 'sm1', home: 1, fnd: 1, type: 'mcq', short: 'Shift or movement',
    stem: 'A frost destroys much of the orange crop and the price of oranges rises. What happens on the <em>demand</em> diagram for oranges?',
    opts: [
      { t: 'A movement along demand — quantity demanded falls because the price rose', ok: true },
      { t: 'Demand shifts left, because people buy fewer oranges', why: 'They buy fewer because the <em>price</em> rose, and a price change never shifts that good\'s own demand curve. Demand would shift only if something other than price changed buyers\' willingness.' },
      { t: 'Demand shifts right, because oranges are now scarcer', why: 'Scarcity on the supply side does not change what buyers want at each price. The frost shifts <em>supply</em> left.' },
      { t: 'Nothing — the frost only affects supply', why: 'Supply shifting is indeed the cause, but the demand diagram still shows a response: buyers slide up along the demand curve to the new price.' }
    ] },
  { id: 'ds1', home: 1, fnd: 2, type: 'mcq', short: 'Income and inferior goods',
    stem: 'Incomes in a city rise sharply, and demand for bus travel falls. What does this tell you about bus travel?',
    opts: [
      { t: 'It is an inferior good — demand moves opposite to income', ok: true },
      { t: 'It is a normal good with weak demand', why: 'A normal good\'s demand rises with income. Demand here <em>fell</em>, which is the definition of an inferior good.' },
      { t: 'Buses must be a complement to cars', why: 'Complements move together in price, not in response to income. Nothing here is about another good\'s price.' },
      { t: 'The supply of bus travel fell', why: 'The question says demand fell, not supply. And a supply change would not be caused by buyers\' incomes.' }
    ] },
  { id: 'ss1', home: 1, fnd: 3, type: 'mcq', short: 'Input costs',
    stem: 'The wage paid to bakery workers doubles. On the market for bread:',
    opts: [
      { t: 'Supply shifts left — at every price, less is worth producing', ok: true },
      { t: 'Supply shifts right, since bakeries need more revenue', why: 'Needing revenue is not the test. Higher costs make each loaf less profitable, so fewer are worth making at any given price — the curve moves left.' },
      { t: 'Demand shifts left, because bread will cost more', why: 'Bread costing more moves buyers <em>along</em> demand. The wage change reaches sellers, so it is a supply shifter.' },
      { t: 'Both curves shift left', why: 'Only sellers face the higher wage. Buyers\' willingness to pay at each price is unchanged.' }
    ] },

  { id: 'eq1', home: 2, fnd: 5, type: 'mcq', short: 'What a shortage is',
    stem: 'Which statement describes a <em>shortage</em> precisely?',
    opts: [
      { t: 'At the current price, quantity demanded exceeds quantity supplied by a specific number of units', ok: true },
      { t: 'There is not very much of the good available', why: 'That is closer to scarcity, which is permanent and applies to every good. A shortage is a gap at a <em>stated price</em>, measured in units.' },
      { t: 'The good is expensive relative to incomes', why: 'Expense is not a shortage. A shortage arises when the price is <em>too low</em> to clear the market, not too high.' },
      { t: 'Producers have chosen to make less of it', why: 'A shortage is a gap between two quantities at a price, not a statement about producers\' intentions.' }
    ] },
  { id: 'eq2', home: 2, fnd: 4, type: 'numeric', short: 'Solving for equilibrium',
    stem: 'Qd = 90 − 3P and Qs = 10 + 2P. What is the equilibrium <em>price</em>?',
    pre: '$', answer: 16, tol: 0,
    why: 'Set Qd = Qs: 90 − 3P = 10 + 2P → 80 = 5P → P = <strong>16</strong>. (Quantity is then 90 − 48 = 42, which many questions ask for next — compute it from either equation as a check.)' },
  { id: 'eq3', home: 2, fnd: 5, type: 'mcq', short: 'Price above equilibrium',
    stem: 'A market\'s price sits above equilibrium. What follows?',
    opts: [
      { t: 'A surplus, and sellers cut the price', ok: true },
      { t: 'A shortage, and sellers raise the price', why: 'Reversed. High prices attract sellers and deter buyers, so the unsold goods pile up — that is a surplus.' },
      { t: 'A surplus, and sellers raise the price further', why: 'The surplus is right, but unsold stock gives sellers a reason to <em>cut</em>, not raise. Price pressure always points back toward equilibrium.' },
      { t: 'Nothing — the market can sit anywhere', why: 'Away from equilibrium one side is disappointed, and that side pushes the price. Only the crossing is at rest.' }
    ] },

  { id: 'db1', home: 3, fnd: 4, type: 'mcq', short: 'Both curves shift',
    stem: 'Demand shifts right and supply shifts left. What can you say for certain?',
    opts: [
      { t: 'Price rises; the change in quantity is ambiguous', ok: true },
      { t: 'Both price and quantity rise', why: 'Demand pushes quantity up and supply pushes it down, so the net depends on which shift is larger — information the question has not given you.' },
      { t: 'Price rises and quantity falls', why: 'Quantity falls only if the supply shift dominates. State the ambiguity rather than picking a side.' },
      { t: 'Both are ambiguous', why: 'Price is determinate here: both shifts push it up. When the curves move in <em>opposite</em> directions, price is certain.' }
    ] },
  { id: 'db2', home: 3, fnd: 1, type: 'mcq', short: 'The four-step method',
    stem: 'What is the correct first question when working a supply-and-demand problem?',
    opts: [
      { t: 'Which curve does this event touch — buyers or sellers?', ok: true },
      { t: 'Does the price rise or fall?', why: 'The price is the <em>output</em> of the analysis, not the input. Deciding it first is guessing, and it is how students get the direction backwards.' },
      { t: 'Is the good normal or inferior?', why: 'Only relevant once you know an income change is involved. The first cut is always which side of the market the event reaches.' },
      { t: 'What is the elasticity?', why: 'Elasticity tells you how <em>far</em> things move, which is next chapter. Direction comes first.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'classify', short: 'Shift or movement',
    stem: 'For the market in <em>coffee</em>, classify each event.',
    cats: ['Shifts the demand curve', 'Shifts the supply curve', 'Movement along a curve'],
    rows: [
      { t: 'The price of coffee falls, so people buy more of it', cat: 'Movement along a curve' },
      { t: 'A study reports health benefits of coffee', cat: 'Shifts the demand curve' },
      { t: 'A drought damages the Brazilian harvest', cat: 'Shifts the supply curve' },
      { t: 'The price of tea rises sharply', cat: 'Shifts the demand curve' }
    ],
    why: 'Only a change in <strong>coffee\'s own price</strong> gives a movement. Health news changes what buyers want at every price; the drought changes what sellers can offer at every price; and tea is a substitute, so its price reaches coffee <em>buyers</em> — demand, not supply.' },
  { id: 'q2', fnd: 4, type: 'numeric', short: 'Equilibrium quantity',
    stem: 'Qd = 200 − 4P and Qs = 50 + 2P. What is the equilibrium <em>quantity</em>?',
    pre: '', answer: 100, tol: 0,
    why: '200 − 4P = 50 + 2P → 150 = 6P → P = 25. Then Q = 50 + 2(25) = <strong>100</strong> (check: 200 − 100 = 100 ✓). Answering 25 gives the price, which is the most common slip on this item.' },
  { id: 'q3', fnd: 2, type: 'mcq', short: 'Complements',
    stem: 'The price of printers falls sharply. In the market for printer ink:',
    opts: [
      { t: 'Demand shifts right — ink and printers are complements', ok: true },
      { t: 'Demand shifts left, since buyers spend their money on printers', why: 'Complements are used together. Cheaper printers mean more printers in use, and every one of them needs ink.' },
      { t: 'Supply shifts right, because printers are an input to ink', why: 'Printers are not an input to making ink. The link runs through buyers, so it is a demand shifter.' },
      { t: 'Nothing happens until the ink price itself changes', why: 'Related-goods prices are one of the five demand shifters precisely because they act without the good\'s own price moving.' }
    ] },
  { id: 'q4', fnd: 5, type: 'mcq', short: 'Who trades in a shortage',
    stem: 'At a price below equilibrium, quantity demanded is 90 and quantity supplied is 50. How many units actually change hands?',
    opts: [
      { t: '50 — trade is capped by the short side of the market', ok: true },
      { t: '90, because that is what buyers want', why: 'Wanting is not buying. You cannot purchase units nobody has produced.' },
      { t: '70, the average of the two', why: 'There is no averaging. The binding constraint is whichever quantity is smaller.' },
      { t: '140, the sum of both', why: 'The two numbers describe the same market from each side, so adding them is double counting.' }
    ] },
  { id: 'q5', fnd: 3, type: 'mcq', short: 'Sellers\' expectations',
    stem: 'Farmers expect wheat prices to be much <em>lower</em> next season. What happens to the supply of wheat today?',
    opts: [
      { t: 'It shifts right — sellers would rather sell now than later', ok: true },
      { t: 'It shifts left, as they hold stock back', why: 'Holding back makes sense when they expect a <em>higher</em> future price. Expecting a fall is a reason to sell before it arrives.' },
      { t: 'It does not move until the future actually arrives', why: 'Expectations are one of the five supply shifters and act immediately on today\'s decisions.' },
      { t: 'Demand shifts instead', why: 'These are sellers\' expectations, so they reach the supply curve. Note that buyers\' expectations work with the opposite sign.' }
    ] },
  { id: 'q6', fnd: 4, type: 'mcq', short: 'Both shift, same direction',
    stem: 'Both demand and supply shift right. What is certain?',
    opts: [
      { t: 'Quantity rises; the price change is ambiguous', ok: true },
      { t: 'Price falls and quantity rises', why: 'Price falls only if the supply shift dominates. Demand shifting right pushes price up, so the two effects fight.' },
      { t: 'Price rises and quantity rises', why: 'Same problem in the other direction. With both curves moving the same way, price is the ambiguous one.' },
      { t: 'Both are ambiguous', why: 'Quantity is determinate: both shifts push it up. Same direction → quantity certain.' }
    ] },
  { id: 'q7', fnd: 1, type: 'mcq', short: 'Wording discipline',
    stem: '"An increase in demand" and "an increase in quantity demanded" differ because:',
    opts: [
      { t: 'The first is a shift of the whole curve; the second is a movement caused by a lower price', ok: true },
      { t: 'They mean the same thing in different words', why: 'They are different claims with different causes and different diagrams. Exams use the wording to test whether you know which.' },
      { t: 'The first applies to individuals and the second to markets', why: 'Both apply at either level. The distinction is shift versus movement, not individual versus market.' },
      { t: 'The second only happens in the long run', why: 'Time horizon is not the difference. The difference is what caused the change.' }
    ] },
  { id: 'q8', fnd: 2, type: 'mcq', short: 'Number of buyers',
    stem: 'A large new student population arrives in a town. In the local market for rental flats:',
    opts: [
      { t: 'Demand shifts right, raising both the equilibrium rent and the quantity rented', ok: true },
      { t: 'Demand shifts right, raising rent and lowering quantity', why: 'Quantity falls only when supply shifts left. Here the supply curve is unmoved, so the market slides <em>up along</em> it: higher rent and more flats rented.' },
      { t: 'Supply shifts left, since flats are scarcer per person', why: 'The number of flats offered at each rent has not changed. More people wanting them is a demand shifter.' },
      { t: 'Both curves shift right', why: 'New students are buyers, not landlords. Only demand moves.' }
    ] },
  { id: 'q9', fnd: 5, type: 'mcq', short: 'Why equilibrium persists',
    stem: 'Why does a market tend to return to equilibrium after a disturbance?',
    opts: [
      { t: 'Away from it someone is disappointed, and that side changes the price', ok: true },
      { t: 'Because governments adjust prices toward it', why: 'No authority is needed. The pressure comes from buyers who cannot buy or sellers who cannot sell.' },
      { t: 'Because supply and demand curves move toward each other', why: 'The curves do not move at all. The <em>price</em> moves along them until the two quantities match.' },
      { t: 'Because quantity demanded always equals quantity supplied', why: 'That holds only <em>at</em> equilibrium. Away from it the two differ, and the gap is what drives the adjustment.' }
    ] },
  { id: 'q10', fnd: 3, type: 'mcq', short: 'Subsidy on sellers',
    stem: 'The government pays producers $2 for every unit they make. The supply curve:',
    opts: [
      { t: 'Shifts right — each unit is now worth producing at a lower market price', ok: true },
      { t: 'Shifts left, because the market is distorted', why: '"Distorted" is not a direction. A payment per unit makes production more attractive, so more is offered at every price.' },
      { t: 'Does not move; only the price changes', why: 'The subsidy changes what sellers will offer at each market price, which is the definition of a supply shift.' },
      { t: 'Demand shifts right instead', why: 'The payment goes to producers, so it reaches the supply side. Buyers\' willingness to pay is unchanged.' }
    ] }
];
