var FND = ['Price takers', 'MR = MC', 'Profit & loss', 'Shutdown vs exit', 'Long-run equilibrium'];

var BANK = [
  { id: 'a1', home: 1, fnd: 1, type: 'mcq', short: 'Why P = MR',
    stem: 'For a firm in a perfectly competitive market, marginal revenue equals price because:',
    opts: [
      { t: 'The firm can sell any quantity at the market price without lowering it', ok: true },
      { t: 'The government sets the price', why: 'Nobody sets the price. It comes from market supply and demand. The firm is just too small to move it.' },
      { t: 'All firms have the same costs', why: 'Identical costs are a common simplification, but P = MR comes from the firm\'s demand curve being horizontal, not from its costs.' },
      { t: 'Price always equals marginal cost', why: 'P = MC is the <em>result</em> of profit maximisation, not the reason P = MR. The order of reasoning matters.' }
    ] },
  { id: 'a2', home: 1, fnd: 2, type: 'mcq', short: 'Where to produce',
    stem: 'A competitive firm faces a price of $20. At its current output, MC = $15 and rising. To maximise profit it should:',
    opts: [
      { t: 'Increase output until MC rises to $20', ok: true },
      { t: 'Decrease output, because MC is rising', why: 'A rising MC doesn\'t matter yet. Each extra unit still adds $20 of revenue for $15 of cost, so produce more.' },
      { t: 'Stay where it is, because it is profitable', why: 'Making a profit isn\'t the same as making the <em>most</em> profit. Units that cost $15 and sell for $20 are still being left unproduced.' },
      { t: 'Raise its price to $25', why: 'A price taker that raises its price sells nothing, because buyers get identical goods from everyone else at $20.' }
    ] },
  { id: 'a3', home: 1, fnd: 3, type: 'numeric', short: 'Computing profit',
    stem: 'The market price is $12. At its profit-maximising output of 50 units, a firm\'s ATC is $9. What is its economic profit?',
    pre: '$', answer: 150, tol: 0,
    why: 'Profit = (P − ATC) × q = (12 − 9) × 50 = <strong>$150</strong>. Answering $600 (12 × 50) gives revenue, not profit. Answering $3 gives profit per unit, not the total.' },

  { id: 's1', home: 2, fnd: 4, type: 'mcq', short: 'Loss but keep producing',
    stem: 'A firm\'s price is $8, its ATC is $10, and its AVC is $6. In the short run it should:',
    opts: [
      { t: 'Keep producing: price covers AVC, so the loss is smaller than its fixed cost', ok: true },
      { t: 'Shut down, because it is losing money', why: 'It is losing money, but shutting down would lose <em>all</em> of its fixed cost. At $8 > AVC, each unit covers its variable cost and pays toward the fixed cost.' },
      { t: 'Exit the industry immediately', why: 'Exit is a long-run choice. In the short run the fixed costs can\'t be escaped, so the comparison is price against AVC.' },
      { t: 'Raise its price to $10', why: 'It is a price taker. At $10 it would sell nothing.' }
    ] },
  { id: 's2', home: 2, fnd: 4, type: 'numeric', short: 'Loss from producing vs shutting',
    stem: 'A firm has fixed costs of $500. At its best output of 100 units the price is $7 and AVC is $5. How much does it lose by producing? (Enter the loss as a positive number.)',
    pre: '$', answer: 300, tol: 0,
    why: 'Revenue 700 − VC 500 − FC 500 = −300, so the loss is <strong>$300</strong>. If it shut down it would lose the full $500. Producing is $200 better, which is the amount by which revenue exceeds variable cost.' },
  { id: 's3', home: 2, fnd: 4, type: 'mcq', short: 'The short-run supply curve',
    stem: 'A competitive firm\'s short-run supply curve is:',
    opts: [
      { t: 'Its MC curve above the minimum of AVC', ok: true },
      { t: 'Its MC curve above the minimum of ATC', why: 'That describes <em>long-run</em> supply. In the short run the firm keeps producing between min AVC and min ATC, at a loss.' },
      { t: 'Its entire MC curve', why: 'Below minimum AVC the firm shuts down and supplies zero, so the low part of MC isn\'t part of supply.' },
      { t: 'Its ATC curve', why: 'Output is chosen where P = MC. ATC only tells you about profit at that output.' }
    ] },

  { id: 'l1', home: 3, fnd: 5, type: 'mcq', short: 'Profit attracts entry',
    stem: 'Firms in a competitive industry are earning positive economic profits. In the long run:',
    opts: [
      { t: 'New firms enter, supply rises, and price falls until economic profit is zero', ok: true },
      { t: 'Profits continue, because existing firms are efficient', why: 'Efficiency doesn\'t protect profit when entry is free. New firms copy the existing ones until the profit is competed away.' },
      { t: 'Existing firms raise prices further', why: 'They are price takers. Entry pushes the price <em>down</em>, not up.' },
      { t: 'Demand falls until profits disappear', why: 'Demand doesn\'t respond to profits. Entry changes the <em>supply</em> side.' }
    ] },
  { id: 'l2', home: 3, fnd: 5, type: 'mcq', short: 'Long-run price',
    stem: 'In a constant-cost competitive industry, demand permanently doubles. In the new long-run equilibrium, compared with the old one:',
    opts: [
      { t: 'The price is the same, and there are more firms', ok: true },
      { t: 'The price is higher, because demand is higher', why: 'That is only the short run. Entry adds firms until the price is back at minimum ATC, which hasn\'t changed.' },
      { t: 'The price is the same, and each firm produces twice as much', why: 'Each firm still produces where ATC is lowest, which is the same output as before. The extra quantity comes from <em>more firms</em>.' },
      { t: 'The price is lower, because of more competition', why: 'With constant costs, entry stops exactly at the old minimum ATC. It doesn\'t go past it, because firms would make losses.' }
    ] },
  { id: 'l3', home: 3, fnd: 3, type: 'mcq', short: 'Zero profit means',
    stem: 'In long-run equilibrium, competitive firms earn zero economic profit. This means owners:',
    opts: [
      { t: 'Earn a normal return, the same as their next-best use of time and capital', ok: true },
      { t: 'Earn nothing and would be better off closing', why: 'Zero <em>economic</em> profit already counts implicit costs. Accounting profit is positive and owners are paid for their opportunity costs.' },
      { t: 'Are losing money on an accounting basis', why: 'Accounting profit is positive here, equal to the implicit costs.' },
      { t: 'Will exit soon', why: 'There is no reason to exit: they can\'t do better anywhere else. That is why it is an equilibrium.' }
    ] },

  { id: 'x1', home: 4, fnd: 2, type: 'numeric', short: 'Finding q from a table',
    stem: 'The market price is $14. A firm\'s MC is $8 for the 4th unit, $11 for the 5th, $14 for the 6th and $18 for the 7th. How many units should it produce?',
    answer: 6, tol: 0,
    why: 'Produce every unit whose MC is no more than the price: the 6th unit has MC = $14 = P, and the 7th costs $18 > $14. So <strong>6</strong>. Stopping at 5 leaves a unit that breaks even. Going to 7 adds a unit that loses $4.' },
  { id: 'x2', home: 4, fnd: 4, type: 'classify', short: 'What should the firm do?',
    stem: 'Each case gives price, ATC and AVC at the firm\'s best output. Classify the short-run decision.',
    cats: ['Produce at a profit', 'Produce at a loss', 'Shut down'],
    rows: [
      { t: 'P = $12, ATC = $10, AVC = $7', cat: 'Produce at a profit' },
      { t: 'P = $9, ATC = $10, AVC = $7', cat: 'Produce at a loss' },
      { t: 'P = $6, ATC = $10, AVC = $7', cat: 'Shut down' },
      { t: 'P = $7.50, ATC = $11, AVC = $7.20', cat: 'Produce at a loss' }
    ],
    why: 'Compare P with ATC to see whether there is a profit, then with AVC to decide whether to keep producing. P above ATC means a profit. P between AVC and ATC means a loss, but keep producing. P below AVC means shut down.' },
  { id: 'x3', home: 4, fnd: 1, type: 'mcq', short: 'Efficiency of competition',
    stem: 'Long-run competitive equilibrium is called efficient because:',
    opts: [
      { t: 'P = MC (allocative efficiency) and output is at minimum ATC (productive efficiency)', ok: true },
      { t: 'Firms earn the highest possible profits', why: 'Firms earn <em>zero</em> economic profit. Efficiency is about total surplus and lowest cost, not about profit.' },
      { t: 'Every consumer can afford the good', why: 'Efficiency doesn\'t mean affordability. Some people still value the good below its cost and don\'t buy it.' },
      { t: 'Price is as low as the government allows', why: 'There is no government price here. The price comes from entry and exit.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 2, type: 'frq', title: 'Profit Maximisation', short: 'Wheat farm output decision',
    stem: 'A wheat farm sells in a perfectly competitive market at <strong>$6</strong> per bushel. Its marginal cost rises with output.',
    parts: [
      { q: 'Why is the farm\'s marginal revenue equal to the price?', pts: 2,
        model: 'The farm is a price taker. It is tiny relative to the market and its wheat is identical to everyone else\'s, so it can sell any amount at $6. Each extra bushel adds exactly $6 to revenue.',
        rub: [['Price taker: can sell any quantity at the market price', 1], ['So each extra unit adds P to revenue', 1]] },
      { q: 'State the profit-maximising rule and explain the reasoning behind it.', pts: 4,
        model: 'Produce where MR = MC, so P = MC = $6. If MC < $6, an extra bushel adds more to revenue than to cost, so produce it. If MC > $6, that bushel lowers profit, so cut back. Profit is highest where they are equal.',
        rub: [['MR = MC (P = MC)', 1], ['If MC < P, increase output', 1], ['If MC > P, decrease output', 1], ['So profit is maximised where they are equal', 1]] },
      { q: 'Suppose the price rises to $8. What happens to the farm\'s output? Why?', pts: 2,
        model: 'It increases. The farm moves up its rising MC curve to the higher quantity where MC = $8.',
        rub: [['Output increases', 1], ['Moves along the MC curve to where MC = $8', 1]] },
      { q: 'Why can\'t the farm just charge $7 when the market price is $6?', pts: 2,
        model: 'Buyers can get identical wheat from many other sellers at $6, so the farm would sell nothing at $7.',
        rub: [['Identical products and many sellers', 1], ['It would sell nothing at a higher price', 1]] }
    ] },

  { id: 'q2', fnd: 3, type: 'frq', title: 'Calculating Profit or Loss', short: 'Compute profit at q*',
    stem: 'A competitive firm faces a price of <strong>$15</strong>. At the output where P = MC, it produces <strong>200</strong> units, with ATC = <strong>$12</strong> and AVC = <strong>$8</strong>.',
    parts: [
      { q: 'Calculate total revenue and total cost.', pts: 2,
        model: 'TR = 15 × 200 = $3,000. TC = 12 × 200 = $2,400.',
        rub: [['TR = $3,000', 1], ['TC = $2,400', 1]] },
      { q: 'Calculate economic profit and fixed cost.', pts: 3,
        model: 'Profit = 3,000 − 2,400 = $600. FC = (ATC − AVC) × q = (12 − 8) × 200 = $800.',
        rub: [['Profit = $600', 1], ['Uses (ATC − AVC) × q for FC', 1], ['FC = $800', 1]] },
      { q: 'What will happen in this industry in the long run? Explain.', pts: 3,
        model: 'Positive economic profit attracts new firms. Market supply shifts right and the price falls until it equals minimum ATC, where economic profit is zero.',
        rub: [['Firms enter', 1], ['Market supply increases and the price falls', 1], ['Until P = min ATC and profit is zero', 1]] },
      { q: 'Is the firm producing at minimum ATC right now? How do you know?', pts: 2,
        model: 'No. It produces where MC = P = $15, which is above its ATC of $12. MC is above ATC, so ATC is rising, which means the firm is past the minimum of ATC.',
        rub: [['No', 1], ['MC (= $15) > ATC (= $12), so ATC is rising, past its minimum', 1]] }
    ] },

  { id: 'q3', fnd: 4, type: 'frq', title: 'The Shutdown Decision', short: 'Ski resort off-season',
    stem: 'A ski resort has fixed costs of <strong>$400,000</strong> a season. In a warm winter it expects revenue of <strong>$900,000</strong> and variable costs (staff, snowmaking, electricity) of <strong>$750,000</strong>.',
    parts: [
      { q: 'Calculate its profit or loss if it opens.', pts: 2,
        model: '900,000 − 750,000 − 400,000 = −$150,000, a loss of $150,000.',
        rub: [['Subtracts both VC and FC', 1], ['−$150,000', 1]] },
      { q: 'Calculate its profit or loss if it stays closed for the season.', pts: 2,
        model: 'It still pays its fixed costs: −$400,000.',
        rub: [['Fixed costs are still paid', 1], ['−$400,000', 1]] },
      { q: 'Should it open? State the general rule you are using.', pts: 3,
        model: 'Yes. Opening loses $250,000 less than closing. The rule: produce in the short run if total revenue ≥ variable cost (P ≥ AVC). Here $900,000 > $750,000.',
        rub: [['Open', 1], ['Rule: produce if TR ≥ VC (P ≥ AVC)', 1], ['Applies it: $900k > $750k', 1]] },
      { q: 'If every winter looked like this one, what should the owners do in the long run? Why?', pts: 3,
        model: 'Exit. In the long run fixed costs can be avoided (sell the resort, end the leases). It is losing money every year, because revenue is below total cost (P < ATC), so the resources would earn more elsewhere.',
        rub: [['Exit', 1], ['In the long run all costs are avoidable', 1], ['Persistent losses: P < ATC', 1]] }
    ] },

  { id: 'q4', fnd: 5, type: 'frq', title: 'Long-Run Adjustment', short: 'Avocado toast boom',
    stem: 'The breakfast-café industry is competitive and in long-run equilibrium. Then a food trend permanently increases demand for café breakfasts.',
    parts: [
      { q: 'In the short run, what happens to market price and to the profit of existing cafés?', pts: 2,
        model: 'Market demand rises, so the price rises. Existing cafés increase output along their MC curves and earn positive economic profit.',
        rub: [['The price rises', 1], ['Existing firms earn economic profit', 1]] },
      { q: 'Describe the adjustment to the new long-run equilibrium.', pts: 4,
        model: 'Profit attracts new cafés. Entry shifts market supply to the right, which lowers the price. Entry continues until the price is back at minimum ATC and economic profit is zero.',
        rub: [['Profit attracts entry', 1], ['Market supply shifts right', 1], ['The price falls', 1], ['Until P = min ATC and profit = 0', 1]] },
      { q: 'Compare the new long-run equilibrium with the original: price, number of firms, and market quantity.', pts: 3,
        model: 'Same price (min ATC, if it is a constant-cost industry), more firms, and a larger market quantity. Each café produces the same amount as before.',
        rub: [['Same price', 1], ['More firms', 1], ['Higher market quantity', 1]] },
      { q: 'Why is economic profit temporary in this industry?', pts: 1,
        model: 'Free entry: anyone can open a café, so profit is competed away.',
        rub: [['Free entry competes it away', 1]] }
    ] },

  { id: 'q5', fnd: 1, type: 'frq', title: 'Characteristics of Perfect Competition', short: 'Which markets are competitive',
    stem: 'Economists describe perfectly competitive markets by a short list of characteristics.',
    parts: [
      { q: 'List three characteristics of a perfectly competitive market.', pts: 3,
        model: 'Many buyers and sellers. Identical (homogeneous) products. Free entry and exit. Perfect information is also acceptable.',
        rub: [['Many buyers and sellers', 1], ['Identical products', 1], ['Free entry and exit', 1]] },
      { q: 'What does the demand curve facing an individual firm look like, and why?', pts: 3,
        model: 'Horizontal (perfectly elastic) at the market price. The firm is too small to affect the price, and buyers would switch to other sellers if it charged even slightly more.',
        rub: [['Horizontal or perfectly elastic', 1], ['At the market price', 1], ['Because the firm is tiny and products are identical', 1]] },
      { q: 'Is a local Starbucks a perfectly competitive firm? Explain.', pts: 2,
        model: 'No. Its product is differentiated (brand, menu, atmosphere), so it has some control over price. It can charge more than a generic coffee shop and still keep customers.',
        rub: [['No', 1], ['A differentiated product gives some price-setting power', 1]] },
      { q: 'Give one real market that comes close to perfect competition, and say why.', pts: 2,
        model: 'For example wheat, corn, or other agricultural commodities: thousands of farms selling nearly identical products at a market price that no single farm can influence.',
        rub: [['A plausible example (agricultural commodity etc.)', 1], ['Explains: many sellers, identical product, price takers', 1]] }
    ] },

  { id: 'q6', fnd: 4, type: 'frq', title: 'Shutdown vs Exit', short: 'Distinguish shutdown and exit',
    stem: 'A competitive firm has minimum AVC of <strong>$5</strong> and minimum ATC of <strong>$9</strong>.',
    parts: [
      { q: 'Distinguish a short-run shutdown from a long-run exit.', pts: 2,
        model: 'Shutdown: produce nothing for now but still pay fixed costs, and stay in the industry. Exit: leave the industry permanently, with no costs at all.',
        rub: [['Shutdown: zero output, still pays FC', 1], ['Exit: leaves permanently, no costs', 1]] },
      { q: 'At what price range does the firm produce at a loss in the short run? Explain.', pts: 3,
        model: 'Between $5 and $9. Price is below ATC, so there is a loss, but above AVC, so each unit covers its variable cost and contributes toward fixed cost. The loss is smaller than shutting down, which would lose all of FC.',
        rub: [['Between $5 and $9', 1], ['P < ATC means a loss', 1], ['P > AVC means producing loses less than shutting down', 1]] },
      { q: 'Describe the firm\'s short-run supply curve.', pts: 2,
        model: 'It is the MC curve above $5, the minimum of AVC. Below $5 the firm supplies zero.',
        rub: [['The MC curve above min AVC', 1], ['Zero below $5', 1]] },
      { q: 'If the price stays at $7 for years, what happens in the industry, and where does the price end up?', pts: 3,
        model: 'Firms keep making losses, since $7 < $9 ATC, so some exit. Supply falls, the price rises, and exit continues until the price reaches $9 (min ATC) and profit is zero.',
        rub: [['Firms exit', 1], ['Supply falls and the price rises', 1], ['Until the price reaches $9', 1]] }
    ] },

  { id: 'q7', fnd: 2, type: 'frq', title: 'Reading a Cost Table', short: 'q* from MC table',
    stem: 'A competitive t-shirt printer\'s total cost (TC) is <strong>$100, $130, $150, $175, $210, $260</strong> for 0 through 5 boxes of shirts per day. The market price is <strong>$35</strong> per box.',
    parts: [
      { q: 'Calculate marginal cost for each box.', pts: 3,
        model: 'MC: box 1 = $30, box 2 = $20, box 3 = $25, box 4 = $35, box 5 = $50.',
        rub: [['MC of boxes 1–2 ($30, $20)', 1], ['MC of boxes 3–4 ($25, $35)', 1], ['MC of box 5 ($50)', 1]] },
      { q: 'How many boxes maximise profit? Explain.', pts: 3,
        model: '4 boxes. Every box up to the 4th has MC ≤ $35. The 4th exactly breaks even, and the 5th costs $50 > $35, which would lower profit.',
        rub: [['4 boxes', 1], ['Produce while MC ≤ P', 1], ['The 5th box\'s MC of $50 exceeds the price', 1]] },
      { q: 'Calculate the profit at that output.', pts: 2,
        model: 'TR = 4 × $35 = $140. TC = $210. Profit = −$70, a loss.',
        rub: [['TR $140 and TC $210', 1], ['Profit = −$70', 1]] },
      { q: 'Should the printer produce or shut down in the short run? Explain.', pts: 2,
        model: 'Produce. Fixed cost is $100 (TC at zero output), so shutting down loses $100 while producing loses $70. Equivalently, VC = $110 < TR = $140.',
        rub: [['Produce', 1], ['Loss of $70 < FC of $100 (TR > VC)', 1]] }
    ] },

  { id: 'q8', fnd: 5, type: 'frq', title: 'Efficiency of Competitive Markets', short: 'Why long-run eq is efficient',
    stem: 'In long-run equilibrium, a perfectly competitive firm produces where <strong>P = MC = minimum ATC</strong>.',
    parts: [
      { q: 'Explain why P = MC means the market is allocatively efficient.', pts: 3,
        model: 'Price measures what buyers value the last unit at, and MC is what it costs to produce. When they are equal, every unit worth more than its cost is produced and none worth less, so total surplus is maximised.',
        rub: [['P reflects the marginal value to buyers', 1], ['MC reflects the marginal cost of production', 1], ['Equal means total surplus is maximised', 1]] },
      { q: 'Explain why producing at minimum ATC means productive efficiency.', pts: 2,
        model: 'Goods are made at the lowest possible average cost, so no resources are wasted in producing them.',
        rub: [['Lowest possible average cost', 1], ['No wasted resources', 1]] },
      { q: 'What forces the firm to produce at minimum ATC in the long run?', pts: 3,
        model: 'Entry and exit. If P > min ATC, profits attract entrants and the price falls. If P < min ATC, losses cause exit and the price rises. The only resting point is P = min ATC, where the profit-maximising q is at the bottom of ATC.',
        rub: [['Entry when P > min ATC', 1], ['Exit when P < min ATC', 1], ['The only stable point is P = min ATC', 1]] },
      { q: 'Do firms in this equilibrium earn zero accounting profit? Explain.', pts: 2,
        model: 'No. Economic profit is zero but accounting profit is positive, and it covers the owners\' implicit costs, which is a normal return.',
        rub: [['No, accounting profit is positive', 1], ['It covers implicit costs (a normal return)', 1]] }
    ] },

  { id: 'q9', fnd: 3, type: 'frq', title: 'Drawing Profit and Loss', short: 'Describe the profit rectangle',
    stem: 'On a standard diagram for a competitive firm, you see the MC, ATC and AVC curves and a horizontal price line.',
    parts: [
      { q: 'How do you find the profit-maximising output on the diagram?', pts: 2,
        model: 'Find where the price line (= MR) crosses the rising part of MC, then read down to the quantity axis.',
        rub: [['Where P = MR crosses MC', 1], ['On the rising part of MC', 1]] },
      { q: 'Describe the rectangle that shows profit when P is above ATC.', pts: 3,
        model: 'Width = q*. Height = P − ATC at q*. It runs from the ATC value at q* up to the price line, across from 0 to q*.',
        rub: [['Width is q*', 1], ['Height is P − ATC at q*', 1], ['Bounded by the price line above and ATC at q* below', 1]] },
      { q: 'If P is between AVC and ATC, what does the rectangle represent, and why does the firm still produce?', pts: 3,
        model: 'The rectangle, with ATC above and P below, is the loss. The firm produces because P > AVC: revenue covers all variable costs and part of fixed cost, so the loss is smaller than FC, which is what shutting down would lose.',
        rub: [['The rectangle is the loss', 1], ['P > AVC', 1], ['So the loss is smaller than FC (the loss from shutting down)', 1]] },
      { q: 'Where on the diagram is the shutdown point?', pts: 2,
        model: 'At the minimum of AVC, where MC crosses AVC. Below that price the firm produces nothing.',
        rub: [['At the minimum of AVC', 1], ['Where MC crosses AVC', 1]] }
    ] },

  { id: 'q10', fnd: 1, type: 'frq', title: 'A Cost Shock to the Industry', short: 'Input cost rises industry-wide',
    stem: 'A competitive industry is in long-run equilibrium at a price of $10. Then a new regulation raises every firm\'s minimum ATC to <strong>$12</strong>.',
    parts: [
      { q: 'Immediately after the regulation, are firms earning profits or losses? Explain.', pts: 2,
        model: 'Losses. The price is still $10 but ATC is now at least $12, so P < ATC.',
        rub: [['Losses', 1], ['P ($10) < ATC (≥ $12)', 1]] },
      { q: 'Describe how the industry adjusts in the long run.', pts: 3,
        model: 'Firms exit. Market supply shifts left and the price rises until it reaches the new minimum ATC of $12, where profit is zero again.',
        rub: [['Firms exit', 1], ['Supply shifts left and the price rises', 1], ['To the new min ATC of $12', 1]] },
      { q: 'Compare the new long-run equilibrium with the old one: price, quantity and number of firms.', pts: 3,
        model: 'A higher price ($12 instead of $10), a lower market quantity because buyers move up the demand curve, and fewer firms.',
        rub: [['Higher price', 1], ['Lower market quantity', 1], ['Fewer firms', 1]] },
      { q: 'In the long run, who ends up bearing the cost of the regulation? Explain.', pts: 2,
        model: 'Consumers. The long-run price rises by the full increase in minimum ATC. Firms are back to zero economic profit, so the remaining firms bear none of it in the long run. This is the flat long-run supply curve from the chapter.',
        rub: [['Consumers', 1], ['Price rises by the full cost increase, and firms return to zero profit', 1]] }
    ] }
];
