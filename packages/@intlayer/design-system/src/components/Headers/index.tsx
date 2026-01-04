import { cn } from '@utils/cn';
import type { FC, HTMLAttributes, JSX, MouseEvent } from 'react';

const styledHeading = `relative scroll-mb-8 scroll-mt-[30vh] scroll-p-8`;
const styledAfter = `after:content-['#'] after:scale-75 after:px-6 after:text-neutral after:absolute after:top-0 after:h-full after:-left-12 after:absolute after:to-neutral after:md:opacity-0 after:transition-opacity hover:after:opacity-80 after:duration-200 after:delay-100`;

/**
 * Styled H1 Component
 *
 * Primary heading component for page titles and main content headers.
 * Does not include clickable anchor functionality.
 */
const StyledH1: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => <h1 className={cn('font-bold text-2xl', className)} {...props} />;

/**
 * Styled H2 Component
 *
 * Secondary heading component with anchor link functionality when wrapped.
 * Used for major section headers in content.
 */
const StyledH2: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2
    className={cn('mb-2 font-bold text-2xl', styledHeading, className)}
    {...props}
  />
);

/**
 * Styled H3 Component
 *
 * Tertiary heading component with anchor link functionality when wrapped.
 * Used for subsection headers in content.
 */
const StyledH3: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn('mb-2 font-bold text-xl', styledHeading, className)}
    {...props}
  />
);

/**
 * Styled H4 Component
 *
 * Quaternary heading component with anchor link functionality when wrapped.
 * Used for minor section headers in content.
 */
const StyledH4: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h4
    className={cn('font-bold text-lg', styledHeading, className)}
    {...props}
  />
);

/**
 * Styled H5 Component
 *
 * Fifth-level heading component with anchor link functionality when wrapped.
 * Used for detailed subsection headers in content.
 */
const StyledH5: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h5
    className={cn('font-bold text-base', styledHeading, className)}
    {...props}
  />
);

const StyledH6: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h6
    className={cn('ml-3 font-bold text-base', styledHeading, className)}
    {...props}
  />
);

/**
 * Props for heading components
 */
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  /**
   * Whether the heading should be clickable with anchor link functionality.
   * Enables copy-to-clipboard URL behavior and smooth scrolling.
   * @default false (for H1), true (for H2-H5)
   */
  isClickable?: boolean;
};

/**
 * Internal props for the HeadingWrapper component
 */
interface HeadingGlobalProps extends HeadingProps {
  /** The styled heading component to render */
  H: FC<HTMLAttributes<HTMLHeadingElement>>;
}

type HeadingType = (props: HeadingGlobalProps) => JSX.Element;

/**
 * Utility function to generate URL-friendly ID from heading text
 * @param children - The heading text content
 * @returns URL-friendly string for use as element ID
 */
const getId = (children: string) =>
  String(children)
    // replace accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // replace spaces
    .replace(/\s+/g, '-')
    .toLowerCase();

/**
 * Utility function to smoothly scroll to an element by ID
 * @param id - The element ID to scroll to
 */
const scrollToHash = (id: string) => {
  const element = document.getElementById(id);
  const offset = 150;
  const y =
    (element?.getBoundingClientRect()?.top ?? 0) + window.scrollY - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
};

/**
 * Utility function to detect if the pseudo-element (#) after the heading was clicked
 * @param parentElem - The heading element
 * @param e - Mouse event
 * @returns Whether the after pseudo-element was clicked
 */
const afterClick = (parentElem: Element, e: MouseEvent<HTMLHeadingElement>) => {
  const parentLeft = parentElem.getBoundingClientRect().left;
  const parentTop = parentElem.getBoundingClientRect().top;

  const after = window.getComputedStyle(parentElem, ':after');

  const afterStart = parentLeft + parseInt(after.getPropertyValue('left'), 10);
  const afterEnd = afterStart + parseInt(after.width, 10);

  const afterYStart = parentTop + parseInt(after.getPropertyValue('top'), 10);
  const afterYEnd = afterYStart + parseInt(after.height, 10);

  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const isAfterClicked: boolean =
    mouseX >= afterStart &&
    mouseX <= afterEnd &&
    mouseY >= afterYStart &&
    mouseY <= afterYEnd;

  return isAfterClicked;
};

