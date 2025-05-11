'use client';

import { ProfileDropDown } from '@components/Auth/ProfileDropdown';
import { GithubLogo } from '@components/GithubLogo';
import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import {
  Avatar,
  Button,
  LogoWithText,
  Navbar as UINavBar,
  useUser,
} from '@intlayer/design-system';
import { StarIcon } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

const SwitchThemeSwitcher = dynamic(
  () =>
    import('@components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
      (mod) => mod.SwitchThemeSwitcher
    ),
  { ssr: false }
);

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
  const router = useRouter();

  const handleLogOut = () => {
    logout()
      .then(() => router.refresh())
      .catch((err) => console.error(err));
  };

  return (
    <UINavBar
      logo={
        <Link href={logo.url.value} label={logo.label.value} color="text">
          <LogoWithText className="max-h-6 w-auto flex-auto sm:max-h-6" />
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
            <GithubLogo width={25} />
            GitHub
            <StarIcon
              width={18}
              className="group-hover/github:fill-text mr-1"
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
            className="group/github !bg-text !text-text-opposite flex cursor-pointer items-center gap-2 rounded-full p-1"
          >
            <GithubLogo width={25} />
            <StarIcon
              width={18}
              className="group-hover/github:fill-text-opposite mr-1"
            />
          </Link>
          <ProfileDropDown />
        </>
      }
    />
  );
};
