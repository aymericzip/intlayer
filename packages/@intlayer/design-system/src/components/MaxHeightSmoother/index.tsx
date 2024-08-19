import type { FC, HTMLAttributes, ReactNode } from 'react';
import { styled } from 'styled-components';
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

export const StyledChildrenWrapper = styled.div<{
  $isOverable: boolean;
  $isFocusable: boolean;
}>`
  ${({ $isOverable }) => $isOverable && tw`group-hover:visible`}
  ${({ $isFocusable }) => $isFocusable && tw`group-focus:visible`}
`;

export const MaxHeightSmoother: FC<MaxHeightSmootherProps> = ({
  children,
  isHidden,
  className = '',
  isOverable = false,
  isFocusable = false,
  minHeight = 0,
  ...props
}) => (
  <StyledMasker
    aria-hidden={isHidden}
    $isHidden={isHidden}
    $isOverable={isOverable}
    $isFocusable={isFocusable}
    className={`group ${className}`}
    {...props}
  >
    <StyledChildrenWrapper
      style={{
        minHeight: `${minHeight}px`,
      }}
      $isOverable={isOverable}
      $isFocusable={isFocusable}
    >
      {children}
    </StyledChildrenWrapper>
  </StyledMasker>
);
