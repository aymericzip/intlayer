import type { ReactNode, FC, HTMLAttributes } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { Accordion } from '../Accordion';

interface ItemWrapperProps extends HTMLAttributes<HTMLDivElement> {
  level: number;
  children: ReactNode;
  title: string;
  description: string;
  rightParam?: ReactNode;
  isSelected: boolean;
}

export const StyledContainer = styled.div<{
  $level: number;
  $isSelected?: boolean;
}>(({ $level, $isSelected }) => [
  tw`p-2 rounded-md transition`,
  tw`hover:bg-card/30 dark:hover:bg-card-dark/30 [&:has(.section:hover)]:bg-transparent`,
  $level === 2 && tw`hover:bg-card/30 dark:hover:bg-card-dark/30`,
  $level >= 3 && tw``,
  $isSelected === true && tw`bg-card/40 dark:bg-card-dark/40`,
]);

const Description = tw.p`text-sm text-card pl-3`;

const Title = styled.span<{ $level: number }>(({ $level }) => [
  tw``,
  $level === 0 && tw`text-2xl`,
  $level === 1 && tw`text-xl`,
  $level === 2 && tw`text-lg`,
  $level >= 3 && tw`text-base`,
]);
const StyledHeaderContainer = tw.div`flex w-full`;
const StyledHeader = tw.div`flex justify-between items-center w-full`;

const RightParamContainer = tw.div`flex w-full items-center justify-between p-3 sm:w-auto`;

export const ItemLayout: FC<ItemWrapperProps> = ({
  level,
  title,
  description,
  children,
  rightParam,
  isSelected,
  ...props
}) => (
  <StyledContainer $level={level} $isSelected={isSelected} {...props}>
    <Accordion
      isOpen={isSelected}
      identifier={`accordion_${title}`}
      header={
        <StyledHeaderContainer>
          <StyledHeader>
            <Title $level={level}>{title}</Title>
            {rightParam && (
              <RightParamContainer>{rightParam}</RightParamContainer>
            )}
          </StyledHeader>
          {description && <Description>{description}</Description>}
        </StyledHeaderContainer>
      }
    >
      {children}
    </Accordion>
  </StyledContainer>
);
