'use client';

import { Container, Input, Label } from '@intlayer/design-system';
import { motion } from 'framer-motion';
import { getLocaleName, Locales } from 'intlayer';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

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
  const activeIndex = Math.floor(scrollProgress * localesArray.length);

  return (
    <div className="flex max-h-full w-full max-w-96 scale-90 flex-col gap-4">
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
