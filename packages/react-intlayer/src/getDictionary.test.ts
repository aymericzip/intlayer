import * as NodeTypes from '@intlayer/types/nodeType';
import { createElement, Fragment } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Mocks – must be declared before any imports that transitively load them.
// ---------------------------------------------------------------------------

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({ default: mockConfig }));

vi.mock('./editor', () => ({
  ContentSelector: ({ children }: any) => children,
}));

vi.mock('./editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: any) => children,
}));

// Imported after mocks so that plugin modules pick up the mocked config.
import { getDictionary } from './getDictionary';

// ---------------------------------------------------------------------------
// Fixture dictionaries
// ---------------------------------------------------------------------------

const dictWithSimpleContent = {
  key: 'test' as const,
  content: { greeting: 'Hello World', count: 42 },
} as const;

const dictWithInsertion = {
  key: 'test-insert' as const,
  content: {
    greeting: {
      nodeType: NodeTypes.INSERTION,
      [NodeTypes.INSERTION]: 'Hello {{name}}',
      fields: ['name'],
    },
  },
} as const;

const dictWithMultipleInsertions = {
  key: 'test-multi-insert' as const,
  content: {
    message: {
      nodeType: NodeTypes.INSERTION,
      [NodeTypes.INSERTION]: 'My {{stuf}} ooo',
      fields: ['stuf'],
    },
  },
} as const;

// ---------------------------------------------------------------------------
// getDictionary with simple content
// ---------------------------------------------------------------------------

describe('getDictionary – simple content', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = false;
  });

  it('field.value returns the raw string', () => {
    const result = getDictionary(dictWithSimpleContent, 'en');
    expect(result.greeting.value).toBe('Hello World');
  });

  it('field.value returns the raw number', () => {
    const result = getDictionary(dictWithSimpleContent, 'en');
    expect(result.count.value).toBe(42);
  });

  it('field renders as a Fragment', () => {
    const result = getDictionary(dictWithSimpleContent, 'en');
    expect(result.greeting.type).toBe(Fragment);
  });
});

// ---------------------------------------------------------------------------
// getDictionary with insertion (string values)
// ---------------------------------------------------------------------------

describe('getDictionary – insertion with string values', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = false;
  });

  it('insertion returns a function', () => {
    const result = getDictionary(dictWithInsertion, 'en');
    expect(typeof result.greeting).toBe('function');
  });

  it('insertion function returns a string when given string values', () => {
    const result = getDictionary(dictWithInsertion, 'en');
    const rendered = result.greeting({ name: 'World' });
    expect(typeof rendered.value).toBe('string');
    expect(rendered.value).toBe('Hello World');
  });

  it('insertion renders as a Fragment when called with string value', () => {
    const result = getDictionary(dictWithInsertion, 'en');
    const rendered = result.greeting({ name: 'World' });
    expect(rendered.type).toBe(Fragment);
  });
});

// ---------------------------------------------------------------------------
// getDictionary with insertion (React node values)
// ---------------------------------------------------------------------------

