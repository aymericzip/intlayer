import type { Dictionary } from '@intlayer/types/dictionary';
import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it } from 'vitest';
import {
  isRenderableContentDeclarationPath,
  renderContentDeclaration,
  renderMarkdownContentDeclaration,
  renderYamlContentDeclaration,
} from './renderContentDeclaration';

const translation = (translations: Record<string, string>) => ({
  nodeType: NodeTypes.TRANSLATION,
  [NodeTypes.TRANSLATION]: translations,
});

describe('isRenderableContentDeclarationPath', () => {
  it('accepts JS, JSON, markdown and YAML declarations', () => {
    for (const filePath of [
      'src/a.content.ts',
      'src/a.content.tsx',
      'src/a.content.mjs',
      'src/a.content.json',
      'src/a.content.md',
      'src/a.content.yaml',
      'src/a.content.yml',
    ]) {
      expect(isRenderableContentDeclarationPath(filePath)).toBe(true);
    }
  });

  it('rejects plugin-owned formats', () => {
    expect(isRenderableContentDeclarationPath('locales/fr.po')).toBe(false);
  });
});

describe('renderContentDeclaration', () => {
  it('updates a TS declaration through its AST and keeps the code around it', async () => {
    const fileContent = `import { t, type Dictionary } from 'intlayer';

// Keep this comment
const content = {
  key: 'home',
  content: {
    title: t({ en: 'Hello', fr: 'Bonjour' }),
    count: 3,
  },
} satisfies Dictionary;

export default content;
`;

    const result = await renderContentDeclaration(
      {
        key: 'home',
        content: {
          title: translation({ en: 'Hello world', fr: 'Bonjour le monde' }),
          count: 3,
        },
      } as Dictionary,
      { filePath: 'src/home.content.ts', fileContent }
    );

    expect(result?.fileContent).toContain('// Keep this comment');
    expect(result?.fileContent).toContain('satisfies Dictionary');
    expect(result?.fileContent).toContain('Hello world');
    expect(result?.fileContent).toContain('Bonjour le monde');
    expect(result?.fileContent).not.toContain("'Hello'");
  });

  it('updates a JSON declaration and keeps unrelated fields', async () => {
    const fileContent = JSON.stringify(
      {
        key: 'home',
        fill: true,
        content: { title: 'Hello' },
      },
      null,
      2
    );

    const result = await renderContentDeclaration(
      { key: 'home', content: { title: 'Hi' } } as Dictionary,
      { filePath: 'src/home.content.json', fileContent }
    );

    const parsed = JSON.parse(result?.fileContent ?? '{}');

    expect(parsed.content.title).toBe('Hi');
    expect(parsed.fill).toBe(true);
  });

  it('keeps a content-only JSON declaration content-only', async () => {
    const result = await renderContentDeclaration(
      { key: 'home', content: { title: 'Hi' } } as Dictionary,
      {
        filePath: 'src/home.content.json',
        fileContent: '{ "title": "Hello" }',
      }
    );

    expect(JSON.parse(result?.fileContent ?? '{}')).toEqual({ title: 'Hi' });
  });

  it('collects file() contents instead of writing them to disk', async () => {
    const result = await renderContentDeclaration(
      {
        key: 'home',
        content: {
          body: {
            nodeType: NodeTypes.FILE,
            [NodeTypes.FILE]: './body.md',
            content: '# Body',
            fixedPath: 'src/body.md',
          },
        },
      } as unknown as Dictionary,
      {
        filePath: 'src/home.content.json',
        fileContent: '{ "key": "home", "content": {} }',
      }
    );

    expect(result?.externalFiles).toEqual({ 'src/body.md': '# Body' });
  });

  it('returns undefined for plugin-owned formats', async () => {
    const result = await renderContentDeclaration(
      { key: 'home', content: {} } as Dictionary,
      { filePath: 'locales/fr.po', fileContent: '' }
    );

    expect(result).toBeUndefined();
  });
});

describe('renderMarkdownContentDeclaration', () => {
  const markdownDictionary = (markdown: string, fields = {}): Dictionary =>
    ({
      key: 'about',
      ...fields,
      content: {
        nodeType: NodeTypes.MARKDOWN,
        [NodeTypes.MARKDOWN]: markdown,
      },
    }) as Dictionary;

  it('replaces the body and keeps the existing frontmatter verbatim', () => {
    const existingFileContent =
      '---\nkey: about\ncustomField: "keep: me"\n---\n\nOld body';

    const result = renderMarkdownContentDeclaration(
      markdownDictionary('New body'),
      existingFileContent
    );

    expect(result).toBe(
      '---\nkey: about\ncustomField: "keep: me"\n---\n\nNew body'
    );
  });

  it('merges new dictionary fields into the existing frontmatter', () => {
    const result = renderMarkdownContentDeclaration(
      markdownDictionary('Body', { title: 'About' }),
      '---\nkey: about\ncustomField: value\n---\n\nBody'
    );

    expect(result).toContain('customField: value');
    expect(result).toContain('title: About');
  });

  it('strips the frontmatter stored in the markdown content', () => {
    const result = renderMarkdownContentDeclaration(
      markdownDictionary('---\nkey: about\n---\n\nBody'),
      '---\nkey: about\n---\n\nOld'
    );

    expect(result).toBe('---\nkey: about\n---\n\nBody');
  });
});

describe('renderYamlContentDeclaration', () => {
  it('returns the existing source untouched when nothing changed', () => {
    const dictionary = { key: 'home', content: { title: 'Hello' } };
    const existingFileContent = renderYamlContentDeclaration(
      dictionary as Dictionary
    );

    expect(
      renderYamlContentDeclaration(
        dictionary as Dictionary,
        existingFileContent
      )
    ).toBe(existingFileContent);
  });

  it('updates the content and keeps local-only fields', () => {
    const existingFileContent = renderYamlContentDeclaration({
      key: 'home',
      priority: 2,
      content: { title: 'Hello' },
    } as Dictionary);

    const result = renderYamlContentDeclaration(
      { key: 'home', content: { title: 'Hi' } } as Dictionary,
      existingFileContent
    );

    expect(result).toContain('priority');
    expect(result).toContain('Hi');
    expect(result).not.toContain('Hello');
  });
});
