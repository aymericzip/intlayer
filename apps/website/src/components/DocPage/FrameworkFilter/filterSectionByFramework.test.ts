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

  it('keeps nodes with framework "all" regardless of the selected framework', () => {
    const tree: Record<string, Node> = {
      packages: {
        title: 'Packages',
        subSections: {
          intlayer: {
            title: 'intlayer',
            default: {},
            frameworks: ['all', 'js'],
          },
          reactIntlayer: {
            title: 'react-intlayer',
            default: {},
            frameworks: ['react'],
          },
          vueIntlayer: {
            title: 'vue-intlayer',
            default: {},
            frameworks: ['vue'],
          },
        },
      },
    };

    const filteredForReact = filterSectionByFramework(tree, ['react']);
    expect(keysOf(filteredForReact.packages.subSections!)).toEqual([
      'intlayer',
      'reactIntlayer',
    ]);

    const filteredForVue = filterSectionByFramework(tree, ['vue']);
    expect(keysOf(filteredForVue.packages.subSections!)).toEqual([
      'intlayer',
      'vueIntlayer',
    ]);
  });

  it('keeps subsections grouped when multiple items are shown in a category', () => {
    const tree: Record<string, Node> = {
      packages: {
        title: 'Packages',
        subSections: {
          intlayer: {
            title: 'intlayer',
            default: {},
            frameworks: ['all', 'js'],
            subSections: {
              getIntlayer: { title: 'getIntlayer', default: {} },
            },
          },
          reactIntlayer: {
            title: 'react-intlayer',
            default: {},
            frameworks: ['react'],
            subSections: {
              useIntlayer: { title: 'useIntlayer', default: {} },
              t: { title: 't', default: {} },
            },
          },
          lynxIntlayer: {
            title: 'lynx-intlayer',
            default: {},
            frameworks: ['lynx', 'react'],
          },
        },
      },
    };

    const filtered = filterSectionByFramework(tree, ['react']);
    // Since packages has multiple matching items (intlayer, reactIntlayer, lynxIntlayer),
    // reactIntlayer's subsections should NOT be unwrapped to top-level.
    expect(keysOf(filtered.packages.subSections!)).toEqual([
      'intlayer',
      'reactIntlayer',
      'lynxIntlayer',
    ]);
    expect(
      keysOf(filtered.packages.subSections!.reactIntlayer.subSections!)
    ).toEqual(['useIntlayer', 't']);
  });

  it('moves subsections to top level if it is the only item shown in the category', () => {
    const tree: Record<string, Node> = {
      packages: {
        title: 'Packages',
        subSections: {
          reactIntlayer: {
            title: 'react-intlayer',
            default: {},
            frameworks: ['react'],
            subSections: {
              useIntlayer: { title: 'useIntlayer', default: {} },
              t: { title: 't', default: {} },
            },
          },
          vueIntlayer: {
            title: 'vue-intlayer',
            default: {},
            frameworks: ['vue'],
            subSections: {
              useVueIntlayer: { title: 'useVueIntlayer', default: {} },
            },
          },
        },
      },
    };

    const filtered = filterSectionByFramework(tree, ['react']);
    // Since reactIntlayer is the ONLY item shown in packages when filtering 'react',
    // its subsections should be unwrapped to top-level.
    expect(keysOf(filtered.packages.subSections!)).toEqual([
      'reactIntlayer',
      'useIntlayer',
      't',
    ]);
  });
});
