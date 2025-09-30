/**
 * Utility function to determine if an HTML element is at the top of the viewport and not covered by other elements
 *
 * This function is specifically used by the RightDrawer component to ensure that click-outside
 * detection only triggers when the drawer is actually visible and not obscured by other UI elements.
 *
 * ## Algorithm
 * 1. **Viewport Check**: Verifies the element is within the visible viewport bounds
 * 2. **Coverage Check**: Uses `document.elementFromPoint()` to ensure no other elements are covering the drawer
 * 3. **Center Point Testing**: Tests the center-top point of the element for accurate detection
 *
 * ## Use Cases
 * - Click-outside detection for modal and drawer components
 * - Visibility validation for overlay components
 * - Z-index conflict resolution
 * - Accessibility focus management
 *
 * @param element - The HTML element to check for visibility and coverage
 * @returns Boolean indicating if the element is visible at the top and not covered by other elements
 *
 * @example
 * Basic usage in click-outside detection:
 * ```tsx
 * const handleClickOutside = (event: MouseEvent) => {
 *   if (!drawerRef.current) return;
 *
 *   const isVisible = isElementAtTopAndNotCovered(drawerRef.current);
 *   const isClickOutside = !drawerRef.current.contains(event.target as Node);
 *
 *   if (isVisible && isClickOutside) {
 *     closeDrawer();
 *   }
 * };
 * ```
 *
 * @example
 * Checking multiple overlays:
 * ```tsx
 * const overlays = document.querySelectorAll('.overlay');
 * const visibleOverlays = Array.from(overlays).filter(overlay =>
 *   isElementAtTopAndNotCovered(overlay as HTMLElement)
 * );
 * ```
 */
export const isElementAtTopAndNotCovered = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom - 1; // -1 to avoid the border of the element

  // Check if element is at the top of the viewport
  const isVisibleAtTop = elemTop >= 0 && elemBottom <= window.innerHeight;

  // Further check if the element is not covered by any other element at the center point of its top boundary
  if (isVisibleAtTop) {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + 10; // slight offset from the very top to ensure we're within the element bounds
    const topElement = document.elementFromPoint(centerX, centerY);

    // Check if our element is the topmost element at these coordinates or a child of the topmost element
    return element === topElement || element.contains(topElement);
  }

  return false;
};
