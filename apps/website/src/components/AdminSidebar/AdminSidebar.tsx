'use client';

import {
  Button,
  ClickOutsideDiv,
  Container,
  Input,
  MaxWidthSmoother,
} from '@intlayer/design-system';
import { useDevice } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import {
  ArrowLeftToLine,
  ArrowRightFromLine,
  Building2,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  LayoutDashboard,
  Search,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';

type AdminSidebarProps = {
  className?: string;
};

export const AdminSidebar: FC<AdminSidebarProps> = ({ className }) => {
  const { title, collapseButton, search, navigation } =
    useIntlayer('admin-sidebar');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isManagementExpanded, setIsManagementExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const { isMobile } = useDevice();

  const [isMobileHidden, setIsMobileHidden] = useState(isMobile);
  const navigationItems = [
    {
      key: 'dashboard',
      href: PagesRoutes.Admin_Dashboard,
      icon: LayoutDashboard,
      label: navigation.dashboard.label.value,
      title: navigation.dashboard.title,
    },
    {
      key: 'management',
      href: PagesRoutes.Admin_Management,
      icon: Building2,
      label: navigation.management.label.value,
      title: navigation.management.title,
      isExpandable: true,
      children: [
        {
          key: 'organizations',
          href: PagesRoutes.Admin_Organizations,
          icon: Building2,
          label: navigation.management.organizations.label.value,
          title: navigation.management.organizations.title,
        },
        {
          key: 'projects',
          href: PagesRoutes.Admin_Projects,
          icon: FolderOpen,
          label: navigation.management.projects.label.value,
          title: navigation.management.projects.title,
        },
        {
          key: 'users',
          href: PagesRoutes.Admin_Users,
          icon: Users,
          label: navigation.management.users.label.value,
          title: navigation.management.users.title,
        },
      ],
    },
  ];

  const filteredItems = navigationItems
    .map((item) => {
      if (item.children) {
        const filteredChildren = item.children.filter((child) =>
          child.title.value.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...item, children: filteredChildren };
      }
      return item;
    })
    .filter((item) => {
      if (item.children) {
        return (
          item.children.length > 0 ||
          item.title.value.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return item.title.value.toLowerCase().includes(searchQuery.toLowerCase());
    });

  const isActiveRoute = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const handleManagementToggle = () => {
    setIsManagementExpanded(!isManagementExpanded);
  };

  const handleMobileToggle = () => {
    setIsMobileHidden(!isMobileHidden);
  };

  return (
    <ClickOutsideDiv
      className="top-0 left-0 z-10 flex h-full justify-end max-md:fixed"
      onClickOutSide={() => {
        if (isMobile) {
          setIsMobileHidden(true);
        }
      }}
    >
      <MaxWidthSmoother isHidden={isMobileHidden ?? false} className="h-full">
        <Container
          className={cn(
            'h-full w-64 border-border border-r bg-card transition-all duration-300',
            isCollapsed && 'w-16',
            isMobile && 'fixed top-0 left-0 z-40',
            className
          )}
          roundedSize="none"
          transparency="none"
        >
          <div
            className={cn(
              'flex h-16 items-center justify-between px-4',
              isMobile && 'mt-16'
            )}
          >
            {!isCollapsed && (
              <div className="relative mr-2">
                <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={search.placeholder.value}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  aria-label={search.label.value}
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button
                Icon={isCollapsed ? ArrowRightFromLine : ArrowLeftToLine}
                size="icon-md"
                variant="hoverable"
                color="text"
                label={collapseButton.label.value}
                onClick={() => {
                  if (isMobile) {
                    handleMobileToggle();
                  }
                  setIsCollapsed(!isCollapsed);
                }}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul>
              {filteredItems.map((item) => (
                <li key={item.key}>
                  {item.isExpandable ? (
                    <>
                      <button
                        onClick={handleManagementToggle}
                        type="button"
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-current/10',
                          !isCollapsed && 'justify-between'
                        )}
                        aria-label={item.label}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 flex-shrink-0" />
                          {!isCollapsed && <span>{item.title}</span>}
                        </div>
                        {!isCollapsed &&
                          (isManagementExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </button>
                      {!isCollapsed &&
                        isManagementExpanded &&
                        item.children && (
                          <ul className="ml-4 space-y-0.5">
                            {item.children.map((child) => (
                              <li key={child.key}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-current/10',
                                    isActiveRoute(child.href) && 'bg-current/10'
                                  )}
                                  aria-label={child.label}
                                >
                                  <child.icon className="h-4 w-4 flex-shrink-0" />
                                  <span>{child.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-current/10',
                        isActiveRoute(item.href) && 'bg-current/10'
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </MaxWidthSmoother>
    </ClickOutsideDiv>
  );
};
