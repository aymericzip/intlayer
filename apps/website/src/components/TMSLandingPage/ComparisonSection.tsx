'use client';

import { Container } from '@intlayer/design-system';
import { m } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const MotionContainer = m.create(Container);

export const ComparisonSection: FC = () => {
  const { comparisonTitle, comparisonHeaders, comparisonRows } =
    useIntlayer('comparison-section');

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <m.div {...fadeUp} className="mb-16 text-center">
          <h2 className="font-bold text-3xl text-text sm:text-4xl">
            {comparisonTitle}
          </h2>
        </m.div>

        <MotionContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          roundedSize="3xl"
          border={true}
          background="with"
          className="overflow-hidden p-0"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-neutral/5 p-6 font-semibold text-neutral">
            <div className="col-span-1">{comparisonHeaders.feature}</div>
            <div className="col-span-1 font-bold text-text">
              {comparisonHeaders.intlayer}
            </div>
            <div className="col-span-1 text-neutral/60">
              {comparisonHeaders.others}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral/10">
            {comparisonRows.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center p-6 text-sm hover:bg-neutral/5 sm:text-base"
              >
                <div className="col-span-1 font-medium text-text">
                  {row.feature}
                </div>

                {/* Intlayer Column */}
                <div className="col-span-1 flex items-center gap-2 font-semibold text-text">
                  <span className="flex size-6 items-center justify-center rounded-full bg-text text-text-opposite">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {row.intlayer}
                </div>

                {/* Others Column */}
                <div className="col-span-1 flex items-center gap-2 text-neutral">
                  <Minus className="size-4 text-neutral/40" />
                  {row.others}
                </div>
              </div>
            ))}
          </div>
        </MotionContainer>
      </div>
    </section>
  );
};
