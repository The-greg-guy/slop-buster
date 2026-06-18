#!/usr/bin/env node
// detection.mjs
// URL-based detection using Playwright.
// Usage: node detection.mjs <url>
// Output: JSON to stdout.

import { chromium } from 'playwright';
import { CHECKS } from './checks.mjs';
import { score } from './score.mjs';

export async function detectUrl(url) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    const ctx = { page };
    const triggeredIds = [];

    for (const check of CHECKS) {
      try {
        const result = await check.run(ctx);
        if (result) triggeredIds.push(check.id);
      } catch (err) {
        // Check failed, skip it
        process.stderr.write(`Check ${check.id} failed: ${err.message}\n`);
      }
    }

    return score(triggeredIds);
  } finally {
    await browser.close();
  }
}

// CLI entry point when run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2];
  if (!url) {
    process.stderr.write('Usage: node detection.mjs <url>\n');
    process.exit(1);
  }
  detectUrl(url)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      process.stderr.write(`Error: ${err.message}\n`);
      process.exit(1);
    });
}
