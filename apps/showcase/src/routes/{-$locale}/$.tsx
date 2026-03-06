import { createFileRoute } from '@tanstack/react-router';
import { NotFoundComponent } from './404';

// Catch-all route: matches any path that doesn't match other routes
// e.g. /en/some/deeply/nested/invalid/path
export const Route = createFileRoute('/{-$locale}/$')({
  component: NotFoundComponent,
});
