import { useSession } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { useDevice } from '@intlayer/design-system/hooks';
import { Logo } from '@intlayer/design-system/logo';
import { MaxHeightSmoother } from '@intlayer/design-system/max-height-smoother';
import { Burger } from '@intlayer/design-system/navbar';
import {
  App_Dashboard_Dictionaries_Path,
  App_Dashboard_Translate_Path,
  App_Home_Path,
} from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { useLocation } from '@tanstack/react-router';
import { getPathWithoutLocale } from 'intlayer';
import { MoreHorizontal } from 'lucide-react';
import { type FC, lazy, Suspense, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';
import {
  filterItems,
  flattenItems,
  getCleanPath,
  iconMap,
  type SidebarNavigationItem,
} from '../DashboardSidebar/DashboardSidebar';
import { EnvironmentDropdown } from './EnvironmentDropdown';
import { OrganizationDropdown } from './OrganizationDropdown';
import { ProjectDropdown } from './ProjectDropdown';

const TranslationStatusAside = lazy(() =>
  import('#components/TranslationStatusAside').then((m) => ({
    default: m.TranslationStatusAside,
  }))
);
const DashboardChatBot = lazy(() =>
  import('#components/Dashboard/DashboardChatBot').then((m) => ({
    default: m.DashboardChatBot,
  }))
);
const VisualEditorDrawer = lazy(() =>
  import('#components/Dashboard/Editor/VisualEditorDrawer').then((m) => ({
    default: m.VisualEditorDrawer,
  }))
);

export type DashboardNavbarProps = {
  items?: SidebarNavigationItem[];
};

export const DashboardNavbar: FC<DashboardNavbarProps> = ({ items = [] }) => {
  const content = useIntlayer('dashboard-navbar1');

  const { session } = useSession();
  const { organization, project, roles } = session ?? {};
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBreadcrumbOpen, setIsBreadcrumbOpen] = useState(false);
  const { isMobile } = useDevice();
  const { pathname } = useLocation();

  const isSuperAdmin =
    roles?.some((role: string) => role.toLowerCase() === 'admin') ?? false;

  const filteredNavItems = filterItems(items, {
    hasOrganization: !!organization,
    hasProject: !!project,
    isSuperAdmin,
    isGithub: project?.repository?.provider === 'github',
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

  const isEditorDrawerVisible =
    getPathWithoutLocale(pathname).startsWith(App_Dashboard_Translate_Path) ||
    getPathWithoutLocale(pathname).startsWith(App_Dashboard_Dictionaries_Path);

  return (
    <Container
      role="banner"
      aria-label={content.bannerAriaLabel.value}
      className="sticky top-0 z-50 flex w-full flex-col gap-3 px-4 pt-4 pb-2"
      roundedSize="none"
    >
      <div className="flex justify-between">
        <div className="flex w-auto items-center gap-2 md:gap-4">
          <Link to={App_Home_Path} label={content.dashboard.value} color="text">
            <Logo className="size-6" />
          </Link>

          {isMobile ? (
            (organization || project) && (
              <div className="relative">
                {isBreadcrumbOpen && (
                  <button
                    type="button"
                    className="fixed inset-0 z-40 cursor-default appearance-none border-none bg-transparent"
                    tabIndex={0}
                    onClick={() => setIsBreadcrumbOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === content.enter.value || e.key === ' ') {
                        setIsBreadcrumbOpen(false);
                      }
                    }}
                    aria-label="Close breadcrumb"
                  />
                )}
                <Button
                  Icon={MoreHorizontal}
                  variant="hoverable"
                  color="text"
                  size="icon-sm"
                  label={content.organizationAndProject.value}
                  onClick={() => setIsBreadcrumbOpen((prev) => !prev)}
                  className="ml-6"
                />
                {isBreadcrumbOpen && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 z-50 min-w-max">
                    <Container
                      className="flex min-h-20 min-w-20 flex-col gap-2 p-2"
                      roundedSize="lg"
                      transparency="sm"
                    >
                      {organization && <OrganizationDropdown />}
                      {project && <ProjectDropdown />}
                      {project && <EnvironmentDropdown />}
                    </Container>
                  </div>
                )}
              </div>
            )
          ) : (
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
              {project && (project.environments?.length ?? 0) > 1 && (
                <>
                  <span className="text-text/70">/</span>
                  <EnvironmentDropdown />
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-1 flex items-center gap-2">
            {project && isEditorDrawerVisible && (
              <Suspense fallback={<div className="size-10" />}>
                <VisualEditorDrawer />
              </Suspense>
            )}
            {project && (
              <Suspense fallback={<div className="size-10" />}>
                <TranslationStatusAside />
              </Suspense>
            )}
            <Suspense fallback={<div className="size-10" />}>
              <DashboardChatBot />
            </Suspense>
          </div>

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
        <nav
          aria-label={content.mobileNavAriaLabel.value}
          className="fixed top-12 left-0 mt-4 flex w-full flex-col gap-2"
        >
          <MaxHeightSmoother isHidden={!isMenuOpen}>
            <Container
              className="h-screen w-full px-10 pt-10"
              roundedSize="none"
              transparency="xs"
              onClick={() => setIsMenuOpen(false)}
              onKeyDown={(e) => {
                if (e.key === content.enter.value || e.key === ' ') {
                  setIsMenuOpen(false);
                }
              }}
              role="button"
              tabIndex={0}
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
