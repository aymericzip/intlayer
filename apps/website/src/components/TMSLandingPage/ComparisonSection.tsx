import { Check, Minus } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

/** Column template shared by the header and every row. */
const ROW_GRID = 'grid grid-cols-3 gap-4 px-4 md:px-6';

export const ComparisonSection: FC = () => {
  const { comparisonTitle, comparisonHeaders, comparisonRows } =
    useIntlayer('comparison-section');

  return (
    <ProductSection>
      <SectionHeading title={comparisonTitle} />

      <Reveal className="overflow-hidden rounded-2xl border border-text/10 bg-card">
        <div
          className={`${ROW_GRID} border-b border-text/10 py-4 text-sm text-muted-foreground`}
        >
          <div>{comparisonHeaders.feature}</div>
          <div className="font-medium text-foreground">
            {comparisonHeaders.intlayer}
          </div>
          <div>{comparisonHeaders.others}</div>
        </div>

        <ul className="divide-y divide-text/10">
          {comparisonRows.map((row) => (
            <li
              key={row.feature.value}
              className={`${ROW_GRID} items-center py-4 text-sm md:text-base`}
            >
              <div className="text-muted-foreground">{row.feature}</div>
              <div className="flex items-center gap-2 text-foreground">
                <Check className="size-4 shrink-0 text-lime-800 dark:text-lime-300" />
                {row.intlayer}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Minus className="size-4 shrink-0 text-text/30" />
                {row.others}
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </ProductSection>
  );
};
