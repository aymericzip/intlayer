'use client';

import { Website_CMS_Path } from '@intlayer/design-system/routes';
import { DatabaseIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ProductSectionLayout } from '../ProductSectionLayout';

export const CMSSection: FC = () => {
  const { tag, title, description, ctaButton } = useIntlayer('cms-section');

  return (
    <ProductSectionLayout
      tag={
        <span className="flex items-center gap-2">
          <DatabaseIcon className="size-3" />
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
