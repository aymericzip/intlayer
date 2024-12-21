import type { AuditFileBody, AuditFileResult } from '@intlayer/backend';
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
  const auditFile = async (
    body?: AuditFileBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<AuditFileResult>(
      `${AI_API_ROUTE}/audit`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: body,
      }
    );

  return {
    auditFile,
  };
};

export const userAPI = getAiAPI();
