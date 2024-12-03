/* eslint-disable tailwindcss/migration-from-tailwind-2 */
'use client';

import GithubLogo from '@assets/github.svg';
import { ProfileDropDown } from '@components/Auth/ProfileDropdown';
import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { SwitchThemeSwitcher } from '@components/ThemeSwitcherDropDown/SwitchThemeSwitcher';
import {
  Navbar as UINavBar,
  Logo,
  useUser,
  Button,
  Avatar,
} from '@intlayer/design-system';
import { StarIcon } from 'lucide-react';
import NextLink from 'next/link';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const Navbar: FC = () => {
  const {
    logo,
    sections,
    github,
    login,
    logout: logoutContent,
  } = useIntlayer('navbar');
  const { isAuthenticated, logout, user } = useUser();
  const { pathWithoutLocale } = useLocale();

  const handleLogOut = () => {
    logout().catch((err) => console.error(err));
  };

  return (
    <UINavBar
      logo={
        <NextLink href={logo.url.value} aria-label={logo.label.value}>
          <Logo
            type="logoWithText"
            className="max-h-4 cursor-pointer sm:max-h-6"
          />
        </NextLink>
      }
      selectedChoice={pathWithoutLocale}
      desktopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id.value}
            key={url.value}
            href={url.value}
            label={label.value}
            color="text"
            variant="invisible-link"
            className="flex px-4 py-0.5 text-sm"
          >
            {title}
          </Link>
        )
      )}
      mobileTopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id.value}
            key={url.value}
            href={url.value}
            label={label.value}
            color="text"
            variant="invisible-link"
            className="hover:text-primary aria-selected:text-primary w-full cursor-pointer p-3 text-center leading-10 transition"
          >
            {title}
          </Link>
        )
      )}
      mobileBottomChildren={
        <div className="flex w-full flex-col gap-4">
          <NextLink
            aria-label={github.label.value}
            href={github.url.value}
            className="group/github border-text text-text dark:border-text-dark dark:text-text-dark bg-text dark:bg-text-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            GitHub
            <StarIcon
              width={18}
              className="group-hover/github:fill-text dark:group-hover/github:fill-text-dark mr-1"
            />
          </NextLink>

          {isAuthenticated ? (
            <Button
              variant="outline"
              color="text"
              label={logoutContent.label.value}
              onClick={handleLogOut}
              className="!rounded-full"
              size="lg"
            >
              {logoutContent.title}
            </Button>
          ) : (
            <NextLink
              aria-label={login.label.value}
              href={login.url.value}
              className="border-text text-text dark:border-text-dark dark:text-text-dark bg-text dark:bg-text-dark flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 bg-opacity-0 p-1 hover:bg-opacity-30 dark:bg-opacity-0"
            >
              {login.title}
            </NextLink>
          )}
        </div>
      }
      rightItemsMobile={
        <div className="flex gap-2">
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
          {isAuthenticated && (
            <Avatar isLoggedIn={isAuthenticated} fullname={user?.name} />
          )}
        </div>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
          <NextLink
            aria-label={github.label.value}
            href={github.url.value}
            className="group/github bg-text text-text-dark dark:bg-text-dark dark:text-text flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo alt={github.gitHubLogoAlt.value} width={25} />
            <StarIcon
              width={18}
              className="group-hover/github:fill-text-dark dark:group-hover/github:fill-text mr-1"
            />
          </NextLink>
          <ProfileDropDown />
        </>
      }
    />
  );
};
