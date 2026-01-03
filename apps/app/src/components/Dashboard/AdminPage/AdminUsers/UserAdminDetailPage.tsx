import type { FC } from 'react';
import { UserDeleteAction } from '../../UserForm/UserDeleteAction';
import { UserEditForm } from '../../UserForm/UserEditForm';

export const UserAdminDetailPage: FC<{ userId: string }> = ({ userId }) => (
  <div className="flex flex-col gap-8">
    <UserEditForm userId={userId} />
    <UserDeleteAction userId={userId} />
  </div>
);
