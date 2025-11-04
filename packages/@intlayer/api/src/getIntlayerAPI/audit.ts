import configuration from '@intlayer/config/built';
import type { IntlayerConfig } from '@intlayer/types';
import { type FetcherOptions, fetcher } from '../fetcher';
import type {
  CreateAuditBody,
  CreateAuditResult,
  GetAuditByIdParams,
  GetAuditByIdResult,
  GetAuditsParams,
  GetAuditsResult,
} from '../types';

export const getAuditAPI = (
  authAPIOptions: FetcherOptions = {},
  intlayerConfig?: IntlayerConfig
) => {
  const backendURL =
    intlayerConfig?.editor?.backendURL ?? configuration?.editor?.backendURL;

  if (!backendURL) {
    throw new Error(
      'Backend URL is not defined in the Intlayer configuration.'
    );
  }

  const AUDIT_API_ROUTE = `${backendURL}/api/audit`;

  /**
   * Creates a new audit in the database.
   * @param audit - Audit data.
   */
  const createAudit = async (
    audit: CreateAuditBody,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<CreateAuditResult>(
      `${AUDIT_API_ROUTE}`,
      authAPIOptions,
      otherOptions,
      {
        method: 'POST',
        body: audit,
      }
    );

  /**
   * Retrieves audits for the current user or project.
   * @param params - Query parameters (page, pageSize).
   */
  const getAudits = async (
    params?: GetAuditsParams,
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAuditsResult>(
      AUDIT_API_ROUTE,
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
        // @ts-ignore Number of parameter will be stringified by the fetcher
        params,
      }
    );

  /**
   * Retrieves an audit by its ID.
   * @param auditId - Audit ID.
   */
  const getAuditById = async (
    auditId: GetAuditByIdParams['auditId'],
    otherOptions: FetcherOptions = {}
  ) =>
    await fetcher<GetAuditByIdResult>(
      `${AUDIT_API_ROUTE}/${String(auditId)}`,
      authAPIOptions,
      otherOptions,
      {
        cache: 'no-store',
      }
    );

  return {
    createAudit,
    getAudits,
    getAuditById,
  };
};
