import { Link } from '@intlayer/design-system';
import { CircleArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const VisualEditorSection: FC = () => {
  const { description, gotToPlaygroundButton } = useIntlayer(
    'visual-editor-section'
  );
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10">
      <video
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
