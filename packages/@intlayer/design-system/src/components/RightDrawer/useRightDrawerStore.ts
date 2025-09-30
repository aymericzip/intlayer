import { create } from 'zustand';

/**
 * Type definition for the RightDrawer Zustand store state and actions
 *
 * @interface RightDrawerStore
 */
type RightDrawerStore = {
  /** Record of drawer identifiers and their open/closed states */
  drawers: Record<string, boolean>;

  /**
   * Opens a drawer with the specified identifier
   * @param key - Unique identifier for the drawer instance
   * @example
   * ```tsx
   * const { open } = useRightDrawerStore();
   * open('user-profile'); // Opens the drawer with identifier 'user-profile'
   * ```
   */
  open: (key: string) => void;

  /**
   * Closes a drawer with the specified identifier
   * @param key - Unique identifier for the drawer instance
   * @example
   * ```tsx
   * const { close } = useRightDrawerStore();
   * close('user-profile'); // Closes the drawer with identifier 'user-profile'
   * ```
   */
  close: (key: string) => void;

  /**
   * Checks if a drawer with the specified identifier is currently open
   * @param key - Unique identifier for the drawer instance
   * @returns Boolean indicating if the drawer is open (defaults to false if not found)
   * @example
   * ```tsx
   * const { isOpen } = useRightDrawerStore();
   * const isProfileOpen = isOpen('user-profile');
   * ```
   */
  isOpen: (key: string) => boolean;
};

/**
 * Zustand store for managing RightDrawer component states
 *
 * This store provides centralized state management for multiple drawer instances,
 * allowing different parts of the application to open, close, and check the status
 * of drawers using unique identifiers.
 *
 * ## Features
 * - **Multi-instance Management**: Handle multiple drawers simultaneously
 * - **Simple API**: Open, close, and check drawer states with string identifiers
 * - **Persistent State**: Drawer states persist until explicitly changed
 * - **Type Safety**: Full TypeScript support with proper type inference
 *
 * ## Usage Patterns
 *
 * ### Basic Usage
 * ```tsx
 * import { useRightDrawerStore } from './useRightDrawerStore';
 *
 * function NavigationButton() {
 *   const { open } = useRightDrawerStore();
 *
 *   return (
 *     <button onClick={() => open('main-menu')}>
 *       Open Menu
 *     </button>
 *   );
 * }
 * ```
 *
 * ### Conditional Rendering
 * ```tsx
 * function ConditionalContent() {
 *   const isMenuOpen = useRightDrawerStore(state => state.isOpen('main-menu'));
 *
 *   return (
 *     <div>
 *       {isMenuOpen ? 'Menu is open' : 'Menu is closed'}
 *     </div>
 *   );
 * }
 * ```
 *
 * ### Multiple Drawers
 * ```tsx
 * function MultiDrawerManager() {
 *   const { open, close, isOpen } = useRightDrawerStore();
 *
 *   return (
 *     <div>
 *       <button onClick={() => open('cart')}>Open Cart</button>
 *       <button onClick={() => open('profile')}>Open Profile</button>
 *       <button onClick={() => {
 *         close('cart');
 *         close('profile');
 *       }}>Close All</button>
 *
 *       <div>
 *         Cart: {isOpen('cart') ? 'Open' : 'Closed'}
 *         Profile: {isOpen('profile') ? 'Open' : 'Closed'}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns RightDrawerStore instance with drawer management capabilities
 */
export const useRightDrawerStore = create<RightDrawerStore>((set, get) => ({
  drawers: {},
  open: (key: string) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: true,
      },
    })),
  close: (key: string) =>
    set((state) => ({
      drawers: {
        ...state.drawers,
        [key]: false,
      },
    })),
  isOpen: (key: string) => get().drawers[key] ?? false,
}));
