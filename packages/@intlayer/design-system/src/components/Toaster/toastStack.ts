/** Number of toasts shown in the stack; older ones fade out behind. */
export const VISIBLE_TOAST_COUNT = 3;

/** Distance, in px, each toast behind the front one peeks out when collapsed. */
export const TOAST_STACK_PEEK = 14;

/** Scale lost by each toast behind the front one when collapsed. */
export const TOAST_STACK_SCALE_STEP = 0.05;

/** Space, in px, between toasts when the stack is expanded. */
export const TOAST_STACK_GAP = 12;

/** Where a toast sits in the stack. */
export type ToastStackPosition = {
  /** 0 for the newest open toast, increasing toward the back. */
  index: number;
  /** Distance, in px, from the anchored edge when the stack is expanded. */
  expandedOffset: number;
  /** Height, in px, of the front toast, shared by the toasts collapsed behind it. */
  frontHeight: number;
};

export type ToastStackLayout = {
  /** Position of every toast, keyed by id. */
  positions: Record<string, ToastStackPosition>;
  /** Height, in px, the stack takes when collapsed. */
  collapsedHeight: number;
  /** Height, in px, the stack takes when expanded. */
  expandedHeight: number;
};

/**
 * Lays out toasts, newest first, as a stack. Closed toasts take no room and
 * keep the slot of the next open toast while they animate out.
 *
 * @example
 * getToastStackLayout([{ id: 'b' }, { id: 'a' }], { a: 60, b: 80 });
 * // positions.a → { index: 1, expandedOffset: 92, frontHeight: 80 }
 */
export const getToastStackLayout = (
  toasts: ReadonlyArray<{ id: string; open?: boolean }>,
  heights: Readonly<Record<string, number>>
): ToastStackLayout => {
  const frontToast = toasts.find((toast) => toast.open !== false);
  const frontHeight = frontToast ? (heights[frontToast.id] ?? 0) : 0;
  const positions: Record<string, ToastStackPosition> = {};

  let openToastCount = 0;
  let expandedOffset = 0;
  let expandedHeight = 0;

  for (const toast of toasts) {
    positions[toast.id] = {
      index: openToastCount,
      expandedOffset,
      frontHeight,
    };

    if (toast.open === false) continue;

    const height = heights[toast.id] ?? 0;

    if (openToastCount < VISIBLE_TOAST_COUNT) {
      expandedHeight = expandedOffset + height;
    }

    openToastCount += 1;
    expandedOffset += height + TOAST_STACK_GAP;
  }

  const visibleToastCount = Math.min(openToastCount, VISIBLE_TOAST_COUNT);
  const collapsedHeight =
    visibleToastCount > 0
      ? frontHeight + (visibleToastCount - 1) * TOAST_STACK_PEEK
      : 0;

  return { positions, collapsedHeight, expandedHeight };
};
