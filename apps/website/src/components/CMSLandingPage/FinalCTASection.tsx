'use client';

import { Link } from '@components/Link/Link';
import { LinkColor, LinkVariant } from '@intlayer/design-system';
import { motion } from 'framer-motion';
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
  const {
    finalCtaTitle,
    finalCtaDescription,
    finalCtaPrimary,
    finalCtaSecondary,
  } = useIntlayer('cms-landing');

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-text" />

      <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8 lg:px-12">
        <motion.div {...fadeUp}>
          <h2 className="mb-6 font-bold text-3xl text-text-opposite sm:text-4xl md:text-5xl">
            {finalCtaTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-neutral-300">
            {finalCtaDescription}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center gap-4 sm:flex-row"
          >
            <Link
              href={AppRoutes.Pricing}
              variant={LinkVariant.BUTTON_OUTLINED}
              color={LinkColor.TEXT_INVERSE}
              label={finalCtaSecondary.value}
              size="lg"
              roundedSize="full"
            >
              {finalCtaSecondary}
            </Link>

            <Link
              href={AppRoutes.Onboarding}
              variant={LinkVariant.BUTTON}
              color={LinkColor.TEXT_INVERSE}
              label={finalCtaPrimary.value}
              size="xl"
              roundedSize="full"
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="flex flex-row flex-nowrap items-center gap-2 text-sm text-text sm:text-lg">
                {finalCtaPrimary}
                <ArrowRight className="size-5 transition-transform" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
