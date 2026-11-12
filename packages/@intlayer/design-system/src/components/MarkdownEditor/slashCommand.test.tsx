import { Editor } from '@tiptap/core';
import { describe, expect, it, vi } from 'vitest';
import { defaultExtensions } from './extensions';
import type { EditorInstance, UploadFn } from './novel';
import { getSuggestionItems } from './slashCommand';

/** Content stub resolving every key to `{ value: key }`. */
const contentStub = new Proxy(
  {},
  { get: (_target, key) => ({ value: String(key) }) }
);

const uploadFnStub: UploadFn = () => undefined;

describe('getSuggestionItems', () => {
  it('omits the asset library command when no opener is given', () => {
    const titles = getSuggestionItems(uploadFnStub, contentStub).map(
      (item) => item.title
    );

    expect(titles).not.toContain('assetLibrary');
  });

  it('lists the asset library command and opens it with the editor', () => {
    const onOpenAssetLibrary = vi.fn<(editor: EditorInstance) => void>();
    const items = getSuggestionItems(uploadFnStub, contentStub, {
      onOpenAssetLibrary,
    });
    const assetLibraryItem = items.find(
      (item) => item.title === 'assetLibrary'
    );

    expect(assetLibraryItem).toBeDefined();

    const editor = new Editor({
      content: '/asset',
      extensions: defaultExtensions,
    });

    assetLibraryItem?.command?.({ editor, range: { from: 1, to: 7 } });

    expect(onOpenAssetLibrary).toHaveBeenCalledWith(editor);
    expect(editor.getText()).toBe('');

    editor.destroy();
  });

  it('serializes an inserted asset image to markdown', () => {
    const editor = new Editor({ content: '', extensions: defaultExtensions });

    editor
      .chain()
      .setImage({ src: 'https://cdn.example.com/logo.png', alt: 'Logo' })
      .run();

    expect(editor.storage.markdown.getMarkdown()).toContain(
      '![Logo](https://cdn.example.com/logo.png)'
    );

    editor.destroy();
  });
});
