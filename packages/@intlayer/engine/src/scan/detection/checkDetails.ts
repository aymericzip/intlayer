/** Details of a scan check, split for display. */
export type CheckDetailParts = {
  /** Explanation of the check result. */
  message?: string;
  /** Offending `<a>` elements, as HTML source. */
  links: string[];
  /** Other listed items: issues, hreflang alternates, URLs… */
  items: string[];
};

/**
 * Split the details attached to a scan check into its message, the listed
 * links (HTML source) and the other listed items. Shapes without any of them
 * (bundle summaries, hreflang lists…) return empty lists.
 *
 * @param details - The `success` / `warning` / `error` payload of a check.
 */
export const splitCheckDetails = (details: unknown): CheckDetailParts => {
  if (typeof details === 'string') {
    return { message: details, links: [], items: [] };
  }
  if (Array.isArray(details)) {
    return { links: [], items: details.map(String) };
  }
  if (!details || typeof details !== 'object') return { links: [], items: [] };

  const { message, issues, links, alternates, urls } = details as Record<
    string,
    unknown
  >;
  const listedItems = [issues, alternates, urls].find(Array.isArray) as
    | unknown[]
    | undefined;

  return {
    message: typeof message === 'string' ? message : undefined,
    links: Array.isArray(links)
      ? links.map((link) => String(link).replace(/`{3,4}(?:html)?\n?/g, ''))
      : [],
    items: (listedItems ?? []).map(String),
  };
};

/**
 * Turn the details attached to a scan check into short printable lines: its
 * message, then the listed issues / links / URLs. Shared by the CLI report and
 * the Chrome extension popup.
 *
 * @param details - The `success` / `warning` / `error` payload of a check.
 * @returns The message first, then one line per listed item.
 */
export const getCheckDetailLines = (details: unknown): string[] => {
  const { message, links, items } = splitCheckDetails(details);

  return [...(message ? [message] : []), ...links, ...items];
};
