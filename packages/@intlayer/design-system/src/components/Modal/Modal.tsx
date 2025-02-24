'use client';

import { cva } from 'class-variance-authority';
import { motion as m } from 'framer-motion';
import { X } from 'lucide-react';
import { type FC } from 'react';
import { createPortal } from 'react-dom';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
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
  'cursor-default overflow-auto py-3 shadow-sm justify-center',
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

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'unset';

const MotionModal = m.create(Container);

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
  className,
  ...props
}) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  if (!containerElement) return <></>;

  const hasTitle = typeof title === 'string';

  return createPortal(
    <m.div
      className="bg-background/40 /40 invisible fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto backdrop-blur"
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
      <div className="flex justify-center p-4">
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
              'cursor-default px-4',
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
              <H3 className="ml-4 flex items-center justify-center text-lg font-bold">
                {title}
              </H3>
            )}
            {hasCloseButton && (
              <Button
                variant="hoverable"
                color="text"
                label="Close modal"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.();
                }}
                Icon={X}
                size="icon-md"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col items-center overflow-auto">
            {children}
          </div>
        </MotionModal>
      </div>
    </m.div>,
    containerElement
  );
};
