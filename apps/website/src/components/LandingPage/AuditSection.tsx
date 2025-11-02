'use client';

import { AuditYourProject } from '@components/AuditPage';
import { Button, Input } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';

export const AuditSection: FC = () => {
  const [domain, setDomain] = useState('');
  const [submittedDomain, setSubmittedDomain] = useState<string | null>(null);
  const { title, placeholder, submitLabel } = useIntlayer('audit-section');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = domain.trim();
    if (!trimmed) return;
    setSubmittedDomain(trimmed);
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col p-6">
          <h2 className="font-semibold text-2xl md:text-3xl">{title.value}</h2>
          <form
            onSubmit={onSubmit}
            className="mt-4 flex w-full flex-col gap-3 sm:flex-row"
          >
            <Input
              placeholder={placeholder.value}
              value={domain}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDomain(e.target.value)
              }
            />
            <Button type="submit" label={submitLabel.value} color="text">
              {submitLabel.value}
            </Button>
          </form>
        </div>

        <div className="p-6">
          <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <AuditYourProject domain={submittedDomain ?? undefined} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuditSection;
