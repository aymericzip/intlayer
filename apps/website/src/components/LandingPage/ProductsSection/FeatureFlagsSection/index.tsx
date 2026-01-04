'use client';

import { ToggleRightIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
import { ProductSectionLayout } from '../ProductSectionLayout';

export const FeatureFlagsSection: FC = () => {
  const { tag, title, description, ctaButton } = useIntlayer(
    'feature-flags-section'
  );

  return (
    <ProductSectionLayout
      tag={
        <span className="flex items-center gap-2">
          <ToggleRightIcon className="size-3" />
          {tag}
        </span>
      }
      title={title}
      description={<p>{description}</p>}
      cta={{
        href: PagesRoutes.CMS,
        text: ctaButton.text,
        label: ctaButton.label.value,
      }}
    />
  );
};
