import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

export const ComingSoonSection: FC = () => {
  const { comingSoonTitle, comingSoonFeatures } = useIntlayer(
    'cms-landing-coming-soon'
  );

  return (
    <ProductSection>
      <SectionHeading title={comingSoonTitle} />
      <Reveal>
        <ul className="divide-y divide-text/10 border-y border-text/10">
          {comingSoonFeatures.map((feature) => (
            <li
              key={feature.id.value}
              className="grid grid-cols-1 gap-2 py-6 md:grid-cols-12 md:gap-8"
            >
              <h3 className="text-base font-medium text-foreground md:col-span-4">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground md:col-span-7">
                {feature.description}
              </p>
              {feature.badge && (
                <span className="font-mono text-xs text-muted-foreground md:col-span-1 md:text-end">
                  {feature.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </ProductSection>
  );
};
