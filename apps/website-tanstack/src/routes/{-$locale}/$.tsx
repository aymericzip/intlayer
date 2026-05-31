import { createFileRoute } from '@tanstack/react-router';
import { NotFoundComponent } from '~/components/NotFoundComponent';

export const Route = createFileRoute('/{-$locale}/$')({
  component: NotFoundComponent,
});
