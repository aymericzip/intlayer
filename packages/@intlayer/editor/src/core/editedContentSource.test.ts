// @vitest-environment node
// jsdom breaks esbuild, loaded through the dictionary manipulator imports
import type { Locale } from '@intlayer/types/allLocales';
import type { LocalDictionaryId } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  resolveEditedSource,
  subscribeToEditedContentSource,
} from './editedContentSource';
import { EditorStateManager } from './EditorStateManager';
import { setGlobalEditorManager } from './globalManager';

describe('resolveEditedSource', () => {
  it('returns a plain string as is', () => {
    expect(resolveEditedSource('# Title', 'en')).toBe('# Title');
  });

  it('unwraps a file node nested in a markdown node', () => {
    const node = {
      nodeType: NodeTypes.MARKDOWN,
      [NodeTypes.MARKDOWN]: {
        nodeType: NodeTypes.FILE,
        [NodeTypes.FILE]: './landingParagraph.en.md',
        content: '- **Edited** item',
      },
    };

    expect(resolveEditedSource(node as never, 'en')).toBe('- **Edited** item');
  });

  it('resolves the translation of the given locale', () => {
    const node = {
      nodeType: NodeTypes.TRANSLATION,
      [NodeTypes.TRANSLATION]: {
        en: { nodeType: NodeTypes.MARKDOWN, [NodeTypes.MARKDOWN]: '**en**' },
        fr: { nodeType: NodeTypes.MARKDOWN, [NodeTypes.MARKDOWN]: '**fr**' },
      },
    };

    expect(resolveEditedSource(node as never, 'fr')).toBe('**fr**');
  });

  it('returns undefined for missing or unsupported nodes', () => {
    expect(resolveEditedSource(undefined, 'en')).toBeUndefined();
    expect(
      resolveEditedSource({ nodeType: NodeTypes.INSERTION } as never, 'en')
    ).toBeUndefined();
  });
});

describe('subscribeToEditedContentSource', () => {
  const dictionaryId =
    'demo-page:local:src/demo.content.ts' as LocalDictionaryId;
  const keyPath: KeyPath[] = [
    { type: NodeTypes.OBJECT, key: 'landingParagraph' },
    { type: NodeTypes.TRANSLATION, key: 'en' },
    { type: NodeTypes.MARKDOWN },
  ];

  // The global manager lives on window, absent from the node environment
  vi.stubGlobal('window', globalThis);
  afterEach(() => setGlobalEditorManager(null));

  it('emits the edited file content of a markdown node', () => {
    const manager = new EditorStateManager({
      mode: 'client',
      messenger: { allowedOrigins: ['*'], postMessageFn: vi.fn() },
    });
    manager.currentLocale.set('en' as Locale);
    setGlobalEditorManager(manager);

    const onChange = vi.fn();
    const unsubscribe = subscribeToEditedContentSource(
      'demo-page',
      keyPath,
      onChange
    );

    expect(onChange).not.toHaveBeenCalled();

    manager.editedContent.set({
      [dictionaryId]: {
        key: 'demo-page',
        localId: dictionaryId,
        content: {
          landingParagraph: {
            nodeType: NodeTypes.TRANSLATION,
            [NodeTypes.TRANSLATION]: {
              en: {
                nodeType: NodeTypes.MARKDOWN,
                [NodeTypes.MARKDOWN]: {
                  nodeType: NodeTypes.FILE,
                  [NodeTypes.FILE]: './landingParagraph.en.md',
                  content: '- **Edited**',
                },
              },
            },
          },
        },
      },
    } as never);

    expect(onChange).toHaveBeenLastCalledWith('- **Edited**');

    setGlobalEditorManager(null);
    expect(onChange).toHaveBeenLastCalledWith(undefined);

    unsubscribe();
  });
});
