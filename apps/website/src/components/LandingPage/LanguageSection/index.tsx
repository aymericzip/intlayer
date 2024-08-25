'use client';

import { Container, Flag } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { getHTMLTextDir, getLocaleName, type Locales } from 'intlayer';
import { useLocale } from 'next-intlayer/client';
import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  useMemo,
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
    className="group mx-8 list-none transition-transform duration-300 hover:scale-105"
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
          lang={locale}
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
  <div className={cn('flex items-center justify-start ', className)} {...props}>
    {localeList.map((locale) => (
      <LocalCard key={locale} locale={locale} />
    ))}

    {localeList.map((locale) => (
      <LocalCard key={locale} locale={locale} />
    ))}
  </div>
);

export const LanguageSection: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  ...props
}) => {
  const { localeList } = useLocale();

  const firstPart = useMemo(() => shuffleArray(localeList, 15), [localeList]);
  const secondPart = useMemo(() => shuffleArray(localeList, 15), [localeList]);
  const thirdPart = useMemo(() => shuffleArray(localeList, 15), [localeList]);
  const fourthPart = useMemo(() => shuffleArray(localeList, 15), [localeList]);

  return (
    <section
      className={cn(
        'my-10 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]',
        className
      )}
      {...props}
    >
      <div className="relative grid size-full gap-5 overflow-hidden whitespace-nowrap py-3">
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
    <div className="absolute left-0 top-0 -z-0 flex size-full items-center justify-center">
      <LanguageSection className="mt-[30%]" />
    </div>
    {children}
  </>
);
