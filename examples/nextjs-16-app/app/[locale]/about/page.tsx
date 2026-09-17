import type { NextPageIntlayer } from 'next-intlayer';
import { useIntlayer } from 'next-intlayer/server';
import { Suspense } from 'react';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

const AboutPageContent = () => {
  const { title } = useIntlayer('about-page');

  return (
    <div>
      <h1 className="font-bold text-2xl text-neutral-400">{title}</h1>
    </div>
  );
};

const AboutPage: NextPageIntlayer = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <LocaleSwitcher />
    <AboutPageContent />
  </Suspense>
);

export default AboutPage;
