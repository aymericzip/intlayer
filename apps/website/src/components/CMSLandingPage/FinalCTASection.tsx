import { App_Onboarding, App_Pricing } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { ProductFinalCTA } from '~/components/ProductLanding/ProductFinalCTA';

export const FinalCTASection: FC = () => {
  const {
    finalCtaTitle,
    finalCtaDescription,
    finalCtaPrimary,
    finalCtaSecondary,
  } = useIntlayer('cms-landing-final-cta');

  return (
    <ProductFinalCTA
      title={finalCtaTitle}
      description={finalCtaDescription}
      actions={
        <>
          <Link
            to={App_Onboarding}
            variant="button"
            color="text"
            size="lg"
            label={finalCtaPrimary.value}
          >
            {finalCtaPrimary}
          </Link>
          <Link
            to={App_Pricing}
            variant="button-outlined"
            color="text"
            size="lg"
            label={finalCtaSecondary.value}
          >
            {finalCtaSecondary}
          </Link>
        </>
      }
    />
  );
};
