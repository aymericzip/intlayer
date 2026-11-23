import { App_Onboarding, App_Pricing } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
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
          <ProductAction
            isPrimary
            to={App_Onboarding}
            label={finalCtaPrimary.value}
          >
            {finalCtaPrimary}
          </ProductAction>
          <ProductAction to={App_Pricing} label={finalCtaSecondary.value}>
            {finalCtaSecondary}
          </ProductAction>
        </>
      }
    />
  );
};
