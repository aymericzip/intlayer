'use client';

import { Container, Input, Label } from '@intlayer/design-system';
import { motion } from 'framer-motion';
import { getLocaleName, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import { useEffect, useState, type FC } from 'react';

type MultilingualSectionProps = {
  scrollProgress: number;
};

const getTextContent = (text: string, textProgress: number) => {
  // Pleat text of 3 characters
  const textChunks = [];
  for (let i = 0; i < text.length; i += 2) {
    textChunks.push(text.slice(i, i + 2));
  }

  return textChunks
    .filter(
      (_, index) =>
        index / textChunks.length < Math.round(textProgress * 10) / 10
    )
    .join('');
};

export const MultilingualSection: FC<MultilingualSectionProps> = ({
  scrollProgress,
}) => {
  const { inputLabel } = useIntlayer('multilingual-section');
  const { locale: currentLocale } = useLocale();
  const content = {
    ja: 'こんにちは世界',
    es: 'Hola mundo',
    ru: 'Привет мир',
    fr: 'Bonjour le monde',
    zh: '你好世界',
    ar: 'مرحبا بالعالم',
  };

  const localesArray = Object.keys(content);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileTypingProgress, setMobileTypingProgress] = useState(0);
  const [isMobileAnimating, setIsMobileAnimating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Desktop scroll-based active index
  const desktopActiveIndex = Math.floor(scrollProgress * localesArray.length);

  // Use mobile or desktop active index based on screen size
  const activeIndex =
    isClient && window.innerWidth < 768
      ? mobileActiveIndex
      : desktopActiveIndex;

  // Fix hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mobile auto-animation effect
  useEffect(() => {
    if (!isClient || window.innerWidth >= 768) return;

    setIsMobileAnimating(true);
    setMobileActiveIndex(0);
    setMobileTypingProgress(0);

    const animationInterval = setInterval(() => {
      setMobileActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= localesArray.length) {
          clearInterval(animationInterval);
          setIsMobileAnimating(false);
          return prevIndex;
        }
        return nextIndex;
      });
    }, 2000); // Change language every 2 seconds

    return () => clearInterval(animationInterval);
  }, [isClient, localesArray.length]);

  // Mobile typing animation for current language
  useEffect(() => {
    if (!isClient || window.innerWidth >= 768) return;

    setMobileTypingProgress(0);
    const typingInterval = setInterval(() => {
      setMobileTypingProgress((prev) => {
        const newProgress = prev + 0.05; // Faster typing for mobile
        if (newProgress >= 1) {
          clearInterval(typingInterval);
          return 1;
        }
        return newProgress;
      });
    }, 30); // Faster interval for mobile

    return () => clearInterval(typingInterval);
  }, [mobileActiveIndex, isClient]);

  return (
    <div className="flex max-h-full w-full max-w-96 scale-100 md:scale-90 flex-col gap-3 md:gap-4 max-md:max-h-[400px] max-md:overflow-y-auto max-md:scrollbar-thin max-md:scrollbar-thumb-neutral/30 max-md:scrollbar-track-transparent">
      <Container
        background="none"
        border
        roundedSize="xl"
        className="w-full gap-2 p-2"
      >
        <Label color="neutral" className="text-sm">
          {getLocaleName(Locales.ENGLISH, currentLocale)}
        </Label>
        <Input
          aria-label={`${inputLabel.value} ${getLocaleName(Locales.ENGLISH, currentLocale)}`}
          value="Hello world"
          onChange={() => null}
        />
      </Container>
      {Object.keys(content).map((locale, index) => (
        <motion.div
          key={locale}
          animate={{
            opacity:
              activeIndex > index
                ? 1
                : 1 - Math.abs(activeIndex - index) / localesArray.length,
            scale:
              activeIndex > index
                ? 1
                : 1 -
                  (Math.abs(activeIndex - index) / localesArray.length) * 0.7,
            translateX:
              activeIndex > index
                ? 0
                : `${(Math.abs(activeIndex - index) / localesArray.length) * 5}vh`,
            translateY:
              activeIndex > index
                ? 0
                : `${(Math.abs(activeIndex - index) / localesArray.length) * 5}vh`,
          }}
          transition={{
            duration: 0.4,
            ease: 'easeOut',
          }}
        >
          <Container
            background="none"
            border
            roundedSize="2xl"
            className="w-full gap-2 px-4 py-2"
          >
            <Label className="text-sm">
              {getLocaleName(locale as Locales, currentLocale)}
            </Label>
            <Input
              aria-label={`${inputLabel.value} ${getLocaleName(locale as Locales, currentLocale)}`}
              value={getTextContent(
                content[locale as keyof typeof content],
                index < activeIndex
                  ? 1
                  : isClient && window.innerWidth < 768
                    ? mobileTypingProgress
                    : scrollProgress * localesArray.length - index
              )}
              onChange={
                // Empty onChange to avoid warning
                () => null
              }
            />
          </Container>
        </motion.div>
      ))}
    </div>
  );
};
