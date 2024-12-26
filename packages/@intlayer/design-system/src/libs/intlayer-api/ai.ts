import type {
  AuditContentDeclarationBody,
  AuditContentDeclarationResult,
  AuditTagBody,
  AuditTagResult,
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

  return {
    auditContentDeclaration,
    auditTag,
  };
};

export const userAPI = getAiAPI();
