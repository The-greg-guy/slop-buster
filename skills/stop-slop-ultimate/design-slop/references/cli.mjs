#!/usr/bin/env node
// cli.mjs
// Entry point for stop-slop-pro detection.
// Usage:
//   node cli.mjs detect <url>           Run Playwright-based detection on a URL.
//   node cli.mjs detect-files <path>    Run static detection on HTML/CSS files.
//   node cli.mjs list                   List all checks.
// Output: JSON to stdout. Human-readable summary to stderr.

import { CHECKS } from './checks.mjs';
import { formatReport } from './score.mjs';
import { detectUrl } from './detection.mjs';
import { detectFiles } from './detection-files.mjs';

const command = process.argv[2];
const target = process.argv[3];

function printHelp() {
  const help = [
    'Stop Slop Pro Detection',
    '',
    'Usage:',
    '  node cli.mjs detect <url>         Run detection on a live URL using Playwright.',
    '  node cli.mjs detect-files <path>  Run static detection on HTML/CSS/JSX/TSX/Vue/Svelte files.',
    '  node cli.mjs list                 List all available checks.',
    '  node cli.mjs help                 Show this help.',
    '',
    'Output: JSON to stdout. Human-readable summary to stderr.',
    '',
    'Dependencies:',
    '  detect mode requires playwright: npm install playwright && npx playwright install chromium',
    '  detect-files mode: no dependencies required.',
  ];
  process.stderr.write(help.join('\n') + '\n');
}

function listChecks() {
  process.stdout.write(JSON.stringify({
    total: CHECKS.length,
    checks: CHECKS.map(c => ({ id: c.id, weight: c.weight, description: c.description })),
  }, null, 2) + '\n');
}

async function main() {
  switch (command) {
    case 'detect': {
      if (!target) {
        process.stderr.write('Error: URL required. Usage: node cli.mjs detect <url>\n');
        process.exit(1);
      }
      try {
        const result = await detectUrl(target);
        console.log(JSON.stringify(result, null, 2));
        process.stderr.write('\n' + formatReport(result) + '\n');
      } catch (err) {
        process.stderr.write(`Error: ${err.message}\n`);
        process.stderr.write('Make sure playwright is installed: npm install playwright && npx playwright install chromium\n');
        process.exit(1);
      }
      break;
    }
    case 'detect-files': {
      if (!target) {
        process.stderr.write('Error: path required. Usage: node cli.mjs detect-files <path>\n');
        process.exit(1);
      }
      try {
        const result = detectFiles(target);
        console.log(JSON.stringify(result, null, 2));
        process.stderr.write('\n' + formatReport(result) + '\n');
      } catch (err) {
        process.stderr.write(`Error: ${err.message}\n`);
        process.exit(1);
      }
      break;
    }
    case 'list':
      listChecks();
      break;
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;
    default:
      printHelp();
      process.exit(1);
  }
}

main();
