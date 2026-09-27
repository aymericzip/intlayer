import { Website_Origin } from '@intlayer/design-system/routes';
import type { DetectedTechnology } from '../detector/types';

/** Doc path of each i18n library with a dedicated migration or compat guide. */
const MIGRATION_DOC_PATHS: Readonly<Record<string, string>> = {
  i18next: '/doc/migration/i18next',
  'react-i18next': '/doc/migration/react-i18next',
  'next-i18next': '/doc/migration/next-i18next',
  'next-intl': '/doc/migration/next-intl',
  'use-intl': '/doc/migration/next-intl',
  'vue-i18n': '/doc/migration/vue-i18n',
  'nuxt-i18n': '/doc/migration/nuxtjs-i18n',
  'react-intl': '/doc/compatibility/react-intl',
  lingui: '/doc/compatibility/lingui',
  'svelte-i18n': '/doc/compatibility/svelte-i18n',
  'ngx-translate': '/doc/compatibility/ngx-translate',
};

/** A migration guide suggested for a detected i18n library. */
export type MigrationDocLink = {
  /** Display name of the detected library. */
  libraryName: string;
  /** Absolute URL of the migration guide on the Intlayer website. */
  url: string;
};

/**
 * Migration guides for the detected i18n libraries, deduplicated by URL.
 * Empty when Intlayer is already used or no library has a guide.
 */
export const getMigrationDocLinks = (
  technologies: readonly DetectedTechnology[]
): MigrationDocLink[] => {
  if (technologies.some((technology) => technology.id === 'intlayer')) {
    return [];
  }

  const linksByUrl = new Map<string, MigrationDocLink>();

  for (const technology of technologies) {
    if (technology.category !== 'i18n-library') continue;

    const docPath = MIGRATION_DOC_PATHS[technology.id];

    if (!docPath) continue;

    const url = `${Website_Origin}${docPath}`;

    if (!linksByUrl.has(url)) {
      linksByUrl.set(url, { libraryName: technology.name, url });
    }
  }

  return [...linksByUrl.values()];
};
