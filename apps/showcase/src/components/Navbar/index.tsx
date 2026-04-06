import { Link } from '@intlayer/design-system/link';
import { LogoWithText } from '@intlayer/design-system/logo';
import { Navbar as UINavBar } from '@intlayer/design-system/navbar';
import { DiscordLogo } from '@intlayer/design-system/social-networks';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import { useLocation, useRouter } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '../ProfileDropdown/ProfileDropdown';
import { SwitchThemeSwitcher } from '../SwitchThemeSwitcher';

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
    sections,
    github,
    login,
    logout: logoutContent,
    discord,
  } = useIntlayer('navbar');

  const isAuthenticated = false;
  const logout = async () => {};

  const location = useLocation();
  const pathWithoutLocale = getCleanChoice(location.pathname);
  const router = useRouter();

  const handleLogOut = () => {
    logout()
      .then(() => router.invalidate())
      .catch((err) => console.error(err));
  };

  const selectedChoice = pathWithoutLocale;

  return (
    <UINavBar
      logo={
        <Link
          href={logo.url.value}
          label={logo.label.value}
          isExternalLink={false}
          color="text"
        >
          <LogoWithText className="max-h-6 w-auto flex-auto sm:max-h-6" />
        </Link>
      }
      selectedChoice={selectedChoice}
      mobileRollable={mobileRollable}
      desktopSections={Object.values(sections).map(
        ({ id, url, label, title }) => (
          <Link
            id={id?.value}
            key={id?.value}
            href={url.value}
            label={label.value}
            isExternalLink={false}
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
            key={id?.value}
            href={url.value}
            isExternalLink={false}
            isActive={selectedChoice === getCleanChoice(url.value)}
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
            <TechLogos.GITHUB width={25} />
            GitHub
            <StarIcon
              width={18}
              className="mr-1 group-hover/github:fill-text"
            />
          </Link>

          {isAuthenticated ? (
            <button
              type="button"
              aria-label={logoutContent.label.value}
              onClick={handleLogOut}
              className="rounded-2xl! border border-text/10 bg-background px-4 py-2 text-center font-medium text-text leading-6"
            >
              {logoutContent.title}
            </button>
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
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
          <ProfileDropDown />
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

          <ProfileDropDown />
        </>
      }
    />
  );
};
