import { cn } from '@intlayer/design-system/utils';
import type { FC, HTMLAttributes } from 'react';

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn('animate-pulse rounded-md bg-neutral/10', className)}
    {...props}
  />
);
