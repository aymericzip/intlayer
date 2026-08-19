import { Link } from '@intlayer/design-system/link';
import { Website_Playground_Path } from '@intlayer/design-system/routes';
import { getLocalizedUrl } from 'intlayer';
import { CircleArrowRight } from 'lucide-react';
import { type FC, useEffect, useRef, useState } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

export const VisualEditorSection: FC = () => {
  const { description, gotToPlaygroundButton } = useIntlayer(
    'visual-editor-section'
  );
  const { locale } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;
    video.load();
    video.play().catch(() => undefined);
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center gap-10 p-10"
    >
      <video
        ref={videoRef}
        className="rounded-xl"
        aria-label="Visual Editor"
        loop
        muted
        playsInline
        width={3024}
        height={1812}
        preload="none"
        poster="/assets/visual_editor.webp"
      >
        {isVisible && (
          <>
            <source src="/assets/visual_editor.mp4" type="video/mp4" />
            <source src="/assets/visual_editor.webm" type="video/webm" />
          </>
        )}
        <track
          src="/assets/visual_editor.vtt"
          srcLang="en"
          kind="captions"
          label="English"
          default
        />
      </video>
      <div className="flex w-full flex-col gap-4">
        <span className="text-neutral text-sm">{description}</span>
        <Link
          href={getLocalizedUrl(Website_Playground_Path, locale)}
          target="_blank"
          variant="button"
          color="text"
          roundedSize="full"
          label={gotToPlaygroundButton.label.value}
        >
          <span className="flex items-center justify-center gap-2">
            {gotToPlaygroundButton.text}
            <CircleArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
};
