'use client';

import { Link } from '@components/Link/Link';
import { AnalyzerForm } from '@components/ScannerPage/Analyzer/Form/AnalyzerForm';
import { getLocalizedUrl } from '@intlayer/core';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const AuditSection: FC = () => {
  const { title, description, goToScanner } = useIntlayer('audit-page');
  const router = useRouter();
  const { locale } = useLocale();

  const handleAnalyze = (url: string) => {
    router.push(
      `${getLocalizedUrl(PagesRoutes.Scanner, locale)}?url=${encodeURIComponent(url)}&auto_start=true`
    );
  };

  return (
    <section className="flex w-full flex-col gap-16 overflow-hidden px-20 py-20">
      <h2 className="mx-auto max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
        {title}
      </h2>
      <p className="m-auto max-w-2xl text-center text-lg text-neutral leading-relaxed sm:text-xl md:text-xl">
        {description}
      </p>
      <div className="m-auto flex w-full max-w-lg flex-col justify-end gap-2">
        <AnalyzerForm onAnalyze={handleAnalyze} className="m-auto mt-10" />
        <Link
          href={PagesRoutes.Scanner}
          className="flex w-full items-center justify-end gap-2 px-2 text-sm"
          label={goToScanner.text}
          color="neutral"
        >
          {goToScanner.text}
        </Link>
      </div>
    </section>
  );
};
