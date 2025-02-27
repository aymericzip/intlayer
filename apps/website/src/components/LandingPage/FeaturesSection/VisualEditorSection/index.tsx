import type { FC } from 'react';
import { useIntlayer } from 'next-intlayer';
import { PagesRoutes } from '@/Routes';
import { Link } from '@intlayer/design-system';
import { CircleArrowRight } from 'lucide-react';

export const VisualEditorSection: FC = () => {
  const { description, gotToPlaygroundButton } = useIntlayer(
    'visual-editor-section'
  );
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-10">
      <img
        alt="Visual Editor"
        className="rounded-xl"
        src="https://github.com/aymericzip/intlayer/blob/main/docs/assets/visual_editor.gif?raw=true"
      />
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
