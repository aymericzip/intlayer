import { Button } from '@intlayer/design-system/button';
import { Input } from '@intlayer/design-system/input';
import type { FunctionComponent } from 'preact';
import { useMemo, useState } from 'preact/hooks';
import { useIntlayer } from 'preact-intlayer';
import type { PageDetectionResult } from '../../detector/types';
import { getLocalizedPages } from '../../navigation/pageSearch';
import type { SitemapPages } from '../../navigation/useSitemapPages';

/** Rendering thousands of sitemap rows would freeze the popup. */
const MAX_DISPLAYED_PAGES = 50;

/**
 * Navigates the inspected tab: to a localized version of the current page
 * (hreflang alternates), or to any page of the sitemap via fuzzy search.
 */
export const PageNavigator: FunctionComponent<{
  detection: PageDetectionResult;
  sitemap: SitemapPages;
  onNavigate: (url: string) => void;
}> = ({ detection, sitemap, onNavigate }) => {
  const {
    localizedPagesTitle,
    noLocalizedPages,
    goTo,
    sitemapTitle,
    searchInput,
    loading,
    empty,
    noResults,
    error,
    pageCount,
  } = useIntlayer('page-navigator');
  const [searchQuery, setSearchQuery] = useState('');

  const localizedPages = useMemo(
    () => getLocalizedPages(detection.hreflangs, detection.url),
    [detection.hreflangs, detection.url]
  );

  const matchingPages = useMemo(
    () => sitemap.searchPages(searchQuery, MAX_DISPLAYED_PAGES),
    [sitemap.searchPages, searchQuery]
  );

  const renderSitemapState = () => {
    if (sitemap.status === 'loading') return loading;
    if (sitemap.status === 'error') return error;
    if (sitemap.status === 'loaded' && sitemap.pageCount === 0) return empty;
    if (sitemap.status === 'loaded' && matchingPages.length === 0) {
      return noResults;
    }

    return null;
  };

  const sitemapState = renderSitemapState();

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="mt-0 mb-1.5 font-semibold text-neutral text-xs">
          {localizedPagesTitle}
        </h3>
        {localizedPages.length === 0 ? (
          <p className="m-0 text-neutral text-xs">{noLocalizedPages}</p>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {localizedPages.map(({ hreflang, url, isCurrent }) => (
              <Button
                key={url}
                label={`${goTo.value} ${url}`}
                title={url}
                variant={isCurrent ? 'default' : 'outline'}
                color="text"
                size="sm"
                roundedSize="full"
                disabled={isCurrent}
                onClick={() => onNavigate(url)}
              >
                {hreflang}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="mt-0 mb-1.5 font-semibold text-neutral text-xs">
          {sitemapTitle}
        </h3>
        <Input
          type="search"
          size="sm"
          value={searchQuery}
          placeholder={searchInput.placeholder.value}
          aria-label={searchInput.ariaLabel.value}
          onFocus={sitemap.loadSitemap}
          onChange={(event) => {
            sitemap.loadSitemap();
            setSearchQuery(event.currentTarget.value);
          }}
        />

        {sitemapState && (
          <p className="mt-2 mb-0 text-neutral text-xs">{sitemapState}</p>
        )}

        {matchingPages.length > 0 && (
          <>
            <ul className="m-0 mt-2 max-h-48 list-none divide-y divide-dashed divide-text/20 overflow-y-auto p-0">
              {matchingPages.map(({ url, path }) => (
                <li key={url} className="py-0.5">
                  <Button
                    label={`${goTo.value} ${url}`}
                    title={url}
                    variant="hoverable"
                    color="text"
                    size="sm"
                    isFullWidth
                    textAlign="left"
                    disabled={url === detection.url}
                    onClick={() => onNavigate(url)}
                  >
                    <span className="block truncate font-mono text-[11px]">
                      {path}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
            <p className="mt-1 mb-0 text-right text-[11px] text-neutral">
              {pageCount({
                shown: matchingPages.length,
                total: sitemap.pageCount,
              })}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
