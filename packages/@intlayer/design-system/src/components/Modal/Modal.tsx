'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
import { cn } from '../../utils/cn';
import { Container, type ContainerProps } from '../Container';
import { H3 } from '../Headers';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  container?: HTMLElement;
  disableScroll?: boolean;
  hasCloseButton?: boolean;
  title?: string;
  size?: Size;
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
  'cursor-default overflow-auto p-3 shadow justify-center',
  {
    variants: {
      variant: {
        sm: 'max-h-[30vh] w-[95vw] max-w-xl',
        md: 'max-h-[50vh] w-[95vw] max-w-xl',
        lg: 'max-h-[70vh] w-[95vw] max-w-2xl',
        xl: 'max-h-[95vh] w-[95vw] max-w-3xl',
        unset: 'max-h-[95vh] w-[95vw]',
      },
    },
    defaultVariants: {
      variant: 'unset',
    },
  }
);

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'unset';

const MotionModal = motion.create(Container);

/**
 * Usage example:
 * ```jsx
 * <Modal isOpen={isOpen} onClose={onClose}>
 *   Modal content
 * </Modal>
 * ```
 */
export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  container,
  disableScroll = false,
  onClose,
  hasCloseButton = false,
  title,
  size = 'md',
  ...props
}) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  if (!containerElement) return <></>;

  const hasTitle = typeof title === 'string';

  return createPortal(
    <motion.div
      className="bg-background/40 dark:bg-background-dark/40 fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto backdrop-blur"
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
          variant: size,
        })}
        role="dialog"
        aria-modal
        roundedSize="2xl"
        {...props}
      >
        <div
          className={cn(
            hasCloseButton && hasTitle
              ? `flex items-center justify-center`
              : hasCloseButton
                ? `flex items-center justify-end`
                : hasTitle
                  ? `items-center`
                  : `hidden`
          )}
        >
          {hasTitle && (
            <H3 className="flex items-center justify-center text-lg font-bold">
              {title}
            </H3>
          )}
          {hasCloseButton && (
            <X
              role="button"
              aria-label="Close modal"
              className="right-2 top-2 ml-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            />
          )}
        </div>
        <div className="flex flex-1 flex-col items-center overflow-auto">
          {children}
        </div>
      </MotionModal>
    </motion.div>,
    containerElement
  );
};
