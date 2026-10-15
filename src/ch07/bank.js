var FND = ['The tax wedge', 'Statutory vs economic', 'Incidence & elasticity', 'Tax revenue', 'Deadweight loss'];

var BANK = [
  { id: 'tw1', home: 1, fnd: 1, type: 'mcq', short: 'What a tax does to price',
    stem: 'A $4 per-unit tax is imposed on a competitive market. Which is true?',
    opts: [
      { t: 'Buyers pay more than before and sellers keep less, with the two separated by $4', ok: true },
      { t: 'The price rises by exactly $4 and sellers are unaffected', why: 'That happens only when demand is perfectly inelastic. In general the price buyers pay rises by <em>less</em> than the tax, with the rest coming out of what sellers keep.' },
      { t: 'Sellers absorb the whole $4 and the buyer price is unchanged', why: 'That is the perfectly elastic demand case, not the general one. Usually both sides move.' },
      { t: 'The price is unchanged; only quantity falls', why: 'If no price moved, nobody would be paying the tax. The wedge between the two prices <em>is</em> the tax.' }
    ] },
  { id: 'tw2', home: 1, fnd: 2, type: 'mcq', short: 'Who writes the cheque',
    stem: 'A government moves a payroll tax from employers to employees, leaving the rate unchanged. The economic burden:',
    opts: [
      { t: 'Does not change — statutory incidence does not determine who bears the tax', ok: true },
      { t: 'Shifts entirely onto employees', why: 'The legal side changed, but the burden is decided by relative elasticities of labour supply and demand, which the law did not touch.' },
      { t: 'Shifts entirely onto employers', why: 'Reversed, and wrong for the same reason: who remits the tax is not who bears it.' },
      { t: 'Depends on which side is larger in number', why: 'Numbers do not decide incidence. Responsiveness does — the side that can more easily walk away bears less.' }
    ] },
  { id: 'tw3', home: 1, fnd: 3, type: 'mcq', short: 'Who bears more',
    stem: 'Demand for a good is highly inelastic and supply is highly elastic. A per-unit tax falls mainly on:',
    opts: [
      { t: 'Buyers, because they have nowhere else to go', ok: true },
      { t: 'Sellers, because they are more responsive', why: 'Responsiveness is exactly what lets them <em>escape</em> the tax. The elastic side shifts the burden onto the inelastic one.' },
      { t: 'Both equally, since the tax is per unit', why: 'An equal split happens only when the two elasticities match. Here they are deliberately very different.' },
      { t: 'The government, which collects it', why: 'The government receives the revenue; it does not bear a burden. Burdens fall on buyers and sellers through the prices they face.' }
    ] },

  { id: 'rv1', home: 2, fnd: 4, type: 'numeric', short: 'Computing revenue',
    stem: 'A $5 per-unit tax reduces the quantity traded from 70 to 58 units. What is the government\'s tax revenue?',
    pre: '$', answer: 290, tol: 0,
    why: 'Revenue = tax × the <strong>new</strong> quantity = $5 × 58 = <strong>$290</strong>. Using the pre-tax 70 gives $350 and overstates it — the tax itself shrank the market, and only units that actually trade are taxed.' },
  { id: 'rv2', home: 2, fnd: 5, type: 'numeric', short: 'Computing DWL',
    stem: 'Same tax: $5 per unit, quantity falling from 70 to 58. What is the deadweight loss?',
    pre: '$', answer: 30, tol: 0,
    why: '½ × tax × units lost = ½ × $5 × 12 = <strong>$30</strong>. Note how much smaller this is than the $290 of revenue — revenue is a transfer to the government, while only this $30 is destroyed outright.' },
  { id: 'rv3', home: 2, fnd: 5, type: 'mcq', short: 'Elasticity and damage',
    stem: 'A per-unit tax of the same size creates a <em>larger</em> deadweight loss when:',
    opts: [
      { t: 'Both curves are more elastic, so quantity falls further', ok: true },
      { t: 'Both curves are more inelastic', why: 'Inelastic curves mean quantity barely falls, so few trades are lost. A tax on a perfectly inelastic good has <em>zero</em> deadweight loss.' },
      { t: 'The tax is levied on sellers rather than buyers', why: 'The statutory side changes nothing at all, including the deadweight loss.' },
      { t: 'The government spends the revenue badly', why: 'How revenue is spent is a separate question. Deadweight loss arises from the trades the tax prevented.' }
    ] },

  { id: 'ex1', home: 3, fnd: 4, type: 'mcq', short: 'Revenue is not a loss',
    stem: 'Why is tax revenue not counted as part of the deadweight loss?',
    opts: [
      { t: 'It is a transfer — someone still has it, namely the government', ok: true },
      { t: 'Because governments spend it efficiently', why: 'Efficiency of spending is irrelevant and unproven. The point is simply that the money still exists in someone\'s hands.' },
      { t: 'Because it is returned to buyers and sellers', why: 'It need not be returned to anyone in particular. It counts as a transfer regardless of where it goes.' },
      { t: 'It is counted as a loss, along with the triangle', why: 'This is the error the question is testing. Deadweight loss is only the surplus that exists nowhere.' }
    ] },
  { id: 'ex2', home: 3, fnd: 3, type: 'mcq', short: 'Subsidies',
    stem: 'A per-unit subsidy is introduced in a competitive market. Which is true?',
    opts: [
      { t: 'Quantity rises above the efficient level, so there is still a deadweight loss', ok: true },
      { t: 'There is no deadweight loss, because everyone gains', why: 'Buyers and sellers both gain, but the extra units cost more to produce than anyone values them at. That overshoot is a real loss.' },
      { t: 'Sellers receive less than buyers pay', why: 'That is a <em>tax</em>. A subsidy works the other way: sellers receive more than buyers pay, with the government covering the gap.' },
      { t: 'The benefit always lands on buyers', why: 'Like a tax burden, a subsidy\'s benefit lands mostly on the less elastic side — which may be either one.' }
    ] }
];

