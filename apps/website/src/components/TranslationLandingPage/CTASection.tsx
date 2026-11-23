import { Website_Doc_CLI_Fill_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
import { ProductAction } from '~/components/ProductLanding/ProductAction';
import { ProductFinalCTA } from '~/components/ProductLanding/ProductFinalCTA';

export const CTASection: FC = () => {
  const {
    title,
    description,
    exploreCLICommands,
    readDocumentation,
    quickStartTitle,
    code,
  } = useIntlayer('cta-section');

  return (
    <ProductFinalCTA
      id="get-started"
      title={title}
      description={description}
      actions={
        <>
          <ProductAction
            isPrimary
            to={Website_Doc_CLI_Fill_Path}
            label={readDocumentation.value}
          >
            {readDocumentation}
          </ProductAction>
          <ProductAction to="#commands" label={exploreCLICommands.value}>
            {exploreCLICommands}
          </ProductAction>
        </>
      }
      aside={
        <CodePanel label={quickStartTitle} code={code.value} lang="bash" />
      }
    />
  );
};
