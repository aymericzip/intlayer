import { Website_Doc_Markdown_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
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
        <Link
          to={Website_Doc_Markdown_Path}
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
