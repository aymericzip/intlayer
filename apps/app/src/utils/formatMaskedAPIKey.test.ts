import { describe, expect, it } from 'vitest';
import { formatMaskedAPIKey } from './formatMaskedAPIKey';

describe('formatMaskedAPIKey', () => {
  it('collapses the asterisk run into an ellipsis', () => {
    expect(formatMaskedAPIKey(`sk-proj-${'*'.repeat(150)}vLcA`)).toBe(
      'sk-proj-...vLcA'
    );
  });

  it('collapses a fully masked short key', () => {
    expect(formatMaskedAPIKey('********')).toBe('...');
  });

  it('leaves a key without asterisks untouched', () => {
    expect(formatMaskedAPIKey('sk-proj-abc')).toBe('sk-proj-abc');
  });
});
