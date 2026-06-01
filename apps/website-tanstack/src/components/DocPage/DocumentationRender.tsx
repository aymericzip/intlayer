import {
  Accordion as AccordionBase,
  type AccordionProps,
} from '@intlayer/design-system/accordion';
import { Container } from '@intlayer/design-system/container';
import {
  MarkdownRenderer,
  type ParsedMarkdown,
} from '@intlayer/design-system/mark-down-render';
import { Step, Steps } from '@intlayer/design-system/steps';
import { useTheme } from 'next-themes';
import {
  type ComponentProps,
  type FC,
  type HTMLAttributes,
  lazy,
  Suspense,
} from 'react';
import { useLocale } from 'react-intlayer';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { Link } from '~/components/Link/Link';
import { TableOfContents } from '~/components/TableOfContents';
import { ClickToOpenIframe } from './ClickToOpenIframe';

const SectionScroller = lazy(() =>
  import('./SectionScroller').then((mod) => ({ default: mod.SectionScroller }))
);

const I18nBenchmark = lazy(() =>
  import('~/components/I18nBenchmark').then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

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

type DocumentationRenderProps = {
  children: string | ParsedMarkdown;
  tocLevels?: number[];
  tocMaxDepth?: number;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
  tocLevels = [2, 3],
  tocMaxDepth = 3,
}) => {
  const { locale } = useLocale();
  const { resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <div className="m-auto flex max-w-2xl flex-col gap-8 p-4 text-text/90 max-md:px-0">
      <MarkdownRenderer
        isDarkMode={isDarkMode}
        locale={locale}
        components={{
          script: () => null,
          a: (props: ComponentProps<'a'>) => (
            <Link
              underlined={true}
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
          I18nBenchmark: (props: { framework?: FrameworkKey }) => (
            <Suspense>
              <I18nBenchmark initialFramework={props.framework} />
            </Suspense>
          ),
          ClickToOpenIframe,
          Step,
          Steps,
          Accordion,
          AccordionGroup,
        }}
        wrapper={(props) => (
          <>
            <Suspense>
              <SectionScroller />
            </Suspense>
            <div className="flex flex-col gap-8 py-10" {...props} />
          </>
        )}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
};
