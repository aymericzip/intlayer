// Listener for messages from the iframe
export const mergeIframeClick = (event: MessageEvent) => {
  // Simulate or merge the iframe message with a click event
  const simulatedMouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  const simulatedClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  // Optionally attach additional properties from the iframe message
  Object.assign(simulatedClickEvent, { iframeData: event });
  Object.assign(simulatedMouseDownEvent, { iframeData: event });

  // Dispatch the simulated click event on the window or a specific element
  window.dispatchEvent(simulatedClickEvent);
  window.dispatchEvent(simulatedMouseDownEvent);
};
