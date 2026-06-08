import type { PostHogProvider as PostHogProviderType } from '@posthog/react';
import type { PostHog } from 'posthog-js';
import { type FC, type ReactNode, useEffect, useState } from 'react';

export const PostHogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posthogClient, setPosthogClient] = useState<PostHog | undefined>();
  const [PostHogContext, setPostHogContext] = useState<
    typeof PostHogProviderType | undefined
  >();

  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST;

  useEffect(() => {
    if (!key || !host || !import.meta.env.PROD) return;

    const initPostHog = async () => {
      const [posthogModule, posthogReactModule] = await Promise.all([
        import('posthog-js'),
        import('@posthog/react'),
      ]);

      const posthog = posthogModule.default;
      const PostHogProviderComponent = posthogReactModule.PostHogProvider;

      posthog.init(key, { api_host: host });

      setPosthogClient(posthog);
      setPostHogContext(() => PostHogProviderComponent);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => void initPostHog());
    } else {
      setTimeout(() => void initPostHog(), 1000);
    }
  }, [key, host]);

  if (!posthogClient || !PostHogContext) return children;

  return <PostHogContext client={posthogClient}>{children}</PostHogContext>;
};
