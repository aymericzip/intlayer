import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#/components/Link';
import { PagesRoutes } from '#/Routes';

export const Route = createFileRoute('/{-$locale}/404')({
  component: NotFoundComponent,
  head: ({ params }) => {
    const { locale } = params;
    const content = getIntlayer('app', locale);

    return {
      meta: [
        { title: content.notFoundPage.metadata.title },
        {
          name: 'description',
          content: content.notFoundPage.metadata.description,
        },
        { name: 'robots', content: 'noindex, nofollow' },
      ],
    };
  },
});

export function NotFoundComponent() {
  const content = useIntlayer('404');

  return (
    <main className="page-wrap relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 py-12 text-center">
      <p className="pointer-events-none absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-bold text-[350px] text-text/10">
        404
      </p>

      <h1 className="display-title mb-4 font-bold text-6xl text-text">
        {content.pageNotFound}
      </h1>
      <p className="mb-8 max-w-md text-base text-neutral">
        {content.thePageYoureLookingFor}
      </p>
      <Link to={PagesRoutes.Showcase} variant="button" color="text">
        {content.backToHome}
      </Link>
    </main>
  );
}
