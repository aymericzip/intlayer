'use client';

import { Link } from '@components/Link/Link';
import { LocaleSwitcher } from '@components/LocaleSwitcher/LocaleSwitcher';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { useDevice, usePersistedStore, useUser } from '@intlayer/design-system/hooks';
import { LogoWithText } from '@intlayer/design-system/logo';
import { Navbar as UINavBar } from '@intlayer/design-system/navbar';
import { DiscordLogo } from '@intlayer/design-system/social-networks';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import {
  App_Auth_Demo_Path,
  App_Dashboard,
} from '@intlayer/design-system/routes';
import { Image, StarIcon, VectorSquare } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC, MouseEvent } from 'react';

const SwitchThemeSwitcher = dynamic(
  () =>
    import('@components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
      (mod) => mod.SwitchThemeSwitcher
    ),
  { ssr: false }
);

const getCleanChoice = (path?: string): string => {
  if (!path) return '';
  if (path.startsWith('http')) {
    return path;
  }
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
    sections,
    github,
    login,
    logout: logoutContent,
    discord,
  } = useIntlayer('navbar');
  const { isAuthenticated, logout, user } = useUser();
  const { pathWithoutLocale } = useLocale();
  const router = useRouter();
  const { isMobile } = useDevice();
  const [hasVisitedApp, setHasVisitedApp] = usePersistedStore<boolean>(
    'hasVisitedApp',
    false
  );

  const handleAppLinkClick = (e: MouseEvent) => {
    if (!hasVisitedApp) {
      setHasVisitedApp(true);
      if (!isAuthenticated) {
        e.preventDefault();
        window.location.href = `${App_Dashboard}${App_Auth_Demo_Path}`;
      }
    }
  };

  const handleLogOut = () => {
    logout()
      .then(() => router.refresh())
      .catch((err) => console.error(err));
  };

  const selectedChoice = getCleanChoice(pathWithoutLocale);

  const downloadFile = async (url: string, filename: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blobUrl);
  };

  const copySvg = async () => {
    const response = await fetch('/logo.svg');
    const text = await response.text();
    await navigator.clipboard.writeText(text);
  };

  const copyImage = async () => {
    const response = await fetch('/android-chrome-512x512.png');
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  };

  return (
    <UINavBar
      logo={
        <Link href={logo.url.value} label={logo.label.value} color="neutral">
          {isMobile ? (
            <LogoWithText className="max-h-6 w-auto flex-auto" />
          ) : (
            <DropDown identifier="navbar-logo">
              <DropDown.Trigger
                identifier="navbar-logo"
                variant="none"
                color="neutral"
                className="px-0! group-focus-within/dropdown:bg-current/0 group-focus-within/dropdown:ring-0"
              >
                <LogoWithText className="max-h-6 w-auto flex-auto text-text" />
              </DropDown.Trigger>
              <DropDown.Panel
                align="start"
                identifier="navbar-logo"
                isOverable
                isFocusable={false}
                smootherClassName="delay-0 group-hover/dropdown:delay-600"
              >
                <Container
                  background="with"
                  transparency="md"
                  roundedSize="2xl"
                  padding="sm"
                  className="gap-3 border border-text/5"
                >
                  <Button
                    variant="hoverable"
                    color="neutral"
                    size="md"
                    label={logo.downloadSvg.label.value}
                    Icon={VectorSquare}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      downloadFile('/logo.svg', 'intlayer-logo.svg');
                    }}
                  >
                    <span className="ml-2 flex w-full text-text">
                      {logo.downloadSvg.label}
                    </span>
                  </Button>
                  <Button
                    variant="hoverable"
                    color="neutral"
                    size="md"
                    label={logo.downloadPng.label.value}
                    Icon={Image}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      downloadFile(
                        '/android-chrome-512x512.png',
                        'intlayer-logo.png'
                      );
                    }}
                  >
                    <span className="ml-2 flex w-full text-text">
                      {logo.downloadPng.label}
                    </span>
                  </Button>
                  <Button
                    variant="hoverable"
                    size="md"
                    color="neutral"
                    label={logo.copyAsSvg.label.value}
                    Icon={VectorSquare}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copySvg();
                    }}
                  >
                    <span className="ml-2 flex w-full text-text">
                      {logo.copyAsSvg.label}
                    </span>
                  </Button>
                  <Button
                    variant="hoverable"
                    size="md"
                    color="neutral"
                    label={logo.copyAsImage.label.value}
                    Icon={Image}
                    onClick={(e: MouseEvent) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyImage();
                    }}
                  >
                    <span className="ml-2 flex w-full text-text">
                      {logo.copyAsImage.label}
                    </span>
                  </Button>
                </Container>
              </DropDown.Panel>
            </DropDown>
          )}
        </Link>
      }
      selectedChoice={selectedChoice}
      mobileRollable={mobileRollable}
      desktopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id?.value}
            key={getCleanChoice(url.value)}
            href={url.value}
            label={label.value}
            isExternalLink={false}
            isActive={selectedChoice === getCleanChoice(url.value)}
            color="text"
            variant="invisible-link"
            className="flex text-nowrap px-4 py-0.5 text-sm aria-[current]:bg-current/0"
            onClick={
              id?.value === 'dashboard' ? handleAppLinkClick : undefined
            }
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
            isExternalLink={false}
            isActive={selectedChoice === getCleanChoice(url.value)}
            label={label.value}
            color="text"
            variant="invisible-link"
            className="w-full text-nowrap p-3 text-center leading-10 transition hover:font-bold aria-selected:font-bold"
            onClick={
              id?.value === 'dashboard' ? handleAppLinkClick : undefined
            }
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
        </>
      }
    />
  );
};
