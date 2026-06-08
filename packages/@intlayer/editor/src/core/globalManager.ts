import type { EditorStateManager } from './EditorStateManager';

/**
 * Type for storing custom properties on the global window object.
 * Used to safely attach singleton instances across multiple module instances.
 */
type WindowWithEditorGlobals = typeof window & {
  [MANAGER_KEY]?: EditorStateManager | null;
  [EVENTS_KEY]?: EventTarget;
  [key: string]: unknown;
};

/**
 * Keys on window used to share the singleton across multiple module instances.
 * When bundlers include @intlayer/editor more than once (e.g. framework package +
 * app), each copy has its own module-level variables. Using window ensures they
 * all read/write the same manager and event-target.
 */
const MANAGER_KEY = '__intlayer_editor_manager__';
const EVENTS_KEY = '__intlayer_editor_manager_events__';

/**
 * Retrieves or creates a shared EventTarget for global editor manager events.
 * In browser environments, stores the EventTarget on window to ensure sharing
 * across multiple module instances. In SSR environments, creates a fresh
 * EventTarget (no sharing needed on server-side).
 *
 * @returns The shared EventTarget instance for dispatching manager change events
 * @private
 */
const getEventTarget = (): EventTarget => {
  if (typeof window === 'undefined') {
    // SSR fallback — create a fresh one (no sharing needed server-side)
    return new EventTarget();
  }

  const windowGlobals = window as WindowWithEditorGlobals;
  if (!windowGlobals[EVENTS_KEY]) {
    windowGlobals[EVENTS_KEY] = new EventTarget();
  }

  return windowGlobals[EVENTS_KEY] as EventTarget;
};

/**
 * Retrieves the global editor state manager instance.
 * Returns null if no manager has been set or in SSR environments where
 * window is undefined.
 *
 * @returns The global EditorStateManager instance or null if not set
 */
export const getGlobalEditorManager = (): EditorStateManager | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const windowGlobals = window as WindowWithEditorGlobals;
  const manager = windowGlobals[MANAGER_KEY];

  return manager ?? null;
};

/**
 * Sets the global editor state manager instance and notifies all listeners
 * of the change through a CustomEvent.
 *
 * @param manager - The EditorStateManager instance to set globally, or null to clear it
 */
export const setGlobalEditorManager = (
  manager: EditorStateManager | null
): void => {
  if (typeof window !== 'undefined') {
    const windowGlobals = window as WindowWithEditorGlobals;
    windowGlobals[MANAGER_KEY] = manager;
  }

  const eventTarget = getEventTarget();

  eventTarget.dispatchEvent(
    new CustomEvent<EditorStateManager | null>('change', { detail: manager })
  );
};

/**
 * Registers a callback function to be invoked whenever the global editor
 * manager changes. Useful for reactive updates across the application.
 *
 * @param changeCallback - Function to invoke with the new manager state whenever it changes
 * @returns An unsubscribe function that removes the listener when called
 *
 * @example
 * ```typescript
 * const unsubscribe = onGlobalEditorManagerChange((manager) => {
 *   console.log('Manager updated:', manager);
 * });
 *
 * // Later, clean up the listener
 * unsubscribe();
 * ```
 */
export const onGlobalEditorManagerChange = (
  changeCallback: (manager: EditorStateManager | null) => void
): (() => void) => {
  const eventTarget = getEventTarget();

  const eventHandler = (event: Event) => {
    const customEvent = event as CustomEvent<EditorStateManager | null>;
    changeCallback(customEvent.detail);
  };

  eventTarget.addEventListener('change', eventHandler);

  return () => {
    eventTarget.removeEventListener('change', eventHandler);
  };
};
