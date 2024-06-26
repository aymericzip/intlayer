import type { FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import type { UnrollablePanelTriggerProps, UnrollablePanelType } from './types';

const StyledDropDownTriggerButton = tw.button`relative cursor-pointer`;

const DropDownTrigger: FC<UnrollablePanelTriggerProps> = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <StyledDropDownTriggerButton
    className={`group ${className}`}
    aria-label={`Open panel ${identifier}`}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </StyledDropDownTriggerButton>
);

const StyledDropDownContainer = tw.div`absolute right-0 translate-y-2 min-w-full`;
const StyledMaxHeightSmoother = styled(MaxHeightSmoother)<{
  isHidden: boolean | undefined;
  $isOverable: boolean;
  $isFocusable: boolean;
}>`
  ${tw`overflow-x-hidden`}
  ${({ $isOverable }) =>
    $isOverable
      ? tw`group-hover:grid-rows-[1fr] group-hover:overflow-x-auto`
      : ''}
  ${({ $isFocusable }) =>
    $isFocusable
      ? tw`group-focus:grid-rows-[1fr] group-focus:overflow-x-auto`
      : ''}
`;

export const DropDown: UnrollablePanelType = ({
  children,
  isHidden = undefined,
  isOverable = false,
  isFocusable = false,
  identifier,
  ...props
}) => (
  <StyledDropDownContainer
    aria-hidden={isHidden}
    aria-labelledby={`unrollable-panel-button-${identifier}`}
    id={`unrollable-panel-${identifier}`}
  >
    <StyledMaxHeightSmoother
      $isOverable={isOverable}
      $isFocusable={isFocusable}
      isHidden={isHidden}
      {...props}
    >
      {children}
    </StyledMaxHeightSmoother>
  </StyledDropDownContainer>
);

DropDown.Trigger = DropDownTrigger;
