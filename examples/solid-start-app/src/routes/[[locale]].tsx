import type { RouteSectionProps } from '@solidjs/router';
import { locales } from 'intlayer';

/**
 * Layout of the optional `[[locale]]` segment. It renders nothing of its own —
 * its only job is to constrain the segment to a configured locale.
 *
 * `@solidjs/router` expands `[[locale]]` (`:locale?`) into two patterns, with
 * and without the segment, and tries them by descending specificity. Without a
 * filter, `/unknown` would match `:locale` and silently render the home page;
 * with it, the match fails and the router falls through to the catch-all 404.
 */
export const route = {
  matchFilters: {
    locale: locales,
  },
};

export default function LocaleLayout(props: RouteSectionProps) {
  return <>{props.children}</>;
}
