'use client';

import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
import { cn } from '../../utils/cn';
import { Container } from '../Container';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  container?: HTMLElement;
  disableScroll?: boolean;
  hasCloseButton?: boolean;
  title?: string;
  size?: Size;
}

const modalVariants = cva('cursor-default overflow-auto p-3 shadow', {
  variants: {
    variant: {
      sm: 'size-full max-h-[30vh] max-w-[30vw]',
      md: 'size-full max-h-[50vh] max-w-[50vw]',
      lg: 'size-full max-h-[70vh] max-w-[70vw]',
      xl: 'size-full max-h-[95vh] max-w-[95vw]',
      unset: 'max-h-[95vh] max-w-[95vw]',
    },
  },
  defaultVariants: {
    variant: 'unset',
  },
});

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'unset';

const MotionModal = motion(Container);

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  container,
  disableScroll = false,
  onClose,
  hasCloseButton = false,
  title,
  size = 'unset',
}) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  if (!containerElement) return <></>;

  const hasTitle = typeof title === 'string';

  return createPortal(
    <motion.div
      className={cn(
        'bg-background/40 dark:bg-background-dark/40 fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto backdrop-blur',
        isOpen ? 'visible' : 'hidden'
      )}
      initial={{ opacity: isOpen ? 0 : 1 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      aria-hidden={!isOpen}
    >
      <MotionModal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: isOpen ? 0.5 : 1 }}
        animate={{ scale: isOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className={cn(
          modalVariants({
            variant: size,
          })
        )}
        role="dialog"
        aria-modal
        roundedSize="2xl"
        transparency="sm"
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
            <h2 className="flex items-center justify-center text-lg font-bold">
              {title}
            </h2>
          )}
          {hasCloseButton && (
            <X
              role="button"
              aria-label="Close modal"
              className="right-2 top-2 ml-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            />
          )}
        </div>
        <div className="mx-2 my-4 flex flex-1 flex-col items-center justify-center overflow-auto">
          {children}
        </div>
      </MotionModal>
    </motion.div>,
    containerElement
  );
};
