var FND = ['Binding or not', 'Ceilings & shortages', 'Floors & surpluses', 'Short run vs long run', 'Surplus & deadweight loss'];

var BANK = [
  { id: 'b1', home: 1, fnd: 1, type: 'mcq', short: 'A ceiling above equilibrium',
    stem: 'The equilibrium price of bread is $4. The government imposes a price ceiling of $5. What happens?',
    opts: [
      { t: 'Nothing. The ceiling is not binding, so the market still clears at $4', ok: true },
      { t: 'A surplus, because the legal price is above equilibrium', why: 'That is what a <em>floor</em> above equilibrium does. A ceiling is a maximum, and the market price of $4 is already under it, so the law never comes into play.' },
      { t: 'A shortage, because ceilings always create shortages', why: 'Only <em>binding</em> ceilings, which are set below equilibrium, create shortages. This one is above equilibrium.' },
      { t: 'The price rises to $5, since sellers may now charge up to that', why: 'Allowing sellers to charge $5 doesn\'t make buyers pay it. At $5, quantity supplied exceeds quantity demanded, and competition pushes the price back to $4.' }
    ] },
  { id: 'b2', home: 1, fnd: 2, type: 'numeric', short: 'Computing a shortage',
    stem: 'Demand is Q<sub>d</sub> = 200 − 2P and supply is Q<sub>s</sub> = 3P − 50. A price ceiling is set at $40. How large is the shortage, in units?',
    answer: 50, tol: 0,
    why: 'Equilibrium: 200 − 2P = 3P − 50 gives P* = $50 and Q* = 100, so a $40 ceiling binds. At $40, Q<sub>d</sub> = 120 and Q<sub>s</sub> = 70, so the shortage is <strong>50</strong>. The common slip is 120 − 100 = 20, which measures the gap against Q* rather than against quantity supplied.' },
  { id: 'b3', home: 1, fnd: 1, type: 'mcq', short: 'Which floor binds',
    stem: 'Which of these is a <em>binding</em> price floor?',
    opts: [
      { t: 'A legal minimum price set above the equilibrium price', ok: true },
      { t: 'A legal minimum price set below the equilibrium price', why: 'The market price is already above this minimum, so the floor never comes into play.' },
      { t: 'A legal maximum price set above the equilibrium price', why: 'That is a ceiling, not a floor, and it is a non-binding one.' },
      { t: 'Any legal minimum price, since sellers must charge at least that much', why: 'A minimum below equilibrium changes nothing because sellers already charge more. Whether a floor binds depends on where it sits relative to P*.' }
    ] },

  { id: 's1', home: 2, fnd: 4, type: 'mcq', short: 'Rent control after ten years',
    stem: 'A city has had the same binding rent ceiling for ten years. Compared with year one, the shortage of apartments is most likely:',
    opts: [
      { t: 'Larger, because supply and demand have both become more elastic', ok: true },
      { t: 'Smaller, because the market has gradually adjusted back toward equilibrium', why: 'The price is what would close the gap, and the law doesn\'t let it move. Nothing pulls the market back to equilibrium while the ceiling binds.' },
      { t: 'The same, because the controlled price hasn\'t changed', why: 'The price is the same, but the curves aren\'t. Given time, landlords convert or stop building and renters stay put, so both quantities move further apart.' },
      { t: 'Gone, because landlords have raised rents to compensate', why: 'Raising rents above the ceiling is illegal. Landlords do adjust in other ways, such as cutting maintenance, but that is a quality response and doesn\'t remove the shortage.' }
    ] },
  { id: 's2', home: 2, fnd: 2, type: 'mcq', short: 'Time spent in line',
    stem: 'A price ceiling on gasoline causes hour-long lines. How should an economist treat the time drivers spend waiting?',
    opts: [
      { t: 'As a real cost that nobody receives, which eats into the benefit of the lower price', ok: true },
      { t: 'As irrelevant, because drivers pay a lower price at the pump', why: 'The money price is lower, but the full price is money plus time. Waiting is how the shortage is rationed when the price can\'t do it.' },
      { t: 'As a transfer to gas stations', why: 'Stations get nothing from your hour in line. A transfer means someone else receives what you gave up, and here nobody does.' },
      { t: 'As part of producer surplus', why: 'Producers don\'t collect the waiting time. It is a cost that the market diagram doesn\'t show, which is why the DWL triangle understates the true damage.' }
    ] },
  { id: 's3', home: 2, fnd: 2, type: 'numeric', short: 'Black-market price',
    stem: 'Demand is P = 120 − Q. A binding ceiling of $30 means sellers bring only 40 units to market. What is the most a buyer would pay for the 40th unit, which sets the black-market price?',
    pre: '$', answer: 80, tol: 0,
    why: 'Read the demand curve at the quantity actually supplied: 120 − 40 = <strong>$80</strong>. The common error is plugging in $30 to get Q<sub>d</sub> = 90. That is how many people <em>want</em> the good at the legal price, not what the scarce units are worth.' },

  { id: 'm1', home: 3, fnd: 3, type: 'mcq', short: 'What unemployment counts',
    stem: 'A binding minimum wage causes unemployment equal to:',
    opts: [
      { t: 'Labour supplied minus labour demanded at the minimum wage', ok: true },
      { t: 'The number of workers who lost their jobs', why: 'That leaves out the new entrants, people who start looking for work because the wage is higher. Unemployment counts everyone looking for work who can\'t find it.' },
      { t: 'Labour demanded minus labour supplied', why: 'Wrong order. A floor above equilibrium makes quantity supplied the <em>larger</em> one, so this would come out negative.' },
      { t: 'Zero, if the market had full employment before', why: 'Full employment at the old wage doesn\'t protect anyone from the new one. Firms hire fewer and more people apply.' }
    ] },
  { id: 'm2', home: 3, fnd: 3, type: 'numeric', short: 'Minimum-wage unemployment',
    stem: 'Labour demand is L<sub>d</sub> = 1000 − 40W and labour supply is L<sub>s</sub> = 60W − 200. A minimum wage of $15 is set. How many workers are unemployed?',
    answer: 300, tol: 0,
    why: 'Equilibrium: 1000 − 40W = 60W − 200 gives W* = $12 and L* = 520, so $15 binds. At $15, L<sub>d</sub> = 400 and L<sub>s</sub> = 700, so <strong>300</strong> are unemployed. Answering 120, the jobs lost (520 − 400), misses the 180 new entrants.' },
  { id: 'm3', home: 3, fnd: 3, type: 'mcq', short: 'When the wage bill rises',
    stem: 'A minimum wage raises the <em>total</em> earnings of low-wage workers as a group when:',
    opts: [
      { t: 'Labour demand is inelastic, so employment falls by a smaller percentage than the wage rises', ok: true },
      { t: 'Labour demand is elastic', why: 'Elastic demand means employment falls by a <em>larger</em> percentage than the wage rises, so the wage bill shrinks. This is the Chapter 5 total-revenue test with workers as the sellers.' },
      { t: 'Always, since every employed worker earns more', why: 'Every <em>employed</em> worker earns more, but some are no longer employed. The total depends on which effect is bigger.' },
      { t: 'Never, since any unemployment lowers total earnings', why: 'Some unemployment can still leave the total higher, if the raise to those still working outweighs the earnings that were lost.' }
    ] },

  { id: 'w1', home: 4, fnd: 5, type: 'numeric', short: 'Deadweight loss of a ceiling',
    stem: 'Demand is P = 80 − Q and supply is P = 20 + Q. A price ceiling is set at $40. What is the deadweight loss?',
    pre: '$', answer: 100, tol: 0,
    why: 'Equilibrium: Q* = 30, P* = $50. At $40, Q<sub>s</sub> = 20, which is the quantity traded. At Q = 20, demand is $60 and supply is $40, so the height is 20. DWL = ½ × 20 × (30 − 20) = <strong>$100</strong>. Using the ceiling as the height (½ × 10 × 10 = $50) is the most common mistake.' },
  { id: 'w2', home: 4, fnd: 5, type: 'mcq', short: 'Ceiling and consumer surplus',
    stem: 'After a binding price ceiling, consumer surplus:',
    opts: [
      { t: 'May rise or fall: buyers who still get the good gain, but buyers shut out lose', ok: true },
      { t: 'Always rises, because the price is lower', why: 'The lower price helps only the buyers who still get the good. Fewer units trade, and in a steep enough case the lost units outweigh the cheaper ones.' },
      { t: 'Always falls, because there is a shortage', why: 'Often it rises. The transfer from sellers can easily be larger than the surplus buyers lose on the units that disappear.' },
      { t: 'Is unchanged, because the loss all falls on producers', why: 'Some buyers who used to buy can\'t anymore, so part of the deadweight loss is <em>consumer</em> surplus.' }
    ] },
  { id: 'w3', home: 4, fnd: 5, type: 'classify', short: 'Rent control: transfer or loss',
    stem: 'A binding rent ceiling. Classify each item.',
    cats: ['Transfer', 'Lost to everyone'],
    rows: [
      { t: 'The lower rent paid on apartments that are still rented', cat: 'Transfer' },
      { t: 'The surplus on apartments that are no longer supplied', cat: 'Lost to everyone' },
      { t: 'Weeks renters spend searching for an apartment', cat: 'Lost to everyone' },
      { t: 'Under-the-table "key money" paid to a landlord', cat: 'Transfer' }
    ],
    why: 'If someone else receives it, it is a transfer: the lower rent goes to tenants and key money goes to landlords. If nobody receives it, it is lost: trades that don\'t happen, and time spent searching that nobody is paid for. Search time is a loss that the DWL triangle doesn\'t include.' }
];

