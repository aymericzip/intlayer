'use client';

import { Link } from '@components/Link/Link';
import {
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { ArrowRightIcon, ToggleRightIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const FeatureFlagsSection: FC = () => {
  const { tag, title, description, ctaButton } = useIntlayer(
    'feature-flags-section'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        {/* Tag */}
        <Tag
          size={TagSize.SM}
          border={TagBorder.WITH}
          color={TagColor.TEXT}
          className="mb-6 rounded-full border font-medium text-sm"
        >
          <span className="flex items-center gap-2">
            <ToggleRightIcon className="size-3" />
            {tag}
          </span>
        </Tag>

        {/* Title */}
        <h2 className="mb-6 max-w-5xl font-bold text-2xl text-text leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="mb-10 max-w-4xl text-left text-neutral leading-relaxed">
          {description}
        </p>

        {/* CTA */}
        <Link
          href={PagesRoutes.CMS}
          variant={LinkVariant.BUTTON}
          color={LinkColor.TEXT}
          label={ctaButton.label.value}
          roundedSize="full"
          size="md"
          className="ml-auto"
        >
          <span className="flex items-center gap-2">
            {ctaButton.text}
            <ArrowRightIcon width={20} height={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};
