import type { UserAPI } from '@intlayer/backend';
import {
  Avatar,
  Badge,
  BadgeColor,
  BadgeVariant,
} from '@intlayer/design-system';
import type { FC } from 'react';

interface UserHeaderProps {
  user: UserAPI;
  statusLabels: { verified: string; pending: string };
}

export const UserHeader: FC<UserHeaderProps> = ({ user, statusLabels }) => (
  <div className="flex items-center gap-4 rounded-lg border border-neutral bg-card p-6">
    <Avatar
      isLoggedIn={true}
      isLoading={false}
      className="h-16 w-16"
      fullname={user.email}
    />
    <div className="flex-1">
      <h2 className="font-semibold text-neutral text-xl">
        {user.name ?? user.email}
      </h2>
      <p className="text-neutral">{user.email}</p>

      <Badge
        variant={BadgeVariant.OUTLINE}
        color={user.emailVerified ? BadgeColor.TEXT : BadgeColor.DESTRUCTIVE}
      >
        {user.emailVerified ? statusLabels.verified : statusLabels.pending}
      </Badge>
    </div>
  </div>
);
