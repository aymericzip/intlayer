import { describe, expect, it, vi } from 'vitest';

vi.mock('@utils/AI/getProjectAIOptions', () => ({
  getProjectAIOptions: vi.fn(async () => undefined),
}));

const {
  buildGenericCommitMessage,
  COMMIT_SUBJECT_MAX_LENGTH,
  detectCommitStyle,
  generateCommitMessage,
  sanitizeCommitSubject,
  summarizeLineChanges,
} = await import('./commitMessage');

const conventionalStyle = { isConventional: true, isCapitalized: false };
const plainStyle = { isConventional: false, isCapitalized: false };

describe('detectCommitStyle', () => {
  it('detects Conventional Commits', () => {
    expect(
      detectCommitStyle([
        'feat(backend): add demo reset',
        'fix: handle locale',
        'chore: update deps',
        'Merge pull request #12 from foo/bar',
      ])
    ).toEqual({ isConventional: true, isCapitalized: false });
  });

  it('detects plain capitalized subjects', () => {
    expect(
      detectCommitStyle(['Add header', 'Fix footer', 'new change'])
    ).toEqual({ isConventional: false, isCapitalized: true });
  });

  it('defaults to plain lower case without history', () => {
    expect(detectCommitStyle([])).toEqual(plainStyle);
  });
});

describe('buildGenericCommitMessage', () => {
  it('lists the dictionaries with a conventional prefix', () => {
    expect(
      buildGenericCommitMessage(['dic-a', 'dic-b', 'dic-a'], conventionalStyle)
    ).toBe("feat: update dictionaries 'dic-a', 'dic-b'");
  });

  it('uses the singular and the repository casing', () => {
    expect(
      buildGenericCommitMessage(['home'], {
        isConventional: false,
        isCapitalized: true,
      })
    ).toBe("Update dictionary 'home'");
  });

  it('sums up the dictionaries that do not fit', () => {
    const dictionaryKeys = Array.from(
      { length: 20 },
      (_, index) => `dictionary-${index}`
    );
    const message = buildGenericCommitMessage(
      dictionaryKeys,
      conventionalStyle
    );

    expect(message.length).toBeLessThanOrEqual(COMMIT_SUBJECT_MAX_LENGTH);
    expect(message).toMatch(/ and \d+ more$/);
    expect(message.startsWith("feat: update dictionaries 'dictionary-0'")).toBe(
      true
    );
  });
});

describe('sanitizeCommitSubject', () => {
  it('keeps the first line and strips quotes and prefixes', () => {
    expect(
      sanitizeCommitSubject(
        'Commit message: "feat: reword the home title."\n\nbody',
        conventionalStyle
      )
    ).toBe('feat: reword the home title');
  });

  it('adds the conventional prefix when the AI forgot it', () => {
    expect(
      sanitizeCommitSubject('Reword the home title', conventionalStyle)
    ).toBe('feat: reword the home title');
  });

  it('truncates long subjects on a word boundary', () => {
    const subject = sanitizeCommitSubject(
      `update ${'very '.repeat(40)}long subject`,
      plainStyle
    );

    expect(subject?.length).toBeLessThanOrEqual(COMMIT_SUBJECT_MAX_LENGTH);
    expect(subject?.endsWith('very')).toBe(true);
  });

  it('returns undefined for empty answers', () => {
    expect(sanitizeCommitSubject('```\n```', plainStyle)).toBeUndefined();
  });
});

describe('summarizeLineChanges', () => {
  it('lists removed then added lines', () => {
    expect(
      summarizeLineChanges(
        "title: t({ en: 'Hello' }),\ncount: 3,",
        "title: t({ en: 'Hi' }),\ncount: 3,"
      )
    ).toBe("- title: t({ en: 'Hello' }),\n+ title: t({ en: 'Hi' }),");
  });
});

describe('generateCommitMessage', () => {
  it('falls back to the generic message without project AI', async () => {
    const message = await generateCommitMessage({
      project: { configuration: {} } as never,
      changes: [
        {
          dictionaryKey: 'home',
          path: 'src/home.content.ts',
          previousContent: 'a',
          nextContent: 'b',
        },
      ],
      recentSubjects: ['feat: add things'],
    });

    expect(message).toBe("feat: update dictionary 'home'");
  });
});
