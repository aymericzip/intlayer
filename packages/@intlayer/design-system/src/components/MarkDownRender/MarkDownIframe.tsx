'use client';

import { Button } from '@components/Button';
import { Container } from '@components/Container';
import { Link } from '@components/Link';
import { Modal } from '@components/Modal';
import { cn } from '@utils/cn';
import { MoveDiagonal, Play } from 'lucide-react';
import {
  type ComponentProps,
  type FC,
  useEffect,
  useRef,
  useState,
} from 'react';

function embedLinkMeta(src: string | undefined): {
  href: string;
  label: string;
} {
  if (!src) return { href: '', label: '' };
  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src);
      return { href: url.href, label: url.host };
    } catch {
      return { href: src, label: src };
    }
  }
  return { href: src, label: src };
}

/**
 * Reads the video id out of a YouTube embed address.
 *
 * @returns The video id, or `null` when the address is not a YouTube embed.
 */
const getYoutubeVideoId = (src: string | undefined): string | null => {
  if (!src || !/^https?:\/\//i.test(src)) return null;

  try {
    const url = new URL(src);
    if (!/(^|\.)youtube(-nocookie)?\.com$/.test(url.hostname)) return null;

    const videoId = url.pathname.replace(/^\/embed\//, '').split('/')[0];

    return videoId || null;
  } catch {
    return null;
  }
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

type EmbeddedFrameProps = {
  src: string | undefined;
  title: string | undefined;
  className: string;
  frameProps: Omit<ComponentProps<'iframe'>, 'src' | 'title' | 'className'>;
};

/**
 * The embed itself: a poster for YouTube, deferred loading for anything else.
 *
 * A YouTube player pulls well over a megabyte of script before it can show a
 * single frame. Standing in for it with its own thumbnail until the reader
 * presses play keeps that cost on the readers who actually watch the video.
 */
const EmbeddedFrame: FC<EmbeddedFrameProps> = ({
  src,
  title,
  className,
  frameProps,
}) => {
  const [isPlayRequested, setIsPlayRequested] = useState(false);
  const { elementRef, hasBecomeVisible } =
    useHasBecomeVisible<HTMLDivElement>();
  const youtubeVideoId = getYoutubeVideoId(src);

  if (youtubeVideoId && !isPlayRequested) {
    return (
      <button
        type="button"
        aria-label={title ?? 'Play video'}
        onClick={() => setIsPlayRequested(true)}
        className={cn(
          'group relative block cursor-pointer border-0 bg-card p-0',
          className
        )}
      >
        {/*
         * The poster stands in for the player, so on a page that opens with a
         * video it is the largest element painted — deferring it would defer
         * the page's LCP. It is the one image here worth fetching eagerly.
         */}
        <img
          src={`https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-text/70 text-text-opposite transition-transform group-hover:scale-110">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
        </span>
      </button>
    );
  }

  if (!hasBecomeVisible && !isPlayRequested) {
    // Same box as the frame it stands in for, so nothing shifts once it loads.
    return <div ref={elementRef} aria-hidden className={className} />;
  }

  const frameSrc = (() => {
    if (!isPlayRequested || !youtubeVideoId || !src) return src;

    const playbackSrc = new URL(src);
    playbackSrc.searchParams.set('autoplay', '1');

    return playbackSrc.href;
  })();

  return (
    <iframe
      {...frameProps}
      src={frameSrc}
      title={title}
      loading="lazy"
      className={className}
    />
  );
};

export const MarkDownIframe: FC<ComponentProps<'iframe'>> = (props) => {
  const { src, className, title, ...rest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { href, label } = embedLinkMeta(src);

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
        frameProps={rest}
        className={cn(
          'block max-h-[80vh] min-h-[12rem] w-full border-0',
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
            className="inline-flex min-w-0 max-w-[calc(100%-3rem)] items-center gap-2 text-neutral text-xs underline-offset-2 hover:text-text hover:underline"
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
              {...rest}
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
