'use client';

import type {
  AddTagBody,
  DeleteTagParams,
  GetTagsParams,
} from '@intlayer/backend';
import { type UseQueryOptions, useMutation } from '@tanstack/react-query';
import { useTagAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useGetTags = (
  filters?: GetTagsParams,
  options?: Partial<UseQueryOptions>
) => {
  const tagAPI = useTagAPI();

  return useAppQuery({
    queryKey: ['tags', filters],
    queryFn: ({ signal }) => tagAPI.getTags(filters, { signal }),
    // placeholderData: keepPreviousData,
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

export const useAddTag = () => {
  const tagAPI = useTagAPI();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (args: AddTagBody) => tagAPI.addTag(args),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};

export const useUpdateTag = () => {
  const tagAPI = useTagAPI();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (v: { tagId: string; tag: any }) =>
      tagAPI.updateTag(v.tagId, v.tag),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};

export const useDeleteTag = () => {
  const tagAPI = useTagAPI();

  return useMutation({
    mutationKey: ['tags'],
    mutationFn: (args: DeleteTagParams) => tagAPI.deleteTag(args),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};
