import { type Dictionary, type KeyPath, NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { t } from '../transpiler';
import { getContentNodeByKeyPath } from './getContentNodeByKeyPath';

describe('getContentNodeByKeyPath', () => {
  it('should access the specific keyPath: [{key: "edit", type: "object"}, {type: "markdown"}]', () => {
    // Sample dictionary content based on the app.json structure
    const sampleDictionaryContent: Dictionary = {
      key: 'test',
      content: {
        viteLogo: 'Vite logo',
        preactLogo: 'Preact logo',
        title: 'Vite + Preact',
        count: 'count is ',
        edit: {
          nodeType: 'markdown',
          markdown: 'Edit `src/app.tsx` and save to test HMR',
        },
        readTheDocs: 'Click on the Vite and Preact logos to learn more',
      },
    };
    const keyPath: KeyPath[] = [
      { key: 'edit', type: NodeType.Object },
      { type: NodeType.Markdown },
    ];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath
    );

    expect(result).toBe(sampleDictionaryContent.content.edit.markdown);
  });

  it('should access the specific keyPath: [{key: "edit", type: "object"}, {type: "markdown"}]', () => {
    // Sample dictionary content based on the app.json structure
    const sampleDictionaryContent: Dictionary = {
      key: 'test',
      content: t({
        en: {
          viteLogo: 'Vite logo',
          preactLogo: 'Preact logo',
          title: 'Vite + Preact',
          count: 'count is ',
          edit: {
            nodeType: 'markdown',
            markdown: 'Edit `src/app.tsx` and save to test HMR',
          },
          readTheDocs: 'Click on the Vite and Preact logos to learn more',
        },
      }),
    };
    const keyPath: KeyPath[] = [
      { key: 'edit', type: NodeType.Object },
      { type: NodeType.Markdown },
    ];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath,
      'en'
    );

    expect(result).toBe('Edit `src/app.tsx` and save to test HMR');
  });
});
