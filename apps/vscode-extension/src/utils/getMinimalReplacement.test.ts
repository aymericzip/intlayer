import { describe, expect, it } from 'vitest';
import { getMinimalReplacement } from './getMinimalReplacement';

const apply = (
  text: string,
  { start, end, text: replacement }: ReturnType<typeof getMinimalReplacement>
): string => text.slice(0, start) + replacement + text.slice(end);

describe('getMinimalReplacement', () => {
  it('replaces only the changed span', () => {
    const previous = '<h1>My title</h1>';
    const next = '<h1>{content.myTitle}</h1>';
    const replacement = getMinimalReplacement(previous, next);

    expect(replacement).toEqual({
      start: 4,
      end: 12,
      text: '{content.myTitle}',
    });
    expect(apply(previous, replacement)).toBe(next);
  });

  it('handles insertions sharing characters with their surroundings', () => {
    const previous = 'aaa';
    const next = 'aaaa';

    expect(apply(previous, getMinimalReplacement(previous, next))).toBe(next);
  });

  it('returns an empty edit for identical texts', () => {
    expect(getMinimalReplacement('same', 'same')).toEqual({
      start: 4,
      end: 4,
      text: '',
    });
  });
});
