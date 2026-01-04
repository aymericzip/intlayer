'use client';

import { cn } from '@utils/cn';
import { ChevronDown } from 'lucide-react';
import {
  type FC,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useId,
  useState,
} from 'react';
import {
  Button,
  ButtonColor,
  type ButtonProps,
  ButtonVariant,
} from '../Button';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

export interface AccordionProps
  extends Omit<ButtonProps, 'children' | 'onToggle'> {
  /** The content displayed in the accordion header */
  header: ReactNode;
  /** The collapsible content inside the accordion */
  children: ReactNode;
  /** Controls whether the accordion is open (controlled mode) */
  isOpen?: boolean;
  /** Default open state (uncontrolled mode) */
  defaultIsOpen?: boolean;
  /** Called when the accordion state changes */
  onToggle?: (isOpen: boolean) => void;
  /** Disable the accordion interaction */
  disabled?: boolean;
  /** Custom class for the content container */
  contentClassName?: string;
  /** Custom class for the header container */
  headerClassName?: string;
  /** Accessible label for screen readers */
  'aria-label'?: string;
  /** ID for the accordion content (for aria-controls) */
  contentId?: string;
}

/**
 * Accordion component that allows the user to expand and collapse content.
 * It provides a header with a chevron icon that controls the visibility of the content.
 *
 * Features:
 * - Supports both controlled and uncontrolled modes
 * - Accessible with proper ARIA attributes
 * - Keyboard navigation support
 * - Smooth animations for expand/collapse
 * - Customizable styling
 *
 * @param header - The content of the header.
 * @param children - The content to be expanded and collapsed.
 * @param isOpen - Controlled state for whether the content is expanded.
 * @param defaultIsOpen - Default open state for uncontrolled mode.
 * @param onToggle - Callback when the accordion state changes.
 * @param disabled - Whether the accordion is disabled.
 * @param contentClassName - Custom class for the content container.
 * @param headerClassName - Custom class for the header.
 * @param contentId - ID for the content (used for aria-controls).
 *
 * @example
 * // Uncontrolled mode
 * <Accordion header="Accordion Header" defaultIsOpen={true}>
 *   <p>Accordion content</p>
 * </Accordion>
 *
 * @example
 * // Controlled mode
 * <Accordion
 *   header="Controlled Accordion"
 *   isOpen={isOpen}
 *   onToggle={setIsOpen}
 * >
 *   <p>Controlled content</p>
 * </Accordion>
 */
export const Accordion: FC<AccordionProps> = ({
  children,
  header,
  isOpen,
  defaultIsOpen = false,
  onToggle,
  onClick,
  disabled = false,
  contentClassName,
  headerClassName,
  contentId,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Determine if we're in controlled or uncontrolled mode
  const isControlled = isOpen !== undefined;
  const [internalIsOpen, setInternalIsOpen] = useState(defaultIsOpen);
  const id = useId();

  // Use controlled value if provided, otherwise use internal state
  const isExpandedState = isControlled ? isOpen : internalIsOpen;
  const isHidden = !isExpandedState;

  // Generate unique ID for content if not provided
  const generatedContentId = contentId ?? `${id}-accordion-content`;

  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const newIsOpen = !isExpandedState;

    // Update internal state if uncontrolled
    if (!isControlled) {
      setInternalIsOpen(newIsOpen);
    }

    // Call external handlers
    onToggle?.(newIsOpen);
    onClick?.(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    // Enter and Space should toggle the accordion
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(e as any);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant={ButtonVariant.HOVERABLE}
        color={ButtonColor.TEXT}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        isFullWidth
        className={cn(
          'flex items-center justify-between gap-2',
          headerClassName
        )}
        IconRight={ChevronDown}
        iconClassName={cn(
          'transform transition-transform duration-500 ease-in-out',
          isExpandedState ? 'rotate-0' : '-rotate-180'
        )}
        aria-expanded={isExpandedState}
        aria-controls={generatedContentId}
        aria-label={ariaLabel}
        role="button"
        {...props}
      >
        {header}
      </Button>

      <MaxHeightSmoother
        id={generatedContentId}
        tabIndex={isHidden ? -1 : undefined}
        isHidden={isHidden}
        className={contentClassName}
        role="region"
        aria-labelledby={generatedContentId}
      >
        {children}
      </MaxHeightSmoother>
    </div>
  );
};
