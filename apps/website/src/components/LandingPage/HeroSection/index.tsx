import { Button } from '@intlayer/design-system/button';
import { useCopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { CodeBlock } from '@intlayer/design-system/ide';
import {
  External_Github,
  Website_Doc_Environment_ViteAndReact_Path,
  Website_Doc_Path,
  Website_ReleasesV9_Path,
} from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Megaphone,
} from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import { Link } from '~/components/Link/Link';
import { useTheme } from '~/providers/ThemeProvider';
import packageJSON from '../../../../package_mock.json' with { type: 'json' };
import { TechLogos } from './TechLogos';

const SHOW_WHATS_NEW = true;

export const HeroSection: FC = () => {
  const {
    //    whatsNew,
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

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';
  const { isCopied, copy } = useCopyToClipboard('npx intlayer init');

  return (
    <section className="relative flex min-h-[calc(100vh-60px)] flex-col">
      <section className="relative flex w-full flex-1 flex-col border-b px-4 md:px-8 lg:px-12">
        <BackgroundLayout />
        <div className="flex flex-1 flex-col items-center justify-center py-16">
          {SHOW_WHATS_NEW && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center justify-center gap-2"
            >
              <Link to={Website_ReleasesV9_Path} label={whatsNewLabel.value}>
                <Tag
                  size="md"
                  border="with"
                  className="flex items-center gap-2 rounded-full border-foreground/20! bg-card/10 font-medium text-foreground text-sm backdrop-blur-xl"
                >
                  <Megaphone className="size-4" />
                  <span className="no-underline! flex items-center gap-1 font-medium text-sm sm:text-sm">
                    {version} v{packageJSON.version}{' '}
                    <ArrowRight className="size-3" />
                  </span>
                </Tag>
              </Link>
            </motion.div>
          )}

          {/* Title */}
          <h1 className="mb-3 text-center font-bold text-4xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {/* Subtitle */}
          <motion.h2
            initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 text-center font-semibold text-xl sm:text-3xl md:text-3xl lg:mb-8 lg:text-4xl"
          >
            {subheading}
          </motion.h2>
          {/* Description */}

          {/* Copyable code block */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            onClick={copy}
            className="mt-8 flex w-full max-w-xl cursor-pointer flex-row items-center justify-center rounded-lg border bg-card p-1 py-2 pr-2 pl-4"
          >
            <ChevronRight className="size-8 text-muted-foreground" />
            <CodeBlock
              className="justify-center"
              lang="bash"
              isDarkMode={isDarkMode}
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
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto max-w-xl text-center text-muted-foreground text-sm leading-relaxed sm:text-lg lg:mb-12"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              to={External_Github}
              variant="button-outlined"
              color="text"
              label={supportButton.value}
              isExternalLink={false}
              size="lg"
              roundedSize="sm"
            >
              <span className="block text-sm sm:text-lg">{supportButton}</span>
            </Link>

            <Link
              to={Website_Doc_Path}
              variant="button"
              color="text"
              label={getStartedButton.value}
              size="xl"
              roundedSize="sm"
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="block text-sm sm:text-lg">
                {getStartedButton}
              </span>

              <ArrowRight width={20} height={20} />
            </Link>
          </motion.div>
        </div>
      </section>
      <Link to={Website_Doc_Environment_ViteAndReact_Path} label={availableFor}>
        <div className="flex items-center justify-between gap-4 border-b p-3">
          <p className="font-mono text-foreground text-sm uppercase tracking-wider sm:text-base">
            {availableFor}
          </p>
          <ExternalLink className="size-5 text-muted-foreground" />
        </div>
      </Link>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="relative w-full border-b"
      >
        <TechLogos />
      </motion.section>
    </section>
  );
};
