import { createFileRoute } from '@tanstack/react-router';
import { getIntlayer } from 'intlayer';
import { WebsiteRoutes } from '#/Routes';

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
  return (
    <main className="page-wrap flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <p className="island-kicker mb-4">Error 404</p>
      <h1 className="display-title mb-4 font-bold text-6xl text-[var(--sea-ink)]">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-[var(--sea-ink-soft)] text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <a
        href={WebsiteRoutes.Home}
        className="rounded-full border border-[rgba(50,143,151,0.3)] bg-[rgba(79,184,178,0.14)] px-5 py-2.5 font-semibold text-[var(--lagoon-deep)] text-sm no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(79,184,178,0.24)]"
      >
        Back to home
      </a>
    </main>
  );
}
