'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  cloneElement,
  useRef,
  type HTMLAttributes,
  type ReactElement,
} from 'react';
import { useItemSelector } from '../../hooks';
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
        neutral: 'border-neutral text-neutral ',
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
  'absolute top-0 z-[-1] h-full w-auto rounded-lg transition-[left,width] duration-300 ease-in-out motion-reduce:transition-none',
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
    },
  }
);

export type TabProps = HTMLAttributes<HTMLElement> & {
  key: string | number;
};

type TabSelectorProps<T extends TabProps> = {
  tabs: ReactElement<T>[];
  selectedChoice: T['key'];
  onTabClick?: (choice: T['key']) => void;
  hoverable?: boolean;
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
export const TabSelector = <T extends TabProps>({
  tabs,
  selectedChoice,
  onTabClick,
  color = TabSelectorColor.PRIMARY,
  hoverable = false,
  className,
}: TabSelectorProps<T>) => {
  const optionsRefs = useRef<HTMLElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { choiceIndicatorPosition } = useItemSelector(
    optionsRefs,
    undefined,
    hoverable
  );

  return (
    <div
      className={cn(
        tabSelectorVariant({
          color,
        }),
        className
      )}
      aria-orientation="horizontal"
      aria-multiselectable="false"
      role="tablist"
    >
      {tabs.map((Tab, index) => {
        const key = Tab.key!;

        const isSelected = selectedChoice === key;

        return cloneElement(Tab, {
          key: key ?? index,
          role: 'tab',
          onClick: () => onTabClick?.(key),
          'aria-selected': isSelected,
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
