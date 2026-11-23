import { Website_Doc_CLI_Fill_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
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
          <Link
            to={Website_Doc_CLI_Fill_Path}
            variant="button"
            color="text"
            size="lg"
            label={readDocumentation.value}
          >
            {readDocumentation}
          </Link>
          <Link
            to="#commands"
            variant="button-outlined"
            color="text"
            size="lg"
            label={exploreCLICommands.value}
          >
            {exploreCLICommands}
          </Link>
        </>
      }
      aside={
        <CodePanel label={quickStartTitle} code={code.value} lang="bash" />
      }
    />
  );
};
