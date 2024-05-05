import { ChevronRight } from 'lucide-react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import tw from 'twin.macro';

type RedirectionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  label: string;
};

const StyledButton = tw.button`rounded flex gap-2 justify-between items-center p-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none hover:bg-slate-100/30 w-full flex justify-between items-center`;

export const RedirectionButton: FC<RedirectionButtonProps> = ({
  children,
  label,
  ...props
}) => (
  <StyledButton aria-label={label} {...props}>
    {children}
    <ChevronRight />
  </StyledButton>
);
