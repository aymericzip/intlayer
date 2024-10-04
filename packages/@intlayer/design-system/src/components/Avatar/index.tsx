import { User } from 'lucide-react';
import type { ComponentProps, FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Loader } from '../Loader';

const getCapitals = (name: string): string[] =>
  name
    .split(' ') // split by space
    .map((word) => word[0]) // get first letter of each word
    .filter(Boolean) // remove empty strings
    .map((char) => char.toUpperCase()); // convert to uppercase

export type AvatarProps = ComponentProps<'button'> & {
  src?: string;
  fullname?: string;
  isLoading?: boolean;
  isLoggedIn?: boolean;
};

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

  // eslint-disable-next-line sonarjs/no-unstable-nested-components
  const Container = (props: HTMLAttributes<HTMLElement>) =>
    isClickable ? <button {...props} /> : <div {...props} />;

  return (
    <Container
      className={cn(
        `border-text dark:border-text-dark size-9 rounded-full border-[1.5px] p-[1.5px]`,
        isClickable && `cursor-pointer`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="relative flex size-full flex-row items-center justify-center">
        <div className="bg-text text-text-dark dark:bg-text-dark dark:text-text absolute left-0 top-0 flex size-full flex-col items-center justify-center rounded-full">
          {displayLoader && <Loader className="w-3/4" />}
          {displayAvatar && (
            <img
              className="size-full rounded-full"
              src={src}
              srcSet={src}
              alt={`avatar of ${fullname}`}
              width={59}
              height={59}
            />
          )}
          {displayInitials && (
            <div
              className="flex size-full items-center justify-center gap-[0.1rem] text-sm font-bold"
              aria-label="Initials of user's name"
            >
              {capitals?.map((capital) => <span key={capital}>{capital}</span>)}
            </div>
          )}
          {displayUserIcon && <User size={25} />}
        </div>
      </div>
    </Container>
  );
};
