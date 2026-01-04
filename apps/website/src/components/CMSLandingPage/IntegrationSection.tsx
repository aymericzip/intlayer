'use client';

import { Link } from '@components/Link/Link';
import { LinkColor, LinkVariant } from '@intlayer/design-system';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { PagesRoutes } from '@/Routes';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export const IntegrationSection: FC = () => {
  const { integrationTitle, integrationDescription, integrationCta } =
    useIntlayer('cms-landing');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-12">
        <motion.div
          {...fadeUp}
          className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16"
        >
          {/* Left side - Icon and visual */}
          <div className="flex items-center justify-center rounded-full bg-neutral-100 p-5 text-neutral-700 transition-colors group-hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:group-hover:bg-neutral-700">
            <Globe className="size-16" />
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h2 className="font-bold text-3xl text-text sm:text-4xl">
              {integrationTitle}
            </h2>
            <p className="max-w-xl text-lg text-neutral leading-relaxed">
              {integrationDescription}
            </p>
            <div>
              <Link
                href={PagesRoutes.Home}
                variant={LinkVariant.BUTTON}
                color={LinkColor.TEXT}
                label={integrationCta.value}
                size="lg"
                roundedSize="full"
                className="group inline-flex items-center gap-2"
              >
                <span className="flex flex-row flex-nowrap items-center gap-2 text-sm sm:text-lg">
                  {integrationCta}
                  <ArrowRight className="size-4 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
