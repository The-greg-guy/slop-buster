#!/usr/bin/env node
// detection-files.mjs
// Static file detection. No browser required.
// Usage: node detection-files.mjs <path-to-file-or-directory>
// Output: JSON to stdout.

import { readFileSync, statSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { CHECKS } from './checks.mjs';
import { score } from './score.mjs';

export function collectFiles(targetPath) {
  const stat = statSync(targetPath);
  if (stat.isFile()) return [targetPath];
  if (stat.isDirectory()) {
    return readdirSync(targetPath, { recursive: true })
      .filter(f => /\.(html|htm|css|jsx|tsx|vue|svelte)$/.test(f))
      .map(f => join(targetPath, f));
  }
  return [];
}

export function readFiles(paths) {
  return paths.map(path => {
    const content = readFileSync(path, 'utf8');
    const ext = extname(path).slice(1);
    // Split HTML and CSS
    let html = '';
    let css = '';
    if (ext === 'css') {
      css = content;
    } else if (ext === 'html' || ext === 'htm') {
      html = content;
      // Extract <style> blocks
      const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
      css += styleMatches.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n');
      // Extract inline styles
      const styleAttrs = content.match(/style="([^"]+)"/gi) || [];
      css += '\n' + styleAttrs.map(s => `{${s.replace(/style="/i, '').replace(/"$/, '')}}`).join('\n');
    } else {
      // JSX, TSX, Vue, Svelte: treat as HTML for our purposes
      html = content;
      const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) || [];
      css += styleMatches.map(s => s.replace(/<\/?style[^>]*>/gi, '')).join('\n');
    }
    return { path, html, css };
  });
}

export function detectFiles(targetPath) {
  const paths = collectFiles(targetPath);
  if (paths.length === 0) {
    throw new Error(`No HTML, CSS, JSX, TSX, Vue, or Svelte files found at ${targetPath}`);
  }

  const files = readFiles(paths);
  const ctx = { files };
  const triggeredIds = [];

  for (const check of CHECKS) {
    try {
      const result = check.run(ctx);
      if (result) triggeredIds.push(check.id);
    } catch (err) {
      process.stderr.write(`Check ${check.id} failed: ${err.message}\n`);
    }
  }

  return { ...score(triggeredIds), filesScanned: paths };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const targetPath = process.argv[2];
  if (!targetPath) {
    process.stderr.write('Usage: node detection-files.mjs <path-to-file-or-directory>\n');
    process.exit(1);
  }
  try {
    const result = detectFiles(targetPath);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    process.stderr.write(`Error: ${err.message}\n`);
    process.exit(1);
  }
}
