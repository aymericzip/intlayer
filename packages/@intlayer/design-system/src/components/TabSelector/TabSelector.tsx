'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import {
  useRef,
  type HTMLAttributes,
  type ReactElement,
  cloneElement,
} from 'react';
import { useItemSelector } from '../../hooks';

const tabSelectorVariant = cva(
  'relative flex size-full flex-row items-center gap-4',
  {
    variants: {
      color: {
        primary:
          'border-primary dark:border-primary-dark text-primary dark:text-primary-dark',
        secondary:
          'border-secondary dark:border-secondary-dark text-secondary dark:text-secondary-dark',
        destructive:
          'border-destructive dark:border-destructive-dark bg-destructive dark:bg-destructive-dark text-destructive',
        neutral:
          'border-neutral dark:border-neutral-dark text-neutral dark:text-neutral-dark',
        light: 'border-white text-white',
        dark: 'border-neutral-800 text-neutral-800',
        text: 'border-text dark:border-text-dark text-text dark:text-text-dark',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  }
);

const indicatorVariant = cva(
  'absolute top-0 z-[-1] h-full w-auto rounded-lg opacity-10 transition-[left,width] duration-300 ease-in-out motion-reduce:transition-none',
  {
    variants: {
      color: {
        primary:
          'bg-primary dark:bg-primary-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        secondary:
          'bg-secondary dark:bg-secondary-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        destructive:
          'bg-destructive dark:bg-destructive-dark aria-selected:text-text dark:aria-selected:text-text-dark',
        neutral:
          'bg-neutral dark:bg-neutral-dark dark:aria-selected:text-text aria-selected:text-white',
        light: 'bg-white aria-selected:text-black',
        dark: 'bg-neutral-800 aria-selected:text-white',
        text: 'bg-text dark:bg-text-dark aria-selected:text-text-dark dark:aria-selected:text-text',
      },
    },
  }
);

type TabProps = HTMLAttributes<HTMLElement> & {
  key: string | number;
};

type TabSelectorProps<T extends TabProps> = {
  tabs: ReactElement<T>[];
  selectedChoice: T['key'];
  onTabClick?: (choice: T['key']) => void;
  hoverable?: boolean;
} & VariantProps<typeof tabSelectorVariant>;

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
  color = 'primary',
  hoverable = false,
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
      className={tabSelectorVariant({
        color,
      })}
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
          className={indicatorVariant({
            color,
          })}
          style={choiceIndicatorPosition}
          ref={indicatorRef}
        />
      )}
    </div>
  );
};
