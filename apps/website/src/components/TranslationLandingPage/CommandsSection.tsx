import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CodePanel } from '~/components/ProductLanding/CodePanel';
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

      <RevealGroup className="divide-y divide-text/10 border-y border-text/10">
        {commands.map((command) => (
          <RevealItem
            key={command.id.value}
            className="grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="flex flex-col gap-2 lg:col-span-5">
              <h3 className="text-lg font-medium text-foreground">
                {command.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {command.description}
              </p>
            </div>
            <CodePanel
              label="CLI"
              code={command.code.value}
              lang="bash"
              className="lg:col-span-7"
            />
          </RevealItem>
        ))}
      </RevealGroup>
    </ProductSection>
  );
};
