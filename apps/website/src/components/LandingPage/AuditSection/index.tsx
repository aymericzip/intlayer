'use client';

import { AnalyzerForm } from '@components/ScannerPage/Analyzer/Form/AnalyzerForm';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const AuditSection: FC = () => {
  const { title, description } = useIntlayer('audit-page');
  const router = useRouter();

  const handleAnalyze = (url: string) => {
    router.push(
      `${PagesRoutes.Scanner}?url=${encodeURIComponent(url)}&auto_start=true`
    );
  };

  return (
    <section className="flex w-full flex-col gap-16 overflow-hidden px-20 py-20">
      <h1 className="mx-auto max-w-5xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
        {title}
      </h1>
      <p className="m-auto max-w-2xl text-lg text-neutral leading-relaxed sm:text-xl md:text-xl">
        {description}
      </p>
      <AnalyzerForm onAnalyze={handleAnalyze} className="m-auto mt-10" />
    </section>
  );
};
