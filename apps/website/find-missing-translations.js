#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script to find content.ts files that don't contain translations for a specified language code.
 * Usage: `node find-missing-translations.js <language_code>`
 * Example: `node find-missing-translations.js tr`
 */

function findContentFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith('.') &&
      item !== 'node_modules'
    ) {
      findContentFiles(fullPath, files);
    } else if (stat.isFile() && item.endsWith('.content.ts')) {
      files.push(fullPath);
    }
  }

  return files;
}

function checkTranslations(filePath, languageCode) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // More flexible pattern matching for translations
    const patterns = [
      `${languageCode}:`,
      `${languageCode} :`,
      `"${languageCode}"`,
      `'${languageCode}'`,
      `${languageCode}: `,
      ` ${languageCode}:`,
    ];
    return patterns.some((pattern) => content.includes(pattern));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return false;
  }
}

function main() {
  // Get language code from command line arguments or prompt user
  let languageCode = process.argv[2];

  if (!languageCode) {
    console.log(
      '🔍 Specify language code (e.g.: tr, en, fr, es, de, ja, ko, zh, it, pt, hi, ar, ru)'
    );
    console.log('Usage: node find-missing-translations.js <language_code>');
    console.log('Example: node find-missing-translations.js tr');
    console.log('');

    // For now, default to Turkish if no argument provided
    languageCode = 'tr';
    console.log(
      `ℹ️  Since no language code was specified, defaulting to "${languageCode}".\n`
    );
  }

  const rootDir = path.resolve(__dirname, '../../'); // Go up to monorepo root
  console.log(
    `🔍 Searching for content.ts files with "${languageCode}" translations...\n`
  );

  const contentFiles = findContentFiles(rootDir);
  console.log(`📁 Found ${contentFiles.length} content.ts files\n`);

  const filesWithoutTranslation = [];
  const filesWithTranslation = [];

  for (const file of contentFiles) {
    const relativePath = path.relative(rootDir, file);
    if (checkTranslations(file, languageCode)) {
      filesWithTranslation.push(relativePath);
    } else {
      filesWithoutTranslation.push(relativePath);
    }
  }

  console.log(
    `✅ Files WITH "${languageCode}" translation:`,
    filesWithTranslation.length
  );
  console.log(
    `❌ Files WITHOUT "${languageCode}" translation:`,
    filesWithoutTranslation.length
  );
  console.log('');

  if (filesWithoutTranslation.length > 0) {
    console.log(`📋 Files missing "${languageCode}" translation:`);
    filesWithoutTranslation.forEach((file) => {
      console.log(`  - ${file}`);
    });
  } else {
    console.log(`🎉 All content.ts files have "${languageCode}" translation!`);
  }

  console.log('');
  console.log('💡 To add translation, find t() calls and add:');
  console.log(`   ${languageCode}: "Add ${languageCode} translation here"`);
}

if (require.main === module) {
  main();
}

module.exports = { findContentFiles, checkTranslations };
