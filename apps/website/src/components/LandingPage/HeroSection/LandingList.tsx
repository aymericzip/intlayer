import { getPathWithoutLocale } from '@intlayer/core/localization';
import {
  External_AI_Landing_Page,
  Website_CMS_Path,
  Website_Home_Path,
  Website_Markdown_Path,
  Website_TMS_Path,
  Website_Translate_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

/**
 * Products advertised in the strip, in display order. `contentKey` points at
 * the matching label of the `landing-list` dictionary.
 */
const products = [
  { contentKey: 'cms', route: Website_CMS_Path },
  { contentKey: 'tms', route: Website_TMS_Path },
  { contentKey: 'abTest', route: External_AI_Landing_Page },
  { contentKey: 'i18nLib', route: Website_Home_Path },
  { contentKey: 'cli', route: Website_Translate_Path },
  { contentKey: 'markdown', route: Website_Markdown_Path },
] as const;

/** Drops the trailing slash so `/cms/` and `/cms` compare equal. */
const normalizePath = (path: string): string =>
  path.length > 1 ? path.replace(/\/+$/, '') || Website_Home_Path : path;

export const LandingList: FC = () => {
  const content = useIntlayer('landing-list');
  const { availableLocales } = useLocale();
  const { pathname } = useLocation();

  const currentPath = normalizePath(
    getPathWithoutLocale(pathname, availableLocales)
  );

  // The loop scrolls a single track, so the list is rendered twice: the second
  // pass is what fills the gap the first one leaves as it slides out.
  const renderProducts = (pass: 1 | 2) =>
    products.map(({ contentKey, route }) => {
      const label = content[contentKey];
      const isActive = normalizePath(route) === currentPath;

      return (
        <div
          key={`${contentKey}-${pass}`}
          className="mx-6 py-0.5 sm:mx-12 md:mx-16"
        >
          <Link
            to={route}
            label={label.value}
            isActive={isActive}
            isExternalLink={false}
            color="custom"
            className={cn(
              'font-mono text-xs uppercase tracking-wider transition-colors duration-200 sm:text-sm md:text-base',
              isActive ? 'text-text' : 'text-text/60 hover:text-text'
            )}
          >
            {label}
          </Link>
        </div>
      );
    });

  return (
    <nav
      aria-label={content.ariaLabel.value}
      className="mask-[linear-gradient(to_right,transparent_0,black_170px,black_calc(100%-170px),transparent_100%)] w-full overflow-hidden"
    >
      <div className="horizontal-loop-4 inline-flex items-center whitespace-nowrap">
        {renderProducts(1)}
        {renderProducts(2)}
      </div>
    </nav>
  );
};
