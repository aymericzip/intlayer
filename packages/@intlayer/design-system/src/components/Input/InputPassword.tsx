'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState, forwardRef } from 'react';
import { Input, type InputProps } from '.';

type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  (props, ref) => {
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    const handlePasswordReveal = () =>
      setIsPasswordRevealed((isPasswordRevealed) => !isPasswordRevealed);

    const EyeIconComponent = isPasswordRevealed ? EyeIcon : EyeOffIcon;

    return (
      <div className="relative">
        <Input
          {...props}
          ref={ref}
          type={isPasswordRevealed ? 'text' : 'password'}
        />

        <button
          data-testid="eye-icon"
          className="absolute right-2 h-full flex-row items-center"
          onClick={handlePasswordReveal}
          aria-label={isPasswordRevealed ? 'Hide password' : 'Show password'}
        >
          <EyeIconComponent
            className="color-slate-700 mr-2 inline-block"
            size={20}
          />
        </button>
      </div>
    );
  }
);

InputPassword.displayName = 'InputPassword';
