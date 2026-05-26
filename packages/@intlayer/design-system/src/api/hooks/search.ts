'use client';

import type { SearchDocUtilParams } from '@intlayer/backend';
import { useQuery } from '@tanstack/react-query';
import { useSearchAPI } from '../useIntlayerAPI';

export const useSearchDoc = (params: SearchDocUtilParams) => {
  const searchAPI = useSearchAPI();

  return useQuery({
    queryKey: ['search', params],
    queryFn: () => searchAPI.searchDoc(params),
    enabled: (params?.input?.length ?? 0) > 3,
  });
};
