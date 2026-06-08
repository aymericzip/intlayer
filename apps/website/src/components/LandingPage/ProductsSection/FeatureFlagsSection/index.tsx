'use client';

import { Website_CMS_Path } from '@intlayer/design-system/routes';
import { ToggleRightIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
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
        href: Website_CMS_Path,
        text: ctaButton.text,
        label: ctaButton.label.value,
      }}
    />
  );
};
