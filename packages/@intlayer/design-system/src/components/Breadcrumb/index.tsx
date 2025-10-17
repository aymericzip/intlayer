'use client';

import type { LocalesValues } from '@intlayer/types';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRightIcon } from 'lucide-react';
import { type FC, Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { useIntlayer } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { Button, type ButtonProps, ButtonVariant } from '../Button';
import { Link, LinkColor } from '../Link';

/**
 * Props for LinkLink sub-component that renders breadcrumb items as links
 */
type LinkLinkProps = {
  /**
   * Position of the breadcrumb item in the list (1-based index)
   */
  position: number;
  /**
   * Locale for internationalization
   */
  locale?: LocalesValues;
  /**
   * URL to navigate to
   */
  href?: string;
  /**
   * Link color
   */
  color?: LinkColor | `${LinkColor}`;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Children content
   */
  children?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
} & Omit<
  HTMLAttributes<HTMLAnchorElement>,
  'href' | 'onClick' | 'color' | 'children' | 'className'
>;

/**
 * Breadcrumb variant styles using class-variance-authority
 */
const breadcrumbVariants = cva('flex flex-row flex-wrap items-center text-sm', {
  variants: {
    size: {
      small: 'gap-1 text-xs',
      medium: 'gap-2 text-sm',
      large: 'gap-3 text-base',
    },
    spacing: {
      compact: 'gap-1',
      normal: 'gap-2',
      loose: 'gap-4',
    },
  },
  defaultVariants: {
    size: 'medium',
    spacing: 'normal',
  },
});

/**
 * LinkLink sub-component for breadcrumb items that navigate to other pages
 */
const LinkLink: FC<LinkLinkProps> = ({
  href,
  lang,
  children,
  onClick,
  color,
  position,
  locale,
  className,
  ...props
}) => {
  const { linkLabel } = useIntlayer('breadcrumb');

  return (
    <>
      <Link
        href={href}
        locale={locale}
        color={color}
        onClick={onClick}
        itemProp="item"
        isExternalLink={false}
        itemScope
        itemType="https://schema.org/WebPage"
        {...props}
        label={`${linkLabel} ${children}`}
        itemID={href}
      >
        <span itemProp="name">{children}</span>
      </Link>
      <meta itemProp="position" content={position.toString()} />
    </>
  );
};

/**
 * Props for ButtonLink sub-component that renders breadcrumb items as interactive buttons
 */
type ButtonButtonProps = {
  /**
   * Text content for the breadcrumb button
   */
  children: string;
  /**
   * Position of the breadcrumb item in the list (1-based index)
   */
  position: number;
} & Omit<ButtonProps, 'children' | 'label'>;

/**
 * ButtonLink sub-component for breadcrumb items with click handlers
 */
const ButtonLink: FC<ButtonButtonProps> = ({
  children: text,
  onClick,
  color,
  position,
  className,
  ...props
}) => {
  const { linkLabel } = useIntlayer('breadcrumb');

  return (
    <>
      <Button
        onClick={onClick}
        variant={ButtonVariant.LINK}
        label={`${linkLabel} ${text}`}
        color={color}
        itemProp="item"
        {...props}
      >
        <span itemProp="name">{text}</span>
      </Button>
      <meta itemProp="position" content={position.toString()} />
    </>
  );
};

/**
 * Props for Span sub-component that renders static breadcrumb text
 */
type SpanProps = {
  /**
   * Text content for the static breadcrumb item
   */
  children: string;
  /**
   * Position of the breadcrumb item in the list (1-based index)
   */
  position: number;
} & HTMLAttributes<HTMLSpanElement>;

/**
 * Span sub-component for static breadcrumb text items
 */
const Span: FC<SpanProps> = ({ children, position, className, ...props }) => (
  <span
    itemProp="item"
    className={cn(
      'inline-flex items-center',
      'font-medium text-neutral-700',
      'transition-colors duration-200',
      className
    )}
  >
    <span itemProp="name" {...props}>
      {children}
    </span>
    <meta itemProp="position" content={position.toString()} />
  </span>
);

/**
 * Detailed breadcrumb link configuration with optional href or onClick
 */
type DetailedBreadcrumbLink = {
  /**
   * URL to navigate to when the breadcrumb item is clicked
   */
  href?: string;
  /**
   * Text content to display for this breadcrumb item
   */
  text: string;
  /**
   * Custom click handler function for interactive breadcrumb items
   */
  onClick?: () => void;
};

/**
 * Union type representing different breadcrumb item configurations:
 * - string: Simple text breadcrumb item
 * - DetailedBreadcrumbLink: Object with href, text, and/or onClick properties
 */
export type BreadcrumbLink = string | DetailedBreadcrumbLink;

export type BreadcrumbProps = {
  /**
   * Array of breadcrumb items
   */
  links: BreadcrumbLink[];
  /**
   * Color scheme for breadcrumb links
   * @default LinkColor.TEXT
   */
  color?: LinkColor | `${LinkColor}`;
  /**
   * Locale for internationalization
   */
  locale?: LocalesValues;
  /**
   * Element type for ARIA current attribute
   * @default 'page'
   */
  elementType?: 'page' | 'location';
  /**
   * Custom separator between breadcrumb items
   * @default ChevronRightIcon
   */
  separator?: ReactNode;
  /**
   * ARIA label for breadcrumb navigation
   * @default 'breadcrumb'
   */
  ariaLabel?: string;
  /**
   * Whether to include structured data markup
   * @default true
   */
  includeStructuredData?: boolean;
  /**
   * Maximum number of breadcrumb items to show before truncation
   */
  maxItems?: number;
} & VariantProps<typeof breadcrumbVariants> &
  HTMLAttributes<HTMLOListElement>;

/**
 * Breadcrumb component providing navigational context with accessibility features
 *
 * Features:
 * - Supports links, buttons, and static text elements
 * - Full keyboard navigation support
 * - ARIA attributes for screen readers
 * - Schema.org structured data for SEO
 * - Customizable separators and styling
 * - Internationalization support
 * - Responsive design variants
 *
 * @example
 * ```tsx
 * <Breadcrumb
 *   links={[
 *     'Home',
 *     { href: '/products', text: 'Products' },
 *     { onClick: handleCategory, text: 'Electronics' },
 *     'Smartphones'
 *   ]}
 *   size="medium"
 *   ariaLabel="Product navigation"
 * />
 * ```
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  links,
  className,
  color = LinkColor.TEXT,
  locale,
  elementType = 'page',
  separator = <ChevronRightIcon size={10} />,
  ariaLabel = 'breadcrumb',
  includeStructuredData = true,
  maxItems,
  size,
  spacing,
  ...props
}) => {
  const displayLinks =
    maxItems && links.length > maxItems
      ? [...links.slice(0, 1), '...', ...links.slice(-(maxItems - 2))]
      : links;

  return (
    <nav aria-label={ariaLabel}>
      <ol
        className={cn(breadcrumbVariants({ size, spacing }), className)}
        {...(includeStructuredData && {
          itemScope: true,
          itemType: 'http://schema.org/BreadcrumbList',
        })}
        {...props}
      >
        {displayLinks.map((link, index) => {
          const isLastLink = index === displayLinks.length - 1;
          const isLink =
            typeof link === 'object' && typeof link.href === 'string';
          const isButton =
            typeof link === 'object' && typeof link.onClick === 'function';
          const isActive = index === displayLinks.length - 1;
          const ariaCurrent = isActive ? elementType : undefined;
          const isTruncated = link === '...';

          const text = (link as DetailedBreadcrumbLink).text ?? link;

          if (isTruncated) {
            return (
              <Fragment key={`truncated-${index}`}>
                <li className="flex items-center" aria-hidden="true">
                  <span className="text-neutral-500">…</span>
                </li>
                {!isLastLink && (
                  <li aria-hidden="true" className="flex items-center">
                    {separator}
                  </li>
                )}
              </Fragment>
            );
          }

          let section = (
            <Span
              key={text}
              position={index + 1}
              aria-current={ariaCurrent}
              className={cn(
                'transition-colors duration-200',
                isActive && 'text-neutral-900'
              )}
            >
              {text}
            </Span>
          );

          if (isLink) {
            section = (
              <LinkLink
                key={text}
                href={link.href!}
                color={color}
                position={index + 1}
                locale={locale}
                aria-current={ariaCurrent}
                className={cn(isActive && 'cursor-default text-neutral-900')}
              >
                {text}
              </LinkLink>
            );
          } else if (isButton) {
            section = (
              <ButtonLink
                key={text}
                onClick={link.onClick!}
                color={color}
                position={index + 1}
                aria-current={ariaCurrent}
                className={cn(isActive && 'cursor-default text-neutral-900')}
              >
                {text}
              </ButtonLink>
            );
          }

          const listElement = (
            <li
              {...(includeStructuredData && {
                itemProp: 'itemListElement',
                itemScope: true,
                itemType: 'https://schema.org/ListItem',
              })}
              key={text}
              className="flex items-center"
            >
              {section}
            </li>
          );

          if (isLastLink) {
            return listElement;
          }

          return (
            <Fragment key={text}>
              {listElement}
              <li aria-hidden="true" className="flex items-center">
                {separator}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
