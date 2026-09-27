'use client';

import type {
  GetRecursiveAuditStatusParams,
  GetScannedHostParams,
  GetScannedHostsQuery,
  GetTechnologyUsageQuery,
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

/** Admin — number of scanned domains using each technology. */
export const useGetTechnologyUsage = (
  params?: GetTechnologyUsageQuery,
  options?: Partial<UseQueryOptions>
) => {
  const auditAPI = useAuditAPI();

  return useAppQuery({
    queryKey: ['audit-technology-usage', params],
    queryFn: ({ signal }) => auditAPI.getTechnologyUsage(params, { signal }),
    requireUser: true,
    ...options,
  });
};

/** Admin — scanned hosts, most recently scanned first. */
export const useGetScannedHosts = (
  params?: GetScannedHostsQuery,
  options?: Partial<UseQueryOptions>
) => {
  const auditAPI = useAuditAPI();

  return useAppQuery({
    queryKey: ['audit-scanned-hosts', params],
    queryFn: ({ signal }) => auditAPI.getScannedHosts(params, { signal }),
    requireUser: true,
    ...options,
  });
};

/** Admin — a scanned host with its stored scans, newest first. */
export const useGetScannedHost = (
  params?: GetScannedHostParams,
  options?: Partial<UseQueryOptions>
) => {
  const auditAPI = useAuditAPI();

  return useAppQuery({
    queryKey: ['audit-scanned-host', params?.host],
    queryFn: ({ signal }) => auditAPI.getScannedHost(params, { signal }),
    enabled: Boolean(params?.host),
    requireUser: true,
    ...options,
  });
};
