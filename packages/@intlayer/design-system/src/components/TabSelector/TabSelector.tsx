'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  cloneElement,
  type HTMLAttributes,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useRef,
} from 'react';
import {
  type ItemSelectorOrientation,
  useItemSelector,
} from '../../hooks/useItemSelector';
import { cn } from '../../utils/cn';

export enum TabSelectorColor {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  DESTRUCTIVE = 'destructive',
  NEUTRAL = 'neutral',
  LIGHT = 'light',
  DARK = 'dark',
  TEXT = 'text',
}

const tabSelectorVariant = cva(
  'relative flex size-full flex-row items-center gap-2',
  {
    variants: {
      color: {
        primary: 'border-primary text-primary',
        secondary: 'border-secondary text-secondary',
        destructive: 'border-destructive bg-destructive text-destructive',
        neutral: 'border-neutral text-neutral',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text text-text',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const indicatorVariant = cva(
  'absolute z-[-1] rounded-lg duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary: 'bg-primary/10 aria-selected:text-text',
        secondary: 'bg-secondary/10 aria-selected:text-text',
        destructive: 'bg-destructive/10 aria-selected:text-text',
        neutral: 'bg-neutral/10 aria-selected:text-white/10',
        light: 'bg-white/10 aria-selected:text-black',
        dark: 'bg-neutral-800/10 aria-selected:text-white',
        text: 'bg-text/10 aria-selected:text-text-opposite',
      },
      orientation: {
        horizontal: 'top-0 h-full w-auto transition-[left,width]',
        vertical: 'left-0 h-auto w-full transition-[top,height]',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export type TabSelectorItemProps = HTMLAttributes<HTMLElement> & {
  key: string | number;
};

export type TabSelectorProps<T extends TabSelectorItemProps> = {
  tabs: ReactElement<T>[];
  selectedChoice: T['key'];
  onTabClick?: (choice: T['key']) => void;
  hoverable?: boolean;
  orientation?: ItemSelectorOrientation;
} & HTMLAttributes<HTMLElement> &
  Omit<VariantProps<typeof tabSelectorVariant>, 'color'> & {
    color?: TabSelectorColor | `${TabSelectorColor}`;
  };

/**
 *
 * Component that allows the user to select one of the provided choices.
 *
 * Example:
 * ```jsx
 * <TabSelector
 *   selectedChoice="option1"
 *   onTabClick={(choice) => console.log(choice)}
 *   hoverable={true}
 * >
 *   <Button key="option1"/>
 *   <Button key="option2"/>
 *   <Button key="option3"/>
 * </TabSelector>
 * ```
 */
export const TabSelector = <T extends TabSelectorItemProps>({
  tabs,
  selectedChoice,
  onTabClick,
  color = TabSelectorColor.PRIMARY,
  hoverable = false,
  orientation = 'horizontal',
  className,
}: TabSelectorProps<T>) => {
  const optionsRefs = useRef<HTMLElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition, calculatePosition } = useItemSelector(
    optionsRefs,
    { isHoverable: hoverable, orientation }
  );

  useEffect(() => {
    calculatePosition();
  }, [selectedChoice, tabs]);

  return (
    <div
      className={cn(
        tabSelectorVariant({
          color,
        }),
        className
      )}
      aria-orientation={orientation}
      aria-multiselectable="false"
      role="tablist"
    >
      {tabs.map((Tab, index) => {
        const key = Tab.key!;

        const isSelected = selectedChoice === key;

        return cloneElement(Tab, {
          key: key ?? index,
          role: 'tab',
          onClick: (e: MouseEvent<HTMLElement>) => {
            Tab.props?.onClick?.(e);
            onTabClick?.(key);
          },
          'aria-selected': isSelected,
          'data-active': isSelected as unknown as string,
          tabIndex: isSelected ? 0 : -1,
          ref: (el: HTMLElement) => {
            optionsRefs.current[index] = el!;
          },
        } as unknown as T);
      })}
      {choiceIndicatorPosition && (
        <div
          className={cn(
            indicatorVariant({
              color,
              orientation,
            })
          )}
          style={choiceIndicatorPosition}
          ref={indicatorRef}
          key={`${selectedChoice}${JSON.stringify(tabs.map((tab) => tab.key))}`}
        />
      )}
    </div>
  );
};
