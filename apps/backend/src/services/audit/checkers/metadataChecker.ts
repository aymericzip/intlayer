import { analyzeMetadata } from '../analysis/analyzeMetadata';
import type { AuditEvent, CheerioAPI } from '../types';

export const checkMetadata = async (
  $: CheerioAPI,
  targetUrl: string,
  onEvent: (event: AuditEvent) => void
): Promise<void> => {
  const metadataData = analyzeMetadata($);

  onEvent({
    type: `url_hasCanonical\\${targetUrl}`,
    status: metadataData.hasCanonicalTag ? 'success' : 'error',
    data: {
      successDetails: metadataData.hasCanonicalTag ? true : undefined,
      errorsDetails: metadataData.hasCanonicalTag
        ? undefined
        : 'Missing canonical tag',
    },
  });
};
