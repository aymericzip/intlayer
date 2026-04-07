import type { UserAPI } from '@intlayer/backend';
import type { FC } from 'react';

interface UserDatesProps {
  user: UserAPI;
  formLabels: any;
}

export const UserDates: FC<UserDatesProps> = ({ user, formLabels }) => (
  <div className="m-3 grid grid-cols-1 gap-4 border-neutral-200 border-t pt-4 md:col-span-2 md:grid-cols-2 dark:border-neutral-700">
    <div>
      <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
        {formLabels.createdAt}
      </div>
      <p className="text-neutral-900 dark:text-neutral-100">
        {user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
      </p>
    </div>
    <div>
      <div className="mb-1 block font-medium text-neutral-600 text-sm dark:text-neutral-400">
        {formLabels.updatedAt}
      </div>
      <p className="text-neutral-900 dark:text-neutral-100">
        {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}
      </p>
    </div>
  </div>
);
