import type { FC, PropsWithChildren } from 'react';
import { type AvatarProps, Avatar } from '../Avatar';
import { Container } from '../Container';
import { DropDown } from '../DropDown';

type ProfileDropDownProps = PropsWithChildren<AvatarProps>;

const DROPDOWN_IDENTIFIER = 'profile';

export const ProfileDropDown: FC<ProfileDropDownProps> = ({
  children,
  ...props
}) => (
  <DropDown identifier={DROPDOWN_IDENTIFIER}>
    <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER}>
      <Avatar {...props} />
    </DropDown.Trigger>
    <DropDown.Panel identifier={DROPDOWN_IDENTIFIER} isFocusable isOverable>
      <Container className="min-w-[100px] p-6">{children}</Container>
    </DropDown.Panel>
  </DropDown>
);
