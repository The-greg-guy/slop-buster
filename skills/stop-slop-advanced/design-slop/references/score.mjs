// score.mjs
// Takes a list of triggered checks. Returns { score, tier, triggered, total, weightedTotal }.

import { CHECKS, TOTAL_CHECKS } from './checks.mjs';

export function score(triggeredIds) {
  const triggeredSet = new Set(triggeredIds);
  let weightedFlagged = 0;
  let weightedTotal = 0;
  const triggered = [];

  for (const check of CHECKS) {
    weightedTotal += check.weight;
    if (triggeredSet.has(check.id)) {
      weightedFlagged += check.weight;
      triggered.push({
        id: check.id,
        weight: check.weight,
        description: check.description,
      });
    }
  }

  // Score is 0-100 where 100 = max slop. We invert so 100 = clean.
  const slopRatio = weightedTotal > 0 ? weightedFlagged / weightedTotal : 0;
  const score = Math.round((1 - slopRatio) * 100);

  let tier;
  if (triggeredSet.size <= 2) tier = 'clean';
  else if (triggeredSet.size <= 5) tier = 'mild';
  else if (triggeredSet.size <= 8) tier = 'heavy';
  else tier = 'maximum';

  let verdict;
  if (score >= 70 && triggeredSet.size <= 2) verdict = 'ship';
  else if (score >= 50 || triggeredSet.size <= 5) verdict = 'revise';
  else verdict = 'redesign';

  return {
    score,
    tier,
    verdict,
    triggered,
    triggeredCount: triggeredSet.size,
    totalChecks: TOTAL_CHECKS,
    weightedTotal,
    weightedFlagged,
  };
}

export function formatReport(result) {
  const lines = [];
  lines.push(`Score: ${result.score}/100 · Tier: ${result.tier}`);
  lines.push(`Triggered: ${result.triggeredCount}/${result.totalChecks} patterns (weighted ${result.weightedFlagged}/${result.weightedTotal})`);
  if (result.triggered.length > 0) {
    lines.push('');
    lines.push('Patterns:');
    for (const t of result.triggered) {
      lines.push(`  [${t.weight}x] ${t.id}: ${t.description}`);
    }
  }
  lines.push('');
  lines.push(`Verdict: ${result.verdict}`);
  return lines.join('\n');
}
