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

  it('should resolve node when root is translation and translation is in keyPath with fallbackLocale', () => {
    const sampleDictionaryContent: Dictionary = {
      key: 'test',
      content: t({
        en: {
          welcomeMessage: 'Welcome',
          numberOfCar: {
            nodeType: NodeTypes.ENUMERATION,
            enumeration: {
              0: 'No cars',
              1: 'One car',
            },
          },
        },
      }),
    };
    const keyPath: KeyPath[] = [
      { type: NodeTypes.TRANSLATION, key: 'en' },
      { type: NodeTypes.OBJECT, key: 'numberOfCar' },
    ];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath,
      'en'
    );

    expect(result).toEqual({
      nodeType: NodeTypes.ENUMERATION,
      enumeration: {
        0: 'No cars',
        1: 'One car',
      },
    });
  });

  it('should auto-resolve node when root is translation and translation is omitted from keyPath without fallbackLocale', () => {
    const sampleDictionaryContent: Dictionary = {
      key: 'test',
      content: t({
        en: {
          welcomeMessage: 'Welcome',
          numberOfCar: {
            nodeType: NodeTypes.ENUMERATION,
            enumeration: {
              0: 'No cars',
              1: 'One car',
            },
          },
        },
      }),
    };
    const keyPath: KeyPath[] = [{ type: NodeTypes.OBJECT, key: 'numberOfCar' }];

    const result = getContentNodeByKeyPath(
      sampleDictionaryContent.content,
      keyPath
    );

    expect(result).toEqual({
      nodeType: NodeTypes.ENUMERATION,
      enumeration: {
        0: 'No cars',
        1: 'One car',
      },
    });
  });
});
