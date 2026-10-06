import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';

/** Identifiers of the panels rendered in the dashboard right sidebar. */
export const DashboardRightPanelId = {
  VisualEditor: 'visual-editor',
  DictionaryEdition: 'dictionary-edition',
  DictionaryList: 'dictionary-list',
  TranslationStatus: 'translation-status',
  Chat: 'dashboard-chat',
} as const;

export type DashboardRightPanelId =
  (typeof DashboardRightPanelId)[keyof typeof DashboardRightPanelId];

/** Panel selection remembered across pages and visits. */
export type DashboardRightPanelSelection = {
  /** Panels the user opened, most recent first. */
  history: DashboardRightPanelId[];
  /** The user closed the sidebar: nothing shows until a panel is opened. */
  isClosed: boolean;
};

/** Panels tried, in order, until the user selects one (first visit, demo). */
export const DEFAULT_PANEL_PRIORITY: DashboardRightPanelId[] = [
  DashboardRightPanelId.VisualEditor,
  DashboardRightPanelId.DictionaryEdition,
  DashboardRightPanelId.Chat,
];

const SELECTION_STORAGE_KEY = 'dashboard-right-panel-selection';

/**
 * Resolves the panel to display: the most recently selected panel that has
 * content on the current page, or `null` (sidebar closed) when none has.
 */
export const resolveActivePanel = (
  selection: DashboardRightPanelSelection | undefined,
  availablePanels: ReadonlySet<DashboardRightPanelId>
): DashboardRightPanelId | null => {
  if (selection?.isClosed) return null;

  const candidates = selection?.history ?? DEFAULT_PANEL_PRIORITY;

  return candidates.find((panelId) => availablePanels.has(panelId)) ?? null;
};

/** Moves the selected panel to the front of the history and reopens the sidebar. */
export const selectPanel = (
  selection: DashboardRightPanelSelection | undefined,
  panelId: DashboardRightPanelId
): DashboardRightPanelSelection => ({
  history: [
    panelId,
    ...(selection?.history ?? []).filter(
      (selectedPanelId) => selectedPanelId !== panelId
    ),
  ],
  isClosed: false,
});

/**
 * Tracks which panels have content on the current page. A panel registers
 * while it is mounted, so a page without it can never display an empty sidebar.
 */
class PanelAvailabilityRegistry {
  private listeners = new Set<() => void>();
  private registrationCounts = new Map<DashboardRightPanelId, number>();
  private availablePanels: ReadonlySet<DashboardRightPanelId> = new Set();

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  getSnapshot = () => this.availablePanels;

  getServerSnapshot = () => EMPTY_AVAILABLE_PANELS;

  register = (panelId: DashboardRightPanelId) => {
    this.updateCount(panelId, 1);

    return () => this.updateCount(panelId, -1);
  };

  private updateCount = (panelId: DashboardRightPanelId, delta: number) => {
    const count = (this.registrationCounts.get(panelId) ?? 0) + delta;

    if (count > 0) this.registrationCounts.set(panelId, count);
    else this.registrationCounts.delete(panelId);

    const nextAvailablePanels = new Set(this.registrationCounts.keys());

    if (
      nextAvailablePanels.size === this.availablePanels.size &&
      [...nextAvailablePanels].every((id) => this.availablePanels.has(id))
    ) {
      return;
    }

    this.availablePanels = nextAvailablePanels;
    this.listeners.forEach((listener) => {
      listener();
    });
  };
}

/** Stable server snapshot, so `useSyncExternalStore` does not loop. */
const EMPTY_AVAILABLE_PANELS: ReadonlySet<DashboardRightPanelId> = new Set();

const panelAvailabilityRegistry = new PanelAvailabilityRegistry();

/**
 * Declares that a panel has content to show on the current page.
 *
 * @param panelId - Panel to register.
 * @param isAvailable - Set to `false` to withdraw the panel while mounted.
 */
export const useRegisterDashboardRightPanel = (
  panelId: DashboardRightPanelId,
  isAvailable = true
): void => {
  useEffect(() => {
    if (!isAvailable) return;

    return panelAvailabilityRegistry.register(panelId);
  }, [panelId, isAvailable]);
};

/**
 * Dashboard right sidebar state.
 *
 * The user selection is persisted; the displayed panel is the most recently
 * selected one available on the current page, so leaving a page closes its
 * panel and coming back restores it.
 */
export const useDashboardRightPanel = () => {
  const availablePanels = useSyncExternalStore(
    panelAvailabilityRegistry.subscribe,
    panelAvailabilityRegistry.getSnapshot,
    panelAvailabilityRegistry.getServerSnapshot
  );
  const [selection, setSelection, , resetSelection] = usePersistedStore<
    DashboardRightPanelSelection | undefined
  >(SELECTION_STORAGE_KEY);

  const activePanel = useMemo(
    () => resolveActivePanel(selection, availablePanels),
    [selection, availablePanels]
  );

  const open = useCallback(
    (panelId: DashboardRightPanelId) =>
      setSelection((previousSelection) =>
        selectPanel(previousSelection, panelId)
      ),
    [setSelection]
  );

  const close = useCallback(
    () =>
      setSelection((previousSelection) => ({
        history: previousSelection?.history ?? [],
        isClosed: true,
      })),
    [setSelection]
  );

  const toggle = useCallback(
    (panelId: DashboardRightPanelId) =>
      activePanel === panelId ? close() : open(panelId),
    [activePanel, close, open]
  );

  const isOpen = useCallback(
    (panelId: DashboardRightPanelId) => activePanel === panelId,
    [activePanel]
  );

  return {
    open,
    close,
    toggle,
    /** Forgets the selection: the default panel priority applies again. */
    resetSelection,
    activePanel,
    isOpen,
  };
};
