import { describe, expect, it } from 'vitest';
import { filterSectionByFramework } from './filterSectionByFramework';

type Node = {
  title: string;
  default?: unknown;
  frameworks?: string[];
  subSections?: Record<string, Node>;
};

/** A blog-like tree: untagged concepts, tagged leaves, and a nested group. */
const section: Record<string, Node> = {
  concepts: {
    title: 'Concepts',
    subSections: {
      meaning: { title: 'Meaning', default: {} },
    },
  },
  choosing: {
    title: 'Choosing',
    subSections: {
      react: { title: 'React', default: {}, frameworks: ['react'] },
      vue: { title: 'Vue', default: {}, frameworks: ['vue'] },
      byFramework: {
        title: 'By framework',
        subSections: {
          nextjs: {
            title: 'Next.js',
            default: {},
            frameworks: ['nextjs', 'react'],
          },
          nuxt: { title: 'Nuxt', default: {}, frameworks: ['nuxt', 'vue'] },
        },
      },
    },
  },
  single: { title: 'Single', default: {} },
};

const keysOf = (tree: Record<string, Node>) => Object.keys(tree);

describe('filterSectionByFramework', () => {
  it('returns the tree untouched when no framework is selected', () => {
    expect(filterSectionByFramework(section, null)).toBe(section);
  });

  it('keeps untagged sections regardless of the selected framework', () => {
    const filtered = filterSectionByFramework(section, ['react']);

    expect(keysOf(filtered)).toEqual(['concepts', 'choosing', 'single']);
    expect(keysOf(filtered.concepts.subSections!)).toEqual(['meaning']);
  });

  it('hides tagged leaves that do not match and flattens single-child groups', () => {
    const filtered = filterSectionByFramework(section, ['react']);

    // `byFramework` had one matching child, so it is promoted to its parent.
    expect(keysOf(filtered.choosing.subSections!)).toEqual(['react', 'nextjs']);
  });

  it('requires every selected framework to be present on a node', () => {
    const filtered = filterSectionByFramework(section, ['react', 'nextjs']);

    expect(keysOf(filtered.choosing.subSections!)).toEqual(['nextjs']);
  });

  it('drops a group whose children all fail the filter', () => {
    const filtered = filterSectionByFramework(section, ['svelte']);

    expect(keysOf(filtered)).toEqual(['concepts', 'single']);
  });

  it('carries the inherited framework tags onto untagged children', () => {
    const tagged: Record<string, Node> = {
      react: {
        title: 'React',
        frameworks: ['react'],
        subSections: {
          child: { title: 'Child', default: {} },
          other: { title: 'Other', default: {} },
        },
      },
    };

    const filtered = filterSectionByFramework(tagged, ['react']);

    expect(filtered.react.subSections?.child.frameworks).toEqual(['react']);
  });
});
