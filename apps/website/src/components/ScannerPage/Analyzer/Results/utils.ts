import type { PageGroup } from './types';

export const normalizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    return parsed.href;
  } catch {
    return url;
  }
};

export const parsePageGroups = (data: any, url: string): PageGroup[] => {
  try {
    const origin = new URL(url).origin;
    const pages = Array.isArray(data?.summary?.pages) ? data.summary.pages : [];

    if (pages.length > 0) {
      const seenDefaults = new Set<string>();
      const seenUrls = new Set<string>();
      return pages
        .map((page: any) => {
          const defaultUrl = normalizeUrl(
            new URL(page?.default ?? '/', origin).href
          );
          // Skip if this default URL was already seen
          if (seenDefaults.has(defaultUrl)) {
            return null;
          }
          seenDefaults.add(defaultUrl);
          seenUrls.add(defaultUrl);
          const alternatesMap = new Map<
            string,
            { hreflang?: string; url: string }
          >();
          Object.entries(page?.alternate || {}).forEach(([hreflang, href]) => {
            const altUrl = normalizeUrl(String(href));
            // Skip if alternate matches default URL or was already seen
            if (altUrl !== defaultUrl && !seenUrls.has(altUrl)) {
              seenUrls.add(altUrl);
              alternatesMap.set(altUrl, { hreflang, url: altUrl });
            }
          });
          return {
            defaultUrl,
            alternates: Array.from(alternatesMap.values()),
          };
        })
        .filter(
          (group: PageGroup | null): group is PageGroup =>
            group !== null && !!group.defaultUrl
        ); // Remove groups with invalid defaultUrl
    }

    // Fallback to discoveredUrls as a single group under the site origin
    const discoveredList: string[] = (
      data?.summary?.discoveredUrls ?? []
    ).filter((url: string) => typeof url === 'string');

    const root = normalizeUrl(new URL('/', origin).href);
    const alternatesMap = new Map<string, { url: string }>();

    discoveredList.forEach((href) => {
      const normalized = normalizeUrl(href);
      if (normalized !== root) {
        alternatesMap.set(normalized, { url: normalized });
      }
    });

    return [
      {
        defaultUrl: root,
        alternates: Array.from(alternatesMap.values()),
      },
    ];
  } catch {
    return [];
  }
};

export const getSelectableUrls = (pageGroups: PageGroup[]): string[] => {
  const set = new Set<string>();
  for (const group of pageGroups) {
    if (group.defaultUrl) set.add(group.defaultUrl);
    for (const alternate of group.alternates) set.add(alternate.url);
  }
  return Array.from(set);
};

export const parseSSEStream = async (
  res: Response,
  onEvent: (evt: any) => void
): Promise<void> => {
  if (!res.body) return;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let buffer = '';

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const parts = buffer.split('\n\n');
    buffer = parts.pop() ?? '';

    for (const chunk of parts) {
      if (!chunk.startsWith('data:')) continue;
      const json = chunk.replace(/^data:\s*/, '');
      try {
        const evt = JSON.parse(json);
        onEvent(evt);
      } catch {
        // ignore
      }
    }
  }
};
