'use client';

import { Link } from '@components/Link/Link';
import { Tag, type TagColor } from '@intlayer/design-system/tag';
import { ArrowRightIcon } from 'lucide-react';
import type { FC, ReactNode } from 'react';

export interface ProductSectionLayoutProps {
  tag: ReactNode;
  tagColor?: TagColor;
  title: ReactNode;
  description: ReactNode;
  cta: {
    href: string;
    text: ReactNode;
    label: string;
    isExternal?: boolean;
  };
}

export const ProductSectionLayout: FC<ProductSectionLayoutProps> = ({
  tag,
  tagColor = 'text',
  title,
  description,
  cta,
}) => {
  return (
    <div className="flex w-full max-w-xl flex-col items-center py-10 text-center">
      {/* Tag */}
      <Tag
        size="sm"
        border="with"
        color={tagColor}
        className="mb-6 rounded-full border font-medium text-sm"
      >
        {tag}
      </Tag>

      {/* Main Title */}
      <h2 className="mb-6 max-w-5xl text-center font-bold text-2xl text-text leading-tight">
        {title}
      </h2>

      {/* Description */}
      <div className="mb-10 grow text-left text-neutral leading-relaxed">
        {description}
      </div>

      {/* CTA Button */}
      <div className="flex w-full justify-end">
        <Link
          href={cta.href}
          isExternalLink={cta.isExternal}
          target={cta.isExternal ? '_blank' : undefined}
          variant="button"
          color="text"
          label={cta.label}
          roundedSize="full"
          size="md"
        >
          <span className="flex items-center gap-2">
            {cta.text}
            <ArrowRightIcon width={20} height={20} />
          </span>
        </Link>
      </div>
    </div>
  );
};
