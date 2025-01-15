import type {
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationFieldBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationFieldResult,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationMetadataBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationMetadataResult,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditContentDeclarationResult,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditTagBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AuditTagResult,
  // @ts-ignore: @intlayer/backend is not built yet
  AskDocQuestionBody,
  // @ts-ignore: @intlayer/backend is not built yet
  AskDocQuestionResult,
  // @ts-nocheck: @intlayer/backend is not built yet
} from '@intlayer/backend';

import { getConfiguration, type IntlayerConfig } from '@intlayer/config/client';
import { fetcher, type FetcherOptions } from './fetcher';

export const getAiAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const { backendURL } = (intlayerConfig ?? getConfiguration()).editor;
  const AI_API_ROUTE = `${backendURL}/api/ai`;

  /**
   * Audits a content declaration file
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclaration = async (
    body?: AuditContentDeclarationBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationResult>(
      `${AI_API_ROUTE}/audit/content-declaration`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  /**
   * Audits a content declaration field
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclarationField = async (
    body?: AuditContentDeclarationFieldBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationFieldResult>(
      `${AI_API_ROUTE}/audit/content-declaration/field`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  /**
   * Audits a content declaration file to retrieve title, description and tags
   * @param body - Audit file parameters.
   * @returns Audited file content.
   */
  const auditContentDeclarationMetadata = async (
    body?: AuditContentDeclarationMetadataBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditContentDeclarationMetadataResult>(
      `${AI_API_ROUTE}/audit/content-declaration/metadata`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  /**
   * Audits a tag
   * @param body - Audit tag parameters.
   * @returns Audited tag content.
   */
  const auditTag = async (
    body?: AuditTagBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditTagResult>(
      `${AI_API_ROUTE}/audit/tag`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  /**
   * Asks a question to the AI related to the documentation
   */
  const askDocQuestion = async (
    body?: AskDocQuestionBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AskDocQuestionResult>(
      `${AI_API_ROUTE}/ask`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  return {
    auditContentDeclaration,
    auditContentDeclarationField,
    auditContentDeclarationMetadata,
    auditTag,
    askDocQuestion,
  };
};

export const userAPI = getAiAPI();
