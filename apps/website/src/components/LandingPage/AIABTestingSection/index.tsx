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
            className="mb-6 border text-text rounded-full text-sm font-medium"
          >
            {betaTag}
          </Tag>

          {/* Main Title */}
          <h2 className="mb-6 text-4xl font-normal leading-tight text-text sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mb-10 text-lg leading-relaxed text-neutral max-w-4xl sm:text-xl md:text-xl">
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
              color={LinkColor.CUSTOM}
              label={ctaButton.label.value}
              className="hover:scale-105 px-4 py-2 rounded-full"
            >
              <span className="flex items-center gap-2">
                <span className="block text-lg">{ctaButton.text}</span>
                <span className="block">
                  <ArrowRightIcon width={20} height={20} />
                </span>
              </span>
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
