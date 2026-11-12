/** Clicks that selected content, shared across the selectors of a frame. */
const selectionClickEvents = new WeakSet<Event>();

/**
 * Marks a click as having selected content, so outer selectors don't select
 * their own content too, and the iframe click interceptor doesn't report it to
 * the editor as a click outside its drawers.
 *
 * @param event - Click that selected content
 */
export const markSelectionClick = (event: Event): void => {
  selectionClickEvents.add(event);
};

/**
 * Whether a click already selected content.
 *
 * @param event - Click to check
 */
export const isSelectionClick = (event: Event): boolean =>
  selectionClickEvents.has(event);
