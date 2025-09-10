'use client';

import { PagesRoutes } from '@/Routes';
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
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { TechLogos } from './TechLogos';

const BlurInText: FC<{
  children: ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ filter: 'blur(10px)', opacity: 0, y: 30 }}
    animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SHOW_WHATS_NEW = false;

export const LandingSection: FC = () => {
  const {
    whatsNew,
    version,
    title,
    subheading,
    description,
    supportButton,
    getStartedButton,
    availableFor,
  } = useIntlayer('landing-section');

  return (
    <section className="relative flex flex-col min-h-[calc(100vh-64px)] w-full px-4 md:px-8 lg:px-12">
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        {/* Centered Content */}
        <div className="w-full max-w-4xl mx-auto mb-8 lg:mb-0">
          {/* What's New Tag */}
          {SHOW_WHATS_NEW && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex justify-center items-center gap-2"
            >
              <Tag
                size={TagSize.SM}
                border={TagBorder.WITH}
                color={TagColor.NEUTRAL}
                className="border text-text rounded-full text-sm font-medium"
              >
                {whatsNew}
              </Tag>
              <Link
                href={PagesRoutes.Changelog}
                color="custom"
                label="What's new"
              >
                <span className="flex items-center gap-1 text-sm sm:text-lg font-semibold text-neutral-500 dark:text-neutral-400">
                  {version} v{packageJSON.version}{' '}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          )}

          {/* Title */}
          <BlurInText
            delay={0.3}
            className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6 text-center"
          >
            {title}
          </BlurInText>

          {/* Subtitle */}
          <BlurInText
            delay={0.5}
            className="text-xl sm:text-3xl md:text-4xl font-semibold text-text mb-6 lg:mb-8 text-center"
          >
            {subheading}
          </BlurInText>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-sm sm:text-lg text-neutral-600 dark:text-neutral-200 font-medium mb-8 lg:mb-12 leading-relaxed text-center max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 lg:mb-10 justify-center"
          >
            <Link
              href="https://github.com/aymericzip/intlayer"
              variant={LinkVariant.BUTTON}
              // color={LinkColor.DARK}
              label={supportButton.value}
              className="hover:scale-105 px-4 py-2 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-transparent"
              isExternalLink
            >
              <span className="flex items-center justify-center gap-2 text-text">
                {/* <span className="block">
                <Github width={20} height={20} />
              </span> */}
                <span className="block text-lg">{supportButton}</span>
              </span>
            </Link>

            <Link
              href={PagesRoutes.Doc}
              variant={LinkVariant.BUTTON}
              color={LinkColor.CUSTOM}
              label={getStartedButton.value}
              className="hover:scale-105 px-4 py-2 rounded-full"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">{getStartedButton}</span>
                <ArrowRight width={20} height={20} />
              </span>
            </Link>
          </motion.div>

          {/* Available For Section - Full Viewport Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8"
          >
            <p className="text-sm sm:text-base text-text mb-6 font-medium tracking-wider">
              {availableFor}
            </p>
            <TechLogos />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
