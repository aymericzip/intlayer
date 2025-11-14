'use client';

import { GithubLogo } from '@components/GithubLogo';
import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '@components/ProfileDropdown/ProfileDropdown';
import {
  Avatar,
  Button,
  DiscordLogo,
  LogoWithText,
  Navbar as UINavBar,
} from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { StarIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

const SwitchThemeSwitcher = dynamic(
  () =>
    import('@components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
      (mod) => mod.SwitchThemeSwitcher
    ),
  { ssr: false }
);

const getCleanChoice = (path: string): string => {
  const components = path.split('/');
  return components.slice(0, 2).join('/');
};

export const Navbar: FC = () => {
  const {
    logo,
    sections,
    github,
    login,
    logout: logoutContent,
    discord,
  } = useIntlayer('navbar');
  const { isAuthenticated, logout, user } = useUser();
  const { pathWithoutLocale } = useLocale();
  const router = useRouter();

  const handleLogOut = () => {
    logout()
      .then(() => router.refresh())
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
      desktopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id?.value}
            key={getCleanChoice(url.value)}
            href={url.value}
            label={label.value}
            aria-current={
              selectedChoice === getCleanChoice(url.value) ? 'page' : undefined
            }
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
            key={getCleanChoice(url.value)}
            href={url.value}
            aria-current={
              selectedChoice === getCleanChoice(url.value) ? 'page' : undefined
            }
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
            className="group/github rounded-2xl! leading-6"
          >
            <GithubLogo width={25} />
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
              className="rounded-2xl! text-center font-medium leading-6"
            >
              {login.title}
            </Link>
          )}
        </div>
      }
      rightItemsMobile={
        <div className="flex gap-2">
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
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
          <SwitchThemeSwitcher />
          <a
            aria-label={discord.label.value}
            href={discord.url.value}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] border-text p-1.5 hover:bg-text/10"
          >
            <DiscordLogo width={20} className="aspect-square h-auto" />
          </a>
          <Link
            label={github.label.value}
            href={github.url.value}
            color="custom"
            className="group/github flex cursor-pointer items-center gap-2 rounded-full bg-text p-1 text-text-opposite"
          >
            <GithubLogo width={25} />
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
