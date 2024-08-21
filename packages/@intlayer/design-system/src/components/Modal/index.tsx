'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';
import tw, { type TwStyle } from 'twin.macro';
import { useGetElementOrWindow, useScrollBlockage } from '../../hooks/index';
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

type Size = 'sm' | 'md' | 'lg' | 'xl' | 'unset';

const sizeVariant: Record<Size, TwStyle> = {
  sm: tw`max-w-[30vw] max-h-[30vh] w-full h-full`,
  md: tw`max-w-[50vw] max-h-[50vh] w-full h-full`,
  lg: tw`max-w-[70vw] max-h-[70vh] w-full h-full`,
  xl: tw`max-w-[95vw] max-h-[95vh] w-full h-full`,
  unset: tw`max-w-[95vw] max-h-[95vh]`,
};

const StyledBackground = styled(motion.div)<{
  $isOpen: boolean;
}>(({ $isOpen }) => [
  tw`fixed left-0 top-0 z-50 flex size-full cursor-pointer items-center justify-center overflow-auto bg-background/60 dark:bg-background-dark/60 backdrop-blur`,
  $isOpen ? tw`visible` : tw`hidden`,
]);
const StyledModal = styled(motion(Container))<{ $size: Size }>(({ $size }) => [
  sizeVariant[$size],
  tw`cursor-default overflow-auto shadow p-3`,
]);

const StyledHeader = styled.div<{
  $hasCloseButton: boolean;
  $hasTitle: boolean;
}>(({ $hasCloseButton, $hasTitle }) =>
  $hasCloseButton && $hasTitle
    ? tw`flex justify-center items-center`
    : $hasCloseButton
      ? tw`flex justify-end items-center`
      : $hasTitle
        ? tw`items-center`
        : tw`hidden`
);
const StyledTitle = tw.h2`text-lg font-bold flex justify-center items-center`;
const StyledCloseButton = tw(X)`ml-auto right-2 top-2 cursor-pointer`;
const StyledContentContainer = tw.div`flex flex-col justify-center items-center overflow-auto my-4 mx-2 flex-1`;

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
    <StyledBackground
      initial={{ opacity: isOpen ? 0 : 1 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.1 }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      $isOpen={isOpen}
      aria-hidden={!isOpen}
    >
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: isOpen ? 0.5 : 1 }}
        animate={{ scale: isOpen ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal
        roundedSize="2xl"
        $size={size}
      >
        <StyledHeader $hasCloseButton={hasCloseButton} $hasTitle={hasTitle}>
          {hasTitle && <StyledTitle>{title}</StyledTitle>}
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
        </StyledHeader>
        <StyledContentContainer>{children}</StyledContentContainer>
      </StyledModal>
    </StyledBackground>,
    containerElement
  );
};
