import { createFileRoute, redirect } from '@tanstack/react-router';
import { defaultLocale } from 'intlayer';

export const Route = createFileRoute('/page')({
  beforeLoad: () => {
    throw redirect({
      to: '/{-$locale}',
      params: { locale: defaultLocale },
    });
  },
});
