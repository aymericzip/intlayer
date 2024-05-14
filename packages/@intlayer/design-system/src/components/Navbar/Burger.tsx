import type { HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';

interface BurgerProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

const StyledContainer = tw.div`relative mr-3 size-10 cursor-pointer`;

const StyledLine = tw.span`bg-text dark:bg-text-dark absolute top-1/2 block h-[2px] w-8 transition duration-300`;

const StyledTopLineCross = styled(StyledLine)<{ $isActive: boolean }>(
  ({ $isActive }) => [$isActive ? tw`rotate-[-45deg]` : tw`rotate-0`]
);
const StyledTopLine = styled(StyledLine)<{ $isActive: boolean }>(
  ({ $isActive }) =>
    $isActive ? tw`-translate-y-3 opacity-0` : tw`-translate-y-2 opacity-100`
);

const StyledCenterLine = styled(StyledLine)<{ $isActive: boolean }>(
  ({ $isActive }) => [$isActive ? tw`opacity-0` : tw`opacity-100`]
);

const StyledBottomLineCross = styled(StyledLine)<{ $isActive: boolean }>(
  ({ $isActive }) => [$isActive ? tw`rotate-[45deg]` : tw`rotate-0`]
);

const StyledBottomLine = styled(StyledLine)<{ $isActive: boolean }>(
  ({ $isActive }) =>
    $isActive ? tw`translate-y-3 opacity-0` : tw`translate-y-2 opacity-100`
);

export const Burger = ({ isActive = false, ...props }: BurgerProps) => (
  <StyledContainer
    aria-checked={isActive}
    aria-expanded={isActive}
    aria-controls="mobile-menu"
    role="switch"
    aria-label={isActive ? 'Close menu' : 'Open menu'}
    {...props}
  >
    <div>
      <StyledTopLineCross $isActive={isActive} />
      <StyledTopLine $isActive={isActive} />
    </div>

    <div>
      <StyledCenterLine $isActive={isActive} />
    </div>

    <div>
      <StyledBottomLineCross $isActive={isActive} />
      <StyledBottomLine $isActive={isActive} />
    </div>
  </StyledContainer>
);
