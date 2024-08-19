import type { FC } from 'react';
import { styled } from 'styled-components';
import tw from 'twin.macro';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import type { DropDownType, PanelProps, TriggerProps } from './types';

const StyledDropDown = tw.div`relative`;

/**
 * Trigger allowing to open a dropdown menu.
 *
 * Example:
 * ```jsx
 * <DropDown identifier="dropdown">
 *   <DropDown.Trigger>
 *     Open dropdown
 *   </DropDown.Trigger>
 *
 *   <DropDown.Panel identifier="dropdown">
 *     <div>Content</div>
 *   </DropDown.Panel>
 * </DropDown>
 * ```
 */
export const DropDown: DropDownType = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <StyledDropDown
    className={`group ${className}`}
    aria-label={`DropDown ${identifier}`}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </StyledDropDown>
);

const StyledDropDownTriggerButton = tw.button`cursor-pointer`;

/**
 * Trigger allowing to open a dropdown menu.
 *
 * Example:
 * ```jsx
 * <DropDown.Trigger identifier="dropdown">
 *   <div>Open dropdown</div>
 * </DropDown.Trigger>
 * ```
 *
 * > Note: Don't add button inside the trigger, it will be automatically added by the component.
 */
const Trigger: FC<TriggerProps> = ({ children, identifier, ...props }) => (
  <StyledDropDownTriggerButton
    aria-label={`Open panel ${identifier}`}
    {...props}
  >
    {children}
  </StyledDropDownTriggerButton>
);

const StyledPanelContainer = tw.div`absolute right-0 translate-y-2 min-w-full z-[1000]`;
const StyledMaxHeightSmoother = styled(MaxHeightSmoother)<{
  isHidden: boolean | undefined;
  $isOverable: boolean;
  $isFocusable: boolean;
}>`
  ${tw`overflow-x-hidden`}
  ${({ isHidden }) => (isHidden !== false ? tw`invisible` : tw`visible`)}
  ${({ $isOverable }) =>
    $isOverable
      ? tw`group-hover:grid-rows-[1fr] group-hover:overflow-x-auto group-hover:visible`
      : ''}
  ${({ $isFocusable }) =>
    $isFocusable
      ? tw`group-focus-within:grid-rows-[1fr] group-focus-within:overflow-x-auto group-focus-within:visible`
      : ''}
`;

/**
 * Component that opens a dropdown menu when the trigger is clicked.
 *
 * Example:
 * ```jsx
 * <DropDown.Panel identifier="dropdown">
 *   <div>Content</div>
 * </DropDown.Panel>
 * ```
 */
const Panel: FC<PanelProps> = ({
  children,
  isHidden = undefined,
  isOverable = false,
  isFocusable = false,
  identifier,
  ...props
}) => (
  <StyledPanelContainer
    aria-hidden={isHidden}
    role="region"
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
  </StyledPanelContainer>
);

DropDown.Trigger = Trigger;
DropDown.Panel = Panel;
