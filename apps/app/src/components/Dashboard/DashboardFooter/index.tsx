'use client';

import { GithubLogo } from '@components/GithubLogo';
import { Link } from '@components/Link/Link';
import { Logo } from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import type { LocalesValues } from 'intlayer';
import dynamic from 'next/dynamic';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

const SwitchThemeSwitcher = dynamic(
  () =>
    import('@components/ThemeSwitcherDropDown/SwitchThemeSwitcher').then(
      (mod) => mod.SwitchThemeSwitcher
    ),
  { ssr: false }
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
    <footer className="flex flex-auto flex-wrap items-center gap-4 overflow-auto px-6 py-1 max-md:mt-4 max-md:pb-20 md:flex-row">
      <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 max-md:max-w-1/4">
        <Link href={logo.url.value} label={logo.label.value} color="text">
          <Logo width={80} height={80} className="size-6" />
        </Link>
        <Link href={github.url.value} label={github.label.value} color="text">
          <GithubLogo width={25} />
        </Link>
        {isMobile && (
          <div className="scale-75">
            <SwitchThemeSwitcher />
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
          <SwitchThemeSwitcher />
        </div>
      )}
    </footer>
  );
};
