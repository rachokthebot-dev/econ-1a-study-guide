var FND = ['Reading the curve', 'Opportunity cost', 'Increasing cost', 'Shifts vs movements', 'Growth'];

var BANK = [
  { id: 'pc1', home: 1, fnd: 1, type: 'mcq', short: 'A point inside the curve',
    stem: 'An economy is producing at a point <em>inside</em> its PPC. What does that tell you?',
    opts: [
      { t: 'Resources are idle, so more of both goods is possible', ok: true },
      { t: 'The combination is impossible with current resources', why: 'That describes a point <em>outside</em> the curve. Inside points are perfectly attainable — that is the problem with them.' },
      { t: 'The economy is efficient but has chosen a poor mix', why: 'Efficiency means being <em>on</em> the curve. Inside the curve is the definition of inefficient, whatever the mix.' },
      { t: 'Opportunity cost is zero everywhere on the curve', why: 'Opportunity cost is zero only while moving <em>out of</em> an inside point toward the frontier. Along the curve it is always positive.' }
    ] },
  { id: 'pc2', home: 1, fnd: 1, type: 'mcq', short: 'Efficient vs best',
    stem: 'Two points, X and Y, both sit on the PPC. Which can economics tell you?',
    opts: [
      { t: 'Both are efficient; choosing between them needs values, not economics', ok: true },
      { t: 'The one with more total units of output is better', why: 'Adding laptops to loaves is adding unlike things. And even if you could, "more units" is not a welfare ranking.' },
      { t: 'The more balanced point is better', why: 'Balance is a preference, not an efficiency criterion. Both points use every resource fully.' },
      { t: 'Whichever has lower opportunity cost is better', why: 'Opportunity cost differs <em>along</em> the curve, but every point on it is efficient. Lower cost at a point does not make it the right choice.' }
    ] },
  { id: 'pc3', home: 1, fnd: 2, type: 'numeric', short: 'Cost of moving along',
    stem: 'An economy moves from (20 laptops, 180 loaves) to (40 laptops, 150 loaves). What is the opportunity cost of those extra 20 laptops, in loaves?',
    pre: '', answer: 30, tol: 0,
    why: '180 − 150 = <strong>30</strong> loaves given up. Answering 150 gives the new total rather than the change — opportunity cost is always what you <em>lost</em>, not what you are left holding.' },

  { id: 'sh1', home: 2, fnd: 4, type: 'mcq', short: 'What shifts the curve',
    stem: 'Which of these shifts the production possibilities curve outward?',
    opts: [
      { t: 'A rise in the number of trained workers', ok: true },
      { t: 'Deciding to produce more laptops and less bread', why: 'That is a movement <em>along</em> the curve — a different choice from the same possibilities. Nothing about what is possible has changed.' },
      { t: 'A fall in unemployment', why: 'Falling unemployment moves you from <em>inside</em> the curve toward it. The frontier itself does not move.' },
      { t: 'Consumers preferring bread to laptops', why: 'Preferences decide which point gets chosen. They have no effect on what the economy is capable of producing.' }
    ] },
  { id: 'sh2', home: 2, fnd: 4, type: 'mcq', short: 'Trade and the frontier',
    stem: 'A country opens to trade and ends up consuming a combination that lies outside its PPC. Has its PPC shifted?',
    opts: [
      { t: 'No — trade moves what it can consume, not what it can produce', ok: true },
      { t: 'Yes, because it now has access to more goods', why: 'Access is about consumption. The PPC is a <em>production</em> frontier, fixed by this country\'s own resources and technology.' },
      { t: 'Yes, because trade counts as a technology improvement', why: 'Trade is often described as being "like" a technology, but it does not change what the country itself can make. The distinction is graded.' },
      { t: 'No, and consuming outside the PPC is impossible anyway', why: 'It is entirely possible — that is precisely the gain from trade shown in Chapter 2. What is impossible is <em>producing</em> outside it.' }
    ] },
  { id: 'sh3', home: 2, fnd: 5, type: 'mcq', short: 'One-sided technology',
    stem: 'A breakthrough doubles laptop output per worker but does nothing for bread. What happens to the PPC?',
    opts: [
      { t: 'The laptop intercept moves out; the bread intercept stays put', ok: true },
      { t: 'The whole curve shifts out evenly', why: 'An even shift needs something that helps both goods, like more workers. A laptop-only advance tilts the curve rather than expanding it.' },
      { t: 'Nothing, until the economy decides to make more laptops', why: 'The frontier describes what is <em>possible</em>. It moves the moment the technology exists, whatever is chosen.' },
      { t: 'The bread intercept falls, since resources move to laptops', why: 'The bread intercept is what you could make devoting <em>everything</em> to bread. That capability is untouched.' }
    ] },

  { id: 'ex1', home: 3, fnd: 3, type: 'mcq', short: 'Why it bows',
    stem: 'Why is a typical PPC bowed outward rather than straight?',
    opts: [
      { t: 'Resources are not equally suited to both goods, so cost rises as you specialise', ok: true },
      { t: 'Because resources are scarce', why: 'Scarcity is why a frontier exists at all — why there is a boundary. It does not explain the boundary\'s <em>shape</em>. A straight PPC also reflects scarcity.' },
      { t: 'Because of diminishing returns to consumption', why: 'The PPC is about production. Consumer satisfaction plays no part in its shape.' },
      { t: 'Because technology improves over time', why: 'Technological change shifts the curve. The bow exists at a single moment with technology held fixed.' }
    ] },
  { id: 'ex2', home: 3, fnd: 3, type: 'mcq', short: 'A straight frontier',
    stem: 'What does a perfectly straight PPC imply?',
    opts: [
      { t: 'Constant opportunity cost — resources are equally good at both goods', ok: true },
      { t: 'There is no opportunity cost', why: 'There is: the line still slopes down, so more of one still costs some of the other. It just costs the <em>same</em> amount every time.' },
      { t: 'The economy is inefficient', why: 'Every point on any PPC, straight or bowed, is efficient. The shape says nothing about efficiency.' },
      { t: 'The two goods must be identical', why: 'They need only use resources in the same proportions, or use resources that are equally productive in both. They can be entirely different goods.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'classify', short: 'Classify each point',
    stem: 'An economy\'s PPC runs between 100 laptops and 200 loaves. Classify each combination.',
    cats: ['On the curve', 'Inside the curve', 'Outside the curve'],
    rows: [
      { t: '0 laptops and 200 loaves', cat: 'On the curve' },
      { t: '50 laptops and 40 loaves, when 173 loaves were possible', cat: 'Inside the curve' },
      { t: '100 laptops and 80 loaves', cat: 'Outside the curve' },
      { t: '100 laptops and 0 loaves', cat: 'On the curve' }
    ],
    why: 'The axis points are on the curve — complete specialisation is efficient, if usually unwise. A combination well below the attainable maximum is inside it. And 100 laptops already uses every resource, so any bread alongside them is out of reach.' },
  { id: 'q2', fnd: 2, type: 'numeric', short: 'Opportunity cost from a table',
    stem: 'Moving from (10 boats, 90 houses) to (25 boats, 60 houses), what is the opportunity cost <em>per boat</em>, in houses?',
    pre: '', answer: 2, tol: 0.01,
    why: '30 houses given up ÷ 15 extra boats = <strong>2</strong> houses per boat. Answering 30 gives the total cost rather than the per-unit cost the question asked for.' },
  { id: 'q3', fnd: 4, type: 'mcq', short: 'Movement vs shift',
    stem: 'A country shifts workers from agriculture into manufacturing. On its PPC this is:',
    opts: [
      { t: 'A movement along the existing curve', ok: true },
      { t: 'An outward shift of the curve', why: 'No new resources or technology appeared. The same workers are simply doing something else — the set of possibilities is unchanged.' },
      { t: 'An inward shift of the curve', why: 'Nothing was lost. Reallocation moves the chosen point, never the frontier.' },
      { t: 'A move from inside the curve to the curve', why: 'That would require previously idle resources. These workers were already employed, just elsewhere.' }
    ] },
  { id: 'q4', fnd: 5, type: 'mcq', short: 'Disaster on the diagram',
    stem: 'An earthquake destroys a third of a country\'s capital stock. The PPC:',
    opts: [
      { t: 'Shifts inward, so some formerly efficient points are now unattainable', ok: true },
      { t: 'Stays put, but the country produces inside it', why: 'Producing inside the curve means resources are idle. Here the resources are <em>gone</em>, which moves the frontier itself.' },
      { t: 'Becomes straighter', why: 'Losing capital reduces how much can be made; it does not make the remaining resources equally suited to both goods.' },
      { t: 'Is unaffected, since the PPC shows potential rather than actual output', why: 'Potential is exactly what fell. The frontier reflects available resources, and a third of the capital no longer exists.' }
    ] },
  { id: 'q5', fnd: 3, type: 'mcq', short: 'Where cost is lowest',
    stem: 'On a bowed-outward PPC with laptops on the horizontal axis, where is the opportunity cost of an extra laptop <em>lowest</em>?',
    opts: [
      { t: 'Near the vertical axis, where few laptops are being made', ok: true },
      { t: 'Near the horizontal axis, where many laptops are being made', why: 'That is where it is <em>highest</em> — you are conscripting the resources that are worst at making laptops and best at bread.' },
      { t: 'Exactly at the midpoint of the curve', why: 'The midpoint has an intermediate cost, not a minimum. Cost rises steadily from left to right.' },
      { t: 'It is the same everywhere, by definition', why: 'That is true of a <em>straight</em> PPC. A bowed one has cost rising as you move toward the good on the horizontal axis.' }
    ] },
  { id: 'q6', fnd: 1, type: 'mcq', short: 'Unemployment on the diagram',
    stem: 'Unemployment rises sharply. Where does the economy sit?',
    opts: [
      { t: 'Inside the curve, since usable resources are sitting idle', ok: true },
      { t: 'On the curve, at a different point', why: 'Every point on the curve uses all resources. Idle workers are by definition unused resources.' },
      { t: 'Outside the curve', why: 'Outside points are unattainable. Unemployment does not make the impossible possible.' },
      { t: 'The curve shifts inward', why: 'The workers still exist and could be re-employed tomorrow. The frontier is unchanged; the economy has merely fallen inside it.' }
    ] },
  { id: 'q7', fnd: 5, type: 'mcq', short: 'Investment and future curves',
    stem: 'A country moves along its current PPC toward more capital goods and fewer consumer goods. The likely effect on <em>next year\'s</em> PPC is:',
    opts: [
      { t: 'It shifts outward, because more capital means more resources later', ok: true },
      { t: 'No effect — moving along a curve never shifts it', why: 'True this year. But capital goods are themselves a resource next year, so today\'s choice of point changes tomorrow\'s frontier.' },
      { t: 'It shifts inward, because consumption fell', why: 'Lower consumption is the cost paid now. It reduces current welfare, not future productive capacity.' },
      { t: 'It becomes straighter', why: 'More capital expands the frontier; it does not make resources equally suited to both goods.' }
    ] },
  { id: 'q8', fnd: 4, type: 'mcq', short: 'Preferences and the frontier',
    stem: 'Consumer tastes swing strongly toward laptops. What happens to the PPC?',
    opts: [
      { t: 'Nothing — preferences choose a point, they do not change what is possible', ok: true },
      { t: 'It shifts outward in the laptop direction', why: 'Wanting more of something does not make more of it possible. Only resources and technology move the frontier.' },
      { t: 'It becomes steeper', why: 'The slope is set by the relative productivity of resources, not by what people want.' },
      { t: 'It shifts inward for bread', why: 'The bread intercept is what the economy <em>could</em> make devoting everything to bread. Nobody wanting bread does not reduce that capability.' }
    ] },
  { id: 'q9', fnd: 2, type: 'mcq', short: 'Free lunch on the diagram',
    stem: 'Which single move gets an economy more of <em>both</em> goods at no cost?',
    opts: [
      { t: 'Moving from a point inside the curve onto the curve', ok: true },
      { t: 'Moving along the curve toward the laptop axis', why: 'Along the curve, more laptops always costs bread. That is what the downward slope means.' },
      { t: 'Choosing the midpoint of the curve', why: 'The midpoint is one efficient point among many. Arriving there from another point on the curve still involves a trade-off.' },
      { t: 'No move ever can — scarcity forbids it', why: 'Scarcity makes the <em>frontier</em> binding, but an economy sitting inside it has slack. Eliminating waste really is a free lunch, and it is the only one in the course.' }
    ] },
  { id: 'q10', fnd: 3, type: 'mcq', short: 'Linking back to trade',
    stem: 'Chapter 2\'s comparative-advantage tables assumed each country\'s opportunity cost was the same at every output level. On a PPC that assumption looks like:',
    opts: [
      { t: 'A straight-line frontier', ok: true },
      { t: 'A bowed-outward frontier', why: 'A bow means the cost changes as you specialise. The constant-cost tables in Chapter 2 correspond to a straight line.' },
      { t: 'A frontier that shifts outward over time', why: 'That is growth, which is about different years rather than different points in one year.' },
      { t: 'A point inside the frontier', why: 'Inside points are about waste. The assumption concerns the <em>shape</em> of the boundary, not where production sits.' }
    ] }
];
