import { cn } from '@intlayer/design-system/utils';
import { m } from 'framer-motion';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { EASE_OUT, Reveal } from '~/components/ProductLanding/motion';

/**
 * Relative parse + render throughput, expressed as a multiple of the slowest
 * contender so the bar widths stay meaningful whatever the absolute numbers.
 *
 * Held in the component rather than in the dictionary: a ratio is geometry, not
 * copy, and library names are not translated.
 */
const THROUGHPUT_BARS = [
  { label: 'Intlayer', value: '5×', ratio: 1, isHighlighted: true },
  { label: 'markdown-to-jsx', value: '1×', ratio: 0.2, isHighlighted: false },
] as const;

export const BenchmarkSection: FC = () => {
  const { title, description, barsCaption, stats } = useIntlayer(
    'benchmark-section-markdown'
  );

  return (
    <ProductSection id="benchmark">
      <SectionHeading title={title} description={description} />

      <Reveal className="rounded-2xl border border-text/10 bg-card">
        <div className="flex flex-col gap-6 p-6 md:p-8">
          {THROUGHPUT_BARS.map(({ label, value, ratio, isHighlighted }) => (
            <div key={label} className="flex flex-col gap-2">
              <div className="flex items-baseline justify-between font-mono text-sm">
                <span
                  className={
                    isHighlighted ? 'text-foreground' : 'text-muted-foreground'
                  }
                >
                  {label}
                </span>
                <span
                  className={cn(
                    'tabular-nums',
                    isHighlighted ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {value}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-sm bg-text/5">
                <m.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: ratio }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, ease: EASE_OUT }}
                  className={cn(
                    'h-full w-full rounded-sm ltr:origin-left rtl:origin-right',
                    isHighlighted
                      ? 'bg-lime-600 dark:bg-lime-300'
                      : 'bg-text/25'
                  )}
                />
              </div>
            </div>
          ))}
          <p className="font-mono text-xs text-muted-foreground">
            {barsCaption}
          </p>
        </div>

        <dl className="grid grid-cols-1 divide-y divide-text/10 border-t border-text/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.value.value} className="flex flex-col gap-2 p-6">
              <dt className="order-2 text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="order-1 text-3xl font-medium text-foreground tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </ProductSection>
  );
};
