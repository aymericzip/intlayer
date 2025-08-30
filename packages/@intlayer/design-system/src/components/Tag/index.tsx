import { type VariantProps, cva } from 'class-variance-authority';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

type TagProps = PropsWithChildren<VariantProps<typeof containerVariants>> &
  HTMLAttributes<HTMLDivElement>;

export enum TagRoundedSize {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = '2xl',
  XXXL = '3xl',
  FULL = 'full',
}

export enum TagColor {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  NEUTRAL = 'neutral',
  TEXT = 'text',
}

export enum TagSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum TagBorder {
  NONE = 'none',
  WITH = 'with',
}

export enum TagBackground {
  NONE = 'none',
  WITH = 'with',
}

const containerVariants = cva('backdrop-blur w-fit', {
  variants: {
    roundedSize: {
      [`${TagRoundedSize.NONE}`]: 'rounded-none',
      [`${TagRoundedSize.SM}`]: 'rounded-sm',
      [`${TagRoundedSize.MD}`]: 'rounded-md',
      [`${TagRoundedSize.LG}`]: 'rounded-lg',
      [`${TagRoundedSize.XL}`]: 'rounded-xl',
      [`${TagRoundedSize.XXL}`]: 'rounded-2xl',
      [`${TagRoundedSize.XXXL}`]: 'rounded-3xl',
      [`${TagRoundedSize.FULL}`]: 'rounded-full',
    },
    color: {
      [`${TagColor.SUCCESS}`]: 'bg-success/10 border-success text-success ',
      [`${TagColor.ERROR}`]: 'bg-error/10 border-error text-error',
      [`${TagColor.WARNING}`]: 'bg-warning/10 border-warning text-warning',
      [`${TagColor.NEUTRAL}`]: 'bg-neutral/10 /10 border-neutral text-neutral ',
      [`${TagColor.TEXT}`]: 'bg-text/10  border-text  text-text',
    },
    size: {
      [`${TagSize.XS}`]: 'py-0.5 px-2 text-xs border-[1.2px]',
      [`${TagSize.SM}`]: 'py-0.5 px-2 text-sm border-[1.5px]',
      [`${TagSize.MD}`]: 'py-1 px-2 text-base border-2',
      [`${TagSize.LG}`]: 'py-2 px-3 text-lg border-2',
      [`${TagSize.XL}`]: 'py-4 px-5 text-xl border-2',
    },
    border: {
      [`${TagBorder.NONE}`]: 'border-none',
      [`${TagBorder.WITH}`]: 'border-text  border-[1.5px]',
    },
    background: {
      [`${TagBackground.NONE}`]: 'bg-none',
      [`${TagBackground.WITH}`]: '',
    },
  },

  defaultVariants: {
    roundedSize: TagRoundedSize.FULL,
    border: TagBorder.NONE,
    color: TagColor.TEXT,
    size: TagSize.MD,
  },
});

export const Tag: FC<TagProps> = ({
  children,
  color,
  roundedSize,
  size,
  border,
  background,
  className,
  ...props
}) => {
  return (
    <div
      className={containerVariants({
        color,
        roundedSize,
        size,
        border,
        background,
        className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
