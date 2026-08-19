'use client';

import { Link } from '@components/Link/Link';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useCopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { CodeBlock } from '@intlayer/design-system/ide';
import {
  External_Github,
  Website_Doc_Path,
  Website_ReleasesV9_Path,
} from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import packageJSON from '../../../../package_mock.json' with { type: 'json' };
import { TechLogos } from './TechLogos';

const SHOW_WHATS_NEW = true;

export const HeroSection: FC = () => {
  const {
    whatsNew,
    whatsNewLabel,
    version,
    title,
    subheading,
    description,
    supportButton,
    getStartedButton,
    availableFor,
    copyButton,
  } = useIntlayer('hero-section');

  const { isCopied, copy } = useCopyToClipboard('npx intlayer init');

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] w-full flex-col px-4 md:px-8 lg:px-12">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Centered Content */}
        <div className="mx-auto mt-16 mb-8 w-full max-w-4xl lg:mb-0">
          {/* What's New Tag */}
          {SHOW_WHATS_NEW && (
            <div className="hero-enter mb-8 flex items-center justify-center gap-2">
              <Tag
                size="sm"
                border="with"
                color="neutral"
                className="rounded-full border font-medium text-sm text-text"
              >
                {whatsNew}
              </Tag>
              <Link
                href={Website_ReleasesV9_Path}
                color="neutral"
                label={whatsNewLabel.value}
              >
                <span className="flex items-center gap-1 font-medium text-neutral-500 text-sm sm:text-sm dark:text-neutral-400">
                  {version} v{packageJSON.version}{' '}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-center font-bold text-4xl leading-tight sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
            {title}
          </h1>
          {/* Subtitle */}
          <h2
            className="hero-enter-sharpen mb-6 text-center font-semibold text-text text-xl sm:text-3xl md:text-3xl lg:mb-8 lg:text-4xl"
            style={{ animationDelay: '0.5s' }}
          >
            {subheading}
          </h2>
          {/* Description */}
          <p
            className="hero-enter mx-auto max-w-2xl text-center font-medium text-neutral text-sm leading-relaxed sm:text-lg lg:mb-12"
            style={{ animationDelay: '0.6s' }}
          >
            {description}
          </p>
          {/* Copyable code block */}
          <Container
            roundedSize="2xl"
            className="hero-enter-lift m-auto mt-24 max-w-2xl flex-row items-center p-1 pl-6"
            style={{ animationDelay: '0.7s' }}
          >
            <CodeBlock lang="bash">npx intlayer init</CodeBlock>
            <Button
              variant="hoverable"
              color="neutral"
              size="icon-xl"
              onClick={copy}
              Icon={isCopied ? Check : Copy}
              label={copyButton.value}
            />
          </Container>
          {/* Action Buttons */}
          <div
            className="hero-enter mt-10 mb-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:mb-10"
            style={{ animationDelay: '0.8s' }}
          >
            <Link
              href={External_Github}
              variant="button-outlined"
              color="text"
              label={supportButton.value}
              isExternalLink={false}
              size="lg"
              roundedSize="full"
            >
              <span className="block text-sm sm:text-lg">{supportButton}</span>
            </Link>

            <Link
              href={Website_Doc_Path}
              variant="button"
              color="text"
              label={getStartedButton.value}
              size="xl"
              roundedSize="full"
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="block text-sm sm:text-lg">
                {getStartedButton}
              </span>

              <ArrowRight width={20} height={20} />
            </Link>
          </div>
          {/* Available For Section - Full Viewport Width */}
          <div
            className="hero-enter relative right-1/2 left-1/2 mt-8 mr-[-50vw] ml-[-50vw] w-screen text-center"
            style={{ animationDelay: '1s' }}
          >
            <p className="font-medium text-sm text-text tracking-wider sm:text-base">
              {availableFor}
            </p>
            <TechLogos />
          </div>
        </div>
      </div>
    </section>
  );
};
