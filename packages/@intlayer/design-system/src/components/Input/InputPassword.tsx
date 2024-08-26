'use client';

import {
  EyeIcon,
  EyeOffIcon,
  type LucideProps,
  type LucideIcon,
} from 'lucide-react';
import { useState, forwardRef, type MouseEventHandler, type FC } from 'react';
import tw from 'twin.macro';
import { Input, type InputProps } from '.';

type InputPasswordProps = Omit<InputProps, 'type'>;

const StyledButton = tw.button`absolute right-2 h-full flex-row items-center`;

type EyeIconComponentProps = {
  Icon: LucideIcon;
} & LucideProps;

const EyeIconComponent: FC<EyeIconComponentProps> = ({ Icon, ...props }) => (
  <Icon {...props} />
);

const StyledEyeIconComponent = tw(
  EyeIconComponent
)`text-neutral dark:text-neutral-dark mr-2 inline-block`;

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    const handlePasswordReveal: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsPasswordRevealed((isPasswordRevealed) => !isPasswordRevealed);
    };

    const EyeIconComponent = isPasswordRevealed ? EyeIcon : EyeOffIcon;

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={isPasswordRevealed ? 'text' : 'password'}
        />

        <StyledButton
          data-testid="eye-icon"
          className="absolute right-2 h-full flex-row items-center"
          onClick={handlePasswordReveal}
          aria-label={isPasswordRevealed ? 'Hide password' : 'Show password'}
        >
          <StyledEyeIconComponent Icon={EyeIconComponent} size={20} />
        </StyledButton>
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';
