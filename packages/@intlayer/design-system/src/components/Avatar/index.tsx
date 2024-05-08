import { User } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Loader } from '../Loader';

const getCapitals = (name: string): string[] =>
  name
    .split(' ') // split by space
    .map((word) => word[0]) // get first letter of each word
    .filter(Boolean) // remove empty strings
    .map((char) => char.toUpperCase()); // convert to uppercase

export type AvatarProps = ComponentProps<'div'> & {
  src?: string;
  fullname?: string;
  isLoading?: boolean;
  isLoggedIn?: boolean;
};

const StyledRoundedContainer = tw.div`size-10 rounded-full bg-neutral-100 p-[0.15rem]`;
const StyledRoundedBumble = tw.div`bg-primary flex size-full flex-col items-center justify-center rounded-full`;
const StyledLoader = styled(Loader)(() => tw`w-3/4`);
const StyledAvatar = tw.img`size-full rounded-full`;
const StyledInitialsContainer = tw.div`text-sm text-text flex size-full items-center justify-center gap-[0.1rem] font-bold`;
const StyledUserPictogram = styled(User)(() => tw`text-white`);

export const Avatar: FC<AvatarProps> = ({
  fullname,
  className,
  isLoading,
  isLoggedIn,
  src,
  ...props
}) => {
  const isImageDefined = Boolean(src);
  const isNameDefined = Boolean((fullname ?? '').length > 0);
  const capitals = fullname ? getCapitals(fullname) : undefined;

  const displayLoader = isLoading;
  const displayAvatar =
    isLoggedIn && !displayLoader && !displayLoader && isImageDefined;
  const displayInitials =
    isLoggedIn && !displayLoader && !displayAvatar && isNameDefined;
  const displayUserIcon =
    isLoggedIn && !displayLoader && !displayAvatar && !displayInitials;

  return (
    <StyledRoundedContainer {...props}>
      <StyledRoundedBumble>
        {displayLoader && <StyledLoader />}
        {displayAvatar && (
          <StyledAvatar
            src={src}
            srcSet={src}
            alt={`avatar of ${fullname}`}
            width={59}
            height={59}
          />
        )}
        {displayInitials && (
          <StyledInitialsContainer aria-label="Initials of user's name">
            {capitals?.map((capital) => <span key={capital}>{capital}</span>)}
          </StyledInitialsContainer>
        )}
        {displayUserIcon && <StyledUserPictogram size={25} />}
      </StyledRoundedBumble>
    </StyledRoundedContainer>
  );
};
