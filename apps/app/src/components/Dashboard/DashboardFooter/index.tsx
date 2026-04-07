'use client';

import { useDevice } from '@intlayer/design-system/hooks';
import { Logo } from '@intlayer/design-system/logo';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

const SwitchThemeSwitcher = lazy(() =>
  import('#components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
    (mod) => ({ default: mod.SwitchThemeSwitcher })
  )
);

export type DashboardFooterLink = {
  href: string;
  text: ReactNode;
  onClick?: () => void;
  label: string;
};

export type DashboardFooterProps = {
  links?: DashboardFooterLink[];
  locale: LocalesValues;
};

export const DashboardFooter: FC<DashboardFooterProps> = ({ links }) => {
  const { github, logo } = useIntlayer('dashboard-footer');
  const { isMobile } = useDevice('sm');

  return (
    <footer className="flex-none flex flex-wrap items-center gap-4 px-6 py-1 max-md:mt-4 max-md:pb-2 md:flex-row">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 max-md:max-w-1/4">
        <Link href={logo.url.value} label={logo.label.value} color="text">
          <Logo width={80} height={80} className="size-6" />
        </Link>
        <Link href={github.url.value} label={github.label.value} color="text">
          <TechLogos.GITHUB width={25} />
        </Link>
        {isMobile && (
          <div className="scale-75">
            <Suspense>
              <SwitchThemeSwitcher />
            </Suspense>
          </div>
        )}
      </div>

      <div className="m-auto flex flex-row flex-wrap justify-around gap-4 max-md:max-w-2/3 md:gap-x-8">
        {links?.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            label={link.label}
            variant="invisible-link"
            color="neutral"
            className="text-sm"
          >
            {link.text}
          </Link>
        ))}
      </div>
      {!isMobile && (
        <div className="scale-75">
          <Suspense>
            <SwitchThemeSwitcher />
          </Suspense>
        </div>
      )}
    </footer>
  );
};
