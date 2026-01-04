import { cva, type VariantProps } from 'class-variance-authority';
import type { FC, HTMLAttributes, PropsWithChildren } from 'react';

/**
 * Properties for the Tag component extending HTML div attributes and variant options
 *
 * @interface TagProps
 * @extends {PropsWithChildren<VariantProps<typeof containerVariants>>}
 * @extends {HTMLAttributes<HTMLDivElement>}
 *
 * @property {ReactNode} children - The content to display inside the tag
 * @property {TagColor} [color] - Color theme variant of the tag
 * @property {TagRoundedSize} [roundedSize] - Border radius size of the tag
 * @property {TagSize} [size] - Size variant affecting padding and font size
 * @property {TagBorder} [border] - Whether to show a border around the tag
 * @property {TagBackground} [background] - Background visibility option
 * @property [className] - Additional CSS classes for custom styling
 *
 * @example
 * ```tsx
 * // Basic tag
 * <Tag>Default Tag</Tag>
 *
 * // Success tag with border
 * <Tag color={TagColor.SUCCESS} border={TagBorder.WITH}>
 *   Success Status
 * </Tag>
 *
 * // Large warning tag
 * <Tag color={TagColor.WARNING} size={TagSize.LG}>
 *   Important Warning
 * </Tag>
 * ```
 */
type TagProps = PropsWithChildren<VariantProps<typeof containerVariants>> &
  HTMLAttributes<HTMLDivElement>;

/**
 * Enumeration for tag border radius sizes
 *
 * Controls the roundedness of tag corners, from sharp edges to fully rounded pills.
 *
 * @enum TagRoundedSize
 * @property NONE - 'none' - No border radius (sharp corners)
 * @property SM - 'sm' - Small border radius (2px)
 * @property MD - 'md' - Medium border radius (6px)
 * @property LG - 'lg' - Large border radius (8px)
 * @property XL - 'xl' - Extra large border radius (12px)
 * @property XXL - '2xl' - 2x large border radius (16px)
 * @property XXXL - '3xl' - 3x large border radius (24px)
 * @property FULL - 'full' - Fully rounded (50% border radius, pill shape)
 *
 * @example
 * ```tsx
 * // Sharp corners
 * <Tag roundedSize={TagRoundedSize.NONE}>Sharp Tag</Tag>
 *
 * // Pill-shaped tag
 * <Tag roundedSize={TagRoundedSize.FULL}>Pill Tag</Tag>
 *
 * // Medium rounded corners
 * <Tag roundedSize={TagRoundedSize.MD}>Rounded Tag</Tag>
 * ```
 */
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

/**
 * Enumeration for tag color themes
 *
 * Provides semantic color options for different tag purposes and meanings.
 * Each color includes background, border, and text color variations.
 *
 * @enum TagColor
 * @property SUCCESS - 'success' - Green theme for positive states, success messages, or completed items
 * @property ERROR - 'error' - Red theme for error states, warnings, or failed operations
 * @property WARNING - 'warning' - Yellow/orange theme for caution, pending states, or important notices
 * @property NEUTRAL - 'neutral' - Gray theme for neutral information or secondary content
 * @property TEXT - 'text' - Default text color theme for general purpose tags
 *
 * @example
 * ```tsx
 * // Status indicators
 * <Tag color={TagColor.SUCCESS}>Completed</Tag>
 * <Tag color={TagColor.ERROR}>Failed</Tag>
 * <Tag color={TagColor.WARNING}>Pending</Tag>
 *
 * // Category tags
 * <Tag color={TagColor.NEUTRAL}>Category</Tag>
 * <Tag color={TagColor.TEXT}>General</Tag>
 * ```
 */
export enum TagColor {
  PRIMARY = 'primary',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  NEUTRAL = 'neutral',
  TEXT = 'text',
  BLUE = 'blue',
  YELLOW = 'yellow',
  GREEN = 'green',
  RED = 'red',
  ORANGE = 'orange',
  PURPLE = 'purple',
  PINK = 'pink',
  BROWN = 'brown',
  GRAY = 'gray',
  BLACK = 'black',
  WHITE = 'white',
}

