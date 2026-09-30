import { ogImageHandlers } from '@intlayer/design-system/og-image';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/api/og')({
  server: { handlers: ogImageHandlers },
});
