'use client';

import { DatabaseIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';
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
        href: PagesRoutes.CMS,
        text: ctaButton.text,
        label: ctaButton.label.value,
      }}
    />
  );
};
