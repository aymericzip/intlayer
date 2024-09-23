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
 *
 * > Note DropDown.Trigger can be replaced by a button. Don't add a button inside the trigger.
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
 * > Note DropDown.Trigger can be replaced by a button. Don't add a button inside the trigger.
 */
const Trigger: FC<TriggerProps> = ({
  children,
  identifier,
  className,
  ...props
}) => (
  <button
    className={cn('w-full cursor-pointer', className)}
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
  align = 'start',
  identifier,
  className,
  ...props
}) => (
  <div
    className={cn(
      'absolute top-[calc(100%+0.5rem)] z-[1000] min-w-full',
      align === 'start' && 'left-0',
      align === 'end' && 'right-0',
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
