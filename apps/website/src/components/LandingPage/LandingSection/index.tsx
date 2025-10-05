'use client';

import { Link } from '@components/Link/Link';
import {
  LinkColor,
  LinkVariant,
  Tag,
  TagBorder,
  TagColor,
  TagSize,
} from '@intlayer/design-system';
import { motion } from 'framer-motion';
import packageJSON from 'intlayer/package.json' with { type: 'json' };
import { ArrowRight, Check, Copy } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { TechLogos } from './TechLogos';

const SHOW_WHATS_NEW = true;

export const LandingSection: FC = () => {
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
  } = useIntlayer('landing-section');

  const [copied, setCopied] = useState(false);

  function copyToClipboard(
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    navigator.clipboard.writeText('npm install intlayer').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] w-full flex-col px-4 md:px-8 lg:px-12">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Centered Content */}
        <div className="mx-auto mt-16 mb-8 w-full max-w-4xl lg:mb-0">
          {/* What's New Tag */}
          {SHOW_WHATS_NEW && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center justify-center gap-2"
            >
              <Tag
                size={TagSize.SM}
                border={TagBorder.WITH}
                color={TagColor.NEUTRAL}
                className="rounded-full border font-medium text-sm text-text"
              >
                {whatsNew}
              </Tag>
              <Link
                href={PagesRoutes.ReleasesV6}
                color={LinkColor.NEUTRAL}
                label={whatsNewLabel.value}
              >
                <span className="flex items-center gap-1 font-medium text-neutral-500 text-sm sm:text-sm dark:text-neutral-400">
                  {version} v{packageJSON.version}{' '}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-4 text-center font-bold text-4xl leading-tight sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
            animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-6 text-center font-semibold text-text text-xl sm:text-3xl md:text-3xl lg:mb-8 lg:text-4xl"
          >
            {subheading}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-center font-medium text-neutral-600 text-sm leading-relaxed sm:text-lg lg:mb-12 dark:text-neutral-200"
          >
            {description}
          </motion.p>

          {/* Bloc de code copiable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mb-6 w-full max-w-2xl lg:mb-10"
          >
            <div className="relative rounded-2xl bg-neutral-900 p-4 font-mono text-neutral-100 text-sm shadow-md">
              <div className="flex items-center justify-between">
                <code className="truncate">npm install intlayer</code>
                <button
                  onClick={copyToClipboard}
                  className="ml-3 rounded-md bg-neutral-800 px-3 py-1 font-medium text-neutral-300 text-xs transition hover:bg-neutral-700"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-6 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:mb-10"
          >
            <Link
              href="https://github.com/aymericzip/intlayer"
              variant={LinkVariant.BUTTON}
              // color={LinkColor.DARK}
              label={supportButton.value}
              className="rounded-full border-2 border-neutral-300 bg-transparent px-4 py-2 hover:scale-105 hover:bg-transparent dark:border-neutral-600"
              isExternalLink
            >
              <span className="flex items-center justify-center gap-2 text-text">
                {/* <span className="block">
                <Github width={20} height={20} />
              </span> */}
                <span className="block text-sm sm:text-lg">
                  {supportButton}
                </span>
              </span>
            </Link>

            <Link
              href={PagesRoutes.Doc}
              variant={LinkVariant.BUTTON}
              color={LinkColor.CUSTOM}
              label={getStartedButton.value}
              className="rounded-full px-4 py-2 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="block text-sm sm:text-lg">
                  {getStartedButton}
                </span>
                <ArrowRight width={15} height={15} />
              </span>
            </Link>
          </motion.div>

          {/* Available For Section - Full Viewport Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="-ml-[50vw] -mr-[50vw] relative right-1/2 left-1/2 mt-8 w-screen text-center"
          >
            <p className="mb-6 font-medium text-sm text-text tracking-wider sm:text-base">
              {availableFor}
            </p>
            <TechLogos />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
