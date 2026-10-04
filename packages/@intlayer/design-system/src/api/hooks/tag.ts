'use client';

import type {
  AddTagBody,
  DeleteTagParams,
  GetTagsParams,
} from '@intlayer/backend-contract/tag';
import { useMutation } from '@tanstack/react-query';
import { useTagAPI } from '../useIntlayerAPI';
import { type AppQueryOptions, useAppQuery } from './utils';

export const useGetTags = (
  filters?: GetTagsParams,
  options?: AppQueryOptions
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
    mutationFn: (tagId: DeleteTagParams['tagId']) => tagAPI.deleteTag(tagId),
    meta: {
      invalidateQueries: [['tags']],
    },
  });
};
