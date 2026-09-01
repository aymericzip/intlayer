import { useSyncExternalStore } from 'react';

type PanelState = { activePanel: string | null };

/**
 * Snapshot handed to the server render and to hydration. It has to be the same
 * reference on every call, otherwise `useSyncExternalStore` sees a new value
 * each render and loops.
 */
const SERVER_PANEL_STATE: PanelState = { activePanel: null };

class PanelObservable {
  private listeners = new Set<() => void>();
  private state: PanelState = { activePanel: null };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.state;

  getServerSnapshot = () => SERVER_PANEL_STATE;

  open = (id: string) => {
    const next = this.state.activePanel === id ? null : id;
    if (this.state.activePanel === next) return;
    this.state = { activePanel: next };
    this.emit();
  };

  close = () => {
    if (!this.state.activePanel) return;
    this.state = { activePanel: null };
    this.emit();
  };

  private emit = () => {
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

export const dashboardRightPanelManager = new PanelObservable();

export const useDashboardRightPanel = () => {
  const state = useSyncExternalStore(
    dashboardRightPanelManager.subscribe,
    dashboardRightPanelManager.getSnapshot,
    dashboardRightPanelManager.getServerSnapshot
  );

  return {
    open: dashboardRightPanelManager.open,
    close: dashboardRightPanelManager.close,
    activePanel: state.activePanel,
    isOpen: (id: string) => state.activePanel === id,
  };
};
