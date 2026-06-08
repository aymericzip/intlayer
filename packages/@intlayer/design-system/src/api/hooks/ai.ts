'use client';

import type {
  AskDocQuestionBody,
  AuditContentDeclarationBody,
  AuditContentDeclarationFieldBody,
  AuditContentDeclarationMetadataBody,
  AuditTagBody,
  AutocompleteBody,
  TranslateJSONBody,
} from '@intlayer/backend';
import { useMutation } from '@tanstack/react-query';
import { useAiAPI } from '../useIntlayerAPI';

export const useTranslateJSONDeclaration = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-translateJSON'],
    mutationFn: (args: TranslateJSONBody) => aiAPI.translateJSON(args),
  });
};

export const useAuditContentDeclaration = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclaration'],
    mutationFn: (args: AuditContentDeclarationBody) =>
      aiAPI.auditContentDeclaration(args),
  });
};

export const useAuditContentDeclarationMetadata = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationMetadata'],
    mutationFn: (args: AuditContentDeclarationMetadataBody) =>
      aiAPI.auditContentDeclarationMetadata(args),
  });
};

export const useAuditContentDeclarationField = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditContentDeclarationField'],
    mutationFn: (args: AuditContentDeclarationFieldBody) =>
      aiAPI.auditContentDeclarationField(args),
  });
};

export const useAuditTag = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-auditTag'],
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
    mutationFn: (args?: AskDocQuestionBody) => aiAPI.chat(args as any),
  });
};

export const useAutocomplete = () => {
  const aiAPI = useAiAPI();

  return useMutation({
    mutationKey: ['ai-autocomplete'],
    mutationFn: (args?: AutocompleteBody) => aiAPI.autocomplete(args),
  });
};
