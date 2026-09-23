import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import { describe, expect, it, vi } from 'vitest';

vi.mock('utils:asset', () => ({ readAsset: () => '' }));

const { getInitialSkills, SKILLS } = await import('./index');

const SKILLS_DIRECTORY = join(__dirname, 'skills');
const ENGLISH_DOCS_DIRECTORY = join(__dirname, '../../../../../docs/docs/en');
const BASE_SKILLS = [
  'Usage',
  'Content',
  'Config',
  'CLI',
  'Compiler',
  'DevTools',
];

/** Converts a skill key to its asset basename (`RemoteContent` → `remote-content`). */
const toSkillFileName = (skill: string): string =>
  skill.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/** Lists every markdown file under a directory, recursively. */
const listMarkdownFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(entry.parentPath, entry.name));

/** Every `https://intlayer.org/<slugs>.md` URL the English docs publish. */
const getPublishedDocUrls = (): Set<string> =>
  new Set(
    listMarkdownFiles(ENGLISH_DOCS_DIRECTORY).flatMap((filePath) => {
      const { slugs } = getMarkdownMetadata<{ slugs?: string[] }>(
        readFileSync(filePath, 'utf-8')
      );

      return Array.isArray(slugs)
        ? [`https://intlayer.org/${slugs.join('/')}.md`]
        : [];
    })
  );

const readSkill = (skill: string): string =>
  readFileSync(join(SKILLS_DIRECTORY, `${toSkillFileName(skill)}.md`), 'utf-8');

describe('getInitialSkills', () => {
  it('preselects only the base skills when no framework is installed', () => {
    expect(getInitialSkills({})).toEqual(BASE_SKILLS);
  });

  it.each([
    [{ next: '16.0.0', react: '19.0.0' }, ['NextJS', 'React']],
    [{ nuxt: '4.0.0' }, ['Vue']],
    [{ '@angular/core': '21.0.0' }, ['Angular']],
    [{ '@analogjs/platform': '2.0.0' }, ['Angular']],
    [{ '@sveltejs/kit': '2.0.0' }, ['Svelte']],
    [{ 'solid-js': '1.9.0' }, ['Solid']],
    [{ astro: '5.0.0', react: '19.0.0' }, ['React', 'Astro']],
    [{ lit: '3.0.0' }, ['Lit']],
    [{ 'vanilla-intlayer': '9.0.0' }, ['Vanilla']],
    [{ remix: '3.0.0' }, ['Remix']],
    [{ hono: '4.0.0' }, ['Backend']],
    [{ '@nestjs/core': '11.0.0', express: '5.0.0' }, ['Backend']],
    [{ next: '16.0.0', 'next-intl': '4.0.0' }, ['Compat', 'NextJS']],
    [{ '@intlayer/react-i18next': '9.0.0' }, ['Compat']],
  ])('detects the framework skills of %o', (dependencies, expectedSkills) => {
    expect(getInitialSkills(dependencies)).toEqual([
      ...BASE_SKILLS,
      ...expectedSkills,
    ]);
  });

  it('does not preselect Compat without an i18n library', () => {
    expect(getInitialSkills({ react: '19.0.0' })).not.toContain('Compat');
  });

  it('does not preselect React for a backend-only project', () => {
    expect(getInitialSkills({ express: '5.0.0' })).not.toContain('React');
  });
});

describe('skill assets', () => {
  const publishedDocUrls = getPublishedDocUrls();

  it.each(SKILLS)(
    '%s declares a name matching its install directory',
    (skill) => {
      const { name } = getMarkdownMetadata<{ name?: string }>(readSkill(skill));

      expect(name).toBe(`intlayer-${toSkillFileName(skill)}`);
    }
  );

  it.each(SKILLS)('%s only references published documentation', (skill) => {
    const referencedUrls =
      readSkill(skill).match(/https:\/\/intlayer\.org\/[^\s)]+\.md/g) ?? [];
    const deadUrls = referencedUrls.filter(
      (url) =>
        // Marketing pages (e.g. /cms.md) are not part of the docs tree
        url.startsWith('https://intlayer.org/doc/') &&
        !publishedDocUrls.has(url)
    );

    expect(deadUrls).toEqual([]);
  });

  it('references every CLI command documentation', () => {
    const cliSkill = readSkill('CLI');
    const missingUrls = [...publishedDocUrls].filter(
      (url) => url.includes('/doc/concept/cli') && !cliSkill.includes(url)
    );

    expect(missingUrls).toEqual([]);
  });

  it.each([
    'https://intlayer.org/doc/eslint.md',
    'https://intlayer.org/doc/lsp.md',
    'https://intlayer.org/doc/vs-code-extension.md',
    'https://intlayer.org/doc/mcp-server.md',
    'https://intlayer.org/doc/concept/ci-cd.md',
    'https://intlayer.org/doc/chrome-extension.md',
  ])('references the %s dev tool documentation', (url) => {
    expect(readSkill('DevTools')).toContain(url);
  });

  it('references every content node documentation', () => {
    const contentSkill = readSkill('Content');
    const missingUrls = [...publishedDocUrls].filter(
      (url) =>
        url.startsWith('https://intlayer.org/doc/concept/content') &&
        !contentSkill.includes(url)
    );

    expect(missingUrls).toEqual([]);
  });

  it('references every package documentation from at least one skill', () => {
    const allSkills = SKILLS.map(readSkill).join('\n');
    const missingUrls = [...publishedDocUrls].filter(
      (url) => url.includes('/doc/packages/') && !allSkills.includes(url)
    );

    expect(missingUrls).toEqual([]);
  });
});
