'use client';

import { Container, Flag } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import {
  getHTMLTextDir,
  getLocaleName,
  localeList,
  type Locales,
} from 'intlayer';
import {
  useEffect,
  useState,
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

const shuffleArray = (array: string[], limit?: number) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return limit ? shuffled.slice(0, limit) : shuffled;
};

const LocalCard: FC<{ locale: string }> = ({ locale, ...props }) => (
  <li
    key={locale}
    className="group z-10 mx-8 list-none transition-transform duration-300 hover:scale-105"
    {...props}
  >
    <Container roundedSize="xl">
      <div className="flex flex-row items-center gap-5 p-3">
        <Flag
          locale={locale as Locales}
          className="max-h-5 max-w-5 rounded-sm grayscale-[80%] transition duration-300 group-hover:grayscale-0"
          width={640}
          height={480}
          loading="lazy"
        />
        <span
          dir={getHTMLTextDir(locale as Locales)}
          lang={locale as Locales}
          className="flex text-nowrap"
        >
          {getLocaleName(locale as Locales)}
        </span>
      </div>
    </Container>
  </li>
);

const LocalCardList: FC<{ localeList: string[]; className?: string }> = ({
  localeList,
  className,
  ...props
}) => (
  <li className={cn('list-none', className)} {...props}>
    <ul className="flex size-full items-center justify-start">
      {localeList.map((locale) => (
        <LocalCard key={locale} locale={locale} />
      ))}

      {localeList.map((locale) => (
        <LocalCard key={locale} locale={locale} />
      ))}
    </ul>
  </li>
);

const NUM_OF_LOCALES = 15;

const emptyArrayOfLocale: string[][] = new Array(4).fill(0).map(() => []);
const arrayOfLocale: string[][] = new Array(4)
  .fill(0)
  .map(() => shuffleArray(localeList, NUM_OF_LOCALES));

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
        'my-10 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]',
        className
      )}
      {...props}
    >
      <ul className="relative grid size-full gap-5 overflow-hidden whitespace-nowrap py-3">
        <LocalCardList
          localeList={firstPart}
          className="animate-infinite-scroll duration-slow"
        />
        <LocalCardList
          localeList={secondPart}
          className="animate-infinite-scroll duration-slow animation-reverse"
        />
        <LocalCardList
          localeList={thirdPart}
          className="animate-infinite-scroll duration-slow"
        />
        <LocalCardList
          localeList={fourthPart}
          className="animate-infinite-scroll duration-slow animation-reverse"
        />
      </ul>
    </section>
  );
};

export const LanguageBackground: FC<PropsWithChildren> = ({ children }) => (
  <>
    <div className="absolute left-0 top-0 -z-0 flex size-full items-center justify-center">
      <LanguageSection className="mt-[30%]" />
    </div>
    {children}
  </>
);
