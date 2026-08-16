import { Button } from '@intlayer/design-system/button';
import { Container, ContainerMotion } from '@intlayer/design-system/container';
import { useCopyToClipboard } from '@intlayer/design-system/copy-to-clipboard';
import { CodeBlock } from '@intlayer/design-system/ide';
import {
  External_Github,
  Website_Doc_Path,
  Website_ReleasesV9_Path,
} from '@intlayer/design-system/routes';
import { Tag } from '@intlayer/design-system/tag';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Copy, Megaphone } from 'lucide-react';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
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
    <>
      <section className="relative flex w-full flex-col border-b px-4 md:px-8 lg:px-12">
        <div className="flex flex-1 flex-col items-center justify-center pt-16 pb-8">
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
                  className="flex items-center gap-2 rounded-full border font-medium text-foreground text-sm"
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
          <h1 className="mb-4 text-center font-bold text-4xl leading-tight sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
            {title}
          </h1>
          {/* Subtitle */}
          <motion.h2
            initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 text-center font-semibold text-primary text-xl sm:text-3xl md:text-3xl lg:mb-8 lg:text-4xl"
          >
            {subheading}
          </motion.h2>
          {/* Description */}
          <p
            className="hero-enter mx-auto max-w-2xl text-center font-medium text-neutral text-sm leading-relaxed sm:text-lg lg:mb-12"
            style={{ animationDelay: '0.6s' }}
          >
            {description}
          </p>
          {/* Copyable code block */}
          <ContainerMotion
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -30 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            roundedSize="xl"
            className="m-auto mt-24 w-full max-w-2xl flex-row items-center border p-1 pl-6"
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
          </ContainerMotion>
          {/* Action Buttons */}
          <div
            className="hero-enter mt-10 mb-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:mb-10"
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
              className="flex flex-row items-center justify-center gap-2"
            >
              <span className="block text-sm sm:text-lg">
                {getStartedButton}
              </span>

              <ArrowRight width={20} height={20} />
            </Link>
          </div>
        </div>
      </section>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="relative w-full border-b"
      >
        <p className="hidden font-medium text-foreground text-sm tracking-wider sm:text-base">
          {availableFor}
        </p>
        <TechLogos />
      </motion.section>
    </>
  );
};
