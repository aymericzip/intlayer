/** Rules of a `robots.txt` that apply to Google's crawler. */
export type ParsedRobots = {
  /** `Disallow` paths of the group applying to Googlebot (or `*`). */
  disallowedPaths: string[];
  /** `Allow` paths of the same group. */
  allowedPaths: string[];
  /** Absolute URLs declared with `Sitemap:` directives. */
  sitemapUrls: string[];
};

type RobotsGroup = {
  userAgents: string[];
  disallowedPaths: string[];
  allowedPaths: string[];
};

/**
 * Parse a `robots.txt`, keeping the rules Googlebot would follow: the
 * `googlebot` group when one exists, the `*` group otherwise.
 */
export const parseRobots = (content: string): ParsedRobots => {
  const groups: RobotsGroup[] = [];
  const sitemapUrls: string[] = [];
  let currentGroup: RobotsGroup | undefined;
  let isReadingUserAgents = false;

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) continue;

    const directive = line.slice(0, separatorIndex).trim().toLowerCase();
    const value = line.slice(separatorIndex + 1).trim();

    if (directive === 'sitemap') {
      if (value) sitemapUrls.push(value);
      continue;
    }

    if (directive === 'user-agent') {
      if (!isReadingUserAgents || !currentGroup) {
        currentGroup = {
          userAgents: [],
          disallowedPaths: [],
          allowedPaths: [],
        };
        groups.push(currentGroup);
      }
      currentGroup.userAgents.push(value.toLowerCase());
      isReadingUserAgents = true;
      continue;
    }

    isReadingUserAgents = false;
    if (!currentGroup || !value) continue;
    if (directive === 'disallow') currentGroup.disallowedPaths.push(value);
    if (directive === 'allow') currentGroup.allowedPaths.push(value);
  }

  const googlebotGroups = groups.filter(({ userAgents }) =>
    userAgents.includes('googlebot')
  );
  const applicableGroups =
    googlebotGroups.length > 0
      ? googlebotGroups
      : groups.filter(({ userAgents }) => userAgents.includes('*'));

  return {
    disallowedPaths: applicableGroups.flatMap(
      ({ disallowedPaths }) => disallowedPaths
    ),
    allowedPaths: applicableGroups.flatMap(({ allowedPaths }) => allowedPaths),
    sitemapUrls,
  };
};

/** Convert a robots.txt path pattern (`*`, `$`) into a RegExp. */
const robotsPatternToRegExp = (pattern: string): RegExp =>
  new RegExp(
    `^${pattern
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, '.*')
      .replace(/\\\$$/, '$')}`
  );

/**
 * Whether Googlebot may crawl `pathWithSearch` (path + query string) under the
 * parsed rules. Follows Google's precedence: the longest matching rule wins,
 * `Allow` wins ties.
 */
export const isPathAllowedByRobots = (
  pathWithSearch: string,
  robots: Pick<ParsedRobots, 'disallowedPaths' | 'allowedPaths'>
): boolean => {
  const longestMatch = (patterns: string[]): number =>
    patterns.reduce(
      (longest, pattern) =>
        robotsPatternToRegExp(pattern).test(pathWithSearch)
          ? Math.max(longest, pattern.length)
          : longest,
      -1
    );

  const disallowLength = longestMatch(robots.disallowedPaths);
  if (disallowLength === -1) return true;
  return longestMatch(robots.allowedPaths) >= disallowLength;
};
