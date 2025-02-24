'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type FC, useState, type MouseEventHandler } from 'react';
import { Input, type InputProps } from './Input';

type InputPasswordProps = Omit<InputProps, 'type'>;

export const InputPassword: FC<InputPasswordProps> = (props) => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

  const handlePasswordReveal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPasswordRevealed((isPasswordRevealed) => !isPasswordRevealed);
  };

  const EyeIconComponent = isPasswordRevealed ? EyeIcon : EyeOffIcon;

  return (
    <div className="relative">
      <Input {...props} type={isPasswordRevealed ? 'text' : 'password'} />

      <button
        data-testid="eye-icon"
        className="absolute right-2 h-full flex-row items-center"
        onClick={handlePasswordReveal}
        aria-label={isPasswordRevealed ? 'Hide password' : 'Show password'}
      >
        <EyeIconComponent
          className="text-neutral mr-2 inline-block"
          size={20}
        />
      </button>
    </div>
  );
};
