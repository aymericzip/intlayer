import type { CompilerTextField } from '@intlayer/lsp/utils';
import { describe, expect, it } from 'vitest';
import { excludeExtractedContent } from './excludeExtractedContent';

const createField = (text: string): CompilerTextField => ({
  dictionaryKey: 'chat',
  fieldPath: ['field'],
  text,
});

describe('excludeExtractedContent', () => {
  const detectedContent = [
    { text: 'Your next message starts a fresh session' },
    { text: 'Hello {{name}}' },
    { text: 'Not extracted yet' },
  ];

  it('keeps every string when the component has no compiler dictionary', () => {
    expect(excludeExtractedContent(detectedContent, [])).toEqual(
      detectedContent
    );
  });

  it('drops the strings whose text is a dictionary field', () => {
    expect(
      excludeExtractedContent(detectedContent, [
        createField('Your next message starts a fresh session'),
        createField('Hello {{name}}'),
      ])
    ).toEqual([{ text: 'Not extracted yet' }]);
  });

  it('ignores whitespace differences', () => {
    expect(
      excludeExtractedContent(
        [{ text: 'Your next message\n  starts a fresh session ' }],
        [createField('Your next message starts a fresh session')]
      )
    ).toEqual([]);
  });

  it('keeps a string only part of a field text', () => {
    expect(
      excludeExtractedContent(
        [{ text: 'Add' }],
        [createField('Add item'), createField('Added')]
      )
    ).toEqual([{ text: 'Add' }]);
  });
});
