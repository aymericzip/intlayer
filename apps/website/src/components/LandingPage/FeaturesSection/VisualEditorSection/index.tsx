import { PagesRoutes } from '@/Routes';
import { Link } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { CircleArrowRight, Maximize2, X } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';

export const VisualEditorSection: FC = () => {
  const {
    description,
    gotToPlaygroundButton,
    fullscreenButton,
    closeFullscreen,
  } = useIntlayer('visual-editor-section');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFullscreen = () => {
    if (!videoRef.current) return;

    if (!isFullscreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement
    );
    setIsFullscreen(isCurrentlyFullscreen);
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-0 md:p-10">
      <div className="relative">
        <video
          ref={videoRef}
          className="rounded-xl"
          aria-label="Visual Editor"
          autoPlay
          loop
          muted
          playsInline
          width={3024}
          height={1812}
          preload="metadata"
          poster="/assets/visual_editor.webp"
        >
          <source src="/assets/visual_editor.mp4" type="video/mp4" />
          <source src="/assets/visual_editor.webm" type="video/webm" />
          <track
            src="/assets/captions.vtt"
            srcLang="en"
            kind="captions"
            label="English"
            default
          />
        </video>

        {/* Mobile fullscreen button - only visible on mobile */}
        <button
          onClick={toggleFullscreen}
          className={cn(
            'absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-md transition-colors',
            'hidden max-md:flex items-center justify-center'
          )}
          aria-label={
            isFullscreen ? closeFullscreen.value : fullscreenButton.value
          }
          title={isFullscreen ? closeFullscreen.value : fullscreenButton.value}
        >
          {isFullscreen ? (
            <X className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex w-full flex-col gap-4">
        <span className="text-neutral text-sm">{description}</span>
        <Link
          href={PagesRoutes.Playground}
          target="_blank"
          variant="button"
          color="text"
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
