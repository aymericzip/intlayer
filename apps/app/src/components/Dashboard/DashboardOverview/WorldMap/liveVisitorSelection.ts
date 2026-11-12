import type { LiveVisitor } from '@intlayer/backend-contract/analytics';

/**
 * What the live panel focuses on: a place clicked on the map or a minute
 * clicked on the activity chart (never both), and optionally one visitor.
 */
export type LiveVisitorSelection = {
  placeKey: string | null;
  /** UTC minute, `YYYY-MM-DDTHH:mm`, as in the live series. */
  minute: string | null;
  visitorId: string | null;
};

export const EMPTY_LIVE_VISITOR_SELECTION: LiveVisitorSelection = {
  placeKey: null,
  minute: null,
  visitorId: null,
};

/** Visitors active during `minute`. */
export const getVisitorsActiveAt = (
  visitors: LiveVisitor[],
  minute: string
): LiveVisitor[] =>
  visitors.filter((visitor) => visitor.activeMinutes.includes(minute));

/**
 * Selection after clicking the activity bar of `minute`: lists who was active
 * then (a lone visitor opens straight on their journey). Clicking the selected
 * bar again clears it.
 */
export const selectLiveMinute = (
  selection: LiveVisitorSelection,
  visitors: LiveVisitor[],
  minute: string
): LiveVisitorSelection => {
  if (selection.minute === minute && !selection.visitorId) {
    return EMPTY_LIVE_VISITOR_SELECTION;
  }

  const activeVisitors = getVisitorsActiveAt(visitors, minute);

  return {
    placeKey: null,
    minute,
    visitorId: activeVisitors.length === 1 ? activeVisitors[0].visitorId : null,
  };
};

/**
 * Minutes to keep emphasized on the activity chart: the picked visitor's
 * active minutes, else the picked minute. `null` when nothing is picked.
 */
export const getHighlightedMinutes = (
  selection: LiveVisitorSelection,
  visitors: LiveVisitor[]
): Set<string> | null => {
  const visitor = selection.visitorId
    ? visitors.find(({ visitorId }) => visitorId === selection.visitorId)
    : undefined;

  if (visitor) return new Set(visitor.activeMinutes);
  if (selection.minute) return new Set([selection.minute]);

  return null;
};
