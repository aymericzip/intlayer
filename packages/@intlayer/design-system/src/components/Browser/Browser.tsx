'use client';

import { Container } from '@components/Container';
import { cn } from '@utils/cn';
import { ArrowLeft, ArrowRight, RotateCw, ScanSearch } from 'lucide-react';
import {
  type CSSProperties,
  type HTMLAttributes,
  type RefObject,
  type SubmitEvent,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';
import { ClickOutsideDiv } from '../ClickOutsideDiv';
import { DropDown } from '../DropDown';
import { Input, inputVariants } from '../Input';

export type BrowserProps = {
  initialUrl?: string;
  path?: string;
  className?: string;
  style?: CSSProperties;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  'aria-label'?: string;
  sandbox?: string;
  ref?: RefObject<HTMLIFrameElement | null>;
  domainRestriction?: string;
} & HTMLAttributes<HTMLIFrameElement>;

const UrlPath = ({ url }: { url: string }) => {
  const parts = getUrlPath(url).split('/').filter(Boolean);

  if (parts.length === 0) return <span>/</span>;

  return parts.flatMap((part, index, array) => [
    <span key={`part-${index}`}>{part}</span>,
    index < array.length - 1 && (
      <span key={`sep-${index}`} className="mx-2 text-neutral">
        /
      </span>
    ),
  ]);
};

const getUrlPath = (url: string) => {
  try {
    const { pathname, search, hash } = new URL(url);

    return `${pathname}${search}${hash}` || '/';
  } catch {
    return url;
  }
};

export const Browser = ({
  initialUrl = 'https://example.com',
  path,
  className,
  style,
  size = 'md',
  'aria-label': ariaLabel,
  sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads',
  ref,
  domainRestriction,
  ...props
}: BrowserProps) => {
  // --- State -----------------------------------------------------------------
  const [inputUrl, setInputUrl] = useState(initialUrl);
  const [currentUrl, setCurrentUrl] = useState(initialUrl);

  // History Management
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const internalIframeRef = useRef<HTMLIFrameElement>(null);

  // Sitemap explorer state
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [sitemapUrls, setSitemapUrls] = useState<string[]>([]);
  const [sitemapSearch, setSitemapSearch] = useState('');
  const [sitemapLoading, setSitemapLoading] = useState(false);
  const [sitemapFetched, setSitemapFetched] = useState(false);
  const [sitemapError, setSitemapError] = useState(false);
  const sitemapInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => internalIframeRef.current!, []);
  const content = useIntlayer('browser');

  // --- Effects ---------------------------------------------------------------

  // Reset everything if initialUrl changes completely
  useEffect(() => {
    setInputUrl(initialUrl);
    setCurrentUrl(initialUrl);
    setHistory([initialUrl]);
    setCurrentIndex(0);
    setError(null);
    setSubmitted(false);
    setSitemapOpen(false);
    setSitemapUrls([]);
    setSitemapSearch('');
    setSitemapFetched(false);
    setSitemapError(false);
  }, [initialUrl]);

  // Sync external path changes with the URL bar and History
  useEffect(() => {
    if (!path) return;

    try {
      const baseOrigin = domainRestriction ?? initialUrl;
      const origin = new URL(baseOrigin).origin;
      const fullUrl = `${origin}${path}`;

      // Update Input (Always update the visual bar)
      setInputUrl(fullUrl);

      // Check internal iframe state to avoid reload if already there
      let isAlreadyAtUrl = false;
      if (internalIframeRef.current?.contentWindow) {
        try {
          const currentIframeHref =
            internalIframeRef.current.contentWindow.location.href;
          if (new URL(currentIframeHref).href === new URL(fullUrl).href) {
            isAlreadyAtUrl = true;
          }
        } catch {
          // Cross-origin access ignored
        }
      }

      // Update History Stack regardless of isAlreadyAtUrl so arrow navigation is always correct
      if (history[currentIndex] !== fullUrl) {
        setHistory((prev) => {
          const newHistory = prev.slice(0, currentIndex + 1);
          newHistory.push(fullUrl);
          return newHistory;
        });
        setCurrentIndex((prev) => prev + 1);
      }

      // Navigate only if NOT already there to avoid refreshing on internal iframe navigation
      if (!isAlreadyAtUrl) {
        setCurrentUrl(fullUrl);
      }

      setError(null);
    } catch {
      // Ignore invalid paths
    }
  }, [path, domainRestriction, initialUrl]); // Removed currentIndex dependency to prevent loops

  // Imperatively keep the iframe src in sync with currentUrl.
  // React's attribute reconciliation can be unreliable for cross-origin iframes after
  // internal navigation, so this effect is the source of truth for navigation.
  useEffect(() => {
    const iframe = internalIframeRef.current;
    if (!iframe) return;
    if (iframe.src !== currentUrl) {
      iframe.src = currentUrl;
    }
  }, [currentUrl]);

  // --- Navigation Logic ------------------------------------------------------

  const handleNavigateTo = (url: string) => {
    try {
      const validated = normalizeUrl(url);

      // If we are navigating to the exact same URL, just reload
      if (validated === currentUrl) {
        handleReload();
        return;
      }

      setCurrentUrl(validated);
      setInputUrl(validated);
      setError(null);

      // Update History: Slice future if we went back, then push new
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(validated);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    } catch (e) {
      if (
        e instanceof Error &&
        e.message === 'URL does not match allowed domain' &&
        domainRestriction
      ) {
        setError(
          content.domainRestrictionError?.value ??
            `Only URLs from ${domainRestriction} are allowed.`
        );
      } else {
        setError(content.errorMessage.value);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const prevUrl = history[newIndex];
      setCurrentIndex(newIndex);
      setCurrentUrl(prevUrl);
      setInputUrl(prevUrl);
      setError(null);
    }
  };

  const handleForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      const nextUrl = history[newIndex];
      setCurrentIndex(newIndex);
      setCurrentUrl(nextUrl);
      setInputUrl(nextUrl);
      setError(null);
    }
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    handleNavigateTo(inputUrl);
  };

  const handleReload = () => {
    const iframe = internalIframeRef.current;
    if (!iframe) return;
    const src = iframe.src;
    iframe.src = '';
    setTimeout(() => {
      if (internalIframeRef.current) internalIframeRef.current.src = src;
    }, 50);
  };

  // --- Validation Helpers ----------------------------------------------------
  const isValidHostname = (host: string) => {
    if (host === 'localhost') return true;
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return true;
    if (/^[a-f0-9:]+$/i.test(host)) return true;
    if (!/^[a-z0-9.-]+$/i.test(host)) return false;
    if (/^[-.]/.test(host) || /[-.]$/.test(host)) return false;
    if (host.includes('..')) return false;
    if (!host.includes('.')) return false;
    return true;
  };

  const getRestrictionOrigin = (): URL | null => {
    if (!domainRestriction) return null;
    try {
      return new URL(domainRestriction);
    } catch {
      return null;
    }
  };

  const normalizeUrl = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed || /\s/.test(trimmed)) throw new Error('Invalid');

    const restrictionOrigin = getRestrictionOrigin();
    const isRelativePath = trimmed.startsWith('/') && !trimmed.startsWith('//');

    if (isRelativePath) {
      if (restrictionOrigin) {
        return new URL(`${restrictionOrigin.origin}${trimmed}`).toString();
      }
      return new URL(`${new URL(currentUrl).origin}${trimmed}`).toString();
    }

    const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed);
    const candidate = hasProtocol ? trimmed : `https://${trimmed}`;
    const url = new URL(candidate);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error('Only http(s) is allowed');
    }

    if (!isValidHostname(url.hostname)) throw new Error('Invalid host');

    if (restrictionOrigin) {
      const urlMatches =
        url.hostname === restrictionOrigin.hostname &&
        url.protocol === restrictionOrigin.protocol &&
        (restrictionOrigin.port === '' ||
          url.port === restrictionOrigin.port ||
          url.host === restrictionOrigin.host);

      if (!urlMatches) throw new Error('URL does not match allowed domain');
    }

    return url.toString();
  };

  const handleSitemapToggle = async () => {
    const nextOpen = !sitemapOpen;
    setSitemapOpen(nextOpen);

    if (nextOpen && !sitemapFetched) {
      setSitemapLoading(true);
      setSitemapError(false);
      setSitemapFetched(true);
      try {
        const { extractUrlFromSitemap } = await import(
          './extractUrlFromSitemap'
        );
        const urls = await extractUrlFromSitemap(currentUrl);
        setSitemapUrls(urls);
        if (urls.length === 0) setSitemapError(false);
      } catch {
        setSitemapError(true);
      } finally {
        setSitemapLoading(false);
      }
      setTimeout(() => sitemapInputRef.current?.focus(), 50);
    }
  };

  const filteredSitemapUrls = useMemo(() => {
    const query = sitemapSearch.trim().toLowerCase();
    if (!query) return sitemapUrls;
    return sitemapUrls.filter((url) => url.toLowerCase().includes(query));
  }, [sitemapUrls, sitemapSearch]);

  const showError = submitted && !!error;
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return (
    <section
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-xl bg-background shadow-[0_4px_12px_rgba(0,0,0,0.4),0_0_1px_rgba(0,0,0,0.2)]',
        className
      )}
      style={style}
      aria-label={ariaLabel ?? content.ariaLabel.value}
    >
      {/* Top bar */}
      <div className="relative z-10 flex shrink-0 items-center gap-3 rounded-t-xl bg-text/15 px-4 py-2">
        {/* Navigation Controls */}
        <div className="flex items-center gap-1">
          <Button
            type="button"
            onClick={handleBack}
            disabled={!canGoBack}
            variant="hoverable"
            size="icon-md"
            label={content.backButtonLabel.value}
            Icon={ArrowLeft}
          />
          <Button
            type="button"
            onClick={handleForward}
            disabled={!canGoForward}
            variant="hoverable"
            size="icon-md"
            label={content.forwardButtonLabel.value}
            Icon={ArrowRight}
          />
        </div>

        {/* URL Bar */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className={cn(
            inputVariants(),
            'flex w-full gap-2 rounded-xl p-0.5! supports-[corner-shape:squircle]:rounded-2xl',
            'bg-neutral/10 text-text/50 placeholder:text-neutral/80'
          )}
        >
          <label htmlFor="browser-url" className="sr-only">
            {content.urlLabel}
          </label>
          <Input
            id="browser-url"
            type="text"
            inputMode="url"
            spellCheck={false}
            autoCapitalize="off"
            variant="invisible"
            className="ml-3 p-0!"
            size="sm"
            autoCorrect="off"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              if (showError) setError(null);
            }}
            placeholder={content.urlPlaceholder.value}
            aria-label={content.urlLabel.value}
            aria-invalid={showError}
            aria-describedby={showError ? 'browser-url-error' : undefined}
          />

          <Button
            type="button"
            onClick={handleReload}
            variant="hoverable"
            size="icon-md"
            className="p-1!"
            label={'content.reloadButtonTitle.value'}
            Icon={RotateCw}
          />

          {/* invisible submit */}
          <button type="submit" className="sr-only absolute" tabIndex={-1} />
        </form>

        {/* Sitemap Explorer */}
        <ClickOutsideDiv
          onClickOutSide={() => setSitemapOpen(false)}
          disabled={!sitemapOpen}
          role="none"
        >
          <DropDown identifier="sitemap-explorer">
            <DropDown.Trigger
              identifier="sitemap-explorer-trigger"
              type="button"
              color="text"
              onClick={handleSitemapToggle}
              variant="hoverable"
              size="icon-md"
              label={content.sitemapButtonLabel.value}
              Icon={ScanSearch}
            />

            <DropDown.Panel
              identifier="sitemap-explorer"
              isHidden={!sitemapOpen}
              align="end"
              isFocusable
              isOverable
            >
              <Container
                className="min-w-28 rounded-md!"
                roundedSize="sm"
                border
                borderColor="neutral"
              >
                <div className="p-2">
                  <Input
                    type="search"
                    ref={sitemapInputRef}
                    aria-label={content.sitemapSearchAriaLabel.value}
                    placeholder={content.sitemapSearchPlaceholder.value}
                    onChange={(e) => setSitemapSearch(e.target.value)}
                    value={sitemapSearch}
                    size="sm"
                  />
                </div>
                <ul
                  className="max-h-64 divide-y divide-dotted divide-neutral/30 overflow-y-auto p-1 text-center"
                  aria-label={content.sitemapButtonLabel.value}
                >
                  {sitemapLoading ? (
                    <li className="px-3 py-4 text-center text-neutral text-xs">
                      {content.sitemapLoading}
                    </li>
                  ) : sitemapError ||
                    (!sitemapLoading && filteredSitemapUrls.length === 0) ? (
                    <li className="px-3 py-4 text-center text-neutral text-xs">
                      {sitemapError
                        ? content.sitemapError
                        : content.sitemapEmpty}
                    </li>
                  ) : (
                    filteredSitemapUrls.map((url) => (
                      <li key={url} className="py-0.5">
                        <Button
                          variant="hoverable"
                          color="text"
                          size="sm"
                          className="w-full text-left"
                          label={url}
                          onClick={() => {
                            handleNavigateTo(url);
                            setSitemapOpen(false);
                          }}
                        >
                          <span className="max-w-64 truncate text-left text-base">
                            <UrlPath url={url} />
                          </span>
                        </Button>
                      </li>
                    ))
                  )}
                </ul>
              </Container>
            </DropDown.Panel>
          </DropDown>
        </ClickOutsideDiv>

        {/* Error Message Tooltip */}
        {showError && (
          <div className="absolute top-full left-4 z-20 mt-1">
            <p
              id="browser-url-error"
              role="alert"
              aria-live="assertive"
              className="rounded-md bg-red-900/90 px-3 py-1.5 text-red-100 text-xs shadow-md backdrop-blur-sm"
            >
              {error}
            </p>
          </div>
        )}
      </div>

      {/* Iframe */}
      <div className="relative z-0 flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-b-xl bg-background">
        <iframe
          ref={internalIframeRef}
          src={currentUrl}
          title={content.iframeTitle.value}
          className="size-full flex-1"
          sandbox={sandbox}
          loading="lazy"
          aria-live="polite"
          {...props}
        />
      </div>
    </section>
  );
};
