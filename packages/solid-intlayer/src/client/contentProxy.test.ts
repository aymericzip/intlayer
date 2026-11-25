import { describe, expect, it } from 'vitest';
import { createContentProxy } from './contentProxy';

describe('createContentProxy', () => {
  it('copies a collection without holes, as Solid 2 <For> does', () => {
    const items = [{ question: 'Q1' }, { question: 'Q2' }];
    const content = createContentProxy(() => items);

    // `<For>` reads its list with `list.slice(0)`
    expect(content.slice(0)).toEqual(items);
    expect(content.map((item) => item.question)).toEqual(['Q1', 'Q2']);
    expect(0 in content).toBe(true);
  });

  it('returns own fields untouched, keeping their properties', () => {
    const titleNode = Object.assign(() => 'Hello', { value: 'Hello' });
    const content = createContentProxy(() => ({ title: titleNode }));

    expect(content.title).toBe(titleNode);
    expect(content.title.value).toBe('Hello');
  });

  it('follows the accessor on every read', () => {
    let title = 'Hello';
    const content = createContentProxy(() => ({ title }));

    title = 'Bonjour';

    expect(content.title).toBe('Bonjour');
    expect((content as unknown as () => { title: string })()).toEqual({
      title: 'Bonjour',
    });
  });

  it('answers nothing for missing content', () => {
    const content = createContentProxy<{ title?: string } | null>(() => null);

    expect(content?.title).toBeUndefined();
    expect('title' in (content as object)).toBe(false);
  });
});
