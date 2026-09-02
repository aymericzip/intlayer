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
import { ArrowRight, Check, ChevronRight, Copy, Megaphone } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';
import packageJSON from '../../../../package_mock.json' with { type: 'json' };
import { TechLogos } from './TechLogos';

const SHOW_WHATS_NEW = true;

export const HeroSection: FC = () => {
  const {
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
    <section className="relative flex min-h-[calc(100dvh-60px)] flex-col">
      <section className="relative flex w-full flex-1 flex-col px-4 sm:px-6 md:px-8 lg:px-12">
        <BackgroundLayout />
        <div className="flex flex-1 flex-col items-center justify-center py-10 sm:py-16">
          {SHOW_WHATS_NEW && (
            <div className="hero-enter mb-6 flex items-center justify-center gap-2 sm:mb-8">
              <Link to={Website_ReleasesV9_Path} label={whatsNewLabel.value}>
                <Tag
                  size="md"
                  border="with"
                  className="flex items-center gap-2 rounded-full border-foreground/20! bg-card/10 font-medium text-foreground text-xs backdrop-blur-xl sm:text-sm"
                >
                  <Megaphone className="size-3.5 shrink-0 sm:size-4" />
                  <span className="no-underline! flex items-center gap-1 whitespace-nowrap font-medium text-xs sm:text-sm">
                    {version} v{packageJSON.version}{' '}
                    <ArrowRight className="size-3 shrink-0" />
                  </span>
                </Tag>
              </Link>
            </div>
          )}

          {/* Title */}
          <h1 className="mb-3 px-2 text-center font-bold text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {/* Subtitle */}
          <h2
            className="hero-enter-sharpen mb-6 px-2 text-center font-semibold text-lg leading-snug sm:text-2xl md:text-3xl lg:mb-8 lg:text-4xl"
            style={{ animationDelay: '0.5s' }}
          >
            {subheading}
          </h2>
          {/* Description */}

          {/* Copyable code block */}
          <Container
            onClick={copy}
            roundedSize="xl"
            className="hero-enter-lift mt-8 flex w-full max-w-xl cursor-pointer flex-row items-center justify-between gap-1 overflow-hidden border bg-card p-1 py-2 pr-2 pl-3 sm:pl-4"
            style={{ animationDelay: '0.7s' }}
          >
            <ChevronRight className="size-6 shrink-0 text-neutral" />
            <CodeBlock
              className="justify-left min-w-0 flex-1 overflow-x-auto whitespace-nowrap pl-6 text-sm sm:text-base"
              lang="bash"
            >
              npx intlayer init
            </CodeBlock>
            <Button
              variant="hoverable"
              color="neutral"
              size="icon-lg"
              roundedSize="xl"
              onClick={copy}
              Icon={isCopied ? Check : Copy}
              label={copyButton.value}
              className="shrink-0"
            />
          </Container>
          <p
            className="hero-enter mx-auto mt-4 mb-8 max-w-xl px-2 text-center text-muted-foreground text-sm leading-relaxed sm:text-lg lg:mb-12"
            style={{ animationDelay: '0.6s' }}
          >
            {description}
          </p>

          {/* Action Buttons */}
          <div
            className="hero-enter flex w-full max-w-xs flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4"
            style={{ animationDelay: '0.8s' }}
          >
            <Link
              to={External_Github}
              variant="button-outlined"
              color="text"
              label={supportButton.value}
              isExternalLink={false}
              size="lg"
              roundedSize="full"
              className="w-full sm:w-auto"
            >
              <span className="block text-sm sm:text-lg">{supportButton}</span>
            </Link>

            <Link
              to={Website_Doc_Path}
              variant="button"
              color="text"
              label={getStartedButton.value}
              size="xl"
              roundedSize="full"
              className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto"
            >
              <span className="block text-sm sm:text-lg">
                {getStartedButton}
              </span>

              <ArrowRight width={20} height={20} />
            </Link>
          </div>
        </div>
      </section>
      <div className="flex items-center justify-between gap-4 border-neutral border-y px-4 py-3">
        <p className="truncate font-mono text-foreground text-xs uppercase tracking-wider sm:text-sm md:text-base">
          {availableFor}
        </p>
      </div>

      <section
        className="hero-enter relative w-full overflow-x-auto border-neutral border-b"
        style={{ animationDelay: '1s' }}
      >
        <TechLogos />
      </section>
    </section>
  );
};
