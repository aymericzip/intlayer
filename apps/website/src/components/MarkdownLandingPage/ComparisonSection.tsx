import { Container } from '@intlayer/design-system/container';
import {
  PopoverStatic,
  type PopoverYAlign,
} from '@intlayer/design-system/popover';
import { cn } from '@intlayer/design-system/utils';
import { m } from 'framer-motion';
import { Check, Minus, X } from 'lucide-react';
import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';

/** How completely a library covers a capability. */
type SupportLevel = 'supported' | 'partial' | 'notSupported';

/**
 * The compared libraries, in column order. Package names are not translated,
 * so they live here rather than in the dictionary.
 */
const LIBRARIES = [
  { name: 'Intlayer', isHighlighted: true },
  { name: 'markdown-to-jsx', isHighlighted: false },
  { name: 'marked', isHighlighted: false },
  { name: 'remark / rehype', isHighlighted: false },
  { name: '@mdx-js', isHighlighted: false },
] as const;

/** One support level per library, in the {@link LIBRARIES} column order. */
type SupportRow = readonly [
  SupportLevel,
  SupportLevel,
  SupportLevel,
  SupportLevel,
  SupportLevel,
];

/**
 * Capability coverage per library, keyed by the row `id` of the dictionary.
 *
 * `partial` covers both a capability reached only through extra packages — MDX
 * via `remark-mdx`, React output via `rehype-react` — and one that exists but
 * in a weaker form, such as the HTML string `marked` returns in place of
 * framework components.
 */
const SUPPORT_MATRIX: Record<string, SupportRow> = {
  mdx: ['supported', 'notSupported', 'notSupported', 'partial', 'supported'],
  typing: ['supported', 'notSupported', 'partial', 'partial', 'partial'],
  react: ['supported', 'supported', 'notSupported', 'partial', 'supported'],
  frameworks: ['supported', 'notSupported', 'partial', 'partial', 'partial'],
  ssr: ['supported', 'notSupported', 'partial', 'supported', 'partial'],
  config: ['supported', 'supported', 'partial', 'notSupported', 'notSupported'],
  frontmatter: [
    'supported',
    'notSupported',
    'notSupported',
    'partial',
    'partial',
  ],
  dependencies: [
    'supported',
    'supported',
    'supported',
    'notSupported',
    'notSupported',
  ],
  purge: [
    'supported',
    'notSupported',
    'notSupported',
    'notSupported',
    'notSupported',
  ],
};