/* Exam-format free response. Each part's rubric points sum to the part's
 * points; every question totals 10. Graded by the learner against the
 * rubric, since prose can't be marked offline. */
var QUIZ = [
  { id: 'q1', fnd: 2, type: 'frq', title: 'Rent Control', short: 'Rent ceiling in a city',
    stem: 'A city caps monthly rent on one-bedroom apartments at <strong>$1,500</strong>. Before the cap, the equilibrium rent was $2,000.',
    parts: [
      { q: 'Is the ceiling binding? Explain.', pts: 2,
        model: 'Yes. A ceiling binds when it is set below the equilibrium price, and $1,500 < $2,000, so the legal maximum stops rent from reaching equilibrium.',
        rub: [['States that it is binding', 1], ['Justifies it by comparing $1,500 with the $2,000 equilibrium (ceiling below P*)', 1]] },
      { q: 'What happens to quantity demanded, quantity supplied, and the market as a result?', pts: 3,
        model: 'At the lower rent, quantity demanded rises (more people want their own apartment) and quantity supplied falls (fewer units offered). Qd > Qs, which is a shortage, and the number of apartments actually rented falls to Qs.',
        rub: [['Quantity demanded rises', 1], ['Quantity supplied falls', 1], ['Concludes there is a shortage (Qd > Qs) and fewer apartments are rented', 1]] },
      { q: 'Name two ways apartments get allocated when price can\'t do the rationing.', pts: 2,
        model: 'Any two of: waiting lists and long searches, landlord favouritism or discrimination, side payments such as "key money", black-market sublets, and quality cuts.',
        rub: [['First valid non-price rationing mechanism', 1], ['Second valid mechanism', 1]] },
      { q: 'Among renters, who gains and who loses?', pts: 3,
        model: 'Renters who get a controlled apartment gain, because they pay $500 less, which is a transfer from landlords. Renters who would have rented at $2,000 but can\'t find a unit lose, because their surplus disappears and they bear search costs. So renters as a group don\'t all gain.',
        rub: [['Renters who get an apartment gain from the lower rent', 1], ['Renters shut out by the shortage lose', 1], ['Notes that renters as a group don\'t all gain, or names the transfer from landlords', 1]] }
    ] },

  { id: 'q2', fnd: 5, type: 'frq', title: 'Calculating a Price Ceiling', short: 'Ceiling: shortage and DWL',
    stem: 'In a market, demand is <strong>P = 120 − 2Q</strong> and supply is <strong>P = 20 + 2Q</strong>. The government sets a price ceiling of <strong>$50</strong>.',
    parts: [
      { q: 'Find the equilibrium price and quantity.', pts: 2,
        model: '120 − 2Q = 20 + 2Q → 4Q = 100 → Q* = 25, P* = 120 − 50 = $70.',
        rub: [['Q* = 25', 1], ['P* = $70', 1]] },
      { q: 'At the ceiling, find quantity demanded, quantity supplied, and the shortage.', pts: 3,
        model: 'Qd: 50 = 120 − 2Q → Qd = 35. Qs: 50 = 20 + 2Q → Qs = 15. Shortage = 35 − 15 = 20.',
        rub: [['Qd = 35', 1], ['Qs = 15', 1], ['Shortage = 20', 1]] },
      { q: 'Calculate the deadweight loss.', pts: 3,
        model: 'Quantity traded is 15. At Q = 15, demand price = 120 − 30 = $90 and supply price = 20 + 30 = $50. DWL = ½ × (90 − 50) × (25 − 15) = ½ × 40 × 10 = $200.',
        rub: [['Uses Q traded = 15 (the short side)', 1], ['Height = $40, the gap between the curves at Q = 15', 1], ['DWL = $200', 1]] },
      { q: 'Explain why that area is lost rather than transferred.', pts: 2,
        model: 'It is the surplus from the 10 units between 15 and 25 that would have been traded. Buyers valued them above their cost, but they are no longer produced. Nobody, whether buyer, seller or government, receives that surplus.',
        rub: [['Ties the area to trades that no longer happen', 1], ['States that nobody receives it, unlike the lower price on units still sold', 1]] }
    ] },

  { id: 'q3', fnd: 3, type: 'frq', title: 'The Minimum Wage', short: 'Minimum wage above market',
    stem: 'A state raises its minimum wage from $16 to <strong>$20</strong> per hour. The equilibrium wage for teenage workers is <strong>$17</strong>.',
    parts: [
      { q: 'Was the old minimum binding for teens? Is the new one? Explain.', pts: 2,
        model: 'The old $16 minimum was not binding because it was below the $17 equilibrium. The new $20 minimum is binding because a floor binds when it is above equilibrium.',
        rub: [['Old $16: not binding (below $17)', 1], ['New $20: binding (above $17)', 1]] },
      { q: 'Explain what happens to labour demanded, labour supplied, and unemployment.', pts: 3,
        model: 'Firms demand less labour at $20 and hire fewer teens. More teens want to work at $20, so labour supplied rises. Ls > Ld, which is a surplus of labour, and unemployment = Ls − Ld.',
        rub: [['Labour demanded falls', 1], ['Labour supplied rises', 1], ['Unemployment = the gap Ls − Ld (a surplus of labour)', 1]] },
      { q: 'Under what condition would teens\' total earnings rise? Explain using elasticity.', pts: 3,
        model: 'If labour demand is inelastic, employment falls by a smaller percentage than the wage rises (about 18% here). Then wage × employment, the wage bill, increases. If demand is elastic, it falls.',
        rub: [['Names inelastic labour demand', 1], ['Explains that the % fall in employment is smaller than the % rise in the wage', 1], ['Links this to total earnings = wage × employment', 1]] },
      { q: 'Name one group that clearly benefits and one that clearly loses.', pts: 2,
        model: 'Benefits: teens who keep their jobs, who now earn $20 instead of $17. Loses: teens who lose their jobs or can\'t find one. Employers and consumers facing higher prices are also acceptable losers.',
        rub: [['A valid winner (e.g. teens who stay employed)', 1], ['A valid loser (e.g. teens who lose or can\'t find jobs)', 1]] }
    ] },

  { id: 'q4', fnd: 4, type: 'frq', title: 'Rent Control Over Time', short: 'Long-run rent control',
    stem: 'A city introduced a binding rent ceiling ten years ago and has never changed it. The housing shortage is now far worse than in the first year.',
    parts: [
      { q: 'Why is the supply of rental housing more elastic in the long run than in the short run?', pts: 3,
        model: 'In the short run the stock of buildings is fixed, so landlords can\'t quickly change how many units exist. Over time they can stop building new rentals, convert units to condos, or let buildings leave the market. With more time to adjust, quantity supplied responds more to the price.',
        rub: [['In the short run the housing stock is fixed or hard to change', 1], ['In the long run landlords can build less, convert, or withdraw units', 1], ['States the general principle: more time to adjust → more elastic', 1]] },
      { q: 'Explain why the shortage grows over time even though the ceiling hasn\'t changed.', pts: 3,
        model: 'Supply becomes more elastic, so Qs falls further below equilibrium. Demand also becomes more elastic as renters stay in large units, skip roommates, and move to the city for cheap rent, so Qd rises further. Both moves widen Qd − Qs.',
        rub: [['Qs falls further over time', 1], ['Qd rises further over time', 1], ['Concludes the gap Qd − Qs widens, and the price can\'t move to close it', 1]] },
      { q: 'Why does apartment quality tend to fall under rent control?', pts: 2,
        model: 'Landlords can\'t raise the rent, and with a shortage they will still find tenants regardless of condition. So they cut maintenance, which lowers their costs until the effective price matches the legal one.',
        rub: [['Landlords can\'t raise rent, so they cut maintenance or quality instead', 1], ['The shortage means tenants still come regardless of quality', 1]] },
      { q: 'Why might rent control stay politically popular despite these effects?', pts: 2,
        model: 'The benefits are concentrated and visible: current tenants pay less and they vote. The costs are spread out and delayed, falling on future renters, people who can\'t find housing, and the slow decline in supply.',
        rub: [['Benefits go to visible current tenants', 1], ['Costs are hidden, spread out, or arrive later', 1]] }
    ] },

  { id: 'q5', fnd: 1, type: 'frq', title: 'Binding or Non-binding', short: 'Milk: ceiling vs floor',
    stem: 'The equilibrium price of milk is <strong>$4</strong> per gallon.',
    parts: [
      { q: 'The government sets a price ceiling of $5. What is the effect on price and quantity?', pts: 2,
        model: 'None. A ceiling of $5 is above equilibrium, so it is not binding, and the market still clears at $4.',
        rub: [['Not binding', 1], ['Price stays $4 and quantity is unchanged', 1]] },
      { q: 'Instead, the government sets a price floor of $5. What happens?', pts: 3,
        model: 'It is binding because it is above equilibrium. At $5, quantity supplied rises and quantity demanded falls, creating a surplus of milk. Only Qd is sold, so quantity traded falls.',
        rub: [['Binding (above P*)', 1], ['Creates a surplus: Qs > Qd', 1], ['Quantity traded falls to Qd', 1]] },
      { q: 'Suppose instead there is a $3.50 ceiling, and then a supply increase lowers the equilibrium price to $3. What happens to the ceiling\'s effect?', pts: 3,
        model: 'At first the $3.50 ceiling binds because $3.50 < $4, and there is a shortage. After supply rises, equilibrium is $3, which is below the ceiling, so the ceiling stops binding. The shortage disappears and the market clears at $3.',
        rub: [['Initially binding with a shortage', 1], ['After the shift, P* = $3 is below $3.50, so not binding', 1], ['The market clears at $3 with no shortage', 1]] },
      { q: 'State the general rule for when ceilings and floors bind.', pts: 2,
        model: 'A ceiling binds only when it is set below equilibrium. A floor binds only when it is set above equilibrium.',
        rub: [['Ceiling: binds below P*', 1], ['Floor: binds above P*', 1]] }
    ] },

  { id: 'q6', fnd: 3, type: 'frq', title: 'Agricultural Price Support', short: 'Wheat floor, govt buys surplus',
    stem: 'In the wheat market (millions of bushels), demand is <strong>Q<sub>d</sub> = 500 − 50P</strong> and supply is <strong>Q<sub>s</sub> = 100P − 400</strong>. The government guarantees farmers a price of <strong>$8</strong> and buys any unsold wheat.',
    parts: [
      { q: 'Find the equilibrium price and quantity.', pts: 2,
        model: '500 − 50P = 100P − 400 → 150P = 900 → P* = $6, Q* = 200 million bushels.',
        rub: [['P* = $6', 1], ['Q* = 200', 1]] },
      { q: 'At $8, find quantity demanded, quantity supplied, and the surplus.', pts: 3,
        model: 'Qd = 500 − 400 = 100. Qs = 800 − 400 = 400. Surplus = 300 million bushels.',
        rub: [['Qd = 100', 1], ['Qs = 400', 1], ['Surplus = 300', 1]] },
      { q: 'How much does the government spend buying the surplus?', pts: 2,
        model: '$8 × 300 million = $2,400 million ($2.4 billion).',
        rub: [['Multiplies the support price by the surplus', 1], ['$2,400 million', 1]] },
      { q: 'Why is this program inefficient, beyond the cost to taxpayers?', pts: 3,
        model: 'Farmers produce 400 million bushels where marginal cost is above what consumers will pay for them, so resources are spent on output that buyers don\'t value at that cost. Consumers pay more and buy less (100 vs 200), losing surplus. Storage or disposal of the surplus adds more waste.',
        rub: [['Units are produced whose cost exceeds their value to buyers (overproduction)', 1], ['Consumers pay more and buy less', 1], ['Any extra waste: storage, disposal, or the resources tied up', 1]] }
    ] },

  { id: 'q7', fnd: 5, type: 'frq', title: 'Surplus Under a Price Ceiling', short: 'Gasoline ceiling: welfare',
    stem: 'After a hurricane, a state imposes a <strong>binding price ceiling on gasoline</strong> to prevent "price gouging."',
    parts: [
      { q: 'What happens to producer surplus? Why?', pts: 2,
        model: 'It falls. Sellers receive a lower price on every unit they still sell, and they sell fewer units.',
        rub: [['Producer surplus falls', 1], ['Because of a lower price and fewer units sold', 1]] },
      { q: 'Consumer surplus may rise or fall. Explain the two opposing effects.', pts: 3,
        model: 'Gain: buyers who still get gas pay less, a transfer from sellers. Loss: fewer gallons are sold, so buyers who are shut out lose the surplus they would have had. The net change depends on which effect is larger.',
        rub: [['Gain to buyers who still purchase at the lower price', 1], ['Loss to buyers shut out by the reduced quantity', 1], ['Net effect depends on which is larger', 1]] },
      { q: 'Explain why there is a deadweight loss.', pts: 3,
        model: 'Quantity falls to Qs, below the equilibrium quantity. On the gallons between Qs and Q*, buyers value gas above its cost of supply, but those trades no longer happen. That lost surplus goes to no one, and it is the deadweight loss.',
        rub: [['Quantity traded falls below equilibrium', 1], ['Those lost units had value above cost', 1], ['The surplus is gone and goes to no one', 1]] },
      { q: 'Name one cost of the ceiling that the supply-and-demand diagram does not show.', pts: 2,
        model: 'Time spent waiting in line or searching for open stations. Others: black-market resale, gas going to people who value it less, and less gas shipped into the state.',
        rub: [['Names a valid unseen cost (lines, search, misallocation, black market)', 1], ['Explains why it is a real cost (resources or time wasted)', 1]] }
    ] },

  { id: 'q8', fnd: 2, type: 'frq', title: 'Ticket Price Cap', short: 'Concert tickets and scalpers',
    stem: 'A venue has <strong>150</strong> seats, a fixed and perfectly inelastic supply. Demand for tickets is <strong>P = 250 − Q</strong>. A law caps ticket prices at <strong>$50</strong>.',
    parts: [
      { q: 'What would the market price be without the cap?', pts: 2,
        model: 'Supply is 150, so P = 250 − 150 = $100.',
        rub: [['Uses Q = 150', 1], ['P = $100', 1]] },
      { q: 'At $50, how large is the shortage?', pts: 3,
        model: 'Qd = 250 − 50 = 200, and Qs = 150. Shortage = 50 tickets.',
        rub: [['Qd = 200', 1], ['Qs = 150', 1], ['Shortage = 50', 1]] },
      { q: 'What is the highest price a scalper could charge for a ticket?', pts: 2,
        model: 'The value of the 150th ticket on the demand curve: 250 − 150 = $100.',
        rub: [['Reads demand at Q = 150, the scarce quantity', 1], ['$100', 1]] },
      { q: 'Does the cap create a deadweight loss? Explain carefully.', pts: 3,
        model: 'Not from reduced quantity: supply is perfectly inelastic, so all 150 seats are still used. The cap mainly transfers $50 per ticket from the venue to whoever gets a ticket. But if tickets go to people by luck or by waiting in line, some go to fans who value them less than shut-out fans do. That misallocation, plus time spent queuing, is a real loss.',
        rub: [['No quantity-based DWL: all 150 seats are still sold', 1], ['Identifies the transfer from venue to ticket holders', 1], ['Notes the misallocation or queuing loss when tickets aren\'t allocated by value', 1]] }
    ] },

  { id: 'q9', fnd: 4, type: 'frq', title: 'The Minimum Wage Over Time', short: 'Min wage and automation',
    stem: 'Two years after a large minimum-wage increase, many fast-food restaurants have installed self-order kiosks.',
    parts: [
      { q: 'What does this suggest about the elasticity of labour demand over time?', pts: 2,
        model: 'Labour demand becomes more elastic in the long run, because firms have time to find substitutes for labour such as kiosks.',
        rub: [['More elastic in the long run', 1], ['Because substitutes for labour become available over time', 1]] },
      { q: 'Compare unemployment from the minimum wage in the short run and the long run.', pts: 3,
        model: 'In the short run firms can\'t easily replace workers, so Ld falls only a little. In the long run Ld falls further as automation spreads, so unemployment (Ls − Ld) is larger in the long run.',
        rub: [['Short run: a small fall in labour demanded', 1], ['Long run: a larger fall as firms substitute', 1], ['So unemployment is larger in the long run', 1]] },
      { q: 'Explain how the total wage bill could rise in the short run but fall in the long run.', pts: 3,
        model: 'In the short run labour demand is inelastic, so the % fall in jobs is smaller than the % rise in the wage, and the wage bill rises. In the long run labour demand is elastic, so the % fall in jobs exceeds the % rise in the wage, and the wage bill falls.',
        rub: [['Short run: inelastic demand → wage bill rises', 1], ['Long run: elastic demand → wage bill falls', 1], ['Uses the % change in jobs vs % change in wage comparison', 1]] },
      { q: 'Give one parallel between this and long-run rent control.', pts: 2,
        model: 'In both cases a binding price control does more damage over time, because both sides become more elastic. The surplus or shortage widens even though the controlled price never changes.',
        rub: [['Both involve a binding price control', 1], ['Both get worse over time as elasticity rises', 1]] }
    ] },

  { id: 'q10', fnd: 1, type: 'frq', title: 'A Control and a Supply Shock', short: 'Egg ceiling and bird flu',
    stem: 'The equilibrium price of eggs is <strong>$3</strong> a dozen. A state sets a price ceiling of <strong>$4</strong>. Later, bird flu sharply cuts the egg supply, and the equilibrium price would rise to <strong>$6</strong>.',
    parts: [
      { q: 'Before bird flu, is the ceiling binding? What is its effect?', pts: 2,
        model: 'No, because $4 is above the $3 equilibrium. The market clears at $3 and the ceiling has no effect.',
        rub: [['Not binding', 1], ['No effect: price $3 with the market clearing', 1]] },
      { q: 'After bird flu, is it binding? What happens to price and quantity?', pts: 3,
        model: 'Yes, because the new equilibrium of $6 is above the $4 ceiling. The price is stuck at $4. Qd at $4 exceeds Qs at $4, so there is a shortage, and quantity traded is Qs.',
        rub: [['Now binding, since $6 > $4', 1], ['The price is held at $4 and there is a shortage', 1], ['Quantity traded = Qs at $4', 1]] },
      { q: 'Compare this outcome with what would happen without the ceiling.', pts: 3,
        model: 'Without the ceiling, the price rises to $6 and the market clears with no shortage. Quantity traded is at the new, lower equilibrium, which is higher than Qs at $4. The eggs go to the buyers who value them most, instead of being rationed by empty shelves or luck.',
        rub: [['Without the ceiling, price rises to $6 and the market clears', 1], ['More eggs are traded than under the ceiling (Q* > Qs at $4)', 1], ['Allocation by willingness to pay vs non-price rationing', 1]] },
      { q: 'What does it mean to say the ceiling "suppresses the price signal"?', pts: 2,
        model: 'A higher price would tell buyers to conserve and tell producers to supply more, for example by shipping eggs in from other states. With the price capped, neither signal reaches anyone.',
        rub: [['A higher price tells buyers to cut back', 1], ['A higher price tells sellers to supply more', 1]] }
    ] }
];
