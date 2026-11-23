import {
  App_Dashboard_Projects,
  App_Pricing,
} from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { WindowFrame } from '~/components/ProductLanding/layout';
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
          <Link
            to={App_Dashboard_Projects}
            variant="button"
            color="text"
            size="lg"
            label={primaryCta.value}
          >
            {primaryCta}
          </Link>
          <Link
            to={App_Pricing}
            variant="button-outlined"
            color="text"
            size="lg"
            label={secondaryCta.value}
          >
            {secondaryCta}
          </Link>
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
