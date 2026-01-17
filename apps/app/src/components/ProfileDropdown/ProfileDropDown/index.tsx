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
    <DropDown.Trigger
      identifier={DROPDOWN_IDENTIFIER}
      size="icon-sm"
      variant="outline"
      color="text"
      roundedSize="full"
      className="border-none p-0!"
    >
      <Avatar {...props} />
    </DropDown.Trigger>
    <DropDown.Panel
      identifier={DROPDOWN_IDENTIFIER}
      isFocusable
      isOverable
      align="end"
    >
      <Container
        className="min-w-[100px] border border-text/10 p-6"
        transparency="xs"
        roundedSize="xl"
      >
        {children}
      </Container>
    </DropDown.Panel>
  </DropDown>
);
