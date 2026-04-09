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
    <footer className="flex flex-none flex-wrap items-center gap-4 px-6 py-1 max-md:pb-2 md:flex-row">
      <div className="flex flex-row items-center justify-center gap-x-4 gap-y-2 max-md:max-w-1/4">
        <Link to={logo.url.value} label={logo.label.value} color="text">
          <Logo width={80} height={80} className="size-6" />
        </Link>
        <Link to={github.url.value} label={github.label.value} color="text">
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

      <div className="m-auto flex w-auto flex-row flex-nowrap justify-around gap-4 gap-y-1 overflow-x-scroll max-md:max-w-2/3">
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
        <div className="scale-75">
          <Suspense>
            <SwitchThemeSwitcher />
          </Suspense>
        </div>
      )}
    </footer>
  );
};
