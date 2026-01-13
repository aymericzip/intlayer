'use client';

import { Sparkles } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { ProductSectionLayout } from '../ProductSectionLayout';

export const TranslateSection: FC = () => {
  const { heroTag, heroTitle, heroSubtitle, heroDescription, primaryCta } =
    useIntlayer('translate-section');

  return (
    <ProductSectionLayout
      tag={
        <span className="flex items-center gap-2">
          <Sparkles className="size-3" />
          {heroTag}
        </span>
      }
      title={heroTitle}
      description={
        <div className="space-y-4">
          <p className="text-center font-medium text-text">{heroSubtitle}</p>
          <p>{heroDescription}</p>
        </div>
      }
      cta={{
        href: PagesRoutes.Translate,
        text: primaryCta,
        label: primaryCta.value,
      }}
    />
  );
};
