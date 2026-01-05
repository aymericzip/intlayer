'use client';

import { Link } from '@components/Link/Link';
import { LinkColor, LinkVariant } from '@intlayer/design-system';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { AppRoutes } from '@/Routes';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export const FinalCTASection: FC = () => {
  const { finalCtaTitle, finalCtaDescription, finalCtaButton } =
    useIntlayer('final-cta-section');

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background fill similar to CMS CTA */}
      <div className="absolute inset-0 bg-text" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8 lg:px-12">
        <m.div {...fadeUp}>
          <h2 className="mb-6 font-bold text-3xl text-text-opposite sm:text-4xl md:text-5xl">
            {finalCtaTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-300">
            {finalCtaDescription}
          </p>

          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              href={AppRoutes.Dashboard_Projects}
              variant={LinkVariant.BUTTON}
              color={LinkColor.TEXT_INVERSE}
              label={finalCtaButton.value}
              size="xl"
              roundedSize="full"
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="flex flex-row flex-nowrap items-center gap-2 text-sm text-text sm:text-lg">
                {finalCtaButton}
                <ArrowRight className="size-5 transition-transform" />
              </span>
            </Link>
          </m.div>
        </m.div>
      </div>
    </section>
  );
};
