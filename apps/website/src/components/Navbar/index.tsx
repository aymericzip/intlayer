/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';

import GithubLogo from '@assets/github.svg';
import { ProfileDropDown } from '@components/Auth/ProfileDropdown';
import { SwitchThemeSwitcher } from '@components/ThemeSwitcherDropDown/SwitchThemeSwitcher';
import {
  LocaleSwitcher,
  Navbar as UINavBar,
  Logo,
  type NavSection,
  useUser,
  Button,
  Avatar,
} from '@intlayer/design-system';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import { use, type FC } from 'react';

export const Navbar: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const {
    logo,
    sections,
    github,
    login,
    logout: logoutContent,
  } = useIntlayer('navbar');
  const router = useRouter();
  const { isAuthenticated, logout, user } = useUser();

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
        <div className="flex w-full flex-col gap-4">
          <Link
            aria-label={github.label.value}
            href={github.url.value}
            className="group/github border-text text-text dark:border-text-dark dark:text-text-dark bg-text dark:bg-text-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 bg-opacity-0 p-1 hover:bg-opacity-30 dark:bg-opacity-0"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            GitHub
            <StarIcon
              width={18}
              className="group-hover/github:fill-text dark:group-hover/github:fill-text-dark mr-1"
            />
          </Link>

          {isAuthenticated ? (
            <Button
              variant="outline"
              color="text"
              label={logoutContent.label.value}
              onClick={logout}
              className="!rounded-full"
              size="lg"
            >
              {logoutContent.title}
            </Button>
          ) : (
            <Link
              aria-label={login.label.value}
              href={login.url.value}
              className="border-text text-text dark:border-text-dark dark:text-text-dark bg-text dark:bg-text-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 bg-opacity-0 p-1 hover:bg-opacity-30 dark:bg-opacity-0"
            >
              {login.title}
            </Link>
          )}
        </div>
      }
      rightItemsMobile={
        <div className="flex gap-2">
          <LocaleSwitcher
            setLocale={setLocale}
            localeList={availableLocales}
            locale={locale}
            fullLocaleName={false}
          />
          <SwitchThemeSwitcher />
          {isAuthenticated && (
            <Avatar isLoggedIn={isAuthenticated} fullname={user?.name} />
          )}
        </div>
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
            className="group/github bg-text text-text-dark dark:bg-text-dark dark:text-text flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            <StarIcon
              width={18}
              className="group-hover/github:fill-text-dark dark:group-hover/github:fill-text mr-1"
            />
          </Link>
          <ProfileDropDown />
        </>
      }
    />
  );
};
