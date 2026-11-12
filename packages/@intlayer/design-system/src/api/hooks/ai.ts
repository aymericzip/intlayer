'use client';

import type { AskDocQuestionBody, ChatBody } from '@intlayer/api';
import type {
  AuditContentDeclarationBody,
  AuditContentDeclarationFieldBody,
  AuditContentDeclarationMetadataBody,
  AuditTagBody,
  AutocompleteBody,
  CustomQueryBody,
  GetAICreditUsageParams,
  TranslateJSONBody,
} from '@intlayer/backend-contract/ai';
import { useMutation } from '@tanstack/react-query';
import { useAiAPI } from '../useIntlayerAPI';
import { type AppQueryOptions, useAppQuery } from './utils';

/** Every AI call may spend credits: mutations refresh this query. */
const AI_CREDITS_QUERY_KEY = ['ai', 'credits'];

export const useTranslateJSONDeclaration = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-translateJSON'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: TranslateJSONBody) => aiAPI.translateJSON(args),
  });
};

export const useAuditContentDeclaration = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclaration'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: AuditContentDeclarationBody) =>
      aiAPI.auditContentDeclaration(args),
  });
};

export const useAuditContentDeclarationMetadata = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationMetadata'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: AuditContentDeclarationMetadataBody) =>
      aiAPI.auditContentDeclarationMetadata(args),
  });
};

export const useAuditContentDeclarationField = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationField'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: AuditContentDeclarationFieldBody) =>
      aiAPI.auditContentDeclarationField(args),
  });
};

export const useAuditTag = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditTag'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: AuditTagBody) => aiAPI.auditTag(args),
  });
};

export const useAskDocQuestion = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: [],
    mutationFn: (args?: AskDocQuestionBody) => aiAPI.askDocQuestion(args),
  });
};

export const useChat = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-chat'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args?: ChatBody) => aiAPI.chat(args),
  });
};

export const useAutocomplete = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-autocomplete'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args?: AutocompleteBody) => aiAPI.autocomplete(args),
  });
};

export const useCustomQuery = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-customQuery'],
    meta: { invalidateQueries: [AI_CREDITS_QUERY_KEY] },
    mutationFn: (args: CustomQueryBody) => aiAPI.customQuery(args),
  });
};

export const useGetAIStats = (options?: AppQueryOptions) => {
  const aiAPI = useAiAPI();

  return useAppQuery({
    queryKey: ['ai', 'stats'],
    queryFn: ({ signal }) => aiAPI.getAIStats({ signal }),
    requireUser: true,
    requireOrganization: true,
    requireProject: true,
    ...options,
  });
};

/**
 * AI credit balance of the session organization for the current month.
 */
export const useGetAICredits = (options?: AppQueryOptions) => {
  const aiAPI = useAiAPI();

  return useAppQuery({
    queryKey: [...AI_CREDITS_QUERY_KEY, 'balance'],
    queryFn: ({ signal }) => aiAPI.getAICredits({ signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};

/**
 * Day-by-day AI credit usage of the session organization.
 */
export const useGetAICreditUsage = (
  params?: GetAICreditUsageParams,
  options?: AppQueryOptions
) => {
  const aiAPI = useAiAPI();

  return useAppQuery({
    queryKey: [...AI_CREDITS_QUERY_KEY, 'usage', params],
    queryFn: ({ signal }) => aiAPI.getAICreditUsage(params, { signal }),
    requireUser: true,
    requireOrganization: true,
    ...options,
  });
};
