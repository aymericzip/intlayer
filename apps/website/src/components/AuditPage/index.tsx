import type { FC } from 'react';

type AuditYourProjectProps = {
  domain?: string;
};

export const AuditYourProject: FC<AuditYourProjectProps> = ({ domain }) => {
  return <div>AuditYourProject{domain ? `: ${domain}` : ''}</div>;
};
