import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { transformJSONFile } from './transformJSONFile';

describe('transformJSONFile', () => {
  it('updates standard JSON', () => {
    const initial = `
{
  "key": "test",
  "content": {
    "hello": "world"
  }
}`;
    const dictionary = {
      key: 'test',
      content: {
        hello: 'monde', // Update existing
        newKey: 'newValue', // Add new
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('"hello": "monde"');
    expect(result).toContain('"newKey": "newValue"');
  });

  it('preserves comments in JSONC (Update existing key)', () => {
    const initial = `
{
  // This is a key
  "key": "test",
  "content": {
    // This comment should stay
    "hello": "world"
  }
}`;
    const dictionary = {
      key: 'test',
      content: {
        hello: 'monde',
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('// This comment should stay');
    expect(result).toContain('"hello": "monde"');
  });

  it('preserves comments in JSONC (Add sibling key)', () => {
    const initial = `
{
  "content": {
    // Existing item
    "item1": "value1"
  }
}`;
    const dictionary = {
      content: {
        item1: 'value1',
        item2: 'value2',
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('// Existing item');
    expect(result).toContain('"item1": "value1"');
    expect(result).toContain('"item2": "value2"');
  });

  it('handles JSON5 style features (trailing commas, unquoted keys) loosely', () => {
    const initial = `
{
  key: 'value', // Unquoted key, single quotes
  content: {
    existing: 'data', 
  }
}`;
    const dictionary = {
      content: {
        existing: 'data',
        added: 'new',
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('"added": "new"');
    expect(result).toContain('// Unquoted key, single quotes');
  });

  it('deeply merges nested objects', () => {
    const initial = `
{
  "content": {
    "nested": {
      // Keep me
      "deep": "value"
    }
  }
}`;
    const dictionary = {
      content: {
        nested: {
          deep: 'updated',
          sibling: 'new',
        },
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('// Keep me');
    expect(result).toContain('"deep": "updated"');
    expect(result).toContain('"sibling": "new"');
  });

  it('creates file structure if empty', () => {
    const initial = '';
    const dictionary = {
      key: 'new',
      content: { val: 1 },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('"key": "new"');
    expect(result).toContain('"val": 1');
  });

  it('preserves JSON5 syntax when updating a nested value', () => {
    const initial = `{
  // JSON5: localized content example for "data"
  key: "data",
  content: {
    title: {
      nodeType: "translation",
      translation: {
        en: "Data Content", // English translation
        fr: "Contenu des données", // French translation
        es: "Contenido de las datos", // Spanish translation
      },
    },
  },
}`;

    const dictionary = {
      key: 'data',
      content: {
        title: {
          nodeType: 'translation',
          translation: {
            en: 'Data Content',
            fr: 'Contenu des données',
            es: 'Changed content',
          },
        },
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toEqual(`{
  // JSON5: localized content example for "data"
  key: "data",
  content: {
    title: {
      nodeType: "translation",
      translation: {
        en: "Data Content", // English translation
        fr: "Contenu des données", // French translation
        es: "Changed content", // Spanish translation
      },
    },
  },
}`);
  });

  it('handles complex nested updates including specific node types (translation, enumeration, nested)', () => {
    const initial = `
{
  "welcomeMessage": {
    "nodeType": "translation",
    "translation": {
      "en": "Welcome",
      "fr": "Bienvenue"
    }
  },
  "numberOfCar": {
    "nodeType": "enumeration",
    "enumeration": {
      "0": "No cars",
      "1": "One car"
    }
  },
  "nestedContent": {
    "nodeType": "nested",
    "nested": {
      "dictionaryKey": "oldCode"
    }
  },
  "arrayContent": [
    "item1",
    "item2"
  ],
  "objectOfArray": {
    "array": ["a", "b"],
    "object": {
      "name": "initial name"
    }
  }
}`;

    const dictionary = {
      welcomeMessage: {
        translation: {
          fr: 'Bienvenue updated', // Update existing
          es: 'Bienvenido', // Add new
        },
      },
      numberOfCar: {
        enumeration: {
          '1': 'One car updated',
          '>5': 'Many cars', // Add new
        },
      },
      nestedContent: {
        nested: {
          dictionaryKey: 'newCode', // Update
          path: 'newPath', // Add
        },
      },
      arrayContent: ['item1', 'item3'], // Replace array
      objectOfArray: {
        // "array" key is missing here, so the original should be preserved
        object: {
          name: 'updated name',
          description: 'added description',
        },
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    // welcomeMessage checks
    expect(result).toContain('"en": "Welcome"'); // Preserved
    expect(result).toContain('"fr": "Bienvenue updated"'); // Updated
    expect(result).toContain('"es": "Bienvenido"'); // Added

    // numberOfCar checks
    expect(result).toContain('"0": "No cars"'); // Preserved
    expect(result).toContain('"1": "One car updated"'); // Updated
    expect(result).toContain('">5": "Many cars"'); // Added

    // nestedContent checks
    expect(result).toContain('"dictionaryKey": "newCode"');
    expect(result).toContain('"path": "newPath"');

    // arrayContent checks
    expect(result).toContain('"item3"');
    expect(result).not.toContain('"item2"'); // Replaced

    // objectOfArray checks
    expect(result).toContain('"a"'); // Preserved
    expect(result).toContain('"b"');
    expect(result).toContain('"name": "updated name"');
    expect(result).toContain('"description": "added description"');
  });

  it('updates deeply imbricated nodes (Translation -> Markdown)', () => {
    const initial = `
{
  "contentMultilingual": {
    "nodeType": "translation",
    "translation": {
      "en": {
        "nodeType": "markdown",
        "markdown": "## Title"
      },
      "fr": {
        "nodeType": "markdown",
        "markdown": "## Titre"
      }
    }
  }
}`;
    const dictionary = {
      contentMultilingual: {
        translation: {
          en: {
            markdown: '## Title Updated',
          },
          es: {
            nodeType: 'markdown',
            markdown: '## Título',
          },
        },
      },
    } as unknown as Dictionary;

    const result = transformJSONFile(initial, dictionary);

    expect(result).toContain('"markdown": "## Title Updated"');
    expect(result).toContain('"markdown": "## Titre"');
    expect(result).toContain('"markdown": "## Título"');
  });
});
