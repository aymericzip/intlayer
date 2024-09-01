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

const StyledRoundedContainer = styled.div<{ $isClickable: boolean }>(
  ({ $isClickable }) => [
    tw`size-9 rounded-full border-text dark:border-text-dark border-[1.5px] p-[1.5px]`,
    $isClickable && tw`cursor-pointer`,
  ]
);
const StyledWrapper = tw.div`size-full relative flex flex-row items-center justify-center`;
const StyledRoundedBumble = tw.div`absolute top-0 left-0 bg-text dark:bg-text-dark text-text-dark dark:text-text flex size-full flex-col items-center justify-center rounded-full`;

const StyledLoader = tw(Loader)`w-3/4`;
const StyledAvatar = tw.img`size-full rounded-full`;
const StyledInitialsContainer = tw.div`text-sm flex size-full items-center justify-center gap-[0.1rem] font-bold`;
const StyledUserPictogram = tw(User)``;

export const Avatar: FC<AvatarProps> = ({
  fullname,
  className,
  isLoading,
  isLoggedIn,
  src,
  onClick,
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

  const isClickable = onClick !== undefined;

  return (
    <StyledRoundedContainer
      onClick={onClick}
      {...props}
      $isClickable={isClickable}
    >
      <StyledWrapper>
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
      </StyledWrapper>
    </StyledRoundedContainer>
  );
};
