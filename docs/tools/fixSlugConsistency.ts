import fg from 'fast-glob';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { EXCLUDED_GLOB_PATTEN } from './markdownFormatting';

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

const replaceSlugsInFrontmatter = (
  content: string,
  newSlugs: string[]
): string => {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const frontmatterMatch = content.match(frontmatterPattern);

  if (!frontmatterMatch) {
    return content;
  }

  const frontmatterContent = frontmatterMatch[1];

  // Create new slugs section
  const newSlugsSection = newSlugs.map((slug) => `  - ${slug}`).join('\n');

  // Replace the slugs section
  const updatedFrontmatter = frontmatterContent.replace(
    /slugs:\s*\n((?:\s*-\s*.+\n?)*)/,
    `slugs:\n${newSlugsSection}\n`
  );

  // Replace the entire frontmatter
  return content.replace(
    frontmatterPattern,
    `---\n${updatedFrontmatter}---\n\n`
  );
};

export const fixSlugConsistency = (): void => {
  console.info('Fixing Slug Consistency...\n');

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

  // Find all English files
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

  console.info(`Found ${englishFiles.length} English files to process`);

  let fixedFiles = 0;

  englishFiles.forEach((englishFilePath: string) => {
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

    if (englishSlugs === null || englishSlugs.length === 0) {
      console.log(`⚠️  No slugs found in English file: ${englishFilePath}`);
      return;
    }

    // Process corresponding files in other languages
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

      // Check if slugs need to be fixed
      const slugsMatch =
        englishSlugs.length === correspondingSlugs.length &&
        englishSlugs.every((slug, index) => slug === correspondingSlugs[index]);

      if (!slugsMatch) {
        // Fix the slugs
        const updatedContent = replaceSlugsInFrontmatter(
          correspondingContent,
          englishSlugs
        );

        // Write the updated content back to the file
        writeFileSync(
          join(process.cwd(), correspondingFilePath),
          updatedContent,
          'utf-8'
        );

        console.log(`✅ Fixed slugs in ${correspondingFilePath}`);
        console.log(`   Old slugs: [${correspondingSlugs.join(', ')}]`);
        console.log(`   New slugs: [${englishSlugs.join(', ')}]`);
        console.log('');

        fixedFiles++;
      }
    });
  });

  console.log(`📊 Slug Consistency Fix Summary:`);
  console.log(`   Total files processed: ${englishFiles.length}`);
  console.log(`   Files fixed: ${fixedFiles}`);
  console.log(`\n✅ Slug consistency fix completed!`);
};
