'use client';

import { cn } from '@utils/cn';
import { scheduleFrameTask } from '@utils/scheduleFrameTask';
import {
  type ComponentProps,
  type FC,
  type Ref,
  type ToggleEvent,
  useEffect,
  useRef,
} from 'react';
import { Container } from '../Container';
import {
  type PopoverXAlign,
  type PopoverYAlign,
  usePopoverIds,
} from './static';

/** Gap kept between the trigger and the panel, and from the viewport edges. */
const PANEL_GAP = 8;

/** Horizontal alignment of a `Popover.Panel` against its trigger */
export type PopoverPanelXAlign = Exclude<PopoverXAlign, 'center'>;

/** Props of the click-toggled `Popover.Panel` */
export type PopoverPanelProps = Omit<
  ComponentProps<typeof Container>,
  'popover' | 'ref'
> & {
  /** Identifier matching the `Popover` root and its `Popover.Trigger` */
  identifier: string;
  /** Preferred horizontal alignment, flipped when the viewport is too narrow */
  xAlign?: PopoverPanelXAlign | `${PopoverPanelXAlign}`;
  /** Preferred vertical side, flipped when the viewport is too short */
  yAlign?: PopoverYAlign | `${PopoverYAlign}`;
  /** Called when the panel opens or closes, before the change is painted */
  onOpenChange?: (isOpen: boolean) => void;
  /** Panel element, e.g. to close it with `hidePopover()` */
  ref?: Ref<HTMLDivElement>;
};

/**
 * Places the panel next to its trigger, on the preferred side when it fits,
 * otherwise on the side with the most room, and always inside the viewport.
 */
const positionPanel = (
  trigger: HTMLElement,
  panel: HTMLElement,
  xAlign: PopoverPanelXAlign,
  yAlign: PopoverYAlign
) => {
  const triggerRect = trigger.getBoundingClientRect();
  const { offsetWidth: panelWidth, offsetHeight: panelHeight } = panel;
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;

  // `start`/`end` are logical: a start-aligned panel grows leftwards in RTL
  const isRightToLeft = getComputedStyle(trigger).direction === 'rtl';
  const isLeftAligned = (xAlign === 'start') !== isRightToLeft;
  const leftAlignedLeft = triggerRect.left;
  const rightAlignedLeft = triggerRect.right - panelWidth;
  const fitsLeftAligned =
    leftAlignedLeft + panelWidth <= viewportWidth - PANEL_GAP;
  const fitsRightAligned = rightAlignedLeft >= PANEL_GAP;
  const left = isLeftAligned
    ? fitsLeftAligned || !fitsRightAligned
      ? leftAlignedLeft
      : rightAlignedLeft
    : fitsRightAligned || !fitsLeftAligned
      ? rightAlignedLeft
      : leftAlignedLeft;

  const spaceBelow = viewportHeight - triggerRect.bottom - PANEL_GAP * 2;
  const spaceAbove = triggerRect.top - PANEL_GAP * 2;
  const fitsBelow = spaceBelow >= panelHeight;
  const fitsAbove = spaceAbove >= panelHeight;
  const isAbove =
    yAlign === 'above'
      ? fitsAbove || (!fitsBelow && spaceAbove > spaceBelow)
      : !fitsBelow && (fitsAbove || spaceAbove > spaceBelow);
  const top = isAbove
    ? triggerRect.top - PANEL_GAP - panelHeight
    : triggerRect.bottom + PANEL_GAP;

  const maximumLeft = viewportWidth - panelWidth - PANEL_GAP;
  const maximumTop = viewportHeight - panelHeight - PANEL_GAP;

  panel.style.left = `${Math.max(PANEL_GAP, Math.min(left, maximumLeft))}px`;
  panel.style.top = `${Math.max(PANEL_GAP, Math.min(top, maximumTop))}px`;
};

/**
 * Popover Panel Component
 *
 * Click-toggled counterpart of `Popover.Detail`, opened by the
 * `Popover.Trigger` of the same identifier. The panel is a native `popover`,
 * rendered in the top layer: it escapes `overflow` clipping and sticky
 * stacking contexts, and closes on outside click or Escape.
 *
 * Features:
 * - Native toggle, light dismiss and focus return
 * - Placed next to the trigger, flipped when the viewport lacks room
 * - Follows the trigger on scroll and resize while open
 *
 * @example
 * ```jsx
 * <Popover identifier="type-picker">
 *   <Popover.Trigger identifier="type-picker">Text</Popover.Trigger>
 *   <Popover.Panel identifier="type-picker" onOpenChange={setIsOpen}>
 *     {isOpen && <TypeList />}
 *   </Popover.Panel>
 * </Popover>
 * ```
 */
export const PopoverPanel: FC<PopoverPanelProps> = ({
  identifier,
  xAlign = 'start',
  yAlign = 'below',
  onOpenChange,
  onBeforeToggle,
  className,
  ref,
  ...props
}) => {
  const { triggerId, panelId } = usePopoverIds(identifier);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const setPanelElement = (element: HTMLDivElement | null) => {
    panelRef.current = element;

    if (typeof ref === 'function') return ref(element);
    if (ref) ref.current = element;
  };

  useEffect(() => {
    const panelElement = panelRef.current;

    if (!panelElement) return;

    const updatePosition = () => {
      const triggerElement = document.getElementById(triggerId);

      if (!triggerElement || !panelElement.matches(':popover-open')) return;

      positionPanel(triggerElement, panelElement, xAlign, yAlign);
    };

    /** Cancels the update queued for the next frame, if any. */
    let cancelScheduledUpdate: (() => void) | null = null;

    const scheduleUpdate = () => {
      if (cancelScheduledUpdate) return;

      cancelScheduledUpdate = scheduleFrameTask(() => {
        cancelScheduledUpdate = null;
        updatePosition();
      });
    };

    /*
     * Fires after layout and before paint, both when the panel opens (its size
     * leaves zero) and when its content grows or shrinks, so it is never
     * painted at a stale position.
     */
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(panelElement);

    const handleToggle = (event: Event) => {
      const isOpen = (event as globalThis.ToggleEvent).newState === 'open';

      if (isOpen) {
        window.addEventListener('scroll', scheduleUpdate, {
          passive: true,
          capture: true,
        });
        window.addEventListener('resize', scheduleUpdate, { passive: true });
        return;
      }

      window.removeEventListener('scroll', scheduleUpdate, true);
      window.removeEventListener('resize', scheduleUpdate);
    };

    panelElement.addEventListener('toggle', handleToggle);

    return () => {
      cancelScheduledUpdate?.();
      resizeObserver.disconnect();
      panelElement.removeEventListener('toggle', handleToggle);
      window.removeEventListener('scroll', scheduleUpdate, true);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [triggerId, xAlign, yAlign]);

  const handleBeforeToggle = (event: ToggleEvent<HTMLDivElement>) => {
    onBeforeToggle?.(event);
    onOpenChange?.(event.newState === 'open');
  };

  return (
    <Container
      transparency="xs"
      roundedSize="md"
      role="group"
      aria-labelledby={triggerId}
      {...props}
      ref={setPanelElement}
      id={panelId}
      popover="auto"
      onBeforeToggle={handleBeforeToggle}
      className={cn(
        // The UA places a popover in the middle of the viewport; it is
        // positioned against the trigger instead. Container is `flex`, which
        // would override the closed popover's `display: none`.
        'fixed inset-auto m-0 hidden ring-1 ring-neutral [&:popover-open]:flex',
        className
      )}
    />
  );
};
