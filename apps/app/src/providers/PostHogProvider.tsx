import type { PostHogProvider as PostHogProviderType } from '@posthog/react';
import type { PostHog } from 'posthog-js';
import { type FC, type ReactNode, useEffect, useState } from 'react';
import { IS_SELF_HOSTED } from '#utils/selfHosted';

export const PostHogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posthogClient, setPosthogClient] = useState<PostHog | undefined>();
  const [PostHogContext, setPostHogContext] = useState<
    typeof PostHogProviderType | undefined
  >();

  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST;

  useEffect(() => {
    // Third-party analytics are disabled on self-hosted instances.
    if (IS_SELF_HOSTED || !key || !host || !import.meta.env.PROD) return;

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
