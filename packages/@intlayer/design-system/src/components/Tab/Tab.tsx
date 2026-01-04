'use client';

import { useHorizontalSwipe } from '@hooks/useHorizontalSwipe';
import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  Children,
  createContext,
  type HTMLAttributes,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react';
import { TabSelector, TabSelectorColor } from '../TabSelector';
import { useTabContext } from './TabContext';

// Context for managing tab state
type TabContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

// Tab container variants
const tabContainerVariant = cva(
  'relative w-full rounded-lg border border-neutral/20 bg-background/2 shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur',
  {
    variants: {
      variant: {
        default: '',
        bordered: 'border-2',
        ghost: 'border-0 bg-transparent shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export type TabProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tabContainerVariant> & {
    defaultTab?: string;
    group?: string;
    children: ReactNode;
  };

export type TabItemProps = HTMLAttributes<HTMLDivElement> & {
  label: string;
  value: string;
  disabled?: boolean;
  children: ReactNode;
};

/**
 * TabItem component that represents a single tab
 * Must be used as a child of the Tab component
 */
const TabItem = ({ children, ...props }: TabItemProps) => (
  // This component is primarily used for its props by the parent Tab component
  // The actual rendering is handled by the Tab component
  <div {...props}>{children}</div>
);

// Add display name for better debugging
TabItem.displayName = 'TabItem';

/**
 * Tab container component that manages tab state and renders tab headers and content
 *
 * Example:
 * ```jsx
 * <Tab defaultTab="tab1">
 *   <Tab.Item label="First Tab" value="tab1">
 *     Content for first tab
 *   </Tab.Item>
 *   <Tab.Item label="Second Tab" value="tab2">
 *     Content for second tab
 *   </Tab.Item>
 * </Tab>
 * ```
 */
const TabComponent = ({
  defaultTab,
  group,
  variant,
  children,
  className,
  ...props
}: TabProps) => {
  // Extract TabItem children to get their props
  const tabItems = Children.toArray(children).filter((child) => {
    return isValidElement(child) && child.type === TabItem;
  }) as ReactElement<TabItemProps>[];

  const firstTabValue = tabItems[0]?.props?.value;
  const { tabsValues, setTabsValues } = useTabContext();
  const [activeTab, setActiveTab] = useState(defaultTab ?? firstTabValue ?? '');
  const hasGroup = group && typeof tabsValues === 'object';
  const currentTabValue =
    (hasGroup ? tabsValues?.[group] : activeTab) ?? defaultTab ?? firstTabValue;
  const activeTabIndex = tabItems.findIndex(
    (tab) => tab.props.value === currentTabValue
  );

  const tabsCount = tabItems.length;

  const { containerProps, dragDeltaPct, isDragging } = useHorizontalSwipe({
    itemIndex: activeTabIndex,
    itemCount: tabsCount,
    onSwipeLeft: () => {
      const targetIndex = Math.min(tabsCount - 1, activeTabIndex + 1);
      const nextValue = tabItems[targetIndex]?.props?.value;
      if (nextValue) handleSetActiveTab(nextValue);
    },
    onSwipeRight: () => {
      const targetIndex = Math.max(0, activeTabIndex - 1);
      const nextValue = tabItems[targetIndex]?.props?.value;
      if (nextValue) handleSetActiveTab(nextValue);
    },
  });

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);

    if (typeof setTabsValues === 'function') {
      setTabsValues((prev) => ({ ...prev, [group!]: tab }));
    }
  };

  const contextValue: TabContextType = {
    activeTab: activeTab ?? firstTabValue ?? '',
    setActiveTab: handleSetActiveTab,
  };

  return (
    <TabContext.Provider value={contextValue}>
      <div
        className={cn(tabContainerVariant({ variant }), className)}
        {...props}
      >
        {/* Tab Headers */}
        <div className="sticky top-36 z-10 flex gap-3 bg-background/70 p-3 backdrop-blur">
          <TabSelector
            selectedChoice={currentTabValue}
            tabs={tabItems.map((child) => {
              const { label, value, disabled } = child.props;
              const isActive = currentTabValue === value;

              return (
                <button
                  key={value}
                  className={cn(
                    'cursor-pointer rounded-md px-4 py-1 font-medium text-sm transition-colors focus:outline-none',
                    !isActive && 'text-neutral/70'
                  )}
                  data-active={isActive}
                  disabled={disabled}
                  onClick={() => !disabled && handleSetActiveTab(value)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${value}`}
                  id={`tab-${value}`}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
            hoverable
            color={TabSelectorColor.TEXT}
          />
        </div>
        {/* Tab Content */}
        {/* Clipper: no overflow; uses clip-path */}
        <div
          className="relative w-full min-w-0 overflow-x-clip [-webkit-clip-path:inset(0)] [clip-path:inset(0)]"
          {...containerProps}
        >
          {/* Track */}
          <div
            role="tablist"
            aria-orientation="horizontal"
            className={cn(
              'grid w-full min-w-0',
              isDragging
                ? 'transition-none'
                : 'transition-transform duration-300 ease-in-out'
            )}
            style={{
              gridTemplateColumns: `repeat(${tabItems.length}, 100%)`,
              transform: `translateX(-${activeTabIndex * 100 - (isDragging ? dragDeltaPct : 0)}%)`,
            }}
          >
            {tabItems.map(({ props }, index) => {
              const { value, children } = props;
              const isActive = index === activeTabIndex;

              return (
                <div
                  key={value}
                  role="tabpanel"
                  aria-labelledby={`tab-${value}`}
                  id={`tabpanel-${value}`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  data-active={isActive}
                  className={cn(
                    'w-full min-w-0 p-6 opacity-100 transition-opacity duration-300 ease-in-out',
                    !isActive && 'pointer-events-none opacity-0' // prevent offscreen interaction
                  )}
                >
                  <div className="flex w-full min-w-0 flex-col items-stretch gap-6">
                    {children}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </TabContext.Provider>
  );
};

// Create the compound component
export const Tab = Object.assign(TabComponent, {
  Item: TabItem,
});

// Add display name for better debugging
