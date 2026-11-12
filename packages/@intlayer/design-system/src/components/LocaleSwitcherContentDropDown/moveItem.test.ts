import { describe, expect, it } from 'vitest';
import { moveItem } from './moveItem';

describe('moveItem', () => {
  it('moves an item forward to the target index', () => {
    expect(moveItem(['en', 'fr', 'es'], 'en', 'es')).toEqual([
      'fr',
      'es',
      'en',
    ]);
  });

  it('moves an item backward to the target index', () => {
    expect(moveItem(['en', 'fr', 'es'], 'es', 'en')).toEqual([
      'es',
      'en',
      'fr',
    ]);
  });

  it('leaves the list unchanged for unknown items', () => {
    expect(moveItem(['en', 'fr'], 'de', 'en')).toEqual(['en', 'fr']);
    expect(moveItem(['en', 'fr'], 'en', 'de')).toEqual(['en', 'fr']);
  });
});
