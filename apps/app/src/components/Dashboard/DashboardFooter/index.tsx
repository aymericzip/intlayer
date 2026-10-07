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
  const { isMobile } = useDevice('md');

  return (
    <footer className="z-90 flex flex-none flex-row items-center gap-4 px-6 pt-1 pb-2 max-md:pb-2">
      <div className="flex min-w-fit flex-1 flex-row items-center justify-start gap-x-4 gap-y-2">
        <Link to={github.url.value} label={github.label.value} color="text">
          <TechLogos.GITHUB width={20} />
        </Link>
        <AppDownloadButton />

        {isMobile && (
          <div className="ms-auto flex flex-row items-center justify-start gap-x-2">
            <LocaleSwitcher />
            <SwitchThemeSwitcher />
          </div>
        )}
      </div>

      <div className="flex min-w-0 shrink-0 flex-row flex-nowrap items-center justify-center gap-4 gap-y-1 overflow-x-auto max-md:hidden">
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
        <div className="flex min-w-fit flex-1 flex-row items-center justify-end gap-x-2">
          <LocaleSwitcher />
          <SwitchThemeSwitcher />
        </div>
      )}
    </footer>
  );
};
