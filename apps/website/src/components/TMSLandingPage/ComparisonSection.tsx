'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

export const ComparisonSection: FC = () => {
  const { comparisonTitle, comparisonHeaders, comparisonRows } =
    useIntlayer('tms-landing');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-3xl text-text sm:text-4xl">
            {comparisonTitle}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-3xl border border-neutral-200 bg-background shadow-sm dark:border-neutral-800"
        >
          <div className="grid grid-cols-3 bg-neutral-50 p-6 font-semibold text-neutral-500 dark:bg-neutral-900">
            <div className="col-span-1">{comparisonHeaders.feature}</div>
            <div className="col-span-1 font-bold text-text">
              {comparisonHeaders.intlayer}
            </div>
            <div className="col-span-1 text-neutral">
              {comparisonHeaders.others}
            </div>
          </div>
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {comparisonRows.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center p-6 text-sm sm:text-base"
              >
                <div className="col-span-1 font-medium text-text">
                  {row.feature}
                </div>
                <div className="col-span-1 flex items-center gap-2 font-semibold text-text">
                  <CheckCircle className="size-5 text-green-500" />
                  {row.intlayer}
                </div>
                <div className="col-span-1 flex items-center gap-2 text-neutral">
                  <XCircle className="size-5 text-neutral-400" />
                  {row.others}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
