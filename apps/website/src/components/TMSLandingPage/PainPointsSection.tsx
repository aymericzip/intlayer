import { Banknote, EyeOff, RefreshCcw } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { RevealGroup, RevealItem } from '~/components/ProductLanding/motion';

const iconMap: Record<string, ReactNode> = {
  wallet: <Banknote />,
  'refresh-alert': <RefreshCcw />,
  'eye-off': <EyeOff />,
};

export const PainPointsSection: FC = () => {
  const { painPointsTitle, painPoints } = useIntlayer('pain-points-section');

  return (
    <ProductSection>
      <SectionHeading title={painPointsTitle} />

      <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {painPoints.map((point) => (
          <RevealItem
            key={point.id.value}
            className="flex flex-col gap-4 border-t border-text/10 pt-6"
          >
            <span className="flex text-muted-foreground [&_svg]:size-[18px] [&_svg]:stroke-[1.5]">
              {iconMap[point.icon.value]}
            </span>
            <h3 className="text-lg font-medium text-foreground">
              {point.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {point.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </ProductSection>
  );
};
