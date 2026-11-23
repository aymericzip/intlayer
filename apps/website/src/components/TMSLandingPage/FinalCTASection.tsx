import { App_Dashboard_Projects } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { ProductFinalCTA } from '~/components/ProductLanding/ProductFinalCTA';

export const FinalCTASection: FC = () => {
  const { finalCtaTitle, finalCtaDescription, finalCtaButton } =
    useIntlayer('final-cta-section');

  return (
    <ProductFinalCTA
      title={finalCtaTitle}
      description={finalCtaDescription}
      actions={
        <Link
          to={App_Dashboard_Projects}
          variant="button"
          color="text"
          size="lg"
          label={finalCtaButton.value}
        >
          {finalCtaButton}
        </Link>
      }
    />
  );
};
