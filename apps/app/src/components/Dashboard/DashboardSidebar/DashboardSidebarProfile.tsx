import { useUser } from '@intlayer/design-system/api';
import { Avatar } from '@intlayer/design-system/avatar';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { DropDown } from '@intlayer/design-system/drop-down';
import { App_Dashboard_Profile_Path } from '@intlayer/design-system/routes';
import { cn } from '@intlayer/design-system/utils';
import { LogOut, User2 } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Link } from '#components/Link/Link';

export type DashboardSidebarProfileProps = {
  isCollapsed: boolean;
};

export const DashboardSidebarProfile: FC<DashboardSidebarProfileProps> = ({
  isCollapsed,
}) => {
  const { isAuthenticated, user, logout } = useUser();
  const { navigation, goToProfile } = useIntlayer('dashboard-sidebar');

  if (!isAuthenticated) return null;

  const userName = user?.name ?? user?.email ?? '';

  return (
    <div
      className={cn('my-4 flex w-full justify-center', !isCollapsed && 'px-2')}
    >
      {isCollapsed ? (
        <DropDown identifier="profile-sidebar-collapsed">
          <DropDown.Trigger
            identifier="profile-sidebar-collapsed"
            size="icon-sm"
            variant="outline"
            color="text"
            roundedSize="full"
            className="border-none p-0!"
          >
            <Avatar
              fullname={userName}
              isLoggedIn={isAuthenticated}
              src={user?.image ?? undefined}
              size="sm"
            />
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="profile-sidebar-collapsed"
            isFocusable
            isOverable
            align="start"
          >
            <Link
              to={App_Dashboard_Profile_Path}
              label={navigation.viewProfile.label.value}
              variant="hoverable"
            >
              {navigation.viewProfile.text.value}
            </Link>
            <hr className="my-1 border-text/10" />
            <Button
              variant="outline"
              color="text"
              onClick={logout}
              label={navigation.logout.label.value}
              size="sm"
            >
              {navigation.logout.text.value}
            </Button>
          </DropDown.Panel>
        </DropDown>
      ) : (
        <DropDown
          identifier="profile-sidebar-expanded"
          className="w-full min-w-0"
        >
          <DropDown.Trigger
            identifier="profile-sidebar-expanded"
            size="icon-sm"
            variant="hoverable"
            color="neutral"
            className="w-full min-w-0 p-1"
          >
            <Link
              to={App_Dashboard_Profile_Path}
              label={navigation.viewProfile.label.value}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <Avatar
                fullname={userName}
                isLoggedIn={isAuthenticated}
                src={user?.image ?? undefined}
                size="sm"
              />
              <div className="flex min-w-0 flex-1 flex-col text-left">
                <span className="truncate font-semibold text-sm text-text leading-tight">
                  {userName}
                </span>
                {user?.email && (
                  <span className="truncate text-neutral text-xs leading-none">
                    {user.email}
                  </span>
                )}
              </div>
            </Link>
          </DropDown.Trigger>
          <DropDown.Panel
            identifier="profile-sidebar-expanded"
            isFocusable
            isOverable
            align="end"
            yAlign="above"
          >
            <Container
              className="min-w-[100px] gap-2 border border-neutral/10"
              transparency="xs"
              padding="sm"
              roundedSize="2xl"
            >
              <Link
                to={App_Dashboard_Profile_Path}
                variant="hoverable"
                color="text"
                label={navigation.logout.label.value}
                size="sm"
                className="flex w-full flex-row justify-center px-3 py-2"
              >
                <User2 size={10} />
                <span className="ml-2 w-full text-center text-text text-xs">
                  {goToProfile}
                </span>
              </Link>
              <Button
                variant="hoverable"
                color="text"
                Icon={LogOut}
                onClick={logout}
                label={navigation.logout.label.value}
                size="sm"
                className="w-full"
              >
                {navigation.logout.text.value}
              </Button>
            </Container>
          </DropDown.Panel>
        </DropDown>
      )}
    </div>
  );
};
