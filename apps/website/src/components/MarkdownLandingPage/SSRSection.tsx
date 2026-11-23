import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { RevealGroup, RevealItem } from '~/components/ProductLanding/motion';

type StepProps = {
  title: IntlayerNode;
  description: IntlayerNode;
  codeBlockTitle: IntlayerNode;
  code: string;
  lang: 'typescript' | 'tsx';
};

const Step: FC<StepProps> = ({
  title,
  description,
  codeBlockTitle,
  code,
  lang,
}) => (
  <RevealItem className="flex h-full flex-col gap-4">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
    <CodePanel
      label={codeBlockTitle}
      code={code}
      lang={lang}
      className="flex-1"
    />
  </RevealItem>
);

export const SSRSection: FC = () => {
  const { title, description, server, client } = useIntlayer(
    'ssr-section-markdown'
  );

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        <Step
          title={server.title}
          description={server.description}
          codeBlockTitle={server.codeBlockTitle}
          code={server.code.value}
          lang="typescript"
        />
        <Step
          title={client.title}
          description={client.description}
          codeBlockTitle={client.codeBlockTitle}
          code={client.code.value}
          lang="tsx"
        />
      </RevealGroup>
    </ProductSection>
  );
};
