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
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

import { ExternalLinks } from '@/Routes';

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
          <SwitchThemeSwitcher />
        </>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
          />
          <SwitchThemeSwitcher />
          <button
            aria-label={github.label.value}
            onClick={() => router.push(github.url.value)}
            className="group/github bg-text dark:bg-text-dark text-text-dark dark:text-text flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            <StarIcon
              width={18}
              className="group-hover/github:fill-text-dark dark:group-hover/github:fill-text mr-1"
            />
          </button>
        </>
      }
    />
  );
};
