import { PagesRoutes } from '@/Routes';
import { Link } from '@intlayer/design-system';
import { CircleArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

export const VisualEditorSection: FC = () => {
  const { description, gotToPlaygroundButton } = useIntlayer(
    'visual-editor-section'
  );

  return (
    <div
      className="
        flex flex-col items-center justify-center 
        gap-5 sm:gap-7 md:gap-10 
        p-3 sm:p-5 md:p-10 
        w-full max-w-full
      "
    >
      <div
        className="
          w-full max-w-full 
          rounded-lg sm:rounded-xl 
          overflow-hidden 
          max-h-[65vh] sm:max-h-none
        "
      >
        <video
          className="w-full h-auto object-cover"
          aria-label="Visual Editor"
          autoPlay
          loop
          muted
          playsInline
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
      </div>

      <div className="flex w-full flex-col gap-3 sm:gap-4 text-center sm:text-left">
        <span className="text-sm sm:text-base md:text-lg text-neutral leading-relaxed">
          {description}
        </span>

        <Link
          href={PagesRoutes.Playground}
          target="_blank"
          variant="button"
          color="text"
          label={gotToPlaygroundButton.label.value}
          className="w-full sm:w-auto"
        >
          <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
            {gotToPlaygroundButton.text}
            <CircleArrowRight className="size-4 sm:size-5" />
          </span>
        </Link>
      </div>
    </div>
  );
};
