import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { Link, type LinkProps } from '~/components/Link/Link';

type ProductActionProps = Omit<
  LinkProps,
  'variant' | 'color' | 'size' | 'roundedSize'
> & {
  /** Filled button for the main action, outlined otherwise. */
  isPrimary?: boolean;
};

/** Pill action button shared by the product landing pages, never wrapping. */
export const ProductAction: FC<ProductActionProps> = ({
  isPrimary = false,
  className,
  ...linkProps
}) => (
  <Link
    {...linkProps}
    variant={isPrimary ? 'button' : 'button-outlined'}
    color="text"
    size="lg"
    roundedSize="full"
    className={cn('px-6 text-base whitespace-nowrap', className)}
  />
);
