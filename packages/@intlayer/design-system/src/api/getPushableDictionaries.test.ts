import { describe, expect, it } from 'vitest';
import { getPushableDictionaries } from './getPushableDictionaries';

describe('getPushableDictionaries', () => {
  const dictionaries = [
    { key: 'remote', location: 'remote' as const },
    { key: 'hybrid', location: 'hybrid' as const },
    { key: 'local', location: 'local' as const },
    { key: 'custom', location: 'my-plugin' },
    { key: 'undeclared' },
  ];

  it('keeps remote, hybrid and custom locations', () => {
    expect(getPushableDictionaries(dictionaries).map(({ key }) => key)).toEqual(
      ['remote', 'hybrid', 'custom']
    );
  });

  it('applies the configured location to undeclared dictionaries', () => {
    expect(
      getPushableDictionaries(dictionaries, 'hybrid').map(({ key }) => key)
    ).toEqual(['remote', 'hybrid', 'custom', 'undeclared']);
  });
});
