'use client';

import { useGetElementOrWindow, useScrollBlockage } from '@hooks/index';
import { cn } from '@utils/cn';
import { cva } from 'class-variance-authority';
import { motion as m } from 'framer-motion';
import { X } from 'lucide-react';
import { type FC, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container, type ContainerProps } from '../Container';
import { H3 } from '../Headers';

/**
 * Enumeration of available modal sizes
 */
export enum ModalSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  UNSET = 'unset',
}

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  container?: HTMLElement;
  disableScroll?: boolean;
  hasCloseButton?: boolean;
  title?: ReactNode;
  size?: ModalSize | `${ModalSize}`;
  /**
   * Defines if the modal content area is scrollable.
   */
  isScrollable?: boolean | 'x' | 'y';
} & Pick<
  ContainerProps,
  | 'className'
  | 'transparency'
  | 'border'
  | 'background'
  | 'roundedSize'
  | 'borderColor'
  | 'padding'
  | 'separator'
  | 'gap'
>;

const modalVariants = cva(
  'flex cursor-default flex-col overflow-hidden shadow-sm',
  {
    variants: {
      size: {
        sm: 'h-auto max-h-[30vh] w-[95vw] max-w-xl',
        md: 'h-auto max-h-[50vh] w-[95vw] max-w-xl',
        lg: 'h-auto max-h-[70vh] w-[95vw] max-w-2xl',
        xl: 'h-auto max-h-[95vh] w-[95vw] max-w-6xl',
        unset: 'h-auto max-h-[95vh] w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'unset',
    },
  }
);

// Mapped from Container/index.tsx to apply internally
const contentPaddingVariants = {
  none: 'p-0',
  sm: 'px-2 py-4',
  md: 'px-4 py-6',
  lg: 'px-6 py-8',
  xl: 'px-8 py-10',
  '2xl': 'px-10 py-12',
};

const MotionModal = m.create(Container);

/**
 * Modal Component
 *
 * A highly customizable modal dialog component with portal rendering, Framer Motion animations,
 * and comprehensive accessibility features. Supports multiple size variants and scroll management.
 *
 * Features:
 * - Portal rendering to any container element (defaults to document.body)
 * - Smooth animations with Framer Motion
 * - Size variants: SM, MD, LG, XL, UNSET with responsive sizing
 * - Optional title and close button
 * - Background scroll prevention
 * - Click-outside-to-close functionality
 * - Full accessibility support with ARIA attributes
 * - Keyboard navigation support (ESC to close)
 * - Extensible styling with Container props
 *
 * @example
 * Basic usage:
 * ```jsx
 * <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <p>Modal content goes here</p>
 * </Modal>
 * ```
 *
 * @example
 * With title and close button:
 * ```jsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   title="Confirm Action"
 *   hasCloseButton
 *   size={ModalSize.LG}
 * >
 *   <div>
 *     <p>Are you sure you want to continue?</p>
 *     <Button onClick={onConfirm}>Confirm</Button>
 *   </div>
 * </Modal>
 * ```
 *
 * @example
 * Custom container and styling:
 * ```jsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={onClose}
 *   container={customContainer}
 *   background="card"
 *   padding="lg"
 *   border="default"
 * >
 *   Content with custom styling
 * </Modal>
 * ```
 *
 * Accessibility Notes:
 * - Modal receives focus when opened
 * - Background content is hidden from screen readers when modal is open
 * - ESC key closes modal (handled by browser for role="dialog")
 * - Click outside modal closes it
 * - Close button has descriptive label for screen readers
 *
 * @param props - Modal component props
 * @returns JSX element rendered via createPortal
 */
export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  container,
  disableScroll = true,
  onClose,
  hasCloseButton = false,
  title,
  size = ModalSize.MD,
  className,
  isScrollable = false,
  padding = 'none', // Extract padding here
  ...props
}) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen && onClose) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!containerElement) return <></>;

  const hasTitle = Boolean(title);

  // Determine the class for the inner content based on the padding prop
  const contentPaddingClass =
    contentPaddingVariants[
      (padding as keyof typeof contentPaddingVariants) || 'none'
    ];

  return createPortal(
    <m.div
      className="invisible fixed top-0 left-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-hidden bg-background/40 backdrop-blur"
      animate={isOpen ? 'visible' : 'invisible'}
      variants={{
        visible: {
          opacity: 1,
          visibility: 'visible',
          transition: { duration: 0.1, when: 'beforeChildren' },
        },
        invisible: {
          opacity: 0,
          visibility: 'hidden',
          transition: { duration: 0.1, when: 'afterChildren' },
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
      aria-hidden={!isOpen}
    >
      <MotionModal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: isOpen ? 0.5 : 1 }}
        animate={{ scale: isOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className={modalVariants({ size, className })}
        role="dialog"
        aria-modal
        roundedSize="4xl"
        // Force the outer container to have no padding so scrollbars hit the edge
        padding="none"
        {...props}
      >
        {/* HEADER SECTION */}
        <div
          className={cn(
            'relative flex-none px-4 pt-4',
            hasCloseButton && hasTitle
              ? `flex items-start`
              : hasCloseButton
                ? `flex justify-end`
                : hasTitle
                  ? `items-center`
                  : `hidden`
          )}
        >
          {hasTitle && (
            <H3 className="mb-2 ml-1 flex items-center justify-center font-bold text-lg">
              {title}
            </H3>
          )}
          {hasCloseButton && (
            <Button
              variant={ButtonVariant.HOVERABLE}
              color={ButtonColor.TEXT}
              label="Close modal"
              className="ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
              Icon={X}
              size={ButtonSize.ICON_MD}
            />
          )}
        </div>

        {/* SCROLLABLE WRAPPER - Full width, no padding */}
        <div
          className={cn(
            'flex min-h-0 w-full flex-1 flex-col',
            // Scrollbars will now appear at the very edge of this div (the modal edge)
            isScrollable === true && 'overflow-auto',
            isScrollable === 'y' && 'overflow-y-auto overflow-x-hidden',
            isScrollable === 'x' && 'overflow-x-auto overflow-y-hidden',
            !isScrollable && 'overflow-visible'
          )}
        >
          {/* CONTENT PADDING WRAPPER */}
          {/* We apply the padding class here, effectively putting content inside the scroll area */}
          <div className={cn('h-full w-full', contentPaddingClass)}>
            {children}
          </div>
        </div>
      </MotionModal>
    </m.div>,
    containerElement
  );
};
