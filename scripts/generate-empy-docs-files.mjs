#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to generate empty .md files for a new language by copying the structure from 'en'
 * Usage: node generate-empty-docs-files.mjs <language_code>
 * Example: node generate-empty-docs-files.mjs kz
 */

const baseDirs = ['docs', 'blog', 'frequent_questions', 'legal'];

function findMdFiles(dir, files = [], basePath = dir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      findMdFiles(fullPath, files, basePath);
    } else if (stat.isFile() && item.endsWith('.md')) {
      const relativePath = path.relative(basePath, fullPath);
      files.push(relativePath);
    }
  }

  return files;
}

function createEmptyMdFile(targetPath, sourcePath) {
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create empty file or copy basic structure
  const content = `---
title: ""
description: ""
---

`; // Empty frontmatter

  fs.writeFileSync(targetPath, content, 'utf8');
}

function main() {
  const languageCode = process.argv[2];

  if (!languageCode) {
    console.log('🔍 Please specify a language code (e.g., kz, uz, etc.)');
    console.log('Usage: node generate-empty-docs-files.mjs <language_code>');
    console.log('Example: node generate-empty-docs-files.mjs kz');
    process.exit(1);
  }

  const docsRoot = path.resolve(__dirname, '../docs');

  console.log(`🔄 Generating empty .md files for language: ${languageCode}\n`);

  for (const baseDir of baseDirs) {
    const enDir = path.join(docsRoot, baseDir, 'en');
    const newLangDir = path.join(docsRoot, baseDir, languageCode);

    if (!fs.existsSync(enDir)) {
      console.log(`⚠️  Skipping ${baseDir}: 'en' directory not found`);
      continue;
    }

    console.log(`📁 Processing ${baseDir}...`);

    const mdFiles = findMdFiles(enDir);

    if (mdFiles.length === 0) {
      console.log(`   No .md files found in ${enDir}`);
      continue;
    }

    for (const mdFile of mdFiles) {
      const sourcePath = path.join(enDir, mdFile);
      const targetPath = path.join(newLangDir, mdFile);

      createEmptyMdFile(targetPath, sourcePath);
      console.log(`   ✅ Created: ${path.relative(docsRoot, targetPath)}`);
    }

    console.log(`   📊 Created ${mdFiles.length} files in ${baseDir}/${languageCode}\n`);
  }

  console.log(`🎉 Finished generating empty .md files for ${languageCode}`);
  console.log('💡 You can now fill these files with translations from the English versions.');
}

main();
