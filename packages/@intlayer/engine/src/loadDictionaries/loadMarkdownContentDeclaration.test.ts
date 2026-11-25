import { describe, expect, expectTypeOf, it } from 'vitest';
import { getFrontmatterMetadata } from './loadMarkdownContentDeclaration';

describe('getFrontmatterMetadata', () => {
  it('should keep descriptive fields and drop the dictionary configuration', () => {
    expect(
      getFrontmatterMetadata({
        key: 'my-blog',
        locale: 'en',
        item: 1,
        importMode: 'dynamic',
        title: 'My meta title',
        tags: ['i18n'],
        slug: 'hello',
      })
    ).toEqual({ title: 'My meta title', tags: ['i18n'], slug: 'hello' });
  });

  it('should return undefined when only configuration fields are declared', () => {
    expect(
      getFrontmatterMetadata({ key: 'my-blog', locale: 'en', item: 1 })
    ).toBeUndefined();
  });

  it('should type the metadata as the frontmatter without configuration fields', () => {
    const metadata = getFrontmatterMetadata({
      key: 'my-blog',
      locale: 'en',
      title: 'My meta title',
      slug: 'hello',
    });

    expectTypeOf(metadata).toEqualTypeOf<
      { title: string; slug: string } | undefined
    >();
  });
});
