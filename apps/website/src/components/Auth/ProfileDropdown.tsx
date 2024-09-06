import {
  ProfileDropDown as ProfileDropDownUI,
  useUser,
} from '@intlayer/design-system';
import type { FC } from 'react';
import { ProfilePanel } from './ProfilePanel';

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
