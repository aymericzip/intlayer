import type { FC } from 'react';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import type { DropDownType, PanelProps, TriggerProps } from './types';

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
  <div
    className={cn('group relative', className)}
    aria-label={`DropDown ${identifier}`}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </div>
);

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
  <button
    className="cursor-pointer"
    aria-label={`Open panel ${identifier}`}
    {...props}
  >
    {children}
  </button>
);

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
  <div
    className="absolute right-0 z-[1000] min-w-full translate-y-2"
    aria-hidden={isHidden}
    role="region"
    aria-labelledby={`unrollable-panel-button-${identifier}`}
    id={`unrollable-panel-${identifier}`}
  >
    <MaxHeightSmoother
      className={cn(
        'overflow-x-hidden',
        isHidden !== false ? 'invisible' : 'visible',
        isOverable &&
          'group-hover:visible group-hover:grid-rows-[1fr] group-hover:overflow-x-auto',
        isFocusable &&
          'group-focus-within:visible group-focus-within:grid-rows-[1fr] group-focus-within:overflow-x-auto'
      )}
      {...props}
    >
      {children}
    </MaxHeightSmoother>
  </div>
);

DropDown.Trigger = Trigger;
DropDown.Panel = Panel;
