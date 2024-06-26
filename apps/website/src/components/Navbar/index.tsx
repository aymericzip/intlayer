'use client';

import GithubLogo from '@assets/github.svg';
import {
  LocaleSwitcher,
  Navbar as UINavBar,
  Logo,
  type NavSection,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';
import {
  DesktopThemeSwitcher,
  MobileThemeSwitcher,
} from '../ThemeSwitcherDropDown';
import { ExternalLinks } from '@/Routes';

export const Navbar: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const { logo, sections } = useIntlayer('navbar');
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
      desktopSections={sectionWithClick}
      mobileTopSections={sectionWithClick}
      logo={
        <Logo
          onClick={() => router.push(logo.url.value)}
          aria-label={logo.label.value}
          type="logoWithText"
          className="cursor-pointer"
        />
      }
      rightItemsMobile={
        <>
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
          />
          <MobileThemeSwitcher />
        </>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
          />
          <DesktopThemeSwitcher />
          <GithubLogo
            alt="Logo of Github"
            aria-label="Go to the github repo"
            width={25}
            onClick={() => router.push(ExternalLinks.Github)}
            className="cursor-pointer"
          />
        </>
      }
    />
  );
};
