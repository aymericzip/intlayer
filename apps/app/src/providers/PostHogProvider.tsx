import { PostHogProvider as PostHogProviderInternal } from '@posthog/react';
import type { FC, ReactNode } from 'react';

export const PostHogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  if (import.meta.env.VITE_POSTHOG_KEY && import.meta.env.VITE_POSTHOG_HOST) {
    return (
      <PostHogProviderInternal
        apiKey={import.meta.env.VITE_POSTHOG_KEY}
        options={{
          api_host: import.meta.env.VITE_POSTHOG_HOST,
        }}
      >
        {children}
      </PostHogProviderInternal>
    );
  }

  return children;
};
