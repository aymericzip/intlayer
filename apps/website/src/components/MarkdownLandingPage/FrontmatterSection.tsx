import { Website_Doc_HTML_Path } from '@intlayer/design-system/routes';
import { ArrowRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
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

export const FrontmatterSection: FC = () => {
  const {
    title,
    description,
    markdownCodeBlockTitle,
    markdownCode,
    usageCodeBlockTitle,
    usageCode,
    html,
  } = useIntlayer('frontmatter-section-markdown');

  return (
    <ProductSection>
      <SectionHeading title={title} description={description} />

      <RevealGroup className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
        <RevealItem className="flex">
          <CodePanel
            label={markdownCodeBlockTitle}
            code={markdownCode.value}
            lang="markdown"
            className="flex-1"
          />
        </RevealItem>
        <RevealItem className="flex">
          <CodePanel
            label={usageCodeBlockTitle}
            code={usageCode.value}
            lang="tsx"
            className="flex-1"
          />
        </RevealItem>
      </RevealGroup>

      <Reveal className="mt-12 flex flex-col items-start gap-6 border-t border-text/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <h3 className="text-lg font-medium text-foreground">{html.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {html.description}
          </p>
        </div>
        <Link
          to={Website_Doc_HTML_Path}
          variant="button-outlined"
          color="text"
          label={html.cta.value}
          className="shrink-0"
        >
          <span className="flex items-center gap-2">
            {html.cta}
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </Reveal>
    </ProductSection>
  );
};
