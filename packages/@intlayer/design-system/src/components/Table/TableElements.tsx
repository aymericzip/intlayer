import { cn } from '@utils/cn';
import type { ComponentProps } from 'react';

export const Th = ({ className, ...props }: ComponentProps<'th'>) => (
  <th
    className={cn(
      'border border-neutral/20 border-b border-solid bg-neutral/10 p-4',
      className
    )}
    {...props}
  />
);

export const Tr = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr className={cn('hover:bg-neutral/10', className)} {...props} />
);

export const Td = ({ className, ...props }: ComponentProps<'td'>) => (
  <td
    className={cn(
      'border border-neutral/20 border-b border-solid p-4',
      className
    )}
    {...props}
  />
);

export const Hr = ({ className, ...props }: ComponentProps<'hr'>) => (
  <hr className={cn('mx-6 mt-16 text-neutral', className)} {...props} />
);
