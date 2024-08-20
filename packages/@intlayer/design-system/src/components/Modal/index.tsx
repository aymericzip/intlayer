'use client';

import { m } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
import { Container } from '../Container';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  container?: HTMLElement;
  disableScroll?: boolean;
  hasCloseButton?: boolean;
}

const StyledBackground = styled(m.div)<{
  $isOpen: boolean;
}>(({ $isOpen }) => [
  tw`fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto bg-background/60 dark:bg-background-dark/60 backdrop-blur`,
  $isOpen ? tw`visible` : tw`hidden`,
]);
const StyledModal = tw(
  m(Container)
)`cursor-default overflow-auto shadow p-3 max-w-[80vw] max-h-[80vh]`;

const StyledCloseButton = tw(X)`ml-auto right-2 top-2 mb-3 cursor-pointer`;

export const Modal = ({
  children,
  isOpen,
  container,
  disableScroll = false,
  onClose,
  hasCloseButton = false,
}: ModalProps) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  if (!containerElement) return <></>;

  return createPortal(
    <StyledBackground
      initial={{ opacity: isOpen ? 0 : 1 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      $isOpen={isOpen}
    >
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: isOpen ? 0.5 : 1 }}
        animate={{ scale: isOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal
        roundedSize="2xl"
      >
        {hasCloseButton && (
          <StyledCloseButton
            role="button"
            aria-label="Close modal"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          />
        )}
        {children}
      </StyledModal>
    </StyledBackground>,
    containerElement
  );
};
