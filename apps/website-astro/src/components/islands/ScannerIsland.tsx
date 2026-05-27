/** @jsxImportSource react */

import { BackgroundLayout } from '@components/BackgroundLayout';
import { LocalizationAnalyzer } from '@components/ScannerPage';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const ScannerContent: FC = () => {
  const { title, description } = useIntlayer('audit-page');
  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />
      <main className="relative flex flex-1 flex-col items-center justify-center gap-16 px-4 pt-20 md:px-10">
        <h1 className="max-w-3xl text-center font-bold text-3xl text-text leading-tight sm:text-5xl md:text-5xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-neutral leading-relaxed">{description}</p>
        <Suspense>
          <LocalizationAnalyzer />
        </Suspense>
      </main>
    </div>
  );
};

export const ScannerIsland: FC<{ locale: LocalesValues }> = ({ locale }) => (
  <WebsiteIslandWrapper locale={locale}>
    <ScannerContent />
  </WebsiteIslandWrapper>
);
