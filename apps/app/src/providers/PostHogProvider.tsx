import { PostHogProvider as PostHogContext } from '@posthog/react';
import type { PostHog } from 'posthog-js';
import { type FC, type ReactNode, useEffect, useState } from 'react';

export const PostHogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [posthogClient, setPosthogClient] = useState<PostHog | undefined>();

  const key = import.meta.env.VITE_POSTHOG_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST;

  useEffect(() => {
    if (!key || !host || !import.meta.env.PROD) return;

    const initPostHog = async () => {
      const { default: posthog } = await import('posthog-js');
      posthog.init(key, { api_host: host });
      setPosthogClient(posthog);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => void initPostHog());
    } else {
      setTimeout(() => void initPostHog(), 1000);
    }
  }, []);

  if (!posthogClient) return children;

  return <PostHogContext client={posthogClient}>{children}</PostHogContext>;
};
