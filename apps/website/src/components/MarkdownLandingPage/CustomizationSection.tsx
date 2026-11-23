import type { FC } from 'react';
import { type IntlayerNode, useIntlayer } from 'react-intlayer';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from '~/components/ProductLanding/motion';

type ScopeProps = {
  title: IntlayerNode;
  codeBlockTitle: IntlayerNode;
  code: string;
};

const Scope: FC<ScopeProps> = ({ title, codeBlockTitle, code }) => (
  <RevealItem className="flex h-full flex-col gap-4">
    <h3 className="text-lg font-medium text-foreground">{title}</h3>
    <CodePanel
      label={codeBlockTitle}
      code={code}
      lang="tsx"
      className="flex-1"
    />
  </RevealItem>
);

export const CustomizationSection: FC = () => {
  const { title, description, global, local, footnote } = useIntlayer(
    'customization-section-markdown'
  );

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <RevealGroup className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        <Scope
          title={global.title}
          codeBlockTitle={global.codeBlockTitle}
          code={global.code.value}
        />
        <Scope
          title={local.title}
          codeBlockTitle={local.codeBlockTitle}
          code={local.code.value}
        />
      </RevealGroup>

      <Reveal>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {footnote}
        </p>
      </Reveal>
    </ProductSection>
  );
};
