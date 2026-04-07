'use client';

import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { useUser } from '@intlayer/design-system/hooks';
import { LogoWithText } from '@intlayer/design-system/logo';
import { Navbar as UINavBar } from '@intlayer/design-system/navbar';
import { DiscordLogo } from '@intlayer/design-system/social-networks';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { useLocation } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';
import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import { LocaleSwitcher } from '#components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '#components/ProfileDropdown/ProfileDropdown';

const SwitchThemeSwitcher = lazy(() =>
  import('#components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
    (mod) => ({ default: mod.SwitchThemeSwitcher })
  )
);

const getCleanChoice = (path?: string): string => {
  if (!path) return '';
  let pathname = path;
  try {
    pathname = new URL(path).pathname;
  } catch {
    // already a relative path, use as-is
  }
  const components = pathname.split('/');
  return components.slice(0, 2).join('/');
};

type NavbarProps = {
  mobileRollable?: boolean;
};

export const Navbar: FC<NavbarProps> = ({ mobileRollable = true }) => {
  const {
    logo,
    github,
    login,
    logout: logoutContent,
    discord,
  } = useIntlayer('navbar');
  const { isAuthenticated, logout, user } = useUser();
  const { pathname: pathWithoutLocale } = useLocation();

  const handleLogOut = () => {
    logout()
      .then(() => window.location.reload())
      .catch((err) => console.error(err));
  };

  const selectedChoice = getCleanChoice(pathWithoutLocale);

  return (
    <UINavBar
      logo={
        <Link href={logo.url.value} label={logo.label.value} color="text">
          <LogoWithText className="max-h-6 w-auto flex-auto sm:max-h-6" />
        </Link>
      }
      selectedChoice={selectedChoice}
      mobileRollable={mobileRollable}
      mobileBottomChildren={
        <div className="flex w-full flex-col gap-4">
          <Link
            label={github.label.value}
            href={github.url.value}
            variant="button-outlined"
            color="text"
            className="group/github rounded-2xl! leading-6"
          >
            <TechLogos.GITHUB width={25} />
            GitHub
            <StarIcon
              width={18}
              className="mr-1 group-hover/github:fill-text"
            />
          </Link>

          {isAuthenticated ? (
            <Button
              variant="outline"
              color="text"
              label={logoutContent.label.value}
              onClick={handleLogOut}
              className="rounded-2xl! text-center font-medium leading-6"
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
            >
              {login.title}
            </Link>
          )}
        </div>
      }
      rightItemsMobile={
        <div className="flex gap-2">
          <LocaleSwitcher />
          <Suspense>
            <SwitchThemeSwitcher />
          </Suspense>
          {isAuthenticated && (
            <Avatar
              isLoggedIn={isAuthenticated}
              fullname={user?.name}
              src={user?.image ?? undefined}
            />
          )}
        </div>
      }
      rightItemsDesktop={
        <>
          <LocaleSwitcher />
          <Suspense>
            <SwitchThemeSwitcher />
          </Suspense>
          <Link
            label={discord.label.value}
            href={discord.url.value}
            target="_blank"
            color="text"
            variant="button-outlined"
            roundedSize="full"
            rel="noopener noreferrer nofollow"
            className="flex cursor-pointer items-center gap-2 rounded-full border-[1.3px] p-1.5"
          >
            <DiscordLogo width={20} className="aspect-square h-auto" />
          </Link>
          <Link
            label={github.label.value}
            href={github.url.value}
            color="text"
            variant="button"
            roundedSize="full"
            className="group/github flex cursor-pointer items-center gap-1 p-0.5"
          >
            <TechLogos.GITHUB width={25} />
            <StarIcon
              width={18}
              className="mr-1 group-hover/github:fill-text-opposite"
            />
          </Link>
          <div className="-m-1.5">
            <ProfileDropDown />
          </div>
        </>
      }
    />
  );
};
