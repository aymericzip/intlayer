import type { Locale } from '@intlayer/types/allLocales';
import { describe, expect, it } from 'vitest';
import {
  formatReviewSynthesis,
  type ReviewFileResult,
} from './reviewDocSynthesis';

/** Remove the ANSI escape sequences so assertions stay readable. */
const stripAnsi = (text: string): string =>
  // biome-ignore lint/suspicious/noControlCharactersInRegex: matching ANSI escapes
  text.replace(/\x1b\[[0-9;]*m/g, '');

const buildResult = (
  docPath: string,
  locale: string,
  outcome: ReviewFileResult['outcome'],
  summary?: ReviewFileResult['summary']
): ReviewFileResult => ({
  docPath,
  locale: locale as Locale,
  outcome,
  summary,
});

describe('formatReviewSynthesis', () => {
  it('reports zeroed counts when nothing was reviewed', () => {
    expect(stripAnsi(formatReviewSynthesis([]))).toBe(
      'Review synthesis: 0 document(s), 0 locale pair(s) — 0 up to date, 0 to edit, 0 skipped.'
    );
  });

  it('groups the up to date locales under their document', () => {
    const synthesis = stripAnsi(
      formatReviewSynthesis([
        buildResult('./docs/en/index.md', 'fr', 'upToDate'),
        buildResult('./docs/en/index.md', 'es', 'upToDate'),
      ])
    );

    expect(synthesis).toContain('1 document(s), 2 locale pair(s)');
    expect(synthesis).toContain('✔ Up to date (2)');
    expect(synthesis).toContain('   ./docs/en/index.md');
    expect(synthesis).toContain('     fr, es');
  });

  it('details the block counts of the documents to edit', () => {
    const synthesis = stripAnsi(
      formatReviewSynthesis([
        buildResult('./docs/en/index.md', 'fr', 'toEdit', {
          reuse: 8,
          review: 2,
          insertNew: 1,
          delete: 0,
        }),
      ])
    );

    expect(synthesis).toContain('✎ To edit (1)');
    expect(synthesis).toContain('     fr (review=2, new=1)');
    expect(synthesis).not.toContain('delete=');
  });

  it('labels the diverging documents as updated once the changes were applied', () => {
    const synthesis = stripAnsi(
      formatReviewSynthesis(
        [
          buildResult('./docs/en/index.md', 'fr', 'toEdit', {
            reuse: 0,
            review: 1,
            insertNew: 0,
            delete: 0,
          }),
        ],
        { hasAppliedChanges: true }
      )
    );

    expect(synthesis).toContain('1 updated, 0 skipped.');
    expect(synthesis).toContain('✎ Updated (1)');
  });

  it('omits the empty sections and keeps the skipped ones', () => {
    const synthesis = stripAnsi(
      formatReviewSynthesis([
        buildResult('./docs/en/index.md', 'fr', 'skipped'),
      ])
    );

    expect(synthesis).toContain('⊘ Skipped (1)');
    expect(synthesis).not.toContain('Up to date (');
    expect(synthesis).not.toContain('To edit (');
  });
});
