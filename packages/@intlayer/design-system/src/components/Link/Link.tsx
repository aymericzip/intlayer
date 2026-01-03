import { getLocalizedUrl } from '@intlayer/core';
import type { LocalesValues } from '@intlayer/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { ExternalLink, MoveRight } from 'lucide-react';
import {
  type AnchorHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  isValidElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Visual style variants for Link component
 */
export enum LinkVariant {
  DEFAULT = 'default',
  INVISIBLE_LINK = 'invisible-link',
  BUTTON = 'button',
  BUTTON_OUTLINED = 'button-outlined',
  HOVERABLE = 'hoverable',
}

/**
 * Color theme variants for Link component
 */
export enum LinkColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
  TEXT_INVERSE = 'text-inverse',
  ERROR = 'error',
  SUCCESS = 'success',
  CUSTOM = 'custom',
}

export enum LinkRoundedSize {
  NONE = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  TWO_XL = '2xl',
  THREE_XL = '3xl',
  FULL = 'full',
}

export enum LinkSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  CUSTOM = 'custom',
}

export enum LinkUnderlined {
  DEFAULT = 'default',
  TRUE = 'true',
  FALSE = 'false',
}

export const linkVariants = cva(
  'gap-3 transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        [`${LinkVariant.DEFAULT}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0 hover:underline',
        [`${LinkVariant.INVISIBLE_LINK}`]:
          'h-auto justify-start border-inherit bg-current/0 px-1 underline-offset-4 hover:bg-current/0',

        [`${LinkVariant.BUTTON}`]:
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full bg-current text-center font-medium text-text ring-0 *:text-text-opposite hover:bg-current/90 hover:ring-5 aria-selected:ring-5',

        [`${LinkVariant.BUTTON_OUTLINED}`]:
          'relative flex cursor-pointer flex-row items-center justify-center gap-2 rounded-full border-[1.3px] border-current text-center font-medium text-text ring-0 *:text-text hover:bg-current/20 hover:ring-5 aria-selected:ring-5',

        [`${LinkVariant.HOVERABLE}`]:
          'block rounded-lg border-none bg-current/0 hover:bg-current/10 aria-[current]:bg-current/5',
      },
      roundedSize: {
        [`${LinkRoundedSize.NONE}`]: 'rounded-none',
        [`${LinkRoundedSize.SM}`]:
          'rounded-lg [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-xl',
        [`${LinkRoundedSize.MD}`]:
          'rounded-xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-2xl',
        [`${LinkRoundedSize.LG}`]:
          'rounded-2xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-3xl',
        [`${LinkRoundedSize.XL}`]:
          'rounded-3xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-4xl',
        [`${LinkRoundedSize.TWO_XL}`]:
          'rounded-4xl [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[2.5rem]',
        [`${LinkRoundedSize.THREE_XL}`]:
          'rounded-[2.5rem] [corner-shape:squircle] supports-[corner-shape:squircle]:rounded-[3rem]',
        [`${LinkRoundedSize.FULL}`]: 'rounded-full',
      },
      color: {
        [`${LinkColor.PRIMARY}`]: 'text-primary',
        [`${LinkColor.SECONDARY}`]: 'text-secondary',
        [`${LinkColor.DESTRUCTIVE}`]: 'text-destructive',
        [`${LinkColor.NEUTRAL}`]: 'text-neutral',
        [`${LinkColor.LIGHT}`]: 'text-white',
        [`${LinkColor.DARK}`]: 'text-neutral-800',
        [`${LinkColor.TEXT}`]: 'text-text',
        [`${LinkColor.TEXT_INVERSE}`]: 'text-text-opposite',
        [`${LinkColor.ERROR}`]: 'text-error',
        [`${LinkColor.SUCCESS}`]: 'text-success',
        [`${LinkColor.CUSTOM}`]: '',
      },
      size: {
        [`${LinkSize.SM}`]: 'text-sm',
        [`${LinkSize.MD}`]: 'text-base',
        [`${LinkSize.LG}`]: 'text-lg',
        [`${LinkSize.XL}`]: 'text-xl',
        [`${LinkSize.CUSTOM}`]: '',
      },
      underlined: {
        [LinkUnderlined.DEFAULT]: '',
        [LinkUnderlined.TRUE]: 'underline',
        [LinkUnderlined.FALSE]: 'no-underline',
      },
    },
    // Compound variants handle height and padding
    compoundVariants: [
      // ---------------------------------------------------------
      // FIX START: Handle Contrast for TEXT_INVERSE
      // ---------------------------------------------------------
      {
        // For Filled Buttons using Inverse Color (e.g. White button):
        // The background is 'text-opposite', so the text inside must be 'text-text' (Dark)
        variant: LinkVariant.BUTTON,
        color: LinkColor.TEXT_INVERSE,
        class: 'text-text *:text-text',
      },
      {
        // For Outlined Buttons using Inverse Color (e.g. White border on Dark BG):
        // The border is 'text-opposite', so the text inside must also be 'text-opposite' (White)
        variant: LinkVariant.BUTTON_OUTLINED,
        color: LinkColor.TEXT_INVERSE,
        class: 'text-text-opposite *:text-text-opposite',
      },
      // ---------------------------------------------------------
      // FIX END
      // ---------------------------------------------------------

      // Min height and padding for button variants
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.SM,
        class: 'min-h-7 px-3 max-md:py-1',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.MD,
        class: 'min-h-8 px-6 max-md:py-2',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.LG,
        class: 'min-h-10 px-8 max-md:py-3',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        size: LinkSize.XL,
        class: 'min-h-11 px-10 max-md:py-4',
      },
      // Ring color variants
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.PRIMARY,
        class: 'ring-primary/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.SECONDARY,
        class: 'ring-secondary/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.DESTRUCTIVE,
        class: 'ring-destructive/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.NEUTRAL,
        class: 'ring-neutral/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.LIGHT,
        class: 'ring-white/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.DARK,
        class: 'ring-neutral-800/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.TEXT,
        class: 'ring-text/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.TEXT_INVERSE,
        class: 'ring-text-opposite/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.ERROR,
        class: 'ring-error/20',
      },
      {
        variant: [LinkVariant.BUTTON, LinkVariant.BUTTON_OUTLINED],
        color: LinkColor.SUCCESS,
        class: 'ring-success/20',
      },
    ],

    defaultVariants: {
      variant: LinkVariant.DEFAULT,
      color: LinkColor.PRIMARY,
      roundedSize: LinkRoundedSize.MD,
      underlined: LinkUnderlined.DEFAULT,
      size: LinkSize.MD,
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
    isPageSection?: boolean;
    isActive?: boolean;
    locale?: LocalesValues;
  };

