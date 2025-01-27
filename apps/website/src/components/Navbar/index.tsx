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
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

const getCleanTabSelector = (path: string): string => {
  // Split the path into components
  const components = path.split('/');

  // For single component "dashboard", you can choose to append "/"
  if (components.length > 2) {
    return components.slice(0, 2).join('/');
  }

  // Return the path as is for other cases
  return path;
};

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
        <Link href={logo.url.value} label={logo.label.value} color="text">
          <Logo type="logoWithText" className="max-h-6 flex-auto sm:max-h-6" />
        </Link>
      }
      selectedChoice={getCleanTabSelector(pathWithoutLocale)}
      desktopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id?.value}
            key={url.value}
            href={url.value}
            label={label.value}
            aria-current={pathWithoutLocale === url.value ? 'page' : undefined}
            color="text"
            variant="invisible-link"
            className="flex text-nowrap px-4 py-0.5 text-sm"
          >
            {title}
          </Link>
        )
      )}
      mobileTopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id?.value}
            key={url.value}
            href={url.value}
            aria-current={pathWithoutLocale === url.value ? 'page' : undefined}
            label={label.value}
            color="text"
            variant="invisible-link"
            className="w-full text-nowrap p-3 text-center leading-10 transition hover:font-bold aria-selected:font-bold"
          >
            {title}
          </Link>
        )
      )}
      mobileBottomChildren={
        <div className="flex w-full flex-col gap-4">
          <Link
            label={github.label.value}
            href={github.url.value}
            variant="button-outlined"
            color="text"
            className="group/github !rounded-2xl leading-6"
          >
            <GithubLogo alt={github.gitHubLogoAlt?.value} width={25} />
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
              onClick={handleLogOut}
              className="!rounded-2xl leading-6"
              size="md"
            >
              {logoutContent.title}
            </Button>
          ) : (
            <Link
              label={login.label.value}
              href={login.url.value}
              variant="button"
              color="text"
              className="!rounded-2xl leading-6"
            >
              {login.title}
            </Link>
          )}
        </div>
      }
      rightItemsMobile={
        <div className="flex gap-2">
          <LocaleSwitcher panelProps={{ className: '-left-16' }} />
          <SwitchThemeSwitcher />
          {isAuthenticated && (
            <Avatar isLoggedIn={isAuthenticated} fullname={user?.name} />
          )}
        </div>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher panelProps={{ className: '-left-16' }} />
          <SwitchThemeSwitcher />
          <Link
            label={github.label.value}
            href={github.url.value}
            color="custom"
            className="group/github !bg-text !text-text-dark dark:!bg-text-dark dark:!text-text flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo alt={github.gitHubLogoAlt?.value} width={25} />
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
