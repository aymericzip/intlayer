import { render, waitFor } from '@testing-library/react';
import { Editor } from '@tiptap/core';
import { describe, expect, it } from 'vitest';
import { defaultExtensions } from './extensions';
import { EditorContent, EditorRoot } from './novel';

const markdownFixture = [
  '## Hello',
  '',
  'Some **bold** and *italic* text',
  '',
  '- first',
  '- second',
].join('\n');

describe('MarkdownEditor extensions', () => {
  it('parses a markdown string into rich content and serializes it back', () => {
    const editor = new Editor({
      content: markdownFixture,
      extensions: defaultExtensions,
    });

    const html = editor.getHTML();
    expect(html).toContain('<h2');
    expect(html).toContain('<strong');
    expect(html).toContain('<em');
    expect(html).toContain('<ul');

    const serializedMarkdown = editor.storage.markdown.getMarkdown() as string;
    expect(serializedMarkdown).toContain('## Hello');
    expect(serializedMarkdown).toContain('**bold**');
    expect(serializedMarkdown).toContain('- first');

    editor.destroy();
  });

  it('renders a markdown string through EditorContent (deferred rendering)', async () => {
    const { container } = render(
      <EditorRoot>
        <EditorContent
          immediatelyRender={false}
          initialContent={markdownFixture}
          extensions={defaultExtensions}
        />
      </EditorRoot>
    );

    await waitFor(() => {
      expect(container.querySelector('.ProseMirror')).toBeTruthy();
    });

    expect(container.querySelector('h2')?.textContent).toBe('Hello');
    expect(container.querySelector('strong')?.textContent).toBe('bold');
  });
});