/**
 * Enumeration for tag size variants
 *
 * Controls the overall size of tags including padding, font size, and border thickness.
 * Sizes are designed to maintain visual hierarchy and readability.
 *
 * @enum TagSize
 * @property XS - 'xs' - Extra small (0.5rem padding, text-xs, 1.2px border)
 * @property SM - 'sm' - Small (0.5rem padding, text-sm, 1.5px border)
 * @property MD - 'md' - Medium (1rem padding, text-base, 2px border) - Default size
 * @property LG - 'lg' - Large (2rem padding, text-lg, 2px border)
 * @property XL - 'xl' - Extra large (4rem padding, text-xl, 2px border)
 *
 * @example
 * ```tsx
 * // Different sizes for hierarchy
 * <Tag size={TagSize.XS}>Small detail</Tag>
 * <Tag size={TagSize.SM}>Minor category</Tag>
 * <Tag size={TagSize.MD}>Standard tag</Tag>
 * <Tag size={TagSize.LG}>Important label</Tag>
 * <Tag size={TagSize.XL}>Hero tag</Tag>
 * ```
 */
export enum TagSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

/**
 * Enumeration for tag border visibility
 *
 * Controls whether a border is displayed around the tag.
 *
 * @enum TagBorder
 * @property NONE - 'none' - No border (default)
 * @property WITH - 'with' - Show border with 1.5px thickness
 *
 * @example
 * ```tsx
 * <Tag border={TagBorder.NONE}>Borderless</Tag>
 * <Tag border={TagBorder.WITH}>With Border</Tag>
 * ```
 */
export enum TagBorder {
  NONE = 'none',
  WITH = 'with',
}

/**
 * Enumeration for tag background visibility
 *
 * Controls the background styling of the tag.
 *
 * @enum TagBackground
 * @property NONE - 'none' - No background styling
 * @property WITH - 'with' - Apply background styling
 *
 * @example
 * ```tsx
 * <Tag background={TagBackground.NONE}>No Background</Tag>
 * <Tag background={TagBackground.WITH}>With Background</Tag>
 * ```
 */
export enum TagBackground {
  NONE = 'none',
  WITH = 'with',
}