var QUIZ = [
  { id: 'q1', fnd: 1, type: 'numeric', short: 'Burden split',
    stem: 'Before a tax the price is $20. After a $6 per-unit tax, buyers pay $24. How much of the tax do <em>sellers</em> bear per unit?',
    pre: '$', answer: 2, tol: 0,
    why: 'Buyers bear $24 − $20 = $4. The two burdens must sum to the tax, so sellers bear $6 − $4 = <strong>$2</strong> (they now keep $18). Measure both against the <em>original</em> $20, not against each other.' },
  { id: 'q2', fnd: 2, type: 'mcq', short: 'Legal side is irrelevant',
    stem: 'A politician proposes taxing oil companies rather than drivers "so that ordinary people don\'t pay." An economist\'s reply is:',
    opts: [
      { t: 'The split depends on elasticities, not on who the law names', ok: true },
      { t: 'Correct — taxing firms protects consumers', why: 'This is precisely the error. Firms pass the burden on to whichever side is less able to walk away, regardless of the statute.' },
      { t: 'Wrong — taxing firms always falls entirely on consumers', why: 'Overcorrecting. It falls <em>mostly</em> on consumers only when demand is relatively inelastic; the general answer is "it depends on elasticities."' },
      { t: 'The tax will have no effect at all', why: 'It certainly has effects: both prices move, quantity falls, and surplus is destroyed. What it cannot do is let the law choose who pays.' }
    ] },
  { id: 'q3', fnd: 3, type: 'mcq', short: 'Cigarettes',
    stem: 'Cigarette taxes are large, and most of the burden falls on smokers. The best explanation is:',
    opts: [
      { t: 'Demand is highly inelastic, so buyers cannot escape the tax', ok: true },
      { t: 'The tax is legally levied on consumers', why: 'In most places it is levied on manufacturers or distributors. The burden lands on smokers because of their inelastic demand.' },
      { t: 'Cigarettes have many close substitutes', why: 'Many substitutes would make demand <em>elastic</em> and push the burden onto sellers. The opposite is true here.' },
      { t: 'Supply is perfectly inelastic', why: 'Perfectly inelastic supply would put the burden on <em>sellers</em>. The inelastic side here is demand.' }
    ] },
  { id: 'q4', fnd: 5, type: 'mcq', short: 'Zero deadweight loss',
    stem: 'For which good does a per-unit tax create the <em>least</em> deadweight loss?',
    opts: [
      { t: 'One with perfectly inelastic demand', ok: true },
      { t: 'One with perfectly elastic demand', why: 'Perfectly elastic demand means quantity collapses when the price rises, so the lost trades — and the deadweight loss — are as large as possible.' },
      { t: 'One with many close substitutes', why: 'Many substitutes make demand elastic, so buyers switch away and many trades are lost.' },
      { t: 'One where supply is highly elastic', why: 'Elastic supply also means quantity responds strongly, which enlarges the triangle.' }
    ] },
  { id: 'q5', fnd: 4, type: 'mcq', short: 'Doubling the tax',
    stem: 'A government doubles a per-unit tax. Roughly what happens?',
    opts: [
      { t: 'Deadweight loss roughly quadruples while revenue less than doubles', ok: true },
      { t: 'Both revenue and deadweight loss double', why: 'Revenue grows more slowly than the rate because quantity falls, and deadweight loss grows faster because both the wedge and the lost quantity grow.' },
      { t: 'Revenue doubles and deadweight loss is unchanged', why: 'Deadweight loss depends directly on the size of the tax and on the quantity it destroys — both of which just rose.' },
      { t: 'Revenue quadruples', why: 'Revenue is tax × quantity, and quantity falls as the tax rises. It can even decline outright past the revenue-maximising rate.' }
    ] },
  { id: 'q6', fnd: 1, type: 'classify', short: 'Transfer or destroyed',
    stem: 'After a per-unit tax, classify each amount.',
    cats: ['Transferred', 'Destroyed'],
    rows: [
      { t: 'The revenue the government collects', cat: 'Transferred' },
      { t: 'The surplus on units no longer traded', cat: 'Destroyed' },
      { t: 'The extra amount buyers pay on units still traded', cat: 'Transferred' },
      { t: 'The surplus of a buyer priced out of the market entirely', cat: 'Destroyed' }
    ],
    why: 'Anything that someone still holds is a transfer, even if it moved to the government. Only surplus attached to trades that <em>stopped happening</em> is destroyed — nobody receives it, which is why it is the measure of the tax\'s true cost.' },
  { id: 'q7', fnd: 3, type: 'mcq', short: 'Equal elasticities',
    stem: 'Demand and supply are equally elastic at the equilibrium. A $10 tax is imposed. Buyers bear:',
    opts: [
      { t: '$5', ok: true },
      { t: '$10, since buyers always pay', why: 'Buyers bear the whole tax only when demand is perfectly inelastic. With equal elasticities the burden splits evenly.' },
      { t: '$0, since the tax is on sellers', why: 'The statutory side does not determine the burden, and in any case the question gives equal elasticities.' },
      { t: 'It cannot be determined', why: 'It can: equal elasticities give an equal split, which is the clean benchmark case.' }
    ] },
  { id: 'q8', fnd: 4, type: 'mcq', short: 'Revenue falling',
    stem: 'A government raises a tax rate and collects <em>less</em> revenue. This means:',
    opts: [
      { t: 'The market shrank enough that the smaller base outweighed the higher rate', ok: true },
      { t: 'The tax must have been levied on the wrong side', why: 'Which side is levied has no effect on quantity, and therefore none on revenue.' },
      { t: 'This is impossible — higher rates always raise more', why: 'Revenue is tax × quantity, and quantity falls as the tax rises. Past a point the second effect wins.' },
      { t: 'Deadweight loss must have fallen too', why: 'Deadweight loss keeps rising with the tax even after revenue turns down — which is the worst region to be in.' }
    ] },
  { id: 'q9', fnd: 5, type: 'mcq', short: 'Where DWL comes from',
    stem: 'The deadweight loss of a tax exists because:',
    opts: [
      { t: 'Trades whose value exceeded their cost no longer happen', ok: true },
      { t: 'Buyers pay a higher price', why: 'The higher price mostly transfers surplus to the government. The loss comes from the trades that stop, not from the price on trades that continue.' },
      { t: 'The government spends inefficiently', why: 'Deadweight loss is calculated on the market diagram alone, with no assumption about spending.' },
      { t: 'Sellers earn lower profits', why: 'Lower seller surplus is partly a transfer. Only the portion attached to vanished trades is deadweight loss.' }
    ] },
  { id: 'q10', fnd: 2, type: 'mcq', short: 'Tying the course together',
    stem: 'Price controls and taxes both reduce total surplus. The key difference in <em>where the surplus goes</em> is:',
    opts: [
      { t: 'A tax transfers some surplus to the government; a price control transfers it between buyers and sellers', ok: true },
      { t: 'Only taxes create deadweight loss', why: 'Both do, because both prevent mutually beneficial trades. The difference is who receives the transferred portion.' },
      { t: 'Only price controls change the quantity traded', why: 'Both reduce the quantity traded — that reduction is exactly what creates the deadweight loss in each case.' },
      { t: 'Price controls raise revenue for the government', why: 'A price control collects nothing. That is the distinguishing feature of a tax.' }
    ] }
];
