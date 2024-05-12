'use client';

import {
  Button,
  Avatar,
  ProfileDropDown,
  LocaleSwitcher,
  Navbar as UINavBar,
  Logo,
  type NavSection,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';
import {
  DesktopThemeSwitcher,
  MobileThemeSwitcher,
} from '../ThemeSwitcherDropDown';
import { PagesRoutes } from '@/Routes';
import { useUser } from '@/utils/auth/next-auth/useUser';

export const Navbar: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const { isLoggedIn, isLoading, name, imageURL } = useUser();
  const { logo, sections, bottomSections, login, profile } =
    useIntlayer('navbar');
  const router = useRouter();

  const sectionWithClick: NavSection[] = Object.values(sections).map(
    (section) => ({
      ...section,
      onClick: () => router.push(section.url),
    })
  );
  const bottomSectionsWithClick: NavSection[] = [
    { ...bottomSections.login, onClick: () => bottomSections.login.url },
    { ...bottomSections.logout, onClick: () => void signOut() },
  ];

  return (
    <UINavBar
      desktopSections={sectionWithClick}
      mobileTopSections={sectionWithClick}
      mobileBottomSections={bottomSectionsWithClick}
      logo={
        <Logo
          onClick={() => router.push(PagesRoutes.Home)}
          aria-label={logo.label}
        />
      }
      mobileTopChildren={
        <Button variant="invisible-link" color="text" label={profile.label}>
          <div className="flex w-full flex-col items-center justify-center gap-2 pb-10">
            {isLoggedIn && (
              <Avatar
                isLoggedIn={isLoggedIn}
                isLoading={isLoading}
                fullname={name}
                src={imageURL}
                className="size-16"
              />
            )}
            <span className="font-bold transition">{name}</span>
          </div>
        </Button>
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

          {isLoggedIn ? (
            <ProfileDropDown
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              fullname={name}
              src={imageURL}
            />
          ) : (
            <Button
              onClick={() => router.push(PagesRoutes.LogIn)}
              variant="invisible-link"
              color="text"
              label={login.label}
              className="pl-4"
            >
              {login.text}
            </Button>
          )}
        </>
      }
    />
  );
};
