import { CodeBlock } from '@intlayer/design-system/ide';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  ProductSection,
  SectionHeading,
} from '~/components/ProductLanding/layout';
import { RevealGroup, RevealItem } from '~/components/ProductLanding/motion';

export const CommandsSection: FC = () => {
  const { title, description, commands } = useIntlayer(
    'translation-commands-section'
  );

  return (
    <ProductSection id="commands">
      <SectionHeading title={title} description={description} />

      <RevealGroup className="divide-y divide-text/10 overflow-hidden rounded-2xl border border-text/10 bg-card">
        {commands.map((command) => (
          <RevealItem
            key={command.id.value}
            className="grid grid-cols-1 items-center gap-4 p-6 lg:grid-cols-12 lg:gap-12"
          >
            <div className="flex flex-col gap-1 lg:col-span-5">
              <h3 className="text-base font-medium text-foreground">
                {command.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {command.description}
              </p>
            </div>
            {/* Commands read left to right in every locale */}
            <div
              dir="ltr"
              className="flex min-w-0 items-center gap-3 overflow-x-auto rounded-lg border border-text/10 bg-background px-4 py-3 lg:col-span-7"
            >
              <span
                aria-hidden
                className="font-mono text-sm text-muted-foreground"
              >
                $
              </span>
              <CodeBlock lang="bash" className="text-sm whitespace-nowrap">
                {command.code.value}
              </CodeBlock>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </ProductSection>
  );
};
