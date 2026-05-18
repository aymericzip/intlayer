import { useDevice } from '@intlayer/design-system/hooks';
import { TechLogos } from '@intlayer/design-system/tech-logo';
import type { LocalesValues } from 'intlayer';
import type { FC, ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { AppDownloadButton } from '#components/AppInstallModal/AppDownloadButton';
import { Link } from '#components/Link/Link';
import { LocaleSwitcher } from '#components/LocaleSwitcher/LocaleSwitcher.tsx';
import { SwitchThemeSwitcher } from '#components/SwitchThemeSwitcher.tsx';

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
  const { github } = useIntlayer('dashboard-footer');
  const { isMobile } = useDevice('sm');

  return (
    <footer className="z-90 flex flex-none flex-wrap items-center gap-4 px-6 pt-1 pb-2 max-md:pb-2 md:flex-row">
      <div className="flex flex-row items-center justify-center gap-x-4 gap-y-2 max-md:max-w-1/4">
        <Link to={github.url.value} label={github.label.value} color="text">
          <TechLogos.GITHUB width={20} />
        </Link>
        <AppDownloadButton />

        {isMobile && (
          <div className="ml-auto flex flex-row items-center justify-center gap-x-2">
            <LocaleSwitcher />
            <SwitchThemeSwitcher />
          </div>
        )}
      </div>

      <div className="m-auto flex w-auto flex-row flex-nowrap justify-around gap-4 gap-y-1 overflow-x-scroll max-md:hidden max-md:max-w-2/3">
        {links?.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            label={link.label}
            variant="invisible-link"
            color="neutral"
            className="text-sm"
            isExternalLink={false}
          >
            {link.text}
          </Link>
        ))}
      </div>
      {!isMobile && (
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
        </div>
      )}
    </footer>
  );
};