const containerVariants = cva('w-fit backdrop-blur', {
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
      [`${TagColor.PRIMARY}`]: 'border-primary bg-primary/10 text-primary',
      [`${TagColor.SUCCESS}`]: 'border-success bg-success/10 text-success',
      [`${TagColor.ERROR}`]: 'border-error bg-error/10 text-error',
      [`${TagColor.WARNING}`]: 'border-warning bg-warning/10 text-warning',
      [`${TagColor.NEUTRAL}`]: '/10 border-neutral bg-neutral/10 text-neutral',
      [`${TagColor.TEXT}`]: 'border-text bg-text/10 text-text',
      [`${TagColor.BLUE}`]:
        'border-blue-500 bg-blue-500/10 text-blue-500 dark:text-blue-300',
      [`${TagColor.YELLOW}`]:
        'border-yellow-500 bg-yellow-500/10 text-yellow-500 dark:text-yellow-300',
      [`${TagColor.GREEN}`]:
        'border-green-500 bg-green-500/10 text-green-500 dark:text-green-300',
      [`${TagColor.RED}`]:
        'border-red-500 bg-red-500/10 text-red-500 dark:text-red-300',
      [`${TagColor.ORANGE}`]:
        'border-orange-500 bg-orange-500/10 text-orange-500 dark:text-orange-300',
      [`${TagColor.PURPLE}`]:
        'border-purple-500 bg-purple-500/10 text-purple-500 dark:text-purple-300',
      [`${TagColor.PINK}`]:
        'border-pink-500 bg-pink-500/10 text-pink-500 dark:text-pink-300',
      [`${TagColor.BROWN}`]:
        'border-brown-500 bg-brown-500/10 text-brown-500 dark:text-brown-300',
      [`${TagColor.GRAY}`]:
        'border-gray-500 bg-gray-500/10 text-gray-500 dark:text-gray-300',
      [`${TagColor.BLACK}`]: 'border-black bg-black/10 text-black',
      [`${TagColor.WHITE}`]: 'border-white bg-white/10 text-white',
    },
    size: {
      [`${TagSize.XS}`]: 'border-[1.2px] px-2 py-0.5 text-xs',
      [`${TagSize.SM}`]: 'border-[1.3px] px-2 py-0.5 text-sm',
      [`${TagSize.MD}`]: 'border-2 px-2 py-1 text-base',
      [`${TagSize.LG}`]: 'border-2 px-3 py-2 text-lg',
      [`${TagSize.XL}`]: 'border-2 px-3 py-2 text-xl',
    },
    border: {
      [`${TagBorder.NONE}`]: 'border-none',
      [`${TagBorder.WITH}`]: 'border-[1.3px] border-text',
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

/**
 * Tag component for displaying labels, categories, status indicators, and badges
 *
 * The Tag component is a versatile labeling element that supports multiple visual variants
 * for different use cases. It provides semantic color options, flexible sizing, and
 * customizable styling options for borders and backgrounds.
 *
 * ## Features
 * - **Semantic Colors**: Success, error, warning, neutral, and text color themes
 * - **Flexible Sizing**: Five size variants from extra small to extra large
 * - **Border Radius Options**: Eight rounding options from none to fully rounded
 * - **Border Control**: Optional borders for enhanced visual separation
 * - **Background Control**: Configurable background styling
 * - **Accessibility**: Proper HTML semantics and keyboard navigation support
 *
 * ## Use Cases
 * - **Status Indicators**: Show completion, error, or pending states
 * - **Category Labels**: Organize and categorize content
 * - **Badges**: Display counts, notifications, or achievements
 * - **Keywords**: Tag content with relevant keywords or topics
 * - **Metadata**: Show additional information like dates, authors, or types
 *
 * ## Design Principles
 * - Maintains readability across all size and color combinations
 * - Uses backdrop blur effect for subtle transparency
 * - Follows consistent spacing and typography scales
 * - Provides sufficient color contrast for accessibility
 *
 * @param {TagProps} props - The properties for the Tag component
 * @returns {JSX.Element} The rendered tag element
 *
 * @example
 * ```tsx
 * // Basic status tags
 * <Tag color={TagColor.SUCCESS}>Completed</Tag>
 * <Tag color={TagColor.ERROR}>Failed</Tag>
 * <Tag color={TagColor.WARNING}>In Progress</Tag>
 *
 * // Category tags with borders
 * <Tag color={TagColor.NEUTRAL} border={TagBorder.WITH}>
 *   Technology
 * </Tag>
 * <Tag color={TagColor.TEXT} border={TagBorder.WITH}>
 *   Design
 * </Tag>
 *
 * // Size variations for hierarchy
 * <div className="flex items-center gap-2">
 *   <Tag size={TagSize.XS} color={TagColor.NEUTRAL}>Minor</Tag>
 *   <Tag size={TagSize.SM} color={TagColor.TEXT}>Standard</Tag>
 *   <Tag size={TagSize.LG} color={TagColor.SUCCESS}>Important</Tag>
 * </div>
 *
 * // Rounded variations
 * <div className="flex gap-2">
 *   <Tag roundedSize={TagRoundedSize.NONE}>Sharp</Tag>
 *   <Tag roundedSize={TagRoundedSize.MD}>Rounded</Tag>
 *   <Tag roundedSize={TagRoundedSize.FULL}>Pill</Tag>
 * </div>
 *
 * // Custom styled tag
 * <Tag
 *   color={TagColor.WARNING}
 *   size={TagSize.LG}
 *   border={TagBorder.WITH}
 *   roundedSize={TagRoundedSize.LG}
 *   className="font-bold uppercase tracking-wide"
 * >
 *   Custom Style
 * </Tag>
 *
 * // Interactive tags with click handlers
 * <Tag
 *   color={TagColor.SUCCESS}
 *   onClick={() => console.log('Tag clicked')}
 *   className="cursor-pointer hover:opacity-80 transition-opacity"
 * >
 *   Clickable Tag
 * </Tag>
 * ```
 *
 * @see {@link TagColor} - Available color theme options
 * @see {@link TagSize} - Available size variants
 * @see {@link TagRoundedSize} - Available border radius options
 * @see {@link TagBorder} - Border visibility options
 * @see {@link TagBackground} - Background styling options
 */
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
