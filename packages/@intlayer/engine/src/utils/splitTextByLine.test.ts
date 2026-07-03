import { describe, expect, it } from 'vitest';
import { splitTextByLines } from './splitTextByLine';

describe('splitTextByLines', () => {
  it('splits text by lines', () => {
    const lines = splitTextByLines('Here a test. \nAnd another one.');

    expect(lines).toStrictEqual(['Here a test. \n', 'And another one.']);
  });

  it('splits text by lines with no trailing newline', () => {
    const lines = splitTextByLines('Here a test. \n');

    expect(lines).toStrictEqual(['Here a test. \n']);
  });
});
