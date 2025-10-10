import { type FC } from 'react';
import { UserEditForm } from '../../UserForm/UserEditForm';
import { UserDeleteAction } from '../../UserForm/UserDeleteAction';

export const UserAdminDetailPage: FC<{ userId: string }> = ({ userId }) =>  (
    <div className='flex flex-col gap-8'>
      <UserEditForm userId={userId} />
      <UserDeleteAction userId={userId} />
    </div>
  );

