'use client';

import { TagColor } from '@intlayer/design-system';
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
      tag={betaTag}
      tagColor={TagColor.NEUTRAL}
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
