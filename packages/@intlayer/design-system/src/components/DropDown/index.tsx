import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { MaxHeightSmoother } from '../MaxHeightSmoother';

export type DropDownProps = HTMLAttributes<HTMLDivElement> & {
  identifier: string;
};

export type DropDownType = FC<DropDownProps> & {
  Trigger: FC<TriggerProps>;
  Panel: FC<PanelProps>;
};

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

export type TriggerProps = HTMLAttributes<HTMLButtonElement> & {
  identifier: string;
};

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
    onClick={(e) => {
      // Ensure focus behavior is consistent across all mobile browsers
      (e.currentTarget as HTMLButtonElement).focus();
    }}
    onBlur={(e) => (e.currentTarget as HTMLButtonElement).blur()}
    {...props}
  >
    {children}
  </button>
);

export enum DropDownAlign {
  START = 'start',
  END = 'end',
}

export type PanelProps = HTMLAttributes<HTMLDivElement> & {
  isFocusable?: boolean;
  isHidden?: boolean;
  isOverable?: boolean;
  identifier: string;
  align?: DropDownAlign;
};

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
  align = DropDownAlign.START,
  identifier,
  className,
  ...props
}) => (
  <div
    className={cn(
      'absolute top-[calc(100%+0.5rem)] z-[1000] min-w-full',
      align === DropDownAlign.START && 'left-0',
      align === DropDownAlign.END && 'right-0',
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
