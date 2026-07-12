import type { FC } from 'react';
import type { AuditStatus } from '../../scan/types';

/** Colored ✓ / ⚠ / ✗ (or spinner dot) matching an audit check status. */
export const StatusIcon: FC<{ status?: AuditStatus }> = ({ status }) => {
  if (status === 'success') return <span className="status success">✓</span>;
  if (status === 'warning') return <span className="status warning">⚠</span>;
  if (status === 'error') return <span className="status error">✗</span>;
  return <span className="status pending">•</span>;
};
