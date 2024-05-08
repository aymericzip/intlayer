import { Container } from 'lucide-react';
import type { FC, PropsWithChildren } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { type AvatarProps, Avatar } from '../Avatar';
import { DropDown } from '../DropDown';

type ProfileDropDownProps = PropsWithChildren<AvatarProps>;

const DROPDOWN_IDENTIFIER = 'profile';

const StyledContainer = styled(Container)(() => tw`min-w-[100px] p-6`);

export const ProfileDropDown: FC<ProfileDropDownProps> = ({
  children,
  ...props
}) => (
  <DropDown.Trigger identifier={DROPDOWN_IDENTIFIER}>
    <Avatar {...props} />
    <DropDown identifier={DROPDOWN_IDENTIFIER}>
      <StyledContainer>{children}</StyledContainer>
    </DropDown>
  </DropDown.Trigger>
);
