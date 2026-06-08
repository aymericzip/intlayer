import type { Dictionary } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';

import * as NodeTypes from '@intlayer/types/nodeType';
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
          nodeType: NodeTypes.MARKDOWN,
          [NodeTypes.MARKDOWN]: 'Edit `src/app.tsx` and save to test HMR',
        },
        readTheDocs: 'Click on the Vite and Preact logos to learn more',
      },
    };
    const keyPath: KeyPath[] = [
      { key: 'edit', type: NodeTypes.OBJECT },
      { type: NodeTypes.MARKDOWN },
    ];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath
    );

    expect(result).toBe(
      sampleDictionaryContent.content.edit[NodeTypes.MARKDOWN]
    );
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
            nodeType: NodeTypes.MARKDOWN,
            [NodeTypes.MARKDOWN]: 'Edit `src/app.tsx` and save to test HMR',
          },
          readTheDocs: 'Click on the Vite and Preact logos to learn more',
        },
      }),
    };
    const keyPath: KeyPath[] = [
      { key: 'edit', type: NodeTypes.OBJECT },
      { type: NodeTypes.MARKDOWN },
    ];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath,
      'en'
    );

    expect(result).toBe('Edit `src/app.tsx` and save to test HMR');
  });
});
