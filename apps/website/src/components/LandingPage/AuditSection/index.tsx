'use client';

import { Link } from '@components/Link/Link';
import { AnalyzerForm } from '@components/ScannerPage/Analyzer/Form/AnalyzerForm';
import { getLocalizedUrl } from '@intlayer/core/localization';
import { Website_Scanner_Path } from '@intlayer/design-system/routes';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const AuditSection: FC = () => {
  const { title, description, goToScanner } = useIntlayer('audit-page');
  const router = useRouter();
  const { locale } = useLocale();

  const handleAnalyze = (url: string) => {
    router.push(
      `${getLocalizedUrl(Website_Scanner_Path, locale)}?url=${encodeURIComponent(url)}&auto_start=true`
    );
  };

  return (
    <section className="flex w-full flex-col gap-16 overflow-hidden px-20 py-20">
      <h2 className="mx-auto max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
        {title}
      </h2>
      <p className="m-auto max-w-2xl text-center text-lg text-neutral leading-relaxed">
        {description}
      </p>
      <div className="m-auto flex w-full max-w-lg flex-col justify-end gap-2">
        <AnalyzerForm onAnalyze={handleAnalyze} className="m-auto mt-10" />
        <Link
          href={Website_Scanner_Path}
          className="flex w-full items-center justify-end gap-2 px-2 text-sm"
          label={goToScanner.text.value}
          color="neutral"
        >
          {goToScanner.text}
        </Link>
      </div>
    </section>
  );
};
