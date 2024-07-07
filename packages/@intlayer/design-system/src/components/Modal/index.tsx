'use client';

import { m } from 'framer-motion';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  container?: HTMLElement;
  disableScroll?: boolean;
}

const StyledBackground = styled(m.div)<{
  $isOpen: boolean;
}>(({ $isOpen }) => [
  tw`fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto bg-background/60 backdrop-blur`,
  $isOpen ? tw`visible` : tw`hidden`,
]);
const StyledModal = tw(m.div)`cursor-default overflow-hidden rounded shadow`;

export const Modal = ({
  children,
  isOpen,
  container,
  disableScroll = false,
  onClose,
}: ModalProps) => {
  const containerElement = useGetElementOrWindow(container);

  useScrollBlockage({ key: 'modal', disableScroll: isOpen && disableScroll });

  if (!containerElement) return <></>;

  return createPortal(
    <StyledBackground
      initial={{ opacity: isOpen ? 0 : 1 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      onClick={onClose}
      $isOpen={isOpen}
    >
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: isOpen ? 0.5 : 1 }}
        animate={{ scale: isOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal
      >
        {children}
      </StyledModal>
    </StyledBackground>,
    containerElement
  );
};
