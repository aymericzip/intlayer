import { describe, expect, it } from 'vitest';
import {
  extractTranslatableContent,
  reinsertTranslatedContent,
} from './extractTranslatableContent';

describe('extractTranslatableContent', () => {
  it('should extract translatable string content from a varied dictionary', () => {
    const input = {
      myEntry: "content extractable because it's a string",
      nest: {
        myEntry2: 'there is {{count}} cars',
      },
      myNumber: 5,
      myBoolean: true,
      myNull: null,
      onlySpace: '    ',
      onlySpecial: ' !@#$%^&*()_+={}[]|:;"<>,.?/~` ',
      validWithSpecial: 'Hello {name}!',
      multipleVars: '{{count}} items out of {total, number}',
      onlyVar: '{time, time, short}',
      onlyVarsAndSpaces: '{{a}}   {b}',
    };

    const { extractedContent, translatableDictionary } =
      extractTranslatableContent(input);

    expect(extractedContent).toEqual([
      {
        index: 1,
        path: ['myEntry'],
        value: "content extractable because it's a string",
      },
      {
        index: 2,
        path: ['nest', 'myEntry2'],
        value: 'there is <1> cars',
        replacement: { '<1>': '{{count}}' },
      },
      {
        index: 3,
        path: ['validWithSpecial'],
        value: 'Hello <1>!',
        replacement: { '<1>': '{name}' },
      },
      {
        index: 4,
        path: ['multipleVars'],
        value: '<1> items out of <2>',
        replacement: { '<1>': '{{count}}', '<2>': '{total, number}' },
      },
    ]);

    expect(translatableDictionary).toEqual({
      1: "content extractable because it's a string",
      2: 'there is <1> cars',
      3: 'Hello <1>!',
      4: '<1> items out of <2>',
    });
  });
});

describe('reinsertTranslatedContent', () => {
  it('should reinsert translated strings back to the original dictionary', () => {
    const input = {
      myEntry: "content extractable because it's a string",
      nest: {
        myEntry2: 'there is {{count}} cars',
      },
      myNumber: 5,
      myBoolean: true,
      myNull: null,
      onlySpace: '    ',
      onlySpecial: ' !@#$%^&*()_+={}[]|:;"<>,.?/~` ',
      validWithSpecial: 'Hello {name}!',
      multipleVars: '{{count}} items out of {total, number}',
      onlyVar: '{time, time, short}',
      onlyVarsAndSpaces: '{{a}}   {b}',
    };

    const { extractedContent } = extractTranslatableContent(input);

    const translatedDictionary = {
      1: 'contenu extrait',
      2: 'il y a <1> voitures',
      3: 'Bonjour <1>!',
      4: '<1> éléments sur <2>',
    };

    const result = reinsertTranslatedContent(
      input,
      extractedContent,
      translatedDictionary
    );

    expect(result).toEqual({
      myEntry: 'contenu extrait',
      nest: {
        myEntry2: 'il y a {{count}} voitures',
      },
      myNumber: 5,
      myBoolean: true,
      myNull: null,
      onlySpace: '    ',
      onlySpecial: ' !@#$%^&*()_+={}[]|:;"<>,.?/~` ',
      validWithSpecial: 'Bonjour {name}!',
      multipleVars: '{{count}} éléments sur {total, number}',
      onlyVar: '{time, time, short}',
      onlyVarsAndSpaces: '{{a}}   {b}',
    });
  });
});