/**
 * HeadingWrapper Component
 *
 * Internal wrapper component that adds anchor link functionality to headings.
 * Handles ID generation, click-to-copy URL behavior, and smooth scrolling.
 *
 * @component
 * @accessibility
 * - Generates URL-friendly IDs for deep linking
 * - Provides accessible labels for anchor link functionality
 * - Maintains proper heading hierarchy and semantics
 * - Supports keyboard navigation and screen readers
 */
const HeadingWrapper: HeadingType = ({
  H,
  children,
  className,
  isClickable,
  ...props
}) => {
  const id = typeof children === 'string' ? getId(children) : undefined;

  const onClick = (e: MouseEvent<HTMLHeadingElement>) => {
    const { id } = e.currentTarget;

    const isAfterClicker = afterClick(e.currentTarget, e);

    if (isAfterClicker && typeof id === 'string') {
      const urlWithoutHash = window.location.href.split('#')[0];
      const url = `${urlWithoutHash}#${id}`;

      // copy the url to the clipboard
      navigator.clipboard.writeText(url);

      scrollToHash(id);
    }
  };

  return (
    <H
      id={id}
      onClick={isClickable ? onClick : undefined}
      aria-label={
        isClickable
          ? `Click to scroll to section ${id} and copy the link to the clipboard`
          : undefined
      }
      className={cn(isClickable && styledAfter, className)}
      {...props}
    >
      {children}
    </H>
  );
};

/**
 * H1 Component
 *
 * Primary page heading component. Does not include clickable anchor functionality
 * as it's typically used for main page titles rather than content sections.
 *
 * @example
 * ```tsx
 * <H1>Welcome to Our Website</H1>
 * <H1 className="text-blue-600">Custom Styled Title</H1>
 * ```
 */
export const H1: FC<HeadingProps> = ({ isClickable: _, ...props }) => (
  <StyledH1 {...props} />
);

/**
 * H2 Component
 *
 * Secondary heading component with optional anchor link functionality.
 * Perfect for major section headers with deep-linking capabilities.
 *
 * @example
 * ```tsx
 * <H2>Getting Started</H2>
 * <H2 isClickable>API Reference</H2>
 * ```
 */
export const H2: FC<HeadingProps> = ({ isClickable = false, ...props }) => (
  <HeadingWrapper H={StyledH2} isClickable={isClickable} {...props} />
);

/**
 * H3 Component
 *
 * Tertiary heading component with optional anchor link functionality.
 * Used for subsection headers within major sections.
 *
 * @example
 * ```tsx
 * <H3>Configuration Options</H3>
 * <H3 isClickable>Advanced Settings</H3>
 * ```
 */
export const H3: FC<HeadingProps> = ({ isClickable = false, ...props }) => (
  <HeadingWrapper H={StyledH3} isClickable={isClickable} {...props} />
);

/**
 * H4 Component
 *
 * Fourth-level heading component with optional anchor link functionality.
 * Used for detailed section organization.
 *
 * @example
 * ```tsx
 * <H4>Implementation Details</H4>
 * <H4 isClickable>Code Examples</H4>
 * ```
 */
export const H4: FC<HeadingProps> = ({ isClickable = false, ...props }) => (
  <HeadingWrapper H={StyledH4} isClickable={isClickable} {...props} />
);

/**
 * H5 Component
 *
 * Fifth-level heading component with optional anchor link functionality.
 * Used for fine-grained content organization.
 *
 * @example
 * ```tsx
 * <H5>Technical Notes</H5>
 * <H5 isClickable>Best Practices</H5>
 * ```
 */
export const H5: FC<HeadingProps> = ({ isClickable = false, ...props }) => (
  <HeadingWrapper H={StyledH5} isClickable={isClickable} {...props} />
);

export const H6: FC<HeadingProps> = ({ isClickable = false, ...props }) => (
  <HeadingWrapper H={StyledH6} isClickable={isClickable} {...props} />
);
