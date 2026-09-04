import { Badge } from '@intlayer/design-system/badge';
import { Container } from '@intlayer/design-system/container';
import {
  External_Github,
  Website_Doc_Path,
} from '@intlayer/design-system/routes';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';
import { ConverterCheatSheet } from './ConverterCheatSheet';
import { ConverterEditor } from './ConverterEditor';

export const MessageConverterPage: FC = () => {
  const content = useIntlayer('message-converter-page');

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />

      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-16 px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center gap-4 text-center">
          <Badge
            size="md"
            color="text"
            className="flex items-center gap-1.5 px-3 py-1 font-medium text-xs backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-text-opposite" />
            {content.badge}
          </Badge>

          <h1 className="max-w-4xl font-extrabold text-3xl text-foreground tracking-tight sm:text-5xl md:text-6xl">
            {content.title}
          </h1>

          <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base md:text-lg">
            {content.description}
          </p>
        </section>

        {/* CONVERTER INTERACTIVE TOOL */}
        <section className="w-full">
          <ConverterEditor />
        </section>

        {/* COMPARISON CHEATSHEET */}
        <section className="w-full pt-8">
          <ConverterCheatSheet />
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="w-full pt-8">
          <Container
            roundedSize="2xl"
            transparency="sm"
            padding="xl"
            className="relative overflow-hidden border border-border/80 bg-linear-to-br from-primary/10 via-card/80 to-card text-center shadow-xl backdrop-blur-lg sm:p-12"
          >
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-5">
              <Badge
                size="sm"
                color="text"
                variant="outline"
                className="font-mono text-text text-xs"
              >
                {content.ecosystemBadge}
              </Badge>

              <h3 className="font-bold text-2xl text-foreground sm:text-3xl">
                {content.ctaTitle}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {content.ctaDescription}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to={Website_Doc_Path}
                  variant="button"
                  color="text"
                  size="xl"
                  roundedSize="full"
                  label={content.ctaButton.value}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <span className="flex flex-row flex-nowrap items-center gap-2 text-foreground text-sm sm:text-lg">
                    {content.ctaButton}
                    <ArrowRight className="size-5 transition-transform" />
                  </span>
                </Link>

                <Link
                  to={External_Github}
                  variant="button-outlined"
                  color="text"
                  size="xl"
                  roundedSize="full"
                  label={content.githubButton.value}
                  isExternalLink={true}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  {content.githubButton}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};
