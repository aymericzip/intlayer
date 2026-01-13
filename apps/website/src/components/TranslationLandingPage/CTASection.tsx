'use client';

import { Link } from '@components/Link/Link';
import {
  CodeBlock,
  Container,
  ContainerBackground,
  ContainerBorderColor,
  ContainerPadding,
  ContainerRoundedSize,
  ContainerTransparency,
  LinkColor,
  LinkVariant,
} from '@intlayer/design-system';
import { cn } from '@utils/cn';
import type { FC, ReactNode } from 'react';
import { PagesRoutes } from '@/Routes';

type CodeBlockWrapperProps = {
  title: string;
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
      roundedSize={ContainerRoundedSize['2xl']}
      padding={ContainerPadding.MD}
      border
      borderColor={ContainerBorderColor.CARD}
      background={ContainerBackground.NONE}
      className={cn('relative overflow-hidden text-text-dark', className)}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-text-dark/70 text-xs">{title}</span>
        <span className="text-text-dark/40 text-xs">CLI</span>
      </div>
      {children}
    </Container>
  );
};

export const CTASection: FC = () => {
  return (
    <section
      id="get-started"
      className="mx-auto max-w-6xl px-8 pt-10 pb-14 md:pt-14 md:pb-20"
    >
      <Container
        roundedSize={ContainerRoundedSize['4xl']}
        transparency={ContainerTransparency.MD}
        padding={ContainerPadding['XL']}
        border
        borderColor={ContainerBorderColor.CARD}
        className="relative overflow-hidden"
      >
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="font-semibold text-2xl text-text md:text-3xl">
              Start translating your content for free.
            </h3>
            <p className="mt-2 max-w-2xl text-base text-text/70">
              Open source. No credit card required. No recurring subscriptions.
              Install the CLI and start translating JSON and Markdown in
              minutes.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#commands"
                variant={LinkVariant.BUTTON_OUTLINED}
                color={LinkColor.TEXT}
                className="w-full sm:w-auto"
                label="Explore CLI commands"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('commands');
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              >
                Explore CLI commands
              </Link>

              <Link
                href={PagesRoutes.Doc_CLI_Fill}
                variant={LinkVariant.BUTTON}
                color={LinkColor.PRIMARY}
                className="w-full sm:w-auto"
                label="Read the documentation"
              >
                Read the documentation
              </Link>
            </div>
          </div>

          <div className="md:col-span-5">
            <CodeBlockWrapper title="Quick start">
              <CodeBlock lang="bash" isDarkMode className="text-sm">
                {[
                  'npm install -g intlayer-cli',
                  '',
                  '# translate docs',
                  'npx intlayer doc translate --base-locale en --locales fr es',
                  '',
                  '# translate json',
                  'npx intlayer fill',
                ].join('\n')}
              </CodeBlock>
            </CodeBlockWrapper>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_10%_0%,rgba(203,235,64,0.12),transparent_55%)]" />
      </Container>
    </section>
  );
};
