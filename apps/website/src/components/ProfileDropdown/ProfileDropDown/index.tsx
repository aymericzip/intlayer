import {
  Avatar,
  type AvatarProps,
  Container,
  DropDown,
} from '@intlayer/design-system';
import type { FC, PropsWithChildren } from 'react';

type ProfileDropDownProps = PropsWithChildren<AvatarProps>;

const DROPDOWN_IDENTIFIER = 'profile';

export const ProfileDropDown: FC<ProfileDropDownProps> = ({
  children,
  ...props
}) => (
  <DropDown identifier={DROPDOWN_IDENTIFIER}>
    <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER} size="icon-sm">
      <Avatar {...props} />
    </DropDown.Trigger>
    <DropDown.Panel
      identifier={DROPDOWN_IDENTIFIER}
      isFocusable
      isOverable
      align="end"
    >
      <Container
        className="min-w-[100px] p-6 shadow-lg"
        transparency="md"
        roundedSize="xl"
      >
        {children}
      </Container>
    </DropDown.Panel>
  </DropDown>
);
