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
    className={cn(`group/dropdown relative flex`, className)}
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
const Trigger: FC<TriggerProps> = ({
  children,
  identifier,
  className,
  ...props
}) => (
  <button
    className={cn('cursor-pointer', className)}
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
  className,
  ...props
}) => (
  <div
    className={cn(
      'absolute right-0 top-[calc(100%+0.5rem)] z-[1000] min-w-full',
      className
    )}
    aria-hidden={isHidden}
    role="region"
    aria-labelledby={`unrollable-panel-button-${identifier}`}
    id={`unrollable-panel-${identifier}`}
  >
    <MaxHeightSmoother
      isHidden={isHidden}
      className={cn(
        'overflow-x-visible',
        isHidden !== false ? 'invisible' : 'visible',
        isOverable &&
          'group-hover/dropdown:visible group-hover/dropdown:grid-rows-[1fr]',
        isFocusable &&
          'group-focus-within/dropdown:visible group-focus-within/dropdown:grid-rows-[1fr]'
      )}
      {...props}
    >
      {children}
    </MaxHeightSmoother>
  </div>
);

DropDown.Trigger = Trigger;
DropDown.Panel = Panel;
