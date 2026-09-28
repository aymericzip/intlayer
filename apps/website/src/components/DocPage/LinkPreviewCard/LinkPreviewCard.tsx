import { Container } from '@intlayer/design-system/container';
import { cn } from '@intlayer/design-system/utils';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink } from 'lucide-react';
import { type FC, type ReactNode, useState } from 'react';
import { Link } from '~/components/Link/Link';
import { loadLinkPreview } from '~/serverFunctions/linkPreview';
import { getNodeText } from '~/utils/getNodeText';

export type LinkPreviewCardProps = {
  /** Absolute URL of the external page. */
  href: string;
  /** Link text authored in the markdown, used when the page has no title. */
  title?: ReactNode;
  className?: string;
};

/** Hostname without `www.`, or the raw value when it is not a URL. */
const getHostname = (href: string): string => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
};

/** 16:9 slot holding the og:image, left of the text. */
const THUMBNAIL_CLASS_NAME = 'aspect-video w-28 shrink-0 rounded-xl md:w-36';

/** Placeholder with the card's layout while the preview loads. */
const LinkPreviewCardSkeleton: FC = () => (
  <>
    <div className={cn(THUMBNAIL_CLASS_NAME, 'animate-pulse bg-neutral/20')} />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral/20" />
      <div className="h-3 w-full animate-pulse rounded-md bg-neutral/20" />
      <div className="h-3 w-1/3 animate-pulse rounded-md bg-neutral/20" />
    </div>
  </>
);

/**
 * Card for an external link: shows the page's Open Graph image, title and
 * description, with a skeleton while they load. Falls back to the authored
 * link text and hostname when the page exposes no metadata.
 */
export const LinkPreviewCard: FC<LinkPreviewCardProps> = ({
  href,
  title,
  className,
}) => {
  const { data: preview, isPending } = useQuery({
    queryKey: ['link-preview', href],
    queryFn: () => loadLinkPreview({ data: { url: href } }),
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const [hasFaviconFailed, setHasFaviconFailed] = useState(false);

  const authoredTitle = getNodeText(title).trim();
  const hostname = getHostname(href);
  const displayTitle = preview?.title ?? (authoredTitle || hostname);
  const imageUrl = hasImageFailed ? undefined : preview?.image;
  const faviconUrl = hasFaviconFailed ? undefined : preview?.favicon;

  return (
    <Link
      to={href}
      isExternalLink
      variant="invisible-link"
      underlined={false}
      className="group not-prose block min-w-60 flex-1 p-0 no-underline max-sm:min-w-full"
      label={authoredTitle || displayTitle}
    >
      <Container
        roundedSize="2xl"
        border
        borderColor="neutral"
        background="hoverable"
        transparency="md"
        padding="md"
        aria-busy={isPending}
        className={cn(
          'group/link-preview flex h-full w-full flex-row items-center gap-4 transition-all duration-200 hover:border-neutral-focus hover:shadow-xs',
          className
        )}
      >
        {isPending ? (
          <LinkPreviewCardSkeleton />
        ) : (
          <>
            {imageUrl && (
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setHasImageFailed(true)}
                className={cn(
                  THUMBNAIL_CLASS_NAME,
                  'border border-neutral bg-neutral/5 object-cover'
                )}
              />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <span className="line-clamp-2 font-semibold text-foreground text-sm leading-snug transition-colors group-hover/link-preview:text-primary md:text-base">
                {displayTitle}
              </span>
              {preview?.description && (
                <span className="line-clamp-2 text-text/70 text-xs leading-relaxed md:text-sm">
                  {preview.description}
                </span>
              )}
              <span className="flex items-center gap-2 text-text/50 text-xs">
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setHasFaviconFailed(true)}
                    className="size-4 shrink-0 rounded-sm"
                  />
                ) : (
                  <ExternalLink className="size-3.5 shrink-0" />
                )}
                <span className="truncate">
                  {preview?.siteName ?? hostname}
                </span>
              </span>
            </div>
          </>
        )}
      </Container>
    </Link>
  );
};
