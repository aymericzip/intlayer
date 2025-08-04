export const isElementAtTopAndNotCovered = (element: HTMLElement) => {
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
