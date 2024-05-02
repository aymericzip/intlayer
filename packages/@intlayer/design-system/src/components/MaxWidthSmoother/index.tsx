import React from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

type MaxHeightSmootherProps = {
  children: React.ReactNode;
  isHidden: boolean;
  minWidth?: number;
};

const StyledMasker = styled.div<{ $isHidden: boolean }>`
  ${tw`grid grid-cols-[0fr] h-full overflow-x-hidden overflow-y-hidden relative transition-all duration-500 ease-in-out`}
  ${({ $isHidden }) => ($isHidden ? '' : tw`grid-cols-[1fr]`)}
`;

const StyledChildrenWrapper = tw.div``;

export const MaxWidthSmoother = ({
  children,
  isHidden,
  minWidth = 0,
}: MaxHeightSmootherProps) => (
  <StyledMasker aria-hidden={isHidden} $isHidden={isHidden}>
    <StyledChildrenWrapper
      style={{
        minWidth: `${minWidth}px`,
      }}
    >
      {children}
    </StyledChildrenWrapper>
  </StyledMasker>
);
