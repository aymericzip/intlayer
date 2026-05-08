import { PostHogProvider as PostHogProviderInternal } from '@posthog/react';
import type { FC, ReactNode } from 'react';

export const PostHogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  if (import.meta.env.VITE_POSTHOG_KEY && import.meta.env.VITE_POSTHOG_HOST) {
    return (
      <PostHogProviderInternal
        apiKey={import.meta.env.VITE_POSTHOG_KEY}
        options={{
          api_host: import.meta.env.VITE_POSTHOG_HOST,
          // Expose to window for console testing, ideally only in development
          loaded: (posthog_instance) => {
            if (import.meta.env.DEV) {
              // @ts-ignore - bypassing strict TS window typing for quick debug
              window.posthog = posthog_instance;

              console.log(
                '[PostHog] initialized successfully',
                posthog_instance
              );
            }
          },
        }}
      >
        {children}
      </PostHogProviderInternal>
    );
  }

  return children;
};
