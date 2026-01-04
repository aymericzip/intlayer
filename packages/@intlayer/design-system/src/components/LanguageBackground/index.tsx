'use client';

import { Container, Flag } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { getHTMLTextDir, getLocaleName, type Locale, Locales } from 'intlayer';
import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useEffect,
  useState,
} from 'react';

const shuffleArray = (array: string[], limit?: number) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return limit ? shuffled.slice(0, limit) : shuffled;
};

const LocalCard: FC<{ locale: string }> = ({ locale, ...props }) => (
  <div
    className="group z-10 mx-8 inline-flex shrink-0 transition-transform duration-300 hover:scale-105"
    {...props}
  >
    <Container
      roundedSize="xl"
      className="flex flex-row items-center gap-5 p-3"
    >
      <Flag
        locale={locale as Locale}
        className="max-h-5 max-w-5 rounded-sm grayscale-80 transition duration-300 group-hover:grayscale-0"
        width={640}
        height={480}
        loading="lazy"
      />
      <span
        dir={getHTMLTextDir(locale as Locale)}
        lang={locale as Locale}
        className="flex text-nowrap"
      >
        {getLocaleName(locale as Locale)}
      </span>
    </Container>
  </div>
);

const LocalCardList: FC<{ localeList: string[]; className?: string }> = ({
  localeList,
  className,
  ...props
}) => (
  <div className="relative flex w-full overflow-hidden" {...props}>
    <div
      className={cn('inline-flex shrink-0 will-change-transform', className)}
    >
      {/* First set of cards */}
      {localeList.map((locale, index) => (
        <LocalCard key={`${locale}-first-${index}`} locale={locale} />
      ))}
      {/* Duplicate set for seamless loop */}
      {localeList.map((locale, index) => (
        <LocalCard key={`${locale}-second-${index}`} locale={locale} />
      ))}
    </div>
  </div>
);

const NUM_OF_LOCALES = 15;

const emptyArrayOfLocale: string[][] = new Array(4).fill(0).map(() => []);
const arrayOfLocale: string[][] = new Array(4)
  .fill(0)
  .map(() => shuffleArray(Object.values(Locales.ALL_LOCALES), NUM_OF_LOCALES));

export const LanguageSection: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const [localeList, setLocaleList] = useState(emptyArrayOfLocale);
  const [firstPart, secondPart, thirdPart, fourthPart] = localeList;

  useEffect(() => {
    setLocaleList(arrayOfLocale);
  }, []);

  return (
    <section
      className={cn(
        'mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)] my-10 w-full overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="relative flex w-full flex-col gap-5 py-3">
        <LocalCardList localeList={firstPart} className="horizontal-loop-1" />
        <LocalCardList localeList={secondPart} className="horizontal-loop-2" />
        <LocalCardList localeList={thirdPart} className="horizontal-loop-1" />
        <LocalCardList localeList={fourthPart} className="horizontal-loop-2" />
      </div>
    </section>
  );
};

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="absolute top-0 left-0 z-0 flex size-full items-center justify-center">
      <LanguageSection className="mt-[30%]" />
    </div>
    {children}
  </>
);
