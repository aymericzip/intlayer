import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Container } from '../Container';

export type PopoverProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  identifier: string;
};

export type PopoverType = FC<PopoverProps> & {
  Detail: FC<DetailProps>;
};

/**
 * Trigger allowing to open a popover menu.
 *
 * Example:
 * ```jsx
 * <Popover identifier="popover">
 *   Open popover
 *
 *   <Popover.Detail identifier="popover">
 *     <div>Content</div>
 *   </Popover.Detail>
 * </Popover>
 * ```
 *
 * > Note Popover.Trigger can be replaced by a button. Don't add a button inside the trigger.
 */
export const Popover: PopoverType = ({
  children,
  className,
  identifier,
  ...props
}) => (
  <div
    className={cn('group/popover relative flex cursor-pointer', className)}
    aria-label={`Popover ${identifier}`}
    id={`unrollable-panel-button-${identifier}`}
    aria-haspopup
    {...props}
  >
    {children}
  </div>
);

export type DetailProps = HTMLAttributes<HTMLDivElement> & {
  isFocusable?: boolean;
  isHidden?: boolean;
  isOverable?: boolean;
  identifier: string;
  xAlign?: 'start' | 'end';
  yAlign?: 'bellow' | 'above';
  displayArrow?: boolean;
};

/**
 * Component that opens a popover menu when the trigger is clicked.
 *
 * Example:
 * ```jsx
 * <Popover.Detail identifier="popover">
 *   <div>Content</div>
 * </Popover.Detail>
 * ```
 */
const Detail: FC<DetailProps> = ({
  children,
  isHidden = undefined,
  isOverable = true,
  isFocusable = true,
  xAlign = 'start',
  yAlign = 'bellow',
  identifier,
  className,
  displayArrow = true,
  ...props
}) => (
  <Container
    transparency="sm"
    aria-hidden={isHidden}
    aria-labelledby={`unrollable-panel-button-${identifier}`}
    id={`unrollable-panel-${identifier}`}
    className={cn(
      'absolute z-[1000] min-w-full ring-neutral ring-1 rounded-md',

      /* Positioning */
      xAlign === 'start' && 'left-0',
      xAlign === 'end' && 'right-0',
      yAlign === 'bellow' && 'top-[calc(100%+1rem)]',
      yAlign === 'above' && 'bottom-[calc(100%+1rem)]',

      /* Arrow indicator */
      displayArrow &&
        'before:absolute before:z-[999] before:content-[""] before:w-0 before:h-0',

      /* Horizontal positioning */
      displayArrow && xAlign === 'start' && 'before:left-2',
      displayArrow && xAlign === 'end' && 'before:right-2',

      /* Arrow pointing up (when popover is below trigger) */
      displayArrow &&
        yAlign === 'bellow' &&
        'before:-top-[10px] before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-b-[10px] before:border-b-neutral',

      /* Arrow pointing down (when popover is above trigger) */
      displayArrow &&
        yAlign === 'above' &&
        'before:-bottom-[10px] before:border-l-[10px] before:border-l-transparent before:border-r-[10px] before:border-r-transparent before:border-t-[10px] before:border-t-neutral',

      /* Visibility management */
      'overflow-x-visible transition-all duration-400 ease-in-out opacity-0',
      isHidden !== false ? 'invisible' : 'delay-800 visible opacity-100',
      isOverable &&
        'group-hover/popover:visible group-hover/popover:opacity-100 group-hover/popover:delay-800',
      isFocusable &&
        'group-focus-within/popover:visible group-focus-within/popover:opacity-100 group-focus-within/popover:delay-800',
      className
    )}
    {...props}
  >
    {children}
  </Container>
);

Popover.Detail = Detail;