const SUPPORT_ICONS: Record<SupportLevel, typeof Check> = {
  supported: Check,
  partial: Minus,
  notSupported: X,
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const MotionContainer = m.create(Container);

type SupportCellProps = {
  level: SupportLevel;
  label: string;
  libraryName: string;
  feature: IntlayerNode;
  isHighlighted: boolean;
  /**
   * Side the popover opens on. Rows near the bottom open upwards, because the
   * matrix scrolls on its own axis and would otherwise clip the panel.
   */
  yAlign: PopoverYAlign;
};

const SupportCell: FC<SupportCellProps> = ({
  level,
  label,
  libraryName,
  feature,
  isHighlighted,
  yAlign,
}) => {
  const Icon = SUPPORT_ICONS[level];

  return (
    <PopoverStatic
      identifier="comparison-cell"
      className="items-center justify-center"
    >
      <span
        className={cn(
          'flex size-6 items-center justify-center rounded-full',
          level === 'supported' &&
            isHighlighted &&
            'bg-text/60 text-text-opposite',
          level === 'supported' &&
            !isHighlighted &&
            'bg-neutral/20 text-foreground',
          level === 'partial' && 'border border-neutral/30 text-neutral',
          level === 'notSupported' && 'text-neutral/40'
        )}
      >
        <Icon className="size-3.5" strokeWidth={3} />
        <span className="sr-only">{label}</span>
      </span>

      <PopoverStatic.Detail
        identifier="comparison-cell"
        xAlign="center"
        yAlign={yAlign}
        className="flex w-max max-w-56 flex-col gap-1 p-3 text-left text-xs"
      >
        <strong className="text-foreground">{libraryName}</strong>
        <span className="text-muted-foreground">{feature}</span>
        <span>{label}</span>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};

/** Column template shared by the header and every row of the matrix. */
const GRID_TEMPLATE = 'grid grid-cols-[minmax(14rem,1.6fr)_repeat(5,1fr)]';

/**
 * Number of trailing rows whose popover opens upwards. Below them the matrix
 * runs out of room and its scroll container would cut the panel off.
 */
const POPOVER_FLIP_ROWS = 2;

export const ComparisonSection: FC = () => {
  const {
    comparisonTitle,
    comparisonDescription,
    featureHeader,
    legend,
    rows,
    notes,
  } = useIntlayer('comparison-section-markdown');

  const levelLabels: Record<SupportLevel, string> = {
    supported: legend.supported.value,
    partial: legend.partial.value,
    notSupported: legend.notSupported.value,
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
        <m.div {...fadeUp} className="mb-14 text-center">
          <h2 className="font-bold text-3xl text-foreground sm:text-4xl">
            {comparisonTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            {comparisonDescription}
          </p>
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
          {/* The matrix is wider than a phone: it scrolls on its own axis
              rather than making the page scroll horizontally. */}
          <div className="overflow-x-auto">
            <div className="min-w-3xl">
              {/* Header */}
              <div
                className={cn(
                  GRID_TEMPLATE,
                  'gap-2 bg-neutral/5 px-6 py-5 font-semibold text-muted-foreground text-sm'
                )}
              >
                <div>{featureHeader}</div>
                {LIBRARIES.map(({ name, isHighlighted }) => (
                  <div
                    key={name}
                    className={cn(
                      'text-center',
                      isHighlighted
                        ? 'font-bold text-foreground'
                        : 'text-neutral'
                    )}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="divide-y divide-neutral/10">
                {rows.map(
                  (
                    row: { id: IntlayerNode; feature: IntlayerNode },
                    rowIndex: number
                  ) => {
                    const support = SUPPORT_MATRIX[row.id.value];

                    if (!support) return null;

                    return (
                      <div
                        key={row.id.value}
                        className={cn(
                          GRID_TEMPLATE,
                          'items-center gap-2 px-6 py-4 text-sm hover:bg-neutral/5'
                        )}
                      >
                        <div className="pr-4 font-medium text-foreground">
                          {row.feature}
                        </div>
                        {support.map((level, index) => (
                          <SupportCell
                            key={LIBRARIES[index]!.name}
                            level={level}
                            label={levelLabels[level]}
                            libraryName={LIBRARIES[index]!.name}
                            feature={row.feature}
                            isHighlighted={LIBRARIES[index]!.isHighlighted}
                            yAlign={
                              rowIndex >= rows.length - POPOVER_FLIP_ROWS
                                ? 'above'
                                : 'below'
                            }
                          />
                        ))}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-neutral/10 border-t px-6 py-4 text-muted-foreground text-xs">
            {(['supported', 'partial', 'notSupported'] as const).map(
              (level) => {
                const Icon = SUPPORT_ICONS[level];

                return (
                  <span key={level} className="flex items-center gap-2">
                    <Icon className="size-3.5" strokeWidth={3} />
                    {legend[level]}
                  </span>
                );
              }
            )}
          </div>
        </MotionContainer>

        <ul className="mt-6 flex flex-col gap-2 text-muted-foreground text-sm">
          {(['pluginChain', 'frameworks', 'frontmatter'] as const).map(
            (noteKey) => (
              <li
                key={noteKey}
                className="before:mr-2 before:text-neutral/50 before:content-['—']"
              >
                {notes[noteKey]}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
};
