import type { UserAPI } from '@intlayer/backend';
import { Avatar } from '@intlayer/design-system/avatar';
import { Badge } from '@intlayer/design-system/badge';
import { Container } from '@intlayer/design-system/container';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

interface UserHeaderProps {
  user: UserAPI;
}

export const UserHeader: FC<UserHeaderProps> = ({ user }) => {
  const { statusLabels } = useIntlayer('user-edit-form');

  return (
    <Container
      roundedSize="3xl"
      padding="md"
      border
      borderColor="neutral"
      className="relative flex items-center gap-4"
    >
      <Avatar
        isLoggedIn={true}
        isLoading={false}
        className="h-16 w-16"
        fullname={user.email}
      />
      <div className="flex-1">
        <h2 className="font-semibold text-text text-xl">
          {user.name ?? user.email}
        </h2>
        <p className="text-neutral">{user.email}</p>

        <Badge
          variant="outline"
          className="absolute top-3 right-10"
          color={user.emailVerified ? 'text' : 'error'}
        >
          {user.emailVerified ? statusLabels.verified : statusLabels.pending}
        </Badge>
      </div>
    </Container>
  );
};
