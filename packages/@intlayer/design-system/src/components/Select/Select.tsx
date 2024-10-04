'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import {
  ChevronsUpDown,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';
import { cn } from '../../utils/cn';

const SelectRoot = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    validationStyleEnabled?: boolean;
  }
>(({ validationStyleEnabled = false, className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex w-full items-center justify-between whitespace-nowrap rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      'bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 px-2 py-1 text-sm shadow-none outline-0 transition-all',
      'border-input-border dark:border-input-border-dark hover:border-input-border-hover dark:hover:border-input-border-hover-dark focus:border-input-border-focus dark:focus:border-input-border-focus focus:outline-0 focus:[box-shadow:none]',
      'aria-[invalid=true]:border-error dark:aria-[invalid=true]:border-error-dark',
      validationStyleEnabled &&
        'valid:border-success dark:valid:border-success-dark invalid:border-error dark:invalid:border-error-dark',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronsUpDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

export const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'bg-input-background dark:bg-input-background-dark text-input-text dark:text-input-text-dark w-full select-text resize-none rounded-xl border-2 p-1 text-sm shadow-none outline-0 transition-all',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden border shadow-md',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-1 py-0.5 text-sm font-semibold', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-neutral/10 dark:focus:bg-neutral-dark/10 relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

export const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-red-300', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

type SelectType = typeof SelectRoot & {
  Group: typeof SelectGroup;
  Value: typeof SelectValue;
  Trigger: typeof SelectTrigger;
  ScrollUpButton: typeof SelectScrollUpButton;
  ScrollDownButton: typeof SelectScrollDownButton;
  Content: typeof SelectContent;
  Label: typeof SelectLabel;
  Item: typeof SelectItem;
  Separator: typeof SelectSeparator;
};

/**
 * Usage example:
 * ```jsx
 * <Select>
 *   <Select.Trigger>
 *     <Select.Value placeholder="Theme" />
 *   </Select.Trigger>
 *   <Select.Content>
 *     <Select.Item value="light">Light</Select.Item>
 *     <Select.Item value="dark">Dark</Select.Item>
 *     <Select.Item value="system">System</Select.Item>
 *   </Select.Content>
 * </Select>
 * ```
 */
export const Select = SelectRoot as SelectType;
Select.Group = SelectGroup;
Select.Value = SelectValue;
Select.Trigger = SelectTrigger;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;
Select.Content = SelectContent;
Select.Label = SelectLabel;
Select.Item = SelectItem;
Select.Separator = SelectSeparator;