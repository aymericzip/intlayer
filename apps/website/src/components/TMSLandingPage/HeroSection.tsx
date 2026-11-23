import {
  App_Dashboard_Projects,
  App_Pricing,
} from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WindowFrame } from '~/components/ProductLanding/layout';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
import { ProductHero } from '~/components/ProductLanding/ProductHero';
import TMSScreenshot from './TMS_screenshot.png';

export const HeroSection: FC = () => {
  const {
    heroTag,
    heroTitle,
    heroDescription,
    primaryCta,
    secondaryCta,
    screenshotAlt,
  } = useIntlayer('hero-section-tms');

  return (
    <ProductHero
      eyebrow={heroTag}
      title={heroTitle}
      description={heroDescription}
      actions={
        <>
          <ProductAction
            isPrimary
            to={App_Dashboard_Projects}
            label={primaryCta.value}
          >
            {primaryCta}
          </ProductAction>
          <ProductAction to={App_Pricing} label={secondaryCta.value}>
            {secondaryCta}
          </ProductAction>
        </>
      }
      visual={
        <WindowFrame title={heroTag}>
          <img
            src={TMSScreenshot}
            alt={screenshotAlt.value}
            className="block w-full"
            fetchPriority="high"
          />
        </WindowFrame>
      }
    />
  );
};
