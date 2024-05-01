import type { FC, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface MaxHeightSmootherProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isHidden?: boolean;
  isOverable?: boolean;
  isFocusable?: boolean;
  minHeight?: number;
}

const StyledMasker = styled.div<{
  $isHidden?: boolean;
  $isOverable: boolean;
  $isFocusable: boolean;
}>`
  ${tw`relative grid w-full grid-rows-[0fr] overflow-hidden transition-all duration-700 ease-in-out`}
  ${({ $isHidden }) =>
    typeof $isHidden !== 'undefined' &&
    !$isHidden &&
    tw`grid-rows-[1fr] overflow-x-auto`}
  ${({ $isOverable }) =>
    $isOverable && tw`hover:grid-rows-[1fr] hover:overflow-x-auto`}
  ${({ $isFocusable }) =>
    $isFocusable && tw`focus:grid-rows-[1fr] focus:overflow-x-auto`}
`;

const StyledChildrenWrapper = tw.div``;

export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  className,
  isOverable = false,
  isFocusable = false,
  isHidden,
  minHeight = 0,
  ...props
}) => (
  <StyledMasker
    aria-hidden={isHidden}
    $isHidden={isHidden}
    $isOverable={isOverable}
    $isFocusable={isFocusable}
    className={className}
    {...props}
  >
    <StyledChildrenWrapper
      style={{
        minHeight: `${minHeight}px`,
      }}
    >
      {children}
    </StyledChildrenWrapper>
  </StyledMasker>
);
