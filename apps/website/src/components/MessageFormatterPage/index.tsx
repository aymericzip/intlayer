import { Badge } from '@intlayer/design-system/badge';
import { Container } from '@intlayer/design-system/container';
import {
  External_Github,
  Website_Doc_Path,
  Website_I18nextFormatter_Path,
  Website_ICUFormatter_Path,
  Website_MessageConverter_Path,
  Website_POFormatter_Path,
  Website_VueI18nFormatter_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import {
  ArrowLeftRight,
  ArrowRight,
  Braces,
  Code2,
  Columns2,
  ExternalLink,
  FileCode,
  Sparkles,
} from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';
import { FormatterCheatSheet } from './FormatterCheatSheet';
import { FormatterEditor } from './FormatterEditor';
import type { FormatterDialect } from './types';

export const MessageFormatterPage: FC<{ dialect: FormatterDialect }> = ({
  dialect,
}) => {
  const content = useIntlayer('message-formatter-page');

  const metaByDialect = {
    icu: {
      title: content.icu.title,
      description: content.icu.description,
      icon: Braces,
      path: Website_ICUFormatter_Path,
    },
    i18next: {
      title: content.i18next.title,
      description: content.i18next.description,
      icon: Code2,
      path: Website_I18nextFormatter_Path,
    },
    'vue-i18n': {
      title: content.vueI18n.title,
      description: content.vueI18n.description,
      icon: Columns2,
      path: Website_VueI18nFormatter_Path,
    },
    po: {
      title: content.po.title,
      description: content.po.description,
      icon: FileCode,
      path: Website_POFormatter_Path,
    },
  }[dialect];

  const switcherLinks = [
    {
      id: 'icu',
      label: 'ICU MessageFormat',
      path: Website_ICUFormatter_Path,
      icon: Braces,
    },
    {
      id: 'i18next',
      label: 'i18next',
      path: Website_I18nextFormatter_Path,
      icon: Code2,
    },
    {
      id: 'vue-i18n',
      label: 'Vue I18n',
      path: Website_VueI18nFormatter_Path,
      icon: Columns2,
    },
    {
      id: 'po',
      label: 'Gettext PO',
      path: Website_POFormatter_Path,
      icon: FileCode,
    },
    {
      id: 'converter',
      label: content.nav.converterLink.value,
      path: Website_MessageConverter_Path,
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div className="relative flex size-full flex-1 flex-col">
      <BackgroundLayout />

      <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center gap-12 px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section className="flex max-w-4xl flex-col items-center gap-4 text-center">
          <Badge
            size="md"
            color="text"
            className="flex items-center gap-1.5 px-3 py-1 font-medium text-xs backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-text-opposite" />
            {content.freeBadge}
          </Badge>

          <h1 className="font-extrabold text-3xl text-foreground tracking-tight sm:text-5xl md:text-6xl">
            {metaByDialect.title}
          </h1>

          <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed sm:text-base md:text-lg">
            {metaByDialect.description}
          </p>

          {/* Format Switcher Navigation Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-border/70 bg-card/40 p-1.5 shadow-xs backdrop-blur-md">
            {switcherLinks.map((tab) => {
              const isActive = tab.id === dialect;
              const TabIcon = tab.icon;

              return (
                <Link
                  key={tab.id}
                  to={tab.path}
                  label={tab.label}
                  color="text"
                  className={cn(
                    'flex items-center gap-2 rounded-xl px-3 py-1.5 font-semibold text-xs transition-all',
                    isActive
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  )}
                >
                  <TabIcon className="size-3.5" />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* INTERACTIVE FORMATTER TOOL */}
        <section className="w-full">
          <FormatterEditor dialect={dialect} />
        </section>

        {/* CHEAT SHEET SECTION */}
        <section className="w-full pt-4">
          <FormatterCheatSheet dialect={dialect} />
        </section>

        {/* CTA SECTION */}
        <section className="w-full pt-4">
          <Container
            roundedSize="2xl"
            transparency="sm"
            padding="xl"
            className="relative overflow-hidden border border-border/80 bg-linear-to-br from-muted/40 via-card/80 to-card text-center shadow-xl backdrop-blur-lg sm:p-12"
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
                {content.cta.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                {content.cta.description}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link
                  to={Website_Doc_Path}
                  variant="button"
                  color="text"
                  size="xl"
                  roundedSize="full"
                  label={content.cta.button.value}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <span className="flex flex-row flex-nowrap items-center gap-2 text-foreground text-sm sm:text-lg">
                    {content.cta.button}
                    <ArrowRight className="size-5 transition-transform" />
                  </span>
                </Link>

                <Link
                  to={External_Github}
                  variant="button-outlined"
                  color="text"
                  size="xl"
                  roundedSize="full"
                  label={content.githubLabel.value}
                  isExternalLink={true}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <ExternalLink className="size-4" />
                  {content.githubLabel}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  );
};