export const checkIsExternalLink = ({
  href,
  isExternalLink: isExternalLinkProp,
}: LinkProps): boolean => {
  const isValidHref = typeof href === 'string' && href.trim() !== '';
  const isExternalLink =
    isExternalLinkProp === true ||
    (typeof isExternalLinkProp === 'undefined' &&
      isValidHref &&
      /^https?:\/\//.test(href));

  return isExternalLink;
};

export const isTextChildren = (children: ReactNode): boolean => {
  if (typeof children === 'string' || typeof children === 'number') {
    return true;
  }
  if (Array.isArray(children)) {
    return children.every(isTextChildren);
  }
  if (isValidElement(children)) {
    return isTextChildren(
      (children.props as { children?: ReactNode }).children
    );
  }
  return false;
};

export const Link: FC<LinkProps> = (props) => {
  const {
    variant = LinkVariant.DEFAULT,
    color = LinkColor.PRIMARY,
    roundedSize,
    children,
    label,
    className,
    isActive,
    underlined,
    locale,
    size,
    isExternalLink: isExternalLinkProp,
    isPageSection: isPageSectionProp,
    href: hrefProp,
    ...otherProps
  } = props;

  const isExternalLink = isExternalLinkProp ?? checkIsExternalLink(props);
  const isPageSection = isPageSectionProp ?? hrefProp?.startsWith('#') ?? false;

  const isChildrenString = isTextChildren(children);
  const isButton =
    variant === LinkVariant.BUTTON || variant === LinkVariant.BUTTON_OUTLINED;

  const rel = isExternalLink ? 'noopener noreferrer nofollow' : undefined;

  const target = isExternalLink ? '_blank' : '_self';

  const href =
    locale && hrefProp && !isExternalLink && !isPageSection
      ? getLocalizedUrl(hrefProp, locale)
      : hrefProp;

  return (
    <a
      href={href}
      aria-label={label}
      rel={rel}
      target={target}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        linkVariants({
          variant,
          color,
          roundedSize,
          underlined,
          size,
          className,
        })
      )}
      {...otherProps}
    >
      {isButton && isChildrenString ? <span>{children}</span> : children}

      {isExternalLink && isChildrenString && (
        <ExternalLink className="ml-2 inline-block size-4" />
      )}
      {isPageSection && <MoveRight className="ml-2 inline-block size-4" />}
    </a>
  );
};
