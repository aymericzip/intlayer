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
import { m } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalLinks } from '@/Routes';

export const AIABTestingSection: FC = () => {
  const { betaTag, title, description, ctaButton } = useIntlayer(
    'ai-ab-testing-section'
  );

  return (
    <section className="w-full py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center text-center"
        >
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
          <h2 className="mb-6 max-w-5xl font-bold text-3xl text-text leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mb-10 max-w-4xl text-lg text-neutral leading-relaxed sm:text-xl md:text-xl">
            {description}
          </p>

          {/* CTA Button */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <Link
              href={ExternalLinks.AI_Landing_Page}
              isExternalLink
              target="_blank"
              rel={undefined}
              variant={LinkVariant.BUTTON}
              color={LinkColor.TEXT}
              label={ctaButton.label.value}
              roundedSize="full"
              size="lg"
            >
              <span className="flex items-center gap-2">
                {ctaButton.text}
                <ArrowRightIcon width={20} height={20} />
              </span>
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
