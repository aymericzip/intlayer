import {
  App_Dashboard_Editor,
  Website_Doc_IntlayerCMS_Path,
} from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WindowFrame } from '~/components/ProductLanding/layout';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
import { ProductHero } from '~/components/ProductLanding/ProductHero';
import CMSScreenshot from './CMS_screenshot.png';

export const HeroSection: FC = () => {
  const { heroTag, heroTitle, heroDescription, primaryCta, secondaryCta } =
    useIntlayer('cms-landing-hero');

  return (
    <ProductHero
      eyebrow={heroTag}
      title={heroTitle}
      description={heroDescription}
      actions={
        <>
          <ProductAction
            isPrimary
            to={App_Dashboard_Editor}
            label={primaryCta.value}
          >
            {primaryCta}
          </ProductAction>
          <ProductAction
            to={Website_Doc_IntlayerCMS_Path}
            label={secondaryCta.value}
          >
            {secondaryCta}
          </ProductAction>
        </>
      }
      visual={
        <WindowFrame title={heroTag}>
          <img
            src={CMSScreenshot}
            alt="Intlayer CMS - Visual content management interface"
            className="block w-full"
            fetchPriority="high"
          />
        </WindowFrame>
      }
    />
  );
};
