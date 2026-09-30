import { describe, expect, it } from 'vitest';
import { createOffsetToPosition } from './textPosition';

describe('createOffsetToPosition', () => {
  const text = 'first\nsecond line\n\nlast';
  const offsetToPosition = createOffsetToPosition(text);

  it('maps offsets on the first line', () => {
    expect(offsetToPosition(0)).toEqual({ line: 0, character: 0 });
    expect(offsetToPosition(3)).toEqual({ line: 0, character: 3 });
  });

  it('maps the newline character to the end of its line', () => {
    expect(offsetToPosition(5)).toEqual({ line: 0, character: 5 });
  });

  it('maps offsets on following and empty lines', () => {
    expect(offsetToPosition(6)).toEqual({ line: 1, character: 0 });
    expect(offsetToPosition(13)).toEqual({ line: 1, character: 7 });
    expect(offsetToPosition(18)).toEqual({ line: 2, character: 0 });
    expect(offsetToPosition(19)).toEqual({ line: 3, character: 0 });
  });

  it('maps the end of the text', () => {
    expect(offsetToPosition(text.length)).toEqual({ line: 3, character: 4 });
  });

  it('handles text without newline', () => {
    expect(createOffsetToPosition('abc')(2)).toEqual({
      line: 0,
      character: 2,
    });
  });
});
