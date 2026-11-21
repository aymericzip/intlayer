/**
 * Background worker: opens the scanner in the browser sidebar when the
 * toolbar icon is clicked, instead of a popup over the page.
 *
 * - Chrome / Edge: the `side_panel` page opens on click through
 *   `chrome.sidePanel.setPanelBehavior`.
 * - Firefox: no `sidePanel` API, so the click toggles the `sidebar_action`.
 */

type FirefoxSidebarAction = {
  toggle: () => Promise<void>;
};

type FirefoxBrowserNamespace = {
  sidebarAction?: FirefoxSidebarAction;
};

const firefoxSidebarAction = (
  globalThis as { browser?: FirefoxBrowserNamespace }
).browser?.sidebarAction;

if (chrome.sidePanel) {
  void chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
} else if (firefoxSidebarAction) {
  // `toggle()` needs the user gesture: call it synchronously in the handler.
  chrome.action.onClicked.addListener(() => {
    void firefoxSidebarAction.toggle();
  });
}
