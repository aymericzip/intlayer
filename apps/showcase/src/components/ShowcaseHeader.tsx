import { H1, Link } from '@intlayer/design-system';
import { Plus } from 'lucide-react';
import { useIntlayer } from 'react-intlayer';
import { PagesRoutes } from '#/Routes';

export const ShowcaseHeader = () => {
  const content = useIntlayer('app');

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
        href={PagesRoutes.ShowcaseSubmit}
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
