import { App_Dashboard_Projects } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
import { ProductFinalCTA } from '~/components/ProductLanding/ProductFinalCTA';

export const FinalCTASection: FC = () => {
  const { finalCtaTitle, finalCtaDescription, finalCtaButton } =
    useIntlayer('final-cta-section');

  return (
    <ProductFinalCTA
      title={finalCtaTitle}
      description={finalCtaDescription}
      actions={
        <ProductAction
          isPrimary
          to={App_Dashboard_Projects}
          label={finalCtaButton.value}
        >
          {finalCtaButton}
        </ProductAction>
      }
    />
  );
};
