import { H1 } from '@intlayer/design-system/headers';
import { Link } from '@intlayer/design-system/link';
import { Showcase_Submit_Path } from '@intlayer/design-system/routes';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';

export const ShowcaseHeader = () => {
  const content = useIntlayer('showcase-index');

  return (
    <div className="flex w-full max-w-7xl flex-col gap-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16">
      <div>
        <H1 className="font-bold text-4xl text-text">
          {content.showcase.title}
        </H1>
        <p className="mt-2 text-lg text-neutral-500">
          {content.showcase.description}
        </p>
      </div>
      <Link
        href={Showcase_Submit_Path}
        variant="button"
        color="text"
        label={content.showcase.submitButton.value}
      >
        <Plus className="h-5 w-5" />
        <span>{content.showcase.submitButton}</span>
      </Link>
    </div>
  );
};
