import { describe, expect, it } from 'vitest';
import type { DetectedTechnology } from '../detector/types';
import { getMigrationDocLinks } from './getMigrationDocLinks';

const createTechnology = (
  technology: Pick<DetectedTechnology, 'id' | 'name' | 'category'>
): DetectedTechnology => ({ ...technology, evidence: 'test' });

describe('getMigrationDocLinks', () => {
  it('links the migration guide of a detected i18n library', () => {
    const links = getMigrationDocLinks([
      createTechnology({
        id: 'next-intl',
        name: 'next-intl',
        category: 'i18n-library',
      }),
      createTechnology({
        id: 'nextjs',
        name: 'Next.js',
        category: 'framework',
      }),
    ]);

    expect(links).toEqual([
      {
        libraryName: 'next-intl',
        url: 'https://intlayer.org/doc/migration/next-intl',
      },
    ]);
  });

  it('deduplicates libraries sharing the same guide', () => {
    const links = getMigrationDocLinks([
      createTechnology({
        id: 'next-intl',
        name: 'next-intl',
        category: 'i18n-library',
      }),
      createTechnology({
        id: 'use-intl',
        name: 'use-intl',
        category: 'i18n-library',
      }),
    ]);

    expect(links).toHaveLength(1);
  });

  it('suggests nothing when Intlayer is already used', () => {
    const links = getMigrationDocLinks([
      createTechnology({
        id: 'intlayer',
        name: 'Intlayer',
        category: 'i18n-library',
      }),
      createTechnology({
        id: 'i18next',
        name: 'i18next',
        category: 'i18n-library',
      }),
    ]);

    expect(links).toEqual([]);
  });

  it('ignores libraries without a guide', () => {
    const links = getMigrationDocLinks([
      createTechnology({ id: 'wpml', name: 'WPML', category: 'i18n-library' }),
    ]);

    expect(links).toEqual([]);
  });
});
