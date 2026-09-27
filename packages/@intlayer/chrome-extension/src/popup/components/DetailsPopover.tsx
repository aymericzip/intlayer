import { Popover } from '@intlayer/design-system/popover';
import type { ComponentChildren, FunctionComponent } from 'preact';

/**
 * Hover / focus popover of the popup, sized for its narrow viewport. The
 * trigger stays inline; the detail panel is clamped to the viewport by the
 * design-system popover.
 */
export const DetailsPopover: FunctionComponent<{
  /** Unique id of the popover on the page. */
  identifier: string;
  /** Element the popover is attached to. */
  trigger: ComponentChildren;
  children: ComponentChildren;
}> = ({ identifier, trigger, children }) => (
  <Popover identifier={identifier}>
    {trigger}
    <Popover.Detail
      identifier={identifier}
      className="flex max-h-72 w-80 flex-col gap-2 overflow-auto bg-background p-3 text-left text-xs"
      isFocusable
      isOverable
      displayArrow={false}
    >
      {children}
    </Popover.Detail>
  </Popover>
);
