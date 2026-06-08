import { describe, expect, it } from 'vitest';
import { extractScriptBlocks, injectScriptBlocks } from './extractScriptBlocks';

describe('extractScriptBlocks', () => {
  describe('Astro frontmatter', () => {
    it('extracts frontmatter between --- fences', () => {
      const code = [
        '---',
        'import { getIntlayer } from "intlayer";',
        'const { title } = getIntlayer("home", locale);',
        '---',
        '<h1>{title}</h1>',
      ].join('\n');

      const blocks = extractScriptBlocks('/src/pages/index.astro', code);

      expect(blocks).toHaveLength(1);
      expect(blocks[0]?.content).toBe(
        'import { getIntlayer } from "intlayer";\nconst { title } = getIntlayer("home", locale);'
      );
    });

    it('sets correct byte offsets for the frontmatter block', () => {
      const code = '---\nconst x = 1;\n---\n<div />';

      const blocks = extractScriptBlocks('/src/pages/index.astro', code);

      expect(blocks).toHaveLength(1);
      const firstBlock = blocks[0];
      expect(firstBlock).toBeDefined();
      if (!firstBlock) return;
      const { contentStartOffset, contentEndOffset, content } = firstBlock;
      expect(code.slice(contentStartOffset, contentEndOffset)).toBe(content);
    });

    it('handles \\r\\n line endings', () => {
      const code = '---\r\nconst x = 1;\r\n---\r\n<div />';

      const blocks = extractScriptBlocks('/src/pages/index.astro', code);

      expect(blocks).toHaveLength(1);
      expect(blocks[0]?.content).toBe('const x = 1;');
    });

    it('returns empty array when no frontmatter fence is present (static page)', () => {
      const code = '<h1>Hello</h1>';

      const blocks = extractScriptBlocks('/src/pages/static.astro', code);

      expect(blocks).toHaveLength(0);
    });

    it('returns empty array when called on Astro-compiled JS (no --- fences)', () => {
      // This is what our enforce:'post' transform hook receives after Astro
      // has already compiled the .astro file to a JS module.
      const compiledJs = [
        'import { getIntlayer } from "intlayer";',
        'const locale = getLocaleFromPath(Astro.url.pathname);',
        'const { title } = getIntlayer("home", locale);',
      ].join('\n');

      const blocks = extractScriptBlocks('/src/pages/index.astro', compiledJs);

      // No --- fences → empty → renameFieldsInSourceFile falls through to plain-JS path
      expect(blocks).toHaveLength(0);
    });

    it('does not include the --- fence characters in the extracted content', () => {
      const code = '---\nconst a = 1;\n---\n<p>hi</p>';

      const blocks = extractScriptBlocks('/page.astro', code);

      expect(blocks[0]?.content).not.toContain('---');
    });
  });

  describe('Vue / Svelte SFCs', () => {
    it('extracts a single <script> block from a Vue SFC', () => {
      const code =
        '<template><div /></template>\n<script setup>\nconst x = 1;\n</script>';

      const blocks = extractScriptBlocks('/src/App.vue', code);

      expect(blocks).toHaveLength(1);
      expect(blocks[0]?.content).toBe('\nconst x = 1;\n');
    });

    it('returns empty array for a template-only Vue SFC', () => {
      const code = '<template><div>hello</div></template>';

      const blocks = extractScriptBlocks('/src/App.vue', code);

      expect(blocks).toHaveLength(0);
    });
  });

  describe('Plain JS/TS files', () => {
    it('returns the whole file as a single block', () => {
      const code =
        'import { useIntlayer } from "react-intlayer";\nconst t = useIntlayer("key");';

      const blocks = extractScriptBlocks('/src/Page.tsx', code);

      expect(blocks).toHaveLength(1);
      expect(blocks[0]?.content).toBe(code);
      expect(blocks[0]?.contentStartOffset).toBe(0);
      expect(blocks[0]?.contentEndOffset).toBe(code.length);
    });
  });

  describe('injectScriptBlocks round-trip', () => {
    it('replaces astro frontmatter content and preserves the template', () => {
      const original = '---\nconst x = 1;\n---\n<h1>hi</h1>';
      const blocks = extractScriptBlocks('/page.astro', original);

      const firstBlock = blocks[0];
      expect(firstBlock).toBeDefined();
      if (!firstBlock) return;

      const result = injectScriptBlocks(original, [
        { block: firstBlock, modifiedContent: 'const x = 42;' },
      ]);

      expect(result).toBe('---\nconst x = 42;\n---\n<h1>hi</h1>');
    });
  });
});
