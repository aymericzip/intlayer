import * as NodeTypes from '@intlayer/types/nodeType';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

vi.mock('./editor', () => ({
  ContentSelector: ({ children }: any) => children,
}));

vi.mock('./editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

import { getDictionary } from './getDictionary';

const pluralNode = (variable: string, one: unknown, other: unknown) => ({
  nodeType: NodeTypes.PLURAL,
  [NodeTypes.PLURAL]: { one, other },
  variable,
});

describe('nested plural() over several variables', () => {
  const dictionary = {
    key: 'nested-plural' as const,
    content: {
      filesInFolders: pluralNode(
        'files',
        pluralNode(
          'folders',
          '{{files}} file in {{folders}} folder',
          '{{files}} file in {{folders}} folders'
        ),
        pluralNode(
          'folders',
          '{{files}} files in {{folders}} folder',
          '{{files}} files in {{folders}} folders'
        )
      ),
    },
  };

  it.each([
    [1, 2, '1 file in 2 folders'],
    [3, 1, '3 files in 1 folder'],
  ])('resolves %i files in %i folders', (files, folders, expected) => {
    const content = getDictionary(dictionary as any, 'en') as any;

    expect(String(content.filesInFolders({ files, folders }))).toBe(expected);
  });
});
