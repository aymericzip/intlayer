import { describe, expect, it } from 'vitest';
import { filterRoutableFiles, getSlugsStaticParams } from './docMetadata';

describe('getSlugsStaticParams', () => {
  it('returns params objects rather than raw slug arrays', () => {
    expect(
      getSlugsStaticParams([{ slugs: ['doc', 'concept', 'content'] }])
    ).toEqual([{ slugs: ['concept', 'content'] }]);
  });

  it('drops the leading section segment of every entry', () => {
    expect(
      getSlugsStaticParams([
        { slugs: ['frequent-questions', 'body-script'] },
        { slugs: ['frequent-questions', 'domain-routing'] },
      ])
    ).toEqual([{ slugs: ['body-script'] }, { slugs: ['domain-routing'] }]);
  });

  it('filters out entries left without any segment', () => {
    expect(getSlugsStaticParams([{ slugs: [] }, { slugs: ['doc'] }])).toEqual(
      []
    );
  });
});

describe('filterRoutableFiles', () => {
  it('keeps the files owning a dedicated URL', () => {
    const routableFile = { slugs: ['doc', 'concept', 'content'] };

    expect(filterRoutableFiles([routableFile, { slugs: [] }])).toEqual([
      routableFile,
    ]);
  });
});
