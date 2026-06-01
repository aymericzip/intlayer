import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const url = process.argv[2];

if (!url) {
  console.error('Usage: bun ./testpageSize.ts <url>');
  process.exit(1);
}

const BASELINE_PATH = './.chunk-baseline.json';

const formatKB = (bytes: number) => (bytes / 1024).toFixed(2) + ' KB';

async function analyze() {
  console.log(`Fetching ${url}...\n`);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  const html = await res.text();

  // Universal regex: catches scripts and module preloads (.js, .mjs, .ts, .tsx)
  const fileRegex = /(?:src|href)=["']([^"']+\.(?:js|mjs|ts|tsx|jsx))["']/gi;
  const uniqueChunks = new Set<string>();

  for (const match of html.matchAll(fileRegex)) {
    uniqueChunks.add(match[1]);
  }

  if (uniqueChunks.size === 0) {
    console.log('No JavaScript files found in the HTML source.');
    return;
  }

  const currentStats: Record<string, { raw: number; gzip: number }> = {};

  // Fetch chunks
  for (const chunkPath of uniqueChunks) {
    try {
      // Safely construct absolute URL from relative paths
      const chunkUrl = new URL(chunkPath, url).href;
      const chunkRes = await fetch(chunkUrl);
      if (!chunkRes.ok) continue;

      const buffer = await chunkRes.arrayBuffer();
      currentStats[chunkPath] = {
        raw: buffer.byteLength,
        gzip: gzipSync(new Uint8Array(buffer)).byteLength,
      };
    } catch (e) {}
  }

  // Load baseline
  let baselineStats: Record<string, { raw: number; gzip: number }> = {};
  if (existsSync(BASELINE_PATH)) {
    baselineStats = JSON.parse(readFileSync(BASELINE_PATH, 'utf-8'));
  }

  // Sort chunks by Raw Size descending
  const sortedChunks = Object.entries(currentStats).sort(
    (a, b) => b[1].raw - a[1].raw
  );

  const headers = [
    '',
    'File',
    'Raw Size',
    'Gzip Size',
    'Raw Diff',
    'Gzip Diff',
  ];
  const rows: string[][] = [];

  // Build rows
  sortedChunks.forEach(([file, stats], index) => {
    const baseline = baselineStats[file];
    let rawDiff = '+ New File';
    let gzipDiff = '+ New File';

    if (baseline) {
      const rDiff = stats.raw - baseline.raw;
      const gDiff = stats.gzip - baseline.gzip;

      const formatDiff = (diff: number) => {
        if (diff === 0) return '=';
        const sign = diff > 0 ? '+' : '';
        return `${sign}${formatKB(diff)}`;
      };

      rawDiff = formatDiff(rDiff);
      gzipDiff = formatDiff(gDiff);
    }

    rows.push([
      String(index),
      file,
      formatKB(stats.raw),
      formatKB(stats.gzip),
      rawDiff,
      gzipDiff,
    ]);
  });

  // Calculate column widths for the table
  const colWidths = headers.map((h, i) => {
    return Math.max(h.length, ...rows.map((r) => r[i].length));
  });

  // Table formatting helpers
  const formatRow = (row: string[]) => {
    return (
      '│ ' +
      row
        .map((cell, i) => {
          return i === 0
            ? cell.padStart(colWidths[i])
            : cell.padEnd(colWidths[i]);
        })
        .join(' │ ') +
      ' │'
    );
  };

  const borderTop =
    '┌─' + colWidths.map((w) => '─'.repeat(w)).join('─┬─') + '─┐';
  const borderMid =
    '├─' + colWidths.map((w) => '─'.repeat(w)).join('─┼─') + '─┤';
  const borderBot =
    '└─' + colWidths.map((w) => '─'.repeat(w)).join('─┴─') + '─┘';

  // Print table
  console.log(borderTop);
  console.log(formatRow(headers));
  console.log(borderMid);
  rows.forEach((row) => console.log(formatRow(row)));
  console.log(borderBot);

  // Save baseline
  writeFileSync(BASELINE_PATH, JSON.stringify(currentStats, null, 2));
}

analyze().catch(console.error);
