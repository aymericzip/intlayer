'use client';

import {
  useGetDictionaries,
  useGetDictionariesKeys,
  useGetOrganizations,
  useGetProjects,
  useGetTags,
} from '@intlayer/design-system/hooks';
import type { FC } from 'react';

// Mount once within dashboard to warm React Query cache on the client
export const WarmupClient: FC = () => {
  // Unconditionally call hooks; their internal enable gating uses session state
  useGetOrganizations();
  useGetProjects();
  useGetTags();
  useGetDictionaries();
  useGetDictionariesKeys();

  return null;
};

export default WarmupClient;
