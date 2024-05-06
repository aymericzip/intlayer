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
  tw`hover:bg-slate-100/30 [&:has(.section:hover)]:bg-transparent`,
  $level === 2 && tw`hover:bg-slate-100/30`,
  $level >= 3 && tw``,
  $isSelected === true && tw`bg-slate-100/40`,
]);

const Description = styled.p(tw`text-sm text-slate-400 pl-3`);

const Title = styled.span<{ $level: number }>(({ $level }) => [
  tw``,
  $level === 0 && tw`text-2xl`,
  $level === 1 && tw`text-xl`,
  $level === 2 && tw`text-lg`,
  $level >= 3 && tw`text-base`,
]);

const RightParamContainer = styled.div(
  tw`flex w-full items-center justify-between p-3 sm:w-auto`
);

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
        <div>
          <Title $level={level}>{title}</Title>
          <Description>{description}</Description>
          {rightParam && (
            <RightParamContainer>{rightParam}</RightParamContainer>
          )}
        </div>
      }
    >
      {children}
    </Accordion>
  </StyledContainer>
);
