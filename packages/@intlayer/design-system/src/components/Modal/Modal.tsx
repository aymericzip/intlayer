'use client';

import { cva } from 'class-variance-authority';
import { motion as m } from 'framer-motion';
import { X } from 'lucide-react';
import { type FC, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
import { cn } from '../../utils/cn';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container, type ContainerProps } from '../Container';
import { H3 } from '../Headers';

/**
 * Enumeration of available modal sizes
 */
export enum ModalSize {
  /** Small modal: max height 30vh, max width xl */
  SM = 'sm',
  /** Medium modal: max height 50vh, max width xl */
  MD = 'md',
  /** Large modal: max height 70vh, max width 2xl */
  LG = 'lg',
  /** Extra large modal: max height 95vh, max width 6xl */
  XL = 'xl',
  /** Unset size: max height 95vh, full width responsive */
  UNSET = 'unset',
}

/**
 * Props for the Modal component
 */
type ModalProps = {
  /** Content to be displayed inside the modal */
  children: ReactNode;
  /** Controls whether the modal is visible */
  isOpen: boolean;
  /** Callback function called when the modal should be closed */
  onClose?: () => void;
  /** Container element to render the modal into (defaults to document.body) */
  container?: HTMLElement;
  /** Whether to disable scrolling on the background content */
  disableScroll?: boolean;
  /** Whether to display a close button in the modal header */
  hasCloseButton?: boolean;
  /** Optional title displayed at the top of the modal */
  title?: string;
  /** Size variant for the modal */
  size?: ModalSize | `${ModalSize}`;
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

/**
 * Class name variants for different modal sizes using class-variance-authority
 * Defines responsive sizing and scrollable content for modal containers
 */
const modalVariants = cva(
  'flex cursor-default flex-col overflow-hidden p-3 shadow-sm',
  {
    variants: {
      size: {
        /** Small modal: height auto, max-height 30vh, width 95vw, max-width xl */
        sm: 'h-auto max-h-[30vh] w-[95vw] max-w-xl',
        /** Medium modal: height auto, max-height 50vh, width 95vw, max-width xl */
        md: 'h-auto max-h-[50vh] w-[95vw] max-w-xl',
        /** Large modal: height auto, max-height 70vh, width 95vw, max-width 2xl */
        lg: 'h-auto max-h-[70vh] w-[95vw] max-w-2xl',
        /** Extra large modal: height auto, max-height 95vh, width 95vw, max-width 6xl */
        xl: 'h-auto max-h-[95vh] w-[95vw] max-w-6xl',
        /** Unset modal: height auto, max-height 95vh, width 95vw, no max-width */
        unset: 'h-auto max-h-[95vh] w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'unset',
    },
  }
);

/**
 * Motion-enabled modal component with Framer Motion support
 * Extends Container component with motion capabilities for animations
 */
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

  const hasTitle = typeof title === 'string';

  return createPortal(
    <m.div
      className="invisible fixed top-0 left-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto bg-background/40 backdrop-blur"
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
        className={modalVariants({
          size,
          className,
        })}
        role="dialog"
        aria-modal
        roundedSize="2xl"
        {...props}
      >
        <div
          className={cn(
            'cursor-default',
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
            <H3 className="mt-2 mb-4 ml-4 flex items-center justify-center font-bold text-lg">
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
        <div className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </div>
      </MotionModal>
    </m.div>,
    containerElement
  );
};
