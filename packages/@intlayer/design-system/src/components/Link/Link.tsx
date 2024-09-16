import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink } from 'lucide-react';
import {
  forwardRef,
  type DetailedHTMLProps,
  type AnchorHTMLAttributes,
} from 'react';

const linkVariants = cva(
  'gap-3 whitespace-nowrap font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          'rounded-lg border-[1.5px] bg-opacity-0 hover:bg-opacity-30 dark:bg-opacity-0',
        default:
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent hover:underline dark:bg-transparent hover:dark:bg-transparent',
        'invisible-link':
          'h-auto justify-start border-inherit bg-transparent px-1 underline-offset-4 hover:bg-transparent dark:bg-transparent hover:dark:bg-transparent',
      },
      color: {
        primary:
          'border-primary dark:border-primary-dark bg-primary dark:bg-primary-dark text-primary dark:text-primary-dark hover:bg-primary-500 hover:dark:bg-primary-300',
        secondary:
          'border-secondary dark:border-secondary-dark bg-secondary dark:bg-secondary-dark text-secondary dark:text-secondary-dark hover:bg-secondary-300 hover:dark:bg-secondary-100',
        destructive:
          'border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive hover:bg-destructive-500 hover:dark:bg-destructive-200',
        neutral:
          'border-neutral dark:border-neutral-dark bg-neutral dark:bg-neutral-dark text-neutral dark:text-neutral-dark hover:bg-neutral-600 hover:dark:bg-neutral-400',
        light: 'border-white bg-white text-white hover:bg-neutral-500',
        dark: 'border-neutral-800 bg-neutral-800 text-neutral-800 hover:bg-neutral-900 dark:hover:bg-neutral-700',
        text: 'border-text dark:border-text-dark bg-text dark:bg-text-dark text-text dark:text-text-dark hover:opacity-80',
        custom: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'primary',
    },
  }
);

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> &
  VariantProps<typeof linkVariants> & {
    label: string;
    isExternalLink?: boolean;
  };

const isExternal = (href = ''): boolean => /^https?:\/\//.test(href);

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = 'default',
      color = 'primary',
      children,
      label,
      className,
      isExternalLink: isExternalLinkProp,
      ...props
    },
    ref
  ) => {
    const isChildrenString = typeof children === 'string';
    const isExternalLink =
      isChildrenString ?? isExternalLinkProp ?? isExternal(props.href);

    return (
      <a
        ref={ref}
        aria-label={label}
        className={linkVariants({
          variant,
          color,
          className,
        })}
        {...props}
      >
        {children}
        {isExternalLink && <ExternalLink className="size-4" />}
      </a>
    );
  }
);

Link.displayName = 'Link';
