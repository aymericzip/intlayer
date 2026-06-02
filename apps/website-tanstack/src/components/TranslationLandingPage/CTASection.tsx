import { Container } from '@intlayer/design-system/container';
import { CodeBlock } from '@intlayer/design-system/ide';
import { Website_Doc_CLI_Fill_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { useTheme } from 'next-themes';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';

type CodeBlockWrapperProps = {
  title: ReactNode;
  children: ReactNode;
  className?: string;
};

const CodeBlockWrapper: FC<CodeBlockWrapperProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Container
      roundedSize="2xl"
      padding="md"
      border
      borderColor="card"
      background="none"
      className={cn('relative overflow-hidden text-text-opposite', className)}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-text-opposite/70 text-xs">{title}</span>
        <span className="text-text-opposite/40 text-xs">CLI</span>
      </div>
      {children}
    </Container>
  );
};

export const CTASection: FC = () => {
  const {
    title,
    description,
    exploreCLICommands,
    readDocumentation,
    quickStartTitle,
    code,
  } = useIntlayer('cta-section');
  const { resolvedTheme } = useTheme();

  return (
    <section
      id="get-started"
      className="mx-auto max-w-5xl px-8 pt-10 pb-14 md:pt-14 md:pb-20"
    >
      <Container
        roundedSize="4xl"
        transparency="md"
        padding="xl"
        border
        borderColor="card"
        className="relative overflow-hidden"
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="font-semibold text-2xl text-text md:text-3xl">
              {title}
            </h3>
            <p className="mt-2 max-w-2xl text-base text-text/70">
              {description}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="#commands"
                variant="button-outlined"
                color="text"
                className="w-full sm:w-auto"
                label={exploreCLICommands.value}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('commands');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                {exploreCLICommands}
              </Link>

              <Link
                to={Website_Doc_CLI_Fill_Path}
                variant="button"
                color="text"
                className="w-full sm:w-auto"
                label={readDocumentation.value}
              >
                {readDocumentation}
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <CodeBlockWrapper title={quickStartTitle}>
              <CodeBlock
                lang="bash"
                isDarkMode={resolvedTheme === 'dark'}
                className="text-sm"
              >
                {code.value}
              </CodeBlock>
            </CodeBlockWrapper>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(203,235,64,0.12),transparent_55%)]" />
      </Container>
    </section>
  );
};
