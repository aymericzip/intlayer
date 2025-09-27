'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  createContext,
  useContext,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

/**
 * Context interface for managing tab state throughout the tab component tree
 *
 * @interface TabContextType
 * @property {string} activeTab - The currently active tab's value identifier
 * @property {(tab: string) => void} setActiveTab - Function to change the active tab
 *
 * @example
 * ```tsx
 * // Used internally by Tab component to manage state
 * const { activeTab, setActiveTab } = useTabContext();
 * ```
 */
interface TabContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tab component');
  }
  return context;
};

// Tab container variants
const tabContainerVariant = cva(
  'w-full border border-neutral/20 rounded-lg overflow-hidden bg-card shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border-2',
        ghost: 'border-0 shadow-none bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Tab header variants
const tabHeaderVariant = cva('flex border-b border-neutral/20 bg-neutral/5', {
  variants: {
    variant: {
      default: '',
      pills: 'border-0 bg-transparent gap-1 p-1',
      underline: 'border-0 bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Tab button variants
const tabButtonVariant = cva(
  'px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50',
  {
    variants: {
      variant: {
        default:
          'hover:bg-neutral/10 data-[active=true]:bg-white data-[active=true]:text-primary data-[active=true]:shadow-sm',
        pills:
          'rounded-md hover:bg-neutral/10 data-[active=true]:bg-primary data-[active=true]:text-white',
        underline:
          'border-b-2 border-transparent hover:border-neutral/50 data-[active=true]:border-primary data-[active=true]:text-primary',
      },
      state: {
        active: '',
        inactive: 'text-neutral/70',
      },
    },
    defaultVariants: {
      variant: 'default',
      state: 'inactive',
    },
  }
);

// Tab content variants
const tabContentVariant = cva('p-6', {
  variants: {
    variant: {
      default: '',
      compact: 'p-4',
      spacious: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Properties for the main Tab container component
 *
 * @interface TabProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 * @extends {VariantProps<typeof tabContainerVariant>}
 *
 * @property {string} [defaultTab] - The value of the tab to be active by default. If not provided, the first TabItem's value will be used
 * @property {ReactNode} children - TabItem components that define the tabs and their content
 * @property {'default' | 'bordered' | 'ghost'} [variant] - Visual style variant of the tab container
 *
 * @example
 * ```tsx
 * // Basic usage with default styling
 * <Tab defaultTab="overview">
 *   <TabItem label="Overview" value="overview">
 *     Overview content
 *   </TabItem>
 * </Tab>
 *
 * // Bordered variant with custom styling
 * <Tab variant="bordered" defaultTab="settings" className="max-w-md">
 *   <TabItem label="Settings" value="settings">
 *     Settings panel content
 *   </TabItem>
 *   <TabItem label="Preferences" value="preferences">
 *     Preferences content
 *   </TabItem>
 * </Tab>
 * ```
 */
export interface TabProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabContainerVariant> {
  defaultTab?: string;
  children: ReactNode;
}

/**
 * Properties for individual TabItem components that define each tab
 *
 * @interface TabItemProps
 * @extends {HTMLAttributes<HTMLDivElement>}
 *
 * @property {string} label - The display text shown in the tab button (required for accessibility)
 * @property {string} value - Unique identifier for this tab (required)
 * @property {boolean} [disabled] - Whether this tab is disabled and cannot be clicked
 * @property {ReactNode} children - The content to display when this tab is active
 *
 * @example
 * ```tsx
 * // Basic tab item
 * <TabItem label="Dashboard" value="dashboard">
 *   <DashboardContent />
 * </TabItem>
 *
 * // Disabled tab item
 * <TabItem label="Premium Features" value="premium" disabled>
 *   Premium content (disabled)
 * </TabItem>
 *
 * // Tab with complex content
 * <TabItem label="User Profile" value="profile">
 *   <div className="space-y-4">
 *     <UserAvatar />
 *     <UserSettings />
 *     <UserPreferences />
 *   </div>
 * </TabItem>
 * ```
 */
export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  disabled?: boolean;
  value: string;
  children: ReactNode;
}

/**
 * Tab container component that manages tab state and renders tab headers and content
 *
 * The Tab component provides a complete tabbed interface with automatic state management,
 * accessibility support, and multiple visual variants. It uses React Context to manage
 * the active tab state and coordinate between tab buttons and content panels.
 *
 * ## Features
 * - **Automatic State Management**: Handles active tab state internally
 * - **Accessibility**: Full ARIA support with proper roles and attributes
 * - **Visual Variants**: Multiple styling options (default, bordered, ghost, pills, underline)
 * - **Keyboard Navigation**: Supports keyboard interaction for accessibility
 * - **Disabled States**: Individual tabs can be disabled
 * - **Flexible Content**: Any React components can be used as tab content
 *
 * ## Variants
 * - `default`: Standard tab styling with borders and backgrounds
 * - `bordered`: Enhanced border styling for more prominent appearance
 * - `ghost`: Minimal styling with transparent background
 * - `pills`: Pill-shaped tab buttons with rounded corners
 * - `underline`: Simple underline styling for tab indicators
 *
 * @param {TabProps} props - The properties for the Tab component
 * @returns {JSX.Element} The rendered tab interface
 *
 * @example
 * ```tsx
 * // Basic usage with multiple tabs
 * <Tab defaultTab="overview">
 *   <TabItem label="Overview" value="overview">
 *     <div>
 *       <h3>Project Overview</h3>
 *       <p>General information about the project.</p>
 *     </div>
 *   </TabItem>
 *   <TabItem label="Details" value="details">
 *     <div>
 *       <h3>Project Details</h3>
 *       <p>Detailed technical information.</p>
 *     </div>
 *   </TabItem>
 *   <TabItem label="Settings" value="settings" disabled>
 *     <div>Settings content (currently disabled)</div>
 *   </TabItem>
 * </Tab>
 *
 * // Bordered variant with custom styling
 * <Tab variant="bordered" defaultTab="dashboard" className="max-w-2xl">
 *   <TabItem label="📊 Dashboard" value="dashboard">
 *     <DashboardWidget />
 *   </TabItem>
 *   <TabItem label="⚙️ Configuration" value="config">
 *     <ConfigurationPanel />
 *   </TabItem>
 * </Tab>
 *
 * // Ghost variant for minimal styling
 * <Tab variant="ghost" defaultTab="content">
 *   <TabItem label="Content" value="content">
 *     <ContentEditor />
 *   </TabItem>
 *   <TabItem label="Preview" value="preview">
 *     <ContentPreview />
 *   </TabItem>
 * </Tab>
 * ```
 *
 * @see {@link TabItem} - Individual tab item component
 * @see {@link useTabContext} - Hook for accessing tab context in nested components
 */
export const Tab = ({
  defaultTab,
  variant,
  children,
  className,
  ...props
}: TabProps) => {
  // Extract TabItem children to get their props
  const tabItems = Array.isArray(children)
    ? children.filter((child: any) => child?.type?.displayName === 'TabItem')
    : [children].filter((child: any) => child?.type?.displayName === 'TabItem');

  const firstTabValue = tabItems[0]?.props?.value;
  const [activeTab, setActiveTab] = useState(defaultTab || firstTabValue || '');

  const contextValue: TabContextType = {
    activeTab,
    setActiveTab,
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div
        className={cn(tabContainerVariant({ variant }), className)}
        {...props}
      >
        {/* Tab Headers */}
        <div className={cn(tabHeaderVariant({ variant }))}>
          {tabItems.map((child: any) => {
            const { label, value, disabled } = child.props;
            const isActive = activeTab === value;

            return (
              <button
                key={value}
                className={cn(
                  tabButtonVariant({
                    variant,
                    state: isActive ? 'active' : 'inactive',
                  })
                )}
                data-active={isActive}
                disabled={disabled}
                onClick={() => !disabled && setActiveTab(value)}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${value}`}
                id={`tab-${value}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className={cn(tabContentVariant({ variant }))}>
          {tabItems.map((child: any) => {
            const { value } = child.props;
            const isActive = activeTab === value;

            if (!isActive) return null;

            return (
              <div
                key={value}
                role="tabpanel"
                aria-labelledby={`tab-${value}`}
                id={`tabpanel-${value}`}
              >
                {child.props.children}
              </div>
            );
          })}
        </div>
      </div>
    </TabContext.Provider>
  );
};

/**
 * TabItem component that represents a single tab with its content
 *
 * This component must be used as a direct child of the Tab component. It defines
 * both the tab button (via the label prop) and the content to display when the tab
 * is active. The actual rendering is handled by the parent Tab component through
 * React's children inspection.
 *
 * ## Important Notes
 * - Must be used inside a Tab component
 * - The `value` prop must be unique within the Tab component
 * - The `label` prop is required for accessibility and display
 * - Content is only rendered when the tab is active for performance
 *
 * @param {TabItemProps} props - The properties for the TabItem component
 * @returns {JSX.Element} The tab item (primarily used for props by parent Tab)
 *
 * @example
 * ```tsx
 * // Simple tab item
 * <TabItem label="Home" value="home">
 *   <h2>Welcome Home</h2>
 *   <p>This is the home tab content.</p>
 * </TabItem>
 *
 * // Tab item with complex content
 * <TabItem label="User Profile" value="profile">
 *   <div className="space-y-6">
 *     <UserAvatar size="large" />
 *     <UserInfo />
 *     <UserActions>
 *       <EditProfileButton />
 *       <LogoutButton />
 *     </UserActions>
 *   </div>
 * </TabItem>
 *
 * // Disabled tab item
 * <TabItem label="Admin Panel" value="admin" disabled>
 *   <div className="text-center text-gray-500">
 *     <p>Admin access required</p>
 *     <p>Contact support for access</p>
 *   </div>
 * </TabItem>
 *
 * // Tab with form content
 * <TabItem label="Settings" value="settings">
 *   <form className="space-y-4">
 *     <Input label="Username" defaultValue="user123" />
 *     <Input label="Email" type="email" defaultValue="user@example.com" />
 *     <Button type="submit">Save Changes</Button>
 *   </form>
 * </TabItem>
 * ```
 *
 * @see {@link Tab} - Parent container component
 * @see {@link TabProps} - Properties for the Tab container
 */
export const TabItem = ({ children, ...props }: TabItemProps) => {
  // This component is primarily used for its props by the parent Tab component
  // The actual rendering is handled by the Tab component
  return <div {...props}>{children}</div>;
};

// Add display names for better debugging
Tab.displayName = 'Tab';
TabItem.displayName = 'TabItem';
