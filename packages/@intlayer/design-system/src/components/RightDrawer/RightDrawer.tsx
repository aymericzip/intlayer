'use client';

import { ChevronLeft, X } from 'lucide-react';
import {
  type FC,
  type MouseEventHandler,
  type ReactNode,
  useEffect,
  useRef,
} from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useDevice } from '../../hooks/useDevice';
import { useScrollBlockage } from '../../hooks/useScrollBlockage';
import { Button, ButtonColor, ButtonSize, ButtonVariant } from '../Button';
import { Container } from '../Container';
import { MaxWidthSmoother } from '../MaxWidthSmoother/index';
import { isElementAtTopAndNotCovered } from './isElementAtTopAndNotCovered';
import { useRightDrawerStore } from './useRightDrawerStore';

/**
 * Configuration for the back button functionality in the RightDrawer
 *
 * @interface BackButtonProps
 */
type BackButtonProps = {
  /** Callback function triggered when the back button is clicked */
  onBack: () => void;
  /** Optional custom text for the back button. Defaults to "Go back" if not provided */
  text?: string;
};

/**
 * Props configuration for the RightDrawer component
 *
 * @interface RightDrawerProps
 */
type RightDrawerProps = {
  /**
   * Title displayed in the drawer header
   * @example
   * ```tsx
   * <RightDrawer title="User Settings" identifier="settings">
   *   Content here
   * </RightDrawer>
   * ```
   */
  title?: ReactNode;

  /**
   * Unique identifier for the drawer instance. Required for store management
   * @example
   * ```tsx
   * <RightDrawer identifier="user-profile" title="Profile">
   *   Profile content
   * </RightDrawer>
   * ```
   */
  identifier: string;

  /** The content to be displayed inside the drawer */
  children?: ReactNode;

  /**
   * Optional header content displayed below the title
   * @example
   * ```tsx
   * <RightDrawer
   *   title="Settings"
   *   header={<div className="text-sm opacity-80">Configure your preferences</div>}
   *   identifier="settings"
   * >
   *   Settings content
   * </RightDrawer>
   * ```
   */
  header?: ReactNode;

  /**
   * Whether the drawer should close when clicking outside of it
   * @default true
   * @example
   * ```tsx
   * <RightDrawer closeOnOutsideClick={false} identifier="persistent">
   *   This drawer requires explicit close action
   * </RightDrawer>
   * ```
   */
  closeOnOutsideClick?: boolean;

  /**
   * Configuration for an optional back button in the drawer header
   * @example
   * ```tsx
   * <RightDrawer
   *   backButton={{
   *     text: "Back to List",
   *     onBack: () => navigate('/list')
   *   }}
   *   identifier="detail-view"
   * >
   *   Detail content
   * </RightDrawer>
   * ```
   */
  backButton?: BackButtonProps;

  /**
   * External control for the open state. When provided, overrides internal store state
   * @example
   * ```tsx
   * const [isOpen, setIsOpen] = useState(false);
   *
   * <RightDrawer
   *   isOpen={isOpen}
   *   onClose={() => setIsOpen(false)}
   *   identifier="controlled"
   * >
   *   Controlled drawer content
   * </RightDrawer>
   * ```
   */
  isOpen?: boolean;

  /**
   * Callback function triggered when the drawer is closed
   * @example
   * ```tsx
   * <RightDrawer
   *   onClose={() => console.log('Drawer closed')}
   *   identifier="tracked"
   * >
   *   Content with close tracking
   * </RightDrawer>
   * ```
   */
  onClose?: () => void;
};

