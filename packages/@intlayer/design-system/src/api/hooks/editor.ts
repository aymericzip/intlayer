'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import type { WriteContentDeclarationBody } from 'intlayer-editor';
import { useEditorAPI } from '../useIntlayerAPI';

export const useGetEditorDictionaries = () => {
  const editorAPI = useEditorAPI();

  return useQuery({
    queryKey: ['editor', 'dictionaries'],
    queryFn: () => editorAPI.getDictionaries(),
  });
};

export const useWriteDictionary = () => {
  const editorAPI = useEditorAPI();

  return useMutation({
    mutationKey: ['editor', 'dictionaries'],
    mutationFn: (args: WriteContentDeclarationBody) =>
      editorAPI.writeDictionary(args),
  });
};
