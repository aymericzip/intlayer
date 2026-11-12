// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { toStructuredVariantFields } from './StructuredVariantFieldsEditor';

describe('toStructuredVariantFields', () => {
  it('drops unnamed rows and keeps numeric fields as numbers', () => {
    expect(
      toStructuredVariantFields([
        { name: 'id', value: 'apple-watch', isNumber: false },
        { name: ' seats ', value: '3', isNumber: true },
        { name: '', value: 'orphan', isNumber: false },
        { name: 'zip', value: '0123', isNumber: false },
      ])
    ).toEqual({ id: 'apple-watch', seats: 3, zip: '0123' });
  });

  it('falls back to a string once a number field is no longer numeric', () => {
    expect(
      toStructuredVariantFields([
        { name: 'seats', value: 'many', isNumber: true },
      ])
    ).toEqual({ seats: 'many' });
  });
});
