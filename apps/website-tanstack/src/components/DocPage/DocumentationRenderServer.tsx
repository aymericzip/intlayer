import {
  Accordion as AccordionBase,
  type AccordionProps,
} from '@intlayer/design-system/accordion';
import { Container } from '@intlayer/design-system/container';
import { baseMarkdownComponents } from '@intlayer/design-system/mark-down-render';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { ComponentProps, FC, HTMLAttributes } from 'react';
import { compileMarkdown, type ParsedMarkdown } from 'react-intlayer/markdown';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import {
  ClickToOpenIframe,
  Link,
  Step,
  Steps,
  TableOfContents,
} from './DocRenderClientComponents';
import { ServerCodeBlock } from './ServerCodeBlock';

const Accordion = ({ children, ...props }: AccordionProps) => (
  <AccordionBase
    {...props}
    headerClassName="text-lg! font-bold!"
    contentClassName="divide-y divide-neutral"
  >
    <div className="mb-8 flex flex-col gap-6 px-4 pt-6 text-sm text-text/80">
      {children}
    </div>
  </AccordionBase>
);

const AccordionGroup = ({
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Container
    padding="sm"
    roundedSize="2xl"
    background="none"
    border
    borderColor="neutral"
    className="flex flex-col gap-1 overflow-hidden"
    {...props}
  >
    {children}
  </Container>
);

type DocumentationRenderServerProps = {
  children: string | ParsedMarkdown;
  locale: LocalesValues;
  tocLevels?: number[];
  tocMaxDepth?: number;
  /** Slot for the interactive I18nBenchmark component — provided by the client. */
  I18nBenchmarkSlot?: FC<{ framework?: FrameworkKey }>;
};

/**
 * Server component that renders parsed markdown content entirely on the server.
 *
 * - Shiki syntax highlighting runs server-side via ServerCodeBlock (no client JS).
 * - Dual-theme CSS variables mean dark/light code colours work without JS.
 * - I18nBenchmarkSlot accepts a client-provided component for interactive sections.
 *
 * Must be used inside a createCompositeComponent or renderServerComponent context.
 */
export const DocumentationRenderServer = ({
  children,
  locale,
  tocLevels = [2, 3],
  tocMaxDepth = 3,
  I18nBenchmarkSlot,
}: DocumentationRenderServerProps) => {
  const compiled = compileMarkdown(children, {
    components: {
      ...baseMarkdownComponents,
      script: () => null,
      code: (props: ComponentProps<'code'>) => <ServerCodeBlock {...props} />,
      a: (props: ComponentProps<'a'>) => (
        <Link
          underlined
          locale={locale}
          {...props}
          to={props.href ?? ''}
        />
      ),
      Toc: (props: ComponentProps<typeof TableOfContents>) => (
        <TableOfContents
          {...props}
          levels={props.levels ?? tocLevels}
          maxDepth={props.maxDepth ?? tocMaxDepth}
        />
      ),
      I18nBenchmark: I18nBenchmarkSlot ?? (() => null),
      ClickToOpenIframe,
      Step,
      Steps,
      Accordion,
      AccordionGroup,
    } as any,
    wrapper: (wrapperProps: HTMLAttributes<HTMLElement>) => (
      <div className="flex flex-col gap-8 py-10" {...wrapperProps} />
    ),
    forceBlock: true,
  });

  return (
    <div className="m-auto flex max-w-2xl flex-col gap-8 p-4 text-text/90 max-md:px-0">
      {compiled}
    </div>
  );
};
