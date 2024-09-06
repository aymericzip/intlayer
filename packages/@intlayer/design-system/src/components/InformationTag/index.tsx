import type { DetailedHTMLProps, FC } from 'react';
import { cn } from '../../utils/cn';

type CopiedTextInformationProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export const InformationTag: FC<CopiedTextInformationProps> = ({
  className,
  children,
  ...props
}) => (
  <i className={cn('text-xs text-neutral-400', className)} {...props}>
    ⓘ {children}
  </i>
);
