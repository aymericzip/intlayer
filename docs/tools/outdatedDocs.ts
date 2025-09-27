import fg from 'fast-glob';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { locales } from '../intlayer.config';
import { EXCLUDED_GLOB_PATTEN } from './markdownFormatting';

interface OutdatedDetail {
  englishFile: string;
  locale: string;
  localizedFile: string;
  englishUpdatedAt: string | null;
  localizedUpdatedAt: string | null;
}

interface OutdatedDocsResult {
  totalEnglishFiles: number;
  totalCheckedPairs: number;
  filesOutdated: number;
  details: OutdatedDetail[];
}

const englishPatterns: string[] = [
  'docs/en/**/*.md',
  'blog/en/**/*.md',
  'frequent_questions/en/**/*.md',
  'legal/en/**/*.md',
];

const extractFrontmatter = (content: string): string | null => {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const frontmatterMatch = content.match(frontmatterPattern);
  if (!frontmatterMatch) return null;
  return frontmatterMatch[1];
};

const extractUpdatedAt = (content: string): string | null => {
  const fm = extractFrontmatter(content);
  if (!fm) return null;
  const match = fm.match(/updatedAt:\s*([^\n]+)/);
  if (!match) return null;
  const raw = match[1].trim();
  return raw.replace(/^['"]|['"]$/g, '') || null;
};

const toLanguageName = (locale: string): string => {
  const AnyIntl = Intl as unknown as { DisplayNames?: any };
  if (AnyIntl && typeof AnyIntl.DisplayNames === 'function') {
    try {
      const dn = new AnyIntl.DisplayNames(['en'], { type: 'language' });
      const name = dn.of(locale);
      return name ?? locale;
    } catch {
      return locale;
    }
  }
  return locale;
};

const parseDate = (value: string | null): Date | null => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

const getLocalizedPath = (
  englishPath: string,
  locale: string
): string | null => {
  if (englishPath.startsWith('docs/en/'))
    return englishPath.replace('docs/en/', `docs/${locale}/`);
  if (englishPath.startsWith('blog/en/'))
    return englishPath.replace('blog/en/', `blog/${locale}/`);
  if (englishPath.startsWith('frequent_questions/en/'))
    return englishPath.replace(
      'frequent_questions/en/',
      `frequent_questions/${locale}/`
    );
  if (englishPath.startsWith('legal/en/'))
    return englishPath.replace('legal/en/', `legal/${locale}/`);
  return null;
};

export const runOutdatedDocsTest = (
  shouldFail: boolean = false
): OutdatedDocsResult => {
  console.info('Running Outdated Docs Test...');
  console.info('Current working directory:', process.cwd());

  const englishFiles = fg.sync(englishPatterns, {
    ignore: EXCLUDED_GLOB_PATTEN,
  });
  console.info(`Found ${englishFiles.length} English files to check`);

  const details: OutdatedDetail[] = [];
  let totalPairs = 0;
  const englishUpdatedAtMap = new Map<string, string | null>();

  englishFiles.forEach((englishFile) => {
    const englishFullPath = join(process.cwd(), englishFile);
    if (!existsSync(englishFullPath)) return;
    const englishContent = readFileSync(englishFullPath, 'utf-8');
    const englishUpdatedAtRaw = extractUpdatedAt(englishContent);
    const englishUpdatedAt = parseDate(englishUpdatedAtRaw);
    englishUpdatedAtMap.set(englishFile, englishUpdatedAtRaw);

    locales.forEach((locale) => {
      const localizedRel = getLocalizedPath(englishFile, locale);
      if (!localizedRel) return;
      const localizedFull = join(process.cwd(), localizedRel);
      if (!existsSync(localizedFull)) return;
      totalPairs++;

      const localizedContent = readFileSync(localizedFull, 'utf-8');
      const localizedUpdatedAtRaw = extractUpdatedAt(localizedContent);
      const localizedUpdatedAt = parseDate(localizedUpdatedAtRaw);

      const isOutdated = (() => {
        if (!englishUpdatedAt) return false; // If English has no updatedAt, skip
        if (!localizedUpdatedAt) return true; // Missing in localized => outdated
        return localizedUpdatedAt.getTime() < englishUpdatedAt.getTime();
      })();

      if (isOutdated) {
        details.push({
          englishFile,
          locale,
          localizedFile: localizedRel,
          englishUpdatedAt: englishUpdatedAtRaw,
          localizedUpdatedAt: localizedUpdatedAtRaw,
        });
      }
    });
  });

  // Group and display logs by English source file
  if (details.length > 0) {
    const grouped = new Map<
      string,
      {
        englishUpdatedAt: string | null;
        entries: {
          locale: string;
          localizedFile: string;
          localizedUpdatedAt: string | null;
        }[];
      }
    >();

    details.forEach((d) => {
      if (!grouped.has(d.englishFile)) {
        grouped.set(d.englishFile, {
          englishUpdatedAt:
            englishUpdatedAtMap.get(d.englishFile) ?? d.englishUpdatedAt,
          entries: [],
        });
      }
      grouped.get(d.englishFile)!.entries.push({
        locale: d.locale,
        localizedFile: d.localizedFile,
        localizedUpdatedAt: d.localizedUpdatedAt,
      });
    });

    const icon = shouldFail ? '❌' : '⚠️';
    for (const [englishFile, group] of grouped.entries()) {
      console.log(`${icon}  Outdated translation detected:`);
      console.log(
        `   English: ${englishFile} (updatedAt: ${group.englishUpdatedAt ?? 'N/A'})`
      );
      group.entries.forEach((e) => {
        const languageName = toLanguageName(e.locale);
        console.log(
          `   - ${languageName} ${e.localizedFile} (updatedAt: ${e.localizedUpdatedAt ?? 'N/A'})`
        );
      });
      console.log('');
    }
  }

  const uniqueOutdatedEnglishFiles = new Set(details.map((d) => d.englishFile));

  console.log('📊 Outdated Docs Test Summary:');
  console.log(`   Total English files: ${englishFiles.length}`);
  console.log(`   Total checked pairs: ${totalPairs}`);
  console.log(
    `   Files with outdated translations: ${uniqueOutdatedEnglishFiles.size}`
  );
  console.log(`   Total outdated pairs: ${details.length}`);

  if (details.length === 0) {
    console.log('\n✅ All translations are up to date!');
  }

  return {
    totalEnglishFiles: englishFiles.length,
    totalCheckedPairs: totalPairs,
    filesOutdated: uniqueOutdatedEnglishFiles.size,
    details,
  };
};
