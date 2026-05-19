import type { FC } from 'react';
import { UserDeleteAction } from '../../UserForm/UserDeleteAction';
import { UserEditForm } from '../../UserForm/UserEditForm';

export const UserAdminDetailPage: FC<{ userId: string }> = ({ userId }) => (
  <div className="m-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8">
    <UserEditForm userId={userId} />
    <UserDeleteAction userId={userId} />
  </div>
);