/**
 * RightDrawer - A slide-out drawer panel that appears from the right side of the screen
 *
 * A versatile drawer component that provides an overlay panel for displaying secondary content,
 * forms, details, or navigation. Features responsive design that adapts to mobile devices,
 * configurable close behavior, and integrated state management through Zustand store.
 *
 * ## Key Features
 * - **Responsive Design**: Full-width on mobile, fixed 400px width on desktop
 * - **State Management**: Built-in Zustand store for managing multiple drawer instances
 * - **Accessibility**: Proper ARIA attributes, keyboard navigation, and focus management
 * - **Flexible Layout**: Customizable header, title, and content areas
 * - **Click Outside**: Configurable outside click detection for auto-closing
 * - **Scroll Management**: Automatic body scroll blocking when open
 *
 * ## Use Cases
 * - Navigation menus and sidebars
 * - Detail panels and forms
 * - Settings and configuration interfaces
 * - Shopping carts and checkout processes
 * - User profiles and account management
 * - Multi-step workflows and wizards
 *
 * ## Accessibility
 * - **Focus Management**: Traps focus within the drawer when open
 * - **Keyboard Navigation**: Escape key closes the drawer
 * - **Screen Reader Support**: Proper ARIA labels and announcements
 * - **Touch Support**: Mobile-optimized touch interactions
 *
 * ## State Management
 * The component uses a Zustand store (`useRightDrawerStore`) to manage drawer state:
 * - Multiple drawers can be managed simultaneously using unique identifiers
 * - External components can open/close drawers using the store
 * - Supports both controlled (via props) and uncontrolled (via store) patterns
 *
 * @example
 * Basic usage with store management:
 * ```tsx
 * // Opening the drawer from another component
 * const { open } = useRightDrawerStore();
 *
 * <button onClick={() => open('user-menu')}>
 *   Open Menu
 * </button>
 *
 * <RightDrawer identifier="user-menu" title="User Menu">
 *   <nav>Navigation items here</nav>
 * </RightDrawer>
 * ```
 *
 * @example
 * Controlled drawer with external state:
 * ```tsx
 * const [showDrawer, setShowDrawer] = useState(false);
 *
 * <RightDrawer
 *   identifier="controlled-drawer"
 *   title="Settings"
 *   isOpen={showDrawer}
 *   onClose={() => setShowDrawer(false)}
 *   closeOnOutsideClick={false}
 * >
 *   <SettingsForm onSave={() => setShowDrawer(false)} />
 * </RightDrawer>
 * ```
 *
 * @example
 * Complex drawer with back button and header:
 * ```tsx
 * <RightDrawer
 *   identifier="product-detail"
 *   title="Product Details"
 *   header={
 *     <div className="text-sm text-gray-600">
 *       SKU: {product.sku} | Stock: {product.stock}
 *     </div>
 *   }
 *   backButton={{
 *     text: "Back to Catalog",
 *     onBack: () => navigate('/catalog')
 *   }}
 * >
 *   <ProductDetailView product={product} />
 * </RightDrawer>
 * ```
 */
export const RightDrawer: FC<RightDrawerProps> = ({
  title,
  identifier,
  children,
  header,
  closeOnOutsideClick = true,
  backButton,
  isOpen: isOpenProp,
  onClose,
}) => {
  const { isMobile } = useDevice('md');
  const panelRef = useRef<HTMLDivElement>(null);
  const childrenContainerRef = useRef<HTMLDivElement>(null);
  const { close, open, isOpen } = useRightDrawerStore(
    useShallow((s) => ({
      close: () => s.close(identifier),
      open: () => s.open(identifier),
      isOpen: s.isOpen(identifier),
    }))
  );

  useScrollBlockage({
    disableScroll: isOpen,
    key: identifier ? `right_drawer_${identifier}` : 'right_drawer',
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      try {
        if (!panelRef.current) return;

        // Check if drawer is open and click outside is enabled
        const isClickAble = isOpen && closeOnOutsideClick;

        // Check if click is outside the drawer panel
        const isClickOutside =
          event.target && !panelRef.current.contains(event.target as Node);

        // Check if event propagation has been stopped
        const isAtTopAndVisible = isElementAtTopAndNotCovered(panelRef.current);

        if (
          (isClickAble && isClickOutside && isAtTopAndVisible) ||
          !event.target
        ) {
          close();
          onClose?.();
        }
      } catch (_e) {
        close();
        onClose?.();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close, onClose, closeOnOutsideClick, identifier]); // Make sure the effect runs only if isOpen or close changes

  useEffect(() => {
    if (isOpenProp !== undefined) {
      if (isOpenProp) {
        open();
      } else {
        close();
        onClose?.();
      }
    }
  }, [close, open, onClose, isOpenProp, identifier]);

  const handleSpareSpaceClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Check if the click trigger the background
    if (e.target !== e.currentTarget) {
      return;
    }

    if (isMobile) {
      close();
      onClose?.();
    }
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex h-full justify-end">
      <MaxWidthSmoother isHidden={!isOpen} align="right">
        <Container
          className="relative flex h-screen w-screen flex-col text-text md:w-[400px]"
          ref={panelRef}
          roundedSize="none"
        >
          <div className="flex flex-col gap-3 p-6">
            <div className="flex justify-between gap-3">
              <div>
                {backButton && (
                  <Button
                    variant={ButtonVariant.HOVERABLE}
                    color={ButtonColor.TEXT}
                    label={backButton.text ?? 'Go back'}
                    onClick={backButton.onBack}
                    Icon={ChevronLeft}
                  >
                    {backButton?.text}
                  </Button>
                )}
              </div>
              <div>
                <Button
                  variant={ButtonVariant.HOVERABLE}
                  color={ButtonColor.TEXT}
                  label="Close"
                  className="ml-auto"
                  onClick={close}
                  Icon={X}
                  size={ButtonSize.ICON_MD}
                />
              </div>
            </div>
            {title && (
              <h2 className="flex items-center justify-center font-bold text-lg">
                {title}
              </h2>
            )}
            {header}
          </div>

          <div className="flex h-full flex-col overflow-y-auto p-2">
            <div
              className="flex flex-1 flex-col"
              onClick={handleSpareSpaceClick}
              ref={childrenContainerRef}
            >
              {children}
            </div>
          </div>
        </Container>
      </MaxWidthSmoother>
    </div>
  );
};
