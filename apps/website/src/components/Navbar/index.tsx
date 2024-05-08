'use client';

import {
  Button,
  Avatar,
  ProfileDropDown,
  LocaleSwitcher,
  Navbar as UINavBar,
  Logo,
} from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intlayer';
import type { FC } from 'react';
import {
  DesktopThemeSwitcher,
  MobileThemeSwitcher,
} from '../ThemeSwitcherDropDown';
import { getNavbarContent } from '@/components/Navbar/navbarContent';
import { useUser } from '@/utils/auth/next-auth/useUser';

export const Navbar: FC = () => {
  const { locale, setLocale, availableLocales } = useLocale();
  const router = useRouter();
  const { isLoggedIn, isLoading, name, imageURL } = useUser();
  const { logo, sections, bottomSections, login, profile } = getNavbarContent(
    isLoggedIn,
    router
  );

  return (
    <UINavBar
      key={locale} // Refresh router when locale changes
      desktopSections={sections}
      mobileTopSections={sections}
      mobileBottomSections={bottomSections}
      logo={<Logo onClick={logo.onClick} aria-label={logo.label} />}
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
              onClick={() => login.onClick()}
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
