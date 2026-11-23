import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { RevealGroup, RevealItem } from '~/components/ProductLanding/motion';

export const HowItWorksSection: FC = () => {
  const { title, description, steps } = useIntlayer('how-it-works-section');

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <RevealGroup className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {steps.map((step) => (
          <RevealItem
            key={step.step.value}
            className="flex flex-col gap-3 border-t border-text/10 pt-6"
          >
            <span className="font-mono text-sm text-muted-foreground tabular-nums">
              {step.step.value.padStart(2, '0')}
            </span>
            <h3 className="text-lg font-medium text-foreground">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </ProductSection>
  );
};
