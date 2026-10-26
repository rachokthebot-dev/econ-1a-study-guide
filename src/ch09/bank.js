var FND = ['Negative externalities', 'Positive externalities', 'Fixing externalities', 'Classifying goods', 'Free riders & commons'];

var BANK = [
  { id: 'n1', home: 1, fnd: 1, type: 'mcq', short: 'Pollution and quantity',
    stem: 'A paper mill dumps waste into a river and pays nothing for the harm it does downstream. Compared with the efficient level, the market produces:',
    opts: [
      { t: 'Too much paper, because the mill ignores part of the cost of each unit', ok: true },
      { t: 'Too little paper, because pollution makes paper less valuable', why: 'The pollution doesn\'t change what buyers will pay for paper. It adds a cost that the mill doesn\'t pay, so private cost is too low and output is too high.' },
      { t: 'The efficient amount, since buyers and sellers both agree to trade', why: 'Both sides agreeing makes the trade efficient only if nobody else is affected. The people downstream never agreed to anything.' },
      { t: 'No paper at all, because the harm outweighs the benefit', why: 'The efficient quantity is lower than the market quantity, but it is usually not zero. Many units are still worth making after the damage is counted.' }
    ] },
  { id: 'n2', home: 1, fnd: 2, type: 'mcq', short: 'Vaccination and quantity',
    stem: 'Getting a flu shot protects the people around you as well as yourself. Without intervention, the number of flu shots will be:',
    opts: [
      { t: 'Below the efficient level, because individuals don\'t count the benefit to others', ok: true },
      { t: 'Above the efficient level, because people over-value their own health', why: 'The question is about benefit that goes to <em>other</em> people. That benefit is left out of each person\'s decision, so too few shots are bought.' },
      { t: 'At the efficient level, since people choose what is best for them', why: 'Each person chooses what is best for <em>them</em>. The benefit to people around them doesn\'t enter that choice.' },
      { t: 'Above the efficient level, because there is an externality', why: 'Positive and negative externalities point in opposite directions. Too much goes with a spillover <em>cost</em>. A spillover benefit means too little.' }
    ] },
  { id: 'n3', home: 1, fnd: 1, type: 'numeric', short: 'Efficient quantity with damage',
    stem: 'Demand is P = 100 − Q and private supply is P = 10 + 0.5Q. Each unit causes $30 of harm to bystanders. What is the efficient quantity?',
    answer: 40, tol: 0,
    why: 'Social cost = 10 + 30 + 0.5Q = 40 + 0.5Q. Set it equal to demand: 100 − Q = 40 + 0.5Q, so 1.5Q = 60 and Q = <strong>40</strong>. The market produces 60. Adding the $30 to demand (100 + 30 − Q) puts it on the wrong curve and gives 80.' },

  { id: 'f1', home: 2, fnd: 3, type: 'mcq', short: 'The right corrective tax',
    stem: 'Each ton of a chemical causes $12 of harm to bystanders. The efficient corrective tax is:',
    opts: [
      { t: '$12 per ton, equal to the external cost per unit', ok: true },
      { t: 'The total damage across all tons, charged as a single lump sum', why: 'A lump sum doesn\'t change the cost of producing one more ton, so it doesn\'t change the quantity. The tax has to be per unit to change behaviour at the margin.' },
      { t: 'As high as possible, to minimise pollution', why: 'A tax above $12 pushes output below the optimum and creates a new deadweight loss. The aim is the efficient quantity, not the lowest one.' },
      { t: 'Whatever amount covers the cost of cleaning up', why: 'Clean-up cost is a different number from the harm caused by each ton. A Pigouvian tax is set equal to the external cost per unit.' }
    ] },
  { id: 'f2', home: 2, fnd: 3, type: 'mcq', short: 'Coase and who pays',
    stem: 'A factory and one neighbouring farm can bargain cheaply. The law changes so that the farm, instead of the factory, now holds the right to clean air. According to the Coase theorem:',
    opts: [
      { t: 'The amount of pollution stays the same; only who pays whom changes', ok: true },
      { t: 'Pollution falls to zero, because the farm can now forbid it', why: 'The farm can forbid it, but it will accept payment to allow pollution whenever the factory values polluting more than the farm is harmed by it. The two still bargain to the same efficient amount.' },
      { t: 'Pollution rises, because the factory must now pay', why: 'Having to pay doesn\'t change the efficient amount. Under Coase, the bargaining always ends at the outcome that maximises their combined surplus.' },
      { t: 'Bargaining stops working, because rights now favour the farm', why: 'Coase only requires clear rights and low transaction costs. Which side holds the right doesn\'t matter for whether bargaining works.' }
    ] },
  { id: 'f3', home: 2, fnd: 3, type: 'mcq', short: 'When Coase fails',
    stem: 'Why is private bargaining unlikely to solve air pollution from a large city\'s traffic?',
    opts: [
      { t: 'Too many parties are involved, so the costs of bargaining are prohibitive', ok: true },
      { t: 'Because the drivers have no property rights', why: 'Rights could be assigned to either side, and Coase says that wouldn\'t change the outcome. The obstacle is the cost of getting millions of people to bargain.' },
      { t: 'Because pollution is a positive externality', why: 'It is a negative externality. In any case the type of externality isn\'t why bargaining fails.' },
      { t: 'Because the efficient level of pollution is zero', why: 'It rarely is. Bargaining fails here because of transaction costs, not because of where the efficient level lies.' }
    ] },

  { id: 'g1', home: 3, fnd: 4, type: 'classify', short: 'Four kinds of goods',
    stem: 'Classify each good.',
    cats: ['Private', 'Club', 'Common resource', 'Public'],
    rows: [
      { t: 'Fish in the open ocean', cat: 'Common resource' },
      { t: 'A Netflix subscription', cat: 'Club' },
      { t: 'A tsunami warning siren', cat: 'Public' },
      { t: 'A slice of pizza', cat: 'Private' }
    ],
    why: 'Ask both questions. Ocean fish are rival but you can\'t keep anyone from catching them, so they are a common resource. Netflix is excludable but one more viewer costs others nothing, so it is a club good. A siren is neither rival nor excludable, so it is a public good. Pizza is both rival and excludable, so it is a private good.' },
  { id: 'g2', home: 3, fnd: 5, type: 'mcq', short: 'Why markets underprovide',
    stem: 'A fireworks show is worth $50,000 to a town in total and costs $20,000. Why might a private firm still fail to put it on?',
    opts: [
      { t: 'It can\'t stop people who don\'t pay from watching, so too few will pay', ok: true },
      { t: 'Because the show costs more than it is worth', why: 'It is worth $50,000 and costs $20,000, so it is worth doing. The problem is collecting the money.' },
      { t: 'Because each extra viewer uses up some of the show', why: 'That is the opposite of the truth. A fireworks show is non-rival: one more viewer costs nothing.' },
      { t: 'Because there is a negative externality', why: 'There is a spillover, but it is a <em>benefit</em> to people who don\'t pay. That is the free-rider problem.' }
    ] },
  { id: 'g3', home: 3, fnd: 5, type: 'mcq', short: 'Tragedy of the commons',
    stem: 'Ranchers share an open pasture with no rules. Each rancher adds cows until the pasture is ruined. The underlying reason is:',
    opts: [
      { t: 'Each rancher gets the full gain from another cow but bears only part of the cost of overgrazing', ok: true },
      { t: 'The pasture is a public good', why: 'Grass is <em>rival</em>: what one cow eats, another can\'t. A rival, non-excludable good is a common resource, not a public good.' },
      { t: 'The ranchers are irrational', why: 'Each rancher is being perfectly rational. The problem is that individually rational choices add up to a bad result because the cost falls on the others.' },
      { t: 'Grass is too cheap', why: 'The grass is free. That is a symptom, not the mechanism: the cost of overgrazing falls on other people.' }
    ] },

  { id: 'x1', home: 4, fnd: 2, type: 'numeric', short: 'Efficient subsidy quantity',
    stem: 'Demand (private benefit) is P = 100 − Q and supply is P = 10 + 0.5Q. Each unit gives $15 of benefit to bystanders. What is the efficient quantity?',
    answer: 70, tol: 0,
    why: 'Social benefit = 115 − Q. Set it equal to supply: 115 − Q = 10 + 0.5Q, so 1.5Q = 105 and Q = <strong>70</strong>. The market stops at 60. A $15 per-unit subsidy gets it to 70.' },
  { id: 'x2', home: 4, fnd: 4, type: 'mcq', short: 'Government ≠ public good',
    stem: 'A city runs a public swimming pool that charges admission and gets crowded in summer. Economically the pool is:',
    opts: [
      { t: 'Not a public good: entry can be restricted and space is rival when crowded', ok: true },
      { t: 'A public good, because the government provides it', why: 'Who provides a good doesn\'t decide its category. Its properties do, and an admission fee means it is excludable.' },
      { t: 'A common resource, because it is publicly owned', why: 'Common resources are <em>non-excludable</em>. A pool that charges at the gate is excludable.' },
      { t: 'A public good, because many people use it at once', why: 'Many people using something at once doesn\'t make it non-rival. Once it is crowded, each swimmer takes up space someone else could use.' }
    ] },
  { id: 'x3', home: 4, fnd: 1, type: 'mcq', short: 'Tax revenue vs DWL',
    stem: 'A Pigouvian tax set equal to the external cost is imposed. Compared with no tax, the deadweight loss:',
    opts: [
      { t: 'Falls to zero, because the market now produces the efficient quantity', ok: true },
      { t: 'Rises, because all taxes create deadweight loss', why: 'Chapter 7\'s taxes created DWL because the market <em>started</em> efficient. Here the market starts inefficient, and the tax moves it to the efficient quantity.' },
      { t: 'Stays the same, since the tax is just a transfer', why: 'The revenue is a transfer, but the tax also changes the <em>quantity</em>, and that removes the overproduction.' },
      { t: 'Falls, but never all the way to zero', why: 'If the tax exactly equals the external cost per unit, the market lands on the optimum and the deadweight loss is zero.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'frq', title: 'Pollution from a Factory', short: 'Factory pollution',
    stem: 'A steel plant releases smoke that damages the health of nearby residents. The plant does not pay for this damage.',
    parts: [
      { q: 'Identify the type of externality and explain why it exists.', pts: 2,
        model: 'A negative externality. Part of the cost of producing steel (the health damage) falls on residents who aren\'t part of the transaction, so the plant\'s private cost is lower than the social cost.',
        rub: [['Negative externality', 1], ['The cost falls on third parties, so private cost < social cost', 1]] },
      { q: 'Compare the market quantity of steel with the socially efficient quantity. Explain.', pts: 3,
        model: 'The market produces more than is efficient. The plant produces where demand meets its private cost, which lies below social cost. Social cost meets demand at a lower quantity, so the units in between cost society more than they are worth.',
        rub: [['Market quantity > efficient quantity', 1], ['The market uses private cost, which lies below social cost', 1], ['The extra units have social cost above their value', 1]] },
      { q: 'Explain the deadweight loss in this market.', pts: 3,
        model: 'For each unit between the efficient and the market quantity, social cost is higher than the benefit to buyers. Adding up those net losses gives the deadweight loss triangle, between the social-cost curve and demand.',
        rub: [['It arises on units between the efficient and market quantities', 1], ['On those units social cost exceeds benefit', 1], ['Locates it as the triangle between social cost and demand', 1]] },
      { q: 'Propose a policy that would lead to the efficient quantity, and say how large it should be.', pts: 2,
        model: 'A per-unit (Pigouvian) tax on steel equal to the external cost per unit. This raises the plant\'s private cost to the social cost.',
        rub: [['Names a per-unit corrective tax (or tradable permits)', 1], ['Sets it equal to the external cost per unit', 1]] }
    ] },

  { id: 'q2', fnd: 4, type: 'frq', title: 'Classifying Goods', short: 'Rival / excludable table',
    stem: 'Economists classify goods by whether they are <strong>rival</strong> and whether they are <strong>excludable</strong>.',
    parts: [
      { q: 'Define rival and excludable.', pts: 2,
        model: 'Rival: one person\'s use reduces how much is available for others. Excludable: people who don\'t pay can be prevented from using it.',
        rub: [['Correct definition of rival', 1], ['Correct definition of excludable', 1]] },
      { q: 'Classify each: (i) national defence, (ii) a toll road with no traffic, (iii) tuna in international waters, (iv) a cup of coffee.', pts: 4,
        model: '(i) Public good: non-rival, non-excludable. (ii) Club good: excludable, non-rival while empty. (iii) Common resource: rival, non-excludable. (iv) Private good: rival and excludable.',
        rub: [['National defence: public good', 1], ['Empty toll road: club good', 1], ['Ocean tuna: common resource', 1], ['Coffee: private good', 1]] },
      { q: 'A free highway is congested at rush hour. Which category is it in at that time, and why?', pts: 2,
        model: 'A common resource. It is non-excludable because there is no toll, and when it\'s congested it becomes rival, because each extra car slows everyone else down.',
        rub: [['Common resource', 1], ['Non-excludable and rival because of congestion', 1]] },
      { q: 'Why do markets tend to under-provide public goods?', pts: 2,
        model: 'Because they are non-excludable, people can benefit without paying, so they free ride. Private firms can\'t collect enough revenue even when the total value is more than the cost.',
        rub: [['Non-excludability leads to free riding', 1], ['So private revenue falls short even when the good is worth providing', 1]] }
    ] },

  { id: 'q3', fnd: 2, type: 'frq', title: 'Education Spillovers', short: 'College and positive externality',
    stem: 'A more educated population commits less crime, votes more knowledgeably, and creates ideas that others use. Students pay tuition based only on the benefit they personally expect.',
    parts: [
      { q: 'What kind of externality is this? Which curve does it affect?', pts: 2,
        model: 'A positive externality on the benefit side. Social benefit equals private benefit (demand) plus the external benefit, so the social-benefit curve lies above demand.',
        rub: [['Positive externality', 1], ['Social benefit lies above private demand', 1]] },
      { q: 'Without intervention, how does the quantity of education compare with the efficient level? Explain.', pts: 3,
        model: 'There is too little. Students buy education until their private benefit equals the cost, and they ignore the benefit to others. The efficient quantity, where social benefit equals cost, is higher.',
        rub: [['Market quantity < efficient quantity', 1], ['Students ignore the external benefit', 1], ['The efficient quantity is where social benefit = cost', 1]] },
      { q: 'What policy would correct this, and how should it be sized?', pts: 3,
        model: 'A per-unit subsidy, such as grants or tuition aid, equal to the external benefit per unit. It lowers the cost students face, which raises the quantity to the efficient level.',
        rub: [['A subsidy, or public provision or support', 1], ['Equal to the external benefit per unit', 1], ['It raises quantity to the efficient level', 1]] },
      { q: 'What happens if the subsidy is set larger than the external benefit?', pts: 2,
        model: 'Quantity rises above the efficient level, so units are produced that cost more than their full social benefit. That is a new deadweight loss from over-correcting.',
        rub: [['Quantity overshoots the efficient level', 1], ['This creates a new deadweight loss', 1]] }
    ] },

  { id: 'q4', fnd: 3, type: 'frq', title: 'Calculating a Pigouvian Tax', short: 'Computing optimum and tax',
    stem: 'In a market, demand is <strong>P = 120 − 2Q</strong> and private supply is <strong>P = 20 + 2Q</strong>. Each unit causes <strong>$20</strong> of harm to bystanders.',
    parts: [
      { q: 'Find the market (unregulated) quantity and price.', pts: 2,
        model: '120 − 2Q = 20 + 2Q → Q = 25, P = $70.',
        rub: [['Q = 25', 1], ['P = $70', 1]] },
      { q: 'Find the socially efficient quantity.', pts: 3,
        model: 'Social cost = 20 + 20 + 2Q = 40 + 2Q. Set it equal to demand: 120 − 2Q = 40 + 2Q → 4Q = 80 → Q = 20.',
        rub: [['Adds the $20 external cost to supply', 1], ['Sets social cost equal to demand', 1], ['Q = 20', 1]] },
      { q: 'Calculate the deadweight loss of the unregulated market.', pts: 3,
        model: 'At Q = 25, social cost = 40 + 50 = $90 and demand = $70, a gap of $20. At Q = 20 the gap is 0. DWL = ½ × 20 × (25 − 20) = $50.',
        rub: [['Height = $20, the gap at Q = 25', 1], ['Base = 5 units', 1], ['DWL = $50', 1]] },
      { q: 'What per-unit tax achieves efficiency, and how much revenue does it raise?', pts: 2,
        model: 'A $20 tax per unit. Quantity falls to 20, so revenue = $20 × 20 = $400.',
        rub: [['Tax = $20 per unit', 1], ['Revenue = $400 (using the new Q of 20)', 1]] }
    ] },

  { id: 'q5', fnd: 5, type: 'frq', title: 'The Free-Rider Problem', short: 'Mosquito spraying',
    stem: 'A town of <strong>1,000</strong> households is considering mosquito spraying that costs <strong>$30,000</strong>. Each household values it at <strong>$50</strong>. Once the town is sprayed, nobody can be excluded from the benefit.',
    parts: [
      { q: 'Is spraying efficient? Show your reasoning.', pts: 2,
        model: 'Yes. Total value = 1,000 × $50 = $50,000, which is more than the $30,000 cost, so net surplus is $20,000.',
        rub: [['Sums the values: $50,000', 1], ['Compares with the cost and concludes it is efficient', 1]] },
      { q: 'Will a private firm selling spraying "subscriptions" succeed? Explain.', pts: 3,
        model: 'Unlikely. Spraying is non-excludable: once the area is sprayed, everyone benefits whether they paid or not. Each household has an incentive to free ride, so the firm can\'t raise $30,000.',
        rub: [['Unlikely to succeed', 1], ['Because the good is non-excludable', 1], ['Households free ride, so revenue falls short', 1]] },
      { q: 'Is spraying rival? Why does that matter for how it should be priced?', pts: 2,
        model: 'No, it is non-rival: one household\'s protection doesn\'t reduce another\'s. The marginal cost of serving one more household is zero, so excluding anyone would waste value even if it were possible.',
        rub: [['Non-rival', 1], ['The marginal cost of an extra user is zero, so excluding people wastes value', 1]] },
      { q: 'How could the town provide it, and what would each household pay and gain?', pts: 3,
        model: 'Fund it with a tax: $30,000 / 1,000 = $30 per household. Each household gets $50 of value for $30, a net gain of $20, and the town gains $20,000 in total.',
        rub: [['Government provision funded by taxes', 1], ['$30 per household', 1], ['Net gain of $20 each ($20,000 total)', 1]] }
    ] },

  { id: 'q6', fnd: 3, type: 'frq', title: 'The Coase Theorem', short: 'Bakery and doctor bargain',
    stem: 'A bakery\'s mixer makes noise that disturbs a doctor\'s office next door. Soundproofing costs the bakery <strong>$800</strong>. The noise costs the doctor <strong>$1,000</strong> in lost business. They can bargain at no cost.',
    parts: [
      { q: 'What is the efficient outcome? Why?', pts: 2,
        model: 'The bakery soundproofs. Removing the noise costs $800, which is less than the $1,000 of damage, so soundproofing saves $200 in total.',
        rub: [['The bakery soundproofs', 1], ['Because $800 < $1,000', 1]] },
      { q: 'If the doctor has the right to quiet, what happens?', pts: 2,
        model: 'The bakery must stop the noise or pay the doctor at least $1,000. Soundproofing for $800 is cheaper, so it soundproofs.',
        rub: [['The bakery must compensate or abate', 1], ['It soundproofs, which is cheaper than paying $1,000', 1]] },
      { q: 'If the bakery has the right to make noise, what happens?', pts: 3,
        model: 'The doctor would pay up to $1,000 to end the noise, and the bakery accepts anything above $800. They agree on a payment between $800 and $1,000, and the bakery soundproofs. The outcome is the same and only the payment changes direction.',
        rub: [['The doctor pays the bakery', 1], ['The payment is between $800 and $1,000', 1], ['The outcome is the same: the bakery soundproofs', 1]] },
      { q: 'Why would this reasoning fail if the bakery disturbed 500 households?', pts: 3,
        model: 'Transaction costs would be high. Organising 500 parties, agreeing how to split payments, and dealing with households that free ride on the deal would make bargaining impractical. Coase needs low transaction costs and few parties.',
        rub: [['High transaction costs', 1], ['Coordination problems or free riding among many parties', 1], ['Coase requires low bargaining costs and few parties', 1]] }
    ] },

  { id: 'q7', fnd: 1, type: 'frq', title: 'Taxing Gasoline', short: 'Gas tax and congestion',
    stem: 'Driving causes air pollution and congestion. Estimates put these external costs at about <strong>$1.00 per gallon</strong>, and current gasoline taxes are about $0.50 per gallon.',
    parts: [
      { q: 'Is the current quantity of driving efficient, too high, or too low? Explain.', pts: 3,
        model: 'Too high. The tax internalises only $0.50 of the $1.00 external cost, so drivers still face a private cost below the social cost and buy more gasoline than is efficient.',
        rub: [['Too high', 1], ['The tax covers only part of the external cost', 1], ['Private cost is still below social cost', 1]] },
      { q: 'What does economic theory suggest the tax should be?', pts: 2,
        model: 'About $1.00 per gallon, equal to the external cost per gallon.',
        rub: [['$1.00 per gallon', 1], ['Equal to the external cost per unit', 1]] },
      { q: 'Why might a tax be better than a rule limiting each person to a fixed number of gallons?', pts: 3,
        model: 'A tax lets each driver decide whether a trip is worth its full social cost. Drivers who value driving least cut back most, so the reduction is achieved at the lowest total cost. A fixed limit ignores differences in how much people value driving. The tax also raises revenue.',
        rub: [['A tax lets people with low value cut back most', 1], ['So the reduction happens at lower total cost', 1], ['A fixed limit ignores differences in value, or the tax raises revenue', 1]] },
      { q: 'Who bears the burden of a higher gas tax in the short run? (Connect to Chapter 7.)', pts: 2,
        model: 'Mostly drivers. Short-run demand for gasoline is inelastic, and the less elastic side bears more of a tax.',
        rub: [['Mostly buyers (drivers)', 1], ['Because short-run demand is inelastic', 1]] }
    ] },

  { id: 'q8', fnd: 5, type: 'frq', title: 'Tragedy of the Commons', short: 'Overfishing a lake',
    stem: 'A large lake has no rules on fishing. Over twenty years the fish population has collapsed.',
    parts: [
      { q: 'Classify the fish in the lake as a type of good. Explain.', pts: 2,
        model: 'A common resource. The fish are rival, because a fish caught by one person can\'t be caught by another, and non-excludable, because anyone can fish.',
        rub: [['Common resource', 1], ['Rival and non-excludable', 1]] },
      { q: 'Explain why rational individual fishers overfish.', pts: 3,
        model: 'Each fisher gets the full benefit of each extra fish but bears only a small share of the cost of depleting the stock. That cost is spread over all fishers. Ignoring the cost to others is a negative externality, so total catch goes above the sustainable, efficient level.',
        rub: [['Each fisher keeps the full private benefit of a catch', 1], ['The cost of depletion is spread over everyone', 1], ['This is a negative externality and leads to overuse', 1]] },
      { q: 'Propose two policies to fix the problem.', pts: 3,
        model: 'Any two, with a brief reason: catch limits or quotas (possibly tradable), fishing licences or fees, assigning property rights (private ownership gives the owner a reason to conserve), or seasonal closures.',
        rub: [['First valid policy', 1], ['Second valid policy', 1], ['Explains how one of them internalises the cost', 1]] },
      { q: 'Why are privately owned fish farms not overfished?', pts: 2,
        model: 'The owner can exclude others and keeps the future value of the stock, so they bear the full cost of depleting it and have a reason to harvest sustainably.',
        rub: [['The owner can exclude others', 1], ['The owner bears the cost of depletion or keeps the future value', 1]] }
    ] },

  { id: 'q9', fnd: 2, type: 'frq', title: 'Beekeepers and Orchards', short: 'Bees pollinating orchards',
    stem: 'A beekeeper\'s bees pollinate the apple orchards next to the hives, which raises apple yields. The beekeeper is not paid for this.',
    parts: [
      { q: 'Identify the externality and who receives it.', pts: 2,
        model: 'A positive externality. The orchard owners receive the benefit of pollination without paying for it.',
        rub: [['Positive externality', 1], ['Orchard owners receive the benefit', 1]] },
      { q: 'Will the beekeeper keep the efficient number of hives? Explain.', pts: 3,
        model: 'No. The beekeeper counts only the private benefit (honey) and ignores the value of pollination, so they keep fewer hives than is efficient.',
        rub: [['No, too few hives', 1], ['The beekeeper ignores the pollination benefit', 1], ['The efficient number counts the social benefit, honey plus pollination', 1]] },
      { q: 'Describe a private solution that could fix this.', pts: 3,
        model: 'Contracts. The orchard owners pay the beekeeper for pollination services, or the orchard keeps its own bees, which merges the two businesses. With few parties and clear rights, Coase bargaining can reach the efficient number of hives.',
        rub: [['Payment or a contract from orchards to the beekeeper', 1], ['Or merging the businesses so the benefit is internalised', 1], ['Linked to low transaction costs and few parties (Coase)', 1]] },
      { q: 'Why is a private solution more likely here than for air pollution?', pts: 2,
        model: 'Only a few parties are involved, they are easy to identify, and they are next to each other, so transaction costs are low. Air pollution affects millions of people.',
        rub: [['Few, identifiable parties', 1], ['So transaction costs are low', 1]] }
    ] },

  { id: 'q10', fnd: 4, type: 'frq', title: 'When Roads Change Category', short: 'Road: club, public, common',
    stem: 'Consider a highway at three different times: (1) a free road at 3 a.m., (2) the same free road at 5 p.m. rush hour, (3) the same road at rush hour after a toll is added.',
    parts: [
      { q: 'Classify the road in each case.', pts: 3,
        model: '(1) Public good: non-rival when empty and non-excludable when free. (2) Common resource: rival because of congestion, and non-excludable. (3) Private good: excludable because of the toll, and rival because of congestion.',
        rub: [['3 a.m. free road: public good', 1], ['Rush-hour free road: common resource', 1], ['Rush hour with toll: private good', 1]] },
      { q: 'What problem arises in case (2)? Explain using externalities.', pts: 3,
        model: 'Overuse, which is the tragedy of the commons. Each driver who enters slows everyone else, a negative externality they don\'t pay for, so more drivers use the road at rush hour than is efficient.',
        rub: [['Overuse / congestion (tragedy of the commons)', 1], ['Each driver imposes delay on others', 1], ['This is an unpriced negative externality, so there is too much driving', 1]] },
      { q: 'How does a rush-hour toll fix the problem?', pts: 2,
        model: 'A toll equal to the congestion cost each driver imposes makes drivers pay for that external cost. Drivers whose trips are worth less than the toll switch times or routes, and traffic falls toward the efficient level.',
        rub: [['The toll internalises the congestion cost', 1], ['Low-value trips shift or drop, so traffic falls to the efficient level', 1]] },
      { q: 'Why would charging a toll at 3 a.m. be inefficient?', pts: 2,
        model: 'At 3 a.m. the road is non-rival, so an extra driver costs nobody anything. A toll would discourage trips that have value and zero social cost, which is a deadweight loss.',
        rub: [['Non-rival at 3 a.m.: an extra driver has zero marginal cost', 1], ['A toll would deter valuable trips and create a deadweight loss', 1]] }
    ] }
];
