'use client';

import { Website_Doc_Path } from '@intlayer/design-system/routes';
import { Code2Icon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ProductSectionLayout } from '../ProductSectionLayout';

export const I18nCodebaseSection: FC = () => {
  const { tag, title, description, ctaButton } = useIntlayer(
    'i18n-codebase-section'
  );

  return (
    <ProductSectionLayout
      tag={
        <span className="flex items-center gap-2">
          <Code2Icon className="size-3" />
          {tag}
        </span>
      }
      title={title}
      description={<p>{description}</p>}
      cta={{
        href: Website_Doc_Path,
        text: ctaButton.text,
        label: ctaButton.label.value,
      }}
    />
  );
};
