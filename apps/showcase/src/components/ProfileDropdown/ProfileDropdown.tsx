import { Avatar, Button, Container, DropDown } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import type { FC } from 'react';

const DROPDOWN_IDENTIFIER = 'profile';

export const ProfileDropDown: FC = () => {
  const { isAuthenticated, user, logout } = useUser();

  if (!isAuthenticated) return null;

  const userName = user?.name ?? user?.email ?? '';

  return (
    <DropDown identifier={DROPDOWN_IDENTIFIER}>
      <DropDown.Trigger
        identifier={DROPDOWN_IDENTIFIER}
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
        />
      </DropDown.Trigger>
      <DropDown.Panel
        identifier={DROPDOWN_IDENTIFIER}
        isFocusable
        isOverable
        align="end"
      >
        <Container
          className="min-w-[100px] border border-text/10 p-6"
          transparency="xs"
          roundedSize="xl"
        >
          <div className="flex flex-col gap-5">
            {user?.name && (
              <span className="whitespace-nowrap font-bold text-lg">
                {user.name}
              </span>
            )}
            {user?.email && (
              <span className="whitespace-nowrap text-base">{user.email}</span>
            )}
            <Button
              variant="outline"
              color="text"
              onClick={logout}
              label="Logout from showcase"
            >
              Logout
            </Button>
          </div>
        </Container>
      </DropDown.Panel>
    </DropDown>
  );
};
