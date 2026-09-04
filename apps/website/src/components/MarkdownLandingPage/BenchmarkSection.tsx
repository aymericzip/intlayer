import { Container } from '@intlayer/design-system/container';
import { cn } from '@intlayer/design-system/utils';
import { m } from 'framer-motion';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

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

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const MotionContainer = m.create(Container);

export const BenchmarkSection: FC = () => {
  const { title, description, barsCaption, stats } = useIntlayer(
    'benchmark-section-markdown'
  );

  return (
    <section id="benchmark" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <m.div {...fadeUp} className="mb-14 text-center">
          <h2 className="font-bold text-3xl text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        </m.div>

        <MotionContainer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          roundedSize="3xl"
          border={true}
          background="with"
          padding="lg"
        >
          <div className="flex flex-col gap-6">
            {THROUGHPUT_BARS.map(({ label, value, ratio, isHighlighted }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between text-sm">
                  <span
                    className={cn(
                      'font-medium',
                      isHighlighted ? 'text-foreground' : 'text-neutral'
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      'font-semibold tabular-nums',
                      isHighlighted ? 'text-foreground' : 'text-neutral'
                    )}
                  >
                    {value}
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-neutral/10">
                  <m.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${ratio * 100}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={cn(
                      'h-full rounded-full',
                      isHighlighted ? 'bg-text' : 'bg-neutral/40'
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-muted-foreground text-xs">{barsCaption}</p>
        </MotionContainer>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <MotionContainer
              key={stat.value.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              roundedSize="3xl"
              border={true}
              background="with"
              padding="lg"
            >
              <div className="font-bold text-3xl text-foreground">
                {stat.value}
              </div>
              <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                {stat.label}
              </p>
            </MotionContainer>
          ))}
        </div>
      </div>
    </section>
  );
};
