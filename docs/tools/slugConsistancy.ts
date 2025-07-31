import fg from 'fast-glob';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { EXCLUDED_GLOB_PATTEN } from './markdownFormatting';

interface SlugConsistencyResult {
  totalFiles: number;
  filesWithSlugMismatches: number;
  mismatches: Array<{
    englishFile: string;
    mismatchedFile: string;
    englishSlugs: string[];
    mismatchedSlugs: string[];
  }>;
}

const extractSlugsFromFrontmatter = (content: string): string[] | null => {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const frontmatterMatch = content.match(frontmatterPattern);

  if (!frontmatterMatch) {
    return null;
  }

  const frontmatterContent = frontmatterMatch[1];

  // Extract slugs array using a more robust pattern
  const slugsMatch = frontmatterContent.match(/slugs:\s*\n((?:\s*-\s*.+\n?)*)/);

  if (!slugsMatch) {
    return [];
  }

  const slugsSection = slugsMatch[1];
  const slugs = slugsSection
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line) => line.substring(1).trim())
    .filter((slug) => slug.length > 0);

  return slugs;
};

export const runSlugConsistencyTest = (): SlugConsistencyResult => {
  console.info('Running Slug Consistency Test...\n');

  // Debug: Check current working directory
  console.info('Current working directory:', process.cwd());

  const languageDirs = [
    'ar',
    'de',
    'en-GB',
    'es',
    'fr',
    'hi',
    'it',
    'ja',
    'ko',
    'pt',
    'ru',
    'zh',
  ];
  const englishDocsPattern = 'docs/en/**/*.md';
  const englishBlogPattern = 'blog/en/**/*.md';
  const englishFrequentQuestionsPattern = 'frequent_questions/en/**/*.md';
  const englishLegalPattern = 'legal/en/**/*.md';
  const mismatches: SlugConsistencyResult['mismatches'] = [];
  let totalFiles = 0;
  let filesWithSlugMismatches = 0;

  // Find all English docs files
  const englishFiles = fg.sync(
    [
      englishDocsPattern,
      englishBlogPattern,
      englishFrequentQuestionsPattern,
      englishLegalPattern,
    ],
    {
      ignore: EXCLUDED_GLOB_PATTEN,
    }
  );

  console.info(`Found ${englishFiles.length} English files to check`);

  // Debug: Show first few files found
  if (englishFiles.length > 0) {
    console.info('First few files found:');
    englishFiles.slice(0, 5).forEach((file) => console.info('  -', file));
  } else {
    console.info('No files found - debugging...');
    // Try without ignore patterns
    const filesWithoutIgnore = fg.sync([
      englishDocsPattern,
      englishBlogPattern,
      englishFrequentQuestionsPattern,
      englishLegalPattern,
    ]);
    console.info(
      `Files found without ignore patterns: ${filesWithoutIgnore.length}`
    );
    if (filesWithoutIgnore.length > 0) {
      console.info('First few files without ignore:');
      filesWithoutIgnore
        .slice(0, 5)
        .forEach((file) => console.info('  -', file));
    }
  }

  englishFiles.forEach((englishFilePath: string) => {
    totalFiles++;

    // Read English file content
    if (!existsSync(join(process.cwd(), englishFilePath))) {
      console.log(`⚠️  English file not found: ${englishFilePath}`);
      return;
    }

    const englishContent = readFileSync(
      join(process.cwd(), englishFilePath),
      'utf-8'
    );
    const englishSlugs = extractSlugsFromFrontmatter(englishContent);

    if (englishSlugs === null) {
      console.log(
        `⚠️  No frontmatter found in English file: ${englishFilePath}`
      );
      return;
    }

    // Check corresponding files in other languages
    languageDirs.forEach((langCode) => {
      let correspondingFilePath: string;

      // Handle different directory structures
      if (englishFilePath.startsWith('docs/en/')) {
        correspondingFilePath = englishFilePath.replace(
          'docs/en/',
          `docs/${langCode}/`
        );
      } else if (englishFilePath.startsWith('blog/en/')) {
        correspondingFilePath = englishFilePath.replace(
          'blog/en/',
          `blog/${langCode}/`
        );
      } else if (englishFilePath.startsWith('frequent_questions/en/')) {
        correspondingFilePath = englishFilePath.replace(
          'frequent_questions/en/',
          `frequent_questions/${langCode}/`
        );
      } else if (englishFilePath.startsWith('legal/en/')) {
        correspondingFilePath = englishFilePath.replace(
          'legal/en/',
          `legal/${langCode}/`
        );
      } else {
        console.log(`⚠️  Unknown file path pattern: ${englishFilePath}`);
        return;
      }

      if (!existsSync(join(process.cwd(), correspondingFilePath))) {
        console.log(
          `⚠️  Missing file for ${langCode}: ${correspondingFilePath}`
        );
        return;
      }

      const correspondingContent = readFileSync(
        join(process.cwd(), correspondingFilePath),
        'utf-8'
      );
      const correspondingSlugs =
        extractSlugsFromFrontmatter(correspondingContent);

      if (correspondingSlugs === null) {
        console.log(
          `⚠️  No frontmatter found in ${langCode} file: ${correspondingFilePath}`
        );
        return;
      }

      // Compare slugs
      const slugsMatch =
        englishSlugs.length === correspondingSlugs.length &&
        englishSlugs.every((slug, index) => slug === correspondingSlugs[index]);

      if (!slugsMatch) {
        mismatches.push({
          englishFile: englishFilePath,
          mismatchedFile: correspondingFilePath,
          englishSlugs,
          mismatchedSlugs: correspondingSlugs,
        });

        console.log(`❌ Slug mismatch found:`);
        console.log(`   English file: ${englishFilePath}`);
        console.log(`   ${langCode} file: ${correspondingFilePath}`);
        console.log(`   English slugs: [${englishSlugs.join(', ')}]`);
        console.log(`   ${langCode} slugs: [${correspondingSlugs.join(', ')}]`);
        console.log('');
      }
    });
  });

  // Count unique files with mismatches
  const uniqueFilesWithMismatches = new Set(
    mismatches.map((m) => m.englishFile)
  );
  filesWithSlugMismatches = uniqueFilesWithMismatches.size;

  // Summary
  console.log('📊 Slug Consistency Test Summary:');
  console.log(`   Total English files checked: ${totalFiles}`);
  console.log(`   Files with slug mismatches: ${filesWithSlugMismatches}`);
  console.log(`   Total mismatches found: ${mismatches.length}`);

  if (mismatches.length > 0) {
    console.log('\n❌ Slug consistency test failed due to mismatches.');
  } else {
    console.log('\n✅ All slugs are consistent across language versions!');
  }

  return {
    totalFiles,
    filesWithSlugMismatches,
    mismatches,
  };
};
