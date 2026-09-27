import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  getLocalizedPages,
  isBaseLocalePage,
} from '@intlayer/engine/scan/detection';
import { Info, Languages } from 'lucide-react';
import { type FC, useMemo } from 'react';
import { useIntlayer } from 'react-intlayer';
import type { AuditEvent, DomainData } from './types';

type Hreflang = { hreflang: string; href: string };

type LocalizedPagesSectionProps = {
  /** Scanned URL. */
  url: string;
  /** Result of the `url_hreflang` check of the scanned URL. */
  hreflangEvent?: Pick<AuditEvent, 'status' | 'data'>;
  domainData?: Partial<DomainData>;
  /** Scans another localized version of the page. */
  onScanPage: (url: string) => void;
  isLoading?: boolean;
};

const isHreflang = (value: unknown): value is Hreflang =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as Hreflang).hreflang === 'string' &&
  typeof (value as Hreflang).href === 'string';

/**
 * Read the hreflang tags from the `url_hreflang` check: the list itself on
 * success, `{ issues, hreflangs }` on warning or error.
 */
const getHreflangs = (
  hreflangEvent: LocalizedPagesSectionProps['hreflangEvent']
): Hreflang[] => {
  const details =
    hreflangEvent?.data?.successDetails ??
    hreflangEvent?.data?.warningsDetails ??
    hreflangEvent?.data?.errorsDetails;
  const list = Array.isArray(details)
    ? details
    : details && typeof details === 'object' && 'hreflangs' in details
      ? details.hreflangs
      : undefined;

  return Array.isArray(list) ? list.filter(isHreflang) : [];
};

/**
 * Links to the other language versions of the scanned page (read from its
 * hreflang tags) to scan them in one click, with a hint when the scanned page
 * is the base one — i18n issues mostly show up on the localized versions.
 */
export const LocalizedPagesSection: FC<LocalizedPagesSectionProps> = ({
  url,
  hreflangEvent,
  domainData,
  onScanPage,
  isLoading,
}) => {
  const { title, description, basePageNote } = useIntlayer(
    'localized-pages-section'
  );

  const hreflangs = useMemo(() => getHreflangs(hreflangEvent), [hreflangEvent]);
  const localizedPages = useMemo(
    () => (url ? getLocalizedPages(hreflangs, url) : []),
    [hreflangs, url]
  );

  if (localizedPages.length < 2) return null;

  const isBasePage =
    domainData?.routing !== undefined &&
    isBaseLocalePage({ pageUrl: url, hreflangs, routing: domainData.routing });

  return (
    <div className="mt-3 flex flex-col gap-2 border-neutral border-t border-dotted pt-3 text-left text-sm">
      <strong className="flex items-center gap-2 text-muted-foreground">
        <Languages size={16} />
        {title}
      </strong>

      {isBasePage && (
        <Container
          className="flex-row items-start gap-2 bg-warning/5 text-foreground/80"
          border
          borderColor="warning"
          background="none"
          padding="md"
        >
          <Info size={16} className="mt-0.5 shrink-0 text-warning" />
          <p>{basePageNote}</p>
        </Container>
      )}

      <span className="text-muted-foreground text-xs">{description}</span>
      <ul className="flex flex-wrap gap-2">
        {localizedPages.map((localizedPage) => (
          <li key={localizedPage.url}>
            <Button
              label={localizedPage.url}
              title={localizedPage.url}
              variant="outline"
              color="text"
              size="sm"
              roundedSize="xl"
              textAlign="left"
              isActive={localizedPage.isCurrent}
              disabled={isLoading && !localizedPage.isCurrent}
              onClick={() => {
                if (!localizedPage.isCurrent) onScanPage(localizedPage.url);
              }}
            >
              {localizedPage.hreflang}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
