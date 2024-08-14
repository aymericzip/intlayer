import type { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

type Align = 'left' | 'right';

type MaxHeightSmootherProps = HTMLAttributes<HTMLDivElement> & {
  isHidden: boolean;
  minWidth?: number;
  align?: Align;
};

const StyledMasker = styled.div<{ $isHidden: boolean }>`
  ${tw`grid grid-cols-[0fr] h-full overflow-x-hidden overflow-y-hidden relative transition-all duration-500 ease-in-out`}
  ${({ $isHidden }) => ($isHidden ? '' : tw`grid-cols-[1fr]`)}
`;

const StyledChildrenWrapper = styled.div<{ $align: Align }>`
  ${({ $align }) => $align === 'right' && tw`ml-auto`}
`;

export const MaxWidthSmoother = ({
  children,
  isHidden,
  minWidth = 0,
  align = 'left',
  ...props
}: MaxHeightSmootherProps) => (
  <StyledMasker aria-hidden={isHidden} $isHidden={isHidden} {...props}>
    <StyledChildrenWrapper
      style={{
        minWidth: `${minWidth}px`,
      }}
      $align={align}
    >
      {children}
    </StyledChildrenWrapper>
  </StyledMasker>
);
