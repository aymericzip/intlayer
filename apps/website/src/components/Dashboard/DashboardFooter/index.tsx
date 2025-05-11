'use client';

import { GithubLogo } from '@components/GithubLogo';
import { Link } from '@components/Link/Link';
import { Logo } from '@intlayer/design-system';
import type { Locales } from 'intlayer';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';

export type DashboardFooterLink = {
  href: string;
  text: ReactNode;
  onClick?: () => void;
  label: string;
};

export type DashboardFooterProps = {
  links?: DashboardFooterLink[];
  locale: Locales;
};

export const DashboardFooter: FC<DashboardFooterProps> = ({ links }) => {
  const { github, logo } = useIntlayer('dashboard-footer');

  return (
    <footer className="flex flex-auto flex-row flex-wrap items-center gap-4 overflow-auto p-6">
      <Link href={logo.url.value} label={logo.label.value} color="text">
        <Logo width={80} height={80} className="size-6" />
      </Link>
      <Link href={github.url.value} label={github.label.value} color="text">
        <GithubLogo width={25} />
      </Link>
      <div className="m-auto flex flex-row justify-around gap-x-4 md:gap-x-8">
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
    </footer>
  );
};
