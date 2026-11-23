import { Website_Doc_Markdown_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
import { ProductFinalCTA } from '~/components/ProductLanding/ProductFinalCTA';

export const FinalCTASection: FC = () => {
  const { finalCtaTitle, finalCtaDescription, finalCtaButton } = useIntlayer(
    'final-cta-section-markdown'
  );

  return (
    <ProductFinalCTA
      title={finalCtaTitle}
      description={finalCtaDescription}
      actions={
        <ProductAction
          isPrimary
          to={Website_Doc_Markdown_Path}
          label={finalCtaButton.value}
        >
          {finalCtaButton}
        </ProductAction>
      }
    />
  );
};