describe('getDictionary – insertion with React nodes', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = false;
  });

  it('insertion function accepts React elements as values', () => {
    const result = getDictionary(dictWithMultipleInsertions, 'en');
    const reactNode = createElement('span', {}, '9');
    const rendered = result.message({ stuf: reactNode });
    expect(rendered).toBeDefined();
  });

  it('insertion with React JSX fragment renders correctly', () => {
    const result = getDictionary(dictWithMultipleInsertions, 'en');
    const jsxFragment = createElement(Fragment, {}, '9');
    const rendered = result.message({ stuf: jsxFragment });

    // Should render without converting to [object Object]
    expect(rendered.type).toBe(Fragment);
    // Children should contain the JSX fragment, not a string representation
    expect((rendered.props as any).children).toBeDefined();
  });

  it('insertion preserves React element in rendered output', () => {
    const result = getDictionary(dictWithMultipleInsertions, 'en');
    const reactElement = createElement('strong', {}, 'strong text');
    const rendered = result.message({ stuf: reactElement });

    // The rendered node should be defined
    expect(rendered).toBeDefined();
    // Verify it's a Fragment (from splitAndJoinInsertion)
    expect(rendered.type).toBe(Fragment);
  });

  it('insertion correctly joins string and React elements', () => {
    const result = getDictionary(dictWithMultipleInsertions, 'en');
    const jsxNode = createElement('em', {}, 'emphasized');
    const rendered = result.message({ stuf: jsxNode });

    // Should be defined and be a Fragment
    expect(rendered).toBeDefined();
    expect(rendered.type).toBe(Fragment);
  });

  it('insertion with multiple text parts renders correctly', () => {
    const dict = {
      key: 'test-complex' as const,
      content: {
        template: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: '{{prefix}} - {{middle}} - {{suffix}}',
          fields: ['prefix', 'middle', 'suffix'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const middle = createElement(
      'span',
      { className: 'highlight' },
      'HIGHLIGHTED'
    );
    const rendered = result.template({
      prefix: 'Start',
      middle,
      suffix: 'End',
    });

    // Should render as a Fragment
    expect(rendered).toBeDefined();
    expect(rendered.type).toBe(Fragment);
  });
});

// ---------------------------------------------------------------------------
// getDictionary – insertion with editor enabled
// ---------------------------------------------------------------------------

describe('getDictionary – insertion with editor enabled', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = true;
  });

  it('insertion still works with editor enabled', () => {
    const result = getDictionary(dictWithInsertion, 'en');
    expect(typeof result.greeting).toBe('function');
  });

  it('insertion with React nodes works when editor is enabled', () => {
    const result = getDictionary(dictWithMultipleInsertions, 'en');
    const jsxNode = createElement('strong', {}, 'bold');
    const rendered = result.message({ stuf: jsxNode });
    expect(rendered).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Insertion Node - Comprehensive Test Cases
// ---------------------------------------------------------------------------

describe('getDictionary – insertion comprehensive tests', () => {
  beforeEach(() => {
    mockConfig.editor.enabled = false;
  });

  it('handles empty insertion template', () => {
    const dict = {
      key: 'test-empty' as const,
      content: {
        empty: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: '',
          fields: [],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.empty({});
    expect(rendered.value).toBe('');
  });

  it('handles insertion with no placeholders', () => {
    const dict = {
      key: 'test-no-placeholders' as const,
      content: {
        static: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Just static text',
          fields: [],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.static({});
    expect(rendered.value).toBe('Just static text');
  });

  it('handles insertion with single string value', () => {
    const dict = {
      key: 'test-single-string' as const,
      content: {
        greeting: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Hello {{name}}',
          fields: ['name'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.greeting({ name: 'World' });
    expect(rendered.value).toBe('Hello World');
  });

  it('handles insertion with single number value', () => {
    const dict = {
      key: 'test-single-number' as const,
      content: {
        count: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Count: {{num}}',
          fields: ['num'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.count({ num: 42 });
    expect(rendered.value).toBe('Count: 42');
  });

  it('handles insertion with single React element', () => {
    const dict = {
      key: 'test-single-element' as const,
      content: {
        element: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Content: {{item}}',
          fields: ['item'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const element = createElement('span', {}, 'test');
    const rendered = result.element({ item: element });
    expect(rendered).toBeDefined();
    expect(rendered.type).toBe(Fragment);
  });

  it('handles insertion with multiple different value types', () => {
    const dict = {
      key: 'test-mixed-types' as const,
      content: {
        mixed: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: '{{str}} - {{num}} - {{elem}}',
          fields: ['str', 'num', 'elem'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const element = createElement('em', {}, 'emphasis');
    const rendered = result.mixed({
      str: 'text',
      num: 99,
      elem: element,
    });
    expect(rendered).toBeDefined();
  });

  it('handles insertion with consecutive placeholders', () => {
    const dict = {
      key: 'test-consecutive' as const,
      content: {
        consecutive: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: '{{a}}{{b}}{{c}}',
          fields: ['a', 'b', 'c'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.consecutive({
      a: 'A',
      b: 'B',
      c: 'C',
    });
    expect(rendered.value).toBe('ABC');
  });

  it('handles insertion with special characters in template', () => {
    const dict = {
      key: 'test-special-chars' as const,
      content: {
        special: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Price: ${{price}} ({{currency}})',
          fields: ['price', 'currency'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.special({
      price: '99.99',
      currency: 'USD',
    });
    expect(rendered.value).toBe('Price: $99.99 (USD)');
  });

  it('handles insertion with whitespace in placeholders', () => {
    const dict = {
      key: 'test-whitespace' as const,
      content: {
        whitespace: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Value: {{  key  }}',
          fields: ['key'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const rendered = result.whitespace({ key: 'test' });
    expect(rendered.value).toBe('Value: test');
  });

  it('handles insertion with Fragment containing text', () => {
    const dict = {
      key: 'test-fragment-text' as const,
      content: {
        frag: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Start {{content}} End',
          fields: ['content'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const fragment = createElement(Fragment, null, 'fragment content');
    const rendered = result.frag({ content: fragment });
    expect(rendered.type).toBe(Fragment);
  });

  it('handles insertion with Fragment containing elements', () => {
    const dict = {
      key: 'test-fragment-elements' as const,
      content: {
        frag: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Start {{content}} End',
          fields: ['content'],
        },
      },
    } as const;

    const result = getDictionary(dict, 'en');
    const fragment = createElement(
      Fragment,
      null,
      createElement('b', {}, 'bold'),
      ' and ',
      createElement('i', {}, 'italic')
    );
    const rendered = result.frag({ content: fragment });
    expect(rendered.type).toBe(Fragment);
  });

  it('insertion value property correctly reflects simple vs complex content', () => {
    const dictSimple = {
      key: 'simple' as const,
      content: {
        msg: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Hello {{name}}',
          fields: ['name'],
        },
      },
    } as const;

    const dictComplex = {
      key: 'complex' as const,
      content: {
        msg: {
          nodeType: NodeTypes.INSERTION,
          [NodeTypes.INSERTION]: 'Hello {{name}}',
          fields: ['name'],
        },
      },
    } as const;

    const resultSimple = getDictionary(dictSimple, 'en');
    const renderedSimple = resultSimple.msg({ name: 'World' });
    expect(typeof renderedSimple.value).toBe('string');
    expect(renderedSimple.value).toBe('Hello World');

    const resultComplex = getDictionary(dictComplex, 'en');
    const renderedComplex = resultComplex.msg({
      name: createElement('span', {}, 'React'),
    });
    expect(typeof renderedComplex.value).toBe('string');
  });
});
