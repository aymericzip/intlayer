import { ogImageHandlers } from '@intlayer/design-system/og-image/server';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/og')({
  server: { handlers: ogImageHandlers },
});
