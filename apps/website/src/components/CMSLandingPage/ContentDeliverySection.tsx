import { cn } from '@intlayer/design-system/utils';
import { RefreshCw, Server, Zap } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { Reveal } from '~/components/ProductLanding/motion';

const iconMap: Record<string, ReactNode> = {
  server: <Server />,
  refresh: <RefreshCw />,
  zap: <Zap />,
};

/** The mode whose badge carries the accent: the one that skips rebuilds. */
const HIGHLIGHTED_MODE = 'live-sync';

export const ContentDeliverySection: FC = () => {
  const { deliveryTitle, deliveryDescription, deliveryModes } = useIntlayer(
    'cms-landing-content-delivery'
  );

  return (
    <ProductSection>
      <SectionHeading title={deliveryTitle} description={deliveryDescription} />

      <Reveal>
        <ul className="grid grid-cols-1 divide-y divide-text/10 rounded-2xl border border-text/10 bg-card md:grid-cols-3 md:divide-x md:divide-y-0">
          {deliveryModes.map((mode) => (
            <li key={mode.id.value} className="flex flex-col gap-4 p-6">
              <span className="flex text-muted-foreground [&_svg]:size-[18px] [&_svg]:stroke-[1.5]">
                {iconMap[mode.icon.value] ?? <Zap />}
              </span>
              <h3 className="text-lg font-medium text-foreground">
                {mode.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {mode.description}
              </p>
              {mode.badge && (
                <span
                  className={cn(
                    'mt-auto font-mono text-xs',
                    mode.id.value === HIGHLIGHTED_MODE
                      ? 'text-lime-800 dark:text-lime-300'
                      : 'text-muted-foreground'
                  )}
                >
                  {mode.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </ProductSection>
  );
};
