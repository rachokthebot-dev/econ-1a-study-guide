var FND = ['Accounting vs economic profit', 'Diminishing marginal product', 'Cost curves', 'MC and average cost', 'Long run & scale'];

var BANK = [
  { id: 'p1', home: 1, fnd: 1, type: 'numeric', short: 'Computing economic profit',
    stem: 'Maya quits a $70,000 job to open a café. She invests $50,000 of her savings, which were earning 4%. In year one the café takes in $210,000 and pays $150,000 in rent, wages and supplies. What is her <em>economic</em> profit?',
    pre: '$', answer: -12000, tol: 0,
    why: 'Accounting profit = 210,000 − 150,000 = 60,000. Implicit costs = 70,000 forgone salary + 2,000 forgone interest (4% of 50,000) = 72,000. Economic profit = 60,000 − 72,000 = <strong>−$12,000</strong>. Answering $60,000 counts only the explicit costs. Answering −$10,000 forgets the interest.' },
  { id: 'p2', home: 1, fnd: 1, type: 'mcq', short: 'Which is an implicit cost',
    stem: 'Which of these is an <em>implicit</em> cost for a farmer who owns her land?',
    opts: [
      { t: 'The rent she could collect by leasing the land to a neighbour', ok: true },
      { t: 'The property tax she pays on the land', why: 'A tax bill is a payment actually made, so it is an explicit cost.' },
      { t: 'The wages she pays her seasonal workers', why: 'Wages are written cheques, so they are explicit. Implicit costs have no payment attached.' },
      { t: 'The price she originally paid for the land', why: 'That is a sunk cost from the past. The opportunity cost of using the land <em>now</em> is what it could earn now, which is the forgone rent.' }
    ] },
  { id: 'p3', home: 1, fnd: 1, type: 'mcq', short: 'Zero economic profit',
    stem: 'A firm earns zero economic profit. This means:',
    opts: [
      { t: 'Its owners earn exactly what they could in their next-best alternative', ok: true },
      { t: 'The firm is losing money and should close', why: 'Zero economic profit means every cost is covered, including the owner\'s opportunity costs. There is no reason to leave.' },
      { t: 'Its accounting profit is also zero', why: 'Accounting profit is <em>positive</em> here, by exactly the amount of the implicit costs.' },
      { t: 'It has no implicit costs', why: 'It has implicit costs, and revenue covers them exactly. That is what zero means here.' }
    ] },

  { id: 'd1', home: 2, fnd: 2, type: 'mcq', short: 'What diminishing MP means',
    stem: 'A pizzeria adds a sixth cook and total output rises from 140 to 150 pizzas, after the fifth cook raised it from 120 to 140. This shows:',
    opts: [
      { t: 'Diminishing marginal product: the sixth cook adds less than the fifth', ok: true },
      { t: 'Negative marginal product, because output is growing more slowly', why: 'Output still <em>rose</em>, by 10. Marginal product is negative only if total output falls.' },
      { t: 'Diseconomies of scale', why: 'Only one input changed and the kitchen stayed fixed, so this is a short-run idea. Diseconomies of scale need <em>all</em> inputs to grow together.' },
      { t: 'The sixth cook is less skilled than the fifth', why: 'The law assumes identical workers. Their MP falls because the fixed kitchen gets crowded, not because of who they are.' }
    ] },
  { id: 'd2', home: 2, fnd: 2, type: 'numeric', short: 'Marginal cost from MP',
    stem: 'Workers earn $120 a day. Adding one more worker raises output from 200 to 230 units. What is the marginal cost per unit of those extra units?',
    pre: '$', answer: 4, tol: 0.001,
    why: 'MC = ΔTC ÷ ΔQ = 120 ÷ 30 = <strong>$4</strong>. Dividing the wage by total output (120 ÷ 230 ≈ $0.52) gives an average, not a marginal cost.' },
  { id: 'd3', home: 2, fnd: 4, type: 'mcq', short: 'Why MC rises',
    stem: 'In the short run, the main reason a firm\'s marginal cost curve slopes upward is:',
    opts: [
      { t: 'Diminishing marginal product of the variable input', ok: true },
      { t: 'Rising fixed costs', why: 'Fixed costs don\'t change with output, so they can\'t affect <em>marginal</em> cost at all.' },
      { t: 'Diseconomies of scale', why: 'That is the long-run reason LRATC rises. In the short run, with an input fixed, the explanation is diminishing marginal product.' },
      { t: 'Workers demanding higher wages as output rises', why: 'The model holds the wage constant. MC rises because each worker adds less output, not because each worker costs more.' }
    ] },

  { id: 'c1', home: 3, fnd: 3, type: 'numeric', short: 'Computing ATC',
    stem: 'A firm has fixed costs of $400 and variable costs of $1,100 when it produces 250 units. What is average total cost?',
    pre: '$', answer: 6, tol: 0.001,
    why: 'TC = 400 + 1,100 = 1,500, and ATC = 1,500 ÷ 250 = <strong>$6</strong>. Using only variable cost gives $4.40, which is AVC. The gap between the two, $1.60, is AFC.' },
  { id: 'c2', home: 3, fnd: 4, type: 'mcq', short: 'MC below ATC',
    stem: 'At the current output, marginal cost is $8 and average total cost is $10. If the firm produces one more unit, ATC will:',
    opts: [
      { t: 'Fall, because the extra unit costs less than the current average', ok: true },
      { t: 'Rise, because marginal cost is positive', why: 'What matters is whether the marginal unit costs more or less than the <em>average</em>. Any cost is positive.' },
      { t: 'Stay the same until MC reaches zero', why: 'The average moves whenever the marginal is different from it. Here MC is below ATC, so ATC falls.' },
      { t: 'Rise, because MC is rising', why: 'MC may well be rising, but while it is still below ATC it keeps pulling the average down.' }
    ] },
  { id: 'c3', home: 3, fnd: 5, type: 'mcq', short: 'Economies of scale',
    stem: 'A car maker doubles every input (plants, workers, machines) and output more than doubles. This is:',
    opts: [
      { t: 'Economies of scale, so long-run average cost is falling', ok: true },
      { t: 'Increasing marginal product of labour', why: 'Marginal product is a short-run idea, with one input changing and the others fixed. Here every input changes.' },
      { t: 'Diseconomies of scale', why: 'That is the reverse: output growing by <em>less</em> than the inputs, so LRATC rises.' },
      { t: 'Constant returns to scale', why: 'Constant returns means output exactly doubles. It more than doubled here.' }
    ] },

  { id: 'e1', home: 4, fnd: 3, type: 'mcq', short: 'AFC always falls',
    stem: 'As output rises, which cost curve <em>always</em> falls?',
    opts: [
      { t: 'Average fixed cost', ok: true },
      { t: 'Average total cost', why: 'ATC is U-shaped. Rising AVC eventually outweighs falling AFC.' },
      { t: 'Marginal cost', why: 'MC may dip at first, but it rises once diminishing marginal product sets in.' },
      { t: 'Average variable cost', why: 'AVC is U-shaped too, for the same diminishing-returns reason as MC.' }
    ] },
  { id: 'e2', home: 4, fnd: 4, type: 'numeric', short: 'Marginal cost from a table',
    stem: 'Total cost is $300 at 20 units and $380 at 25 units. What is the marginal cost per unit over that range?',
    pre: '$', answer: 16, tol: 0.001,
    why: 'MC = ΔTC ÷ ΔQ = (380 − 300) ÷ (25 − 20) = 80 ÷ 5 = <strong>$16</strong>. Dividing 380 by 25 gives $15.20, which is ATC.' },
  { id: 'e3', home: 4, fnd: 1, type: 'mcq', short: 'Fixed costs and today\'s output',
    stem: 'A restaurant\'s landlord raises its monthly rent, which is a fixed cost. In the short run, its profit-maximising quantity of meals:',
    opts: [
      { t: 'Doesn\'t change, because fixed costs don\'t affect marginal cost', ok: true },
      { t: 'Falls, because costs are higher', why: 'Total and average costs rise, but the cost of producing one <em>more</em> meal doesn\'t change, so the best quantity stays the same.' },
      { t: 'Rises, to spread the rent over more meals', why: 'Spreading a fixed cost lowers AFC but doesn\'t change marginal cost, and output decisions are made at the margin.' },
      { t: 'Drops to zero, because the restaurant must shut down', why: 'Shutting down doesn\'t avoid rent in the short run. Chapter 11\'s shutdown rule compares price with AVC, not ATC.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'frq', title: 'Accounting vs Economic Profit', short: 'Dentist opens practice',
    stem: 'Dr. Lee leaves a job paying <strong>$150,000</strong> to open her own practice. She uses <strong>$200,000</strong> of her savings, which were earning <strong>5%</strong>. In the first year the practice earns <strong>$400,000</strong> in revenue and pays <strong>$220,000</strong> in staff wages, rent and supplies.',
    parts: [
      { q: 'Calculate her accounting profit.', pts: 2,
        model: '$400,000 − $220,000 = $180,000.',
        rub: [['Revenue − explicit costs', 1], ['$180,000', 1]] },
      { q: 'Identify her implicit costs and calculate their total.', pts: 3,
        model: 'Forgone salary of $150,000, plus forgone interest of 5% × $200,000 = $10,000. Total implicit cost = $160,000.',
        rub: [['Forgone salary $150,000', 1], ['Forgone interest $10,000', 1], ['Total $160,000', 1]] },
      { q: 'Calculate her economic profit.', pts: 2,
        model: '$180,000 − $160,000 = $20,000.',
        rub: [['Accounting profit − implicit costs', 1], ['$20,000', 1]] },
      { q: 'Should she stay in private practice? Explain using economic profit.', pts: 3,
        model: 'Yes. Economic profit is positive, so the practice earns $20,000 more than her next-best use of her time and money. She is better off staying than going back to her old job and keeping her savings in the bank.',
        rub: [['Yes', 1], ['Positive economic profit', 1], ['Means she beats her next-best alternative', 1]] }
    ] },

  { id: 'q2', fnd: 2, type: 'frq', title: 'Diminishing Marginal Product', short: 'Car wash workers',
    stem: 'A car wash with one washing bay hires workers. With 1, 2, 3, 4 and 5 workers it washes <strong>10, 24, 34, 40 and 42</strong> cars per hour.',
    parts: [
      { q: 'Calculate the marginal product of each worker.', pts: 3,
        model: 'Worker 1: 10. Worker 2: 14. Worker 3: 10. Worker 4: 6. Worker 5: 2.',
        rub: [['MP of workers 1–2 correct (10, 14)', 1], ['MP of workers 3–4 correct (10, 6)', 1], ['MP of worker 5 correct (2)', 1]] },
      { q: 'After which worker does diminishing marginal product begin? Why?', pts: 3,
        model: 'After the second worker: MP falls from 14 to 10 with the third. The first two can specialise, one washing and one drying, but with only one bay each extra worker has less equipment to work with.',
        rub: [['Begins with the 3rd worker (after the 2nd)', 1], ['Early gains come from specialisation', 1], ['The fixed bay is why MP then falls', 1]] },
      { q: 'Is output falling with the fifth worker? Explain the difference between diminishing and negative MP.', pts: 2,
        model: 'No. Output still rises, from 40 to 42. Diminishing MP means each worker adds less. Negative MP would mean total output actually falls.',
        rub: [['Output still rises', 1], ['Correctly distinguishes diminishing from negative MP', 1]] },
      { q: 'If each worker is paid $20 an hour, what is the marginal cost of a car wash when the 4th worker is hired?', pts: 2,
        model: 'MC = wage ÷ MP = $20 ÷ 6 ≈ $3.33 per car.',
        rub: [['Uses wage ÷ MP (or ΔTC ÷ ΔQ)', 1], ['≈ $3.33', 1]] }
    ] },

  { id: 'q3', fnd: 3, type: 'frq', title: 'Completing a Cost Table', short: 'Cost table calculations',
    stem: 'A firm has fixed cost of <strong>$60</strong>. Its variable cost is <strong>$40</strong> at Q = 10, <strong>$70</strong> at Q = 20, and <strong>$120</strong> at Q = 30.',
    parts: [
      { q: 'Compute total cost at each quantity.', pts: 2,
        model: 'TC = FC + VC: $100 at 10, $130 at 20, $180 at 30.',
        rub: [['TC = FC + VC', 1], ['$100, $130, $180', 1]] },
      { q: 'Compute AFC, AVC and ATC at Q = 20.', pts: 3,
        model: 'AFC = 60 ÷ 20 = $3. AVC = 70 ÷ 20 = $3.50. ATC = 130 ÷ 20 = $6.50.',
        rub: [['AFC = $3', 1], ['AVC = $3.50', 1], ['ATC = $6.50', 1]] },
      { q: 'Compute marginal cost per unit from Q = 10 to 20 and from Q = 20 to 30.', pts: 3,
        model: 'From 10 to 20: (130 − 100) ÷ 10 = $3. From 20 to 30: (180 − 130) ÷ 10 = $5.',
        rub: [['Uses ΔTC ÷ ΔQ', 1], ['$3 from 10 to 20', 1], ['$5 from 20 to 30', 1]] },
      { q: 'Is ATC rising or falling between Q = 20 and 30? Use MC to explain.', pts: 2,
        model: 'ATC is $6.50 at Q = 20 and $6.00 at Q = 30, so it is falling. MC over that range ($5) is below ATC, which pulls the average down.',
        rub: [['ATC falls ($6.50 → $6.00)', 1], ['Because MC is below ATC', 1]] }
    ] },

  { id: 'q4', fnd: 4, type: 'frq', title: 'Marginal and Average Cost', short: 'Why MC crosses ATC at min',
    stem: 'On a firm\'s cost diagram, the marginal cost curve passes through the lowest point of both the AVC and ATC curves.',
    parts: [
      { q: 'Explain why MC crosses ATC at the minimum of ATC.', pts: 4,
        model: 'When MC is below ATC, each extra unit costs less than the average, so the average falls. When MC is above ATC, the average rises. ATC stops falling and starts rising exactly where MC equals it, which is its minimum.',
        rub: [['MC below ATC → ATC falls', 1], ['MC above ATC → ATC rises', 1], ['So they meet at ATC\'s minimum', 1], ['Uses an average-and-marginal analogy or clear reasoning', 1]] },
      { q: 'Why does the minimum of AVC occur at a lower output than the minimum of ATC?', pts: 3,
        model: 'ATC = AVC + AFC, and AFC keeps falling as output rises. Even after AVC starts to rise, falling AFC keeps pulling ATC down for a while. So ATC reaches its minimum later, where MC is higher and crosses it.',
        rub: [['ATC = AVC + AFC', 1], ['AFC keeps falling', 1], ['So ATC bottoms out later than AVC', 1]] },
      { q: 'Why does the gap between ATC and AVC narrow as output rises?', pts: 3,
        model: 'The vertical gap is AFC = FC ÷ Q. Fixed cost is spread over more and more units, so AFC shrinks toward zero and the two curves get closer.',
        rub: [['The gap equals AFC', 1], ['AFC = FC ÷ Q', 1], ['Falls as Q rises', 1]] }
    ] },

  { id: 'q5', fnd: 5, type: 'frq', title: 'Economies of Scale', short: 'Long-run average cost',
    stem: 'A small brewery is deciding whether to build a much larger plant. Its estimates show long-run average cost falling up to about 1 million barrels a year, flat to 3 million, and rising beyond that.',
    parts: [
      { q: 'Name the three regions of the LRATC curve described.', pts: 3,
        model: 'Economies of scale (falling, up to 1M), constant returns to scale (flat, 1M–3M), and diseconomies of scale (rising, above 3M).',
        rub: [['Economies of scale', 1], ['Constant returns to scale', 1], ['Diseconomies of scale', 1]] },
      { q: 'Give two reasons for economies of scale in brewing.', pts: 2,
        model: 'Any two: specialised workers and equipment, discounts from buying inputs in bulk, spreading large fixed investments such as automated bottling lines over more output, and cheaper shipping or advertising per unit.',
        rub: [['First valid reason', 1], ['Second valid reason', 1]] },
      { q: 'Why might a very large brewery experience diseconomies of scale?', pts: 2,
        model: 'Coordination and management problems: more layers of management, slower decisions, and harder monitoring of workers, which raise cost per unit.',
        rub: [['Coordination or management problems', 1], ['These raise per-unit cost at very large size', 1]] },
      { q: 'How do diseconomies of scale differ from diminishing marginal product?', pts: 3,
        model: 'Diminishing MP is short-run: one input increases while at least one is fixed. Diseconomies of scale are long-run: all inputs increase together and output grows by proportionally less, which raises LRATC.',
        rub: [['Diminishing MP = short run, one input fixed', 1], ['Diseconomies = long run, all inputs variable', 1], ['States the effect of each (MC rises vs LRATC rises)', 1]] }
    ] },

  { id: 'q6', fnd: 1, type: 'frq', title: 'Should the Farmer Keep Farming?', short: 'Farm with owned land',
    stem: 'A farmer owns her land outright. Last year her farm had revenue of <strong>$300,000</strong> and explicit costs of <strong>$180,000</strong>. She could lease the land to a neighbour for <strong>$70,000</strong> a year and work as a farm manager for <strong>$65,000</strong>.',
    parts: [
      { q: 'Calculate accounting profit.', pts: 2,
        model: '$300,000 − $180,000 = $120,000.',
        rub: [['Revenue − explicit costs', 1], ['$120,000', 1]] },
      { q: 'Calculate economic profit.', pts: 3,
        model: 'Implicit costs = $70,000 forgone rent + $65,000 forgone salary = $135,000. Economic profit = $120,000 − $135,000 = −$15,000.',
        rub: [['Includes forgone rent', 1], ['Includes forgone salary', 1], ['−$15,000', 1]] },
      { q: 'Her accountant says the farm is "very profitable." Is the accountant right? Explain.', pts: 3,
        model: 'Only in accounting terms. The accountant ignores the opportunity cost of her land and her time. Leasing the land and taking the manager job would bring in $135,000, which is $15,000 more than farming.',
        rub: [['Accounting profit is positive but economic profit is negative', 1], ['The accountant ignores implicit costs', 1], ['Leasing and working elsewhere earns $15,000 more', 1]] },
      { q: 'Why is the price she paid for the land years ago irrelevant to this decision?', pts: 2,
        model: 'It is a sunk cost and can\'t be recovered whatever she decides. What matters is what the land could earn now: the $70,000 lease.',
        rub: [['The purchase price is sunk', 1], ['The relevant cost is the land\'s current opportunity cost (the lease)', 1]] }
    ] },

  { id: 'q7', fnd: 3, type: 'frq', title: 'Fixed and Variable Costs', short: 'Classify bakery costs',
    stem: 'A food truck has these monthly costs: a truck loan payment, ingredients, a parking permit, gas for driving to events, the cook\'s hourly wages, and insurance.',
    parts: [
      { q: 'Classify each cost as fixed or variable in the short run.', pts: 3,
        model: 'Fixed: loan payment, parking permit, insurance. Variable: ingredients, gas, the cook\'s hourly wages.',
        rub: [['Loan, permit and insurance as fixed', 1], ['Ingredients and hourly wages as variable', 1], ['Gas as variable', 1]] },
      { q: 'Explain why average fixed cost falls as the truck sells more meals.', pts: 2,
        model: 'AFC = FC ÷ Q. The same fixed total is divided over more meals, so the fixed cost per meal falls.',
        rub: [['AFC = FC ÷ Q', 1], ['The same total is spread over more units', 1]] },
      { q: 'If the parking permit fee doubles, what happens to MC, AVC and ATC?', pts: 3,
        model: 'MC and AVC are unchanged, because the permit is fixed and doesn\'t vary with output. ATC rises at every quantity because AFC rises.',
        rub: [['MC unchanged', 1], ['AVC unchanged', 1], ['ATC rises (through AFC)', 1]] },
      { q: 'In the long run, is the truck loan still a fixed cost? Explain.', pts: 2,
        model: 'No. In the long run all costs are variable: the owner can sell the truck, buy a second one, or leave the business.',
        rub: [['No', 1], ['In the long run all inputs are variable', 1]] }
    ] },

  { id: 'q8', fnd: 2, type: 'frq', title: 'From Product to Cost', short: 'MP and MC mirror images',
    stem: 'A t-shirt printer pays each worker <strong>$100</strong> a day. Workers 1, 2 and 3 add <strong>50, 40 and 25</strong> shirts per day respectively.',
    parts: [
      { q: 'Compute the marginal cost per shirt for each worker.', pts: 3,
        model: 'Worker 1: 100 ÷ 50 = $2.00. Worker 2: 100 ÷ 40 = $2.50. Worker 3: 100 ÷ 25 = $4.00.',
        rub: [['$2.00', 1], ['$2.50', 1], ['$4.00', 1]] },
      { q: 'Describe the relationship between marginal product and marginal cost.', pts: 3,
        model: 'They are inverses: MC = wage ÷ MP. When MP falls, each extra shirt needs more labour time, so MC rises.',
        rub: [['MC = wage ÷ MP', 1], ['Falling MP → rising MC', 1], ['Explains the intuition: more labour per extra unit', 1]] },
      { q: 'What input is likely fixed here, and why does that matter?', pts: 2,
        model: 'The printing press or the shop space. Because it is fixed, adding workers eventually crowds it, so marginal product diminishes.',
        rub: [['Names a plausible fixed input (press or space)', 1], ['Links it to diminishing MP', 1]] },
      { q: 'If the wage rises to $120, what happens to the MC curve?', pts: 2,
        model: 'MC rises at every output level. It shifts up by 20%, because MC = wage ÷ MP and MP is unchanged.',
        rub: [['MC shifts up', 1], ['Because the wage is in the numerator and MP is unchanged', 1]] }
    ] },

  { id: 'q9', fnd: 4, type: 'frq', title: 'Reading the Cost Curves', short: 'Interpreting MC vs ATC',
    stem: 'A firm is producing <strong>500</strong> units. At that output, MC = <strong>$12</strong>, ATC = <strong>$15</strong> and AVC = <strong>$9</strong>.',
    parts: [
      { q: 'Calculate total cost, variable cost and fixed cost.', pts: 3,
        model: 'TC = 15 × 500 = $7,500. VC = 9 × 500 = $4,500. FC = $7,500 − $4,500 = $3,000.',
        rub: [['TC = $7,500', 1], ['VC = $4,500', 1], ['FC = $3,000', 1]] },
      { q: 'Is ATC rising or falling at this output? Explain.', pts: 2,
        model: 'Falling, because MC ($12) is below ATC ($15), so each extra unit pulls the average down.',
        rub: [['Falling', 1], ['Because MC < ATC', 1]] },
      { q: 'Is AVC rising or falling at this output? Explain.', pts: 2,
        model: 'Rising, because MC ($12) is above AVC ($9).',
        rub: [['Rising', 1], ['Because MC > AVC', 1]] },
      { q: 'Is the firm producing more or less than the output that minimises ATC? Explain.', pts: 3,
        model: 'Less. ATC is still falling, so its minimum, where MC = ATC, is at a higher output. The firm is past AVC\'s minimum but hasn\'t yet reached ATC\'s.',
        rub: [['Less than ATC-minimising output', 1], ['Because ATC is still falling', 1], ['Notes the output lies between the AVC and ATC minimums', 1]] }
    ] },

  { id: 'q10', fnd: 5, type: 'frq', title: 'Short Run vs Long Run', short: 'Expanding a restaurant',
    stem: 'A popular restaurant is always full. In the short run it can only add servers. In the long run it can also move to a bigger building.',
    parts: [
      { q: 'Define the short run and the long run in production.', pts: 2,
        model: 'Short run: at least one input (here the building) is fixed. Long run: every input can be changed.',
        rub: [['Short run: at least one fixed input', 1], ['Long run: all inputs variable', 1]] },
      { q: 'What happens to the marginal product of servers as more are added in the current building? Why?', pts: 3,
        model: 'It eventually diminishes. The building, kitchen and tables are fixed, so each extra server has fewer tables to serve and gets in the others\' way.',
        rub: [['MP diminishes', 1], ['Because the space is fixed', 1], ['Gives a concrete crowding mechanism', 1]] },
      { q: 'How does moving to a bigger building change the restaurant\'s short-run cost curves?', pts: 3,
        model: 'It moves to a new set of short-run curves. Fixed costs are higher (more rent), but diminishing returns set in at a larger output, so ATC reaches its minimum at a higher quantity. If there are economies of scale, that minimum is also lower.',
        rub: [['New short-run curves at a larger scale', 1], ['Higher fixed cost', 1], ['Minimum ATC at higher output, and lower if there are economies of scale', 1]] },
      { q: 'What does the long-run ATC curve represent?', pts: 2,
        model: 'The lowest average cost of producing each output when the firm can choose its plant size freely. It is the lower envelope of all the short-run ATC curves.',
        rub: [['Lowest average cost at each output with all inputs variable', 1], ['The lower envelope of short-run ATC curves', 1]] }
    ] }
];
