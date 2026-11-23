import {
  App_Dashboard_Editor,
  Website_Doc_IntlayerCMS_Path,
} from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { WindowFrame } from '~/components/ProductLanding/layout';
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
          <Link
            to={App_Dashboard_Editor}
            variant="button"
            color="text"
            size="lg"
            label={primaryCta.value}
          >
            {primaryCta}
          </Link>
          <Link
            to={Website_Doc_IntlayerCMS_Path}
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
