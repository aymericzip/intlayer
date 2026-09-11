'use client';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Link } from '@components/Link';
import { Modal } from '@components/Modal';
import { cn } from '@utils/cn';
import { MoveDiagonal } from 'lucide-react';
import {
  type ComponentProps,
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getYoutubeEmbedUrl,
  getYoutubeVideoId,
  getYoutubeWatchUrl,
} from './youtubeUrl';

type FrameProps = Omit<ComponentProps<'iframe'>, 'src' | 'title' | 'className'>;

/**
 * The features the YouTube player asks for, as shipped by YouTube's own embed code.
 */
const YOUTUBE_PLAYER_ALLOW =
  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

type ResolvedFrame = {
  src: string | undefined;
  frameProps: FrameProps;
  isYoutubeVideo: boolean;
};

/**
 * Turns whatever the markdown handed over into what the frame is rendered with.
 *
 * A YouTube address, in any of its forms, becomes the player embed carrying
 * the attributes YouTube's own embed code ships with. Query parameters are
 * dropped on purpose: docs written for one origin (`origin=…`) break the
 * player on every other one.
 *
 * `referrerPolicy` is the attribute that matters: the player refuses to start
 * ("Video player configuration error", error 153) unless the request carries
 * a referrer, and a page served with `Referrer-Policy: same-origin` sends none
 * to a cross-origin frame. The attribute overrides the page policy for this
 * frame only.
 */
const resolveFrame = (
  src: string | undefined,
  frameProps: FrameProps
): ResolvedFrame => {
  const youtubeVideoId = getYoutubeVideoId(src);

  if (!youtubeVideoId) return { src, frameProps, isYoutubeVideo: false };

  return {
    isYoutubeVideo: true,
    src: getYoutubeEmbedUrl(youtubeVideoId),
    frameProps: {
      ...frameProps,
      allow: YOUTUBE_PLAYER_ALLOW,
      allowFullScreen: true,
      referrerPolicy: 'strict-origin-when-cross-origin',
    },
  };
};

const getEmbedLinkMeta = (
  src: string | undefined
): { href: string; label: string } => {
  if (!src) return { href: '', label: '' };

  const youtubeVideoId = getYoutubeVideoId(src);
  if (youtubeVideoId) {
    return {
      href: getYoutubeWatchUrl(youtubeVideoId),
      label: 'youtube.com',
    };
  }

  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src);
      return { href: url.href, label: url.host };
    } catch {
      return { href: src, label: src };
    }
  }

  return { href: src, label: src };
};

/**
 * Tracks whether an element has come close enough to the viewport to be worth
 * loading.
 *
 * `loading="lazy"` is not enough for embeds inside tabs or carousels: the
 * browser only defers frames that are far down the page, so a frame parked
 * off-screen by a transform — an inactive tab panel — still loads immediately.
 * A live-app embed costs upwards of a megabyte and seconds of main thread,
 * which is the whole page's performance budget spent on something nobody is
 * looking at.
 *
 * @returns A ref to attach to the placeholder, and whether it became visible.
 */
const useHasBecomeVisible = <ElementType extends HTMLElement>() => {
  const elementRef = useRef<ElementType>(null);
  const [hasBecomeVisible, setHasBecomeVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasBecomeVisible) return;

    if (typeof IntersectionObserver === 'undefined') {
      setHasBecomeVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasBecomeVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasBecomeVisible]);

  return { elementRef, hasBecomeVisible };
};

type EmbeddedFrameProps = Pick<ResolvedFrame, 'src' | 'frameProps'> & {
  title: string | undefined;
  className: string;
};

/**
 * The embed itself, mounted once it comes close to the viewport.
 */
const EmbeddedFrame: FC<EmbeddedFrameProps> = ({
  src,
  title,
  className,
  frameProps,
}) => {
  const { elementRef, hasBecomeVisible } =
    useHasBecomeVisible<HTMLDivElement>();

  if (!hasBecomeVisible) {
    // Same box as the frame it stands in for, so nothing shifts once it loads.
    return <div ref={elementRef} aria-hidden className={className} />;
  }

  return (
    <iframe
      {...frameProps}
      src={src}
      title={title}
      loading="lazy"
      className={className}
    />
  );
};

export const MarkDownIframe: FC<ComponentProps<'iframe'>> = (props) => {
  const { src: rawSrc, className, title, ...rest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { src, frameProps, isYoutubeVideo } = resolveFrame(rawSrc, rest);
  const { href, label } = getEmbedLinkMeta(rawSrc);

  return (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      className="overflow-hidden p-0"
      gap="none"
    >
      <EmbeddedFrame
        src={src}
        title={title}
        frameProps={frameProps}
        className={cn(
          'block max-h-[80vh] min-h-[12rem] w-full border-0',
          isYoutubeVideo && 'aspect-video',
          className
        )}
      />
      <div className="flex items-center justify-between gap-3 px-3 py-1">
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            label=""
            color="neutral"
            className="inline-flex min-w-0 max-w-[calc(100%-3rem)] items-center gap-2 text-muted-foreground text-xs underline-offset-2 hover:text-foreground hover:underline"
          >
            {label}
          </Link>
        ) : (
          <span className="text-neutral text-sm">Embedded frame</span>
        )}
        <Button
          variant="hoverable"
          size="icon-md"
          onClick={() => setIsModalOpen(true)}
          label="Open embedded page in fullscreen"
          Icon={MoveDiagonal}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="unset"
        hasCloseButton
        isScrollable
        padding="sm"
      >
        {isModalOpen && src ? (
          <Container
            roundedSize="2xl"
            border
            borderColor="neutral"
            className="overflow-hidden p-0"
            gap="none"
          >
            <iframe
              {...frameProps}
              src={src}
              title={title ?? 'Embedded content'}
              allowFullScreen
              className="block min-h-[82vh] w-full border-0"
            />
          </Container>
        ) : null}
      </Modal>
    </Container>
  );
};
