import { type ContentNode, NodeType } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getReplacedValuesContent } from './getReplacedValuesContent';

describe('getReplacedValuesContent', () => {
  const nodeProps = {
    dictionaryKey: 'test',
    keyPath: [],
  };

  it('should replace all string values in a flat object with a string', () => {
    const testData = {
      test1: 'Hello',
      test2: 'World',
      test3: 'Foo',
      test4: 'Bar',
    };

    const replacementValue = 'REPLACED';

    const expectedResult = {
      test1: 'REPLACED',
      test2: 'REPLACED',
      test3: 'REPLACED',
      test4: 'REPLACED',
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should replace all values in a flat object with a number', () => {
    const testData = {
      test1: 'Hello',
      test2: 42,
      test3: true,
      test4: false,
    };

    const replacementValue = 999;

    const expectedResult = {
      test1: 999,
      test2: 999,
      test3: 999,
      test4: 999,
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should replace all values in nested objects with a string', () => {
    const testData = {
      test1: 'Hello',
      test2: {
        nested1: 'World',
        nested2: {
          deepNested: 'Deep',
          anotherDeep: 42,
        },
      },
      test3: 'Foo',
    };

    const replacementValue = 'NEW_VALUE';

    const expectedResult = {
      test1: 'NEW_VALUE',
      test2: {
        nested1: 'NEW_VALUE',
        nested2: {
          deepNested: 'NEW_VALUE',
          anotherDeep: 'NEW_VALUE',
        },
      },
      test3: 'NEW_VALUE',
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should replace all values in arrays with a number', () => {
    const testData = {
      test1: 'Hello',
      test2: ['item1', 'item2', 42, true],
      test3: {
        nestedArray: [
          'nested1',
          {
            inArrayObject: 'value',
            anotherProp: false,
          },
          'nested2',
        ],
      },
    };

    const replacementValue = 123;

    const expectedResult = {
      test1: 123,
      test2: [123, 123, 123, 123],
      test3: {
        nestedArray: [
          123,
          {
            inArrayObject: 123,
            anotherProp: 123,
          },
          123,
        ],
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should replace all values with a boolean', () => {
    const testData = {
      test1: 'Hello',
      test2: 42,
      test3: false,
      test4: {
        nested: 'World',
        number: 100,
      },
    };

    const replacementValue = true;

    const expectedResult = {
      test1: true,
      test2: true,
      test3: true,
      test4: {
        nested: true,
        number: true,
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should handle mixed data types and complex nested structures', () => {
    const testData = {
      simpleString: 'text',
      simpleNumber: 42,
      simpleBoolean: true,
      nestedObject: {
        prop1: 'nested text',
        prop2: 123,
        prop3: false,
        deeperNested: {
          deep1: 'very deep',
          deep2: 999,
        },
      },
      arrayWithMixed: [
        'array string',
        456,
        true,
        {
          objInArray: 'object in array',
          numberInArray: 789,
        },
        ['nested', 'array', 321],
      ],
    };

    const replacementValue = 'UNIFORM';

    const expectedResult = {
      simpleString: 'UNIFORM',
      simpleNumber: 'UNIFORM',
      simpleBoolean: 'UNIFORM',
      nestedObject: {
        prop1: 'UNIFORM',
        prop2: 'UNIFORM',
        prop3: 'UNIFORM',
        deeperNested: {
          deep1: 'UNIFORM',
          deep2: 'UNIFORM',
        },
      },
      arrayWithMixed: [
        'UNIFORM',
        'UNIFORM',
        'UNIFORM',
        {
          objInArray: 'UNIFORM',
          numberInArray: 'UNIFORM',
        },
        ['UNIFORM', 'UNIFORM', 'UNIFORM'],
      ],
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should handle empty objects and arrays', () => {
    const testData = {
      emptyObject: {},
      emptyArray: [],
      nonEmptyWithEmpty: {
        text: 'hello',
        nested: {
          empty: {},
          array: [],
        },
      },
    };

    const replacementValue = 'REPLACEMENT';

    const expectedResult = {
      emptyObject: {},
      emptyArray: [],
      nonEmptyWithEmpty: {
        text: 'REPLACEMENT',
        nested: {
          empty: {},
          array: [],
        },
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should work with Translation nodes', () => {
    const testData = {
      test1: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'Hello',
          fr: 'Bonjour',
        },
      },
      test2: 'Simple string',
      test3: {
        nested: {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'World',
            fr: 'Monde',
          },
        },
      },
      test4: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: {
            test5: 'Test 5',
          },
          fr: {
            test5: 'Test 5',
          },
        },
      },
    };

    const replacementValue = 'REPLACED_TEXT';

    const expectedResult = {
      test1: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: 'REPLACED_TEXT',
          fr: 'REPLACED_TEXT',
        },
      },
      test2: 'REPLACED_TEXT',
      test3: {
        nested: {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'REPLACED_TEXT',
            fr: 'REPLACED_TEXT',
          },
        },
      },
      test4: {
        nodeType: NodeType.Translation,
        [NodeType.Translation]: {
          en: {
            test5: 'REPLACED_TEXT',
          },
          fr: {
            test5: 'REPLACED_TEXT',
          },
        },
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should handle null and undefined values by leaving them unchanged', () => {
    const testData = {
      test1: 'Hello',
      test2: null,
      test3: undefined,
      test4: 42,
      test5: {
        nested1: 'World',
        nested2: null,
        nested3: undefined,
      },
    };

    const replacementValue = 'REPLACED';

    const expectedResult = {
      test1: 'REPLACED',
      test2: null,
      test3: undefined,
      test4: 'REPLACED',
      test5: {
        nested1: 'REPLACED',
        nested2: null,
        nested3: undefined,
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should handle Insertion nodes with string templates containing placeholders', () => {
    const testData = {
      myInsertion: {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]:
          'Hello, my name is {{name}} and I am {{age}} years old!',
        fields: ['name', 'age'],
      },
      regularString: 'Just a regular string',
    };

    const replacementValue = 'REPLACED';

    const expectedResult = {
      myInsertion: {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]: 'REPLACED',
        fields: ['name', 'age'],
      },
      regularString: 'REPLACED',
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });

  it('should handle nested Insertion nodes with multilingual content', () => {
    const testData = {
      myMultilingualInsertion: {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]: {
          nodeType: NodeType.Translation,
          [NodeType.Translation]: {
            en: 'Hello, my name is {{name}} and I am {{age}} years old!',
            fr: "Bonjour, mon nom est {{name}} et j'ai {{age}} ans!",
          },
        },
        fields: ['name', 'age'],
      },
    };

    const replacementValue = 'REPLACED_TEXT';

    const expectedResult = {
      myMultilingualInsertion: {
        nodeType: NodeType.Insertion,
        [NodeType.Insertion]: {
          nodeType: 'REPLACED_TEXT',
          [NodeType.Translation]: {
            en: 'REPLACED_TEXT',
            fr: 'REPLACED_TEXT',
          },
        },
        fields: ['name', 'age'],
      },
    };

    const result = getReplacedValuesContent(
      testData as unknown as ContentNode,
      replacementValue,
      nodeProps
    );

    expect(result).toEqual(expectedResult);
  });
});
