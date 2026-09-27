import { createFileRoute, notFound } from '@tanstack/react-router';
import { NotFoundComponent } from '~/components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}/$')({
  // Throwing marks the match as not found, so SSR answers with a 404 status
  // instead of a 200 soft 404 that search engines would index.
  loader: () => {
    throw notFound();
  },
  component: NotFoundComponent,
  notFoundComponent: NotFoundComponent,
});
