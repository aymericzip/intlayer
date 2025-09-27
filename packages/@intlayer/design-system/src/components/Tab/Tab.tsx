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

// Context for managing tab state
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

export interface TabProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabContainerVariant> {
  defaultTab?: string;
  children: ReactNode;
}

export interface TabItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  disabled?: boolean;
  children: ReactNode;
}

/**
 * Tab container component that manages tab state and renders tab headers and content
 *
 * Example:
 * ```jsx
 * <Tab defaultTab="tab1">
 *   <TabItem label="First Tab" value="tab1">
 *     Content for first tab
 *   </TabItem>
 *   <TabItem label="Second Tab" value="tab2">
 *     Content for second tab
 *   </TabItem>
 * </Tab>
 * ```
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
 * TabItem component that represents a single tab
 * Must be used as a child of the Tab component
 */
export const TabItem = ({ children, ...props }: TabItemProps) => {
  // This component is primarily used for its props by the parent Tab component
  // The actual rendering is handled by the Tab component
  return <div {...props}>{children}</div>;
};

// Add display names for better debugging
Tab.displayName = 'Tab';
TabItem.displayName = 'TabItem';
