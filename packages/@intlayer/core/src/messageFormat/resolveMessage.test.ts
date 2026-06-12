import { describe, expect, it } from 'vitest';
import { enu, gender, insert, plural } from '../transpiler';
import {
  interpolateMessage,
  parseTaggedMessage,
  resolveMessage,
  resolveMessageNode,
} from './resolveMessage';

describe('interpolateMessage', () => {
  it('should interpolate double-brace insertions', () => {
    expect(interpolateMessage('Hello {{name}}!', { name: 'John' })).toBe(
      'Hello John!'
    );
  });

  it('should tolerate whitespace inside braces', () => {
    expect(interpolateMessage('Hello {{ name }}!', { name: 'John' })).toBe(
      'Hello John!'
    );
  });

  it('should resolve dotted paths', () => {
    expect(
      interpolateMessage('Hello {{user.name}}!', { user: { name: 'John' } })
    ).toBe('Hello John!');
  });

  it('should interpolate single-brace ICU arguments', () => {
    expect(interpolateMessage('Hello {name}!', { name: 'John' })).toBe(
      'Hello John!'
    );
  });

  it('should keep unresolved placeholders untouched', () => {
    expect(interpolateMessage('Hello {{name}}!', {})).toBe('Hello {{name}}!');
    expect(interpolateMessage('Hello {name}!', {})).toBe('Hello {name}!');
  });

  it('should format ICU number arguments', () => {
    expect(
      interpolateMessage('Total: {value, number}', { value: 1234.5 }, 'en')
    ).toBe('Total: 1,234.5');
  });

  it('should format ICU percent style', () => {
    expect(
      interpolateMessage('Rate: {value, number, percent}', { value: 0.5 }, 'en')
    ).toBe('Rate: 50%');
  });
});

describe('resolveMessageNode', () => {
  it('should resolve insertion nodes', () => {
    expect(
      resolveMessageNode(insert('Hi {{name}}'), { name: 'Ana' }, 'en')
    ).toBe('Hi Ana');
  });

  it('should resolve plural nodes with CLDR categories', () => {
    const node = plural({
      one: '{{count}} item',
      other: '{{count}} items',
    });
    expect(resolveMessageNode(node, { count: 1 }, 'en')).toBe('1 item');
    expect(resolveMessageNode(node, { count: 4 }, 'en')).toBe('4 items');
  });

  it('should resolve enumeration nodes with numeric selector', () => {
    const node = enu({
      '0': 'none',
      '1': 'one item',
      fallback: '{{count}} items',
    });
    expect(resolveMessageNode(node, { count: 0 }, 'en')).toBe('none');
    expect(resolveMessageNode(node, { count: 5 }, 'en')).toBe('5 items');
  });

  it('should resolve gender nodes', () => {
    const node = gender({
      male: 'He',
      female: 'She',
      fallback: 'They',
    });
    expect(resolveMessageNode(node, { gender: 'female' }, 'en')).toBe('She');
    expect(resolveMessageNode(node, {}, 'en')).toBe('They');
  });

  it('should invoke interpreter-produced function nodes', () => {
    const functionNode = (values: Record<string, unknown>) =>
      `Hello ${values.name}`;
    expect(resolveMessageNode(functionNode, { name: 'John' }, 'en')).toBe(
      'Hello John'
    );
  });
});

describe('resolveMessage', () => {
  it('should resolve ICU plural messages', () => {
    expect(
      resolveMessage(
        '{count, plural, one {# item} other {# items}}',
        { count: 3 },
        'en',
        'icu'
      )
    ).toBe('3 items');
  });

  it('should resolve ICU plural with exact matches', () => {
    expect(
      resolveMessage(
        '{count, plural, =0 {no items} one {# item} other {# items}}',
        { count: 0 },
        'en',
        'icu'
      )
    ).toBe('no items');
  });

  it('should resolve ICU selectordinal messages', () => {
    const message =
      '{position, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}';
    expect(resolveMessage(message, { position: 1 }, 'en', 'icu')).toBe('1st');
    expect(resolveMessage(message, { position: 2 }, 'en', 'icu')).toBe('2nd');
    expect(resolveMessage(message, { position: 3 }, 'en', 'icu')).toBe('3rd');
    expect(resolveMessage(message, { position: 4 }, 'en', 'icu')).toBe('4th');
    expect(resolveMessage(message, { position: 11 }, 'en', 'icu')).toBe('11th');
    expect(resolveMessage(message, { position: 21 }, 'en', 'icu')).toBe('21st');
  });

  it('should resolve ICU selectordinal exact matches first', () => {
    const message =
      '{position, selectordinal, =1 {first!} two {#nd} other {#th}}';
    expect(resolveMessage(message, { position: 1 }, 'en', 'icu')).toBe(
      'first!'
    );
    expect(resolveMessage(message, { position: 2 }, 'en', 'icu')).toBe('2nd');
  });

  it('should resolve ICU select messages', () => {
    expect(
      resolveMessage(
        '{gender, select, male {He} female {She} other {They}}',
        { gender: 'male' },
        'en',
        'icu'
      )
    ).toBe('He');
  });

  it('should resolve i18next interpolation', () => {
    expect(
      resolveMessage('Hello {{name}}!', { name: 'John' }, 'en', 'i18next')
    ).toBe('Hello John!');
  });

  it('should resolve vue-i18n named interpolation', () => {
    expect(
      resolveMessage('Hello {name}!', { name: 'John' }, 'en', 'vue-i18n')
    ).toBe('Hello John!');
  });

  it('should resolve vue-i18n pipe plurals', () => {
    expect(resolveMessage('car | cars', { count: 1 }, 'en', 'vue-i18n')).toBe(
      'car'
    );
    expect(resolveMessage('car | cars', { count: 2 }, 'en', 'vue-i18n')).toBe(
      'cars'
    );
  });

  it('should return plain strings unchanged when no syntax matches', () => {
    expect(resolveMessage('Just text', {}, 'en', 'icu')).toBe('Just text');
  });
});

describe('parseTaggedMessage', () => {
  it('should tokenize tags with text around them', () => {
    expect(parseTaggedMessage('Visit <link>the docs</link> now')).toEqual([
      'Visit ',
      { tag: 'link', children: ['the docs'] },
      ' now',
    ]);
  });

  it('should tokenize numbered tags', () => {
    expect(parseTaggedMessage('hello <1>world</1>')).toEqual([
      'hello ',
      { tag: '1', children: ['world'] },
    ]);
  });

  it('should tokenize self-closing tags', () => {
    expect(parseTaggedMessage('line<br/>break')).toEqual([
      'line',
      { tag: 'br', children: [] },
      'break',
    ]);
  });

  it('should tokenize nested tags', () => {
    expect(parseTaggedMessage('<b>bold <i>italic</i></b>')).toEqual([
      { tag: 'b', children: ['bold ', { tag: 'i', children: ['italic'] }] },
    ]);
  });

  it('should return a single text token for plain messages', () => {
    expect(parseTaggedMessage('plain text')).toEqual(['plain text']);
  });
});
