'use client';

import type {
  GetRecursiveAuditStatusParams,
  ScanUrlBody,
  StartRecursiveAuditBody,
} from '@intlayer/api';
import { type UseQueryOptions, useMutation } from '@tanstack/react-query';
import { useAuditAPI } from '../useIntlayerAPI';
import { useAppQuery } from './utils';

export const useAuditScan = () => {
  const auditAPI = useAuditAPI();

  return useMutation({
    mutationKey: ['audit-scan'],
    mutationFn: (args: ScanUrlBody) => auditAPI.scanUrl(args),
  });
};

export const useStartRecursiveAudit = () => {
  const auditAPI = useAuditAPI();

  return useMutation({
    mutationKey: ['audit-recursive-start'],
    mutationFn: (args: StartRecursiveAuditBody) =>
      auditAPI.startRecursiveAudit(args),
  });
};

export const useGetRecursiveAuditStatus = (
  params?: GetRecursiveAuditStatusParams,
  options?: Partial<UseQueryOptions>
) => {
  const auditAPI = useAuditAPI();

  return useAppQuery({
    queryKey: ['audit-recursive-status', params?.jobId],
    queryFn: ({ signal }) =>
      auditAPI.getRecursiveAuditStatus(params, { signal }),
    enabled: Boolean(params?.jobId),
    ...options,
  });
};
