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
import { ArrowRightIcon, GlobeIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes'; // Assuming you have a route for the comparison page

export const TMSSection: FC = () => {
  const { heroTag, heroTitle, heroSubtitle, heroDescription, primaryCta } =
    useIntlayer('tms-section');

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
            <GlobeIcon className="size-3" />
            {heroTag}
          </span>
        </Tag>

        {/* Title */}
        <h2 className="mb-6 max-w-5xl font-bold text-2xl text-text leading-tight">
          {heroTitle}
        </h2>

        {/* Subtitle / Description */}
        <div className="mb-10 max-w-4xl space-y-4 text-neutral leading-relaxed">
          <p className="font-medium text-text">{heroSubtitle}</p>
          <p className="text-left">{heroDescription}</p>
        </div>

        {/* CTA */}

        <Link
          href={PagesRoutes.TMS} // Adjust route as needed
          variant={LinkVariant.BUTTON}
          color={LinkColor.TEXT}
          label={primaryCta.value}
          roundedSize="full"
          size="md"
          className="ml-auto"
        >
          <span className="flex items-center gap-2">
            {primaryCta}
            <ArrowRightIcon width={20} height={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};
