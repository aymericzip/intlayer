'use client';

import { Building, Sparkles, Webhook } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { AnimatedDiv } from './AnimatedDiv';

const iconMap: Record<string, ReactNode> = {
  sparkles: <Sparkles className="size-6" />,
  building: <Building className="size-6" />,
  webhook: <Webhook className="size-6" />,
};

export const ComingSoonSection: FC = () => {
  const { comingSoonTitle, comingSoonFeatures } = useIntlayer(
    'cms-landing-coming-soon'
  );

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <h2 className="mb-16 text-center font-bold text-3xl text-text sm:text-4xl">
          {comingSoonTitle}
        </h2>

        <div className="m-auto mt-3 flex w-full flex-wrap justify-evenly gap-x-6 gap-y-16 px-3 py-2">
          {comingSoonFeatures.map(
            (feature: (typeof comingSoonFeatures)[number]) => (
              <AnimatedDiv
                key={feature.id.value}
                className="flex max-w-[280px] flex-col items-center gap-4 text-center"
              >
                <span className="flex size-12 items-center justify-center rounded-full border-4 border-lime-300 text-2xl text-lime-800 dark:border-lime-900 dark:text-lime-600">
                  {iconMap[feature.icon.value]}
                </span>
                <div>
                  <h3 className="mb-2 flex items-center justify-center gap-2 font-semibold text-lg text-text">
                    {feature.title}
                    {feature.badge && (
                      <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 font-medium text-secondary text-xs">
                        {feature.badge}
                      </span>
                    )}
                  </h3>
                  <p className="text-neutral text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedDiv>
            )
          )}
        </div>
      </div>
    </section>
  );
};
