'use client';

import GithubLogo from '@assets/github.svg';
import { SwitchThemeSwitcher } from '@components/ThemeSwitcherDropDown/SwitchThemeSwitcher';
import {
  LocaleSwitcher,
  Navbar as UINavBar,
  Logo,
  type NavSection,
} from '@intlayer/design-system';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const { logo, sections, github } = useIntlayer('navbar');
  const router = useRouter();

  const sectionWithClick: NavSection[] = Object.values(sections).map(
    (section) => ({
      title: section.title,
      id: section.id.value,
      url: section.url.value,
      label: section.label.value,
      onClick: () => router.push(section.url.value),
    })
  );

  return (
    <UINavBar
      logo={
        <Link href={logo.url.value} aria-label={logo.label.value}>
          <Logo
            type="logoWithText"
            className="max-h-4 cursor-pointer sm:max-h-6"
          />
        </Link>
      }
      desktopSections={sectionWithClick}
      mobileTopSections={sectionWithClick}
      mobileBottomChildren={
        <Link
          aria-label={github.label.value}
          href={github.url.value}
          className="group/github border-text dark:border-text-dark text-text dark:text-text-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 p-1"
        >
          <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
          GitHub
          <StarIcon
            width={18}
            className="group-hover/github:fill-text dark:group-hover/github:fill-text-dark mr-1"
          />
        </Link>
      }
      rightItemsMobile={
        <>
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
            fullLocaleName={false}
          />
          <SwitchThemeSwitcher />
        </>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
            fullLocaleName={false}
          />
          <SwitchThemeSwitcher />
          <Link
            aria-label={github.label.value}
            href={github.url.value}
            className="group/github bg-text dark:bg-text-dark text-text-dark dark:text-text flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            <StarIcon
              width={18}
              className="group-hover/github:fill-text-dark dark:group-hover/github:fill-text mr-1"
            />
          </Link>
        </>
      }
    />
  );
};
