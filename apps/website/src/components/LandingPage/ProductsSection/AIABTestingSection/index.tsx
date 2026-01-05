'use client';

import { TestTubeIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalLinks } from '@/Routes';
import { ProductSectionLayout } from '../ProductSectionLayout';

export const AIABTestingSection: FC = () => {
  const { betaTag, title, description, ctaButton } = useIntlayer(
    'ai-ab-testing-section'
  );

  return (
    <ProductSectionLayout
      tag={
        <span className="flex items-center gap-2">
          <TestTubeIcon className="size-3" />
          {betaTag}
        </span>
      }
      title={title}
      description={<p>{description}</p>}
      cta={{
        href: ExternalLinks.AI_Landing_Page,
        text: ctaButton.text,
        label: ctaButton.label.value,
        isExternal: true,
      }}
    />
  );
};
