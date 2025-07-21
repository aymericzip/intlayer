import { useUser } from '@intlayer/design-system/hooks';
import type { FC } from 'react';
import { ProfilePanel } from '../Auth/ProfilePanel';
import { ProfileDropDown as ProfileDropDownUI } from './ProfileDropDown/index';

export const ProfileDropDown: FC = () => {
  const { isAuthenticated, user } = useUser();

  const userName = user?.name ?? user?.email ?? '';

  return (
    isAuthenticated && (
      <ProfileDropDownUI fullname={userName} isLoggedIn={isAuthenticated}>
        <ProfilePanel />
      </ProfileDropDownUI>
    )
  );
};
