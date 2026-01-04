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
import { ArrowRightIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalLinks } from '@/Routes';

export const AIABTestingSection: FC = () => {
  const { betaTag, title, description, ctaButton } = useIntlayer(
    'ai-ab-testing-section'
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        {/* Beta Tag */}
        <Tag
          size={TagSize.SM}
          border={TagBorder.WITH}
          color={TagColor.NEUTRAL}
          className="mb-6 rounded-full border font-medium text-sm text-text"
        >
          {betaTag}
        </Tag>

        {/* Main Title */}
        <h2 className="mb-6 max-w-5xl font-bold text-2xl text-text leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="mb-10 max-w-4xl text-left text-neutral leading-relaxed">
          {description}
        </p>

        {/* CTA Button */}

        <Link
          href={ExternalLinks.AI_Landing_Page}
          isExternalLink
          target="_blank"
          rel={undefined}
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
