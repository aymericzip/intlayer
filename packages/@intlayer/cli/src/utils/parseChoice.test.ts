import { describe, expect, it } from 'vitest';
import { parseChoice } from './parseChoice';

describe('parseChoice', () => {
  const choices = ['Claude', 'Cursor'] as const;

  it('returns the canonical spelling, ignoring case', () => {
    expect(parseChoice('claude', choices, '--platform')).toBe('Claude');
    expect(parseChoice(' CURSOR ', choices, '--platform')).toBe('Cursor');
  });

  it('lists the accepted values on an unknown value', () => {
    expect(() => parseChoice('vim', choices, '--platform')).toThrow(
      'Invalid --platform value "vim". Expected one of: Claude, Cursor.'
    );
  });
});
