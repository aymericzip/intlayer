import { Burger, MaxHeightSmoother } from '@intlayer/design-system';
import { Container } from '@intlayer/design-system/container';
import { useDevice, useSession } from '@intlayer/design-system/hooks';
import { Logo } from '@intlayer/design-system/logo';
import { App_Home_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { getPathWithoutLocale } from 'intlayer';
import { type FC, useState } from 'react';
import { Link } from '#components/Link/Link';
import { LocaleSwitcher } from '#components/LocaleSwitcher/LocaleSwitcher';
import { ProfileDropDown } from '#components/ProfileDropdown/ProfileDropdown';
import { TranslationStatusAside } from '#components/TranslationStatusAside';
import {
  filterItems,
  flattenItems,
  getCleanPath,
  iconMap,
  type SidebarNavigationItem,
} from '../DashboardSidebar/DashboardSidebar';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

export type DashboardNavbarProps = {
  items?: SidebarNavigationItem[];
};

export const DashboardNavbar: FC<DashboardNavbarProps> = ({ items = [] }) => {
  const { session } = useSession();
  const { organization, project, roles } = session ?? {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useDevice();
  const { pathname } = useLocation();

  const isSuperAdmin =
    roles?.some((role: string) => role.toLowerCase() === 'admin') ?? false;

  const filteredNavItems = filterItems(items, {
    hasOrganization: !!organization,
    hasProject: !!project,
    isSuperAdmin,
  });

  const flatNavItems = flattenItems(filteredNavItems);

  const cleanPath = getCleanPath(getPathWithoutLocale(pathname));
  let activeKey = cleanPath;
  let maxLevel = -1;

  for (const item of flatNavItems) {
    if (item.href && getCleanPath(item.href) === cleanPath) {
      if (item.level > maxLevel) {
        maxLevel = item.level;
        activeKey = item.key;
      }
    }
  }

  return (
    <Container
      className="sticky top-0 z-50 flex w-full flex-col gap-3 p-4"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-2 md:gap-4">
          <Link to={App_Home_Path} label="Dashboard" color="text">
            <Logo className="size-6" />
          </Link>

          <div className="flex w-auto items-center gap-4">
            {organization && (
              <>
                <span>/</span>
                <OrganizationDropdown />
              </>
            )}
            {project && (
              <>
                <span>/</span>
                <ProjectDropdown />
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {project && <TranslationStatusAside />}
          <LocaleSwitcher />
          <ProfileDropDown />
          {isMobile && (
            <Burger
              isActive={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-0"
            />
          )}
        </div>
      </div>

      {isMobile && (
        <nav className="fixed top-12 left-0 mt-4 flex w-full flex-col gap-2">
          <MaxHeightSmoother isHidden={!isMenuOpen}>
            <Container
              className="h-screen w-full px-10 pt-10"
              roundedSize="none"
              transparency="xs"
              onClick={() => setIsMenuOpen(false)}
            >
              {flatNavItems.map((item) => {
                const IconComponent = item.icon
                  ? (iconMap[item.icon] ?? null)
                  : null;
                const isChild = item.level > 0;

                return (
                  <Link
                    key={item.key}
                    to={item.href ?? '#'}
                    label={item.label}
                    color="text"
                    variant="invisible-link"
                    preload="viewport"
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-text/5',
                      activeKey === item.key && 'bg-text/10 font-bold',
                      isChild && 'pl-10'
                    )}
                    aria-current={activeKey === item.key ? 'page' : undefined}
                  >
                    {IconComponent && (
                      <IconComponent className="size-5 shrink-0" />
                    )}
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </Container>
          </MaxHeightSmoother>
        </nav>
      )}
    </Container>
  );
};
